import { EAccountsSummaryDD, EAccountSummaryDD } from "./eAccountsSummary.dataD";
import { AccountIdDD, AllDataDD, CustomerIdDD, DataD, PrimitiveDD } from "../common/dataD";

export interface FetchDD<P extends FetchParamsDD> {
  dataDD: AllDataDD;
  params?: P;
}
export interface FetchParamsDD {
  [ name: string ]: PrimitiveDD
}
export const noParams: FetchParamsDD = {}
type NoParams = typeof noParams

export type FetchParams<Type> = {
  [Property in keyof Type]: string;
};

export const oneAccountSummaryParamsDD = {
  customerId: CustomerIdDD,
  accountId: AccountIdDD
}
export type OneAccountSummaryParamsDD = typeof oneAccountSummaryParamsDD
export const OneEAccountSummaryFetchD: FetchDD<OneAccountSummaryParamsDD> = {
  dataDD: EAccountSummaryDD,
  params: oneAccountSummaryParamsDD
}

export const summaryParamsDD = {
  accountId: AccountIdDD
}
export type SummaryParamsDD = typeof summaryParamsDD
export const EAccountsSummaryFetchD: FetchDD<SummaryParamsDD> = {
  dataDD: EAccountsSummaryDD,
  params: summaryParamsDD
}
