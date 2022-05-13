import { LensState } from "@focuson/state";

/** A state is a string[] that means 'turn into a state  'from' the current state
 * A full state is a string[] that means 'turn into a state from the root'.
 * In general 'state' doesn't break encapsulation, pagestate and fullState do. pageState is slightly cleaner becaues the damage doesn't leave the page
 * string and string[] are just the types
 *
 * */
export type DisplayCompParamType = 'boolean' | 'string' | 'state' | 'pageState' | 'fullState' | 'stateValue' | 'pageStateValue' | 'fullStateValue' | 'object' | 'json' | 'jsonWithDisplayFn' | 'string[]' | 'path' | 'pathValue' | 'objectAndRenderPrefix'

type ParamNeeded = 'no' | 'yes' | 'defaultToCamelCaseOfName' | 'defaultToPath' | 'defaultToEnum' | 'id' | 'notARealParam' | 'defaultToButtons' | 'defaultToLabel' |'defaultToParentState'

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
  readonly: { paramType: 'boolean', needed: 'no' },
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
export const commonInputParams: DisplayCompParamD = {
  ...commonParams,
}
export const StringInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "StringInput",
  params: { ...commonInputParams, ...stringValidationParams }
}

export const NumberInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "NumberInput",
  params: { ...commonInputParams, ...intValidationParams }
}

export const CheckboxInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "BooleanInput",
  params: commonInputParams
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

export const LabelAndCheckboxInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndBooleanInput",
  params: commonParamsWithLabel
}
export const LabelAndDateInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndDateInput",
  params: {
    ...commonParamsWithLabel,
    datesExcluded: { paramType: 'path', needed: 'no' },
    workingDaysInFuture: { paramType: 'object', needed: 'no' },
    includeWeekends: { paramType: 'boolean', needed: 'no' }
  }
}


export const DataDrivenFixedOptionDropDownAndDetailsCD: DisplayCompD = {
  import: "@focuson/form_components", name: "DataDrivenFixedOptionDropDownAndDetails",
  params: {
    ...commonParamsWithLabel,
    details: { paramType: "jsonWithDisplayFn", needed: 'yes' },
    parentState: {paramType: 'object', needed: 'defaultToParentState'},
    pleaseSelect: {paramType: 'string', needed: 'no'},

  }
}
//The data about to use a react component.
export const TableCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "Table",                        //The name of the react component
  params: {                             //configuration parameter for the react component
    ...commonParams,
    order: { paramType: 'string[]', needed: 'yes' },
    copySelectedIndexTo: { paramType: 'pageState', needed: 'no' },
    copySelectedItemTo: { paramType: 'pageState', needed: 'no' },
    joiners: { paramType: 'string', needed: 'no' },
    prefixFilter: { paramType: 'path', needed: 'no' },
    prefixColumn: { paramType: 'string', needed: 'no' },
    maxCount: { paramType: 'string', needed: 'no' }
  }
}

export const SelectedItemCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "SelectedItem",
  params: {
    ...commonParams,
    index: { paramType: 'pathValue', needed: 'yes' },
    display: { paramType: 'objectAndRenderPrefix', needed: 'yes' },
    allButtons: { paramType: 'object', needed: 'defaultToButtons' }
  }
}
export const LayoutCd: DisplayCompD = {
  params: {
    details: { paramType: 'string', needed: 'yes' },
    title: { paramType: 'string', needed: 'no' },
    defaultProps: { paramType: 'string', needed: 'no' },
    displayAsCards: { paramType: 'boolean', needed: 'no' },
  },
  import: "@focuson/form_components",
  name: "Layout"
}
export const TwoElementWithTitleLayoutCD: DisplayCompD = {
  params: { title: { paramType: 'object', needed: 'defaultToLabel' } },
  import: "@focuson/form_components",
  name: "TwoElementWithTitleLayout"
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
  params: {
    ...commonParamsWithLabel, ...enumParams,
    pleaseSelect: { paramType: 'string', needed: 'no' },
    size: { paramType: 'object', needed: 'no' },
    required: { paramType: 'boolean', needed: 'no' },
  }
}

export const LabelAndTextAreaCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "TextAreaInput",
  params: { ...commonParamsWithLabel, ...enumParams }
}

export const TableWithCheckboxInputCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "TableWithCheckboxInput",
  params: {
    ...commonParams,
    order: { paramType: 'string[]', needed: 'yes' },
    copySelectedIndexTo: { paramType: 'pageState', needed: 'no' },
    copySelectedItemTo: { paramType: 'pageState', needed: 'no' }
  }
}

export const UnpaidCardOrMisuseItemsCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "PlusMinusButtonsAndInput",
  params: { ...commonParamsWithLabel, ...intValidationParams, flags: { paramType: "pageState", needed: "yes" } },
}
