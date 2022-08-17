import { ExampleRestD } from "../common";
import { AuthoriseChargesSummaryDataDD, chargesSummaryDetailDD, ListOfChargesDD, SelectOneBrandDD, summaryOfChargesDateTableDD } from "./authoriseCharges.dataD";
import { fromCommonIds } from "../commonIds";
import { StringParam } from "../../common/restD";
import { authorisedChargesTableDD, onlySchema } from "../database/tableNames";


export const SelectOneBrandPageRD: ExampleRestD = {
  dataDD: SelectOneBrandDD,
  params: {},
  url: "/api/brand/list",
  actions: [ 'get' ],
}


export const AuthorisedChargesRD: ExampleRestD = {
  dataDD: ListOfChargesDD,
  params: {
    ...fromCommonIds ( 'brandRef', 'clientRef' ),
    date: { ...StringParam, lens: '~/authorisedCharges/date', testValue: '2022-12-1' }
  },
  url: "/api/charges/summary?{query}",
  actions: [ 'get', 'update' ],
  tables: {
    noDataIs404: true,
    entity: { table: authorisedChargesTableDD, alias: 'A', type: 'Main' },
    where: [ { table: authorisedChargesTableDD, alias: "A", field: 'date', comparator: 'sameday', paramName: 'date', pattern: 'dd-MM-yyyy' } ]
  }
}

export const SummaryOfChargeDatesRD: ExampleRestD = {
  dataDD: summaryOfChargesDateTableDD,
  params: {
    ...fromCommonIds ( 'brandRef', 'clientRef' ),
    date: { ...StringParam, lens: '~/summaryOfChargesDates/date', testValue: '2022-12-1' }
  },
  url: "/api/charges/dates?{query}",
  actions: [ 'get' ],
  resolvers: {
    getSummaryOfChargesDate: {
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
              type: 'sql', schema: onlySchema, sql: 'select something from somewhere', noDataIs404: true,  params: [
                { type: 'output', name: 'something', rsName: 'something', javaType: 'String' }
              ]
            },
            {
              type: 'sql', schema: onlySchema, sql: 'somesql',noDataIs404: true,  params: [ 'brandRef', 'something',
                { type: 'output', javaType: 'String', name: 'bob', rsName: 'bob' }
              ], list: true
            },
            { type: 'sql', schema: onlySchema, sql: 'insert something in audit file', params: 'brandRef' } ]
        },

      ]
    }
  }
}

export const SummaryOfChargesRD: ExampleRestD = {
  dataDD: chargesSummaryDetailDD,
  params: { date: { ...StringParam, lens: '~/summaryOfChargesDates/date', testValue: '1-6-2016' } },
  url: "/api/charges/details?{query}",
  actions: [ 'get' ],
  tables: {
    entity: { type: "Main", table: authorisedChargesTableDD, alias: 'A' },
    where: [ { table: authorisedChargesTableDD, alias: "A", field: 'date', comparator: 'sameday', pattern: 'dd/MM/yyyy', paramName: 'date' } ]
  }
}

export const SummaryOfChargesqRD: ExampleRestD = {
  dataDD: chargesSummaryDetailDD, //<--- has original data and editing data
  params: { date: { ...StringParam, lens: '~/summaryOfChargesDates/date', testValue: '1-6-2016' } },
  url: "/api/charges/details?{query}",
  actions: [ 'updateWithoutFetch' ],
  mutations: [
    {restAction: 'updateWithoutFetch', mutateBy: [
        {type: 'manual', code: `threeWayMerge.doit(connection, whoAmi, bodyAsJson)`, params:[
          'bodyAsJson', 'whoAmI'
          ]}
      ], autowired: {variableName: 'threeWayMerge', class: 'com.something.ThreeWayMerge', imports: true}
}]
}
