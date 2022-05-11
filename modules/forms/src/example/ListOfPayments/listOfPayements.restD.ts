import { ExampleRestD } from "../common";

import { PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { IntParam, RestParams } from "../../common/restD";
import { onlySchema } from "../database/tableNames";


export const PrintRecordHistoryParams: RestParams = {
  accountId: { ...IntParam, commonLens: 'accountId', testValue: '123' },
}

export const PrintRecordHistoryRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: PrintRecordHistoryDD,
  url: '/api/printrecordhistory?{query}',
  actions: [ 'get' ],
}
export const PrintRecordHistory1RD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: PrintRecordHistoryDD,
  namePrefix: 'somePrefix',
  url: '/api/printrecordhistoryx?{query}',
  actions: [ 'get' , 'create', {state: 'print'}],
  states:{
    print:{url:'/api/printrecord/print?{query}', useStoredProcedure: {name: 'someName', schema: onlySchema, params: []}}
  }
}