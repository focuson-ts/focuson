import { HasPageSelection, HasSimpleMessages } from "@focuson/pages";
import { HasTagHolder } from "@focuson/fetcher";

export interface SearchRequirements extends HasSearch, HasSimpleMessages, HasTagHolder, HasPageSelection {

}

export interface HasSearch {
  search?: FullSearchDomain
}
export interface FullSearchDomain {
  query: string,
  queryResults?: string[]
}
export interface FoundThing {
  someData: string
}
