import { ExampleDataD, ExampleMainPage, ExampleRepeatingD, ExampleRestD } from "../common";
import { NatNumDd } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { AuthoriseChargesSummaryDataDD, AuthoriseChargesSummaryDD, OneBrandDD, SelectOneBrandDD, summaryOfChargesDateTableDD } from "./authoriseCharges.dataD";
import { fromCommonIds } from "../commonIds";
import { StringParam } from "../../common/restD";


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
  actions: [ 'get' ],
}

export const SummaryOfChargeDatesRD: ExampleRestD = {
  dataDD: summaryOfChargesDateTableDD,
  params: {
    ...fromCommonIds ( 'brandRef', 'clientRef' ),
    date: { ...StringParam, lens: '~/summaryOfChargesDates/date', testValue: '2022/12/1' }
  },
  url: "/api/charges/dates?{query}",
  actions: [ 'get', 'update' ],
}

