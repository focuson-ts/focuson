import { FullSearchDomain, SearchRequirements } from "./fullSearchDomain";
import { commonTagFetchProps, defaultErrorMessage, pageAndTagFetcher, updateTagsAndMessagesOnError } from "@focuson/fetcher";
import { Optional } from "@focuson/lens";
import { createSimpleMessage, SimpleMessage } from "@focuson/pages";
import { defaultDateFn } from "@focuson/utils";

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
