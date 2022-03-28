import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../EAccountsSummary/EAccountsSummary.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import {EAccountsSummaryFetcher} from './EAccountsSummary.fetchers'

describe("Allow pacts to be run from intelliJ for EAccountsSummary", () =>{})

//Rest createPlanRestD get pact test for EAccountsSummary
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - createPlanRestD rest get', () => {
   it ( 'should have a get rest for CreatePlan', async () => {
    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for EAccountsSummary createPlanRestD get',
      withRequest: {
         method: 'GET',
         path:  '/api/createPlan/',
         query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreatePlan0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest createPlanRestD create pact test for EAccountsSummary
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - createPlanRestD rest create', () => {
   it ( 'should have a create rest for CreatePlan', async () => {
    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'create' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for EAccountsSummary createPlanRestD create',
      withRequest: {
         method: 'POST',
         path:  '/api/createPlan/',
         query:{"accountId":"accId","customerId":"custId"},
         body: JSON.stringify(samples.sampleCreatePlan0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreatePlan0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan'), () => samples.sampleCreatePlan0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest createPlanRestD update pact test for EAccountsSummary
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - createPlanRestD rest update', () => {
   it ( 'should have a update rest for CreatePlan', async () => {
    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'update' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for EAccountsSummary createPlanRestD update',
      withRequest: {
         method: 'PUT',
         path:  '/api/createPlan/',
         query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
         body: JSON.stringify(samples.sampleCreatePlan0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreatePlan0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan'), () => samples.sampleCreatePlan0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest createPlanRestD delete pact test for EAccountsSummary
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - createPlanRestD rest delete', () => {
   it ( 'should have a delete rest for CreatePlan', async () => {
    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'delete' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for EAccountsSummary createPlanRestD delete',
      withRequest: {
         method: 'DELETE',
         path:  '/api/createPlan/',
         query:{"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
         //no request body needed for delete,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreatePlan0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest createPlanRestD list pact test for EAccountsSummary
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - createPlanRestD rest list', () => {
   it ( 'should have a list rest for CreatePlan', async () => {
    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'list' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","createPlanId":"tbd","customerId":"custId"},
       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for EAccountsSummary createPlanRestD list',
      withRequest: {
         method: 'GET',
         path:  '/api/createPlan/',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for list,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleCreatePlan0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
describe ( 'EAccountsSummary - eAccountsSummary - fetcher', () => {
  it ( 'should have a  fetcher for EAccountsSummary', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for EAccountsSummary',
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
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }], CommonIds: {"accountId":"accId","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= EAccountsSummaryFetcher (Lenses.identity<FState>().focusQuery('EAccountsSummary'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'EAccountsSummary_~/fromApi': ["accId","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('fromApi').set ( expectedRaw, samples.sampleEAccountsSummary0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest eAccountsSummary get pact test for EAccountsSummary
pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary - eAccountsSummary rest get', () => {
   it ( 'should have a get rest for EAccountsSummary', async () => {
    const restCommand: RestCommand = { name: 'EAccountsSummary_EAccountsSummaryRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","customerId":"custId"},
       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for EAccountsSummary eAccountsSummary get',
      withRequest: {
         method: 'GET',
         path:  '/api/accountsSummary',
         query:{"accountId":"accId","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleEAccountsSummary0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('fromApi').set ( rawExpected, samples.sampleEAccountsSummary0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
