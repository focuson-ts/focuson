import { ExampleDataD } from "../common";
import { actionEnums, ManyLineStringDD, nextActionDD, reasonDD, StringDD, YesNoDD } from "../../common/dataD";
import { LabelAndDropDownWithVaryingContentCD } from "../../common/componentsD";

// export const reasonEnum = {
//   Reason1: { action1: 'Shoot the messenger', action2: 'Throw a paddy' },
//   Reason2: { action1: 'Shoot the messenger', action3: "Say thank you" },
//   Reason3: { action3: "Say thank you" }
// }

export const helloWorldDD: ExampleDataD = {
  name: 'HelloWorldDomainData',
  description: 'This is a summary about hello world domain data',
  structure: {
    message1: {
      dataDD: StringDD, sample: [ 'Greetings  !' ], displayParams: {
        onChange: { command: 'message', msg: 'hello' }
      }
    },
    message2: { dataDD: ManyLineStringDD, sample: [ ' message !\nAnd here is a second line' ], displayParams: { scrollAfter: '300px' } },
    dropdown1: {
      dataDD: reasonDD, displayParams: {
        specificOnChange: {
          Reason1: { command: 'set', path: 'dropdown2', value: 'action1' },
          Reason2: { command: 'delete', path: 'dropdown2' },
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
          Reason3: actionEnums('action3')
        }
      }
    }
  }
}