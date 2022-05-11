import { reqFor, UrlConfig } from "@focuson/template";
import { beforeAfterSeparator, FetchFn, isRestStateChange, NameAnd, RestAction, safeArray, safeObject, sortedEntries, toArray } from "@focuson/utils";
import { identityOptics, massTransform, Optional, Transform } from "@focuson/lens";


export interface RestDebug {
  restDebug?: boolean
}

export type QueryOrMutation = 'Query' | 'Mutation'

export interface RestParamsDetails {
  needsId?: boolean,
  needsObj?: boolean
}

export interface RestOutputDetails {
  needsBrackets?: boolean,
  needsObj?: boolean,
  needsPling?: boolean,
}
export interface RestActionDetail {
  /** get, update, insert... */
  name: RestAction | 'state',
  method: string,
  query: QueryOrMutation,
  params: RestParamsDetails,
  output: RestOutputDetails,
  graphQPrefix: string,
  graphQlPostfix: string
}
export interface RestTypeDetails {
  [ name: string ]: RestActionDetail
}

export const defaultRestAction: RestTypeDetails = {
  'get': { name: 'get', method: 'GET', query: 'Query', params: { needsId: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '' },
  // 'getString': { name: 'getString', query: 'Query', params: { needsId: true }, output: { needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '' }, //special for mocks
  'getOption': { name: 'getOption', method: 'GET', query: 'Query', params: { needsId: true }, output: { needsObj: true }, graphQPrefix: 'getOption', graphQlPostfix: '' },
  // 'list': { name: 'list', method: 'GET', query: 'Query', params: {}, output: { needsObj: true, needsBrackets: true, needsPling: true }, graphQPrefix: 'list', graphQlPostfix: '' },
  'update': { name: 'update', method: 'PUT', query: 'Mutation', params: { needsId: true, needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'update', graphQlPostfix: '' },
  'create': { name: 'create', method: 'POST', query: 'Mutation', params: { needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'create', graphQlPostfix: '' },
  'delete': { name: 'delete', method: 'DELETE', query: 'Mutation', params: { needsId: true }, output: { needsObj: false }, graphQPrefix: 'delete', graphQlPostfix: '' },
  'state': { name: 'state', method: 'POST', query: 'Mutation', params: { needsId: true }, output: { needsObj: false }, graphQPrefix: 'state', graphQlPostfix: '' },
}
export function restActionToString ( r: RestAction ): string {
  return isRestStateChange ( r ) ? `state:${r.state}` : r
}
export function parseRestAction ( s: string ): RestAction {
  const [ before, after ] = beforeAfterSeparator ( ":", s )
  if ( before === 'state' ) return { state: after }
  // @ts-ignore
  return before
}

export function printRestAction ( r: RestAction ): string {
  return isRestStateChange ( r ) ? `state:${r.state}` : r
}
export function restActionForName ( r: RestAction ): string {
  return isRestStateChange ( r ) ? `state_${r.state}` : r
}
export function getRestTypeDetails ( a: RestAction ): RestActionDetail {
  return isRestStateChange ( a ) ? { ...defaultRestAction[ 'state' ], graphQlPostfix: a.state } : defaultRestAction[ a ];
}


export type StateAccessDetails = { url: string }
export interface OneRestDetails<S, FD, D, MSGs> extends UrlConfig<S, FD, D> {
  url: string;
  states?: NameAnd<StateAccessDetails>,
  messages: ( status: number, body: any ) => MSGs[];//often the returning value will have messages in it. Usually a is of type Domain. When the rest action is Delete there may be no object returned, but might be MSGs
}


export type RestDetails<S, MSGs> = NameAnd<OneRestDetails<S, any, any, MSGs>>

export interface RestCommand {
  name: string;
  restAction: RestAction;
  /** If set, after the rest action has succeeded the named path will be deleted in the state. This is allow us to trigger the fetchers, which will fetch the latest data */
  deleteOnSuccess?: string | string[]
}
export interface HasRestCommands {
  restCommands: RestCommand[]
}
export interface HasRestCommandL<C> {
  restL: Optional<C, RestCommand[]>
}
export function restL<S extends HasRestCommands> () {
  return identityOptics<S> ().focusQuery ( 'restCommands' )
}
export interface RestResult<S, MSGs, Cargo> {
  restCommand: RestCommand;
  one: Cargo;
  status?: number;
  result: any
}

export const processRestResult = <S, MSGs> ( messageL: Optional<S, MSGs[]> ) => ( s: S, { restCommand, one, status, result }: RestResult<S, MSGs, OneRestDetails<S, any, any, MSGs>> ): S => {
  const msgTransform: Transform<S, MSGs[]> = [ messageL, old => [ ...one.messages ( status, result ), ...old ] ]
  const useResponse = getRestTypeDetails ( restCommand.restAction ).output.needsObj
  const resultTransform: Transform<S, any>[] = useResponse && status && status < 400 ? [ [ one.fdLens.chain ( one.dLens ), old => result ] ] : []
  let res = massTransform ( s, msgTransform, ...resultTransform );
  return res
};
export function getUrlForRestAction ( restAction: RestAction, url: string, states?: NameAnd<StateAccessDetails> ): string {
  if ( isRestStateChange ( restAction ) ) {
    const url: string | undefined = safeObject ( states )[ restAction.state ]?.url
    if ( url === undefined ) throw Error ( `Requested state change is ${restAction.state}. The legal list is [${sortedEntries ( states ).map ( x => x[ 0 ] )}]\nThe base url is ${url}` )
    return url;
  }
  return url
}
export function restReq<S, Details extends RestDetails<S, MSGS>, MSGS> ( d: Details,
                                                                         restL: Optional<S, RestCommand[]>,
                                                                         urlMutatorForRest: ( r: RestAction, url: string ) => string,
                                                                         s: S ): [ RestCommand, OneRestDetails<S, any, any, any>, RequestInfo, RequestInit | undefined ][] {
  // @ts-ignore
  const debug = s.debug?.restDebug
  const commands = safeArray ( restL.getOption ( s ) )
  return commands.map ( command => {
    const { name, restAction } = command
    const one: OneRestDetails<S, any, any, MSGS> = d[ name ]

    if ( debug ) console.log ( "restReq-onex", name, one )
    if ( !one ) throw new Error ( `Cannot find page details for ${name} ${restAction}. Legal values are ${Object.keys ( d ).sort ()}` )
    try {
      let fdLens = one.fdLens;
      if ( debug ) {
        console.log ( "restReq-fdLens", fdLens.description, fdLens )
        console.log ( "restReq-dLens", one.dLens.description, one.dLens );
      }
      let rawUrl = getUrlForRestAction ( restAction, one.url, one.states );
      let url = urlMutatorForRest ( restAction, rawUrl );
      if ( debug ) console.log ( "restReq-url", url )
      let request = reqFor ( { ...{ ...one, url }, fdLens }, restAction ) ( s ) ( url );
      if ( debug ) console.log ( "restReq-req", request )
      return [ command, one, ...request ]
    } catch ( e: any ) {
      console.error ( `error making details for ${name}`, e )
      throw e
    }
  } )
}

export function massFetch<S, MSGs, Cargo> ( fetchFn: FetchFn, reqs: [ RestCommand, Cargo, RequestInfo, RequestInit | undefined ][] ): Promise<RestResult<S, MSGs[], Cargo>[]> {
  return Promise.all ( reqs.map ( ( [ restCommand, one, info, init ] ) => fetchFn ( info, init ).then (
    ( [ status, result ] ) => ({ restCommand, one, status, result }),
    error => ({ restCommand, one, result: error }) ) ) )
}

export interface allLensForRest<S, MSGS> {
  messageL: Optional<S, MSGS[]>;
  restL: Optional<S, RestCommand[]>;
  traceL: Optional<S, any>
}

const deleteAfterRest = <S> ( fromPath: ( path: string ) => Optional<S, any> ) => ( s: S, restCommand: RestCommand ): S => {
  if ( restCommand.deleteOnSuccess === undefined ) return s
  return toArray ( restCommand.deleteOnSuccess ).reduce ( ( acc: S, path: string ) => fromPath ( path ).set ( acc, undefined ), s )
};
export function processAllRestResults<S, MSGS> ( messageL: Optional<S, MSGS[]>, restL: Optional<S, RestCommand[]>, pathToLens: (s: S) =>( path: string ) => Optional<S, any>, results: RestResult<S, MSGS, OneRestDetails<S, any, any, MSGS>>[], s: S ) {
  const withResults: S = results.reduce ( processRestResult ( messageL ), s );
  const fromPath = pathToLens ( s )
  const withDeleteAfterRest: S = results.reduce ( ( acc, res ) =>
    deleteAfterRest ( fromPath ) ( acc, res.restCommand ), withResults )
  const withCommandsRemoved: S = restL.set ( withDeleteAfterRest, [] );
  return withCommandsRemoved
}

export async function rest<S, MSGS> (
  fetchFn: FetchFn,
  d: RestDetails<S, MSGS>,
  urlMutatorForRest: ( r: RestAction, url: string ) => string,
  pathToLens: (s: S) => ( path: string ) => Optional<S, any>,
  messageL: Optional<S, MSGS[]>,
  restL: Optional<S, RestCommand[]>,
  s: S ): Promise<S> {
  // @ts-ignore
  const debug = s.debug?.restDebug
  const commands = restL.getOption ( s )
  if ( debug ) console.log ( "rest-commands", commands )
  if ( !commands || commands.length == 0 ) return Promise.resolve ( s )
  const requests = restReq ( d, restL, urlMutatorForRest, s )
  if ( debug ) console.log ( "rest-requests", requests )
  const results = await massFetch ( fetchFn, requests )
  if ( debug ) console.log ( "rest-results", results )
  const result = processAllRestResults<S, MSGS> ( messageL, restL, pathToLens, results, s );
  if ( debug ) console.log ( "rest-result", result )
  return result
}
