import { ExampleMainPage } from "../common";
import { currencyListDD, readonlyDD } from "./readonly.dataD";
import { currencyRD } from "./readOnly.restD";


export const ReadOnlyPageD: ExampleMainPage = {
  display: { dataDD: readonlyDD, target: '~/onChange' },
  domain: {
    onChange: { dataDD: readonlyDD },
    currency: { dataDD: currencyListDD }
  },
  guards: {}, initialValue: 'empty',

  modals: [], modes: [ 'edit' ],
  name: "ReadOnly", pageType: 'MainPage',
  rest: {
    currencyForReadOnly: { rest: currencyRD, targetFromPath: '~/currency', fetcher: true },
  },
  buttons: {
  }

}