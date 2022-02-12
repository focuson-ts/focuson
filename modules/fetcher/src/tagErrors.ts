import { Optional } from "@focuson/lens";
import { Tags } from "./loadSelectedFetcher";
import { SpecificTagFetcherProps } from "./tagFetcher";
import { createSimpleMessage, SimpleMessage } from "@focuson/pages";


/** This is the signature of the function that is executed when an error occurs */
export type OnTagFetchErrorFn<S, T, MSGS> = ( data: TagMutateData<S, T, MSGS> ) => S


export function updateTargetTagsAndMessagesOnError<S, T, MSGS> ( errorMessages: ( data: TagMutateData<S, T, MSGS> ) => MSGS[], targetForValueOnError: T ): OnTagFetchErrorFn<S, T, MSGS> {
  return ( errorData ) => {
    const { s, stf: { messageL }, currentTags, tagAndTargetLens } = errorData
    const msgs: MSGS[] = errorMessages ( errorData );
    return messageL.transform ( existing => [ ...existing, ...msgs ] ) ( tagAndTargetLens.set ( s, [ currentTags, targetForValueOnError ] ) );
  }
}

export function updateTagsAndMessagesOnError<S, T, MSGS> ( errorMessages: ( data: TagMutateData<S, T, MSGS> ) => MSGS[] ): OnTagFetchErrorFn<S, T, MSGS> {
  return ( errorData ) => {
    const { s, stf: { messageL }, currentTags, tagL } = errorData
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

export function defaultErrorMessage<S, T> ( data: TagMutateData<S, T, SimpleMessage> ): SimpleMessage[] {
  return [ createSimpleMessage ( 'error', `Failed to fetch data from [${data.info},${JSON.stringify ( data.init )}] status ${data.status}\nResponse ${JSON.stringify(data.response)}}`, data.stf.dateFn () ) ]
}

/** With this we can process an error or a success. In the event of a success (i.e. status code is 2xxx, then response should be a T */
export interface TagMutateData<S, T, MSGS> {
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
  stf: SpecificTagFetcherProps<S, T, MSGS>;
}