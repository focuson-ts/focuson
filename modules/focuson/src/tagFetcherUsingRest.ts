import { Optional } from '@focuson/lens';

// import { createSimpleMessage, HasPageSelection, HasSimpleMessages, PageSelection, SimpleMessage } from "@focuson/pages";
import { areAllDefined, arraysEqual, FetchFn, NameAnd, RestAction } from "@focuson/utils";
import { TagHolder, tagOps } from "@focuson/template";
import { OneRestDetails, RestCommand, RestCommandAndTxs, RestDetails, restToTransforms } from "@focuson/rest";
import { makeTagLens } from "./tagFetcher";


export interface FetcherUsingRestConfig {
  tagName: string;
  restName: string;// OneRestDetails<S, FD, D, MSGs>; // this holds all the ids .. gosh this might be all the config we need...
}

export type  AllFetcherUsingRestConfig<S, MSGs> = NameAnd<OneRestDetails<S, any, any, MSGs>>

const fetcherToRestCommandsAndWhy = <S, FD, D, MSGs> ( tagHolderL: Optional<S, TagHolder>, f: FetcherUsingRestConfig, restDetails: RestDetails<S, MSGs> ) => ( s: S, pageName: string ): [ RestCommand | undefined, string ] => {
  // @ts-ignore
  const debug = s.debug?.tagFetcherDebug
  const { tagName, restName } = f
  const restCommand: RestCommand = { restAction: 'get', name: restName, comment: 'Fetcher' }
  const theseRestDatails = restDetails[ restName ]
  const { fdLens, dLens } = theseRestDatails
  const tagL = makeTagLens ( tagHolderL, pageName, tagName )
  let targetLens = fdLens.chain ( dLens );
  const currentTags = tagL.getOption ( s );
  let tagAndNames = tagOps.tags ( theseRestDatails, 'get' ) ( s );
  const desiredTags = tagAndNames.map ( ( [ name, tag ] ) => tag )
  if ( !areAllDefined ( desiredTags ) ) return [ undefined, `Undefined tags. ${tagAndNames.map ( ( [ name, tag ] ) => `${name}:${tag}` )}` ]
  let tagsDifferent = !arraysEqual ( desiredTags, currentTags );
  let target = targetLens.getOption ( s );
  if ( target === undefined ) {
    if ( debug ) console.log ( 'tagFetcher.shouldLoad (target undefined, tags all defined)', pageName, tagName, desiredTags )
    return [ restCommand, 'Should Load target undefined, and all tags defined' ]
  }
  return tagsDifferent ? [ restCommand, 'Tags different' ] : [ undefined, 'Tags all the same, and target defined' ];
}




const loadTagFetcher = <S, FD, D, MSGs> ( tagHolderL: Optional<S, TagHolder>,
                                          restDetails: RestDetails<S, MSGs>,
                                          f: FetcherUsingRestConfig, fetchFn: FetchFn,
                                          urlMutatorForRest: ( r: RestAction, url: string ) => string,
                                          pathToLens: ( s: S ) => ( path: string ) => Optional<S, any>,
                                          messageL: Optional<S, MSGs[]>,
                                          stringToMsg: ( msg: string ) => MSGs, ) => ( s: S, pageName: string ): Promise<RestCommandAndTxs<S>[]> => {
  return restToTransforms<S, MSGs> ( fetchFn, restDetails, urlMutatorForRest, pathToLens, messageL, stringToMsg, s, [ { restAction: 'get', name: f.restName, comment: 'Created by fetcher' } ] )
}
