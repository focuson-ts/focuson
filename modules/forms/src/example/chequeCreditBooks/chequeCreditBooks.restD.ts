import { IntParam, RestD, RestParams } from "../../common/restD";
import { ChequeCreditbooksDD, ChequeCreditbooksHistoryDD, ChequeCreditbooksHistoryLineDD } from "./chequeCreditBooks.dataD";
import { AllGuards } from "../../buttons/guardButton";
import { onlySchema } from "../database/tableNames";

export const commonParams = {
  brandRef: { ...IntParam, commonLens: 'brandRef', testValue: 'brandRef' },
  applRef: { ...IntParam, commonLens: 'applRef', testValue: 'appref' },
  customerId: { ...IntParam, commonLens: 'customerId', testValue: 'custId' },
  accountId: { ...IntParam, commonLens: 'accountId', testValue: "accId" },
}
const typeCheckCommonParms: RestParams = commonParams

/** This should fully define the api*/
export const chequeCreditBooksRestD: RestD<AllGuards> = {
  params: commonParams,
  dataDD: ChequeCreditbooksDD,
  url: '/api/chequeCreditBooks?{query}', //or maybe accountId={accountId}&customerId={customerId}
  actions: [ 'get', { state: 'create' } ], //do we need create?
  states: {
    create: { url: '/api/chequeCreditBooks/?{query}', useStoredProcedure: { schema: onlySchema, name: 'someProcName', params: [ 'customerId', 'accountId' ] } }
  }

}