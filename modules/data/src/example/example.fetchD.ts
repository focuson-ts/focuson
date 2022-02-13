import { EAccountsSummaryDD, EAccountSummaryDD } from "./example.dataD";
import { AccountIdDD, AllDataDD, DataD, PrimitiveDD } from "../common/dataD";

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
  customerId: AccountIdDD
}
export type OneAccountSummaryParamsDD = typeof oneAccountSummaryParamsDD
export const OneEAccountSummaryFetchD: FetchDD<OneAccountSummaryParamsDD> = {
  dataDD: EAccountSummaryDD,
  params: oneAccountSummaryParamsDD
}

export const EAccountsSummaryFetchD: FetchDD<NoParams> = {
  dataDD: EAccountsSummaryDD
}
