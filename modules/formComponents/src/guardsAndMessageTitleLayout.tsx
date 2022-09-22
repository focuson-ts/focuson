import { NameAnd } from "@focuson/utils";
import { ModalContext, replaceTextUsingPath } from "@focuson/pages";
import { LensProps } from "@focuson/state";

export type GuardAndMessage = [ string[], string ]
export interface GuardsAndMessageTitleLayoutProps<S, C> extends LensProps<S, any, C> {
  children: JSX.Element | JSX.Element[]
  messages: GuardAndMessage[]
}
export function GuardsAndMessageTitleLayout<S extends any, C extends ModalContext<S>> ( { children, state, messages }: GuardsAndMessageTitleLayoutProps<S, C> ) {
  const validMessages = messages.filter ( ( [ guard, message ] ) => guard.length === 0 )
    .map ( ( [ guard, message ], i ) => <p key={i} dangerouslySetInnerHTML={{ __html: replaceTextUsingPath ( state, message ) }}/> )
  return validMessages.length > 0 ? <div className='guardandmessages'>{validMessages}{children}</div> : <>children</>; // what about unique keys?
}