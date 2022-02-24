import { identityOptics, Lens, Optional } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { HasMultiPageDetails } from "./pageConfig";
import { HasPostCommandLens, Posters } from "@focuson/poster";


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
  params?: PageParams;
  onClose?: PageOnClose;
  rest?: { poster: string, args: any }
}
export interface HasPageSelection {
  pageSelection: PageSelection[]
}
export interface HasPageSelectionLens<S> {
  pageSelectionL: Lens<S, PageSelection[]>
}
export interface PageSelectionContext<S> extends HasPageSelectionLens<S>, HasMultiPageDetails<S, any> {
  combine: ( pages: JSX.Element[] ) => JSX.Element
}





export function pageSelections<S, Context extends HasPageSelectionLens<S>> ( s: LensState<S, any, Context> ): PageSelection[] {
  return s.context.pageSelectionL.get ( s.main )
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
export function page<S, Context extends HasPageSelectionLens<S>> ( lensState: LensState<S, any, Context>, pageOps: PageOps, pageSelection: PageSelection ) {
  //TODO we could check the page name here
  lensState.copyWithLens ( lensState.context.pageSelectionL ).transform ( applyPageOps ( pageOps, pageSelection ) )
}
export function popPage<S, Context extends HasPageSelectionLens<S>> ( lensState: LensState<S, any, Context> ) {
  lensState.copyWithLens ( lensState.context.pageSelectionL ).transform ( ps => ps.slice ( 0, -1 ) )
}
export function popPageAndSet<S, Context extends HasPageSelectionLens<S>, T> ( lensState: LensState<S, any, Context>, lens: Optional<S, T>, t: T ) {
  const ps = currentPageSelection ( lensState )
  lensState.copyWithLens ( lensState.context.pageSelectionL ).useOtherAsWell ( lens ).setTwoValues ( ps.slice ( 0, -1 ), t )
}

export function currentPageSelection<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ) {
  return state.context.pageSelectionL.get ( state.main )
}
export function currentPageSelectionTail<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ) {
  return state.context.pageSelectionL.get ( state.main ).slice ( -1 )?.[ 0 ]
}
/** As well as selecting a page this changes it some other way */
export function pageAndSet<S, Context extends HasPageSelectionLens<S>, T> ( lensState: LensState<S, any, Context>, pageOps: PageOps, pageSelection: PageSelection, lens: Optional<S, T>, t: T ) {
  //TODO we could check the page name here
  const existingPages = currentPageSelection ( lensState )
  const newPageSelection = applyPageOps ( pageOps, pageSelection ) ( existingPages );
  lensState.copyWithLens ( lensState.context.pageSelectionL ).useOtherAsWell<T> ( lens ).setTwoValues ( newPageSelection, t )
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection[]> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}
