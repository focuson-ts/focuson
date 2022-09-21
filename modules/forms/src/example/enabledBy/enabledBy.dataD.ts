import { ExampleDataD } from "../common";
import { yesNoDD } from "../SingleOccupation/singleOccupation.dataD";
import { BooleanDD, DateDD, DateWithDatePickerDD, ManyLineStringDD, NatNumDd, StringDD, YesNoCheckboxDD } from "../../common/dataD";
import { actionEnums, nextActionDD, reasonDD } from "../onChange/onChange.dataD";
import { DisplayStringWithLookupCD, WithTextLayoutCD } from "../../common/componentsD";


export const enabledByDataD: ExampleDataD = {
  name: 'EnabledBy',
  description: "",
  guards: {
    yes: { condition: 'equals', path: 'dropdown', value: '"Y"', message: 'Select Yes to enable' },
    no: { condition: 'not', cond: 'yes' },
    yesOrNo: { condition: 'or', conditions: [ 'yes', 'no' ] },
    stringEqualsTextArea: { condition: 'a=b', aPath: 'string', bPath: 'textArea', message: 'The string has to equal the text area' },
    and: { condition: 'and', conditions: [ 'yes', 'stringEqualsTextArea' ] }
  },
  layout: { component: WithTextLayoutCD, displayParams: { text: 'Some <b>Exciting</b> text {dropdown}' } },
  structure: {
    dropdown: { dataDD: yesNoDD },
    dropdownWithNull: { dataDD: { ...yesNoDD, emptyValue: null, allowNull: true } },
    dropdownWithUndefined: { dataDD: { ...yesNoDD, emptyValue: undefined, allowUndefined: true } },

    displayStringWithLookup: {
      dataDD: { ...StringDD, display: DisplayStringWithLookupCD, emptyValue: 'A' },
      displayParams: { lookup: { A: 'The <b>value</b> was A', B: 'The value was B' } }
    },

    dropdown1: {
      dataDD: reasonDD, displayParams: {
        enabledBy: 'yes',
        specificOnChange: {
          Reason1: { command: 'delete', path: 'dropdown2' },
          Reason2: { command: 'set', path: 'dropdown2', value: 'action1' },
          Reason3: { command: 'set', path: 'dropdown2', value: 'action3' }
        }
      }
    },
    dropdown2: {
      dataDD: nextActionDD,
      displayParams: {
        selector: 'dropdown1',
        pleaseSelect: "please select",
        enums: {
          Reason1: actionEnums ( 'action1', 'action2' ),
          Reason2: actionEnums ( 'action1' ),
          Reason3: actionEnums ( 'action3' )
        }
      }
    },
    string: { dataDD: StringDD, displayParams: { enabledBy: 'yes', placeholder: 'String goes here...' } },
    checkbox: { dataDD: BooleanDD, displayParams: { enabledBy: 'yes' } },
    ynCheckbox: { dataDD: YesNoCheckboxDD, displayParams: { enabledBy: 'yes' } },
    number: { dataDD: { ...NatNumDd, emptyValue: undefined, allowUndefined: true }, displayParams: { enabledBy: 'no', placeholder: 'Number goes here...' } },
    textArea: { dataDD: ManyLineStringDD, displayParams: { enabledBy: [ 'yes' ], maxlength: 200, placeholder: 'Text goes here' } },
    date: { dataDD: DateWithDatePickerDD },
    stringWhenEqual: { dataDD: StringDD, displayParams: { enabledBy: 'stringEqualsTextArea' } },
    stringWhenAnd: { dataDD: StringDD, displayParams: { enabledBy: 'and' } }

  }
}