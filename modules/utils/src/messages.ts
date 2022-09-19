export type SimpleMessageLevel = 'error' | 'warning' | 'info' | 'success'
/** A simple default messaging system. Often a project will have something more complex */

export interface HasSimpleMessages {
  messages: SimpleMessage[];
}

export interface MessageAndLevel {
  level: SimpleMessageLevel,
  msg: string,

}
export interface SimpleMessage extends MessageAndLevel {
  time: string
}

export function ariaRoleForMessageLevel ( l: SimpleMessageLevel ) {
  switch ( l ) {
    case 'success':
      return 'status';
    case 'info':
      return 'status';
    case 'warning':
      return 'alert';
    case 'error':
      return 'alert';
    default:
      throw new Error ( `No idea how to set ariaRoleForMessageLevel ${l}` )
  }
}
export function createSimpleMessage ( level: SimpleMessageLevel, msg: string, time: string ): SimpleMessage {
  return { level, msg, time }
}
export const stringToSimpleMsg = ( dateFn: () => string, defaultLevel?: SimpleMessageLevel, ) => ( msg: string, level?: SimpleMessageLevel ): SimpleMessage =>
  ({ level: level ? level : defaultLevel, msg, time: dateFn () });
