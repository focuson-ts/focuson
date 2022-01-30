import { identityOptics, safeArray } from "@focuson/lens";
import { focusedPageWithExtraState, HasPageSelection, HasSelectedModalPage, Loading, ModalPagesDetails, MultiPageDetails, simpleMessagesPageConfig } from "@focuson/pages";
import { HasSimpleMessages } from "@focuson/pages/dist/simpleMessages";
import { LensProps } from "@focuson/state";

interface HasFullDomain {
  fullDomain?: FullDomain
}
interface FullDomain {
  query: string,
  queryResults?: string[]
}

const fullDomainL = identityOptics<FullState> ().focusQuery ( 'fullDomain' );
const queryResultsL = fullDomainL.focusQuery ( 'queryResults' )

function SearchPage<S> () {
  return focusedPageWithExtraState<S, FullDomain, string[]> ( s => 'Search' ) ( s => s.focusOn ( 'queryResults' ) ) (
    ( state, { query }, queryResults ) =>
      <ul><input type='text' defaultValue={query}/><br/>{safeArray ( queryResults ).map ( ( r, i ) => <li key={i}>{r}</li> )} </ul> )
}

function SearchQueryModalPage<S> ( { state }: LensProps<S, string> ): JSX.Element {
  return <div><label>Search</label><input type='text' defaultValue={state.optJson ()}/></div>
}

const modals: ModalPagesDetails<FullState> = {
  query: { lens: fullDomainL.focusQuery ( 'query' ), displayModalFn: SearchQueryModalPage }
}
type Modals = typeof modals

interface FullState extends HasFullDomain, HasSimpleMessages, HasSelectedModalPage, HasPageSelection<FullState> {}

const simpleMessagesConfig = simpleMessagesPageConfig ( modals, Loading )


export const demoAppPageDetails: MultiPageDetails<FullState, Modals> = {
  search: { config: simpleMessagesConfig, lens: fullDomainL, pageFunction: SearchPage<FullState> (), initialValue: {} }
}
