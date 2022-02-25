import { identityOptics, Lens, Optional, Transform } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { HasMultiPageDetails } from "./pageConfig";
import { safeArray } from "@focuson/utils";


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
export interface PageSelection {
  pageName: string;
  firstTime?: boolean;
  pageMode: PageMode;
  onClose?: PageOnClose;
  rest?: { rest: string, action: string },
  //This is a lens description. A path that should be the lens to the root of the data. This overrides the lens in the page description if it is present
  // Right now it is just a list of strings. Later it might include 'the nth item' etc */
  base?: string[]
}
export interface HasPageSelection {
  pageSelection: PageSelection[]
}
export interface HasPageSelectionLens<S> {
  pageSelectionL: Optional<S, PageSelection[]>
}
export interface PageSelectionContext<S> extends HasPageSelectionLens<S>, HasMultiPageDetails<S, any> {
  combine: ( pages: JSX.Element[] ) => JSX.Element
}


export function pageSelections<S, Context extends HasPageSelectionLens<S>> ( s: LensState<S, any, Context> ): PageSelection[] {
  return safeArray ( s.context.pageSelectionL.getOption ( s.main ) )
}
/** Select replaces the currently selected page (or adds it if empty).
 * Popup adds the page to the stack of pages in pageSelection
 */
export type PageOps = 'select' | 'popup'

export function applyPageOps ( pageOps: PageOps, pageSelection: PageSelection ): ( s: PageSelection[] ) => PageSelection[] {
  return ( old: PageSelection[] ) => {
    if ( pageOps === 'popup' ) return [ ...old, pageSelection ];
    if ( pageOps === 'select' ) return [ ...old.slice ( 0, -1 ), pageSelection ];
    throw new Error ( `Cannot perform pageOps ${pageOps}` )
  }
}
export function page<S, Context extends HasPageSelectionLens<S>> ( context: Context, pageOps: PageOps, pageSelection: PageSelection ): Transform<S, PageSelection[]> {
  //TODO we could check the page name here
  return [ context.pageSelectionL, applyPageOps ( pageOps, pageSelection ) ]
}
export function popPage<S, Context extends HasPageSelectionLens<S>> ( lensState: LensState<S, any, Context> ): Transform<S, PageSelection[]> {
  return [ lensState.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ]
}

export function currentPageSelection<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection[] {
  return safeArray(state.context.pageSelectionL.getOption ( state.main ))
}
export function currentPageSelectionTail<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection {
  return pageSelections ( state ).slice ( -1 )?.[ 0 ]
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection[]> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}
