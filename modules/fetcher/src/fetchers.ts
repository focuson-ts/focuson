/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
import { DirtyPrism, Optional } from "@focuson/lens";
import { FetcherDebug } from "./setjson";
import { partialFnUsageError } from "./errorhandling";
import { FetchFn } from "@focuson/utils";


/** One of our design principles is that we separate 'what we do' from 'doing it'. This eases testing enormously.
 *
 * The mutate function is 'what I will do when I have loaded the data'.*/
export interface MutateFn<State, T> {
  ( s: State ): ( status: number, json: T ) => State
}


/**  This is an area that could be refactored...
 *
 * The requestInfo/requestInit tell us what to load, the mutate tells us what to do with the information we have loaded.
 * BUT the useThisInsteadOfLoad overwrites that behavior. If set, we don't load.
 *
 */
export interface LoadInfo<State, T> {
  requestInfo: RequestInfo,
  requestInit?: RequestInit,
  mutate: MutateFn<State, T>,
  useThisInsteadOfLoad?: ( s: State ) => State
}

export function loadInfo<State, T> ( requestInfo: RequestInfo,
                                     requestInit: RequestInit | undefined,
                                     mutate: MutateFn<State, T>,
                                     useThisInsteadOfLoad?: ( s: State ) => State ): LoadInfo<State, T> {
  return { requestInfo, requestInit, mutate, useThisInsteadOfLoad }
}
export function loadDirectly<State> ( useThisInsteadOfLoad: ( s: State ) => State ): LoadInfo<State, any> {
  return ({ requestInfo: "", mutate: os => ( s, j ) => os, useThisInsteadOfLoad })
}

/** This works out what is to be loaded from the state. A loadFn is typically part of a single fetcher */
export interface LoadFn<State, T> {
  ( state: State ): LoadInfo<State, T>
}

/** Given a state, what are the parameters I should pass to the fetchFn. If the result is undefined the answer is 'nothing' */
export interface ReqFn<State> {
  ( state: State ): [ RequestInfo, RequestInit | undefined ] | undefined
}


/** The fetcher is responsible for modifying state. It is effectively a PartialFunction. If 'shouldLoad' returns false, the behavior of 'load' is undefined */
export interface Fetcher<State, T> {
  /** This works out if we need to load. Typically is a strategy. The strings are 'why it didn't load' so if empty we can load*/
  shouldLoad: ( state: State ) => string[],
  /** This provides the info that we need to load. The first two parameters can be passed to fetch, and the third is how we process the result.
   * Note that it is hard to guarantee that the json is a T, so you might want to check it     * */
  load: LoadFn<State, T>,
  /** For debugging and testing. It's idiomatically normal to make this the variable name of your fetcher, or some other description that makes sense to you */
  description: string
}


export function fetcher<State, T> ( shouldLoad: ( ns: State ) => string[],
                                    load: LoadFn<State, T>,
                                    description: string ): Fetcher<State, T> {
  return ({ shouldLoad, load, description })
}

/** This will 'do the work of fetching' for a single fetcher. */
export const applyFetcher = <State, T> ( fetcher: Fetcher<State, T>, s: State, fetchFn: FetchFn, debug?: FetcherDebug ): Promise<State> => {
  const fetcherDebug = debug?.fetcherDebug
  let shouldLoad = fetcher.shouldLoad ( s );
  if ( shouldLoad.length === 0 ) {
    if ( fetcherDebug ) console.log ( "applyFetcher", fetcher.description, s )
    const { requestInfo, requestInit, mutate, useThisInsteadOfLoad } = fetcher.load ( s )
    if ( fetcherDebug ) console.log ( "applyFetcher - loading", requestInfo, requestInit, mutate, useThisInsteadOfLoad )
    if ( useThisInsteadOfLoad ) {
      if ( fetcherDebug ) console.log ( "apply fetcher - using useThisInsteadOfLoad", fetcher.description, useThisInsteadOfLoad, s )
      let result = useThisInsteadOfLoad ( s );
      if ( fetcherDebug ) console.log ( "apply fetcher - result of useThisInsteadOfLoad is", fetcher.description, result )
      return Promise.resolve ( result )
    } else {
      if ( requestInfo === "" ) {
        let message = `applyFetcher - have no useThisInsteadOfLoad, but have empty request string for ${fetcher.description}`;
        if ( fetcherDebug ) console.error ( message )
        throw Error ( message )
      }
    }
    return fetchFn ( requestInfo, requestInit ).then ( ( [ status, json ] ) => {
      if ( fetcherDebug ) console.log ( "applyFetcher - fetched", requestInfo, requestInit, status, json )
      // @ts-ignore
      let result = mutate ( s ) ( status, json );
      if ( fetcherDebug ) console.log ( "applyFetcher - result", result )
      return result
    }, reject => {
      if ( fetcherDebug ) console.log ( "applyFetcher - error occured", requestInfo, requestInit, reject )
      // @ts-ignore
      let result = mutate ( s ) ( 600, reject ); //600 means 'error' could do this as a 5xx but it wasn't returned, so this gives more info
      if ( fetcherDebug ) console.log ( "applyFetcher - result", result )
      return result

    } )
  } else if ( fetcherDebug ) console.log ( "didn't load", fetcher.description, shouldLoad.join(","), shouldLoad )
  return Promise.resolve ( s )
}

