import { ExampleRestD } from "../common";

import { PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { IntParam, RestParams } from "../../common/restD";


export const PrintRecordHistoryParams: RestParams = {
  accountId: { ...IntParam, commonLens: 'accountId', testValue: '123' },
}

export const PrintRecordHistoryRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: PrintRecordHistoryDD,
  url: '/api/printrecordhistory?{query}',
  actions: [ 'get' ],
}