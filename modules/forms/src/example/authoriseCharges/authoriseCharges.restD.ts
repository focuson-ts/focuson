import { ExampleRestD } from "../common";
import { AuthoriseChargesSummaryDataDD, chargesSummaryDetailDD, SelectOneBrandDD, summaryOfChargesDateTableDD } from "./authoriseCharges.dataD";
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
  dataDD: AuthoriseChargesSummaryDataDD,
  params: {
    ...fromCommonIds ( 'brandRef', 'clientRef' ),
    date: { ...StringParam, lens: '~/authorisedCharges/date', testValue: '2022/12/1' }
  },
  url: "/api/charges/summary?{query}",
  actions: [ 'get', 'update' ],
  tables: {
    entity: {table: authorisedChargesTableDD, alias: 'A', type: 'Main'},
    where: [{table: authorisedChargesTableDD, alias: "A", field: 'date', comparator: 'sameday', paramName: 'date'}]
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
  params: {},
  url: "/api/charges/details?{query}",
  actions: [ 'get' ],
}

