type DisplayCompParamType = 'string' | 'string[]'

type ParamNeeded = 'no' | 'yes' | 'defaultToCamelCaseOfName'

export interface OneDisplayCompParamD {
  paramType: DisplayCompParamType;
  needed?: ParamNeeded
}

export interface DisplayCompParamD {
  [ name: string ]: OneDisplayCompParamD
}
export interface DisplayCompD {
  name: string;
  params: DisplayCompParamD;
  needsEnums?: boolean;  // can move this to ParamNeeded
}

export const LabelAndInputCD: DisplayCompD = { name: "LabelAndInput", params: { label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' } } }
export const TableCD: DisplayCompD = { name: "Table", params: { order: { paramType: 'string[]', needed: 'yes' } } }
export const RadioCD: DisplayCompD = { name: "Radio", params: {}, needsEnums: true }
export const LabelAndRadioCD: DisplayCompD = { name: "LabelAndRadio", params: { label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' } }, needsEnums: true }