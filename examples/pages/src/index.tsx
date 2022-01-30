import { identityOptics } from "@focuson/lens";
import { HasPageSelection, HasSelectedModalPage, HasSimpleMessages, Loading, ModalPagesDetails, MultiPageDetails, pageSelectionlens, SelectedPage, simpleMessagesPageConfig } from "@focuson/pages";
import { getElement, LensState, setJsonForFlux } from "@focuson/state";
import ReactDOM from "react-dom";
import { HasSearch, SearchPage, SearchQueryModalPage } from "./searchPage";


const modals: ModalPagesDetails<FullState> = {
  query: { lens: identityOptics<FullState> ().focusQuery ( 'search' ).focusQuery ( 'query' ), displayModalFn: SearchQueryModalPage }
}
type Modals = typeof modals

interface FullState extends HasSearch, HasSimpleMessages, HasSelectedModalPage, HasPageSelection<FullState> {}

const simpleMessagesConfig = simpleMessagesPageConfig<FullState, string, Modals> ( modals, Loading )

export const pages: MultiPageDetails<FullState, Modals> = {
  search: { config: simpleMessagesConfig, lens: identityOptics<FullState> ().focusQuery ( 'search' ), pageFunction: SearchPage<FullState> (), initialValue: {} }
}


let rootElement = getElement ( "root" );

let setJson = setJsonForFlux ( 'fullstate', ( s: LensState<FullState, FullState> ): void =>
  ReactDOM.render ( <SelectedPage state={s} pages={pages} selectedPageL={pageSelectionlens<FullState, any> ()}/>, rootElement ) )

setJson ( { messages: {}, pageSelection: { pageName: "search" }, search: { query: "", queryResults: [] } } )