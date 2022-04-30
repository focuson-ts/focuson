import { beforeAfterSeparator } from "./utils";

export type RestAction = 'get' | 'getOption' | 'list' | 'update' | 'create' | 'delete' | RestStateChange

export interface RestStateChange {
  state: string
}
export function isRestStateChange ( r: RestAction ): r is RestStateChange {
  // @ts-ignore
  return r.state !== undefined
}



export type RestResult = 'refresh' | 'nothing'