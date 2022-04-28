import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform, Transform } from "@focuson/lens";
import * as samples from '../JointAccount/JointAccount.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import { restUrlMutator } from "../rests";
import {pre_JointAccountFetcher} from './JointAccount.fetchers'

describe("Allow pacts to be run from intelliJ for JointAccount", () =>{})

//GetFetcher pact test
pactWith ( { consumer: 'JointAccount', provider: 'JointAccountProvider', cors: true }, provider => {
describe ( 'JointAccount - jointAccount - fetcher', () => {
  it ( 'should have a  fetcher for JointAccount', async () => {
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'A request for JointAccount',
      withRequest: {
        method: 'GET',
        path: '/api/jointAccount',
        query:{"accountId":"custId","brandId":"custId","dbName":"mock"}
      },
      willRespondWith: {
        status: 200,
        body: samples.sampleJointAccount0
       },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'JointAccount', pageMode: 'view' }], CommonIds: {"accountId":"custId","brandId":"custId","dbName":"mock"} }
  const lensTransforms: Transform<FState,any>[] = [
  ]
      const withIds = massTransform ( firstState, ...lensTransforms )
      const fetcher= pre_JointAccountFetcher (Lenses.identity<FState>().focusQuery('JointAccount'), commonIds ) 
      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state
      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )
      let expectedRaw: any = {
... withIds,
      tags: {'JointAccount_~/fromApi': ["custId","custId","mock"]}
      };
      const expected = Lenses.identity<FState>().focusQuery('JointAccount').focusQuery('fromApi').set ( expectedRaw, samples.sampleJointAccount0 )
      expect ( newState ).toEqual ( expected )
    })
  })
})

//Rest jointAccount get pact test for JointAccount
pactWith ( { consumer: 'JointAccount', provider: 'JointAccountProvider', cors: true }, provider => {
  describe ( 'JointAccount - jointAccount rest get', () => {
   it ( 'should have a get rest for JointAccount', async () => {
    const restCommand: RestCommand = { name: 'JointAccount_pre_JointAccountRestDetails', restAction: 'get' }
    const firstState: FState = {
       ...emptyState, restCommands: [ restCommand ],
       CommonIds: {"accountId":"custId","brandId":"custId","dbName":"mock"},
       pageSelection: [ { pageName: 'JointAccount', pageMode: 'view' } ]
    }
    await provider.addInteraction ( {
      state: 'default',
      uponReceiving: 'a rest for JointAccount jointAccount get',
      withRequest: {
         method: 'GET',
         path:   '/api/jointAccount',
         query:{"accountId":"custId","brandId":"custId","dbName":"mock"},
         //no request body needed for get,
      },
      willRespondWith: {
         status: 200,
         body: samples.sampleJointAccount0
      },
    } )
    const lensTransforms: Transform<FState,any>[] = [
    ]
    const withIds = massTransform ( firstState, ...lensTransforms )
    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
    const newState = await rest ( fetchFn, rests.restDetails, restUrlMutator, simpleMessagesL(), restL(), withIds )
    const rawExpected:any = { ...withIds, restCommands: []}
    const expected = Lenses.identity<FState>().focusQuery('JointAccount').focusQuery('fromApi').set ( rawExpected, samples.sampleJointAccount0 )
    expect ( newState.messages.length ).toEqual ( 1 )
    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    expect ( { ...newState, messages: []}).toEqual ( expected )
   })
 })
})
