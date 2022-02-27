import { FullSearchDomain, SearchRequirements } from "./fullSearchDomain";
import { HasPageSelection } from "@focuson/pages";
import { HasPostCommand } from "@focuson/poster/src/posters";


export const emptySearchRequirement: SearchRequirements & HasPageSelection & HasPostCommand<any, any> = {
  tags: {},
  messages: [],
  pageSelection: [ { pageName: 'search', pageMode: 'view' } ],
  postCommands: [],
  // debug:{tagFetcherDebug: true}
}

export const searchSamplePhil: FullSearchDomain = {
  query: "phil",
  queryResults: [ "phil1", "phil2", "phil3" ]

}

export const searchSampleBob: FullSearchDomain = {
  query: "bob",
  queryResults: [ "bob1", "bob2", "bob3" ]

}