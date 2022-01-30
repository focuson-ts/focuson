import { identityOptics, Optional } from "@focuson/lens";
import { LensState } from "@focuson/state";

export interface HasSimpleMessages {
  messages: SimpleMessages
}
/** A simple default messaging system. Often a project will have something more complex */
export interface SimpleMessages {
  messages?: string[],
  errorMessage?: string[]
}

export function simpleMessagesL<S extends HasSimpleMessages, D> (): ( s: LensState<S, S>, domainLens: Optional<S, D> ) => LensState<S, SimpleMessages> {
  return ( s, d ) => s.focusOn ( "messages" )
}