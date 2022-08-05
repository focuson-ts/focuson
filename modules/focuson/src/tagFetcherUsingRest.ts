import { Optional } from '@focuson/lens';

// import { createSimpleMessage, HasPageSelection, HasSimpleMessages, PageSelection, SimpleMessage } from "@focuson/pages";
import { areAllDefined, arraysEqual, NameAnd } from "@focuson/utils";
import { TagHolder, tagOps } from "@focuson/template";
import { OneRestDetails, RestChangeCommands, RestCommand, RestDetails } from "@focuson/rest";
import { makeTagLens } from "./tagFetcher";


export interface FetcherUsingRestConfig {
  tagName: string;
  restName: string;// OneRestDetails<S, FD, D, MSGs>; // this holds all the ids .. gosh this might be all the config we need...
  postFetchCommands: RestChangeCommands[]
}

export type  AllFetcherUsingRestConfig = NameAnd<FetcherUsingRestConfig[]>

export const findRestCommands = <S> ( tagHolderL: Optional<S, TagHolder> ) => <FD, D, MSGs> ( oneRestDetails: OneRestDetails<S, FD, D, MSGs>, pageName: string, f: FetcherUsingRestConfig, s: S ): [ RestCommand | undefined, string, string ] => {
  // @ts-ignore
  const debug = s.debug?.tagFetcherDebug
  const { fdLens, dLens } = oneRestDetails
  const { tagName, restName } = f
  const tagL = makeTagLens ( tagHolderL, pageName, tagName )
  let targetLens = fdLens.chain ( dLens );
  const currentTags = tagL.getOption ( s );
  let tagAndNames = tagOps.tags ( oneRestDetails, 'get' ) ( s );
  const desiredTags = tagAndNames.map ( ( [ name, tag ] ) => tag )
  const restCommand: RestCommand = { restAction: 'get', name: restName, comment: 'Fetcher', tagNameAndTags: { tagName: `${pageName}_${tagName}`, tags: desiredTags }, changeOnSuccess: f.postFetchCommands }
  if ( !areAllDefined ( desiredTags ) ) return [ undefined, tagName, `Undefined tags. ${tagAndNames.map ( ( [ name, tag ] ) => `${name}:${tag}` )}` ]
  let tagsDifferent = !arraysEqual ( desiredTags, currentTags );
  let target = targetLens.getOption ( s );
  if ( target === undefined ) {
    if ( debug ) console.log ( 'tagFetcher.shouldLoad (target undefined, tags all defined)', pageName, tagName, desiredTags, restCommand )
    return [ restCommand, tagName, 'Should Load target undefined, and all tags defined' ]
  }
  if ( tagsDifferent ) {
    if ( debug ) console.log ( 'tagFetcher.shouldLoad (target defined but tags difference)', pageName, tagName, desiredTags, restCommand )
    return [ restCommand, tagName, `Tags different ${JSON.stringify ( currentTags )} !== ${JSON.stringify ( desiredTags )}` ]
  }
  return [ undefined, tagName, 'Tags all the same, and target defined' ];
};
const fetcherToRestCommandsAndWhy = <S, FD, D, MSGs> ( tagHolderL: Optional<S, TagHolder>, f: FetcherUsingRestConfig, restDetails: RestDetails<S, MSGs> ) => ( s: S, pageName: string ): [ RestCommand | undefined, string, string ] => {
  if ( tagHolderL === null ) throw Error ( `tagHolderL is null` )
  if ( f === null ) throw Error ( `f is null` )
  if ( restDetails === null ) throw Error ( `restDetails is null` )
  // @ts-ignore
  const debug = s.debug?.tagFetcherDebug
  const { tagName, restName } = f
  const theseRestDetails = restDetails[ restName ]
  if ( theseRestDetails === undefined )
    throw Error ( `Fetched misconfigured. ${JSON.stringify ( f )}. Legal restNames are ${Object.keys ( restDetails )}` )
  return findRestCommands ( tagHolderL ) ( theseRestDetails, pageName, f, s );
}

export function restCommandsAndWhyFromFetchers<S, MSGs> ( tagHolderL: Optional<S, TagHolder>, allF: AllFetcherUsingRestConfig, restDetails: RestDetails<S, MSGs>, pageName: string, s: S ): [ RestCommand | undefined, string, string ][] {
  const fs = allF[ pageName ]
  if ( fs === undefined ) return []
  return fs.map ( f => fetcherToRestCommandsAndWhy ( tagHolderL, f, restDetails ) ( s, pageName ) )
}

export function restCommandsFromFetchers<S, MSGs> ( tagHolderL: Optional<S, TagHolder>, allF: AllFetcherUsingRestConfig, restDetails: RestDetails<S, MSGs>, pageName: string, s: S ): RestCommand[] {
  const rcAndWhy = restCommandsAndWhyFromFetchers ( tagHolderL, allF, restDetails, pageName, s )
  // @ts-ignore
  const debug = s.debug?.tagFetcherDebug
  return rcAndWhy.flatMap ( ( [ rc, tagName, why ] ) => {
    if ( debug ) console.log ( '  restCommandsFromFetchers', tagName, why )
    return rc ? [ rc ] : []
  } )
}


