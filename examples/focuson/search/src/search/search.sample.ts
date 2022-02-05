import { FullSearchDomain, SearchRequirements } from "./fullSearchDomain";
import { HasPageSelection } from "@focuson/pages";
import { PostCommand } from "@focuson/poster";
import { HasPostCommand } from "@focuson/poster/src/posters";


export const emptySearchRequirement: SearchRequirements & HasPageSelection<any> & HasPostCommand<any, any> = {
  tags: {},
  messages: {},
  pageSelection: { pageName: 'search' },
  postCommands: [],
}

export const searchSamplePhil: FullSearchDomain = {
  query: "phil",
  queryResults: [ "phil1", "phil2", "phil3" ]

}

export const searchSampleBob: FullSearchDomain = {
  query: "bob",
  queryResults: [ "bob1", "bob2", "bob3" ]

}