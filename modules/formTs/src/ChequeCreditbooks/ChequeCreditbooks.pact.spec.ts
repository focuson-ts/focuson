import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../ChequeCreditbooks/ChequeCreditbooks.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import {ChequeCreditbooksFetcher} from './ChequeCreditbooks.fetchers'
describe("To support manually running the tests", () =>{it ("should support ChequeCreditbooks", () =>{})})
//GetFetcher pact test
pactWith ( { consumer: 'ChequeCreditbooks', provider: 'ChequeCreditbooksProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - fetcher', () => {
    it ( 'should have a get fetcher for ChequeCreditbooks', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get fetcher for ChequeCreditbooks',
        withRequest: {
          method: 'GET',
          path: '/api/chequeCreditBooks',
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooks0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }] , ChequeCreditbooks: { }}
      const withIds = massTransform(firstState,)
       const f: FetcherTree<FState> = { fetchers: [ ChequeCreditbooksFetcher ( identityL.focusQuery ( 'ChequeCreditbooks' ), commonIds ) ], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         ChequeCreditbooks: {fromApi:samples.sampleChequeCreditbooks0},
        tags: { ChequeCreditbooks_fromApi:["accId","appref","brandRef","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'ChequeCreditbooks', provider: 'ChequeCreditbooksProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - rest get', () => {
    it ( 'should have a get rest for ChequeCreditbooks', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      ChequeCreditbooks:{},
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/chequeCreditBooks', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get rest for ChequeCreditbooks',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooks0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooks0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'ChequeCreditbooks', provider: 'ChequeCreditbooksProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - rest create', () => {
    it ( 'should have a create rest for ChequeCreditbooks', async () => {
      const restCommand: RestCommand = { name: 'ChequeCreditbooks_ChequeCreditbooksRestDetails', restAction: 'create' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      ChequeCreditbooks: { fromApi:samples.sampleChequeCreditbooks0 },
        pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/chequeCreditBooks', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a create rest for ChequeCreditbooks',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleChequeCreditbooks0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooks0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], ChequeCreditbooks: { fromApi: samples.sampleChequeCreditbooks0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})