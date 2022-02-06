import { FullSearchDomain, SearchRequirements } from "./fullSearchDomain";
import { commonFetch, stateAndFromApiTagFetcher } from "@focuson/fetcher";
import { Optional } from "@focuson/lens";

export function searchFetcher<S extends SearchRequirements> () {
  return stateAndFromApiTagFetcher<S, string[]> (
    commonFetch<S> (),
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
