import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import * as samples from '../Repeating/Repeating.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//Rest create pact test
pactWith ( { consumer: 'RepeatingWholeData', provider: 'RepeatingWholeDataProvider', cors: true }, provider => {
  describe ( 'Repeating', () => {
    it ( 'should have a create rest for RepeatingWholeData', async () => {
      const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: 'create', path: [ 'Repeating' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      Repeating: { fromApi:samples.sampleRepeatingWholeData0 },
        pageSelection: [ { pageName: 'Repeating', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/repeating', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'Repeating should have a create rest for RepeatingWholeData',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"customerId":"custId"}
          ,body: JSON.stringify(samples.sampleRepeatingWholeData0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleRepeatingWholeData0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], Repeating: { fromApi: samples.sampleRepeatingWholeData0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'RepeatingWholeData', provider: 'RepeatingWholeDataProvider', cors: true }, provider => {
  describe ( 'Repeating', () => {
    it ( 'should have a get fetcher for RepeatingWholeData', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'Repeating should have a get fetcher for RepeatingWholeData',
        withRequest: {
          method: 'GET',
          path: '/api/repeating',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleRepeatingWholeData0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'Repeating', pageMode: 'view' }] , Repeating: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        Repeating: {fromApi: samples.sampleRepeatingWholeData0},
        tags: { Repeating_fromApi:["custId"] }
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'RepeatingWholeData', provider: 'RepeatingWholeDataProvider', cors: true }, provider => {
  describe ( 'Repeating', () => {
    it ( 'should have a get rest for RepeatingWholeData', async () => {
      const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: 'get', path: [ 'Repeating' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      Repeating:{},
        pageSelection: [ { pageName: 'Repeating', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/repeating', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'Repeating should have a get rest for RepeatingWholeData',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleRepeatingWholeData0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], Repeating: { fromApi: samples.sampleRepeatingWholeData0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})