import { makeFetcherPact } from "../codegen/makePacts";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { defaultRestAction } from "../common/restD";

describe ( "makePacts", () => {
  it ( "should make a pact", () => {

    expect ( makeFetcherPact (paramsForTest, EAccountsSummaryPD, EAccountsSummaryPD.rest.eAccountsSummary, defaultRestAction.get ) ).toEqual ( [
      "pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary', () => {",
      "    it ( 'should have a get fetcher for EAccountsSummaryDD', async () => {",
      "      await provider.addInteraction ( {",
      "        state: 'default',",
      "        uponReceiving: 'EAccountsSummary should have a get fetcher for EAccountsSummaryDD',",
      "        withRequest: {",
      "          method: 'GET',",
      "          path: '/api/accountsSummary',",
      "          query:{\"accountId\":\"accId\",\"customerId\":\"custId\"}",
      "        },",
      "        willRespondWith: {",
      "          status: 200,",
      "          body: samples.EAccountsSummaryDDSample0",
      "        },",
      "      } )",
      "      const firstState: FState  = { ...emptyState, pageSelection: { pageName: 'EAccountsSummary' } , EAccountsSummary: { }}",
      "      let newState = await loadTree ( fetchers.fetchers, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )",
      "      expect ( newState ).toEqual ( {",
      "        ... firstState,",
      "        EAccountsSummary: {fromApi: samples.EAccountsSummaryDDSample0},",
      "        tags: { EAccountsSummary_fromApi:[\"accId\",\"custId\"] }",
      "      } )",
      "    } )",
      "  } )",
      "})"
    ])
  } )

} )