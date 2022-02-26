import { FetcherTree } from "@focuson/fetcher";
import { searchFetcher } from "./search/search.fetcher";
import { Lenses } from "@focuson/lens";
import { FullState } from "./index";

export function fetchers (): FetcherTree<any> {
  return {
    fetchers: [ searchFetcher ( Lenses.identity<FullState> ().focusQuery ( 'search' ) ) ],
    children: []
  }
}