import { ExampleMainPage } from "../common";
import { datesDataD } from "./dates.dataD";



export const DatesPageD: ExampleMainPage = {
  name: "Dates", pageType: 'MainPage',
  display: { dataDD: datesDataD, target: '~/onChange' },
  domain: { onChange: { dataDD: datesDataD } },
  guards: {},
  initialValue: 'empty',

  modals: [], modes: [ 'edit' ],
  rest: {},
  buttons: {}

}