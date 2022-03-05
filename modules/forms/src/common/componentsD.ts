/** A state is a string[] that means 'turn into a state  'from' the current state
 * A full state is a string[] that means 'turn into a state from the root'.
 * In general 'state' doesn't break encapsulation, pagestate and fullState do. pageState is slightly cleaner becaues the damage doesn't leave the page
 * */
export type DisplayCompParamType = 'string' | 'state' | 'pageState' | 'fullState' | 'stateValue' | 'pageStateValue' | 'fullStateValue' | 'object' | 'string[]'

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
export const commonParams: DisplayCompParamD = {
  label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' },
  ariaLabel: { paramType: 'string', needed: 'no' },
}
export const LabelAndStringInputCD: DisplayCompD = {
  import: "./copied/LabelAndInput", name: "LabelAndStringInput",
  params: commonParams
}

export const LabelAndNumberInputCD: DisplayCompD = {
  import: "./copied/LabelAndInput", name: "LabelAndNumberInput",
  params: commonParams
}

export const LabelAndCheckboxInputCD: DisplayCompD = {
  import: "./copied/LabelAndInput", name: "LabelAndBooleanInput",
  params: commonParams
}
export const TableCD: DisplayCompD = {
  import: "./copied/table", name: "Table",
  params: { order: { paramType: 'string[]', needed: 'yes' } }
}
export const SelectedItemCD: DisplayCompD = {
  import: "./copied/table",
  name: "SelectedItem",
  params: {
    ...commonParams,
    label: undefined,
    index: { paramType: 'pageStateValue', needed: 'yes' },
    display: { paramType: 'object', needed: 'yes' }
  }
}
export const RadioCD: DisplayCompD = { import: "./copied/Radio", name: "Radio", params: {}, needsEnums: true }
export const LabelAndRadioCD: DisplayCompD = {
  import: "./copied/Radio",
  name: "LabelAndRadio",
  params: commonParams,
  needsEnums: true
}