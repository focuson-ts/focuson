import { ExampleMainPage } from "../common";
import { onChangeDataD } from "./onChange.dataD";


export const OnChangePageD: ExampleMainPage = {
  display: { dataDD: onChangeDataD, target: '~/onChange' },
  domain: { onChange: { dataDD: onChangeDataD } },
  guards: {}, initialValue: 'empty',

  modals: [], modes: [ 'edit' ],
  name: "OnChange", pageType: 'MainPage',
  rest: {},
  buttons: {
    button: { control: 'ValidationButton' }
  }

}