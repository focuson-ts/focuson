import { FullSearchDomain, SearchRequirements } from "./fullSearchDomain";
import { defaultErrorMessage, updateTagsAndMessagesOnError } from "@focuson/fetcher";
import { createSimpleMessage, defaultDateFn, SimpleMessage } from "@focuson/utils";
import { commonTagFetchProps, pageAndTagFetcher } from "@focuson/focuson";

// function withMessages<S extends HasSimpleMessages & HasTagHolder & HasPageSelection> () {
//   return commonTagFetchProps<S, string> ( ( s, date ) => [ createSimpleMessage ( 'info', s, date ) ], defaultDateFn );
// }

export function searchFetcher<S extends SearchRequirements> () {
  return pageAndTagFetcher<S, FullSearchDomain, string[], SimpleMessage> (
    commonTagFetchProps<S,  string[]> ( ( s, date ) => [ createSimpleMessage ( 'info', s.toString (), date ) ], defaultDateFn ) ( updateTagsAndMessagesOnError ( defaultErrorMessage ) ),
    'search',
    undefined,
    s => s.focusQuery ( 'queryResults' ),
    s => [ s.search?.query ],
    s => [ `/api/search?query=${s.search?.query}`, undefined ]
  )
}
