import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";
import { loadTree,wouldLoad } from "@focuson/fetcher";
import { pactWith } from "jest-pact";
import * as samples from './samples';
import { FState } from "ExampleApp/src/common";
import * as fetchers from "ExampleApp/src/fetchers";
import * as common from "ExampleApp/src/common";
const emptyState: FState = {
  CommonIds: {"accountId":"accId","customerId":"custId"},
  tags: {},
  messages: [],
  pageSelection: { pageName: 'eAccountsSummary' },
  eAccountsSummary:{}
}
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
          body: samples.EAccountsSummaryDDSample0
        },
      } )
      let newState = await loadTree ( fetchers.fetchers, emptyState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )
      expect ( newState ).toEqual ( {
        ... emptyState,
        eAccountsSummary: {fromApi: samples.EAccountsSummaryDDSample0},
        tags: { eAccountsSummary_fromApi:["accId","custId"] }
      } )
    } )
  } )
})