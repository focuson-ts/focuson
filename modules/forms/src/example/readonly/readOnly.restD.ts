import { ExampleRestD } from "../common";
import { currencyListDD } from "./readonly.dataD";


export const currencyRD: ExampleRestD = {
  params: {},
  dataDD: currencyListDD,
  namePrefix: 'oneLine',
  url: '/api/currenciesForReadOnly/?{query}',
  actions: [ 'get' ]
}
