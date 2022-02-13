import { Lenses, Optional } from "@focuson/lens";
import { LensState } from "@focuson/state";

export interface HasSimpleMessages {
  messages: SimpleMessage[]
}


type SimpleMessageLevel = 'error' | 'warning' | 'info'
/** A simple default messaging system. Often a project will have something more complex */
export interface SimpleMessage {
  level: SimpleMessageLevel,
  msg: string,
  time: string
}

export function createSimpleMessage ( level: SimpleMessageLevel, msg: string, time: string): SimpleMessage {
  return { level, msg, time }
}

export const simpleMessagesL = <S extends HasSimpleMessages> () => Lenses.identity<S> ().focusOn ( 'messages' );
export function simpleMessagesLFn<S extends HasSimpleMessages, D> (): ( s: LensState<S, S>, domainLens: Optional<S, D> ) => LensState<S, SimpleMessage[]> {
  return ( s, d ) => s.focusOn ( "messages" )
}

export const mutateStateAddingMessagesFromSource = <S, SOURCE, MSG> ( messageL: Optional<S, SimpleMessage[]>, msgs: ( a: SOURCE ) => SimpleMessage[] ) =>
  ( s: S, api: SOURCE ): S => {
    let simpleMessages = msgs ( api );
    return simpleMessages.length == 0 ? s : messageL.transform ( existing => [ ...existing, ...simpleMessages ] ) ( s )
  };
