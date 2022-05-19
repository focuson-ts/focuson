import { findAllCommonParams, makeCommon, makeCommonParams, makeFullState } from "../codegen/makeCommon";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { devAppConfig } from "../focuson.config";
import { occupationAndIncomeRD } from "../example/occupationAndIncome/occupationAndIncome.restD";
import { paramsForTest } from "./paramsForTest";


describe ( "makeFullState", () => {
  it ( 'should make the FullState', () => {
    expect ( makeFullState ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,",
      "  HasEAccountsSummaryPageDomain",
      "{}"
    ] )
  } )

} )

describe ( "makeCommon", () => {
  it ( 'should make the common page', () => {
    let common = makeCommon ( devAppConfig, paramsForTest, [ EAccountsSummaryPD, CreatePlanPD, OccupationAndIncomeSummaryPD ], [ occupationAndIncomeRD, createPlanRestD ], { main: '.', backup: '.' } );
    expect ( common.map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "import { fromPathFromRaw, HasPageSelection, PageMode ,PageSelectionContext, pageSelectionlens} from '@focuson/pages'",
      "import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';",
      "import {  OnTagFetchErrorFn } from '@focuson/fetcher';",
      "import { identityOptics,NameAndLens, Optional } from '@focuson/lens';",
      "import { HasTagHolder } from '@focuson/template';",
      " import { HasRestCommands } from '@focuson/rest'",
      "import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug } from '@focuson/focuson';",
      "import { LensProps } from '@focuson/state';",
      "import { pages } from './pages';",
      "import { MyCombined } from '@focuson/form_components';",
      "import { HasEAccountsSummaryPageDomain } from './EAccountsSummary/EAccountsSummary.domains';",
      "import { HasOccupationAndIncomeSummaryPageDomain } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';",
      "",
      "export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,",
      "  HasEAccountsSummaryPageDomain,",
      "  HasOccupationAndIncomeSummaryPageDomain",
      "{}",
      "export interface HasCommonIds {CommonIds: CommonIds}",
      "export type CommonIds = {",
      "  accountId?:string;",
      "  applRef?:string;",
      "  brandRef?:string;",
      "  clientRef?:string;",
      "  createPlanId?:string;",
      "  usersRole?:string;",
      "}",
      "export const identityL = identityOptics<FState> ();",
      "export const commonIdsL = identityL.focusQuery('CommonIds');",
      "export const commonIds: NameAndLens<FState> = {",
      "   accountId: commonIdsL.focusQuery('accountId'),",
      "   applRef: commonIdsL.focusQuery('applRef'),",
      "   brandRef: commonIdsL.focusQuery('brandRef'),",
      "   clientRef: commonIdsL.focusQuery('clientRef'),",
      "   createPlanId: commonIdsL.focusQuery('createPlanId'),",
      "   usersRole: commonIdsL.focusQuery('usersRole')",
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
      "  CommonIds: {'createPlanId':'tbd','clientRef':'custId','applRef':'appref','accountId':'accId','brandRef':'brandRef','usersRole':'user'},",
      "  tags: {},",
      "  messages: [],",
      "  pageSelection: [{ pageName: 'EAccountsSummary', firstTime: true, pageMode: 'view' }],",
      "  EAccountsSummary:{},",
      "  restCommands: [],",
      "  debug: {'fetcherDebug':false,'guardDebug':false,'restDebug':false,'selectedPageDebug':false,'loadTreeDebug':false,'showTracing':false,'recordTrace':true,'tagFetcherDebug':false,'accordions':[]}",
      "  }"
    ] )

  } )
} )

describe ( "findAllCommonParams", () => {
  it ( 'should find all the commons lens in the pages from rest', () => {
    expect ( findAllCommonParams ( [], [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      "accountId",
      "applRef",
      "brandRef",
      "clientRef",
      "createPlanId",
      "customerId",
      "dbName",
      "employeeType"
    ] )
  } )

  it ( "should include the info from the pages", () => {
    expect ( findAllCommonParams ( [ OccupationAndIncomeSummaryPD ], [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      "accountId",
      "applRef",
      "brandRef",
      "clientRef",
      "createPlanId",
      "customerId",
      "dbName",
      "employeeType",
      "usersRole"
    ] )
  } )

} )
describe ( "makeCommonParams", () => {
  it ( 'should make the code around "GetUrlParams" and the common block', () => {
    expect ( makeCommonParams ( paramsForTest, [ OccupationAndIncomeSummaryPD ], [ eAccountsSummaryRestD ], { main: '.', backup: '.' } ) ).toEqual ( [
      "export interface HasCommonIds {CommonIds: CommonIds}",
      "export type CommonIds = {",
      "  accountId?:string;",
      "  applRef?:string;",
      "  brandRef?:string;",
      "  clientRef?:string;",
      "  customerId?:string;",
      "  dbName?:string;",
      "  employeeType?:string;",
      "  usersRole?:string;",
      "}",
      "export const identityL = identityOptics<FState> ();",
      "export const commonIdsL = identityL.focusQuery('CommonIds');",
      "export const commonIds: NameAndLens<FState> = {",
      "   accountId: commonIdsL.focusQuery('accountId'),",
      "   applRef: commonIdsL.focusQuery('applRef'),",
      "   brandRef: commonIdsL.focusQuery('brandRef'),",
      "   clientRef: commonIdsL.focusQuery('clientRef'),",
      "   customerId: commonIdsL.focusQuery('customerId'),",
      "   dbName: commonIdsL.focusQuery('dbName'),",
      "   employeeType: commonIdsL.focusQuery('employeeType'),",
      "   usersRole: commonIdsL.focusQuery('usersRole')",
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