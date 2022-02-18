import {HasSimpleMessages, SimpleMessage, HasPageSelection} from '@focuson/pages'
import { LensState } from '@focuson/state';
import { defaultDateFn } from '@focuson/utils';
import { commonTagFetchProps, HasTagHolder, OnTagFetchErrorFn } from '@focuson/fetcher';
import { Lens, Lenses } from '@focuson/lens';


import { tagOps } from '@focuson/template';
import * as pageDomains from './pageDomains';
export interface FState extends HasSimpleMessages,HasPageSelection,HasCommonIds,HasTagHolder,
 pageDomains.HasEAccountsSummaryPageDomain
{}
export interface HasCommonIds {CommonIds: CommonIds}
export type CommonIds = {
accountId?:string;
customerId?:string;
}
export const commonIdLens = Lenses.identity<FState> ().focusOn ( 'CommonIds' )
export const commonIdOps = tagOps ( commonIdLens, { failSilently: false } )
export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onError?: OnTagFetchErrorFn<S, T, SimpleMessage> ) {
  return commonTagFetchProps<S, T> (
    ( s, date ) => [], //later do the messaging
    defaultDateFn ) ( onError ) //updateTagsAndMessagesOnError ( defaultErrorMessage )
}
//
//
//
// export type CommonUrlParamsNames = {names};
// export type CommonUrlParams = {
//   [key in CommonUrlParamsNames]?: string
// }
// export interface HasCommonUrlParams {
//    commonIds: CommonUrlParams
// }
// export type CommonUrlParamsFns<S> = {
//   [key in CommonUrlParamsNames]?: ( s: LensState<S, S> ) => string;
// };
//
// export type GetUrlParams<S extends any> = ( s: S, ...ks: CommonUrlParamsNames[] ) => (string | undefined)[]
//
// export function getDefinedUrlsFrom<S extends any> ( s: S, getUrlParams: GetUrlParams<S>, ...ks: CommonUrlParamsNames[] ): string[] {
//   const result = getUrlParams ( s, ...ks )
//   if ( areAllDefined ( result ) )
//     return result
//   else
//     throw new Error ( `Expected params to be defined in. Args are(${ks.map ( k => `${k}=${getUrlParams ( s, k )}` ).join ( ',' )}. Result was ${result}` )
// }
// export function getQueryFor<S extends any> ( s: S, getUrParams: GetUrlParams<S>, ...ks: CommonUrlParamsNames[] ) {
//   return ks.map ( k => `${k}=${getUrParams ( s, k )}` ).join ( '&' )
// }
//
// export const defaultGetUrlParams = <S extends any> ( rootLens: Lens<S, CommonUrlParams> ): GetUrlParams<S> =>
//   ( s: S, ...ks: CommonUrlParamsNames[] ) => {
//     const commonParams = rootLens.getOption ( s )
//     return ks.map ( k => or<string> ( () => {
//       throw new Error ( 'cannot get optOut url without client ref, account seq, application ref, vb account seq and brand ref' );
// // @ts-ignore TODO Fix this undefined issue
//     } ) ( commonParams?.[ k ] ) )
//   }
//
//
// export const getUrlParams: GetUrlParams<FullState> = defaultGetUrlParams(Lenses.identity<FullState>().focusOn('<urlparams>'))