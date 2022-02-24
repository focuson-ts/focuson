
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

export function createSimpleMessage ( level: SimpleMessageLevel, msg: string, time: string): SimpleMessage {
  return { level, msg, time }
}
