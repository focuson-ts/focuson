import { ExampleRestD } from "../common";
import { PaymentDD, SummaryOfPaymentsTableDD } from "./payments.dataD";

export const summaryOfPreviousPayments: ExampleRestD = {
  params: {},
  dataDD: SummaryOfPaymentsTableDD,
  url: '/api/payments/?{query}',
  actions: [ 'get' ]
}