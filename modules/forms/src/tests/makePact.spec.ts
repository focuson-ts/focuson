import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { makeFetcherImports, makeFetcherPact, makeRestPact } from "../codegen/makePacts2";
import { paramsForTest } from "./paramsForTest";

describe ( "makePacts", () => {


  it ( "should make a pact", () => {

    expect ( makeFetcherPact ( paramsForTest, PostCodeMainPage, 'postcode', PostCodeMainPage.rest.postcode ) ).toEqual ( [
      "//GetFetcher pact test",
      "pactWith ( { consumer: 'PostCodeMainPage', provider: 'PostCodeMainPageProvider', cors: true }, provider => {",
      "describe ( 'PostCodeMainPage - postcode - fetcher', () => {",
      "  it ( 'should have a  fetcher for PostCodeSearchResponse', async () => {",
      "    await provider.addInteraction ( {",
      "      state: 'default',",
      "      uponReceiving: 'A request for PostCodeSearchResponse',",
      "      withRequest: {",
      "        method: 'GET',",
      "        path: '/api/postCode',",
      "        query:{\"dbName\":\"mock\",\"postcode\":\"LW12 4RG\"}",
      "      },",
      "      willRespondWith: {",
      "        status: 200,",
      "        body: samples.samplePostCodeSearchResponse0",
      "       },",
      "      } )",
      "      const firstState: FState  = { ...emptyState,debug:{}, pageSelection:[{ pageName: 'PostCodeMainPage', pageMode: 'view', time: 'now' }], CommonIds: {\"dbName\":\"mock\"} }",
      "  const lensTransforms: Transform<FState,any>[] = [",
      "    [Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('postcode').focusQuery('search'), () =>\"LW12 4RG\" ]",
      "  ]",
      "      const withIds = massTransform ( firstState, ...lensTransforms )",
      "      const fetcher= PostCodeSearchResponseFetcher (Lenses.identity<FState>().focusQuery('PostCodeMainPage'), commonIds ) ",
      "      expect(fetcher.shouldLoad(withIds)).toEqual([]) // If this fails there is something wrong with the state",
      "      const f: FetcherTree<FState> = { fetchers: [fetcher], children: [] }",
      "      let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {fetcherDebug: false, loadTreeDebug: false}  )",
      "      let expectedRaw: any = {",
      "... withIds,",
      "      tags: {'PostCodeMainPage_~/postcode/searchResults': [\"mock\",\"LW12 4RG\"]}",
      "      };",
      "      const expected = Lenses.identity<FState>().focusQuery('PostCodeMainPage').focusQuery('postcode').focusQuery('searchResults').set ( expectedRaw, samples.samplePostCodeSearchResponse0 )",
      "      expect ( newState ).toEqual ( expected )",
      "    })",
      "  })",
      "})",
      ""
    ] )
  } )
  it ( "make a rest pact for get", () => {
    expect ( makeRestPact ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, 'get' ) ).toEqual ([
      "//Rest someRestName get pact test for EAccountsSummary",
      "pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary - someRestName rest get', () => {",
      "   it ( 'should have a get rest for CreatePlan', async () => {",
      "    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: \"get\" }",
      "    const firstState: FState = {",
      "       ...emptyState,debug:{}, restCommands: [ restCommand ],",
      "       CommonIds: {\"accountId\":44444444,\"applRef\":22,\"brandRef\":10,\"clientRef\":333,\"createPlanId\":777},",
      "       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view', time: 'now' } ]",
      "    }",
      "    await provider.addInteraction ( {",
      "      state: 'default',",
      "      uponReceiving: 'a rest for EAccountsSummary someRestName get',",
      "      withRequest: {",
      "         method: 'GET',",
      "         path:   '/api/createPlan',",
      "         query:{\"accountId\":\"44444444\",\"applRef\":\"22\",\"brandRef\":\"10\",\"clientRef\":\"333\",\"createPlanId\":\"777\"},",
      "         //no request body needed for get,",
      "      },",
      "      willRespondWith: {",
      "         status: 200,",
      "         body: samples.sampleCreatePlan0",
      "      },",
      "    } )",
      "    const lensTransforms: Transform<FState,any>[] = [",
      "    ]",
      "    const withIds = massTransform ( firstState, ...lensTransforms )",
      "    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "    const props: RestToTransformProps<FState, SimpleMessage> = {",
      "       fetchFn, d: rests.restDetails, urlMutatorForRest: restUrlMutator, pathToLens, messageL: simpleMessagesL (), stringToMsg: stringToSimpleMsg ( () => 'now', 'info' ), traceL: traceL ()",
      "    }",
      "    const newState = await rest ( props, restL(), withIds )",
      "    const rawExpected:any = { ...withIds, restCommands: []}",
      "    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )",
      "   })",
      " })",
      "})",
      ""
    ])

  } )
  it ( "make a rest pact for create", () => {
    expect ( makeRestPact ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, 'create' ) ).toEqual ([
      "//Rest someRestName create pact test for EAccountsSummary",
      "pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary - someRestName rest create', () => {",
      "   it ( 'should have a create rest for CreatePlan', async () => {",
      "    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: \"create\" }",
      "    const firstState: FState = {",
      "       ...emptyState,debug:{}, restCommands: [ restCommand ],",
      "       CommonIds: {\"accountId\":44444444,\"applRef\":22,\"brandRef\":10,\"clientRef\":333,\"createPlanId\":777},",
      "       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view', time: 'now' } ]",
      "    }",
      "    await provider.addInteraction ( {",
      "      state: 'default',",
      "      uponReceiving: 'a rest for EAccountsSummary someRestName create',",
      "      withRequest: {",
      "         method: 'POST',",
      "         path:   '/api/createPlan',",
      "         query:{\"accountId\":\"44444444\",\"applRef\":\"22\",\"brandRef\":\"10\",\"clientRef\":\"333\"},",
      "         body: JSON.stringify(samples.sampleCreatePlan0),",
      "      },",
      "      willRespondWith: {",
      "         status: 200,",
      "         body: samples.sampleCreatePlan0",
      "      },",
      "    } )",
      "    const lensTransforms: Transform<FState,any>[] = [",
      "      [Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan'), () => samples.sampleCreatePlan0]",
      "    ]",
      "    const withIds = massTransform ( firstState, ...lensTransforms )",
      "    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "    const props: RestToTransformProps<FState, SimpleMessage> = {",
      "       fetchFn, d: rests.restDetails, urlMutatorForRest: restUrlMutator, pathToLens, messageL: simpleMessagesL (), stringToMsg: stringToSimpleMsg ( () => 'now', 'info' ), traceL: traceL ()",
      "    }",
      "    const newState = await rest ( props, restL(), withIds )",
      "    const rawExpected:any = { ...withIds, restCommands: []}",
      "    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )",
      "   })",
      " })",
      "})",
      ""
    ] )
  } )
  it ( "make a rest pact for update", () => {
    expect ( makeRestPact ( paramsForTest, EAccountsSummaryPD, 'someRestName', EAccountsSummaryPD.rest.createPlanRestD, 'update' ) ).toEqual ([
      "//Rest someRestName update pact test for EAccountsSummary",
      "pactWith ( { consumer: 'EAccountsSummary', provider: 'EAccountsSummaryProvider', cors: true }, provider => {",
      "  describe ( 'EAccountsSummary - someRestName rest update', () => {",
      "   it ( 'should have a update rest for CreatePlan', async () => {",
      "    const restCommand: RestCommand = { name: 'EAccountsSummary_CreatePlanRestDetails', restAction: \"update\" }",
      "    const firstState: FState = {",
      "       ...emptyState,debug:{}, restCommands: [ restCommand ],",
      "       CommonIds: {\"accountId\":44444444,\"applRef\":22,\"brandRef\":10,\"clientRef\":333,\"createPlanId\":777},",
      "       pageSelection: [ { pageName: 'EAccountsSummary', pageMode: 'view', time: 'now' } ]",
      "    }",
      "    await provider.addInteraction ( {",
      "      state: 'default',",
      "      uponReceiving: 'a rest for EAccountsSummary someRestName update',",
      "      withRequest: {",
      "         method: 'PUT',",
      "         path:   '/api/createPlan',",
      "         query:{\"accountId\":\"44444444\",\"applRef\":\"22\",\"brandRef\":\"10\",\"clientRef\":\"333\",\"createPlanId\":\"777\"},",
      "         body: JSON.stringify(samples.sampleCreatePlan0),",
      "      },",
      "      willRespondWith: {",
      "         status: 200,",
      "         body: samples.sampleCreatePlan0",
      "      },",
      "    } )",
      "    const lensTransforms: Transform<FState,any>[] = [",
      "      [Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan'), () => samples.sampleCreatePlan0]",
      "    ]",
      "    const withIds = massTransform ( firstState, ...lensTransforms )",
      "    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );",
      "    const props: RestToTransformProps<FState, SimpleMessage> = {",
      "       fetchFn, d: rests.restDetails, urlMutatorForRest: restUrlMutator, pathToLens, messageL: simpleMessagesL (), stringToMsg: stringToSimpleMsg ( () => 'now', 'info' ), traceL: traceL ()",
      "    }",
      "    const newState = await rest ( props, restL(), withIds )",
      "    const rawExpected:any = { ...withIds, restCommands: []}",
      "    const expected = Lenses.identity<FState>().focusQuery('EAccountsSummary').focusQuery('tempCreatePlan').set ( rawExpected, samples.sampleCreatePlan0 )",
      "   })",
      " })",
      "})",
      ""
    ])
  } )

  it ( "should make imports, skipping when 'fetcher: false'in rest defn", () => {
    expect ( makeFetcherImports ( paramsForTest, PostCodeMainPage ) ).toEqual ( [
      "import {PostCodeSearchResponseFetcher} from './PostCodeMainPage.fetchers'"
    ] )
  } )
} )