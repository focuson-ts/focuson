import { FullSearchDomain, SearchRequirements } from "./fullSearchDomain";
import { defaultErrorMessage, updateTagsAndMessagesOnError } from "@focuson/fetcher";
import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils";
import { commonTagFetchProps, pageAndTagFetcher } from "@focuson/focuson";
import { identityOptics, Lenses, Optional } from "@focuson/lens";

// function withMessages<S extends HasSimpleMessages & HasTagHolder & HasPageSelection> () {
//   return commonTagFetchProps<S, string> ( ( s, date ) => [ createSimpleMessage ( 'info', s, date ) ], defaultDateFn );
// }

export function searchFetcher<S extends SearchRequirements> ( fdLens: Optional<S, FullSearchDomain>, dateFn: DateFn ) {
  return pageAndTagFetcher<S, FullSearchDomain, string[], SimpleMessage> (
    commonTagFetchProps<S, string[]> ( ( s, date ) => [ createSimpleMessage ( 'info', s.toString (), date ) ], dateFn )
    ( updateTagsAndMessagesOnError ( defaultErrorMessage ) ),
    'search',
    undefined,
    fdLens,
    {},
    { search: Lenses.identity<FullSearchDomain> ().focusQuery ( 'query' ) },
    [], [ 'search' ],
    Lenses.identity<FullSearchDomain> ().focusQuery ( 'queryResults' ),
    `/api/search?{query}` )
}
