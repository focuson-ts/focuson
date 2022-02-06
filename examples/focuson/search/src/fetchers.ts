import { FetcherTree } from "@focuson/fetcher";
import { searchFetcher } from "./search/search.fetcher";

export function  fetchers(): FetcherTree<any>{
  return {
    fetchers:[searchFetcher()],
    children:[]
  }
}