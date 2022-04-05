import { AllGuards } from "../../buttons/guardButton";
import { nameAndAddressDataD, postCodeSearchResponse } from "./addressSearch.dataD";
import { IntParam, RestD, RestParams } from "../../common/restD";
import { addT } from "../database/tableNames";

export const postcodeParams: RestParams = {
  postcode: { ...IntParam, lens: '~/postcode/search', testValue: 'LW12 4RG' }
}

export const postcodeRestD: RestD<AllGuards> = {
  params: postcodeParams,
  dataDD: postCodeSearchResponse,
  url: '/api/postCode?{query}',
  actions: [ 'get' ],

}

export const addressRestD: RestD<AllGuards> = {
  params: {},
  dataDD: nameAndAddressDataD,
  url: '/api/address?{query}',
  actions: [ 'create' ],
  tables: {
    entity: { type: 'Main', table: addT, children: {} },
    where: []
  }
}
