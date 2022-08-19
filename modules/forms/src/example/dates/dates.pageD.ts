import { ExampleMainPage } from "../common";
import { datesDataD } from "./dates.dataD";


export const DatesPageD: ExampleMainPage = {
  name: "Dates", pageType: 'MainPage',
  display: { dataDD: datesDataD, target: '~/dates' },
  domain: {
    dates: { dataDD: datesDataD }
  },
  rest: {},
  guards: {},
  initialValue: 'empty',
  modals: [], modes: [ 'edit' ],
  buttons: {}
}