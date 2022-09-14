import { ExampleDataD } from "../common";
import { BooleanDD, ManyLineStringDD, NatNumDd, PrimitiveDD, StringDD } from "../../common/dataD";
import { MessageCommand } from "@focuson/rest";
import { yesNoDD } from "../SingleOccupation/singleOccupation.dataD";
import { LabelAndDropDownCD, LabelAndDropDownWithVaryingContent2CD, LabelAndDropDownWithVaryingContentCD } from "../../common/componentsD";

export const reasonsEnum = { Reason1: 'Because I wanted to', Reason2: 'I just di d it', Reason3: "Who cares" }
export const reasonDD: PrimitiveDD = {
  ...StringDD,
  display: LabelAndDropDownCD,
  displayParams: { pleaseSelect: 'Select...' },
  enum: reasonsEnum
}
export const actionEnum = { action1: 'Shoot the messenger', action2: 'Throw a paddy', action3: "Say thank you" }
export type ActionEnums = typeof actionEnum
export function actionEnums<K extends keyof ActionEnums> ( ...as: K[] ) {
  return Object.fromEntries ( as.map ( a => [ a, actionEnum[ a ] ] ) )
}
export const nextActionDD: PrimitiveDD = {
  ...StringDD,
  display: LabelAndDropDownWithVaryingContentCD,
  displayParams: { pleaseSelect: 'Select...' },
  // enum: { action1: 'Shoot the messenger', action2: 'Throw a paddy', action3: "Say thank you" }
}
export const anotherActionDD: PrimitiveDD = {
  ...StringDD,
  display: LabelAndDropDownWithVaryingContent2CD,
  displayParams: { pleaseSelect: 'Select...' },
  // enum: { action1: 'Shoot the messenger', action2: 'Throw a paddy', action3: "Say thank you" }
}


function msg ( msg: string ): MessageCommand {
  return { command: 'message', msg }
}
export const onChangeDataD: ExampleDataD = {
  description: "",
  name: "OnChange",
  structure: {
    labelAndString: { dataDD: StringDD, displayParams: { onChange: msg ( 'labelAndString' ), buttons: [ 'button' ] } },
    labelAndNumber: { dataDD: NatNumDd, displayParams: { onChange: msg ( 'labelAndNumber' ), buttons: [ 'button' ] } },
    labelAndCheckbox: { dataDD: BooleanDD, displayParams: { onChange: msg ( 'labelAndCheckbox' ), buttons: [ 'button' ] } },
    textArea: { dataDD: ManyLineStringDD, displayParams: { onChange: msg ( 'textArea' ), buttons: [ 'button' ] } },
    labelAndDropDown: { dataDD: yesNoDD, displayParams: { onChange: msg ( 'labelAndDropDown' ), buttons: [ 'button' ] } },
    dropdown1: {
      dataDD: reasonDD, displayParams: {
        buttons: [ 'button' ],
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
        buttons: [ 'button' ],
        pleaseSelect: "please select",
        enums: {
          Reason1: actionEnums ( 'action1', 'action2' ),
          Reason2: actionEnums ( 'action1' ),
          Reason3: actionEnums ( 'action3' )
        }
      }
    },
    dropdown3: {
      dataDD: anotherActionDD,
      displayParams: {
        selector1: 'dropdown1',
        selector2: 'dropdown2',
        buttons: [ 'button' ],
        pleaseSelect: "please select",
        enums: {
          Reason1: {
            action1: { a11: 'Action11', a12: 'Action12' },
            action2: { a21: 'Action21', a22: 'Action22' }
          },
          Reason2: {},
          Reason3: { action3: { a31: 'Action31', a32: 'Action 32' } },
        }
      }
    }

  }
}