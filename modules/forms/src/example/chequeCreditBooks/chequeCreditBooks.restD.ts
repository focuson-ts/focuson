import { IntParam, RestD, RestParams } from "../../common/restD";
import { ChequeCreditbooksDD, ChequeCreditbooksHistoryDD, ChequeCreditbooksHistoryLineDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";

export const commonParams = {
  brandRef: { ...IntParam, commonLens: 'brandRef', testValue: 'brandRef' },
  applRef: { ...IntParam, commonLens: 'applRef', testValue: 'appref' },
  customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId' },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: "accId" },
}
 const typeCheckCommonParms: RestParams = commonParams

/** This should fully define the api*/
export const chequeCreditBooksRestD: any = {// RestD<AllGuards> = {
  params: commonParams,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', 'create' ],
  useStoredProcedure:{
    create: {procedureName: 'someProcName', params: [commonParams.customerId,commonParams.accountId]}
  }

}