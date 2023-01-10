import { DirtyPrism, Optional } from "@focuson-nw/lens";
import { partialFnUsageError } from "./errorhandling";
import { Fetcher, loadInfo, LoadInfo, MutateFn, ReqFn } from "./fetchers";

/** We compare the actualmarker with the selectedMarker. if they are different we load a T and put it into the target (and update the actual marker
 *
 * Example usage: the marker could be a url, the T the contents of that url. We can load now by setting the url.
 * */
export function loadIfMarkerChangesFetcher<State, T> ( actualMarker: Optional<State, string>, selectedMarker: Optional<State, string>, target: Optional<State, T>, reqFn: ReqFn<State>, description?: string ): Fetcher<State, T> {
  let shouldLoad = ( ns: State ): string[] => {
    if ( !ns ) return [ 'State undefined' ]
    const actual = actualMarker.getOption ( ns )
    const selected = selectedMarker.getOption ( ns )
    if ( selected === undefined ) return [ 'Selected undefined' ]
    if ( actual === selected ) [ 'Selected matchs actual' ]
    return []
  }
  let result: Fetcher<State, T> = {
    shouldLoad,
    load: ( ns: State ): LoadInfo<State, T> => {
      const req = reqFn ( (ns) )
      if ( !req ) throw partialFnUsageError ( result, ns )
      const [ reqInfo, reqInit ] = req
      let mutate: MutateFn<State, T> = s => ( status, json ) => {
        if ( !s ) throw partialFnUsageError ( result, ns )
        let selected = selectedMarker.getOption ( s );
        if ( !selected ) throw partialFnUsageError ( result, ns )
        let withActual = actualMarker.setOption ( s, selected )
        if ( !withActual ) throw partialFnUsageError ( result, ns )
        return target.set ( withActual, json )
      }
      return loadInfo ( reqInfo, reqInit, mutate )
    },
    description: description ? description : `loadIfMarkerChangesFetcher(actualMarker=${actualMarker.description}, selectedMarker=${selectedMarker},target=${target.description})`
  }
  return result
}

function map<T, T1> ( t: T | undefined, fn: ( t: T ) => T1 | undefined ): T1 | undefined {
  if ( t ) return fn ( t ); else return undefined
}


/** If a marker changes then a fetch is performed
 * Common uses include <ul>
 *     <li>the marker being a  is a url and this go gets the contents of that url
 *     <li> the marker being a set of tags, and if any of the tags change then we load the url (the tags might be 'selected itemtype', 'selected item', 'selected feature'
 *     </ul>*/
export function markerFetcher<State, Holder, Marker, T> (
  desired: Optional<State, Marker>,
  holderPrism: DirtyPrism<Holder, [ Marker, T ]>,
  markersEqual: ( desired: Marker | undefined, actual: Marker | undefined ) => Boolean,
  target: Optional<State, Holder>,
  markerToReqFn: ( marker: Marker ) => ReqFn<State>,
  description?: string
) {
  let shouldLoad = ( ns: State ): string[] => {
    if ( !ns ) return [ 'State undefined' ]
    const desiredMarker = desired.getOption ( ns )
    const actualMarker = map ( target.getOption ( ns ), h => map ( holderPrism.getOption ( h ), arr => arr[ 0 ] ) )
    if ( !desiredMarker ) return [ 'Desired Marker undefined' ]
    if ( actualMarker !== undefined || markersEqual ( desiredMarker, actualMarker ) ) return [ 'Markers match' ]
    return []
  }
  let result: Fetcher<State, T> = {
    shouldLoad,
    load: ( ns: State ): LoadInfo<State, T> => {
      const desiredMarker = desired.getOption ( ns )
      if ( !desiredMarker ) throw partialFnUsageError ( result, ns )
      const req = markerToReqFn ( desiredMarker ) ( ns )
      if ( !req ) throw partialFnUsageError ( result, ns )
      const [ reqInfo, reqInit ] = req
      let mutate: MutateFn<State, T> = s => ( status, json ) => {
        if ( !s ) throw partialFnUsageError ( result, ns )
        const holder = holderPrism.reverseGet ( [ desiredMarker, json ] )
        return target.set ( s, holder )
      }
      return loadInfo ( reqInfo, reqInit, mutate )
    },
    description: description ? description : `markerFetcher(desired=${desired.description}, target=${target.description})`
  }
  return result
}