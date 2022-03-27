import { Lenses, Optional } from "@focuson/lens";
import { LensState } from "@focuson/state";
import { HasSimpleMessages, SimpleMessage } from "@focuson/utils";

export interface HasSimpleMessageL<S> {
  simpleMessagesL: Optional<S, SimpleMessage[]>
}
export const simpleMessagesL = <S extends HasSimpleMessages, Context> () => Lenses.identity<S> ().focusQuery ( 'messages' );
export function simpleMessagesLFn<S extends HasSimpleMessages, D, Context> (): ( s: LensState<S, S, Context>, domainLens: Optional<S, D> ) => LensState<S, SimpleMessage[], Context> {
  return ( s, d ) => s.focusOn ( "messages" )
}

export const mutateStateAddingMessagesFromSource = <S, SOURCE, MSG> ( messageL: Optional<S, SimpleMessage[]>, msgs: ( a: SOURCE ) => SimpleMessage[] ) =>
  ( s: S, api: SOURCE ): S => {
    let simpleMessages = msgs ( api );
    return simpleMessages.length === 0 ? s : messageL.transform ( existing => [ ...existing, ...simpleMessages ] ) ( s )
  };
