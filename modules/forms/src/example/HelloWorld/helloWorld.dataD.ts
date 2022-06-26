import { ExampleDataD } from "../common";
import { ManyLineStringDD, StringDD, YesNoDD } from "../../common/dataD";
import { LabelAndDropDownWithVaryingContentCD } from "../../common/componentsD";

export const helloWorldDD: ExampleDataD = {
  name: 'HelloWorldDomainData',
  description: 'This is a summary about hello world domain data',
  structure: {
    message1: { dataDD: StringDD, sample: [ 'Greetings  !' ] },
    message2: { dataDD: ManyLineStringDD, sample: [ ' message !\nAnd here is a second line' ], displayParams:{scrollAfter: '300px'} },
    dropdown1: { dataDD: YesNoDD },
    dropdown2: {
      dataDD: {
        ...StringDD, display: LabelAndDropDownWithVaryingContentCD, displayParams: {
          selector: 'dropdown1',
          pleaseSelect: "please select",
          enums: {
            N: { no1: 'No1', no2: 'no2' },
            Y: { yes1: 'Yes1', yes22: 'yes2' },
          }
        }
      }
    }
  }
}