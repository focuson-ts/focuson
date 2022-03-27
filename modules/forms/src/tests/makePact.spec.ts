import { makeFetcherImports, makeFetcherPact, makeRestPacts } from "../codegen/makePacts";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { defaultRestAction } from "../common/restD";
import { PostCodeMainPage } from "../example/addressSearch/addressSearch.pageD";
import { makeRestPact } from "../codegen/makePacts2";

describe ( "makePacts", () => {


  it ( "should make a pact", () => {

    expect ( makeFetcherPact ( paramsForTest, PostCodeMainPage, PostCodeMainPage.rest.postcode, defaultRestAction.get, { main: '.', backup: '.' } ) ).toEqual ( [
      "//GetFetcher pact test",
      "pactWith ( { consumer: 'PostCodeData', provider: 'PostCodeDataProvider', cors: true }, provider => {",
      "  describe ( 'PostCodeDemo - fetcher', () => {",
      "    it ( 'should have a get fetcher for PostCodeData', async () => {",
      "      await provider.addInteraction ( {",
      "        state: 'default',",
      "        uponReceiving: 'PostCodeDemo should have a get fetcher for PostCodeData',",
      "        withRequest: {",
      "          method: 'GET',",
      "          path: '/api/postCode',",
      "          query:{\"postcode\":\"LW12 4RG\"}",
      "        },",
      "        willRespondWith: {",
      "          status: 200,",
      "          body: samples.samplePostCodeData0",
      "        },",
      "      } )",
      "      const ids = {",
      "        postcode: Lenses.identity<FState>().focusQuery('PostCodeDemo').focusQuery('postcode').focusQuery('search')",
      "      }",
      "      const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: 'PostCodeDemo', pageMode: 'view' }] , PostCodeDemo: { }}",
      "      const withIds = massTransform(firstState,[ids.postcode, () =>\"LW12 4RG\"])",
      "       const f: FetcherTree<FState> = { fetchers: [ PostCodeDataFetcher ( identityL.focusQuery ( 'PostCodeDemo' ), commonIds ) ], children: [] }",
      "      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )",
      "      let expectedRaw: any = {",
      "        ... firstState,",
      "         PostCodeDemo: {postcode:{searchResults:samples.samplePostCodeData0}},",
      "        tags: { PostCodeDemo_postcode_searchResults:[\"LW12 4RG\"]}",
      "      };",
      "      const expected = massTransform(expectedRaw,[ids.postcode, () =>\"LW12 4RG\"])",
      "      expect ( newState ).toEqual ( expected )",
      "    } )",
      "  } )",
      "})"
    ] )
  } )
  it ( "make a rest pact for get", () => {
    expect ( makeRestPacts ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, defaultRestAction.get, { main: '.', backup: '.' } ) ).toEqual ( [
      "//Rest get pact test",
      "pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary - rest get', () => {",
      "    it ( 'should have a get rest for CreatePlan', async () => {",
      "      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'get' }",
      "      const firstState: FState = {",
      "        ...emptyState, restCommands: [ restCommand ],",
      "      EAccountsSummary:{},",
      "        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]",
      "      }",
      "      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')",
      "      await provider.addInteraction ( {",
      "        state: 'default',",
      "        uponReceiving: 'EAccountsSummary should have a get rest for CreatePlan',",
      "        withRequest: {",
      "          method: 'GET',",
      "          path: url,",
      "          query:{\"accountId\":\"accId\",\"createPlanId\":\"tbd\",\"customerId\":\"custId\"}",
      "          //no body for get",
      "        },",
      "        willRespondWith: {",
      "          status: 200,",
      "          body: samples.sampleCreatePlan0",
      "        },",
      "      } )",
      "      const ids = {",
      "      }",
      "      const withIds = massTransform(firstState,)",
      "      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )",
      "      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }",
      "      const expected = massTransform(rawExpected,)",
      "      expect ( { ...newState, messages: []}).toEqual ( expected )",
      "      expect ( newState.messages.length ).toEqual ( 1 )",
      "      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)",
      "    } )",
      "  } )",
      "})"
    ] )

  } )
  it ( "make a rest pact for create", () => {
    expect ( makeRestPacts ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, defaultRestAction.create, { main: '.', backup: '.' } ) ).toEqual ( [
      "//Rest create pact test",
      "pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary - rest create', () => {",
      "    it ( 'should have a create rest for CreatePlan', async () => {",
      "      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'create' }",
      "      const firstState: FState = {",
      "        ...emptyState, restCommands: [ restCommand ],",
      "      EAccountsSummary: { tempCreatePlan:samples.sampleCreatePlan0 },",
      "        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]",
      "      }",
      "      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')",
      "      await provider.addInteraction ( {",
      "        state: 'default',",
      "        uponReceiving: 'EAccountsSummary should have a create rest for CreatePlan',",
      "        withRequest: {",
      "          method: 'POST',",
      "          path: url,",
      "          query:{\"accountId\":\"accId\",\"customerId\":\"custId\"}",
      "          ,body: JSON.stringify(samples.sampleCreatePlan0)",
      "        },",
      "        willRespondWith: {",
      "          status: 200,",
      "          body: samples.sampleCreatePlan0",
      "        },",
      "      } )",
      "      const ids = {",
      "      }",
      "      const withIds = massTransform(firstState,)",
      "      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )",
      "      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }",
      "      const expected = massTransform(rawExpected,)",
      "      expect ( { ...newState, messages: []}).toEqual ( expected )",
      "      expect ( newState.messages.length ).toEqual ( 1 )",
      "      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)",
      "    } )",
      "  } )",
      "})"
    ] )
  } )
  it ( "make a rest pact for update", () => {
    expect ( makeRestPacts ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, defaultRestAction.update, { main: '.', backup: '.' } ) ).toEqual ( [
      "//Rest update pact test",
      "pactWith ( { consumer: 'CreatePlan', provider: 'CreatePlanProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary - rest update', () => {",
      "    it ( 'should have a update rest for CreatePlan', async () => {",
      "      const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: 'update' }",
      "      const firstState: FState = {",
      "        ...emptyState, restCommands: [ restCommand ],",
      "      EAccountsSummary: { tempCreatePlan:samples.sampleCreatePlan0 },",
      "        pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view' } ]",
      "      }",
      "      const url = applyToTemplate('/api/createPlan/{createPlanId}', firstState.CommonIds).join('')",
      "      await provider.addInteraction ( {",
      "        state: 'default',",
      "        uponReceiving: 'EAccountsSummary should have a update rest for CreatePlan',",
      "        withRequest: {",
      "          method: 'PUT',",
      "          path: url,",
      "          query:{\"accountId\":\"accId\",\"createPlanId\":\"tbd\",\"customerId\":\"custId\"}",
      "          ,body: JSON.stringify(samples.sampleCreatePlan0)",
      "        },",
      "        willRespondWith: {",
      "          status: 200,",
      "          body: samples.sampleCreatePlan0",
      "        },",
      "      } )",
      "      const ids = {",
      "      }",
      "      const withIds = massTransform(firstState,)",
      "      let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "      let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )",
      "      const rawExpected:any = { ...firstState, restCommands: [], EAccountsSummary: { tempCreatePlan: samples.sampleCreatePlan0} }",
      "      const expected = massTransform(rawExpected,)",
      "      expect ( { ...newState, messages: []}).toEqual ( expected )",
      "      expect ( newState.messages.length ).toEqual ( 1 )",
      "      expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)",
      "    } )",
      "  } )",
      "})"
    ] )
  } )

  it ( "should make imports, skipping when 'fetcher: false'in rest defn", () => {
    expect ( makeFetcherImports ( paramsForTest, PostCodeMainPage ) ).toEqual ( [
      "import {PostCodeDataFetcher} from './PostCodeDemo.fetchers'"
    ] )
  } )
} )