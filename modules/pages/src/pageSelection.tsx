import { GetNameFn, identityOptics, Lens, Lenses, Optional, Transform } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { HasMultiPageDetails } from "./pageConfig";
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
  array: string[],
  variable: string[]
}
export interface CopyDetails {
  from?: string[];
  to?: string[]
}
export interface PageSelection {
  pageName: string;
  firstTime?: boolean;
  pageMode: PageMode;
  onClose?: PageOnClose;
  rest?: RestCommand,
  copyOnClose?: CopyDetails[],
  //This is a lens description. A path that should be the lens to the root of the data. This overrides the lens in the page description if it is present
  // Right now it is just a list of strings. Later it might include 'the nth item' etc */
  focusOn?: string[],
  setToLengthOnClose?: SetToLengthOnClose
}
export interface HasPageSelection {
  pageSelection: PageSelection[]
}
export interface HasPageSelectionLens<S> {
  pageSelectionL: Optional<S, PageSelection[]>
}
export interface PageSelectionContext<S> extends HasPageSelectionLens<S>, HasMultiPageDetails<S, any> {
  combine: ( pages: PageDetailsForCombine[] ) => JSX.Element
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

export function fromPathFor<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): ( path: string[], description?: string ) => Optional<S, any> {
  const lookup = ( name: string ) => refFromFirstPage ( state.context.pageSelectionL ) ( name ).getOption ( state.main );
  const fromPath = Lenses.fromPathWith<S, any> ( lookup )
  return ( path, d ) => fromPath ( replaceBasePath ( state, path ), d );
}
export function replaceBasePageWithKnownPage ( pageName:string, path: string[] ) : string[]{
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

export function refFromFirstPage<S> ( l: Optional<S, PageSelection[]> ): GetNameFn<S, any> {
  return name => ({
    getOption: ( s: S ) => {
      const p = l.getOption ( s )?.[ 0 ]?.pageName
      if ( p ) return Lenses.fromPath ( [ p, name ] ).getOption ( s )
      return undefined
    }
  })

}