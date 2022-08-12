import { findAllCommonParams, findAllCommonParamsDetails, findAllCommonParamsWithSamples, makeCommon, makeCommonParams, makeFullState, validateCommonParams } from "../codegen/makeCommon";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { generatedPages } from "../focuson.config";
import { paramsForTest } from "./paramsForTest";
import { devAppConfig } from "../appConfig";
import { StringParam } from "../common/restD";


describe ( "makeFullState", () => {
  it ( 'should make the FullState', () => {
    expect ( makeFullState ( paramsForTest, [ EAccountsSummaryPD ] ) ).toEqual ( [
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
      "import { newFetchers } from './fetchers';",
      "import { restDetails } from './rests';",
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
      "export const pathToLens: ( s: FState ) => ( path: string ) => Optional<FState, any> =",
      "    fromPathFromRaw ( pageSelectionlens<FState> (), pages )",
      "export const emptyState: FState = {",
      "  CommonIds: {'accountId':44444444,'applRef':22,'brandRef':10,'clientRef':333,'createPlanId':777,'dbName':'mock','employeeType':'basic','role':'user'},",
      "  tags: {},",
      "  messages: [],",
      "  pageSelection: [{ pageName: 'EAccountsSummary', firstTime: true, pageMode: 'view', time: defaultDateFn() }],",
      "  EAccountsSummary:{},",
      "  restCommands: [],",
      "  debug: {'fetcherDebug':false,'guardDebug':false,'restDebug':false,'reduxDebug':false,'selectedPageDebug':false,'loadTreeDebug':false,'showTracing':false,'dateDebug':false,'recordTrace':true,'tagFetcherDebug':false,'validityDebug':false,'modalDebug':false,'accordions':[]}",
      "  }"
    ] )

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
      "jurisdiction": "GB",
      "operatorName": "Phil",
      "role": "user",
      "today": "29/07/2022",
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
  it ( "should add an error message if any of the common params have illegal commonLens", () => {
    const actual = makeCommonParams ( paramsForTest, [
      {
        ...OccupationAndIncomeSummaryPD,
        commonParams: {
          error1: { ...StringParam, commonLens: 'some/illegal', testValue: 'user' },
          error2: { ...StringParam, commonLens: 'va&lue', testValue: 'user' }
        }
      } ], { main: '.', backup: '.' } );
    expect ( actual ).toContain ( 'Common Ids must be legal javascript identifiers. [some/illegal]' )
    expect ( actual ).toContain ( 'Common Ids must be legal javascript identifiers. [va&lue]' )
  } )

} )