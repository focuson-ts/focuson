import { ExampleRestD } from "../common";
import { currencyListDD } from "../payments/payments.restD";

export const currencyRD: ExampleRestD = {
  params: {},
  dataDD: currencyListDD,
  namePrefix: 'oneLine',
  url: '/api/currenciesForReadOnly/?{query}',
  actions: [ 'get' ]
}
