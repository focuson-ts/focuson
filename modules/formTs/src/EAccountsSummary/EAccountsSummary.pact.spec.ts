import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../EAccountsSummary/EAccountsSummary.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//Rest get pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'get', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for CreatePlanDD',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a create rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'create', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary: { tempCreatePlan:samples.sampleCreatePlanDD0 },
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a create rest for CreatePlanDD',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleCreatePlanDD0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest update pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a update rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'update', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary: { tempCreatePlan:samples.sampleCreatePlanDD0 },
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a update rest for CreatePlanDD',
        withRequest: {
          method: 'PUT',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleCreatePlanDD0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest delete pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a delete rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'delete', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a delete rest for CreatePlanDD',
        withRequest: {
          method: 'DELETE',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          //no body for delete
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest list pact test
pactWith ( { consumer: 'CreatePlanDD', provider: 'CreatePlanDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a list rest for CreatePlanDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanDDRestDetails', restAction: 'list', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a list rest for CreatePlanDD',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for list
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlanDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlanDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get fetcher for EAccountsSummaryDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get fetcher for EAccountsSummaryDD',
        withRequest: {
          method: 'GET',
          path: '/api/accountsSummary',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummaryDD0
        },
      } )
      const ids = {postcode: Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search')}
const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
const withIds = massTransform(firstState,)
let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
let expectedRaw: any = {
  ... firstState,
   EAccountsSummary: {fromApi:samples.sampleEAccountsSummaryDD0},
  tags: { EAccountsSummary_fromApi:["accId","custId"]}
};
const expected = massTransform(expectedRaw,)
expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get rest for EAccountsSummaryDD', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_EAccountsSummaryDDRestDetails', restAction: 'get', path: [ 'EAccountsSummary' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountsSummary', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for EAccountsSummaryDD',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummaryDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], EAccountsSummary: { fromApi: samples.sampleEAccountsSummaryDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})