import { ExampleRestD } from "../common";

import { AccountDetailsDD, CurrentPaymentCountsDD, PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { IntParam, RestParams } from "../../common/restD";
import { onlySchema } from "../database/tableNames";

export const PrintRecordHistoryParams: RestParams = {
  accountId: { ...IntParam, commonLens: 'accountId', testValue: '123' },
}

export const PrintRecordHistoryRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: PrintRecordHistoryDD,
  url: '/api/printrecordhistory?{query}',
  actions: [ 'get', { state: 'print' } ],
  states: {
    print: { url: '/api/print?{query}', useStoredProcedure: { name: 'print', params: [], schema: onlySchema } }
  }
}
export const CurrentPaymentCountsRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: CurrentPaymentCountsDD,
  url: '/api/paymentcounts?{query}',
  actions: [ 'get' ],
}
export const accountAndAddressDetailsRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: AccountDetailsDD,
  url: '/api/payment/accountDetails?{query}',
  actions: [ 'get' ],
}