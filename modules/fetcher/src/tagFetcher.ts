import { Iso, Lens, Lenses, Optional } from '@focuson/lens';

import { createSimpleMessage, HasPageSelection, HasSimpleMessages, SimpleMessage } from "@focuson/pages";
import { areAllDefined, arraysEqual, DateFn, or } from "@focuson/utils";
import { Tags } from "./loadSelectedFetcher";
import { Fetcher, ifEEqualsFetcher, loadInfo, MutateFn, ReqFn } from "./fetchers";
import { partialFnUsageError } from "./errorhandling";
import { defaultErrorMessage, OnTagFetchErrorFn, updateTagsAndMessagesOnError } from "./tagErrors";


export interface HasTagHolder {
  tags: TagHolder
}
/** The tags are the 'bits of data' that tell us if we need to load something'
 * For example a statement needs a customer id. If the customer id changes then we need to fetch the statement data again
 */
export interface TagHolder {
  [ name: string ]: Tags;
}

/** The things common across the application S is the full state for our application, T is what we are loading, MSGS is how any messages are represented */
export interface CommonTagFetcherProps<S, T, MSGS> {
  /** the name of the main thing being displayed. e.g. statement, accountpersonalisation... */
  mainThingL: Lens<S, string>; //
  /** Focuses on the messages */
  messageL: Optional<S, MSGS[]>,
  /** focuses on the tags that record 'the current state' i.e. the ones that were last loaded */
  tagHolderL: Optional<S, TagHolder>;
  /** The error handler */
  onError: OnTagFetchErrorFn<S, any, T, MSGS>
  /** there can be messages in the information fetched. This tells us how to get them. */
  messagesFromTarget: ( t: T, date: string ) => MSGS[],
  /** Time/Dates must be consistent in tests, so we use this instead of the singleton clock */
  dateFn: DateFn


}

/** Main States use 'HasSimpleMessages', 'HasTagHolder' and 'HasPageSelection'. This just provides a helper method to get the CommonTagFetcherProps for them
 * This also handles
 *
 * It is idiomatically normal in the case where the 'T's have a common message structure to curry in the messagesFromTarget and onError creating a project wide commontTagFetcherProps
 * */
export const commonTagFetchProps = <S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( messagesFromTarget?: ( t: T, date: string ) => SimpleMessage[], dateFn?: () => string ) => ( onError?: OnTagFetchErrorFn<S, any,T, SimpleMessage> ): CommonTagFetcherProps<S, T, SimpleMessage> => {
  const identityL: Iso<S, S> = Lenses.identity<S> ( 'state' ); //we need the any because of a typescript compiler bug
  const messageL: Optional<S, SimpleMessage[]> = identityL.focusQuery ( 'messages' );
  let mainThingL: Lens<S, string> = identityL.focusOn ( 'pageSelection' ).focusOn ( 'pageName' );
  let tagHolderL = identityL.focusQuery ( 'tags' );
  return {
    messageL, mainThingL, tagHolderL,
    onError: onError ? onError : updateTagsAndMessagesOnError ( data => defaultErrorMessage ( data ) ),
    messagesFromTarget: messagesFromTarget ? messagesFromTarget : () => [],
    dateFn: dateFn ? dateFn : () => new Date ().toISOString ()
  };
};

export const makeTagLens = <S> ( tagHolderL: Optional<S, TagHolder>, pageName: keyof S, tagName?: string ): Optional<S, Tags> =>
  tagHolderL.focusQuery ( tagName ? (pageName + "_" + tagName) : pageName.toString () );


// export function configureTagFetcher<S, T, MSGS> ( stf: SpecificTagFetcherProps<S, T, MSGS> ) {
//   const { mainThingL, description, pageName } = stf
//   return condFetcher<S> ( ( s ) => mainThingL.get ( s ) === pageName.toString (), tagFetcher ( stf ), description );
// }

/** The information to get a 'T' from the backend. S is the full state for our application, T is what we are loading, MSGS is how any messages are represented  */
export interface SpecificTagFetcherProps<S, Full, T, MSGS> extends CommonTagFetcherProps<S,  T, MSGS> {
  /** The name of the page (either modal or normal) that must be selected for this fetcher to load */
  pageName: keyof S,
  /** Occasionally pages need multiple fetchers. In which case we keep track of the tags separately. This tagname is appended to the page name in such a case */
  tagName?: string,
  /** If these tags change the fetcher triggers. Be aware that all the tags must be defined for the tag to load*/
  actualTags: ( s: S ) => Tags; // the tags that say 'if any of these change we need to reload'
  /** The data that is loaded */
  reqFn: ReqFn<S>; // The url and other things needed to load the data
  domainLens: Optional<S, Full>
  /** Where we put the T */
  targetLFn: ( lens: Optional<S, Full> ) => Optional<S, T>,
  /** A default description is created if this isn't provided */
  description: string
}


