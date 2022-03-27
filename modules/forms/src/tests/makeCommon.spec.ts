import { findAllCommonParams, makeCommon, makeCommonParams, makeFullState } from "../codegen/makeCommon";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";
import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { devAppConfig } from "../focuson.config";
import { occupationAndIncomeRD } from "../example/occupationAndIncome/occupationAndIncome.restD";


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
      "import { HasPageSelection, PageMode ,PageSelectionContext} from '@focuson/pages'",
      "import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';",
      "import {  OnTagFetchErrorFn } from '@focuson/fetcher';",
      "import { identityOptics,NameAndLens } from '@focuson/lens';",
      "import { HasTagHolder } from '@focuson/template';",
      " import { HasRestCommands } from '@focuson/rest'",
      "import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug } from '@focuson/focuson';",
      "import { LensProps } from '@focuson/state';",
      "import { pages } from './pages';",
      "import { MyCombined } from '@focuson/form_components';",
      "import { HasEAccountsSummaryPageDomain } from './EAccountsSummary/EAccountsSummary.domains';",
      "import { HasOccupationAndIncomeSummaryPageDomain } from './OccupationAndIncomeSummary/OccupationAndIncomeSummary.domains';",
      "",
      "export type Context = FocusOnContext<FState>",
      "export const context: Context = {",
      "   ...defaultPageSelectionAndRestCommandsContext<FState> ( pages ),",
      "   combine: MyCombined",
      "}",
      "export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,",
      "  HasEAccountsSummaryPageDomain,",
      "  HasOccupationAndIncomeSummaryPageDomain",
      "{}",
      "export interface HasCommonIds {CommonIds: CommonIds}",
      "export type CommonIds = {",
      "  accountId?:string;",
      "  createPlanId?:string;",
      "  customerId?:string;",
      "  usersRole?:string;",
      "}",
      "export const identityL = identityOptics<FState> ();",
      "export const commonIdsL = identityL.focusQuery('CommonIds');",
      "export const commonIds: NameAndLens<FState> = {",
      "   accountId: commonIdsL.focusQuery('accountId'),",
      "   createPlanId: commonIdsL.focusQuery('createPlanId'),",
      "   customerId: commonIdsL.focusQuery('customerId'),",
      "   usersRole: commonIdsL.focusQuery('usersRole')",
      "}",
      "export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{",
      "  mode: PageMode;",
      "  id: string;",
      "  buttons: NameAnd<JSX.Element>",
      "}",
      "export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {",
      "  return commonTagFetchProps<S, T> (",
      "    ( s, date ) => [], //later do the messaging",
      "    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )",
      "}",
      "export const emptyState: FState = {",
      "  CommonIds: {'createPlanId':'tbd','customerId':'custId','accountId':'accId','usersRole':'user'},",
      "  tags: {},",
      "  messages: [],",
      "  pageSelection: [{ pageName: 'EAccountsSummary', firstTime: true, pageMode: 'view' }],",
      "  EAccountsSummary:{},",
      "  restCommands: [],",
      "    debug: { selectedPageDebug: true, fetcherDebug: true }",
      "  }"
    ])

  } )
} )

describe ( "findAllCommonParams", () => {
  it ( 'should find all the commons lens in the pages from rest', () => {
    expect ( findAllCommonParams ( [], [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [ "accountId", "createPlanId", "customerId" ] )
  } )

  it ( "should include the info from the pages", () => {
    expect ( findAllCommonParams ( [ OccupationAndIncomeSummaryPD ], [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      "accountId",
      "createPlanId",
      "customerId",
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
      "  customerId?:string;",
      "  usersRole?:string;",
      "}",
      "export const identityL = identityOptics<FState> ();",
      "export const commonIdsL = identityL.focusQuery('CommonIds');",
      "export const commonIds: NameAndLens<FState> = {",
      "   accountId: commonIdsL.focusQuery('accountId'),",
      "   customerId: commonIdsL.focusQuery('customerId'),",
      "   usersRole: commonIdsL.focusQuery('usersRole')",
      "}",
      "export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{",
      "  mode: PageMode;",
      "  id: string;",
      "  buttons: NameAnd<JSX.Element>",
      "}",
      "export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {",
      "  return commonTagFetchProps<S, T> (",
      "    ( s, date ) => [], //later do the messaging",
      "    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )",
      "}"
    ] )
  } )

} )