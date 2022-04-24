export interface EnabledBy {
  enabledBy?: string
}

export function enabledByString ( e: EnabledBy ) {
  return e.enabledBy ? `enabledBy={${e.enabledBy}Guard} ` : ''
}