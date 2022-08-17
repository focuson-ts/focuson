/** A state is a string[] that means 'turn into a state  'from' the current state
 * A full state is a string[] that means 'turn into a state from the root'.
 * In general 'state' doesn't break encapsulation, pagestate and fullState do. pageState is slightly cleaner becaues the damage doesn't leave the page
 * string and string[] are just the types
 *
 * */
export type DisplayCompParamType = 'boolean' | 'string' | 'state' | 'pageState' | 'fullState' | 'stateValue' | 'pageStateValue' |
  'fullStateValue' | 'object' | 'json' | 'jsonWithDisplayFn' | 'string[]' | 'path' | 'nameAndPaths' | 'pathValue' | 'objectAndRenderPrefix' | 'guards'

type ParamNeeded = 'no' | 'yes' | 'defaultToCamelCaseOfName' | 'defaultToPath' | 'defaultToEnum' | 'id' | 'notARealParam' | 'defaultToButtons' | 'defaultToLabel' | 'defaultToParentState' | 'defaultToParentStateIfOnChange'

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
  step: { paramType: 'object', needed: 'no' },
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
  params: commonInputParams,
}

export const DisplayStringWithLookupCD: DisplayCompD = {
  import: "@focuson/form_components", name: "DisplayStringWithLookup",
  params: {
    ...commonParams,
    lookup: { paramType: 'json', needed: 'no' },
    className: { paramType: 'string', needed: 'no' },
    ifUndefined: { paramType: 'string', needed: 'no' }
  }
}
export const WithTextLayoutCD: DisplayCompD = {
  import: "@focuson/form_components", name: "WithTextLayout",
  params: {
    state: { paramType: 'state', needed: 'defaultToPath' },
    text: { paramType: "string", needed: 'yes' },
    holderClassName: { paramType: "string", needed: 'no' },
    textClassName: { paramType: "string", needed: 'no' },
    childrenClassName: { paramType: "string", needed: 'no' }
  }
}


export const commonParamsWithLabel: DisplayCompParamD = {
  ...commonParams,
  label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' },
  allButtons: { paramType: 'object', needed: 'defaultToButtons' },
  buttons: { paramType: 'string[]', needed: 'no' },
  labelPosition: { paramType: 'string', needed: 'no' },
}

const onChangeAndParentState: DisplayCompParamD = {
  onChange: { paramType: 'json', needed: 'no' },
  parentState: { paramType: 'object', needed: 'defaultToParentStateIfOnChange' },
}
const enabledByForInputs: DisplayCompParamD = {
  enabledBy: { paramType: 'guards', needed: 'no' },
}

const specificOnChangeAndParentState: DisplayCompParamD = {
  ...onChangeAndParentState,
  specificOnChange: { paramType: 'json', needed: 'no' },
}
export const LabelAndStringInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndStringInput",
  params: {
    ...commonParamsWithLabel, ...stringValidationParams, ...enabledByForInputs,
    ...onChangeAndParentState,
    placeholder: {paramType: 'string', needed: 'no'}
  }
}

export const LabelAndNumberInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndNumberInput",
  params: {
    ...commonParamsWithLabel, ...intValidationParams, ...enabledByForInputs,
    ...onChangeAndParentState,
    placeholder: {paramType: 'string', needed: 'no'}
  }
}

export const LabelAndCheckboxInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndBooleanInput",
  params: { ...commonParamsWithLabel, ...onChangeAndParentState, ...enabledByForInputs, }
}
export const LabelAndDateInputCD: DisplayCompD = {
  import: "@focuson/form_components", name: "LabelAndDateInput",
  params: {
    ...commonParamsWithLabel,
    datesExcluded: { paramType: 'path', needed: 'no' },
    workingDaysInFuture: { paramType: 'object', needed: 'no' },
    includeWeekends: { paramType: 'boolean', needed: 'no' },
    fieldNameInHolidays: { paramType: 'string', needed: 'no' },
    dateFormat: { paramType: 'string', needed: 'no' },
    placeholder: {paramType: 'string', needed: 'no'}
  }
}
export const DatePicker2CD: DisplayCompD = {
  import: "@focuson/form_components", name: "DatePicker",
  params: {
    ...commonParamsWithLabel,
    required: { paramType: 'boolean', needed: 'no' },
    dateFormat: { paramType: 'string', needed: 'no' },
    dateRange: { paramType: 'json', needed: 'no' },
    jurisdiction: { paramType: 'path', needed: 'no' },
    dateInfo: { paramType: 'path', needed: 'no' },
    placeholder: {paramType: 'string', needed: 'no'}
  }
}
export const LabelAndDropDownFromDataCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "LabelAndDropDownFromData",
  params: {
    ...commonParamsWithLabel,
    ...specificOnChangeAndParentState,
    ...enabledByForInputs,
    data: { paramType: "path", needed: 'yes' },
    dataId: { paramType: 'string', needed: 'yes' },
    dataField: { paramType: 'string', needed: 'yes' },
    pleaseSelect: { paramType: 'string', needed: 'no' },
    size: { paramType: 'object', needed: 'no' },
    required: { paramType: 'boolean', needed: 'no' }

  }
}

