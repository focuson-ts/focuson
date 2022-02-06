import { Iso, Lens, Lenses, Optional } from '@focuson/lens';

import { HasPageSelection, HasSimpleMessages, createSimpleMessage, SimpleMessage } from "@focuson/pages";
import { areAllDefined, arraysEqual, or } from "@focuson/utils";
import { Tags } from "./loadSelectedFetcher";
import { Fetcher, ifEEqualsFetcher, loadInfo, MutateFn, ReqFn } from "./fetchers";
import { partialFnUsageError } from "./errorhandling";


export interface HasTagHolder {
  tags: TagHolder
}
/** The tags are the 'bits of data' that tell us if we need to load something'
 * For example a statement needs a customer id. If the customer id changes then we need to fetch the statement data again
 */
export interface TagHolder {
  [ name: string ]: Tags;
}

export type OnTagFetchErrorFn<S, T> = (
  s: S,
  status: number,
  req: any,
  response: any,
  tagAndTargetLens: Optional<S, [ Tags, T ]>,
  originalTags: Tags | undefined,
  currentTags: Tags
) => S;


export function updateTargetTagsAndMessagesOnError<S, T> ( targetForValueOnError: T ) {
  return ( errorMessageL: Optional<S, SimpleMessage[]> ): OnTagFetchErrorFn<S, T> =>
    ( s,
      status,
      req,
      response,
      tagAndTargetLens,
      originalTags,
      currentTags ) => {
      let message = createSimpleMessage ( 'error', `Req: ${JSON.stringify ( req )}, Resp: ${JSON.stringify ( response )}, ${status}, ${originalTags}, ${currentTags}` );
      let withErrors = errorMessageL.transform ( ( existing: SimpleMessage[] ) => [ ...existing, message ] ) ( s );
      return tagAndTargetLens.set ( withErrors, [ currentTags, targetForValueOnError ] );
    };

}

export function defaultOnTagFetchError<S, T> (errorMessageL: Optional<S, SimpleMessage[]> ):OnTagFetchErrorFn<S, T> {
  return  ( s: S, status: number, req: any, response: any, tagAndTargetLens: Optional<S, [ Tags, T ]>, originalTags: Tags | undefined, currentTags: Tags ) => errorMessageL.transform (
    existing => [ ...existing, createSimpleMessage ( 'error', `Req: ${JSON.stringify ( req )}, Resp: ${JSON.stringify ( response )}, ${status}, origTags=${originalTags}, currTags=${currentTags}` ) ] ) ( s );
}

/**S is the full state for our application.
 *
 * Details is things like {statement: Statement, accountPersonalisation: AccountPersonalisation} the data we load from the back end goes here
 */
export interface CommonTagFetcher<S, T> {
  identityL: Iso<S, S>; //An identity lens. Just avoid remaking it
  mainThingL: Lens<S, string>; //the name of the main thing being displayed. e.g. statement, accountpersonalisation...
  tagHolderL: Optional<S, TagHolder>; //focuses on the tags that record 'the current state' i.e. the ones that were last loaded
  onTagFetchError: OnTagFetchErrorFn<S, T>; //What to do if there is a problem while fetching
}

/**S is the state. Details are where we put the resulting data that we fetch (typically a unique place per item fetched), T is the type this fetcher will fetch */
export interface SpecificTagFetcher<S, T> extends CommonTagFetcher<S, T> {
  tagFetcher ( sf: SpecificTagFetcher<S, T> ): Fetcher<S, T>;
  targetLens: Optional<S, T>; //where we put the T
  actualTags: ( s: S ) => Tags; // the tags that say 'if any of these change we need to reload'
  reqFn: ReqFn<S>; // The url and other things needed to load the data
  tagLens: Optional<S, Tags>; //A lens to where we store the tags. Will typically be under the targetHolderL of the CommonTagFetcher
  description?: string;
}

