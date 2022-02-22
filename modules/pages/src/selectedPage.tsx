import { LensProps } from "@focuson/state";
import { ModalPagesDetails } from "./modal/modalPages";
import { MultiPageDetails, OnePageDetails } from "./pageConfig";

import { PageSelection } from "./pageSelection";
import { Optional } from "@focuson/lens";
import { displayMain } from "./focusedPage";

export interface HasSelectedPageDebug {
  debug?: SelectedPageDebug
}
export interface SelectedPageDebug {
  selectedPageDebug?: boolean
}

export interface SelectedPageProps<S, MD extends ModalPagesDetails<S>> extends LensProps<S, S> {
  pages: MultiPageDetails<S, MD>,
  selectedPageL: Optional<S, PageSelection>

}
export function SelectedPage<S, MD extends ModalPagesDetails<S>> ( { state, pages, selectedPageL }: SelectedPageProps<S, MD> ) {
  let selectedPageData = selectedPageL.getOption ( state.json () );
  const pageName = selectedPageData?.pageName
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  if ( debug ) console.log ( "SelectedPage.pageName", pageName )
  if ( !pageName ) return (<p>No page selected</p>)
  // @ts-ignore I would like to do this type safe, but I don't know how to do it without getting circular type definitions
  const page: OnePageDetails<S, any, any, MD> = pages[ pageName ]
  if ( debug ) {
    console.log ( "SelectedPage.pages", pages );
    console.log ( "SelectedPage.page", page )
  }
  if ( page && selectedPageData ) {
    const { config, lens, pageFunction } = page
    const lsForPage = state.chainLens ( lens )
    if ( debug ) console.log ( "SelectedPage.lsForPage", lsForPage )
    if ( debug ) console.log ( "SelectedPage.pageFunction", pageFunction )
    if ( typeof pageFunction === 'function' ) {// this is for legacy support
      if ( debug ) console.log ( "SelectedPage.legacy display" )
      let main = pageFunction ( { state: lsForPage } );
      if ( debug ) console.log ( "SelectedPage.legacy result", main )
      if ( debug ) console.log ( "SelectedPage.legacy result - json", JSON.stringify ( main ) )
      return main
    } else {
      if ( debug ) console.log ( "SelectedPage displayMain" )
      let main = displayMain ( config, pageFunction, lsForPage, selectedPageData.pageMode );
      if ( debug ) console.log ( "SelectedPage displayMain result", main )
      if ( debug ) console.log ( "SelectedPage displayMain lsForPage", lsForPage )
      if ( debug ) console.log ( "SelectedPage displayMain lsForPage", lsForPage.optJson() )
      // if ( debug ) console.log ( "SelectedPage displayMain result - json", JSON.stringify ( main ) )
      return main
    }
  }
  if ( debug ) console.error ( "SelectedPage.Could not find details for", pageName )
  return (<p>Could not find details for {pageName}</p>)
}