import { applyFetcher, loadTree } from '@focuson/fetcher'
import { pactWith } from "jest-pact";
import { emptySearchRequirement, searchSampleBob, searchSamplePhil } from "./search.sample";
import { fetchers } from "../fetchers";
import { defaultFetchFn, fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { searchFetcher } from "./search.fetcher";
import { Lenses } from "@focuson/lens";
import { expand } from "@focuson/template";


describe ( "searchFetcher", () => {
  it ( "should handle a 'can't connect' ", async () => {
    let fetchFn = fetchWithPrefix ( "http://localhost:9999", defaultFetchFn );
    let s = { ...emptySearchRequirement, search: { query: "bob" } };
    let fetcher = searchFetcher ( Lenses.identity<typeof s> ().focusQuery ( 'search' ) );
    expect( fetcher.shouldLoad(s)).toEqual(true)
    const ns = await applyFetcher ( fetcher, s, fetchFn )
    // expect(ns).toEqual('')
    expect ( ns.messages ).toEqual ( [ {
      "level": "error",
      "msg": "Failed to fetch data from [/api/search?search=bob,undefined] status 600\nResponse {\"message\":\"request to http://localhost:9999/api/search?search=bob failed, reason: connect ECONNREFUSED 127.0.0.1:9999\",\"type\":\"system\",\"errno\":\"ECONNREFUSED\",\"code\":\"ECONNREFUSED\"}}",
      "time": "timeForTest"
    } ] )
  } )
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
          query: { search: "phil" }
        },
        willRespondWith: {
          status: 200,
          body: searchSamplePhil.queryResults
        },
      } )
      let f = fetchers ().fetchers[ 0 ]

      let ns = { ...emptySearchRequirement, search: { query: "phil" } };
      // console.log(f)
      // console.log('ns',ns)
      // console.log('wouldLoad',f.shouldLoad(ns))
      let newState = await loadTree ( fetchers (), ns, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ...emptySearchRequirement,
        messages: [ { "level": "info", "msg": "phil1,phil2,phil3", "time": "timeForTest" } ],
        search: {
          "query": "phil",
          "queryResults": [ "phil1", "phil2", "phil3" ]
        },
        tags: { "search": [ "phil" ] }
      } )
    } )
    it ( 'should search for bob', async () => {
      await provider.addInteraction ( {
        state: "I have a person 'bob'",
        uponReceiving: "a query for 'bob'",
        withRequest: {
          method: 'GET',
          path: '/api/search',
          query: { search: "bob" }
        },
        willRespondWith: {
          status: 200,
          body: searchSampleBob.queryResults
        },
      } )
      let newState = await loadTree ( fetchers (), { ...emptySearchRequirement, search: { query: "bob" } }, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ...emptySearchRequirement,
        messages: [ { "level": "info", "msg": "bob1,bob2,bob3", "time": "timeForTest" } ],
        search: {
          "query": "bob",
          "queryResults": [ "bob1", "bob2", "bob3" ]
        },
        tags: { "search": [ "bob" ] }
      } )
    } )


  } )
} )