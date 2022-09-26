import { RestCommand, RestDetails } from "@focuson/rest";
import { AllFetcherUsingRestConfig, findRestCommands } from "./tagFetcherUsingRest";
import { TagHolder } from "@focuson/template";
import { Optional, Transform } from "@focuson/lens";
import { FocusOnContext } from "./config";


export function refsToRestCommands<S, MSGs> ( tagHolder: Optional<S, TagHolder>, restDetails: RestDetails<S, MSGs>, fs: AllFetcherUsingRestConfig, refNames: string[], s: S ): [ (RestCommand | undefined), string, string ][] {
  return refNames.flatMap ( name => {
    const fList = fs[ name ]
    if ( fList === undefined ) throw new Error ( `Cannot find fetcher details for ${name}` )
    return fList.map ( ( f ) => {
      const oneRestDetails = restDetails[ f.restName ]
      if ( oneRestDetails === undefined ) throw new Error ( `Cannot find rest details for ${name} - ${JSON.stringify ( f )}` )
      return findRestCommands ( tagHolder ) ( oneRestDetails, name, f, s );
    } )
  } )
}

export function refsToTxs<S, MSGs> ( traceL: Optional<S, any[]>, tagHolder: Optional<S, TagHolder>, rests: Optional<S, RestCommand[]>, restDetails: RestDetails<S, MSGs>, fs: AllFetcherUsingRestConfig, refNames: string[], s: S ): Transform<S, any>[] {
  const restCommandsAndWhy: [ (RestCommand | undefined), string, string ][] = refsToRestCommands ( tagHolder, restDetails, fs, refNames,  s )
  // @ts-ignore
  const debug = s.debug?.reduxDebug
  const restCommands: RestCommand [] = restCommandsAndWhy.flatMap ( rAw => rAw[ 0 ] ? [ rAw[ 0 ] ] : [] )
  if ( debug ) {
    console.log ( 'refs', refNames )
    restCommandsAndWhy.forEach ( rAw => console.log ( rAw ) )
  }
  const restTxs: Transform<S, RestCommand[]>[] = restCommands.length > 0 ? [ [ rests, old => [ ...old, ...restCommands ] ] ] : []
  const traceTxs: Transform<S, any[]>[] = restTxs.length > 0 ? [ [ traceL, old => [ ...old, { refs: refNames, cmds: restCommands } ] ] ] : []
  return [ ...restTxs, ...traceTxs ]
}

export function addRestCommandsAndTraceFromRefs<S, C extends FocusOnContext<S>, MSGs> ( traceL: Optional<S, any[]>, c: C,s: S, refNames: string[] ): Transform<S, any>[] {
  const { restDetails, tagHolderL, restL, newFetchers } = c
  return refsToTxs ( traceL, tagHolderL, restL, restDetails, newFetchers, refNames, s )
}