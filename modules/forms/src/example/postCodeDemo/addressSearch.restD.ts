import { AllGuards } from "../../buttons/guardButton";
import { nameAndAddressDataD, postCodeSearchResponseDD } from "./addressSearch.dataD";
import { IntParam, RestD, RestParams, StringParam } from "../../common/restD";
import { addT, postCodeSearchTable } from "../database/tableNames";
import { allCommonIds } from "../commonIds";
import { addressSearchSql } from "./addressSearch.sql";

export const postcodeParams: RestParams = {
  dbName: { ...allCommonIds.dbName },
  postcode: { ...StringParam, lens: '~/postcode/search', testValue: 'LW12 4RG' }
}

export const postcodeRestD: RestD<AllGuards> = {
  params: postcodeParams,
  dataDD: postCodeSearchResponseDD,
  url: '/api/postCode?{query}',
  actions: [ 'get' ],
  tables: {
    entity: {
      type: 'Main',
      table: postCodeSearchTable,
      idStrategy: {type: 'Manual', sql: addressSearchSql},
    },
    where: [
      { table: postCodeSearchTable, alias: postCodeSearchTable.name, field: 'PC_POSTCODE', paramName: 'postcode', comparator: 'like', paramPrefix: '%', paramPostfix: '%' }
    ]
  }
}

export const addressRestD: RestD<AllGuards> = {
  params: {},
  dataDD: nameAndAddressDataD,
  url: '/api/address?{query}',
  actions: [ 'create' ],
  tables: {
    entity: { type: 'Main', table: addT, children: {}
    },
    where: []
  }
}
