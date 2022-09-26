import { Iso, Lens, Lenses, NameAndLens, Optional } from '@focuson/lens';

// import { createSimpleMessage, HasPageSelection, HasSimpleMessages, PageSelection, SimpleMessage } from "@focuson/pages";
import { areAllDefined, arraysEqual, DateFn, HasSimpleMessages, or, SimpleMessage } from "@focuson/utils";

import { defaultErrorMessage, Fetcher, ifEEqualsFetcher, loadInfo, MutateFn, OnTagFetchErrorFn, partialFnUsageError, updateTagsAndMessagesOnError } from "@focuson/fetcher";
import { HasTagHolder, TagHolder, tagOps, Tags, UrlConfig } from "@focuson/template";
import { HasPageSelection, PageSelection } from "@focuson/pages";


/** The things common across the application S is the full state for our application, T is what we are loading, MSGS is how any messages are represented */
export interface CommonTagFetcherProps<S, T, MSGS> {
  /** the name of the main thing being displayed. e.g. statement, accountpersonalisation... */
  mainThingL: Lens<S, PageSelection[]>; //
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
export const commonTagFetchProps = <S extends HasSimpleMessages & HasTagHolder & HasPageSelection, T> ( messagesFromTarget?: ( t: T, date: string ) => SimpleMessage[], dateFn?: () => string ) => ( onError?: OnTagFetchErrorFn<S, any, T, SimpleMessage> ): CommonTagFetcherProps<S, T, SimpleMessage> => {
  const identityL: Iso<S, S> = Lenses.identity<S> ( 'state' ); //we need the any because of a typescript compiler bug
  const messageL: Optional<S, SimpleMessage[]> = identityL.focusQuery ( 'messages' );
  let mainThingL: Lens<S, PageSelection[]> = identityL.focusOn ( 'pageSelection' )
  let tagHolderL = identityL.focusQuery ( 'tags' );
  return {
    messageL, mainThingL, tagHolderL,
    onError: onError ? onError : updateTagsAndMessagesOnError ( data => defaultErrorMessage ( data ) ),
    messagesFromTarget: messagesFromTarget ? messagesFromTarget : () => [],
    dateFn: dateFn ? dateFn : () => new Date ().toISOString ()
  };
};

export const makeTagLens = <S> ( tagHolderL: Optional<S, TagHolder>, pageName: string, tagName?: string ): Optional<S, Tags> =>
  tagHolderL.focusQuery ( tagName ? (pageName + "_" + tagName) : pageName );


// export function configureTagFetcher<S, T, MSGS> ( stf: SpecificTagFetcherProps<S, T, MSGS> ) {
//   const { mainThingL, description, pageName } = stf
//   return condFetcher<S> ( ( s ) => mainThingL.get ( s ) === pageName.toString (), tagFetcher ( stf ), description );
// }

/** The information to get a 'T' from the backend. S is the full state for our application, T is what we are loading, MSGS is how any messages are represented  */
export interface SpecificTagFetcherProps<S, FD, D, MSGS> extends CommonTagFetcherProps<S, D, MSGS>, UrlConfig<S, FD, D> {
  /** The name of the page (either modal or normal) that must be selected for this fetcher to load */
  pageName: string,

