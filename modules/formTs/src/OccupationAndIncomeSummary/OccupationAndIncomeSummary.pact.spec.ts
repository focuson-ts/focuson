import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../OccupationAndIncomeSummary/OccupationAndIncomeSummary.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeDetails', provider: 'OccupationAndIncomeDetailsProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - fetcher', () => {
    it ( 'should have a get fetcher for OccupationAndIncomeDetails', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get fetcher for OccupationAndIncomeDetails',
        withRequest: {
          method: 'GET',
          path: '/customer/occupation/v2/occupationIncomeDetails',
          query:{"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeDetails0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }] , OccupationAndIncomeSummary: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         OccupationAndIncomeSummary: {fromApi:samples.sampleOccupationAndIncomeDetails0},
        tags: { OccupationAndIncomeSummary_fromApi:["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'OccupationAndIncomeDetails', provider: 'OccupationAndIncomeDetailsProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest get', () => {
    it ( 'should have a get rest for OccupationAndIncomeDetails', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeDetailsRestDetails', restAction: 'get', path: [ 'OccupationAndIncomeSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/occupationIncomeDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for OccupationAndIncomeDetails',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeDetails0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { fromApi: samples.sampleOccupationAndIncomeDetails0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest update pact test
pactWith ( { consumer: 'OccupationAndIncomeDetails', provider: 'OccupationAndIncomeDetailsProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest update', () => {
    it ( 'should have a update rest for OccupationAndIncomeDetails', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeDetailsRestDetails', restAction: 'update', path: [ 'OccupationAndIncomeSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary: { fromApi:samples.sampleOccupationAndIncomeDetails0 },
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/occupationIncomeDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a update rest for OccupationAndIncomeDetails',
        withRequest: {
          method: 'PUT',
          path: url,
          query:{"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType"}
          ,body: JSON.stringify(samples.sampleOccupationAndIncomeDetails0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeDetails0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { fromApi: samples.sampleOccupationAndIncomeDetails0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'OtherIncomeResponse', provider: 'OtherIncomeResponseProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary - rest get', () => {
    it ( 'should have a get rest for OtherIncomeResponse', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OtherIncomeResponseRestDetails', restAction: 'get', path: [ 'OccupationAndIncomeSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/otherIncome', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for OtherIncomeResponse',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOtherIncomeResponse0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], OccupationAndIncomeSummary: { other: samples.sampleOtherIncomeResponse0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})