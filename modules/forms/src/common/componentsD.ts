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
  import: string;
  name: string;
  params: DisplayCompParamD;
  needsEnums?: boolean;  // can move this to ParamNeeded
}

export const LabelAndStringInputCD: DisplayCompD = { import: "./copied/LabelAndInput", name: "LabelAndStringInput", params: { label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' } } }
export const LabelAndNumberInputCD: DisplayCompD = { import: "./copied/LabelAndInput", name: "LabelAndNumberInput", params: { label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' } } }
export const LabelAndCheckboxInputCD: DisplayCompD = { import: "./copied/LabelAndInput", name: "LabelAndBooleanInput", params: { label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' } } }
export const TableCD: DisplayCompD = { import: "./copied/table", name: "Table", params: { order: { paramType: 'string[]', needed: 'yes' } } }
export const RadioCD: DisplayCompD = { import: "./copied/Radio", name: "Radio", params: {}, needsEnums: true }
export const LabelAndRadioCD: DisplayCompD = { import: "./copied/Radio", name: "LabelAndRadio", params: { label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' } }, needsEnums: true }