import { RestD } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { ETransferDataD } from "../eTransfers/eTransfers.dataD";
import { commonParams } from "../eTransfers/eTransfers.restD";
import { JointAccountCustomerDD, JointAccountDd } from "./jointAccount.dataD";
import { NameAnd } from "@focuson/utils";
import { OneDataDD } from "../../common/dataD";

export interface GetSqlFromMainTableDetails {
  main: string;
  where: string;
}
export interface GetSqlFromChildTableDetails {
  data: OneDataDD<any>;
  aliases: NameAnd<string>;
  where: string

}
export interface SqlGetDetails {
  type: 'sql';
  table: GetSqlFromMainTableDetails;
  sql: GetSqlFromChildTableDetails[]
}
export interface SqlResolverD {
  get: SqlGetDetails;
}


export const jointAccountRestD: RestD<AllGuards> = {
  params: { ...commonParams },
  dataDD: ETransferDataD,
  url: '/api/jointAccount?{query}',
  actions: [ 'get' ],
  resolver: {
    get: {
      type: 'sql',
      table: { main: 'ACC_TBL', where: 'ACC_TBL.id=<accountId>' }, //the <> reference params passed to the query. Perhaps we can do this cooler...}
      sql: [
        { data: JointAccountDd.structure.main, aliases: { main: 'CUST_TBL', mainName: 'NAME_TBL' },    where: 'ACC_TBL.main=main.id and mainName.id = ACC_TBL.main' },
        { data: JointAccountDd.structure.joint, aliases: { joint: 'CUST_TBL', jointName: 'NAME_TBL' }, where: 'ACC_TBL.main=joint.id and jointName.id = ACC_TBL.joint' },
        { data: JointAccountCustomerDD.structure.addresses, aliases: { 'address_{CUST_TBL}': 'ADD_TBL' }, where: 'address_{CUST_TBL}.id={CUST_TBL}.id' } ]
    }
  }
}

const inTheRestDWeHave: any = {
  type: 'sqlMain',
  // dataD: JointAccountDd, not needed because the restD 'knows' the dataD
  tables: { main: 'ACC_TBL', where: 'ACC_TBL.id=<accountId>' } //the <> reference params passed to the query
}

//we can make this external. Easier to mess up. More clear in many ways because it is here and not scattered about
//It is an error if there is a repeating structure not in here
//It is an error if the aliases repeat a name in this data structure
//Order in this list isn't important
const jointAccount: any = [
  { data: JointAccountDd.structure.main, aliases: { main: 'CUST_TBL', mainName: 'NAME_TBL' }, where: 'ACC_TBL.main=CUST_TBL.id and NAME_TBL.id = ACC_TBL.main' },
  { data: JointAccountDd.structure.joint, aliases: { joint: 'CUST_TBL', jointName: 'NAME_TBL', where: 'ACC_TBL.main=CUST_TBL.id and NAME_TBL.id = ACC_TBL.joint' } },
  { data: JointAccountCustomerDD.structure.addresses, aliases: { main: 'ADD_TBL' }, where: 'ADD_TBL.id={CUST_TBL}.id' }
]


