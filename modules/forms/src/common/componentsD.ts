/** A state is a string[] that means 'turn into a state  'from' the current state
 * A full state is a string[] that means 'turn into a state from the root'.
 * In general 'state' doesn't break encapsulation, pagestate and fullState do. pageState is slightly cleaner becaues the damage doesn't leave the page
 * string and string[] are just the types
 *
 * */
export type DisplayCompParamType = 'boolean' | 'string' | 'state' | 'pageState' | 'fullState' | 'stateValue' | 'pageStateValue' | 'fullStateValue' | 'object' | 'string[]'

type ParamNeeded = 'no' | 'yes' | 'defaultToCamelCaseOfName' | 'defaultToPath' | 'defaultToEnum' | 'id' | 'notARealParam'

export interface OneDisplayCompParamD<T> {
  paramType: DisplayCompParamType;
  needed?: ParamNeeded
  default?: T
}

export interface DisplayCompParamD {
  [ name: string ]: OneDisplayCompParamD<any>
}
export interface DisplayCompD {
  import: string;
  name: string;
  params: DisplayCompParamD;
}
export const commonParams: DisplayCompParamD = {
  id: { paramType: 'object', needed: 'id' }, //object because it is calculated
  state: { paramType: 'state', needed: 'defaultToPath' },
  mode: { paramType: 'object', needed: 'no', default: 'mode' },
  ariaLabel: { paramType: 'string', needed: 'no' },
}


export const stringValidationParams: DisplayCompParamD = {
  required: { paramType: 'boolean', needed: 'no', default: true },
  minlength: { paramType: 'object', needed: 'no' },
  maxlength: { paramType: 'object', needed: 'no' },
}
export const intValidationParams: DisplayCompParamD = {
  required: { paramType: 'boolean', needed: 'no', default: true },
  min: { paramType: 'object', needed: 'no' },
  max: { paramType: 'object', needed: 'no' },
}
export const commonParamsWithLabel: DisplayCompParamD = {
  ...commonParams,
  label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' },
}
export const LabelAndStringInputCD: DisplayCompD = {
  import: "../copied/LabelAndInput", name: "LabelAndStringInput",
  params: { ...commonParamsWithLabel, ...stringValidationParams }
}

export const LabelAndNumberInputCD: DisplayCompD = {
  import: "../copied/LabelAndInput", name: "LabelAndNumberInput",
  params: { ...commonParamsWithLabel, ...intValidationParams }
}

export const LabelAndCheckboxInputCD: DisplayCompD = {
  import: "../copied/LabelAndInput", name: "LabelAndBooleanInput",
  params: commonParamsWithLabel
}
export const TableCD: DisplayCompD = {
  import: "../copied/table", name: "Table",
  params: { ...commonParams, order: { paramType: 'string[]', needed: 'yes' } }
}
export const SelectedItemCD: DisplayCompD = {
  import: "../copied/table",
  name: "SelectedItem",
  params: {
    ...commonParams,
    index: { paramType: 'pageStateValue', needed: 'yes' },
    display: { paramType: 'object', needed: 'yes' }
  }
}

export const enumParams: DisplayCompParamD = { enums: { needed: 'defaultToEnum', paramType: 'object' } }

export const RadioCD: DisplayCompD = {
  import: "../copied/Radio",
  name: "Radio",
  params: { ...commonParams, ...enumParams }
}
export const LabelAndRadioCD: DisplayCompD = {
  import: "../copied/Radio",
  name: "LabelAndRadio",
  params: { ...commonParamsWithLabel, ...enumParams }
}