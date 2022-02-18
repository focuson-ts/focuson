import { findAllCommonParams, makeFullState, makeGetUrlParams } from "../codegen/makeCommon";
import { createPlanPD, EAccountsSummaryPD } from "../example/eAccountsSummary.pageD";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";


describe ( "makeFullState", () => {
  it ( 'should make the FullState', () => {
    expect ( makeFullState ( paramsForTest, [ EAccountsSummaryPD, createPlanPD ] ) ).toEqual ( [
      "export interface FullState extends HasSimpleMessages,HasPageSelection,HasCommonUrlParams,pageDomains.HasEAccountsSummaryPageDomain{}"
    ] )
  } )

} )

describe ( "findAllCommonParams", () => {
  it ( 'should find all the commons lens in the pages', () => {
    expect ( findAllCommonParams ( [ eAccountsSummaryRestD ] ) ).toEqual ( [ "accountId", "customerId" ] )
  } )

} )
describe ( "makeGetUrlParams", () => {
  it ( 'should make the code around "GetUrlParams"', () => {
    expect ( makeGetUrlParams ( paramsForTest, [ eAccountsSummaryRestD ] ) ).toEqual ( [
      "export type CommonUrlParamsNames = 'accountId'|'customerId';",
      "export type CommonUrlParams = {",
      "  [key in CommonUrlParamsNames]?: string",
      "}",
      "export interface HasCommonUrlParams {",
      "  commonIds: CommonUrlParams",
      "}",
      "export type CommonUrlParamsFns<S> = {",
      "  [key in CommonUrlParamsNames]?: ( s: LensState<S, S> ) => string;",
      "};",
      "export type GetUrlParams<S extends any> = ( s: S, ...ks: CommonUrlParamsNames[] ) => (string | undefined)[]",
      "export function getDefinedUrlsFrom<S extends any> ( s: S, getUrlParams: GetUrlParams<S>, ...ks: CommonUrlParamsNames[] ): string[] {",
      "  const result = getUrlParams ( s, ...ks )",
      "  if ( areAllDefined ( result ) )",
      "    return result",
      "  else",
      "    throw new Error ( `Expected params to be defined in. Args are(${ks.map ( k => `${k}=${getUrlParams ( s, k )}` ).join ( ',' )}. Result was ${result}` )",
      "}",
      "export function getQueryFor<S extends any> ( s: S, getUrParams: GetUrlParams<S>, ...ks: CommonUrlParamsNames[] ) {",
      "  return ks.map ( k => `${k}=${getUrParams ( s, k )}` ).join ( '&' )",
      "}",
      "export const defaultGetUrlParams = <S extends any> ( rootLens: Lens<S, CommonUrlParams> ): GetUrlParams<S> =>",
      "  ( s: S, ...ks: CommonUrlParamsNames[] ) => {",
      "    const commonParams = rootLens.getOption ( s )",
      "    return ks.map ( k => or<string> ( () => {",
      "      throw new Error ( 'cannot get optOut url without client ref, account seq, application ref, vb account seq and brand ref' );",
      "// @ts-ignore TODO Fix this undefined issue",
      "    } ) ( commonParams?.[ k ] ) )",
      "  }",
      "export const getUrlParams: GetUrlParams<FullState> = defaultGetUrlParams(Lenses.identity<FullState>().focusOn('commonIds'))"
    ])
  } )

} )