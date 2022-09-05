import { ExampleRestD } from "../common";
import { ListOfChargesDD, operatorEligableDD, SelectOneBrandDD, summaryOfChargesDateTableDD } from "./authoriseCharges.dataD";
import { fromCommonIds } from "../commonIds";
import { StringParam } from "../../common/restD";
import { onlySchema } from "../database/tableNames";
import { AuthoriseCustomisation } from "./authoriseCharges.customise";


export function SelectOneBrandPageRD ( c: AuthoriseCustomisation ): ExampleRestD {
  return {
    dataDD: SelectOneBrandDD ( c ),
    params: {},
    namePrefix: c.namePrefix,
    url: `${c.urlPrefix}/brand/list`,
    actions: [ 'get' ],
  }
}


export function AuthorisedChargesRD ( c: AuthoriseCustomisation ): ExampleRestD {
  return {
    dataDD: ListOfChargesDD ( c ),
    params: {
      ...fromCommonIds ( 'brandRef', 'clientRef' ),
      date: { ...StringParam, lens: '~/authorisedCharges/date', testValue: '2022-12-1' }
    },
    url: `${c.urlPrefix}/charges/summary?{query}`,
    namePrefix: c.namePrefix,
    actions: [ 'get', 'update' ],
    tables: {
      noDataIs404: true,
      entity: { table: c.authoriseTable, alias: 'A', type: 'Main' },
      where: [ { table: c.authoriseTable, alias: "A", field: 'date', comparator: 'sameday', paramName: 'date', pattern: 'dd-MM-yyyy' } ]
    }
  }
}

export function SummaryOfChargeDatesRD ( c: AuthoriseCustomisation ): ExampleRestD {
  const result: ExampleRestD = {
    dataDD: summaryOfChargesDateTableDD ( c ),
    namePrefix: c.namePrefix,
    params: {
      ...fromCommonIds ( 'brandRef', 'clientRef' ),
      date: { ...StringParam, lens: '~/summaryOfChargesDates/date', testValue: '2022-12-1' }
    },
    url: `${c.urlPrefix}l/charges/dates?{query}`,
    actions: [ 'get' ],
    resolvers: {}
    // getSummaryOfChargesDate:
  }
  const name = `get${c.namePrefix}SummaryOfChargesDate`
  result.resolvers[ name ] = {
    type: 'case',
    name: 'getTheStuff',
    params: [ 'brandRef' ],
    list: true,
    select: [
      {
        guard: [], type: 'multiple', mutations: [
          {
            type: 'sql', schema: onlySchema, sql: 'select something from somewhere', params: [
              { type: 'output', name: 'something', rsName: 'something', javaType: 'String' }
            ]
          },
          {
            type: 'sql', schema: onlySchema, sql: 'somesql', params: [ 'brandRef', 'something',
              { type: 'output', javaType: 'String', name: 'bob', rsName: 'bob' }
            ], list: true
          },
          { type: 'sql', schema: onlySchema, sql: 'insert something in audit file', params: 'brandRef' } ]
      },
      {
        guard: [], type: 'sql', schema: onlySchema, sql: 'someOtherSql', params: [ 'brandRef',
          { type: 'output', javaType: 'String', name: 'bill', rsName: 'bil' },
          { type: 'output', javaType: 'String', name: 'bob', rsName: 'bob' }
        ], list: true
      },
      {
        guard: [], type: 'multiple', mutations: [
          {
            type: 'sql', schema: onlySchema, sql: 'select something from somewhere', params: [
              { type: 'output', name: 'something', rsName: 'something', javaType: 'String' }
            ]
          },
          {
            type: 'sql', schema: onlySchema, sql: 'somesql', params: [ 'brandRef', 'something',
              { type: 'output', javaType: 'String', name: 'bob', rsName: 'bob' }
            ], list: true
          },
          { type: 'sql', schema: onlySchema, sql: 'insert something in audit file', params: 'brandRef' } ]
      },
      {
        guard: [], type: 'multiple', mutations: [
          {
            type: 'sql', schema: onlySchema, sql: 'select something from somewhere', noDataIs404: true, params: [
              { type: 'output', name: 'something', rsName: 'something', javaType: 'String' }
            ]
          },
          {
            type: 'sql', schema: onlySchema, sql: 'somesql', noDataIs404: true, params: [ 'brandRef', 'something',
              { type: 'output', javaType: 'String', name: 'bob', rsName: 'bob' }
            ], list: true
          },
          { type: 'sql', schema: onlySchema, sql: 'insert something in audit file', params: 'brandRef' } ]
      },

    ]
  }
  return result
}


export function operatorEligabilityRD ( c: AuthoriseCustomisation ): ExampleRestD {
  const result: ExampleRestD = {
    params: { ...fromCommonIds('operatorName') },
    dataDD: operatorEligableDD,
    namePrefix: c.namePrefix,
    url: `${c.urlPrefix}/operatorEligability?{query}`,
    actions: [ 'get' ],
    resolvers: {}
  }
  result.resolvers = {}
  result.resolvers[ `get${c.namePrefix}OperatorEligability` ] = [
    {
      type: "sql", name: 'operatorEligability', schema: onlySchema, sql: 'select * from sometable', params: [
        'operatorName',
        { type: 'output', name: 'status', rsName: 'STATUS', javaType: 'String' },
        { type: 'output', name: 'workflowQueue', rsName: 'WORKFLOW_QUEUE', javaType: 'String' },
        { type: 'output', name: 'operName', rsName: 'OPER_NAME', javaType: 'String' },
      ], list: true
    },
    {
      type: 'manual', code: 'Map<String,Object> getOperatorEligability=params0.get(0);', params: [
        { type: 'input', name: 'params0', javaType: 'List<Map<String,Object>>' },
        { type: 'output', name: 'getOperatorEligability', javaType: 'Map<String,Object>' }
      ]
    }
  ]
  return result
}
