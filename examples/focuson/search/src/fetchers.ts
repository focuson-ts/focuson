import { FetcherTree } from "@focuson/fetcher";
import { searchFetcher } from "./search/search.fetcher";
import { Lenses } from "@focuson/lens";
import { FullState } from "./index";
import { DateFn, defaultDateFn } from "@focuson/utils";

export function fetchers (dateFn: DateFn): FetcherTree<any> {
  return {
    fetchers: [ searchFetcher ( Lenses.identity<FullState> ().focusQuery ( 'search' ), dateFn ) ],
    children: []
  }
}