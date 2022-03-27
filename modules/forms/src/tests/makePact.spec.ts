import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { PostCodeMainPage } from "../example/addressSearch/addressSearch.pageD";
import { makeFetcherImports, makeFetcherPact, makeRestPact } from "../codegen/makePacts2";

describe ( "makePacts", () => {


  it ( "should make a pact", () => {

    expect ( makeFetcherPact ( paramsForTest, PostCodeMainPage, 'postcode', PostCodeMainPage.rest.postcode ) ).toEqual ( [
      "//GetFetcher pact test",
      "pactWith ( { consumer: 'PostCodeDemo', provider: 'PostCodeDemoProvider', cors: true }, provider => {",
      "      describe ( 'PostCodeDemo - postcode - fetcher', () => {",
      "        it ( 'should have a  fetcher for PostCodeData', async () => {",
      "          await provider.addInteraction ( {",
      "            state: 'default',",
      "            uponReceiving: 'A request for PostCodeData',",
      "            withRequest: {",
      "              method: 'GET',",
      "              path: '/api/postCode',",
      "              query:{\"postcode\":\"LW12 4RG\"}",
      "            },",
      "            willRespondWith: {",
      "              status: 200,",
      "              body: samples.samplePostCodeData0",
      "            },",
      "          } )",
      "          const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'PostCodeDemo', pageMode: 'view' }], CommonIds: {} }",
      "          const f: FetcherTree<FState> = { fetchers: [ PostCodeDataFetcher (Lenses.identity<FState>().focusQuery('PostCodeDemo'), commonIds ) ], children: [] }",
      "          let newState = await loadTree (f, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )",
      "          let expectedRaw: any = {",
      "            ... firstState,",
      "              tags: {'PostCodeDemo_~/postcode/searchResults': [\"LW12 4RG\"]}",
      "        };",
      "        const expected = Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('searchResults').set ( expectedRaw, samples.samplePostCodeData0 )",
      "          expect ( newState ).toEqual ( expected )",
      "        } )",
      "        } )",
      "      })",
      ""
    ] )
  } )
  it ( "make a rest pact for get", () => {
    expect ( makeRestPact ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, 'get' ) ).toEqual ( [
      "//Rest someRestName get pact test for EAccountsSummary",
      "  pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {",
      "    describe ( 'EAccountsSummary - someRestName rest get', () => {",
      "      it ( 'should have a get rest for CreatePlan', async () => {",
      "        const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'get' }",
      "        const firstState: FState = {",
      "          ...emptyState, restCommands: [ restCommand ],",
      "          CommonIds: {\"accountId\":\"accId\",\"createPlanId\":\"tbd\",\"customerId\":\"custId\"},",
      "          pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]",
      "        }",
      "        await provider.addInteraction ( {",
      "          state: 'default',",
      "          uponReceiving: 'a rest for EAccountsSummary someRestName get',",
      "          withRequest: {",
      "            method: 'GET',",
      "            path:  '/api/createPlan/{createPlanId}',",
      "            query:{\"accountId\":\"accId\",\"createPlanId\":\"tbd\",\"customerId\":\"custId\"},",
      "            //no body needed for get,",
      "          },",
      "          willRespondWith: {",
      "            status: 200,",
      "            //no body needed for get",
      "          },",
      "        } )",
      "        const withIds = massTransform(firstState,)",
      "        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )",
      "        const rawExpected:any = { ...firstState, restCommands: []}",
      "        const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )",
      "        expect ( { ...newState, messages: []}).toEqual ( expected )",
      "        expect ( newState.messages.length ).toEqual ( 1 )",
      "        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)",
      "      } )",
      "      } )",
      "      })",
      "  "
    ])

  } )
  it ( "make a rest pact for create", () => {
    expect ( makeRestPact ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, 'create' ) ).toEqual ( [
      "//Rest someRestName create pact test for EAccountsSummary",
      "  pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {",
      "    describe ( 'EAccountsSummary - someRestName rest create', () => {",
      "      it ( 'should have a create rest for CreatePlan', async () => {",
      "        const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'create' }",
      "        const firstState: FState = {",
      "          ...emptyState, restCommands: [ restCommand ],",
      "          CommonIds: {\"accountId\":\"accId\",\"createPlanId\":\"tbd\",\"customerId\":\"custId\"},",
      "          pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]",
      "        }",
      "        await provider.addInteraction ( {",
      "          state: 'default',",
      "          uponReceiving: 'a rest for EAccountsSummary someRestName create',",
      "          withRequest: {",
      "            method: 'POST',",
      "            path:  '/api/createPlan/{createPlanId}',",
      "            query:{\"accountId\":\"accId\",\"customerId\":\"custId\"},",
      "            body: samples.sampleCreatePlan0,",
      "          },",
      "          willRespondWith: {",
      "            status: 200,",
      "            body: samples.sampleCreatePlan0",
      "          },",
      "        } )",
      "        const withIds = massTransform(firstState,)",
      "        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )",
      "        const rawExpected:any = { ...firstState, restCommands: []}",
      "        const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )",
      "        expect ( { ...newState, messages: []}).toEqual ( expected )",
      "        expect ( newState.messages.length ).toEqual ( 1 )",
      "        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)",
      "      } )",
      "      } )",
      "      })",
      "  "
    ] )
  } )
  it ( "make a rest pact for update", () => {
    expect ( makeRestPact ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, 'update' ) ).toEqual ( [
      "//Rest someRestName update pact test for EAccountsSummary",
      "  pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {",
      "    describe ( 'EAccountsSummary - someRestName rest update', () => {",
      "      it ( 'should have a update rest for CreatePlan', async () => {",
      "        const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'update' }",
      "        const firstState: FState = {",
      "          ...emptyState, restCommands: [ restCommand ],",
      "          CommonIds: {\"accountId\":\"accId\",\"createPlanId\":\"tbd\",\"customerId\":\"custId\"},",
      "          pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]",
      "        }",
      "        await provider.addInteraction ( {",
      "          state: 'default',",
      "          uponReceiving: 'a rest for EAccountsSummary someRestName update',",
      "          withRequest: {",
      "            method: 'PUT',",
      "            path:  '/api/createPlan/{createPlanId}',",
      "            query:{\"accountId\":\"accId\",\"createPlanId\":\"tbd\",\"customerId\":\"custId\"},",
      "            body: samples.sampleCreatePlan0,",
      "          },",
      "          willRespondWith: {",
      "            status: 200,",
      "            body: samples.sampleCreatePlan0",
      "          },",
      "        } )",
      "        const withIds = massTransform(firstState,)",
      "        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )",
      "        const rawExpected:any = { ...firstState, restCommands: []}",
      "        const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )",
      "        expect ( { ...newState, messages: []}).toEqual ( expected )",
      "        expect ( newState.messages.length ).toEqual ( 1 )",
      "        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)",
      "      } )",
      "      } )",
      "      })",
      "  "
    ] )
  } )

  it ( "should make imports, skipping when 'fetcher: false'in rest defn", () => {
    expect ( makeFetcherImports ( paramsForTest, PostCodeMainPage ) ).toEqual ( [
      "import {PostCodeDataFetcher} from './PostCodeDemo.fetchers'"
    ] )
  } )
} )