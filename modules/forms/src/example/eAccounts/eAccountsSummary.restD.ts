import { CreatePlanDD, EAccountsSummaryDD } from "./eAccountsSummary.dataD";
import { IntParam, RestD } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { onlySchema } from "../database/tableNames";
import { allCommonIds, commonIds, fromCommonIds } from "../commonIds";

export const eAccountsSummaryRestD: RestD<AllGuards> = {
  params: {
    ...commonIds,
    ...fromCommonIds ( 'dbName' ),
    clientRef: { ...IntParam, commonLens: 'clientRef', testValue: 666, main: true },
    employeeType: allCommonIds.employeeType
  },
  dataDD: EAccountsSummaryDD,
  url: '/api/accountsSummary?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', { state: 'invalidate' } ],
  states: {
    invalidate: { url: '/api/accountsSummary/invalidate?{query}', params: [ 'accountId', 'clientRef', 'employeeType', 'dbName' ] }
  },
  resolvers: {
    getEAccountsSummary: {
      type: 'manual', name: 'getEAccountsSummary',
      import: [ `import java.util.LinkedList;`, `import java.util.List;` ],
      params: [
        { type: 'output', name: 'useEStatements', javaType: 'Boolean' },
        { type: 'output', name: 'eAccountsTable', javaType: 'List<Map<String,Object>>' },
        { type: 'output', name: 'createPlan', javaType: 'Map<String,Object>' },
      ],
      code: [
        `Boolean useEStatements = false; List eAccountsTable = new LinkedList();`,
        `Map createPlan = new HashMap(); createPlan.put("createPlanStart", "");createPlan.put("createPlanDate", "");createPlan.put("createPlanEnd", "");`
      ]
    },
    totalMonthlyCost: { type: 'manual', code: [ 'Integer totalMonthlyCost = 123;' ], params: [ 'accountId', { type: 'output', name: 'totalMonthlyCost', javaType: 'Integer' } ], name: 'getTotalMonthlyCostStoredProc' },
    oneAccountBalance: { type: 'manual', code: [ 'Integer oneAccountBalance = 234;' ], params: [ 'accountId', { type: 'output', name: 'oneAccountBalance', javaType: 'Integer' } ], name: 'getOneAccountBalance' },
    currentAccountBalance: { type: 'manual', code: [ 'Integer currentAccountBalance = 345;' ], params: [ 'accountId', { type: 'output', name: 'currentAccountBalance', javaType: 'Integer' } ], name: 'getCurrentAccountBalance' }

  },
  access: [
    { restAction: { state: 'invalidate' }, condition: { type: 'in', param: 'employeeType', values: [ 'teamLeader' ] } }
  ],
  mutations: [
    { restAction: { state: 'invalidate' }, mutateBy: { type: 'storedProc', name: 'auditStuff', params: [ { type: 'string', value: 'someString' }, 'accountId', 'clientRef' ], schema: onlySchema } }
  ]
}
export const createPlanRestD: RestD<AllGuards> = {
  params: { ...commonIds, createPlanId: { ...IntParam, commonLens: 'createPlanId', testValue: 777, main: true } },
  dataDD: CreatePlanDD,
  url: '/api/createPlan?{query}',
  actions: [ 'get', 'create', 'update', 'delete' ],
}
