import { RestD, RestParams } from "../../common/restD";
import { ChequeCreditbooksDD, ChequeCreditbooksHistoryDD, ChequeCreditbooksHistoryLineDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";

export const commonParams: RestParams = {
  brandRef: { commonLens: 'brandRef', testValue: 'brandRef'},
  applRef: { commonLens: 'applRef', testValue: 'appref'},
  customerId: { commonLens: 'customerId', testValue: 'custId'},
  accountId: { commonLens:  'accountId' , testValue: "accId" },
}

/** This should fully define the api*/
export const chequeCreditBooksRestD: RestD<AllGuards> = {
  params: commonParams,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get' , 'create'],
}