import { reqFor, Tags, UrlConfig } from "@focuson/template";
import { beforeAfterSeparator, FetchFn, isRestStateChange, NameAnd, RequiredCopyDetails, RestAction, RestStateChange, safeArray, safeObject, sortedEntries, toArray } from "@focuson/utils";
import { identityOptics, lensBuilder, Lenses, massTransform, Optional, parsePath, Transform } from "@focuson/lens";
import { ChangeCommand, CopyResultCommand, DeleteCommand, MessageCommand, processChangeCommandProcessor, RestAndInputProcessorsConfig, restChangeCommandProcessors, RestChangeCommands } from "./changeCommands";


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
  graphQlPostfix: string,
  message: boolean;
  annotation: string;
}
export interface RestTypeDetails {
  [ name: string ]: RestActionDetail
}

export const defaultRestAction: RestTypeDetails = {
  'get': { name: 'get', method: 'GET', query: 'Query', params: { needsId: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '', message: false, annotation: "GetMapping" },
  // 'getString': { name: 'getString', query: 'Query', params: { needsId: true }, output: { needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '' }, //special for mocks
  // 'getOption': { name: 'getOption', method: 'GET', query: 'Query', params: { needsId: true }, output: { needsObj: true }, graphQPrefix: 'getOption', graphQlPostfix: '', message: false, annotation: "GetMapping" },
  // 'list': { name: 'list', method: 'GET', query: 'Query', params: {}, output: { needsObj: true, needsBrackets: true, needsPling: true }, graphQPrefix: 'list', graphQlPostfix: '' },
  'update': { name: 'update', method: 'PUT', query: 'Mutation', params: { needsId: true, needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'updateWithoutFetch', graphQlPostfix: '', message: true, annotation: "PutMapping" },
  'updateWithoutFetch': { name: 'update', method: 'PUT', query: 'Mutation', params: { needsId: true, needsObj: true }, output: { needsObj: false, needsPling: false }, graphQPrefix: 'update', graphQlPostfix: '', message: true, annotation: "PutMapping" },
  'create': { name: 'create', method: 'POST', query: 'Mutation', params: { needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'create', graphQlPostfix: '', message: true, annotation: "PostMapping" },
  'createWithoutFetch': { name: 'create', method: 'POST', query: 'Mutation', params: { needsObj: true }, output: { needsObj: false, needsPling: false }, graphQPrefix: 'createWithoutFetch', graphQlPostfix: '', message: true, annotation: "PostMapping" },
  'delete': { name: 'delete', method: 'DELETE', query: 'Mutation', params: { needsId: true }, output: { needsObj: false }, graphQPrefix: 'delete', graphQlPostfix: '', message: true, annotation: "DeleteMapping" },

  'state': {
    name: 'state', method: 'POST', query: 'Mutation',
    params: { needsId: true, needsObj: true },
    output: { needsObj: false },
    graphQPrefix: 'state', graphQlPostfix: '', message: true, annotation: "PostMapping"
  },
}
export function restActionToDetails ( r: RestAction ): RestActionDetail {
  if ( typeof r === 'string' ) return defaultRestAction[ r ]
  if ( isRestStateChange ( r ) ) return defaultRestAction[ 'state' ]
  throw Error ( `Don't know how to restActionToDetails(${JSON.stringify ( r )})` )
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
export type emptyType = {}

export type UrlAndParamsForState = { url?: string, params?: string[] } // we don't know what the params are, we just need the names
export type StateAccessDetails<S> = UrlAndParamsForState & { bodyFrom?: Optional<S, any>; }
export interface OneRestDetails<S, FD, D, MSGs> extends UrlConfig<S, FD, D> {
  url: string;
  states?: NameAnd<StateAccessDetails<S>>,
  extractData: ( status: number | undefined, body: any ) => D,
  messages: ( status: number | undefined, body: any ) => MSGs[];//often the returning value will have messages in it. Usually a is of type Domain. When the rest action is Delete there may be no object returned, but might be MSGs
}


export type RestDetails<S, MSGs> = NameAnd<OneRestDetails<S, any, any, MSGs>>

export interface RestCommand {
  name: string;
  restAction: RestAction;
  comment?: string;
  /** If the rest command was created by a fetcher these are the tags */
  tagNameAndTags?: { tags: Tags, tagName: string },
  /** @deprecated - moving to changeOnSuccess*/
  copyOnSuccess?: RequiredCopyDetails[];
  /** @deprecated - moving to changeOnSuccess. If set, after the rest action has succeeded the named path will be deleted in the state. This is allow us to trigger the fetchers, which will fetch the latest data */
  deleteOnSuccess?: string | string[];
  /** @deprecated - moving to changeOnSuccess*/
  messageOnSuccess?: string
  changeOnSuccess?: RestChangeCommands[]
  on404?: RestChangeCommands[]
}

export const restCommandToChangeCommands = <MSGs> ( stringToMsg: ( s: string ) => MSGs ) => ( r: RestCommand, status: number | undefined ): ChangeCommand[] => {
  const deletes: DeleteCommand[] = toArray ( r.deleteOnSuccess ).map ( path => ({ command: 'delete', path }) )
  const messagesOnSuccess: MessageCommand[] = status && status < 300 ? toArray ( r.messageOnSuccess ).map ( msg => ({ command: 'message', msg: msg }) ) : []
  const copies: CopyResultCommand[] = toArray ( r.copyOnSuccess ).map ( ( { from, to } ) => ({ command: 'copyResult', from, to }) )
  return [ ...deletes, ...messagesOnSuccess, ...copies ]

};

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

export const restResultToTx = <S, MSGs> ( messageL: Optional<S, MSGs[]>, extractMsgs: ( status: number | undefined, body: any ) => MSGs[], toPathTolens: ( path: string ) => Optional<S, any>, stringToMsg: ( msg: string ) => MSGs, extractData: ( status: number | undefined, body: any ) => any ) => ( { restCommand, one, status, result }: RestResult<S, MSGs, OneRestDetails<S, any, any, MSGs>> ): Transform<S, any>[] => {
  const messagesFromBody: MSGs[] = extractMsgs ( status, result )
  const changeCommands = restCommandToChangeCommands ( stringToMsg ) ( restCommand, status )
  const resultPathToLens = ( s: string ) => parsePath<any> ( s, lensBuilder ( { '': Lenses.identity<any> () }, {} ) )
  const config: RestAndInputProcessorsConfig<S, any, MSGs> = { resultPathToLens, messageL, toPathTolens, stringToMsg }
  const data = extractData ( status, result );
  const processor = restChangeCommandProcessors ( config ) ( data );

  const legacyChangeTxs: Transform<S, any>[] = processChangeCommandProcessor ( '', processor, changeCommands );
  const changeTxs = processChangeCommandProcessor ( '', processor, toArray ( restCommand.changeOnSuccess ) )
  const useResponse = getRestTypeDetails ( restCommand.restAction ).output.needsObj
  const resultTransform: Transform<S, any>[] = useResponse && status && status < 400 ? [ [ one.fdLens.chain ( one.dLens ), old => data ] ] : []
  const on404Transforms: Transform<S, any>[] = status && status == 404 ? processChangeCommandProcessor ( '', processor, toArray ( restCommand.on404 ) ) : []
  const msgFromBodyTx: Transform<S, any> = [ messageL, old => [ ...messagesFromBody, ...safeArray(old) ] ]
  let resultTxs: Transform<S, any>[] = [ msgFromBodyTx, ...on404Transforms, ...legacyChangeTxs, ...changeTxs, ...resultTransform ];
  return resultTxs;
};

export const processRestResult = <S, MSGs> ( messageL: Optional<S, MSGs[]>, pathToLens: ( path: string ) => Optional<S, any>, stringToMsg: ( msg: string ) => MSGs ) => ( s: S, { restCommand, one, status, result }: RestResult<S, MSGs, OneRestDetails<S, any, any, MSGs>> ): S => {
  const txs: Transform<S, any>[] = restResultToTx<S, MSGs> ( messageL, one.messages, pathToLens, stringToMsg, one.extractData ) ( result )
  return massTransform ( s, ...txs )
};

export function getUrlForRestAction<S> ( restAction: RestAction, url: string, states?: NameAnd<UrlAndParamsForState> ): string {
  if ( isRestStateChange ( restAction ) ) {
    const url: string | undefined = safeObject ( states )[ restAction.state ]?.url
    if ( url === undefined ) throw Error ( `Requested state change is ${restAction.state}. The legal list is [${sortedEntries ( states ).map ( x => x[ 0 ] )}]\nThe base url is ${url}` )
    return url;
  }
  return url
}

function findStateDetails<S, MSGS> ( one: OneRestDetails<S, any, any, MSGS>, restAction: RestStateChange ) {
  let result = safeObject ( one.states )[ restAction.state ];
  if ( result === undefined ) throw new Error ( `Illegal state [${restAction.state}] requested. Legal values are [${Object.keys ( safeObject ( one.states ) )}]` )
  return result;
}
function makeModifiedUrlConfig<S, MSGS> ( restAction: RestAction, one: OneRestDetails<S, any, any, MSGS>,
                                          urlMutatorForRest: ( r: RestAction, url: string ) => string,
                                          fdLens: Optional<S, any> ) {
  if ( isRestStateChange ( restAction ) ) {
    const details = findStateDetails ( one, restAction );
    if ( details ) {
      const url = urlMutatorForRest(restAction, details.url ? details.url : one.url)
      const ids = safeArray ( details?.params ) !== undefined ? safeArray ( details?.params ) : one.ids
      const bodyFrom = details.bodyFrom ? details.bodyFrom : one.bodyFrom
      return { ...one, url, ids, fdLens, bodyFrom };
    }
  }
  return {...one, url: urlMutatorForRest(restAction, one.url)}
}

export function restReq<S, Details extends RestDetails<S, MSGS>, MSGS> ( d: Details,
                                                                         commands: RestCommand[],
                                                                         urlMutatorForRest: ( r: RestAction, url: string ) => string,
                                                                         s: S ): [ RestCommand, OneRestDetails<S, any, any, any>, RequestInfo, RequestInit | undefined ][] {
  // @ts-ignore
  const debug = s.debug?.restDebug
  return commands.map ( command => {
    const { name, restAction } = command
    const one: OneRestDetails<S, any, any, MSGS> = d[ name ]

    if ( debug ) console.log ( "restReq-onex", name, one )
    if ( !one ) throw new Error ( `Cannot find rest details for [${name}] [${restAction}]. Legal values are ${Object.keys ( d ).sort ()}` )
    try {
      let fdLens = one.fdLens;
      if ( debug ) {
        console.log ( "restReq-fdLens", fdLens.description, fdLens )
        console.log ( "restReq-dLens", one.dLens.description, one.dLens );
      }
      const adjustedUrlConfig = makeModifiedUrlConfig ( restAction, one, urlMutatorForRest, fdLens );
      let request = reqFor ( adjustedUrlConfig, restAction ) ( s ) ( adjustedUrlConfig.url );
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


export interface RestCommandAndTxs<S> {
  restCommand: RestCommand;
  status?: number
  one: OneRestDetails<S, any, any, any>;
  txs: Transform<S, any>[];
}

export interface RestToTransformProps<S, MSGS> {
  fetchFn: FetchFn,
  d: RestDetails<S, MSGS>,
  urlMutatorForRest: ( r: RestAction, url: string ) => string,
  pathToLens: ( s: S ) => ( path: string ) => Optional<S, any>,
  messageL: Optional<S, MSGS[]>,
  traceL: Optional<S, any[]>,
  stringToMsg: ( msg: string ) => MSGS,
}


/** Executes all the rest commands returning a list of transformations. It doesn't remove the rest commands from S
 This is valuable over the 'make a new S'for a few reasons:
 * It makes testing the rest logic easier
 * It reduces race conditions where user clicks will be ignore with slow networks... the transformations can be applied to the updated world. It's not a perfect solution though (that's a hard problem)
 * It allows us (in the calling code) to add the restful data to the trace. This is great for 'understanding what happened' */
export async function restToTransforms<S, MSGS> (
  props: RestToTransformProps<S, MSGS>,
  s: S, commands: RestCommand[] ): Promise<RestCommandAndTxs<S>[]> {
  if ( s === undefined ) throw new Error ( `State was null` )
  // @ts-ignore
  const debug = s.debug?.restDebug
  // @ts-ignore
  const tracing = s.debug?.recordTrace
  if ( debug ) console.log ( "rest-commands", commands )
  if ( commands.length == 0 ) return Promise.resolve ( [] )
  const { d, urlMutatorForRest, pathToLens, stringToMsg, messageL, fetchFn, traceL } = props

  const requests: [ RestCommand, OneRestDetails<S, any, any, any>, RequestInfo, (RequestInit | undefined) ][] = restReq ( d, commands, urlMutatorForRest, s )
  if ( debug ) console.log ( "rest-requests", requests )
  const results: RestResult<S, MSGS, any>[] = await massFetch ( fetchFn, requests )
  if ( debug ) console.log ( "rest-results", results )
  let toLens = pathToLens ( s );
  if ( debug ) console.log ( 'results from fetching rest commands', results  )

  const restCommandAndTxs: RestCommandAndTxs<S>[] = results.map ( res => {
    const txs: Transform<S, any>[] = restResultToTx ( messageL, res.one.messages, toLens, stringToMsg, res.one.extractData ) ( res );
    const trace: Transform<S, any>[] = tracing ? [ [ traceL, old => [ ...safeArray ( old ), { restCommand: res.restCommand, lensTxs: txs.map ( ( [ l, tx ] ) => [ l.description, tx ( l.getOption ( s ) ) ] ) } ] ] ] : []
    const restAndTxs: RestCommandAndTxs<S> = { ...res, txs: [ ...txs, ...trace ] };
    return restAndTxs
  } )

  if ( debug ) console.log ( "rest-txs ", restCommandAndTxs )
  return restCommandAndTxs
}

/** @deprecated
 * This does everything for rest: processes the commands, removes the commands, processes the adding of rest commands to state
 *
 * It is deprecated because of the race condition it introduces: the users commands from the start to the time the rest command results are processed will be overwritten
 * In addition it is hard to link this to the tracing system, so visibility about what is happening is much less
 * */
export async function rest<S, MSGS> (
  props: RestToTransformProps<S, MSGS>,
  restL: Optional<S, RestCommand[]>,
  s: S ): Promise<S> {
  const commands = restL.getOption ( s )
  const restCommandAndTxs: RestCommandAndTxs<S>[] = await restToTransforms ( props, s, safeArray ( commands ) )
  // @ts-ignore
  const [ debug, trace ] = [ s.debug?.restDebug, s.debug?.recordTrace ]
  console.log ( 'checking trace', trace )
  const newS = massTransform ( s, ...restCommandAndTxs.flatMap ( r => r.txs ), [ restL, () => [] ] )

  if ( debug ) console.log ( "rest-result", newS )
  return newS
}
