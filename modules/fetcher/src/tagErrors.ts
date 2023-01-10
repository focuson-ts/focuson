import { Lens, Optional } from "@focuson-nw/lens";

import { createSimpleMessage, DateFn, SimpleMessage } from "@focuson-nw/utils";
import { Tags } from "@focuson-nw/template";



/** This is the signature of the function that is executed when an error occurs */
export type OnTagFetchErrorFn<S, Full, T, MSGS> = ( data: TagMutateData<S, Full, T, MSGS> ) => S


export function updateTargetTagsAndMessagesOnError<S, Full, T, MSGS> ( errorMessages: ( data: TagMutateData<S, Full, T, MSGS> ) => MSGS[], targetForValueOnError: T ): OnTagFetchErrorFn<S, Full, T, MSGS> {
  return ( errorData ) => {
    const { s, messageL , currentTags, tagAndTargetLens } = errorData
    const msgs: MSGS[] = errorMessages ( errorData );
    return messageL.transform ( existing => [ ...existing, ...msgs ] ) ( tagAndTargetLens.set ( s, [ currentTags, targetForValueOnError ] ) );
  }
}

export function updateTagsAndMessagesOnError<S, Full, T, MSGS> ( errorMessages: ( data: TagMutateData<S, Full, T, MSGS> ) => MSGS[] ): OnTagFetchErrorFn<S, Full, T, MSGS> {
  return ( errorData ) => {
    const { s,  messageL , currentTags, tagL } = errorData
    const msgs: MSGS[] = errorMessages ( errorData );
    let result = messageL.transform ( existing => [ ...existing, ...msgs ] ) ( tagL.set ( s, currentTags ) );
    // @ts-ignore
    // if ( s.debug?.fetcherDebug ) {
    console.log ( 'updateTagsAndMessagesOnError - state', s )
    console.log ( 'updateTagsAndMessagesOnError - msgs', msgs )
    console.log ( 'updateTagsAndMessagesOnError - currentTags', currentTags )
    console.log ( 'updateTagsAndMessagesOnError - messageL', messageL )
    console.log ( 'updateTagsAndMessagesOnError - result', result )
    // }
    return result;
  }
}

export function defaultErrorMessage<S, Full, T> ( data: TagMutateData<S, Full, T, SimpleMessage> ): SimpleMessage[] {
  return [ createSimpleMessage ( 'error', `Failed to fetch data from [${data.info},${JSON.stringify ( data.init )}] status ${data.status}\nResponse ${JSON.stringify ( data.response )}}`, data.dateFn () ) ]
}

/** With this we can process an error or a success. In the event of a success (i.e. status code is 2xxx, then response should be a T */
export interface TagMutateData<S, Full, T, MSGS> {
  s: S;
  info: RequestInfo,
  init: RequestInit | undefined,
  status: number;
  req: any;
  response: any;
  tagL: Optional<S, Tags>;
  tagAndTargetLens: Optional<S, [ Tags, T ]>;
  originalTags: Tags | undefined;
  currentTags: Tags;
  messageL: Optional<S, MSGS[]>;
  dateFn: DateFn
  // stf: SpecificTagFetcherProps<S, Full, T, MSGS>;
}