import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../JointAccount/JointAccount.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import {JointAccountFetcher} from './JointAccount.fetchers'
describe("To support manually running the tests", () =>{it ("should support JointAccount", () =>{})})
//GetFetcher pact test
pactWith ( { consumer: 'JointAccount', provider: 'JointAccountProvider', cors: true }, provider => {
  describe ( 'JointAccount - fetcher', () => {
    it ( 'should have a get fetcher for JointAccount', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'JointAccount should have a get fetcher for JointAccount',
        withRequest: {
          method: 'GET',
          path: '/api/jointAccount',
          query:{"customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleJointAccount0
        },
      } )
      const ids = {
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'JointAccount', pageMode: 'view' }] , JointAccount: { }}
      const withIds = massTransform(firstState,)
       const f: FetcherTree<FState> = { fetchers: [ JointAccountFetcher ( identityL.focusQuery ( 'JointAccount' ), commonIds ) ], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         JointAccount: {makeTargetFor ( path )//needs fixing:samples.sampleJointAccount0closeTargetFor ( path ) //needs fixing ,
        tags: { JointAccount_~_/_f_r_o_m_A_p_i:["custId"]}
      };
      const expected = massTransform(expectedRaw,)
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'JointAccount', provider: 'JointAccountProvider', cors: true }, provider => {
  describe ( 'JointAccount - rest get', () => {
    it ( 'should have a get rest for JointAccount', async () => {
      const restCommand: RestCommand = { name: 'JointAccount_JointAccountRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      JointAccount:{},
        pageSelection: [ { pageName: 'JointAccount', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/jointAccount', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'JointAccount should have a get rest for JointAccount',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"customerId":"custId"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleJointAccount0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], JointAccount: { makeTargetFor ( r.targetFromPath ) //needs fixing;: samples.sampleJointAccount0 closeTargetFor ( r.targetFromPath );//needs fixing }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})