import { LensProps, LensState } from "@focuson/state";

import { PageMode, PageSelection, PageSelectionContext } from "./pageSelection";
import { FocusedPage } from "./focusedPage";
import { PageConfig } from "./pageConfig";
import { DefaultTemplate, PageTemplateProps } from "./PageTemplate";
import { Loading } from "./loading";

export interface HasSelectedPageDebug {
  debug?: SelectedPageDebug
}
export interface SelectedPageDebug {
  selectedPageDebug?: boolean
}

export function SelectedPage<S, Context extends PageSelectionContext<S>> ( { state }: LensProps<S, any, Context> ) {
  let combine = state.context.combine;
  let pages = findSelectedPageDetails ( state );
  return combine ? combine ( pages ) : <div>{pages}</div>
}

function findSelectedPageDetails<S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ): JSX.Element[] {
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  let selectedPageData: PageSelection[] = state.context.pageSelectionL.get ( state.json () );
  if ( debug ) console.log ( 'findSelectedPageDetails', selectedPageData )
  return selectedPageData.map ( findOneSelectedPageDetails ( state ) )
}
export const findOneSelectedPageDetails = <S, Context extends PageSelectionContext<S>> ( state: LensState<S, any, Context> ) => ( ps: PageSelection ): JSX.Element => {
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  const pages = state.context.pages
  const { pageName, pageMode } = ps
  const page = pages[ pageName ]
  if ( !page ) throw Error ( `Cannot find page with name ${pageName}, legal Values are [${Object.keys ( pages ).join ( "," )}]` )
  const { config, lens, pageFunction } = page
  const lsForPage = state.chainLens ( lens )

  if ( debug ) console.log ( "findOneSelectedPageDetails.pageFunction", pageFunction )
  if ( typeof pageFunction === 'function' ) {// this is for legacy support
    if ( debug ) console.log ( "findOneSelectedPageDetails.legacy display" )
    let main = pageFunction ( { state: lsForPage } );
    if ( debug ) console.log ( "findOneSelectedPageDetails.legacy result", main )
    if ( debug ) console.log ( "findOneSelectedPageDetails.legacy result - json", JSON.stringify ( main ) )
    return main
  } else return displayOne ( config, pageFunction, lsForPage, pageMode );
};


/** Given a config.ts, a focused page data structure and a lens state (focused on anything...doesn't matter) this will display a page */
export function displayOne<S extends any, D extends any, Msgs, Context> (
  config: PageConfig<S, D, Msgs, Context>,
  focusedPage: FocusedPage<S, D, Context>,
  s: LensState<S, D, Context>, pageMode: PageMode ): JSX.Element {
  // @ts-ignore
  const debug = s.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  let t = config.template
  const template: ( p: PageTemplateProps<S, D, Context> ) => JSX.Element = t ? t : DefaultTemplate
  if ( debug ) console.log ( "displayMain.template 1", template )
  const loading = config.loading ? config.loading : Loading
  if ( debug ) console.log ( "displayMain.loading 2", loading )
  const result = template ( { state: s, focusedPage, loading, pageMode } )
  if ( debug ) console.log ( "displayMain.result 3", result );
  return result
}

