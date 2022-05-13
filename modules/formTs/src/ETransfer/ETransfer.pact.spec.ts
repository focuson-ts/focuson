import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL} from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../ETransfer/ETransfer.samples'
import {emptyState, FState , commonIds, identityL, pathToLens } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {HolidayDataFetcher} from './ETransfer.fetchers'

describe("Allow pacts to be run from intelliJ for ETransfer", () =>{})

//Rest eTransfer create pact test for ETransfer
pactWith ( { consumer: 'ETransfer', provider: 'ETransferProvider', cors: true }, provider => {
  describe ( 'ETransfer - eTransfer rest create', () => {
   it ( 'should have a create rest for ETransferDataD', async () => {
    const restCommand: RestCommand = { name: 'ETransfer_ETransferDataDRestDetails', restAction: "create" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"customerId":"custId"},
       pageSelection: [ { pageName: 'ETransfer', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ETransfer eTransfer create',
      withRequest: {
         method: 'POST',
         path:   '/api/eTransfers',
         query:{"customerId":"custId"},
         body: JSON.stringify(samples.sampleETransferDataD0),
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleETransferDataD0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('fromApi'), () => samples.sampleETransferDataD0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('fromApi').set ( rawExpected, samples.sampleETransferDataD0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'ETransfer', provider: 'ETransferProvider', cors: true }, provider => {
describe ( 'ETransfer - holidays - fetcher', () => {
  it ( 'should have a  fetcher for HolidayData', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for HolidayData',
      withRequest: {
        method: 'GET',
        path: '/api/holidays',
        query:{}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleHolidayData0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ETransfer', pageMode: 'view' }], CommonIds: {} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= HolidayDataFetcher (Lenses.identity<FState>().focusQuery('ETransfer'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'ETransfer_~/holidays': []}
      };
      const expected = Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('holidays').set ( expectedRaw, samples.sampleHolidayData0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest holidays get pact test for ETransfer
pactWith ( { consumer: 'ETransfer', provider: 'ETransferProvider', cors: true }, provider => {
  describe ( 'ETransfer - holidays rest get', () => {
   it ( 'should have a get rest for HolidayData', async () => {
    const restCommand: RestCommand = { name: 'ETransfer_HolidayDataRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {},
       pageSelection: [ { pageName: 'ETransfer', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for ETransfer holidays get',
      withRequest: {
         method: 'GET',
         path:   '/api/holidays',
         query:{},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleHolidayData0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('ETransfer').focusQuery('holidays').set ( rawExpected, samples.sampleHolidayData0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
