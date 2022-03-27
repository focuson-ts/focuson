import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../JointAccount/JointAccount.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import {JointAccountFetcher} from './JointAccount.fetchers'

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
              query:{"customerId":"custId"}
            },
            willRespondWith: {
              status: 200,
              body: samples.sampleJointAccount0
            },
          } )
          const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'JointAccount', pageMode: 'view' }], CommonIds: {"customerId":"custId"} }
          const f: FetcherTree<FState> = { fetchers: [ JointAccountFetcher (Lenses.identity<FState>().focusQuery('JointAccount'), commonIds ) ], children: [] }
          let newState = await loadTree (f, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
          let expectedRaw: any = {
            ... firstState,
              tags: {'JointAccount_~/fromApi': ["custId"]}
        };
        const expected = Lenses.identity<FState>().focusQuery('JointAccount').focusQuery('fromApi').set ( expectedRaw, samples.sampleJointAccount0 )
          expect ( newState ).toEqual ( expected )
        } )
        } )
      })

//Rest jointAccount get pact test for JointAccount
  pactWith ( { consumer: 'JointAccount', provider: 'JointAccountProvider', cors: true }, provider => {
    describe ( 'JointAccount - jointAccount rest get', () => {
      it ( 'should have a get rest for JointAccount', async () => {
        const restCommand: RestCommand = { name: 'JointAccount_JointAccountRestDetails', restAction: 'get' }
        const firstState: FState = {
          ...emptyState, restCommands: [ restCommand ],
          CommonIds: {"customerId":"custId"},
          pageSelection: [ { pageName: 'JointAccount', pageMode: 'view' } ]
        }
        await provider.addInteraction ( {
          state: 'default',
          uponReceiving: 'a rest for JointAccount jointAccount get',
          withRequest: {
            method: 'GET',
            path:  '/api/jointAccount',
            query:{"customerId":"custId"},
            //no body needed for get,
          },
          willRespondWith: {
            status: 200,
            //no body needed for get
          },
        } )
        const withIds = massTransform(firstState,)
        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
        const rawExpected:any = { ...firstState, restCommands: []}
        const expected = Lenses.identity<FState>().focusQuery('JointAccount').focusQuery('fromApi').set ( rawExpected, samples.sampleJointAccount0 )
        expect ( { ...newState, messages: []}).toEqual ( expected )
        expect ( newState.messages.length ).toEqual ( 1 )
        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
      } )
      } )
      })
  