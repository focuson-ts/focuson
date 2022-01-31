import { focusedPageWithExtraState } from "@focuson/pages";
import { safeArray } from "@focuson/utils";
import { LensProps } from "@focuson/state";

export interface HasSearch {
  search?: SearchDomain
}
export interface SearchDomain {
  query: string,
  queryResults?: string[]
}
export interface FoundThing {
  someData: string
}


export function SearchQueryModalPage<S> ( { state }: LensProps<S, string> ): JSX.Element {
  return <div><label>Search</label><input type='text' defaultValue={state.optJson ()}/></div>
}
export function SearchPage<S> () {
  return focusedPageWithExtraState<S, SearchDomain, string[]> ( s => 'Search' ) ( s => s.focusOn ( 'queryResults' ) ) (
    ( state, { query }, queryResults ) =>
      (<ul><input type='text' defaultValue={query}/><br/>{safeArray ( queryResults ).map ( ( r, i ) => <li key={i}>{r}</li> )} </ul>) )
}