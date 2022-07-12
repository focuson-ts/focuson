import { ExampleDataD } from "../common";
import { yesNoDD } from "../SingleOccupation/singleOccupation.dataD";
import { ManyLineStringDD, NatNumDd, StringDD } from "../../common/dataD";
import { actionEnums, nextActionDD, reasonDD } from "../onChange/onChange.dataD";

export const enabledByDataD: ExampleDataD = {
  name: 'EnabledBy',
  description: "",
  guards: {
    yes: { condition: 'equals', path: 'dropdown', value: '"Y"' },
    no: { condition: 'equals', path: 'dropdown', value: '"N"' }
  },
  structure: {
    dropdown: { dataDD: yesNoDD },
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
    string: { dataDD: StringDD, displayParams: { enabledBy: 'yes' } },
    number: { dataDD: NatNumDd, displayParams: { enabledBy: 'no' } },
    textArea: { dataDD: ManyLineStringDD, displayParams: { enabledBy: [ 'yes' ], maxlength: 200 } },

  }
}