export function lensFetcher<State, Child, T> ( lens: Optional<State, Child>, fetcher: Fetcher<Child, T>, description?: string ): Fetcher<State, T> {
  const result: Fetcher<State, T> = ({
    shouldLoad: ( ns ): string[] => {
      if ( !ns ) return [ 'emptyState' ]
      let nc = lens.getOption ( ns );
      if ( !nc ) return [ 'emptyFocusedOnState' ]
      let result = nc && fetcher.shouldLoad ( nc );
      return result
    },
    load ( ns ) {
      const cs: Child | undefined = lens.getOption ( ns )
      if ( cs === undefined ) throw partialFnUsageError ( result, ns )
      const { requestInfo, requestInit, mutate, useThisInsteadOfLoad } = fetcher.load ( cs )
      const mutateFn: MutateFn<State, T> = s => ( status, json ) => {
        const childState = lens.getOption ( s );
        if ( !childState ) {
          console.error ( "s", s )
          console.error ( "childState", childState )
          throw Error ( `Cannot find the child state` )
        }
        return lens.set ( s, mutate ( childState ) ( status, json ) )
      }
      return loadInfo ( requestInfo, requestInit, mutateFn )
    },
    description: description ? description : "lensFetcher(" + lens + "," + fetcher.description + ")"
  })
  return result
}


export const condFetcher = <State> ( condition: ( s: State ) => boolean, conditionFailedText: string, fetcher: Fetcher<State, any>, description?: string ): Fetcher<State, any> => ({
  shouldLoad: ( ns: State ) => {
    const thisCond = condition ( ns )
    if ( !thisCond ) return [ conditionFailedText ]
    const result = fetcher.shouldLoad ( ns )
    return result
  },
  load: ( ns: State ) => fetcher.load ( ns ),
  description: description ? description : `ifEqualsFetcher(${fetcher.description})`
});


export const ifEEqualsFetcher = condFetcher


export function fetcherWhenUndefined<State, Child> ( optional: Optional<State, Child>,
                                                     reqFn: ReqFn<State>,
                                                     description?: string ): Fetcher<State, Child> {
  let result: Fetcher<State, Child> = ({
    shouldLoad: ( ns ) => {
      let nc = optional.getOption ( ns );
      if ( nc === undefined ) return []
      try {
        let req = reqFn ( ns )
        if ( req ) return [ 'defined' ]
        return []
      } catch ( e ) {
        return [ `Error ${e}` ]
      }
    },
    load ( s ) {
      const req = reqFn ( s );
      if ( req === undefined ) throw partialFnUsageError ( result, s )
      const [ url, init ] = req;
      let mutate: MutateFn<State, Child> = s => ( status, json ) => optional.set ( s, json )
      return loadInfo ( url, init, mutate )
    },
    description: description ? description : "fetcherWhenUndefined(" + optional + ")"
  })
  return result
}

export function fetchAndMutate<State, T> ( f: Fetcher<State, T>, fn: ( s: State ) => State, description?: string ): Fetcher<State, T> {
  return {
    shouldLoad: f.shouldLoad,
    load: s => {
      const { requestInfo, requestInit, mutate, useThisInsteadOfLoad } = f.load ( s )
      const newMutate: MutateFn<State, T> = s => ( status, json ) => fn ( mutate ( s ) ( status, json ) )
      return loadInfo ( requestInfo, requestInit, newMutate, useThisInsteadOfLoad )
    },
    description: description ? description : f.description + ".withMutate"
  }
}

export function fetcherWithHolder<State, Holder, T> ( target: Optional<State, Holder>, holder: DirtyPrism<Holder, T>, fetcher: Fetcher<T | undefined, T>, description?: string ): Fetcher<State, T> {
  const targetThenOptional = target.chain ( holder )
  return {
    shouldLoad: ( ns ) => fetcher.shouldLoad ( targetThenOptional.getOption ( ns ) ),
    load ( ns ) {
      const originalTarget: T | undefined = targetThenOptional.getOption ( ns )
      const { requestInfo, requestInit, mutate, useThisInsteadOfLoad } = fetcher.load ( originalTarget )
      let newMutate = ( s: State ) => ( status: number, t: T ) => {
        let x: T | undefined = mutate ( targetThenOptional.getOption ( s ) ) ( status, t )
        if ( !x ) throw Error ( 'result of mutate was undefined' )
        return target.set ( s, holder.reverseGet ( x ) )
      };
      return { requestInfo, requestInit, mutate: newMutate } //TODO what should we do if 'useThisInsteadOfLoad' is defined
    },
    description: description ? description : `fetcherWithHolder(${target},${holder}, ${fetcher})`
  }

}

