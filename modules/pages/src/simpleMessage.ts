import { Lenses, Optional } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { createSimpleMessage, DateFn, HasSimpleMessages, SimpleMessage, stringToSimpleMsg, testDateFn, toArray } from "@focuson/utils";
import { SimpleMessageLevel } from "@focuson/utils/src/messages";

export interface HasSimpleMessageL<S> {
  simpleMessagesL: Optional<S, SimpleMessage[]>
}
export const simpleMessagesL = <S extends HasSimpleMessages> () => Lenses.identity<S> ().focusQuery ( 'messages' );
export function simpleMessagesLFn<S extends HasSimpleMessages, D, Context> (): ( s: LensState<S, S, Context>, domainLens: Optional<S, D> ) => LensState<S, SimpleMessage[], Context> {
  return ( s, d ) => s.focusOn ( "messages" )
}

export const mutateStateAddingMessagesFromSource = <S, SOURCE, MSG> ( messageL: Optional<S, MSG[]>, stringToErrorMsg: ( s: string ) => MSG ) => ( msgs: ( a: SOURCE ) => MSG[] ) =>
  ( s: S, api: SOURCE ): S => {
    let simpleMessages = msgs ( api );
    return simpleMessages.length === 0 ? s : messageL.transform ( existing => [ ...existing, ...simpleMessages ] ) ( s )
  };


export const extractMessages = ( dataFn: DateFn ) => ( status: number | undefined, body: any ) => {
  function fromHeaderOrMessages ( m: any ) {
    if ( m === undefined ) return []
    const fromOne = ( level: SimpleMessageLevel ) => toArray ( m?.[ level ] ).map ( stringToSimpleMsg ( dataFn, level ) );
    return [ ...fromOne ( 'info' ), ...fromOne ( 'error' ), ...fromOne ( 'warning' ) ]
  }
  if ( status === undefined ) return [ createSimpleMessage ( 'error', `Cannot connect.`, testDateFn () ) ]
  let messages = [ ...fromHeaderOrMessages ( body?.messages ), ...fromHeaderOrMessages ( body?.headerMessages ) ];
  if ( status < 400 || status == 404 || messages.length > 0 ) return messages
  return [ stringToSimpleMsg ( dataFn, 'error' ) ( `${status} returned and no messages` ) ];
};

