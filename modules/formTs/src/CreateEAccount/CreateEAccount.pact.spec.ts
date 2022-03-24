import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../CreateEAccount/CreateEAccount.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
describe("To support manually running the tests", () =>{it ("should support CreateEAccount", () =>{})})
//Rest create pact test
pactWith ( { consumer: 'CreateEAccountData', provider: 'CreateEAccountDataProvider', cors: true }, provider => {
  describe ( 'CreateEAccount - rest create', () => {
    it ( 'should have a create rest for CreateEAccountData', async () => {
      const restCommand: RestCommand = { name: 'CreateEAccount_CreateEAccountDataRestDetails', restAction: 'create' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      CreateEAccount: { editing:samples.sampleCreateEAccountData0 },
        pageSelection: [ { pageName: 'CreateEAccount', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createEAccount/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'CreateEAccount should have a create rest for CreateEAccountData',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleCreateEAccountData0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreateEAccountData0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], CreateEAccount: { editing: samples.sampleCreateEAccountData0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'CreateEAccountData', provider: 'CreateEAccountDataProvider', cors: true }, provider => {
  describe ( 'CreateEAccount - rest get', () => {
    it ( 'should have a get rest for CreateEAccountData', async () => {
      const restCommand: RestCommand = { name: 'CreateEAccount_CreateEAccountDataRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      CreateEAccount:{},
        pageSelection: [ { pageName: 'CreateEAccount', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createEAccount/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'CreateEAccount should have a get rest for CreateEAccountData',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreateEAccountData0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], CreateEAccount: { editing: samples.sampleCreateEAccountData0} }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})