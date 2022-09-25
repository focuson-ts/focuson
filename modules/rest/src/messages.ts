import { NameAnd, SimpleMessage } from "@focuson/utils";
import { Lenses, Optional } from "@focuson/lens";

export type SingleMessagesPostProcessor<MSGs> = ( msgs: MSGs[] ) => MSGs[]
export type MessagesPostProcessor<MSGs> = NameAnd<SingleMessagesPostProcessor<MSGs>>
export interface HasMessagesPostProcessor<MSGs> {
  messagePostProcessor: MessagesPostProcessor<MSGs>
}
export type InfoToSuccessPostProcessMessage = 'infoToSuccess';
export function defaultMessagesInPayloadL (): Optional<any, any> {
  return Lenses.identity<any> ().focusQuery ( 'messages' )
}
export const infoToSuccessMessagesPostProcessor: SingleMessagesPostProcessor<SimpleMessage> = ( msgs: SimpleMessage[] ): SimpleMessage[] => {
  return msgs.map ( msg => msg.level === "info" ? ({ ...msg, level: 'success' }) : msg )
};

export const processOneMessageProcessor = <MSGs> ( mpp: MessagesPostProcessor<MSGs>, processor: string ) => ( msgs: MSGs[] ): MSGs[] => {
  const p = mpp[ processor ]
  if ( p === undefined ) throw new Error ( `Trying to use message post processor '${processor}' that doesn't exist. Legal values are ${Object.keys ( mpp )}` )
  return p ( msgs )
}

export const processAllMessageProcessors = <MSGs> ( mpp: MessagesPostProcessor<MSGs>, processors: string[] ) => ( msgs: MSGs[] ): MSGs[] =>
  processors.reduce ( ( acc, p ) => processOneMessageProcessor ( mpp, p ) ( acc ), msgs )

export function justInfoToSuccessMessagesPostProcessor (): MessagesPostProcessor<SimpleMessage> {
  return { infoToSuccess: infoToSuccessMessagesPostProcessor }
}
