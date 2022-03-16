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
pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - rest get', () => {
    it ( 'should have a get rest for CreatePlan', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for CreatePlan',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlan0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest create pact test
pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - rest create', () => {
    it ( 'should have a create rest for CreatePlan', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'create' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary: { tempCreatePlan:samples.sampleCreatePlan0 },
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a create rest for CreatePlan',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleCreatePlan0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlan0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest update pact test
pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - rest update', () => {
    it ( 'should have a update rest for CreatePlan', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'update' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary: { tempCreatePlan:samples.sampleCreatePlan0 },
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a update rest for CreatePlan',
        withRequest: {
          method: 'PUT',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleCreatePlan0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlan0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest delete pact test
pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - rest delete', () => {
    it ( 'should have a delete rest for CreatePlan', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'delete' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a delete rest for CreatePlan',
        withRequest: {
          method: 'DELETE',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          //no body for delete
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlan0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest list pact test
pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - rest list', () => {
    it ( 'should have a list rest for CreatePlan', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'list' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a list rest for CreatePlan',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for list
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreatePlan0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - fetcher', () => {
    it ( 'should have a get fetcher for EAccountsSummary', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get fetcher for EAccountsSummary',
        withRequest: {
          method: 'GET',
          path: '/api/accountsSummary',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummary0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      const withIds = massTransform(firstState,)
      let newState = await loadTree ( fetchers.fetchers, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         EAccountsSummary: {fromApi:samples.sampleEAccountsSummary0},
        tags: { EAccountsSummary_fromApi:["accId","custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - rest get', () => {
    it ( 'should have a get rest for EAccountsSummary', async () => {
      const restCommand: RestCommand = { name: 'EAccountsSummary_EAccountsSummaryRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      EAccountsSummary:{},
        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/accountsSummary', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get rest for EAccountsSummary',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummary0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { fromApi: samples.sampleEAccountsSummary0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})