export function commonFetch<S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( onTagFetchError?: ( errorMessageL: Optional<S, SimpleMessage[]> ) => OnTagFetchErrorFn<S, T> ): CommonTagFetcher<S, T> {
  const identityL: Iso<S, S> = Lenses.identity<S> ( 'state' ); //we need the any because of a typescript compiler bug
  let errorMessageL: Optional<S, SimpleMessage[]> = identityL.focusOn ( 'messages' );
  const realOnTagFetchError: ( errorMessageL: Optional<S, SimpleMessage[]> ) => OnTagFetchErrorFn<S, T> = onTagFetchError ? onTagFetchError : errorMessageL =>defaultOnTagFetchError(errorMessageL)
  return {
    identityL,
    mainThingL: identityL.focusOn ( 'pageSelection' ).focusOn ( 'pageName' ),
    tagHolderL: identityL.focusQuery ( 'tags' ),
    onTagFetchError: realOnTagFetchError ( errorMessageL )
  };
}

export function simpleTagFetcher<S, T> (
  ctf: CommonTagFetcher<S, T>,
  pageName: keyof S,
  actualTags: ( s: S ) => Tags,
  reqFn: ReqFn<S>,
  description?: string
) {
  // @ts-ignore we tried making this type safe, and the complexties were enormous... lots and lots of generics and horrible error messages
  let targetLens: Optional<S, T> = ctf.identityL.focusQuery ( pageName );
  const stf = specify<S, T> ( ctf, pageName.toString (), actualTags, reqFn, targetLens );
  return ifEEqualsFetcher<S> ( ( s ) => ctf.mainThingL.get ( s ) === pageName.toString (), tagFetcher ( stf ), description );
}

export function stateAndFromApiTagFetcher<S, T> (
  ctf: CommonTagFetcher<S, T>,
  pageName: keyof S,
  tagName: string,
  targetL: ( s: Optional<S, S> ) => Optional<S, T>,
  actualTags: ( s: S ) => Tags,
  reqFn: ReqFn<S>,
  description?: string
) {
  const stf = specify<S, T> ( ctf, `${pageName}_${tagName}`, actualTags, reqFn, targetL ( ctf.identityL ) );
  return ifEEqualsFetcher<S> ( ( s ) => ctf.mainThingL.get ( s ) === pageName.toString (), tagFetcher ( stf ), description );
}

function specify<S, T> (
  ctf: CommonTagFetcher<S, T>,
  tagName: string,
  actualTags: ( s: S ) => Tags,
  reqFn: ReqFn<S>,
  targetLens: Optional<S, T>,
  description?: string
): SpecificTagFetcher<S, T> {
  return {
    ...ctf,
    tagFetcher,
    targetLens,
    actualTags,
    reqFn,
    // @ts-ignore  We need this ignore here to avoid the effort of setting up Tag properly. This reduces the work of every page, so I think it's worth it
    tagLens: ctf.tagHolderL.focusQuery ( tagName ),
    description: description ? description : tagName.toString ()
  };
}

export function tagFetcher<S, T> ( sf: SpecificTagFetcher<S, T> ): Fetcher<S, T> {
  const result: Fetcher<S, T> = {
    shouldLoad ( s: S ) {
      const currentTags = sf.tagLens.getOption ( s );
      let desiredTags = sf.actualTags ( s );
      let target = sf.targetLens.getOption ( s );
      let tagsDifferent = !arraysEqual ( desiredTags, currentTags );
      let result = areAllDefined ( desiredTags ) && (tagsDifferent || target === undefined);
      return result;
    },
    load ( s: S ) {
      const currentTags = sf.actualTags ( s );

      if ( !areAllDefined ( currentTags ) ) throw partialFnUsageError ( result );
      const req = sf.reqFn ( s );

      if ( !req ) throw partialFnUsageError ( result );
      const [ url, info ] = req;
      const mutateForHolder: MutateFn<S, T> = ( state ) => ( status, json ) => {
        if ( !state ) throw partialFnUsageError ( result );
        const tagAndTargetLens: Optional<S, [ Tags | undefined, T ]> = sf.tagLens.combine ( sf.targetLens );
        if ( status < 300 ) {return tagAndTargetLens.set ( state, [ currentTags, json ] )} else {
          let originalTags = sf.tagLens.getOption ( s );
          return sf.onTagFetchError ( sf.tagLens.set ( s, currentTags ), status, req, json, tagAndTargetLens, originalTags, currentTags );
        }
      };
      return loadInfo ( url, info, mutateForHolder );
    },
    description: or ( () => `tagFetcher(${sf.tagLens.description},${sf.targetLens.description})` ) ( sf.description )
  };
  return result;
}
