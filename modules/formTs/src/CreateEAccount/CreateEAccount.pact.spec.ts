import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL} from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../CreateEAccount/CreateEAccount.samples'
import {emptyState, FState , commonIds, identityL, pathToLens } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";

describe("Allow pacts to be run from intelliJ for CreateEAccount", () =>{})

//Rest eTransfer create pact test for CreateEAccount
pactWith ( { consumer: 'CreateEAccount', provider: 'CreateEAccountProvider', cors: true }, provider => {
  describe ( 'CreateEAccount - eTransfer rest create', () => {
   it ( 'should have a create rest for CreateEAccountData', async () => {
    const restCommand: RestCommand = { name: 'CreateEAccount_CreateEAccountDataRestDetails', restAction: "create" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId","createPlanId":"tbd"},
       pageSelection: [ { pageName: 'CreateEAccount', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for CreateEAccount eTransfer create',
      withRequest: {
         method: 'POST',
         path:   '/api/createEAccount/',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId"},
         body: JSON.stringify(samples.sampleCreateEAccountData0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreateEAccountData0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('CreateEAccount').focusQuery('editing'), () => samples.sampleCreateEAccountData0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('CreateEAccount').focusQuery('editing').set ( rawExpected, samples.sampleCreateEAccountData0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest eTransfer get pact test for CreateEAccount
pactWith ( { consumer: 'CreateEAccount', provider: 'CreateEAccountProvider', cors: true }, provider => {
  describe ( 'CreateEAccount - eTransfer rest get', () => {
   it ( 'should have a get rest for CreateEAccountData', async () => {
    const restCommand: RestCommand = { name: 'CreateEAccount_CreateEAccountDataRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId","createPlanId":"tbd"},
       pageSelection: [ { pageName: 'CreateEAccount', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for CreateEAccount eTransfer get',
      withRequest: {
         method: 'GET',
         path:   '/api/createEAccount/',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","clientRef":"custId","createPlanId":"tbd"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreateEAccountData0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('CreateEAccount').focusQuery('editing').set ( rawExpected, samples.sampleCreateEAccountData0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
