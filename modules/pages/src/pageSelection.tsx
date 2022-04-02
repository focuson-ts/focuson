import { identityOptics, Lens, lensBuilder, NameAndLens, Optional, parsePath, prefixNameAndLens, Transform } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { HasMultiPageDetails, isMainPageDetails } from "./pageConfig";
import { safeArray } from "@focuson/utils";
import { RestCommand } from "@focuson/rest";
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
export interface CopyDetails {
  from?: string;
  to?: string
}
export interface PageSelection {
  pageName: string;
  firstTime?: boolean;
  pageMode: PageMode;
  onClose?: PageOnClose;
  rest?: RestCommand;
  copyOnClose?: CopyDetails[];
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
  return safeArray ( s.context.pageSelectionL.getOption ( s.main ) )
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


export function fromPathGivenState<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ): ( path: string ) => Optional<S, any> {
  const [ lens, namedOptionals ] = firstPageDataLensAndOptionals ( state )
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
    if ( pageOps === 'select' ) return [ ...ps.slice ( 0, -1 ), pageSelection ];
    throw new Error ( `Cannot perform pageOps ${pageOps}` )
  }
}
export function page<S, Context extends HasPageSelectionLens<S>> ( context: Context, pageOps: PageOps, pageSelection: PageSelection ): Transform<S, PageSelection[]> {
  //TODO we could check the page name here
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
export function mainPage<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection {
  return pageSelections ( state )?.[ 0 ]
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection[]> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}


function firstPageDataLensAndOptionals<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ): [ Optional<S, any> | undefined, NameAndLens<S> ] {
  let pageSelection = mainPage ( state );
  if ( pageSelection === undefined ) return undefined
  const { pageName, focusOn } = pageSelection
  if ( focusOn !== undefined ) throw Error ( 'Main page should only have a lens not a focusOn' )
  const page = state.context.pages[ pageName ]
  if ( page === undefined ) throw Error ( `Main Page is ${pageName} and it cannot be found.\nLegal values are ${Object.keys ( state.context.pages )}` )
  if ( !isMainPageDetails ( page ) ) throw Error ( `Main page ${pageName} has details which aren't a main page${JSON.stringify ( page )}` )
  return [ page.lens, page.namedOptionals ]
}

export function newStateFromPath<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ): ( path: string ) => LensState<S, any, Context> {
  return ( path ) => state.copyWithLens ( fromPathGivenState ( state ) ( path ) )
}


