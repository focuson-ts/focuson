import { RestD } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { ETransferDataD } from "../eTransfers/eTransfers.dataD";
import { commonParams } from "../eTransfers/eTransfers.restD";
import { JointAccountCustomerDD, JointAccountDd } from "./jointAccount.dataD";
import { NameAnd } from "@focuson/utils";
import { OneDataDD } from "../../common/dataD";
import { accountT, addT, customerT, nameT } from "../database/tableNames";
import { DBTable, DBTableAndMaybeName, ResolverD } from "../../common/resolverD";

export interface GetSqlFromMainTableDetails {
  main: DBTableAndMaybeName;
  where: string;
}
export interface GetSqlFromChildTableDetails {
  data: OneDataDD<any>;
  aliases: NameAnd<DBTableAndMaybeName>;
  where: string
}
export interface SqlGetDetails {
  type: 'sql';
  aliases: NameAnd<DBTableAndMaybeName>;
  where: string;
  sql: GetSqlFromChildTableDetails[]
}
export interface SqlResolverD {
  get: SqlGetDetails;
}
export function isSqlResolverD ( r: ResolverD ): r is SqlResolverD {
  // @ts-ignore
  return r.get !== undefined
}


export const jointAccountRestD: RestD<AllGuards> = {
  params: { ...commonParams },
  dataDD: ETransferDataD,
  url: '/api/jointAccount?{query}',
  actions: [ 'get' ],
  resolver: {
    get: {
      type: 'sql',
      aliases: { account: accountT },
      where: '[account].id=<accountId>', //the <> reference params passed to the query. Perhaps we can do this cooler...}
      sql: [
        {
          data: JointAccountDd.structure.main,
          aliases: { main: { table: customerT, name: 'cust' }, mainName: nameT },//demos that we can set the name of the alias
          where: '[account].main=[main].id and [mainName].id = [account].main'
        },
        {
          data: JointAccountDd.structure.joint, aliases: { joint: { table: customerT, name: 'cust' }, jointName: nameT },
          where: '[account].main=[joint].id and [mainName].id = [account].joint'
        },
        {
          data: JointAccountCustomerDD.structure.addresses,
          aliases: { address: addT },
          where: '[address].id=[cust].id'
        } ]
    }
  }
}

// const inTheRestDWeHave: any = {
//   type: 'sqlMain',
//   // dataD: JointAccountDd, not needed because the restD 'knows' the dataD
//   tables: { main: 'ACC_TBL', where: 'ACC_TBL.id=<accountId>' } //the <> reference params passed to the query
// }
//
// //we can make this external. Easier to mess up. More clear in many ways because it is here and not scattered about
// //It is an error if there is a repeating structure not in here
// //It is an error if the aliases repeat a name in this data structure
// //Order in this list isn't important
// const jointAccount: any = [
//   { data: JointAccountDd.structure.main, aliases: { main: 'CUST_TBL', mainName: 'NAME_TBL' }, where: 'ACC_TBL.main=CUST_TBL.id and NAME_TBL.id = ACC_TBL.main' },
//   { data: JointAccountDd.structure.joint, aliases: { joint: 'CUST_TBL', jointName: 'NAME_TBL', where: 'ACC_TBL.main=CUST_TBL.id and NAME_TBL.id = ACC_TBL.joint' } },
//   { data: JointAccountCustomerDD.structure.addresses, aliases: { main: 'ADD_TBL' }, where: 'ADD_TBL.id={CUST_TBL}.id' }
// ]
//
//
