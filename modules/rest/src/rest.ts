import { reqFor, UrlConfig } from "@focuson/template";
import { FetchFn, NameAnd, RestAction, safeArray } from "@focuson/utils";
import { identityOptics, massTransform, Optional, Transform } from "@focuson/lens";

export interface RestDebug{
  restDebug? : boolean
}

export interface OneRestDetails<S, FD, D, MSGs> extends UrlConfig<S, FD, D> {
  url: string;
  messages: ( status: number, body: any ) => MSGs[];//often the returning value will have messages in it. Usually a is of type Domain. When the rest action is Delete there may be no object returned, but might be MSGs
}


export type RestDetails<S, MSGs> = NameAnd<OneRestDetails<S, any, any, MSGs>>

export interface RestCommand {
  name: string;
  restAction: RestAction;
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
  one: Cargo;
  status?: number;
  result: any
}

export const processRestResult = <S, MSGs> ( messageL: Optional<S, MSGs[]> ) => ( s: S, { one, status, result }: RestResult<S, MSGs, OneRestDetails<S, any, any, MSGs>> ): S => {
  const msgTransform: Transform<S, MSGs[]> = [ messageL, old => [ ...one.messages ( status, result ), ...old ] ]
  const resultTransform: Transform<S, any>[] = status && status < 400 ? [ [ one.fdLens.chain ( one.dLens ), old => result ] ] : []
  let res = massTransform ( s, msgTransform, ...resultTransform );
  return res
};

export function restReq<S, Details extends RestDetails<S, MSGS>, MSGS> ( d: Details,
                                                                         restL: Optional<S, RestCommand[]>,
                                                                         urlMutatorForRest: ( r: RestAction, url: string ) => string,
                                                                         s: S ): [ OneRestDetails<S, any, any, any>, RequestInfo, RequestInit | undefined ][] {
  // @ts-ignore
  const debug = s.debug?.restDebug
  const commands = safeArray ( restL.getOption ( s ) )
  return commands.map ( ( { name, restAction } ) => {
    const one: OneRestDetails<S, any, any, MSGS> = d[ name ]
    if ( debug ) console.log ( "restReq-onex", name, one )
    if ( !one ) throw new Error ( `Cannot find page details for ${name} ${restAction}. Legal values are ${Object.keys ( d ).sort ()}` )
    try {
      let fdLens = one.fdLens;
      if ( debug ) {
        console.log ( "restReq-fdLens", fdLens.description, fdLens )
        console.log ( "restReq-dLens", one.dLens.description, one.dLens );
      }
      let url = urlMutatorForRest ( restAction, one.url );
      let request = reqFor ( { ...{ ...one, url }, fdLens }, restAction ) ( s ) ( url );
      if ( debug ) console.log ( "restReq-req", request )
      return [ one, ...request ]
    } catch ( e: any ) {
      console.error ( `error making details for ${name}`, e )
      throw e
    }
  } )
}

export function massFetch<S, MSGs, Cargo> ( fetchFn: FetchFn, reqs: [ Cargo, RequestInfo, RequestInit | undefined ][] ): Promise<RestResult<S, MSGs[], Cargo>[]> {
  return Promise.all ( reqs.map ( ( [ one, info, init ] ) => fetchFn ( info, init ).then (
    ( [ status, result ] ) => ({ one, status, result }),
    error => ({ one, result: error }) ) ) )
}

export function processAllRestResults<S, MSGSs> ( messageL: Optional<S, MSGSs[]>, restL: Optional<S, RestCommand[]>, results: RestResult<S, MSGSs, OneRestDetails<S, any, any, MSGSs>>[], s: S ) {
  let withResults = results.reduce ( processRestResult ( messageL ), s );
  let res = restL.set ( withResults, [] );
  return res
}

export async function rest<S, MSGS> (
  fetchFn: FetchFn,
  d: RestDetails<S, MSGS>,
  urlMutatorForRest: ( r: RestAction, url: string ) => string,
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
  const result = processAllRestResults<S, MSGS> ( messageL, restL, results, s );
  if ( debug ) console.log ( "rest-result", result )
  return result
}
