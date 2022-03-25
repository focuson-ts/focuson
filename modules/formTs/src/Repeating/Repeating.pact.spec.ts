import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../Repeating/Repeating.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import {RepeatingWholeDataFetcher} from './Repeating.fetchers'
describe("To support manually running the tests", () =>{it ("should support Repeating", () =>{})})
//Rest create pact test
pactWith ( { consumer: 'RepeatingWholeData', provider: 'RepeatingWholeDataProvider', cors: true }, provider => {
  describe ( 'Repeating - rest create', () => {
    it ( 'should have a create rest for RepeatingWholeData', async () => {
      const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: 'create' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      Repeating: { makeTargetFor ( r.targetFromPath ) //needs fixing;:samples.sampleRepeatingWholeData0  closeTargetFor ( r.targetFromPath );//needs fixing,
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
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], Repeating: { makeTargetFor ( r.targetFromPath ) //needs fixing;: samples.sampleRepeatingWholeData0 closeTargetFor ( r.targetFromPath );//needs fixing }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'RepeatingWholeData', provider: 'RepeatingWholeDataProvider', cors: true }, provider => {
  describe ( 'Repeating - fetcher', () => {
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
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'Repeating', pageMode: 'view' }] , Repeating: { }}
      const withIds = massTransform(firstState,)
       const f: FetcherTree<FState> = { fetchers: [ RepeatingWholeDataFetcher ( identityL.focusQuery ( 'Repeating' ), commonIds ) ], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         Repeating: {makeTargetFor ( path )//needs fixing:samples.sampleRepeatingWholeData0closeTargetFor ( path ) //needs fixing ,
        tags: { Repeating_~_/_f_r_o_m_A_p_i:["custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'RepeatingWholeData', provider: 'RepeatingWholeDataProvider', cors: true }, provider => {
  describe ( 'Repeating - rest get', () => {
    it ( 'should have a get rest for RepeatingWholeData', async () => {
      const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: 'get' }
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
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], Repeating: { makeTargetFor ( r.targetFromPath ) //needs fixing;: samples.sampleRepeatingWholeData0 closeTargetFor ( r.targetFromPath );//needs fixing }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})