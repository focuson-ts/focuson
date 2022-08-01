import { ExampleRestD } from "../common";
import { AuthoriseChargesSummaryDataDD, chargesSummaryDetailDD, ListOfChargesDD, SelectOneBrandDD, summaryOfChargesDateTableDD } from "./authoriseCharges.dataD";
import { fromCommonIds } from "../commonIds";
import { StringParam } from "../../common/restD";
import { authorisedChargesTableDD } from "../database/tableNames";


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
    date: { ...StringParam, lens: '~/authorisedCharges/date', testValue: '2022/12/1' }
  },
  url: "/api/charges/summary?{query}",
  actions: [ 'get', 'update' ],
  tables: {
    entity: { table: authorisedChargesTableDD, alias: 'A', type: 'Main' },
    where: [ { table: authorisedChargesTableDD, alias: "A", field: 'date', comparator: 'sameday', paramName: 'date', pattern: 'dd/MM/yyyy' } ]
  }
}

export const SummaryOfChargeDatesRD: ExampleRestD = {
  dataDD: summaryOfChargesDateTableDD,
  params: {
    ...fromCommonIds ( 'brandRef', 'clientRef' ),
    date: { ...StringParam, lens: '~/summaryOfChargesDates/date', testValue: '2022/12/1' }
  },
  url: "/api/charges/dates?{query}",
  actions: [ 'get' ],
}

export const SummaryOfChargesRD: ExampleRestD = {
  dataDD: chargesSummaryDetailDD,
  params: { date: { ...StringParam, lens: '~/summaryOfChargesDates/date', testValue: '1/6/2016' } },
  url: "/api/charges/details?{query}",
  actions: [ 'get' ],
  tables: {
    entity: { type: "Main", table: authorisedChargesTableDD, alias: 'A' },
    where: [ { table: authorisedChargesTableDD, alias: "A", field: 'date', comparator: 'sameday', pattern: 'dd/MM/yyyy', paramName: 'date' } ]
  }
}

