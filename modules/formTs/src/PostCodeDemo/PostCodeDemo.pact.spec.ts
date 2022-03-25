import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import { rest, RestCommand, restL } from "@focuson/rest";
import { simpleMessagesL } from "@focuson/pages";
import { applyToTemplate } from "@focuson/template";
import { Lenses, massTransform } from "@focuson/lens";
import * as samples from '../PostCodeDemo/PostCodeDemo.samples'
import {emptyState, FState , commonIds, identityL } from "../common";
import * as rests from "../rests";
import {PostCodeDataFetcher} from './PostCodeDemo.fetchers'
describe("To support manually running the tests", () =>{it ("should support PostCodeDemo", () =>{})})
//Rest create pact test
pactWith ( { consumer: 'PostCodeMainPage', provider: 'PostCodeMainPageProvider', cors: true }, provider => {
  describe ( 'PostCodeDemo - rest create', () => {
    it ( 'should have a create rest for PostCodeMainPage', async () => {
      const restCommand: RestCommand = { name: 'PostCodeDemo_PostCodeMainPageRestDetails', restAction: 'create' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      PostCodeDemo: { makeTargetFor ( r.targetFromPath ) //needs fixing;:samples.samplePostCodeMainPage0  closeTargetFor ( r.targetFromPath );//needs fixing,
        pageSelection: [ { pageName: 'PostCodeDemo', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/address', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'PostCodeDemo should have a create rest for PostCodeMainPage',
        withRequest: {
          method: 'POST',
          path: url,
          query:{}
          ,body: JSON.stringify(samples.samplePostCodeMainPage0)
        },
        willRespondWith: {
          status: 200,
          body: samples.samplePostCodeMainPage0
        },
      } )
      const ids = {
      }
      const withIds = massTransform(firstState,)
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], PostCodeDemo: { makeTargetFor ( r.targetFromPath ) //needs fixing;: samples.samplePostCodeMainPage0 closeTargetFor ( r.targetFromPath );//needs fixing }
      const expected = massTransform(rawExpected,)
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'PostCodeData', provider: 'PostCodeDataProvider', cors: true }, provider => {
  describe ( 'PostCodeDemo - fetcher', () => {
    it ( 'should have a get fetcher for PostCodeData', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'PostCodeDemo should have a get fetcher for PostCodeData',
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
      const ids = {
        postcode: Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search')
      }
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'PostCodeDemo', pageMode: 'view' }] , PostCodeDemo: { }}
      const withIds = massTransform(firstState,[ids.postcode, () =>"LW12 4RG"])
       const f: FetcherTree<FState> = { fetchers: [ PostCodeDataFetcher ( identityL.focusQuery ( 'PostCodeDemo' ), commonIds ) ], children: [] }
      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      let expectedRaw: any = {
        ... firstState,
         PostCodeDemo: {makeTargetFor ( path )//needs fixing:samples.samplePostCodeData0closeTargetFor ( path ) //needs fixing ,
        tags: { PostCodeDemo_~_/_p_o_s_t_c_o_d_e_/_s_e_a_r_c_h_R_e_s_u_l_t_s:["LW12 4RG"]}
      };
      const expected = massTransform(expectedRaw,[ids.postcode, () =>"LW12 4RG"])
      expect ( newState ).toEqual ( expected )
    } )
  } )
})
//Rest get pact test
pactWith ( { consumer: 'PostCodeData', provider: 'PostCodeDataProvider', cors: true }, provider => {
  describe ( 'PostCodeDemo - rest get', () => {
    it ( 'should have a get rest for PostCodeData', async () => {
      const restCommand: RestCommand = { name: 'PostCodeDemo_PostCodeDataRestDetails', restAction: 'get' }
      const firstState: FState = {
        ...emptyState, restCommands: [ restCommand ],
      PostCodeDemo:{},
        pageSelection: [ { pageName: 'PostCodeDemo', pageMode: 'view' } ]
      }
      const url = applyToTemplate('/api/postCode', firstState.CommonIds).join('')
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'PostCodeDemo should have a get rest for PostCodeData',
        withRequest: {
          method: 'GET',
          path: url,
          query:{"postcode":"LW12 4RG"}
          //no body for get
        },
        willRespondWith: {
          status: 200,
          body: samples.samplePostCodeData0
        },
      } )
      const ids = {
        postcode: Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search')
      }
      const withIds = massTransform(firstState,[ids.postcode, () =>"LW12 4RG"])
      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );
      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )
      const rawExpected:any = { ...firstState, restCommands: [], PostCodeDemo: { makeTargetFor ( r.targetFromPath ) //needs fixing;: samples.samplePostCodeData0 closeTargetFor ( r.targetFromPath );//needs fixing }
      const expected = massTransform(rawExpected,[ids.postcode, () =>"LW12 4RG"])
      expect ( { ...newState, messages: []}).toEqual ( expected )
      expect ( newState.messages.length ).toEqual ( 1 )
      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)
    } )
  } )
})