import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../ChequeCreditbooks/ChequeCreditbooks.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//GetFetcher pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - fetcher', () => {
    it ( 'should have a get fetcher for ChequeCreditbooksDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get fetcher for ChequeCreditbooksDD',
        withRequest: {
          method: 'GET',
          path: '/api/chequeCreditBooks',
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }] , ChequeCreditbooks: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         ChequeCreditbooks: {fromApi:samples.sampleChequeCreditbooksDD0},
        tags: { ChequeCreditbooks_fromApi:["accId","appref","brandRef","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - rest get', () => {
    it ( 'should have a get rest for ChequeCreditbooksDD', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksDDRestDetails', restAction: 'get', path: [ 'ChequeCreditbooks' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      ChequeCreditbooks:{},
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/chequeCreditBooks', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get rest for ChequeCreditbooksDD',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooksDD0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - rest create', () => {
    it ( 'should have a create rest for ChequeCreditbooksDD', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksDDRestDetails', restAction: 'create', path: [ 'ChequeCreditbooks' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      ChequeCreditbooks: { fromApi:samples.sampleChequeCreditbooksDD0 },
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/chequeCreditBooks', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a create rest for ChequeCreditbooksDD',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleChequeCreditbooksDD0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooksDD0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})