import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../ChequeCreditbooks/ChequeCreditbooks.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {_ChequeCreditbooksFetcher} from './ChequeCreditbooks.fetchers'

describe("Allow pacts to be run from intelliJ for ChequeCreditbooks", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'ChequeCreditbooks', provider: 'ChequeCreditbooksProvider', cors: true }, provider => {
describe ( 'ChequeCreditbooks - chequeCreditBooks - fetcher', () => {
  it ( 'should have a  fetcher for ChequeCreditbooks', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for ChequeCreditbooks',
      withRequest: {
        method: 'GET',
        path: '/api/chequeCreditBooks',
        query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleChequeCreditbooks0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }], CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= _ChequeCreditbooksFetcher (Lenses.identity<FState>().focusQuery('ChequeCreditbooks'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'ChequeCreditbooks_~/fromApi': ["accId","appref","brandRef","custId"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('ChequeCreditbooks').focusQuery('fromApi').set ( expectedRaw, samples.sampleChequeCreditbooks0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest chequeCreditBooks get pact test for ChequeCreditbooks
pactWith ( { consumer: 'ChequeCreditbooks', provider: 'ChequeCreditbooksProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - chequeCreditBooks rest get', () => {
   it ( 'should have a get rest for ChequeCreditbooks', async () => {
    const restCommand: RestCommand = { name: 'ChequeCreditbooks__ChequeCreditbooksRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"},
       pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ChequeCreditbooks chequeCreditBooks get',
      withRequest: {
         method: 'GET',
         path:   '/api/chequeCreditBooks',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleChequeCreditbooks0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ChequeCreditbooks').focusQuery('fromApi').set ( rawExpected, samples.sampleChequeCreditbooks0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//Rest chequeCreditBooks create pact test for ChequeCreditbooks
pactWith ( { consumer: 'ChequeCreditbooks', provider: 'ChequeCreditbooksProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks - chequeCreditBooks rest create', () => {
   it ( 'should have a create rest for ChequeCreditbooks', async () => {
    const restCommand: RestCommand = { name: 'ChequeCreditbooks__ChequeCreditbooksRestDetails', restAction: 'create' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"},
       pageSelection: [ { pageName: 'ChequeCreditbooks', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ChequeCreditbooks chequeCreditBooks create',
      withRequest: {
         method: 'POST',
         path:   '/api/chequeCreditBooks',
         query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"},
         body: JSON.stringify(samples.sampleChequeCreditbooks0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleChequeCreditbooks0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('ChequeCreditbooks').focusQuery('fromApi'), () => samples.sampleChequeCreditbooks0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ChequeCreditbooks').focusQuery('fromApi').set ( rawExpected, samples.sampleChequeCreditbooks0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
