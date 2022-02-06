import { Optional } from "@focuson/lens";
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

export function createSimpleMessage ( level: SimpleMessageLevel, msg: string ): SimpleMessage {
  return { level, msg, time: new Date ().toISOString () }
}


export function simpleMessagesL<S extends HasSimpleMessages, D> (): ( s: LensState<S, S>, domainLens: Optional<S, D> ) => LensState<S, SimpleMessage[]> {
  return ( s, d ) => s.focusOn ( "messages" )
}
