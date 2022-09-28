import { ExampleMainPage } from "../common";
import { datesDataD } from "./dates.dataD";
import { datesRestD } from "./dates.restD";


export const DatesPageD: ExampleMainPage = {
  name: "Dates", pageType: 'MainPage',
  display: { dataDD: datesDataD, target: '~/dates' },
  domain: {
    dates: { dataDD: datesDataD }
  },
  rest: {
    notUsed: {rest: datesRestD, targetFromPath: "~/dates"}
  },
  guards: {},
  initialValue: 'empty',
  modals: [], modes: [ 'edit' ],
  buttons: {
    validateButton: { control: "ValidationButton" },
    exampleButtonWithValidation: { control: 'RestButton', validate: true, restName: 'notUsed', action: 'get' }
  }
}