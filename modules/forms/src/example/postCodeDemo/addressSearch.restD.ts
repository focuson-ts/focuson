import { AllGuards } from "../../buttons/guardButton";
import { nameAndAddressDataD, postCodeSearchResponseDD } from "./addressSearch.dataD";
import { IntParam, RestD, RestParams } from "../../common/restD";
import { addT, postCodeSearchTable } from "../database/tableNames";
import { allCommonIds } from "../commonIds";
import { addressSearchSql } from "./addressSearch.sql";

export const postcodeParams: RestParams = {
  dbName: { ...allCommonIds.dbName },
  postcode: { ...IntParam, lens: '~/postcode/search', testValue: 'LW12 4RG' }
}

export const postcodeRestD: RestD<AllGuards> = {
  params: postcodeParams,
  dataDD: postCodeSearchResponseDD,
  url: '/api/postCode?{query}',
  actions: [ 'get' ],
  initialSql: addressSearchSql,
  tables: {
    entity: {
      type: 'Main',
      table: postCodeSearchTable
    },
    where: [
      { table: postCodeSearchTable, alias: postCodeSearchTable.name, field: 'PC_POSTCODE', paramName: 'postcode' }
    ]
  }

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
