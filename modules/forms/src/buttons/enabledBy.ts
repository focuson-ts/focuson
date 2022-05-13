import { toArray } from "@focuson/utils";

export interface EnabledBy {
  enabledBy?: string | string[]
}

export function enabledByString ( e: EnabledBy ) {
  return e.enabledBy ? `enabledBy={${e.enabledBy && toArray ( e.enabledBy ).map ( e => e + 'Guard' ).join ( '&&' )}} ` : ''
}