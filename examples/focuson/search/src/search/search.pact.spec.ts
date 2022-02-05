import { loadTree } from '@focuson/fetcher'
import { pactWith } from "jest-pact";
import { emptySearchRequirement, searchSamplePhil } from "./search.sample";
import { fetchers } from "../fetchers";
import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";


describe ( "searchFetcher", () => {
  it ( "", () => {} )
} )

pactWith ( { consumer: 'Statement', provider: 'EAccountsApi', cors: true }, provider => {

  describe ( "searching for 'phil'", () => {

    it ( 'should fetch e-account data when needed and add it to the state', async () => {
      await provider.addInteraction ( {
        state: "I have a person 'phil'",
        uponReceiving: "a query for 'phil'",
        withRequest: {
          method: 'GET',
          path: '/api/search',
          query: { query: "phil" }
        },
        willRespondWith: {
          status: 200,
          body: searchSamplePhil
        },
      } )
      let newState = await loadTree ( fetchers (), { ...emptySearchRequirement, search: { query: "phil" } }, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ...emptySearchRequirement,
        search: {
          "query": "phil",
          "queryResults": {
            "query": "phil",
            "queryResults": [ "phil1", "phil2", "phil3" ]
          }
        },
        tags: { "search_search": [ "phil" ] }
      } )
    } )
  } )
} )