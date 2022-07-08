import { ExampleMainPage } from "../common";
import { currencyListDD, readonlyDD } from "./readonly.dataD";
import { currencyRD } from "../payments/payments.restD";


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
    currency: { rest: currencyRD, targetFromPath: '~/currency', fetcher: true },
  },
  buttons: {
  }

}