export const DataDrivenFixedOptionDropDownAndDetailsCD: DisplayCompD = {
  import: "@focuson/form_components", name: "DataDrivenFixedOptionDropDownAndDetails",
  params: {
    ...commonParamsWithLabel,
    ...specificOnChangeAndParentState,
    ...enabledByForInputs,
    details: { paramType: "jsonWithDisplayFn", needed: 'yes' },
    pleaseSelect: { paramType: 'string', needed: 'no' },
    dontShowEmpty: { paramType: 'boolean', needed: 'no' }
  }
}

export const tableParams: DisplayCompParamD = {
  ...commonParams,
  order: { paramType: 'string[]', needed: 'yes' },
  copySelectedIndexTo: { paramType: 'pageState', needed: 'no' },
  copySelectedItemTo: { paramType: 'pageState', needed: 'no' },
  joiners: { paramType: 'string', needed: 'no' },
  prefixFilter: { paramType: 'path', needed: 'no' },
  prefixColumn: { paramType: 'string', needed: 'no' },
  maxCount: { paramType: 'string', needed: 'no' },
  emptyData: { paramType: 'string', needed: 'no' },
  tableTitle: { paramType: 'string', needed: 'no' },
  scrollAfter: { paramType: 'string', needed: 'no' },
  rights: { paramType: 'string[]', needed: 'no' },


}
export const TableCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "Table",                        //The name of the react component
  params: tableParams
}
export const TableWithVaryingOrderCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "TableWithVaryingOrder",                        //The name of the react component
  params: {
    ...tableParams,
    order: { paramType: 'json', needed: 'yes' },
    select: { paramType: 'path', needed: 'yes' }
  }
}
export const StructureTableCD: DisplayCompD = {
  import: "@focuson/form_components",   //so that I can write the import statement for the react component
  name: "StructureTable",                        //The name of the react component
  params: {                             //configuration parameter for the react component
    ...tableParams,
    paths: { paramType: 'nameAndPaths', needed: 'yes' }
  }
}

export const SelectedItemCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "SelectedItem",
  params: {
    ...commonParams,
    index: { paramType: 'pathValue', needed: 'yes' },
    header: { paramType: 'string', needed: 'no' },
    headerIfEmpty: { paramType: 'string', needed: 'no' },
    showNofM: { paramType: 'boolean', needed: 'no' },
    display: { paramType: 'objectAndRenderPrefix', needed: 'yes' },
    allButtons: { paramType: 'object', needed: 'defaultToButtons' }
  }
}
export const LayoutCd: DisplayCompD = {
  params: {
    state: { paramType: 'state', needed: 'defaultToPath' },
    details: { paramType: 'string', needed: 'yes' },
    title: { paramType: 'string', needed: 'no' },
    titleClassName: { paramType: 'string', needed: 'no' },
    rightHandTitle: { paramType: 'string', needed: 'no' },
    rightHandClassName: { paramType: 'string', needed: 'no' },
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
  params: {
    ...commonParams, ...enumParams,
    required: { paramType: 'boolean', needed: 'no', default: true }
  }
}
export const LabelAndRadioCD: DisplayCompD = {
  import: "@focuson/form_components",
  name: "LabelAndRadio",
  params: {
    ...commonParamsWithLabel, ...enumParams,
    ...enabledByForInputs,
    required: { paramType: 'boolean', needed: 'no', default: true },
  }
}


export const OptionalCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "Optional",
  params: { ...commonParamsWithLabel }
}
export const DropDownCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "Dropdown",
  params: {
    ...commonParams, ...enumParams,
    ...specificOnChangeAndParentState,
    ...enabledByForInputs,
    pleaseSelect: { paramType: 'string', needed: 'no' },
    size: { paramType: 'object', needed: 'no' },
    required: { paramType: 'boolean', needed: 'no' },
  }
}
export const LabelAndDropDownCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "LabelAndDropdown",
  params: {
    ...commonParamsWithLabel, ...enumParams,
    ...specificOnChangeAndParentState,
    ...enabledByForInputs,
    pleaseSelect: { paramType: 'string', needed: 'no' },
    size: { paramType: 'object', needed: 'no' },
    required: { paramType: 'boolean', needed: 'no' },
  }
}
export const LabelAndDropDownWithVaryingContentCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "LabelAndDropDownWithVaryingContent",
  params: {
    ...commonParamsWithLabel,
    ...specificOnChangeAndParentState,
    ...enabledByForInputs,
    selector: { paramType: 'path', needed: 'yes' },
    enums: { paramType: 'json', needed: 'yes' },
    pleaseSelect: { paramType: 'string', needed: 'no' },
    size: { paramType: 'object', needed: 'no' },
    required: { paramType: 'boolean', needed: 'no' },
  }
}

export const LabelAndTextAreaCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "LabelAndTextarea",
  params: {
    ...commonParamsWithLabel, scrollAfter: { paramType: 'string', needed: 'no' },
    ...onChangeAndParentState,
    ...enabledByForInputs,
    required: { paramType: 'boolean', needed: 'no', default: true },
    maxlength: { paramType: 'object', needed: 'no' },
    placeholder: {paramType: 'string', needed: 'no'}
  }
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

export const CheckboxAndNumberCD: DisplayCompD = {
  import: '@focuson/form_components',
  name: "CheckboxAndNumber",
  params: {
    ...commonParams,
    label: { paramType: 'string', needed: 'defaultToCamelCaseOfName' },
    number: { paramType: 'path', needed: 'yes' }
  }

}
