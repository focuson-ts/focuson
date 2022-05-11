import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL} from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../HelloWorldMainPage/HelloWorldMainPage.samples'
import {emptyState, FState , commonIds, identityL, pathToLens } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {HelloWorldDomainDataFetcher} from './HelloWorldMainPage.fetchers'

describe("Allow pacts to be run from intelliJ for HelloWorldMainPage", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'HelloWorldMainPage', provider: 'HelloWorldMainPageProvider', cors: true }, provider => {
describe ( 'HelloWorldMainPage - restDataRD - fetcher', () => {
  it ( 'should have a  fetcher for HelloWorldDomainData', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for HelloWorldDomainData',
      withRequest: {
        method: 'GET',
        path: '/helloWorld',
        query:{}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleHelloWorldDomainData0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'HelloWorldMainPage', pageMode: 'view' }], CommonIds: {} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= HelloWorldDomainDataFetcher (Lenses.identity<FState>().focusQuery('HelloWorldMainPage'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'HelloWorldMainPage_~/fromApi': []}
      };
      const expected = Lenses.identity<FState>().focusQuery('HelloWorldMainPage').focusQuery('fromApi').set ( expectedRaw, samples.sampleHelloWorldDomainData0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest restDataRD get pact test for HelloWorldMainPage
pactWith ( { consumer: 'HelloWorldMainPage', provider: 'HelloWorldMainPageProvider', cors: true }, provider => {
  describe ( 'HelloWorldMainPage - restDataRD rest get', () => {
   it ( 'should have a get rest for HelloWorldDomainData', async () => {
    const restCommand: RestCommand = { name: 'HelloWorldMainPage_HelloWorldDomainDataRestDetails', restAction: "get" }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {},
       pageSelection: [ { pageName: 'HelloWorldMainPage', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for HelloWorldMainPage restDataRD get',
      withRequest: {
         method: 'GET',
         path:   '/helloWorld',
         query:{},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleHelloWorldDomainData0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, pathToLens, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('HelloWorldMainPage').focusQuery('fromApi').set ( rawExpected, samples.sampleHelloWorldDomainData0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
