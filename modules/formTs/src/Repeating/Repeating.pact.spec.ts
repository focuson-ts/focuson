import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../Repeating/Repeating.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {RepeatingWholeDataFetcher} from './Repeating.fetchers'

describe("Allow pacts to be run from intelliJ for Repeating", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'Repeating', provider: 'RepeatingProvider', cors: true }, provider => {
describe ( 'Repeating - repeating - fetcher', () => {
  it ( 'should have a  fetcher for RepeatingWholeData', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for RepeatingWholeData',
      withRequest: {
        method: 'GET',
        path: '/api/repeating',
        query:{"clientRef":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleRepeatingWholeData0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'Repeating', pageMode: 'view' }], CommonIds: {"clientRef":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= RepeatingWholeDataFetcher (Lenses.identity<FState>().focusQuery('Repeating'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'Repeating_~/fromApi': ["custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi').set ( expectedRaw, samples.sampleRepeatingWholeData0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest repeating create pact test for Repeating
pactWith ( { consumer: 'Repeating', provider: 'RepeatingProvider', cors: true }, provider => {
  describe ( 'Repeating - repeating rest create', () => {
   it ( 'should have a create rest for RepeatingWholeData', async () => {
    const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: "create" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'Repeating', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for Repeating repeating create',
      withRequest: {
         method: 'POST',
         path:   '/api/repeating',
         query:{"clientRef":"custId"},
         body: JSON.stringify(samples.sampleRepeatingWholeData0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleRepeatingWholeData0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi'), () => samples.sampleRepeatingWholeData0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi').set ( rawExpected, samples.sampleRepeatingWholeData0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest repeating get pact test for Repeating
pactWith ( { consumer: 'Repeating', provider: 'RepeatingProvider', cors: true }, provider => {
  describe ( 'Repeating - repeating rest get', () => {
   it ( 'should have a get rest for RepeatingWholeData', async () => {
    const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"clientRef":"custId"},
       pageSelection: [ { pageName: 'Repeating', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for Repeating repeating get',
      withRequest: {
         method: 'GET',
         path:   '/api/repeating',
         query:{"clientRef":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleRepeatingWholeData0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi').set ( rawExpected, samples.sampleRepeatingWholeData0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
