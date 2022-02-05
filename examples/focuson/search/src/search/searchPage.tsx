import { focusedPageWithExtraState, HasPageSelection } from "@focuson/pages";
import { safeArray } from "@focuson/utils";
import { LensProps } from "@focuson/state";
import { FullSearchDomain, HasSearch, SearchRequirements } from "./fullSearchDomain";

import { commonFetch } from "@focuson/fetcher/dist/src/tagFetcher";
import { stateAndFromApiTagFetcher } from "@focuson/fetcher";
import { Optional } from "@focuson/lens";


export function searchFetcher<S extends SearchRequirements & HasPageSelection<SearchRequirements>> () {
  return stateAndFromApiTagFetcher<S, SearchRequirements, string[], 'search'> (
    commonFetch<S, SearchRequirements> (),
    'search',
    'search',
    l => {
      //@ts-ignore
      let optional: Optional<S, FullSearchDomain> = l.focusQuery ( 'search' );
      return optional.focusQuery ( 'queryResults' );
    },
    s => [ s.search?.query ],
    s => [ `/api/search?query=${s.search?.query}`, undefined ] )
}

export function SearchQueryModalPage<S> ( { state }: LensProps<S, string> ): JSX.Element {
  return <div><label>Search</label><input type='text' defaultValue={state.optJson ()}/></div>
}
export function SearchPage<S> () {
  return focusedPageWithExtraState<S, FullSearchDomain, string[]> ( s => 'Search' ) ( s => s.focusOn ( 'queryResults' ) ) (
    ( state, { query }, queryResults ) =>
      (<ul><input type='text' defaultValue={query}/><br/>{safeArray ( queryResults ).map ( ( r, i ) => <li key={i}>{r}</li> )} </ul>) )
}