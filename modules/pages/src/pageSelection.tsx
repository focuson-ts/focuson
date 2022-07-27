import { identityOptics, Lens, lensBuilder, NameAndLensFn, Optional, parsePath, prefixNameAndLens, Transform } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { HasMultiPageDetails, isMainPageDetails } from "./pageConfig";
import { CopyDetails, safeArray, safeObject } from "@focuson/utils";
import { ModalChangeCommands, RestCommand } from "@focuson/rest";
import { PageDetailsForCombine } from "./selectedPage";


export type PageMode = 'view' | 'create' | 'edit'

export interface PagePosition {
  left?: number;
  right?: number;
  top?: number;
  button?: number;
}

export interface PageParams {
  position?: PagePosition;
}

export interface PageOnClose {
  onCloseHandler: string;//
  onCloseParams: any; //
}
export interface SetToLengthOnClose {
  array: string,
  variable: string
}

export interface PageSelection {
  pageName: string;
  firstTime?: boolean;
  time: string;
  pageMode: PageMode;
  onClose?: PageOnClose;
  rest?: RestCommand;
  copyOnClose?: CopyDetails[];
  changeOnClose?: ModalChangeCommands | ModalChangeCommands[];
  focusOn?: string;
  setToLengthOnClose?: SetToLengthOnClose;
  pageParams?: PageParams;
}
export interface HasPageSelection {
  pageSelection: PageSelection[]
}
export interface HasPageSelectionLens<S> {
  pageSelectionL: Optional<S, PageSelection[]>
}
export interface PageSelectionContext<S> extends HasPageSelectionLens<S>, HasMultiPageDetails<S, any> {
  combine: ( state: LensState<S, any, any>, pages: PageDetailsForCombine[] ) => JSX.Element
}


export function pageSelections<S, Context extends HasPageSelectionLens<S>> ( s: LensState<S, any, Context> ): PageSelection[] {
  const pageSelectionL = s.context.pageSelectionL;
  if ( pageSelectionL === undefined ) {
    console.error ( s.context );
    throw Error ( `configuration error. PageSelection is undefined` )
  }
  return safeArray ( pageSelectionL.getOption ( s.main ) )
}
/** Select replaces the currently selected page (or adds it if empty).
 * Popup adds the page to the stack of pages in pageSelection
 */
export type PageOps = 'select' | 'popup'

function getPageName<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ) {
  let json = state.context.pageSelectionL.getOption ( state.main );
  let result = json?.[ 0 ]?.pageName;
  if ( result === undefined ) throw new Error ( 'Cannot get first page name' + JSON.stringify ( json ) )
  return result;
}
export function replaceBasePath<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context>, path: string[] ) {
  return path.map ( p => p === '{basePage}' ? getPageName ( state ) : p )
}


export function fromPathGivenState<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ): ( path: string ) => Optional<S, any> {
  const [ lens, namedOptionals ] = firstPageDataLensAndOptionals ( state, adjustPages )
  if ( !lens ) throw Error ( `Cannot 'fromPathGivenState' because there is no selected page` )
  return ( path: string ) => parsePath<Optional<S, any>> ( path, lensBuilder<S> ( prefixNameAndLens<S> ( [ '~', lens ], [ '', state.optional ] ), namedOptionals ? namedOptionals : {} ) );
}
export function replaceBasePageWithKnownPage ( pageName: string, path: string[] ): string[] {
  return path.map ( part => part === '{basePage}' ? pageName : part )
}

export function applyPageOps ( pageOps: PageOps, pageSelection: PageSelection ): ( s: PageSelection[] | undefined ) => PageSelection[] {
  return ( old: PageSelection[] | undefined ) => {
    const ps = safeArray ( old )
    if ( pageOps === 'popup' ) return [ ...ps, pageSelection ];
    if ( pageOps === 'select' ) return [ pageSelection ];
    throw new Error ( `Cannot perform pageOps ${pageOps}` )
  }
}
export function page<S, Context extends HasPageSelectionLens<S>> ( context: Context, pageOps: PageOps, pageSelection: PageSelection ): Transform<S, PageSelection[]> {
  return [ context.pageSelectionL, applyPageOps ( pageOps, pageSelection ) ]
}
export function popPage<S, Context extends HasPageSelectionLens<S>> ( lensState: LensState<S, any, Context> ): Transform<S, PageSelection[]> {
  return [ lensState.context.pageSelectionL, ps => safeArray ( ps ).slice ( 0, -1 ) ]
}

export function currentPageSelection<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection[] {
  return safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
}
export function currentPageSelectionTail<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection {
  return pageSelections ( state ).slice ( -1 )?.[ 0 ]
}
export function mainPageFrom ( ps: PageSelection[] ): PageSelection {
  let result = [ ...ps ].reverse ().find ( p => p.focusOn === undefined );
  if ( result === undefined ) throw Error ( `Cannot find main page. Pages are ${JSON.stringify ( ps )}` )
  return result

}
export function mainPage<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ): PageSelection {
  const realAdjustPages = adjustPages ? adjustPages : ( ps: PageSelection[] ) => ps
  let adjustedPages = realAdjustPages ( pageSelections ( state ) );
  return mainPageFrom ( adjustedPages )
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection[]> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}


function firstPageDataLensAndOptionals<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ): [ Optional<S, any> | undefined, NameAndLensFn<S> ] {
  let pageSelection = mainPage<S, Context> ( state, adjustPages );
  // if ( pageSelection === undefined ) return undefined
  const { pageName, focusOn } = pageSelection
  if ( focusOn !== undefined ) throw Error ( 'Main page should only have a lens not a focusOn' )
  const page = state.context.pages[ pageName ]
  if ( page === undefined ) throw Error ( `Main Page is ${pageName} and it cannot be found.\nLegal values are ${Object.keys ( state.context.pages )}` )
  if ( !isMainPageDetails ( page ) ) throw Error ( `Main page ${pageName} has details which aren't a main page${JSON.stringify ( page )}` )
  return [ page.lens, safeObject ( page.namedOptionals ) ]
}

export function newStateFromPath<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ): ( path: string ) => LensState<S, any, Context> {
  return ( path ) => state.copyWithLens ( fromPathGivenState ( state ) ( path ) )
}


