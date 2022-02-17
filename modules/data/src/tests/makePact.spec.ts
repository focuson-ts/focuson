import { makeFetcherPact } from "../codegen/makePacts";
import { EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { defaultRestAction } from "../common/restD";

describe ( "makePacts", () => {
  it ( "should make a pact", () => {

    expect ( makeFetcherPact ( EAccountsSummaryPD, EAccountsSummaryPD.rest.eAccountsSummary ) ).toEqual ( [
      "pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary', () => {",
      "    it ( 'should have a get fetcher for EAccountsSummaryDD', async () => {",
      "      await provider.addInteraction ( {",
      "        state: 'default',",
      "        uponReceiving: 'EAccountsSummary should have a get fetcher for EAccountsSummaryDD',",
      "        withRequest: {",
      "          method: 'GET',",
      "          path: '/api/accountsSummary?accountId={accountId}&customerId={customerId}'",
      "        },",
      "        willRespondWith: {",
      "          status: 200,",
      "          body: EAccountsSummaryDDSample0",
      "        },",
      "      } )",
      "      let newState = await loadTree ( tree, EAccountsSummaryDDSample0, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )",
      "      expect ( newState ).toEqual ( {",
      "        ... EAccountsSummaryDDSample0,",
      "        fromApi: EAccountsSummaryDDSample0,",
      "        tags: { eTransfers: [ 'mycid' ] }",
      "      } )",
      "    } )",
      "  } )",
      "})"
    ] )
  } )

} )