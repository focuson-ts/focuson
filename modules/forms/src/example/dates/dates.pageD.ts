import { ExampleMainPage } from "../common";
import { DateInfoDataD, datesDataD } from "./dates.dataD";
import { datesRestD } from "./dates.restD";
import { StringParam } from "../../common/restD";


export const DatesPageD: ExampleMainPage = {
  commonParams: { jurisdiction: { ...StringParam, commonLens: 'jurisdiction', testValue: 'GB' } },
  name: "Dates", pageType: 'MainPage',
  display: { dataDD: datesDataD, target: '~/dates' },
  domain: {
    dates: { dataDD: datesDataD },
    dateInfo: { dataDD: DateInfoDataD }
  },
  rest: { dateInfo: { rest: datesRestD, targetFromPath: '~/dateInfo', fetcher: true } },
  guards: {},
  initialValue: 'empty',
  modals: [], modes: [ 'edit' ],
  buttons: {}
}