import { ExampleDataD } from "../common";
import { BooleanDD, ManyLineStringDD, NatNumDd, StringDD } from "../../common/dataD";
import { MessageCommand } from "@focuson/rest";
import { yesNoDD } from "../SingleOccupation/singleOccupation.dataD";


function msg ( msg: string ): MessageCommand {
  return { command: 'message', msg }
}
export const onChangeDataD: ExampleDataD = {
  description: "",
  name: "OnChange",
  structure: {
    labelAndString: { dataDD: StringDD, displayParams: { onChange: msg ( 'labelAndString' ) } },
    labelAndNumber: { dataDD: NatNumDd, displayParams: { onChange: msg ( 'labelAndNumber' ) } },
    labelAndCheckbox: { dataDD: BooleanDD, displayParams: { onChange: msg ( 'labelAndCheckbox' ) } },
    textArea: { dataDD: ManyLineStringDD, displayParams: { onChange: msg ( 'textArea' ) } },
    labelAndDropDown: { dataDD: yesNoDD, displayParams: { onChange: msg ( 'labelAndDropDown' ) } }

  }
}