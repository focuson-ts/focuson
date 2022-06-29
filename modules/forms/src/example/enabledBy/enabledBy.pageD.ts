import { ExampleMainPage } from "../common";
import { enabledByDataD } from "./enabledBy.dataD";


export const EnabledByPageD: ExampleMainPage = {
  name: "EnabledBy", pageType: 'MainPage',
  display: { dataDD: enabledByDataD, target: '~/onChange' },
  domain: { onChange: { dataDD: enabledByDataD } },
  guards: {},
  initialValue: 'empty',

  modals: [], modes: [ 'edit' ],
  rest: {},
  buttons: {}

}