  /** Occasionally pages need multiple fetchers. In which case we keep track of the tags separately. This tagname is appended to the page name in such a case */
  tagName?: string,

//From UrlConfig
  /** A set of lens from S to things that can be part of the url */
  cd: NameAndLens<S>;
  /** A set of lens from Full to things that can be part of the url. Will often be empty, but if for example you are paging, then the page values will be in the Full domain */
  fdd: NameAndLens<FD>;
  fdLens: Optional<S, FD>
  /** Where we put the T */
  dLens: Optional<FD, D>,
  resourceId: string [];
  ids: string []
  /** A default description is created if this isn't provided */
  url: string;
  description: string
}


export function pageAndTagFetcher<S, Full, T, MSGS> (
  ctf: CommonTagFetcherProps<S, T, MSGS>,
  mockJwt: boolean,
  pageName: string,
  tagName: string | undefined,
  fdLens: Optional<S, Full>,
  cd: NameAndLens<S>, fdd: NameAndLens<Full>,
  ids: string[],
  resourceId: string[],
  dLens: Optional<Full, T>,
  url: string,
  description?: string
): Fetcher<S, T> {
  // @ts-ignore ... I don't know how to get the type system to accept this.  I want to say that 'Full' is S[pagename] but doing that makes the usage of this code not as nice.
  // The problem now is that S[pageName] might not be Full
  const urlConfig: UrlConfig<S, Full, T> = { cd, fdd, ids: ids.map ( s => s.toString () ), resourceId: resourceId.map ( s => s.toString () ), dLens, fdLens }

  const stf: SpecificTagFetcherProps<S, Full, T, MSGS> = { ...ctf, ...urlConfig, url, tagName, pageName, description: description ? description : `pageAndTagFetcher(${pageName},${tagName}})` };
  function selected ( s: S, pageName: any ) {
    let pageSelections = ctf.mainThingL.get ( s );
    let found = pageSelections.find ( p => p.pageName === pageName );
    let result = found !== undefined;
    return result
  }
  return ifEEqualsFetcher<S> ( ( s ) =>
    selected ( s, pageName ), `Page ${pageName} not selected`, tagFetcher ( stf, mockJwt ), description );
}

export function simpleTagFetcher<S extends HasSimpleMessages, FD> (
  ctf: CommonTagFetcherProps<S, FD, SimpleMessage>,
  mockJwt: boolean,
  pageName: string,
  fdLens: Optional<S, FD>,
  cd: NameAndLens<S>, fdd: NameAndLens<FD>,
  ids: string[],
  resourceId: string[],
  url: string,
  description?: string ) {
  return pageAndTagFetcher<S, FD, FD, SimpleMessage> ( ctf,
    mockJwt,
    pageName,
    undefined,
    fdLens,
    cd, fdd, ids, resourceId,
    Lenses.identity (),
    url,
    description )
}

export interface TagFetcherDebug {
  tagFetcherDebug?: boolean
}

export function tagFetcher<S, Full, T, MSGS> ( stf: SpecificTagFetcherProps<S, Full, T, MSGS>, mockJwt: boolean ): Fetcher<S, T> {
  const identity = Lenses.identity<S> ()
  const { tagHolderL, fdLens, dLens, messageL, messagesFromTarget, onError } = stf
  const tagL = makeTagLens ( tagHolderL, stf.pageName, stf.tagName )
  let targetLens = fdLens.chain ( dLens );
  const result: Fetcher<S, T> = {
    shouldLoad ( s: S ): string[] {
      // @ts-ignore
      const debug = s.debug?.tagFetcherDebug
      const currentTags = tagL.getOption ( s );
      let tagAndNames = tagOps.tags ( stf, true, 'get' ) ( s ); //it's false because we want all the tags.
      const desiredTags = tagAndNames.map ( ( [ name, tag ] ) => tag )
      if ( !areAllDefined ( desiredTags ) ) return [ `Undefined tags. ${tagAndNames.map ( ( [ name, tag ] ) => `${name}:${tag}` )}` ]
      let tagsDifferent = !arraysEqual ( desiredTags, currentTags );
      let target = targetLens.getOption ( s );
      if ( target === undefined ) {
        if ( debug ) console.log ( 'tagFetcher.shouldLoad (target undefined, tags all defined)', this.description, desiredTags )
        return []
      }
      if ( !tagsDifferent ) return [ 'Tags all the same, and target defined' ]
      if ( debug ) console.log ( 'tagFetcher.shouldLoad', this.description, desiredTags )
      return [];
    },
    load ( s: S ) {
      // @ts-ignore
      const debug = s.debug?.tagFetcherDebug
      const tagAndNames = tagOps.tags ( stf, true, 'get' ) ( s );
      const desiredTags = tagAndNames.map ( ( [ name, tag ] ) => tag )
      if ( !areAllDefined ( desiredTags ) ) throw partialFnUsageError ( result, s );
      const req = tagOps.reqFor ( stf, mockJwt, 'get' ) ( s ) ( stf.url );
      if ( !req ) throw partialFnUsageError ( result, s );
      const [ info, init ] = req;
      const mutateForHolder: MutateFn<S, T> = ( state ) => ( status, response ) => {
        if ( debug ) console.log ( 'tagFetcher.load.mutate', status, response )
        if ( !state ) throw partialFnUsageError ( result, s );
        const tagAndTargetLens: Optional<S, [ Tags, T ]> = tagL.combine ( targetLens );
        if ( status < 300 ) {
          if ( debug ) console.log ( 'tagFetcher.load.mutate', tagAndTargetLens.description, status, response )
          let resultWithoutMessages: S | undefined = tagAndTargetLens.setOption ( state, [ desiredTags, response ] );
          if ( !resultWithoutMessages ) { console.error ( `Unexpected problem seting response and tags in state. ${this.description}` )}
          let messages = messagesFromTarget ( response, stf.dateFn () );
          let result = resultWithoutMessages ? messageL.transform ( old => [ ...old, ...messages ] ) ( resultWithoutMessages ) : undefined;
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
          return onError ( { s, info, init, status, req, response, tagL, tagAndTargetLens, originalTags, currentTags: desiredTags, messageL: stf.messageL, dateFn: stf.dateFn } )
        }
      };
      if ( debug ) console.log ( 'tagFetcher.load', info, init )
      return loadInfo ( info, init, mutateForHolder );
    },
    description: or ( () => `tagFetcher(${tagL.description},${dLens.description})` ) ( stf.description )
  };
  return result;
}
