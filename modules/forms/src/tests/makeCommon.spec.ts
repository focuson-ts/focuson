import { findAllCommonParams, makeFullState, makeCommonParams } from "../codegen/makeCommon";
import { createPlanPD, EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";


describe ( "makeFullState", () => {
  it ( 'should make the FullState', () => {
    expect ( makeFullState ( paramsForTest, [ EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
      "export interface FState extends HasSimpleMessages,HasPageSelection,HascommonIds,HasTagHolder,",
      " pageDomains.HasEAccountsSummaryPageDomain",
      "{}"
    ])
  } )

} )

describe ( "findAllCommonParams", () => {
  it ( 'should find all the commons lens in the pages', () => {
    expect ( findAllCommonParams ( [ eAccountsSummaryRestD ] ) ).toEqual ( [ "accountId", "customerId" ] )
  } )

} )
describe ( "makeCommonParams", () => {
  it ( 'should make the code around "GetUrlParams"', () => {
    expect ( makeCommonParams ( paramsForTest, [ eAccountsSummaryRestD ] ) ).toEqual ( [
      "export interface HascommonIds {commonIds: commonIds}",
      "export type commonIds = {",
      "accountId?:string;",
      "customerId?:string;",
      "}",
      "export const commonIdLens = Lenses.identity<FState> ().focusOn ( 'commonIds' )",
      "export const commonIdOps = tagOps ( commonIdLens, { failSilently: false } )",
      "export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ) {",
      "  return commonTagFetchProps<S, T> (",
      "    ( s, date ) => [], //later do the messaging",
      "    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )",
      "}"
    ])
  } )

} )