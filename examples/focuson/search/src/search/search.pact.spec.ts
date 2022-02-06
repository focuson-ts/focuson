import { loadTree } from '@focuson/fetcher'
import { pactWith } from "jest-pact";
import { emptySearchRequirement, searchSampleBob, searchSamplePhil } from "./search.sample";
import { fetchers } from "../fetchers";
import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";


describe ( "searchFetcher", () => {
  it ( "", () => {} )
} )

pactWith ( { consumer: 'Statement', provider: 'EAccountsApi', cors: true }, provider => {

  describe ( "searching ", () => {

    it ( 'should search for phil', async () => {
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
          body: searchSamplePhil.queryResults
        },
      } )
      let newState = await loadTree ( fetchers (), { ...emptySearchRequirement, search: { query: "phil" } }, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ...emptySearchRequirement,
        search: {
          "query": "phil",
          "queryResults": [ "phil1", "phil2", "phil3" ]
        },
        tags: { "search_search": [ "phil" ] }
      } )
    } )
    it ( 'should search for bob', async () => {
      await provider.addInteraction ( {
        state: "I have a person 'bob'",
        uponReceiving: "a query for 'bob'",
        withRequest: {
          method: 'GET',
          path: '/api/search',
          query: { query: "bob" }
        },
        willRespondWith: {
          status: 200,
          body: searchSampleBob.queryResults
        },
      } )
      let newState = await loadTree ( fetchers (), { ...emptySearchRequirement, search: { query: "bob" } }, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ...emptySearchRequirement,
        search: {
          "query": "bob",
          "queryResults": [ "bob1", "bob2", "bob3" ]
        },
        tags: { "search_search": [ "bob" ] }
      } )
    } )
  } )
} )