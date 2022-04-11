/** A state is a string[] that means 'turn into a state  'from' the current state
 * A full state is a string[] that means 'turn into a state from the root'.
 * In general 'state' doesn't break encapsulation, pagestate and fullState do. pageState is slightly cleaner becaues the damage doesn't leave the page
 * string and string[] are just the types
 *
 * */
export type DisplayCompParamType = 'boolean' | 'string' | 'state' | 'pageState' | 'fullState' | 'stateValue' | 'pageStateValue' | 'fullStateValue' | 'object' | 'string[]'

type ParamNeeded = 'no' | 'yes' | 'defaultToCamelCaseOfName' | 'defaultToPath' | 'defaultToEnum' | 'id' | 'notARealParam' | 'defaultToButtons'

export interface OneDisplayCompParamD<T> {
  paramType: DisplayCompParamType;
  needed?: ParamNeeded
  default?: T
}

export interface DisplayCompParamD {
  [ name: string ]: OneDisplayCompParamD<any>
}
export interface SimpleDisplayComp {
  import: string;
  name: string;
}
export interface DisplayCompD extends SimpleDisplayComp {
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
  pattern: { paramType: 'string', needed: 'no' },
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
  allButtons: { paramType: 'object', needed: 'defaultToButtons' },
  buttons: { paramType: 'string[]', needed: 'no' }
}
export const LabelAndStringInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndStringInput",
  params: { ...commonParamsWithLabel, ...stringValidationParams }
}

export const LabelAndNumberInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndNumberInput",
  params: { ...commonParamsWithLabel, ...intValidationParams }
}
export const YourCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndNumberInput",
  params: { ...commonParamsWithLabel, pathToTheFlags:{paramType: 'pageState', needed: 'yes'}
 }
}

export const LabelAndCheckboxInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndBooleanInput",
  params: commonParamsWithLabel
}
//The data about to use a react component.
export const TableCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "Table",                        //The name of the react component
  params: {                             //configuration parameter for the react component
    ...commonParams,
    order: { paramType: 'string[]', needed: 'yes' },
    copySelectedIndexTo: { paramType: 'pageState', needed: 'no' },
    copySelectedItemTo: { paramType: 'pageState', needed: 'no' }
  }
}



export const SelectedItemCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "SelectedItem",
  params: {
    ...commonParams,
    index: { paramType: 'pageStateValue', needed: 'yes' },
    display: { paramType: 'object', needed: 'yes' },
    buttons: { paramType: 'object', needed: 'defaultToButtons' }
  }
}
export const LayoutCd: DisplayCompD = {
  params: { details: { paramType: 'string', needed: 'yes' }, title: {paramType: 'string', needed: 'no'}, defaultProps: {paramType: 'string', needed: 'no'}},
  import: "@focuson/form_components",
  name: "Layout"
}


export const enumParams: DisplayCompParamD = { enums: { needed: 'defaultToEnum', paramType: 'object' } }

export const RadioCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "Radio",
  params: { ...commonParams, ...enumParams }
}
export const LabelAndRadioCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "LabelAndRadio",
  params: { ...commonParamsWithLabel, ...enumParams }
}


export const OptionalCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "Optional",
  params: { ...commonParamsWithLabel }
}

export const LabelAndDropDownCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "LabelAndDropdown",
  params: { ...commonParamsWithLabel, ...enumParams }
}

export const LabelAndTextAreaCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "TextAreaInput",
  params: { ...commonParamsWithLabel, ...enumParams }
}
