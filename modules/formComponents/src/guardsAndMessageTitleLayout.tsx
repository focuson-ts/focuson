import { ModalContext, replaceTextUsingPath } from "@focuson/pages";
import { LensProps } from "@focuson/state";

export type GuardAndMessage = [ string[], string ]
export interface GuardsAndMessageTitleLayoutProps<S, C> extends LensProps<S, any, C> {
  children: JSX.Element | JSX.Element[]
  messages: GuardAndMessage[]
  messageClassName? : string
  defaultMessage?: string
}
export function GuardsAndMessageTitleLayout<S extends any, C extends ModalContext<S>> ( { children, state, messages,defaultMessage,messageClassName }: GuardsAndMessageTitleLayoutProps<S, C> ) {
  const validMessages = messages.filter ( ( [ guard, message ] ) => guard.length === 0 )
    .map ( ( [ guard, message ], i ) =>
      <p className={messageClassName} key={i} dangerouslySetInnerHTML={{ __html: replaceTextUsingPath ( state, message ) }}/> )
  return validMessages.length > 0 ? <div className='guardandmessages'>{validMessages}{children}</div> : <>{defaultMessage}</>; // what about unique keys?
}