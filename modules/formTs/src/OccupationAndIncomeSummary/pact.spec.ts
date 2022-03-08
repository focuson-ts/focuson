import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import * as samples from './samples';
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//GetFetcher pact test
pactWith ( { consumer: 'OccupationAndIncomeDetailsDD', provider: 'OccupationAndIncomeDetailsDDProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary', () => {
    it ( 'should have a get fetcher for OccupationAndIncomeDetailsDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get fetcher for OccupationAndIncomeDetailsDD',
        withRequest: {
          method: 'GET',
          path: '/customer/occupation/v2/occupationIncomeDetails',
          query:{"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeDetailsDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'OccupationAndIncomeSummary', pageMode: 'view' }] , OccupationAndIncomeSummary: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        OccupationAndIncomeSummary: {fromApi: samples.sampleOccupationAndIncomeDetailsDD0},
        tags: { OccupationAndIncomeSummary_fromApi:["accountSeq","applicationRef","brandRef","vbAccountSeq","vbAccountType"] }
      } )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'OccupationAndIncomeDetailsDD', provider: 'OccupationAndIncomeDetailsDDProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary', () => {
    it ( 'should have a get rest for OccupationAndIncomeDetailsDD', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails', restAction: 'get', path: [ 'OccupationAndIncomeSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary:{},
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/occupationIncomeDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a get rest for OccupationAndIncomeDetailsDD',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeDetailsDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], OccupationAndIncomeSummary: { fromApi: samples.sampleOccupationAndIncomeDetailsDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest update pact test
pactWith ( { consumer: 'OccupationAndIncomeDetailsDD', provider: 'OccupationAndIncomeDetailsDDProvider', cors: true }, provider => {
  describe ( 'OccupationAndIncomeSummary', () => {
    it ( 'should have a update rest for OccupationAndIncomeDetailsDD', async () => {
      const restCommand: RestCommand = { name: 'OccupationAndIncomeSummary_OccupationAndIncomeDetailsDDRestDetails', restAction: 'update', path: [ 'OccupationAndIncomeSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      OccupationAndIncomeSummary: { fromApi:samples.sampleOccupationAndIncomeDetailsDD0 },
        pageSelection: [ { pageName: 'OccupationAndIncomeSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/customer/occupation/v2/occupationIncomeDetails', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'OccupationAndIncomeSummary should have a update rest for OccupationAndIncomeDetailsDD',
        withRequest: {
          method: 'PUT',
          path: url,
          query:{"accountSeq":"accountSeq","applicationRef":"applicationRef","brandRef":"brandRef","vbAccountSeq":"vbAccountSeq","vbAccountType":"vbAccountType"}
          ,body: JSON.stringify(samples.sampleOccupationAndIncomeDetailsDD0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleOccupationAndIncomeDetailsDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], OccupationAndIncomeSummary: { fromApi: samples.sampleOccupationAndIncomeDetailsDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})