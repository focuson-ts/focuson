import { beforeAfterSeparator } from "./utils";

/** list has been removed from here. A lot of the infrastructure has been left behind in case we want to bring it back
 * The primary reason is 'what does it mean'. The rest is focused on a single instance. The name sucks... a lot doesn't feel right
 * If we want a list we just create a resource that is the list
 */
export type RestAction = 'get' | 'getOption' | 'update' | 'create' | 'delete' | RestStateChange //| 'list'

export function actionsEqual ( r1: RestAction, r2: RestAction ) {
  return isRestStateChange ( r1 ) && isRestStateChange ( r2 ) ? r1.state == r2.state : r1 === r2;
}
export interface RestStateChange {
  state: string
}
export function isRestStateChange ( r: RestAction ): r is RestStateChange {
  // @ts-ignore
  return r.state !== undefined
}


export type RestResult = 'refresh' | 'nothing'