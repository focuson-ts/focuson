import { makeFetcherPact } from "../codegen/makePacts";
import { EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";

describe ( "makePacts", () => {
  it ( "should make a pact", () => {
    const r = EAccountsSummaryPD.rest.eAccountsSummary
    expect ( makeFetcherPact ( r ) ).toEqual ( [
      "pactWith ( { consumer: 'EAccountsSummaryDD', provider: 'EAccountsSummaryDDProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummaryDD', () => {",
      "    it ( 'should have a get fetcher', async () => {",
      "      await provider.addInteraction ( {",
      "        state: 'default',",
      "        uponReceiving: 'EAccountsSummaryDD should have a get fetcher',",
      "        withRequest: {",
      "          method: Get',",
      "          path: '<url>'",
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
      "  } )"
    ] )
  } )

} )