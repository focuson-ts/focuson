import { findAllCommonParams, makeFullState, makeCommonParams } from "../codegen/makeCommon";
import { EAccountsSummaryPD } from "../example/eAccounts/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { CreatePlanPD } from "../example/eAccounts/createPlanPD";


describe ( "makeFullState", () => {
  it ( 'should make the FullState', () => {
    expect ( makeFullState ( paramsForTest, [ EAccountsSummaryPD, CreatePlanPD ] ) ).toEqual ( [
      "export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,HasRestCommands,HasFocusOnDebug,",
      " pageDomains.HasEAccountsSummaryPageDomain",
      "{}"
    ] )
  } )

} )

describe ( "findAllCommonParams", () => {
  it ( 'should find all the commons lens in the pages', () => {
    expect ( findAllCommonParams ( [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [ "accountId", "customerId", "createPlanId" ] )
  } )

} )
describe ( "makeCommonParams", () => {
  it ( 'should make the code around "GetUrlParams"', () => {
    expect ( makeCommonParams ( paramsForTest, [ eAccountsSummaryRestD ], { main: '.', backup: '.' } ) ).toEqual ( [
      "export interface HasCommonIds {CommonIds: CommonIds}",
      "export type CommonIds = {",
      "accountId?:string;",
      "customerId?:string;",
      "}",
      "export const identityL = identityOptics<FState> ();",
      "export const commonIdsL = identityL.focusQuery('CommonIds');",
      "export const commonIds: NameAndLens<FState> = {",
      "   accountId: commonIdsL.focusQuery('accountId'),",
      "   customerId: commonIdsL.focusQuery('customerId')",
      "}",
      "export interface FocusedProps<S,D, Context> extends LensProps<S,D, Context>{",
      "  mode: PageMode;",
      "  id: string;",
      "}",
      "export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {",
      "  return commonTagFetchProps<S, T> (",
      "    ( s, date ) => [], //later do the messaging",
      "    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )",
      "}"
    ] )
  } )

} )