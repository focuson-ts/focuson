import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../PostCodeMainPage/PostCodeMainPage.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {PostCodeSearchResponseFetcher} from './PostCodeMainPage.fetchers'

describe("Allow pacts to be run from intelliJ for PostCodeMainPage", () =>{})

//Rest address create pact test for PostCodeMainPage
pactWith ( { consumer: 'PostCodeMainPage', provider: 'PostCodeMainPageProvider', cors: true }, provider => {
  describe ( 'PostCodeMainPage - address rest create', () => {
   it ( 'should have a create rest for PostCodeNameAndAddress', async () => {
    const restCommand: RestCommand = { name: 'PostCodeMainPage_PostCodeNameAndAddressRestDetails', restAction: "create" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {},
       pageSelection: [ { pageName: 'PostCodeMainPage', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for PostCodeMainPage address create',
      withRequest: {
         method: 'POST',
         path:   '/api/address',
         query:{},
         body: JSON.stringify(samples.samplePostCodeNameAndAddress0),
      },
      willRespondWith: {
         status: 200,
         body: samples.samplePostCodeNameAndAddress0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('main'), () => samples.samplePostCodeNameAndAddress0]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('main').set ( rawExpected, samples.samplePostCodeNameAndAddress0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})

//GetFetcher pact test
pactWith ( { consumer: 'PostCodeMainPage', provider: 'PostCodeMainPageProvider', cors: true }, provider => {
describe ( 'PostCodeMainPage - postcode - fetcher', () => {
  it ( 'should have a  fetcher for PostCodeSearchResponse', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for PostCodeSearchResponse',
      withRequest: {
        method: 'GET',
        path: '/api/postCode',
        query:{"dbName":"mock","postcode":"LW12 4RG"}
      },
      willRespondWith: {
        status: 200,
        body: samples.samplePostCodeSearchResponse0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'PostCodeMainPage', pageMode: 'view' }], CommonIds: {"dbName":"mock"} }
  const lensTransforms: Transform<FState,any>[] = [
    [Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('postcode').focusQuery('search'), () =>"LW12 4RG" ]
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= PostCodeSearchResponseFetcher (Lenses.identity<FState>().focusQuery('PostCodeMainPage'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'PostCodeMainPage_~/postcode/searchResults': ["mock","LW12 4RG"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('postcode').focusQuery('searchResults').set ( expectedRaw, samples.samplePostCodeSearchResponse0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest postcode get pact test for PostCodeMainPage
pactWith ( { consumer: 'PostCodeMainPage', provider: 'PostCodeMainPageProvider', cors: true }, provider => {
  describe ( 'PostCodeMainPage - postcode rest get', () => {
   it ( 'should have a get rest for PostCodeSearchResponse', async () => {
    const restCommand: RestCommand = { name: 'PostCodeMainPage_PostCodeSearchResponseRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"dbName":"mock"},
       pageSelection: [ { pageName: 'PostCodeMainPage', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for PostCodeMainPage postcode get',
      withRequest: {
         method: 'GET',
         path:   '/api/postCode',
         query:{"dbName":"mock","postcode":"LW12 4RG"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.samplePostCodeSearchResponse0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
      [Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('postcode').focusQuery('search'), () =>"LW12 4RG" ]
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('postcode').focusQuery('searchResults').set ( rawExpected, samples.samplePostCodeSearchResponse0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
