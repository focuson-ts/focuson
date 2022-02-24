import { HasPageSelection } from "@focuson/pages";
import {  } from "@focuson/fetcher";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";

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
