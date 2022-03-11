import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import * as samples from '../PostCodeDemo/PostCodeDemo.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
describe("",() =>it("",()=>{}))
//GetFetcher pact test
pactWith ( { consumer: 'PostCodeData', provider: 'PostCodeDataProvider', cors: true }, provider => {
  describe ( 'PostCodeDemo', () => {
    it ( 'should have a get fetcher for PostCodeData', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'PostCodeDemo should have a get fetcher for PostCodeData',
        withRequest: {
          method: 'GET',
          path: '/api/postCode',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.samplePostCodeData0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'PostCodeDemo', pageMode: 'view' }] , PostCodeDemo: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        PostCodeDemo: {postcode:{searchResults: samples.samplePostCodeData0}},
        tags: { PostCodeDemo_postcode_searchResults:["custId"]}
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'PostCodeData', provider: 'PostCodeDataProvider', cors: true }, provider => {
  describe ( 'PostCodeDemo', () => {
    it ( 'should have a get rest for PostCodeData', async () => {
      const restCommand: RestCommand = { name: 'PostCodeDemo_PostCodeDataRestDetails', restAction: 'get', path: [ 'PostCodeDemo' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      PostCodeDemo:{},
        pageSelection: [ { pageName: 'PostCodeDemo', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/postCode', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'PostCodeDemo should have a get rest for PostCodeData',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.samplePostCodeData0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], PostCodeDemo: { postcode:{searchResults: samples.samplePostCodeData0}} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})