import { LensProps } from "@focuson/state";
import { ModalPagesDetails } from "./modalPages";
import { MultiPageDetails, OnePageDetails } from "./pageConfig";

import { PageSelection } from "./pageSelection";
import { Optional } from "@focuson/lens";
import { displayMain } from "./focusedPage";
import { debuglog } from "util";

export interface SelectedPageDebug {
  selectedPageDebug?: boolean
}
export interface SelectedPageProps<S, MD extends ModalPagesDetails<S>> extends LensProps<S, S> {
  pages: MultiPageDetails<S, MD>,
  selectedPageL: Optional<S, PageSelection<any>>

}
export function SelectedPage<S, MD extends ModalPagesDetails<S>> ( { state, pages, selectedPageL }: SelectedPageProps<S, MD> ) {
  const pageName = selectedPageL.getOption ( state.json () )?.pageName
  // @ts-ignore
  const debug = state.main?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  if ( debug ) console.log ( "SelectedPage.pageName", pageName )
  if ( !pageName ) return (<p>No page selected</p>)
  // @ts-ignore I would like to do this type safe, but I don't know how to do it without getting circular type definitions
  const page: OnePageDetails<S, any, any, MD> = pages[ pageName ]
  if ( debug ) {
    console.log ( "SelectedPage.pages", pages );
    console.log ( "SelectedPage.page", page )
  }
  if ( page ) {
    const { config, lens, pageFunction } = page
    const lsForPage = state.chainLens ( lens )
    if ( debug ) console.log ( "SelectedPage.lsForPage", lsForPage )
    if ( typeof pageFunction === 'function' )  // this is for legacy support
      return pageFunction ( { state: lsForPage } )
    else
      return displayMain ( config, pageFunction, lsForPage )
  }
  if ( debug ) console.error ( "SelectedPage.Could not find details for", pageName )
  return (<p>Could not find details for {pageName}</p>)
}