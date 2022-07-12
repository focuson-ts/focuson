/** This is a wrapper for the javascript fetch function. The input parameters are the same as for fetch. The output is the statuscode and a T, where T is the expected json type
 *
 * T is probably not meaningful if the status code is not a 2xx
 * */

var isNode = new Function ( "try {return this===global;}catch(e){return false;}" );
const actualFetch = isNode ? require ( "node-fetch" ) : fetch

export function delay ( ms: number ) {
  return new Promise ( resolve => {
    setTimeout ( () => {
      resolve ( {} )
    }, ms )
  } )
}
export interface FetchFn {
  ( re: RequestInfo, init?: RequestInit ): Promise<[ number, any ]>
}

/** Normally we would use the defaultFetchFn or the loggingFetchFn */
export const defaultFetchFn = <T> ( re: RequestInfo, init?: RequestInit ): Promise<[ number, T ]> => {
  if ( re === "" ) throw Error ( 'calling defaultFetchFn with empty string as url' )
  try {
    return actualFetch ( re, init ).then ( ( r: any ) => r.ok
      ? r.json ().then ( ( json: any ) => [ r.status, json ] )
      : r.text ().then ( ( text: any ) => [ r.status, text ] ) ).catch ( e => {
      console.error ( e )
      throw e
    } );
  } catch ( e: any ) {
    console.error ( e )
    return Promise.reject ( e )
  }
}

/** Normally we would use the defaultFetchFn or the loggingFetchFn */
export function loggingFetchFn<T> ( re: RequestInfo, init?: RequestInit ): Promise<[ number, T ]> {
  console.log ( "fetching from", re, init )
  return defaultFetchFn ( re, init )
}
/** Normally we would use the defaultFetchFn or the loggingFetchFn */
export function loggingResultFetchFn<T> ( re: RequestInfo, init?: RequestInit ): Promise<[ number, T ]> {
  console.log ( "fetching from", re, init )
  return defaultFetchFn ( re, init )
}


export function fetchWithPrefix ( prefix: string, fetchFn: FetchFn ): FetchFn {
  return ( re: RequestInfo, init?: RequestInit ): Promise<[ number, any ]> => {
    if ( typeof re === 'string' ) return fetchFn ( prefix + re, init )
    else throw new Error ( `Cannot handle request ${re}` )
  }
}
export function fetchWithDelay ( ms: number, fetchFn: FetchFn ): FetchFn {
  return ( re: RequestInfo, init?: RequestInit ): Promise<[ number, any ]> => delay ( ms ).then ( () => fetchFn ( re, init ) )
}
