import { Fetcher, MutateFn } from "./fetchers";
import { Optional } from "@focuson/lens";
import { partialFnUsageError } from "./errorhandling";


export function radioButtonFetcher<State> (
  desiredRadioButton: ( s: State ) => (string | undefined),//The desired tag.
  actualRadioButton: Optional<State, string>, // this is the tag that names the currently actually selected radio button
  whichFetcher: ( radioButton: string ) => Fetcher<State, any>,
  description?: string
): Fetcher<State, any> {
  let result: Fetcher<State, any> = {
    shouldLoad: ns => {
      if ( !ns ) return false
      const [ desiredTag, f ] = desiredFetcher ( ns, desiredRadioButton, whichFetcher )
      if ( !f ) return false
      const tag = actualRadioButton.getOption ( ns )
      if ( tag != desiredTag ) return true//because when the radio button changes...we need to load
      return f ? f.shouldLoad ( ns ) : false
    },
    load: ns => {
      if ( !ns ) throw partialFnUsageError ( result, ns )
      const [ tag, f ] = desiredFetcher ( ns, desiredRadioButton, whichFetcher )
      if ( !f ) throw partialFnUsageError ( result, ns )
      if ( !tag ) throw partialFnUsageError ( result, ns )
      const { requestInfo, requestInit, mutate } = f.load ( ns )
      const mutateThatUpdatesTag: MutateFn<State, any> = s => ( status, json ) => actualRadioButton.set ( mutate ( s ) ( status, json ), tag )
      return { requestInfo, requestInit, mutate: mutateThatUpdatesTag }
    },
    description: description ? description : "fetchRadioButton(" + actualRadioButton + ")"
  };
  return result
}

export function desiredFetcher<State, T> ( s: State | undefined, tagFn: ( s: State ) => string | undefined, whichFetcher: ( tag: string ) => Fetcher<State, any> ): [ string | undefined, Fetcher<State, any> | undefined ] {
  if ( !s ) return [ undefined, undefined ]
  const tag = tagFn ( s )
  return tag ? [ tag, whichFetcher ( tag ) ] : [ undefined, undefined ]
}

export interface TaggedFetcher<State> {
  [ tag: string ]: Fetcher<State, any>
}

export function fromTaggedFetcher<State> ( t: TaggedFetcher<State> ): ( tag: string ) => Fetcher<State, any> {
  return tag => t[ tag ]
}
