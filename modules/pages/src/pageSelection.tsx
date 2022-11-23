import { identityOptics, Lens, lensBuilder, NameAndLensFn, Optional, parsePath, prefixNameAndLens, Transform } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { HasMultiPageDetails, isMainPageDetails } from "./pageConfig";
import { CopyDetails, PageMode, safeArray, safeObject } from "@focuson/utils";
import { MinimalPageSelection, ModalChangeCommands, RestCommand } from "@focuson/rest";
import { PageDetailsForCombine } from "./selectedPage";

import { RestLoadWindowWithoutRestProps } from "@focuson/rest";



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


export interface PageSelection extends MinimalPageSelection{
  pageName: string;
  firstTime?: boolean;
  time: string;
  pageMode: PageMode;
  onClose?: PageOnClose;
  rest?: RestCommand;
  loader?: RestLoadWindowWithoutRestProps
  copyOnClose?: CopyDetails[];
  changeOnClose?: ModalChangeCommands | ModalChangeCommands[];
  focusOn?: string;
  setToLengthOnClose?: SetToLengthOnClose;
  pageParams?: PageParams;
  arbitraryParams?: any
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
 * Replace will replace the 'current' page
 */
export type PageOps = 'select' | 'popup' | 'replace'

//  function getFirstPageName<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ) {
//   let json = state.context.pageSelectionL.getOption ( state.main );
//   let result = json?.[ 0 ]?.pageName;
//   if ( result === undefined ) throw new Error ( 'Cannot get first page name' + JSON.stringify ( json ) )
//   return result;
// }
// export function replaceBasePath<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context>, path: string[] ) {
//   return path.map ( p => p === '{basePage}' ? getFirstPageName ( state ) : p )
// }


export function fromPathGivenState<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ): ( path: string ) => Optional<S, any> {
  const [ lens, namedOptionals ] = firstPageDataLensAndOptionals ( state, adjustPages )
  const prefixs = lens ? prefixNameAndLens<S> ( [ '~', lens ], [ '', state.optional ] ) : prefixNameAndLens<S> ( [ '', state.optional ] );
  return ( path: string ) => parsePath<Optional<S, any>> ( path, lensBuilder<S> ( prefixs, namedOptionals ? namedOptionals : {} ) );
}

export function applyPageOps ( pageOps: PageOps, pageSelection: PageSelection ): ( s: PageSelection[] | undefined ) => PageSelection[] {
  return ( old: PageSelection[] | undefined ) => {
    const ps = safeArray ( old )
    if ( pageOps === 'popup' ) return [ ...ps, pageSelection ];
    if ( pageOps === 'select' ) return [ pageSelection ];
    if ( pageOps === 'replace' ) return [ ...ps.slice ( 0, ps.length - 1 ), pageSelection ];
    throw new Error ( `Cannot perform pageOps ${pageOps}` )
  }
}
export function page<S, Context extends HasPageSelectionLens<S>> ( context: Context, pageOps: PageOps, pageSelection: PageSelection ): Transform<S, PageSelection[]> {
  return [ context.pageSelectionL, applyPageOps ( pageOps, pageSelection ) ]
}
export function popPage<S, Context extends HasPageSelectionLens<S>> ( lensState: LensState<S, any, Context> ): Transform<S, PageSelection[]> {
  return [ lensState.context.pageSelectionL, ps => safeArray ( ps ).slice ( 0, -1 ) ]
}
export function popTwoPages<S, Context extends HasPageSelectionLens<S>> ( lensState: LensState<S, any, Context> ): Transform<S, PageSelection[]> {
  return [ lensState.context.pageSelectionL, ps => safeArray ( ps ).slice ( 0, -2 ) ]
}

export function currentPageSelection<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection[] {
  return safeArray ( state.context.pageSelectionL.getOption ( state.main ) )
}
export function currentPageSelectionHead<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection {
  return safeArray ( state.context.pageSelectionL.getOption ( state.main ) )[ 0 ]
}
export function currentPageSelectionTail<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context> ): PageSelection {
  return pageSelections ( state ).slice ( -1 )?.[ 0 ]
}
export function mainPageFrom ( ps: PageSelection[] ): PageSelection {
  let result = mainPageOrUndefinedFrom ( ps )
  if ( result === undefined ) throw Error ( `Cannot find main page. Pages are ${JSON.stringify ( ps )}` )
  return result
}
export function mainPageOrUndefinedFrom ( ps: PageSelection[] ): PageSelection {
  const reversed = [ ...ps ].reverse ();
  // console.log('mainPageOrUndefinedFrom - reverse',reversed)
  const result = reversed.find ( p => p.focusOn === undefined );
  // console.log('mainPageOrUndefinedFrom',ps)
  // console.log('mainPageOrUndefinedFrom - result',result, Array.isArray(result))
  return result
}
export function mainPage<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ): PageSelection {
  const realAdjustPages = adjustPages ? adjustPages : ( ps: PageSelection[] ) => ps
  let adjustedPages = realAdjustPages ( pageSelections ( state ) );
  return mainPageFrom ( adjustedPages )
}
export function mainPageorUndefined<S, Context extends HasPageSelectionLens<S>> ( state: LensState<S, any, Context>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ): PageSelection {
  const realAdjustPages = adjustPages ? adjustPages : ( ps: PageSelection[] ) => ps
  let adjustedPages = realAdjustPages ( pageSelections ( state ) );
  // console.log ( 'mainPageorUndefined -  pageSelections ( state) ',  pageSelections ( state  ))
  // console.log ( 'mainPageorUndefined - adjustedPages', adjustedPages )
  const result = mainPageOrUndefinedFrom ( adjustedPages );
  // console.log ( 'mainPageorUndefined - result', result )
  return result
}

export function pageSelectionlens<S extends HasPageSelection> (): Lens<S, PageSelection[]> {
  return identityOptics<S> ( 'state' ).focusOn ( 'pageSelection' )
}


function firstPageDataLensAndOptionals<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context>, adjustPages?: ( ps: PageSelection[] ) => PageSelection[] ): [ Optional<S, any> | undefined, NameAndLensFn<S> ] {
  let pageSelection = mainPageorUndefined<S, Context> ( state, adjustPages );
  if ( pageSelection === undefined ) return [ undefined, {} ]
  const { pageName, focusOn } = pageSelection
  // console.log ( 'firstPageDataLensAndOptionals', pageSelection, 'pageName', pageName, 'focuson', focusOn )
  if ( focusOn !== undefined ) throw Error ( 'Main page should only have a lens not a focusOn' )
  const page = state.context.pages[ pageName ]
  if ( page === undefined ) throw Error ( `Main Page is [${pageName}] and it cannot be found.\nLegal values are ${Object.keys ( state.context.pages )}\n\nState\m${JSON.stringify ( state.main, null, 2 )}` )
  if ( !isMainPageDetails ( page ) ) throw Error ( `Main page ${pageName} has details which aren't a main page${JSON.stringify ( page )}` )
  return [ page.lens, safeObject ( page.namedOptionals ) ]
}

export function newStateFromPath<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ): ( path: string ) => LensState<S, any, Context> {
  return ( path ) => state.copyWithLens ( fromPathGivenState ( state ) ( path ) )
}


