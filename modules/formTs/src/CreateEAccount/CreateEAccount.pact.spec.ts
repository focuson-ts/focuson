import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../CreateEAccount/CreateEAccount.samples'
import {emptyState, FState } from "../common";
import * as fetchers from "../fetchers";
import * as rests from "../rests";
//Rest create pact test
pactWith ( { consumer: 'CreateEAccountDataDD', provider: 'CreateEAccountDataDDProvider', cors: true }, provider => {
  describe ( 'CreateEAccount', () => {
    it ( 'should have a create rest for CreateEAccountDataDD', async () => {
      const restCommand: RestCommand = { name: 'CreateEAccount_CreateEAccountDataDDRestDetails', restAction: 'create', path: [ 'CreateEAccount' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      CreateEAccount: { editing:samples.sampleCreateEAccountDataDD0 },
        pageSelection: [ { pageName: 'CreateEAccount', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createEAccount/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'CreateEAccount should have a create rest for CreateEAccountDataDD',
        withRequest: {
          method: 'POST',
          path: url,
          query:{"accountId":"accId","customerId":"custId"}
          ,body: JSON.stringify(samples.sampleCreateEAccountDataDD0)
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreateEAccountDataDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], CreateEAccount: { editing: samples.sampleCreateEAccountDataDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'CreateEAccountDataDD', provider: 'CreateEAccountDataDDProvider', cors: true }, provider => {
  describe ( 'CreateEAccount', () => {
    it ( 'should have a get rest for CreateEAccountDataDD', async () => {
      const restCommand: RestCommand = { name: 'CreateEAccount_CreateEAccountDataDDRestDetails', restAction: 'get', path: [ 'CreateEAccount' ] }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      CreateEAccount:{},
        pageSelection: [ { pageName: 'CreateEAccount', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/createEAccount/{createPlanId}', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'CreateEAccount should have a get rest for CreateEAccountDataDD',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleCreateEAccountDataDD0
        },
      } )
      //export declare function rest<S, MSGS>(fetchFn: FetchFn, d: RestDetails<S, MSGS>, messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, s: S): Promise<S>;
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), firstState )
      expect ( { ...newState, messages: []}).toEqual ( { ...firstState, restCommands: [], CreateEAccount: { editing: samples.sampleCreateEAccountDataDD0} } )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})