import { SearchRequirements } from "./fullSearchDomain";
import { commonTagFetchProps, defaultErrorMessage, HasTagHolder, pageAndTagFetcher, updateTagsAndMessagesOnError } from "@focuson/fetcher";
import { Lenses } from "@focuson/lens";
import { createSimpleMessage, HasPageSelection, HasSimpleMessages, SimpleMessage } from "@focuson/pages";
import { defaultDateFn } from "@focuson/utils";

// function withMessages<S extends HasSimpleMessages & HasTagHolder & HasPageSelection> () {
//   return commonTagFetchProps<S, string> ( ( s, date ) => [ createSimpleMessage ( 'info', s, date ) ], defaultDateFn );
// }

export function searchFetcher<S extends SearchRequirements> () {
  return pageAndTagFetcher<S, string[], SimpleMessage> (
    commonTagFetchProps<S, string[]> ( ( s, date ) => [ createSimpleMessage ( 'info', s.toString (), date ) ], defaultDateFn ) ( updateTagsAndMessagesOnError ( defaultErrorMessage ) ),
    'search',
    undefined,
    //@ts-ignore
    Lenses.identity<S> ().focusQuery ( 'search' ).focusQuery ( 'queryResults' ),
    s => [ s.search?.query ],
    s => [ `/api/search?query=${s.search?.query}`, undefined ]
  )
}