export function pageAndTagFetcher<S, Full, T, MSGS> (
  ctf: CommonTagFetcherProps<S,  T, MSGS>,
  pageName: keyof S,
  tagName: string | undefined,
  targetLFn: ( lens: Optional<S, Full> ) => Optional<S, T>,
  actualTags: ( s: S ) => Tags,
  reqFn: ReqFn<S>,
  description?: string
): Fetcher<S, T> {
  // @ts-ignore ... I don't know how to get the type system to accept this.  I want to say that 'Full' is S[pagename] but doing that makes the usage of this code not as nice.
  // The problem now is that S[pageName] might not be Full
  const domainLens: Optional<S, Full> = Lenses.identity<S> ().focusQuery ( pageName )
  const stf: SpecificTagFetcherProps<S, Full, T, MSGS> = { ...ctf, domainLens, tagName, targetLFn, pageName, reqFn, actualTags, description: description ? description : `pageAndTagFetcher(${pageName},${tagName}})` };
  return ifEEqualsFetcher<S> ( ( s ) => ctf.mainThingL.get ( s ) === pageName.toString (), tagFetcher ( stf ), description );
}

export function simpleTagFetcher<S extends HasSimpleMessages, K extends keyof S> (
  ctf: CommonTagFetcherProps<S,  Required<S[K]>, SimpleMessage>,
  pageName: K,
  actualTags: ( s: S ) => Tags,
  reqFn: ReqFn<S>,
  description?: string ) {
  return pageAndTagFetcher<S, Required<S[K]>, Required<S[K]>, SimpleMessage> ( ctf, pageName, undefined, l => l, actualTags, reqFn, description )
}

export interface TagFetcherDebug {
  tagFetcherDebug?: boolean
}

export function tagFetcher<S, Full, T, MSGS> ( stf: SpecificTagFetcherProps<S, Full, T, MSGS> ): Fetcher<S, T> {
  const identity = Lenses.identity<S> ()
  const { tagHolderL, actualTags, domainLens, targetLFn, reqFn, messageL, messagesFromTarget, onError } = stf
  const tagL = makeTagLens ( tagHolderL, stf.pageName, stf.tagName )
  const targetLn = targetLFn ( domainLens );
  const result: Fetcher<S, T> = {
    shouldLoad ( s: S ) {
      const currentTags = tagL.getOption ( s );
      let desiredTags = actualTags ( s );
      let target = targetLn.getOption ( s );
      let tagsDifferent = !arraysEqual ( desiredTags, currentTags );
      let result = areAllDefined ( desiredTags ) && (tagsDifferent || target === undefined);
      // @ts-ignore
      if ( s.debug?.tagFetcherDebug ) console.log ( 'tagFetcher.shouldLoad', this.description, `currentTags`, currentTags, `desiredTags`, desiredTags, `tagsDifferent`, tagsDifferent, `result`, result )
      return result;
    },
    load ( s: S ) {
      // @ts-ignore
      const debug = s.debug?.tagFetcherDebug
      const currentTags = actualTags ( s );
      if ( !areAllDefined ( currentTags ) ) throw partialFnUsageError ( result, s );
      const req = reqFn ( s );
      if ( !req ) throw partialFnUsageError ( result, s );
      const [ info, init ] = req;
      const mutateForHolder: MutateFn<S, T> = ( state ) => ( status, response ) => {
        if ( debug ) console.log ( 'tagFetcher.load.mutate', status, response )
        if ( !state ) throw partialFnUsageError ( result, s );
        const tagAndTargetLens: Optional<S, [ Tags, T ]> = tagL.combine ( targetLn );
        if ( status < 300 ) {
          if ( debug ) console.log ( 'tagFetcher.load.mutate', status, response )
          let resultWithoutMessages: S | undefined = tagAndTargetLens.setOption ( state, [ currentTags, response ] );
          if ( !resultWithoutMessages ) { console.error ( `Unexpected problem seting response and tags in state. ${this.description}` )}
          let messages = messagesFromTarget ( response, stf.dateFn () );
          if ( debug ) console.log ( 'tagFetcher.load.mutate.messages', messages )
          let result = resultWithoutMessages ? messageL.setOption ( resultWithoutMessages, messages ) : undefined;
          if ( !result ) {
            console.error ( 'tagFetcher.load.mutate - failed to set state' )
            console.log ( `tagAndTargetLens`, tagAndTargetLens.description, `messageL`, messageL.description )
            console.log ( `initialState`, state )
            console.log ( 'resultWithoutMessages', resultWithoutMessages )
            return state
          }
          return result
        } else {
          if ( debug ) console.log ( 'tagFetcher.load.mutate - onError is being called', status, response )
          let originalTags = tagL.getOption ( s );
          return onError ( { s, info, init, status, req, response, tagL, tagAndTargetLens, originalTags, currentTags, stf } )
        }
      };
      if ( debug ) console.log ( 'tagFetcher.load', info, init )
      return loadInfo ( info, init, mutateForHolder );
    },
    description: or ( () => `tagFetcher(${tagL.description},${targetLn.description})` ) ( stf.description )
  };
  return result;
}
