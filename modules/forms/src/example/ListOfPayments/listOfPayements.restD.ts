import { ExampleDataD, ExampleRestD } from "../common";

import { AccountDetailsDD, CurrentPaymentCountsDD, postCodeSearchResponseDD, printRecordDD, PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { IntParam, RestD, RestParams, StringParam } from "../../common/restD";
import { clientAddress_C60T, clientNames_C10T, loanAppTable, onlySchema } from "../database/tableNames";
import { AllGuards } from "../../buttons/guardButton";
import { allCommonIds, fromCommonIds } from "../commonIds";
import { GuardedStoredProcedureMutation, MutationParamForStoredProc, OutputForSqlMutationParam } from "../../common/resolverD";
import { StringDD } from "../../common/dataD";

export const PrintRecordHistoryParams: RestParams = fromCommonIds ( 'accountId', 'vbAcountSeq', 'employeeId' )//vbAcountSeq,rbsMtAccount,newBankSeq,employeeId,

export const PrintRecordHistoryRD: ExampleRestD = {
  namePrefix: 'history',
  params: { ...PrintRecordHistoryParams, },
  dataDD: PrintRecordHistoryDD,
  url: '/api/printrecord/history?{query}',
  actions: [ 'get' ],
}

function ind ( name: string ): MutationParamForStoredProc {
  return { type: 'input', name, javaType: 'Boolean', format: { type: 'Boolean', true: 'Y', false: 'N' } }
}

function bankStuff ( guard: string[], packageName: string ): GuardedStoredProcedureMutation {
  return ({
    guard, type: 'storedProc', package: packageName, name: 'produce_list_of_payments', params: [
      'vbAcountSeq',
      'rbsMtAccount',
      'newBankSeq',
      'employeeId',
      ind ( 'so_ind' ),
      ind ( 'dd_ind' ),
      'sortcode',
      'accountNo',
      ind ( 'obso_ind' ),
      ind ( 'obbp_ind' ),
      { type: 'output', name: 'outputMessage', javaType: 'String', sqlType: 'VARCHAR', msgLevel: 'error' }
    ], schema: onlySchema
  })
}
function nonBankStuff ( guard: string, packageName: string ): GuardedStoredProcedureMutation {
  return ({
    guard: [ guard ], type: 'storedProc', package: packageName, name: 'produce_list_of_payments', params: [
      'vbAcountSeq',
      'rbsMtAccount',
      { type: 'null' },
      'employeeId',
      ind ( 'so_ind' ),
      ind ( 'dd_ind' ),
      { type: 'null' },
      { type: 'null' },
      'accountNo',
      ind ( 'obso_ind' ),
      ind ( 'obbp_ind' ),
      { type: 'output', name: 'outputMessage', javaType: 'String', sqlType: 'VARCHAR' }
    ], schema: onlySchema
  })
}
function stringOutputParams ( ...names: string[] ): OutputForSqlMutationParam[] {
  return names.map ( name => ({ type: 'output', javaType: 'String', name, rsName: name }) )
}
function booleanOutputParams ( ...names: string[] ): OutputForSqlMutationParam[] {
  return names.map ( name => ({ type: 'output', javaType: 'Boolean', name, rsName: name, format: { type: "Boolean", true: 'Y', false: 'N' } }) )
}
export const PrintRecordRD: ExampleRestD = {
  namePrefix: 'single',
  params: {
    ...PrintRecordHistoryParams,
    paymentId: { ...IntParam, lens: '~/display[~/selected]id', testValue: 888, main: true }
  },
  dataDD: printRecordDD,
  url: '/api/printrecord?{query}',
  actions: [ 'createWithoutFetch', 'updateWithoutFetch', { state: 'print' } ],
  states: {
    print: {
      url: '/api/print?{query}',
      params: { ...fromCommonIds ( 'vbAcountSeq', 'employeeId', 'employeeId', 'accountId' ), paymentId: { ...IntParam, lens: '~/display[~/selected]id', testValue: 888, main: true } }
    }
  },
  mutations: [
    {
      restAction: { state: 'print' },
      mutateBy: [
        {
          type: "sql", name: 'getParamsFromStoredStuff',
          sql: `select so_ind,
                       dd_ind,
                       bp_ind,
                       obso_ind,
                       obbp_ind,
                       sortcode,
                       fulfilmentType,
                       accountNo,
                       rbsMtAccount,
                       newBankSeq
                from the_table_that_holds_the_data
                where account_id = ?
                  and paymentId = ?`,
          params: [ 'accountId', 'paymentId',
            ...stringOutputParams ( 'sortcode', 'accountNo', 'requestByRole', 'rbsMtAccount', 'fulfilmentType', 'newBankSeq' ),
            ...booleanOutputParams ( 'so_ind', 'dd_ind', 'bp_ind', 'obso_ind', 'obbp_ind' )
          ],
          schema: onlySchema
        },
        {
          type: 'case', name: 'print',
          params: [ 'fulfilmentType', 'requestByRole', 'vbAcountSeq', 'rbsMtAccount', 'employeeId',
            { type: 'input', name: 'so_ind', javaType: 'Boolean', format: { type: "Boolean", false: '0', true: '1' } },
            ind ( 'dd_ind' ), ind ( 'bp_ind' ), ind ( 'obso_ind' ), ind ( 'obbp_ind' ), 'sortcode', 'accountNo', 'accountId', 'paymentId', 'newBankSeq' ],
          select: [
            bankStuff ( [ 'fulfilmentType.equals("BK")', 'requestByRole.equals("bank")' ], 'a10001' ),
            bankStuff ( [ 'fulfilmentType.equals("OA")', 'requestByRole.equals("bank")' ], 'b10001' ),
            bankStuff ( [ 'fulfilmentType.equals("OF")', 'requestByRole.equals("bank")' ], 'c10001' ),
            nonBankStuff ( 'fulfilmentType.equals("BK")', 'a10001' ),
            nonBankStuff ( 'fulfilmentType.equals("OA")', 'b10001' ),
            nonBankStuff ( 'fulfilmentType.equals("OF")', 'c10001' ),
          ]
        } ]
    },
    {
      restAction: 'createWithoutFetch', mutateBy: [ {
        type: 'case', params: [ 'accountId', { type: "input", name: 'bodyAsJson', javaType: 'Map<String,Object>' } ],
        select: [
          { guard: [], type: 'sql', params: [ 'accountId' ], schema: onlySchema, sql: 'insert sqlNoBank' },
          {
            guard: [], type: 'multiple', mutations:   [
              {
                type: 'sql', params: [
                  { type: 'input', javaType: 'Object', name: 'accountId', ifNull: ' ' },
                  { type: 'body', javaType: 'String', path: 'a.b', ifNull: ' ' },

                  { type: 'input', javaType: 'Object', name: 'accountId', ifNull: ' ', emptyStringCountsAsNull: true },

                  { type: 'body', javaType: 'String', path: 'a.b', ifNull: ' ', emptyStringCountsAsNull: true }
                ], schema: onlySchema, sql: 'insert sqlBank1'
              },
              { type: 'sql', params: [ 'accountId' ], schema: onlySchema, sql: 'insert sqlBank2' },
              { type: 'sql', params: [ 'accountId' ], schema: onlySchema, sql: 'insert sqlBank3' },
              { type: 'sql', params: [ 'accountId' ], schema: onlySchema, sql: 'insert sqlBank4' },
            ]
          }
        ],
        name: 'createWithoutFetch'
      }
      ]
    }

  ]
}


export const CurrentPaymentCountsRD: ExampleRestD = {
  params: PrintRecordHistoryParams,
  dataDD: CurrentPaymentCountsDD,
  url: '/api/paymentcounts?{query}',
  actions: [ 'get' ],
  resolvers: {
    getCurrentPaymentCounts: [
      {
        type: 'sql', name: 'get', schema: onlySchema, sql: 'someSql', params: [
          { type: 'output', javaType: 'Integer', rsName: 'xxx', name: 'standingOrders' },
          { type: 'output', javaType: 'Integer', rsName: 'yyy', name: 'directDebits' },
        ]
      } ]
  }
}

export const accountAndAddressDetailsRD: ExampleRestD = {
  params: {
    ...PrintRecordHistoryParams,
    ...fromCommonIds ( 'clientRef' )
  },
  dataDD: AccountDetailsDD,
  url: '/api/payment/accountDetails?{query}',
  actions: [ 'get' ],

  resolvers: {

    getFullName: {
      type: 'manual',
      params: [
        { type: 'fromParent', name: 'title', javaType: 'String' },
        { type: 'fromParent', name: 'forename', javaType: 'String' },
        { type: 'fromParent', name: 'surname', javaType: 'String' },
        { type: 'output', name: 'fullname', javaType: 'String' },
      ],
      code: `String fullname = title + " " + forename + " " + surname;`,
    },
  },
  tables: {
    entity: {
      type: 'Main',
      table: loanAppTable,
      useLeftJoin: true,
      staticWhere: `${loanAppTable.name}.ind='M'`,
      children: {
        secondayAppTable: {
          type: 'Single', filterPath: 'joint', table: loanAppTable, idInParent: 'client_ref', idInThis: 'client_ref', staticWhere: `secondayAppTable.ind='j'`, children: {
            joint: {
              table: clientNames_C10T, type: 'Single', idInParent: 'client_ref', idInThis: 'cliref',
              children: {
                jointAddress: { table: clientAddress_C60T, type: 'Single', idInParent: 'cliref', idInThis: 'cliref' }
              }
            }
          }
        },
        main: {
          table: clientNames_C10T, type: 'Single', idInParent: 'client_ref', idInThis: 'cliref',
          filterPath: 'main',
          children: {
            mainAddress: { table: clientAddress_C60T, type: 'Single', idInParent: 'cliref', idInThis: 'cliref' }
          }
        },
      }
    },
    where: [ { table: loanAppTable, alias: loanAppTable.name, field: 'client_ref', paramName: 'clientRef' } ]
  }
}
export const postcodeParams: RestParams = {
  dbName: { ...allCommonIds.dbName },
  postcode: { ...StringParam, lens: '~/addressSearch/postcode', testValue: 'LW12 4RG' }
}
export const postcodeRestD: RestD<AllGuards> = {
  params: postcodeParams,
  dataDD: postCodeSearchResponseDD,
  url: '/api/listOfPayments/postCode?{query}',
  actions: [ 'get' ],

}

export const sortCodeLookupDD: ExampleDataD = {
  description: "", name: "AddressLookup", structure: {
    bankName: { dataDD: StringDD, sample: [ 'Found bank 1', 'Found bank 2' ] }
  }
}

export const sortCodeLookupParams: RestParams = {
  dbName: { ...allCommonIds.dbName },
  sortcode: { ...StringParam, lens: '~/tempListOfPayments/newBankDetails/sortCode', testValue: 'LW12 4RG' }
}
export const sortcodeLookUpRD: RestD<AllGuards> = {
  params: sortCodeLookupParams,
  dataDD: sortCodeLookupDD,
  url: '/api/listOfPayments/sortcode?{query}',
  actions: [ 'get' ],

}