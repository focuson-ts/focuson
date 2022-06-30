export type SimpleMessageLevel = 'error' | 'warning' | 'info'
/** A simple default messaging system. Often a project will have something more complex */

export interface HasSimpleMessages {
  messages: SimpleMessage[];
}

export interface SimpleMessage {
  level: SimpleMessageLevel,
  msg: string,
  time: string
}

export function ariaRoleForMessageLevel(l: SimpleMessageLevel){
  switch ( l ) {
    case 'info': return 'status';
    case 'warning': return 'alert';
    case 'error': return 'alert';
    default: throw new Error(`No idea how to set ariaRoleForMessageLevel ${l}`)
  }
}
export function createSimpleMessage ( level: SimpleMessageLevel, msg: string, time: string ): SimpleMessage {
  return { level, msg, time }
}
export const stringToSimpleMsg = ( dateFn: () => string, level: SimpleMessageLevel, ) => ( msg: string ): SimpleMessage => ({ level, msg, time: dateFn () });
