import { FetcherTree } from "@focuson/fetcher";
import { searchFetcher } from "./search/searchPage";

export function  fetchers(): FetcherTree<any>{
  return {
    fetchers:[searchFetcher()],
    children:[]
  }
}