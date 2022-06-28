import { AllGuards } from "../../buttons/guardButton";
import { nameAndAddressDataD, postCodeSearchResponseDD } from "./addressSearch.dataD";
import { IntParam, RestD, RestParams, StringParam } from "../../common/restD";
import { addT, onlySchema, postCodeSearchTable } from "../database/tableNames";
import { allCommonIds } from "../commonIds";
import { addressSearchSql } from "./addressSearch.sql";

export const postcodeParams: RestParams = {
  dbName: { ...allCommonIds.dbName },
  postcode: { ...StringParam, lens: '~/postcode/search', testValue: 'LW12 4RG' }
}

export const rootPostCodeRestD: RestD<AllGuards> = {
  params: postcodeParams,
  dataDD: postCodeSearchResponseDD,
  url: '/api/postCode?{query}',
  actions: [ 'get' ],
}
export const postcodeRestD: RestD<AllGuards> = {
  ...rootPostCodeRestD,
  // insertSqlStrategy: { type: 'OneTableInsertSqlStrategyForNoIds', table: postCodeSearchTable },
  tables: {
    entity: {
      type: 'Main',
      table: postCodeSearchTable,
      idStrategy: {type: 'Manual', sql: addressSearchSql},
    },
    where: [
      { table: postCodeSearchTable, alias: postCodeSearchTable.name, field: 'PC_POSTCODE', paramName: 'postcode', comparator: 'like', paramPrefix: '%', paramPostfix: '%' }
    ]
  }
}
//This is here for test purposes
export const postcodeWithResolversRestD: RestD<AllGuards> = {
  ...rootPostCodeRestD,
  resolvers: {
    getPostCodeDataLine: [
      {
        type: 'manual', params: [ { type: "output", name: 'someValue', javaType: 'Integer' } ],
        code: 'Integer someValue= 123;', name: 'audit'
      },
      {
        type: 'sql', schema: onlySchema, sql: `select *` + `from ${postCodeSearchTable.name} where postcode like ?`, list: true,
        messageOnEmptyData: 'There was no result',
        params: [
          'someValue',
          { type: 'output', name: 'line1', javaType: 'String', rsName: 'zzline1' },
          { type: 'output', name: 'line2', javaType: 'String', rsName: 'zzline2' },
          { type: 'output', name: 'line3', javaType: 'String', rsName: 'zzline3' },
          { type: 'output', name: 'line4', javaType: 'String', rsName: 'zzline4' } ], name: 'get'
      } ]
  },
}

export const addressRestD: RestD<AllGuards> = {
  params: {},
  dataDD: nameAndAddressDataD,
  url: '/api/address?{query}',
  actions: [ 'createWithoutFetch' ],
  tables: {
    entity: { type: 'Main', table: addT, children: {} },
    where: []
  }
}
