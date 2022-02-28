import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import * as samples from './samples';
import {emptyState, FState } from "./common";
import * as fetchers from "./fetchers";
//GetFetcher pact test
pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {
  describe ( 'EAccountsSummary', () => {
    it ( 'should have a get fetcher for EAccountsSummaryDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'EAccountsSummary should have a get fetcher for EAccountsSummaryDD',
        withRequest: {
          method: 'GET',
          path: '/api/accountsSummary',
          query:{"accountId":"accId","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleEAccountsSummaryDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'EAccountsSummary', pageMode: 'view' }] , EAccountsSummary: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        EAccountsSummary: {fromApi: samples.sampleEAccountsSummaryDD0},
        tags: { EAccountsSummary_fromApi:["accId","custId"] }
      } )
    } )
  } )
})
//GetFetcher pact test
pactWith ( { consumer: 'ChequeCreditbooksDD', provider: 'ChequeCreditbooksDDProvider', cors: true }, provider => {
  describe ( 'ChequeCreditbooks', () => {
    it ( 'should have a get fetcher for ChequeCreditbooksDD', async () => {
      await provider.addInteraction ( {
        state: 'default',
        uponReceiving: 'ChequeCreditbooks should have a get fetcher for ChequeCreditbooksDD',
        withRequest: {
          method: 'GET',
          path: '/api/chequeCreditBooks',
          query:{"accountId":"accId","applRef":"appref","brandRef":"brandRef","customerId":"custId"}
        },
        willRespondWith: {
          status: 200,
          body: samples.sampleChequeCreditbooksDD0
        },
      } )
      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'ChequeCreditbooks', pageMode: 'view' }] , ChequeCreditbooks: { }}
      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... firstState,
        ChequeCreditbooks: {fromApi: samples.sampleChequeCreditbooksDD0},
        tags: { ChequeCreditbooks_fromApi:["accId","appref","brandRef","custId"] }
      } )
    } )
  } )
})