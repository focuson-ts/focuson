import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../PostCodeDemo/PostCodeDemo.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {PostCodeDataFetcher} from './PostCodeDemo.fetchers'

describe("Allow pacts to be run from intelliJ for PostCodeDemo", () =>{})

//Rest address create pact test for PostCodeDemo
pactWith ( { consumer: 'PostCodeDemo', provider: 'PostCodeDemoProvider', cors: true }, provider => {
  describe ( 'PostCodeDemo - address rest create', () => {
   it ( 'should have a create rest for PostCodeMainPage', async () => {
    const restCommand: RestCommand = { name: 'PostCodeDemo_PostCodeMainPageRestDetails', restAction: 'create' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {},
       pageSelection: [ { pageName: 'PostCodeDemo', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for PostCodeDemo address create',
      withRequest: {
         method: 'POST',
         path:   '/api/address',
         query:{},
         body: JSON.stringify(samples.samplePostCodeMainPage0),
      },
      willRespondWith: {
         status: 200,
         body: samples.samplePostCodeMainPage0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('main'), () => samples.samplePostCodeMainPage0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('main').set ( rawExpected, samples.samplePostCodeMainPage0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'PostCodeDemo', provider: 'PostCodeDemoProvider', cors: true }, provider => {
describe ( 'PostCodeDemo - postcode - fetcher', () => {
  it ( 'should have a  fetcher for PostCodeData', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for PostCodeData',
      withRequest: {
        method: 'GET',
        path: '/api/postCode',
        query:{"postcode":"LW12 4RG"}
      },
      willRespondWith: {
        status: 200,
        body: samples.samplePostCodeData0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'PostCodeDemo', pageMode: 'view' }], CommonIds: {} }
  const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search'), () =>"LW12 4RG" ]
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= PostCodeDataFetcher (Lenses.identity<FState>().focusQuery('PostCodeDemo'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'PostCodeDemo_~/postcode/searchResults': ["LW12 4RG"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('searchResults').set ( expectedRaw, samples.samplePostCodeData0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest postcode get pact test for PostCodeDemo
pactWith ( { consumer: 'PostCodeDemo', provider: 'PostCodeDemoProvider', cors: true }, provider => {
  describe ( 'PostCodeDemo - postcode rest get', () => {
   it ( 'should have a get rest for PostCodeData', async () => {
    const restCommand: RestCommand = { name: 'PostCodeDemo_PostCodeDataRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {},
       pageSelection: [ { pageName: 'PostCodeDemo', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for PostCodeDemo postcode get',
      withRequest: {
         method: 'GET',
         path:   '/api/postCode',
         query:{"postcode":"LW12 4RG"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.samplePostCodeData0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search'), () =>"LW12 4RG" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('searchResults').set ( rawExpected, samples.samplePostCodeData0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
