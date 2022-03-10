import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import * as samples from '../ChequeCreditbooks/ChequeCreditbooks.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//GetFetcher pact test
pactWith ( { consumer: 'ChequeCreditbooksHistoryDD', provider: 'ChequeCreditbooksHistoryDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a get fetcher for ChequeCreditbooksHistoryDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get fetcher for ChequeCreditbooksHistoryDD',
        withRequest: {
          method: 'GET',
          path: '/api/chequeCreditBooks',
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksHistoryDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }] , ChequeCreditbooks: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        ChequeCreditbooks: {fromApi: samples.sampleChequeCreditbooksHistoryDD0},
        tags: { ChequeCreditbooks_fromApi:["accId","appref","brandRef","custId"] }
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'ChequeCreditbooksHistoryDD', provider: 'ChequeCreditbooksHistoryDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a get rest for ChequeCreditbooksHistoryDD', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksHistoryDDRestDetails', restAction: 'get', path: [ 'ChequeCreditbooks' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      ChequeCreditbooks:{},
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/chequeCreditBooks', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get rest for ChequeCreditbooksHistoryDD',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksHistoryDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], ChequeCreditbooks: { temp: samples.sampleChequeCreditbooksHistoryDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'ChequeCreditbooksHistoryDD', provider: 'ChequeCreditbooksHistoryDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a create rest for ChequeCreditbooksHistoryDD', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksHistoryDDRestDetails', restAction: 'create', path: [ 'ChequeCreditbooks' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      ChequeCreditbooks: { temp:samples.sampleChequeCreditbooksHistoryDD0 },
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/chequeCreditBooks', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a create rest for ChequeCreditbooksHistoryDD',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleChequeCreditbooksHistoryDD0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksHistoryDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], ChequeCreditbooks: { temp: samples.sampleChequeCreditbooksHistoryDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})