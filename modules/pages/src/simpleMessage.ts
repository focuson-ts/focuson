import { Lenses, Optional } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { createSimpleMessage, DateFn, HasSimpleMessages, SimpleMessage, SimpleMessageLevel, stringToSimpleMsg, toArray } from "@focuson/utils";

export interface HasSimpleMessageL<S> {
  simpleMessagesL: Optional<S, SimpleMessage[]>
}
export const simpleMessagesL = <S extends HasSimpleMessages> (): Optional<S, SimpleMessage[]> => Lenses.identity<S> ().focusQuery ( 'messages' );
export function simpleMessagesLFn<S extends HasSimpleMessages, D, Context> (): ( s: LensState<S, S, Context>, domainLens: Optional<S, D> ) => LensState<S, SimpleMessage[], Context> {
  return ( s, d ) => s.focusOn ( "messages" )
}

export const removeOldMessages = <S> ( dateFn: DateFn, messageL: Optional<S, SimpleMessage[]>, delayBeforeMessagesRemoved: number | undefined ) => (state: S)=>{
  if ( delayBeforeMessagesRemoved === undefined ) return state
  const firstDateToKeep = new Date ( dateFn () )
  firstDateToKeep.setMilliseconds ( firstDateToKeep.getMilliseconds () - delayBeforeMessagesRemoved )
  function removeIfOld ( s: SimpleMessage ): SimpleMessage[] {
    const messageTime = new Date ( s.time )
    return messageTime >= firstDateToKeep ? [s] : [  ]
  }
  return messageL.transform ( oldM => oldM.flatMap ( removeIfOld ) )(state)
};

export const mutateStateAddingMessagesFromSource = <S, SOURCE, MSG> ( messageL: Optional<S, MSG[]>, stringToErrorMsg: ( s: string ) => MSG ) => ( msgs: ( a: SOURCE ) => MSG[] ) =>
  ( s: S, api: SOURCE ): S => {
    let simpleMessages = msgs ( api );
    return simpleMessages.length === 0 ? s : messageL.transform ( existing => [ ...existing, ...simpleMessages ] ) ( s )
  };

function parseBodyOrError ( body: any ): any {
  try {
    if ( typeof body === 'string' ) return JSON.parse ( body )
    return body
  } catch ( e: any ) {
    return body
  }
}

export var msgsDebug = false
export const extractMessages = ( dateFn: DateFn ) => ( status: number | undefined, body: any ) => {
  function fromHeaderOrMessages ( m: any ) {
    if ( msgsDebug ) console.log ( 'in fromHeaderOrMessages', m )
    if ( m === undefined ) return []
    const fromOne = ( level: SimpleMessageLevel ) => {
      let result = toArray ( m?.[ level ] ).map ( m => stringToSimpleMsg ( dateFn, level )(m, level) );
      if ( msgsDebug ) console.log ( 'from one', level, result, m?.[ level ] )
      return result;
    };
    return [ ...fromOne ( 'info' ), ...fromOne ( 'error' ), ...fromOne ( 'warning' ) ]
  }
  if ( status === undefined ) {
    if ( msgsDebug ) console.log ( 'status undefined' );
    return [ createSimpleMessage ( 'error', `Cannot connect. ${JSON.stringify ( body )}`, dateFn () ) ]
  }
  const realBody = parseBodyOrError ( body )
  if ( typeof realBody === 'string' ) return [ createSimpleMessage ( 'error', `Status ${status}. Body was ${body}`, dateFn () ) ]
  const messages = fromHeaderOrMessages ( realBody?.messages );
  const headersMessages = fromHeaderOrMessages ( realBody?.headerMessages );
  const fullMessages = [ ...messages, ...headersMessages ];
  if ( status < 400 || status == 404 || fullMessages.length > 0 ) return fullMessages
  return [ stringToSimpleMsg ( dateFn, 'error' ) ( `${status} returned and no messages` ) ];
};

