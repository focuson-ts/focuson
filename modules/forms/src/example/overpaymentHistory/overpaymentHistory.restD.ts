import { ExampleRestD } from "../common";
import { fromCommonIds } from "../commonIds";

import { onlySchema } from "../database/tableNames";
import { OverpaymentPageDD } from "./overpaymentHistory.dataD";

export const overpaymentHistoryRD: ExampleRestD = {
  params: { ...fromCommonIds ( 'clientRef', 'accountId', 'brandRef' ) },
  dataDD: OverpaymentPageDD,
  url: '/api/payment/overpayment/history?{query}',
  actions: [ 'get' ],
  resolvers: {
    'getOverpaymentPage': [
      {
        type: "manual", params: [ 'brandRef', { name: 'jurisdictionCode', type: 'output', javaType: 'String' } ], name: 'CalculateJurisdictionCode',
        code: [ 'String jurisdictionCode = brandRef == new Integer(10) ? "ROI": "GB";' ]
      },
      {
        type: 'sql', sql: 'select DATE from holidaytable where jurisdictionCode = ?',
        params: [ 'jurisdictionCode', { type: 'output', javaType: 'String', name: 'history', rsName: 'DATE' } ], name: 'getTheSql',
        schema: onlySchema
      } ]
  }
}