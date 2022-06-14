import { findAllCommonParams, findAllCommonParamsDetails, findAllCommonParamsWithSamples, makeCommon, makeCommonParams, makeFullState, validateCommonParams } from "../codegen/makeCommon";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import {  generatedPages } from "../focuson.config";
import { paramsForTest } from "./paramsForTest";
import { devAppConfig } from "../appConfig";


describe ( "makeFullState", () => {
  it ( 'should make the FullState', () => {
    expect ( makeFullState ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,HasRestCount,",
      "  HasEAccountsSummaryPageDomain",
      "{}"
    ] )
  } )

} )

describe ( "makeCommon", () => {
  it ( 'should make the common page', () => {
    let common = makeCommon ( devAppConfig, paramsForTest, [ EAccountsSummaryPD, OccupationAndIncomeSummaryPD ], { main: '.', backup: '.' } );
    expect ( common.map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { fromPathFromRaw, HasPageSelection, PageMode ,PageSelectionContext, pageSelectionlens} from '@focuson/pages'",
      "import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';",
      "import {  OnTagFetchErrorFn } from '@focuson/fetcher';",
      "import { identityOptics,NameAndLens, Optional } from '@focuson/lens';",
      "import { HasTagHolder } from '@focuson/template';",
      " import { HasRestCommands } from '@focuson/rest'",
      "import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug, HasRestCount} from '@focuson/focuson';",
      "import { LensProps } from '@focuson/state';",
      "import { pages } from './pages';",
      "import { MyCombined } from '@focuson/form_components';",
      "import { HasEAccountsSummaryPageDomain } from './EAccountsSummary/EAccountsSummary.domains';",
      "import { HasOccupationAndIncomeSummaryPageDomain } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';",
      "",
      "export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,HasRestCount,",
      "  HasEAccountsSummaryPageDomain,",
      "  HasOccupationAndIncomeSummaryPageDomain",
      "{}",
      "export interface HasCommonIds {CommonIds: CommonIds}",
      "export type CommonIds = {",
      "  accountId ? : number;",
      "  applRef ? : number;",
      "  brandRef ? : number;",
      "  clientRef ? : number;",
      "  createPlanId ? : number;",
      "  dbName ? : string;",
      "  employeeType ? : string;",
      "  role ? : string;",
      "}",
      "export const identityL = identityOptics<FState> ();",
      "export const commonIdsL = identityL.focusQuery('CommonIds');",
      "export const commonIds: NameAndLens<FState> = {",
      "   accountId  :    commonIdsL.focusQuery ( 'accountId' ),",
      "   applRef  :    commonIdsL.focusQuery ( 'applRef' ),",
      "   brandRef  :    commonIdsL.focusQuery ( 'brandRef' ),",
      "   clientRef  :    commonIdsL.focusQuery ( 'clientRef' ),",
      "   createPlanId  :    commonIdsL.focusQuery ( 'createPlanId' ),",
      "   dbName  :    commonIdsL.focusQuery ( 'dbName' ),",
      "   employeeType  :    commonIdsL.focusQuery ( 'employeeType' ),",
      "   role  :    commonIdsL.focusQuery ( 'role' )",
      "}",
      "export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{",
      "  mode: PageMode;",
      "  id: string;",
      "  label?:string;",
      "  allButtons: NameAnd<JSX.Element>;",
      "}",
      "export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {",
      "  return commonTagFetchProps<S, T> (",
      "    ( s, date ) => [], //later do the messaging",
      "    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )",
      "}",
      "export type Context = FocusOnContext<FState>",
      "export const context: Context = {",
      "   ...defaultPageSelectionAndRestCommandsContext<FState> ( pages, commonIds),",
      "   combine: MyCombined",
      "}",
      "export const pathToLens: ( s: FState ) => ( path: string ) => Optional<FState, any> =",
      "    fromPathFromRaw ( pageSelectionlens<FState> (), pages )",
      "export const emptyState: FState = {",
      "  CommonIds: {'accountId':44444444,'applRef':22,'brandRef':10,'clientRef':333,'createPlanId':777,'dbName':'mock','employeeType':'basic','role':'user'},",
      "  tags: {},",
      "  messages: [],",
      "  pageSelection: [{ pageName: 'EAccountsSummary', firstTime: true, pageMode: 'view' }],",
      "  EAccountsSummary:{},",
      "  restCommands: [],",
      "  debug: {'fetcherDebug':false,'guardDebug':false,'restDebug':false,'selectedPageDebug':false,'loadTreeDebug':false,'showTracing':false,'recordTrace':true,'tagFetcherDebug':false,'accordions':[]}",
      "  }"
    ])

  } )
} )

describe ( "findAllCommonParamsWithSamples", () => {
  it ( "should do what it says on the tin", () => {
    expect ( findAllCommonParamsWithSamples ( generatedPages ) ).toEqual ( {
      "accountId": 44444444,
      "applRef": 22,
      "brandRef": 10,
      "clientRef": 333,
      "createPlanId": 777,
      "customerId": 988834,
      "dbName": "mock",
      "employeeId": 666666,
      "employeeType": "basic",
      "role": "user",
      "vbAcountSeq": 55555
    } )
  } )
} )

describe ( "Validate ", () => {
  it ( "should return no errors in the generated pages", () => {
    expect ( validateCommonParams ( findAllCommonParamsDetails ( generatedPages ) ) ).toEqual ( [] )

  } )
} )
describe ( "findAllCommonParams", () => {
  it ( 'should find all the commons lens in the pages from rest', () => {
    expect ( findAllCommonParams ( [ OccupationAndIncomeSummaryPD ] ) ).toEqual ( [
      "accountId",
      "applRef",
      "brandRef",
      "clientRef",
      "role"
    ] )
  } )
} )
describe ( "makeCommonParams", () => {
  it ( 'should make the code around "GetUrlParams" and the common block', () => {
    expect ( makeCommonParams ( paramsForTest, [ OccupationAndIncomeSummaryPD ], { main: '.', backup: '.' } ) ).toEqual ( [
      "export interface HasCommonIds {CommonIds: CommonIds}",
      "export type CommonIds = {",
      "  accountId ? : number;",
      "  applRef ? : number;",
      "  brandRef ? : number;",
      "  clientRef ? : number;",
      "  role ? : string;",
      "}",
      "export const identityL = identityOptics<FState> ();",
      "export const commonIdsL = identityL.focusQuery('CommonIds');",
      "export const commonIds: NameAndLens<FState> = {",
      "   accountId  :    commonIdsL.focusQuery ( 'accountId' ),",
      "   applRef  :    commonIdsL.focusQuery ( 'applRef' ),",
      "   brandRef  :    commonIdsL.focusQuery ( 'brandRef' ),",
      "   clientRef  :    commonIdsL.focusQuery ( 'clientRef' ),",
      "   role  :    commonIdsL.focusQuery ( 'role' )",
      "}",
      "export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{",
      "  mode: PageMode;",
      "  id: string;",
      "  label?:string;",
      "  allButtons: NameAnd<JSX.Element>;",
      "}",
      "export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {",
      "  return commonTagFetchProps<S, T> (",
      "    ( s, date ) => [], //later do the messaging",
      "    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )",
      "}"
    ] )
  } )

} )