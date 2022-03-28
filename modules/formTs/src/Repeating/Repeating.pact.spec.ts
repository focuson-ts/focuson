import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../Repeating/Repeating.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
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
              query:{"customerId":"custId"}
            },
            willRespondWith: {
              status: 200,
              body: samples.sampleRepeatingWholeData0
            },
          } )
          const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'Repeating', pageMode: 'view' }], CommonIds: {"customerId":"custId"} }
          const fetcher= RepeatingWholeDataFetcher (Lenses.identity<FState>().focusQuery('Repeating'), commonIds ) 
          expect(fetcher.shouldLoad(firstState)).toEqual([]) // If this fails there is something wrong with the state
          const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
          let newState = await loadTree (f, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
          let expectedRaw: any = {
            ... firstState,
              tags: {'Repeating_~/fromApi': ["custId"]}
        };
        const expected = Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi').set ( expectedRaw, samples.sampleRepeatingWholeData0 )
          expect ( newState ).toEqual ( expected )
        } )
        } )
      })

//Rest repeating create pact test for Repeating
  pactWith ( { consumer: 'Repeating', provider: 'RepeatingProvider', cors: true }, provider => {
    describe ( 'Repeating - repeating rest create', () => {
      it ( 'should have a create rest for RepeatingWholeData', async () => {
        const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: 'create' }
        const firstState: FState = {
          ...emptyState, restCommands: [ restCommand ],
          CommonIds: {"customerId":"custId"},
          pageSelection: [ { pageName: 'Repeating', pageMode: 'view' } ]
        }
        await provider.addInteraction ( {
          state: 'default',
          uponReceiving: 'a rest for Repeating repeating create',
          withRequest: {
            method: 'POST',
            path:  '/api/repeating',
            query:{"customerId":"custId"},
            body: samples.sampleRepeatingWholeData0,
          },
          willRespondWith: {
            status: 200,
            body: samples.sampleRepeatingWholeData0
          },
        } )
        const withIds = massTransform(firstState,)
        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
        const rawExpected:any = { ...firstState, restCommands: []}
        const expected = Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi').set ( rawExpected, samples.sampleRepeatingWholeData0 )
        expect ( newState.messages.length ).toEqual ( 1 )
        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
        expect ( { ...newState, messages: []}).toEqual ( expected )
      } )
      } )
      })
  
//Rest repeating get pact test for Repeating
  pactWith ( { consumer: 'Repeating', provider: 'RepeatingProvider', cors: true }, provider => {
    describe ( 'Repeating - repeating rest get', () => {
      it ( 'should have a get rest for RepeatingWholeData', async () => {
        const restCommand: RestCommand = { name: 'Repeating_RepeatingWholeDataRestDetails', restAction: 'get' }
        const firstState: FState = {
          ...emptyState, restCommands: [ restCommand ],
          CommonIds: {"customerId":"custId"},
          pageSelection: [ { pageName: 'Repeating', pageMode: 'view' } ]
        }
        await provider.addInteraction ( {
          state: 'default',
          uponReceiving: 'a rest for Repeating repeating get',
          withRequest: {
            method: 'GET',
            path:  '/api/repeating',
            query:{"customerId":"custId"},
            //no request body needed for get,
          },
          willRespondWith: {
            status: 200,
            body: samples.sampleRepeatingWholeData0
          },
        } )
        const withIds = massTransform(firstState,)
        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
        const rawExpected:any = { ...firstState, restCommands: []}
        const expected = Lenses.identity<FState>().focusQuery('Repeating').focusQuery('fromApi').set ( rawExpected, samples.sampleRepeatingWholeData0 )
        expect ( newState.messages.length ).toEqual ( 1 )
        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
        expect ( { ...newState, messages: []}).toEqual ( expected )
      } )
      } )
      })
  