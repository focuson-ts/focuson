import { RestD } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { ETransferDataD } from "../eTransfers/eTransfers.dataD";
import { commonParams } from "../eTransfers/eTransfers.restD";
import { JointAccountCustomerDD, JointAccountDd } from "./jointAccount.dataD";
import { accountT, addT, customerT, nameT } from "../database/tableNames";


export const jointAccountRestD: RestD<AllGuards> = {
  params: { ...commonParams },
  dataDD: JointAccountDd,
  url: '/api/jointAccount?{query}',
  actions: [ 'get' ],
  resolver: {
    get: {
      type: 'sql',
      aliases: { account: accountT },
      where: { ids: [ 'account.id=<query.accountId>' ] }, //the <> reference params passed to the query. Perhaps we can do this cooler...}
      sql: [
        {//Looking at this I have no clue where it fits in the 'which sql blob is it in'. That's OK if I just express things in terms of alias.id = alias.id
          dataD: JointAccountDd.structure.main,
          aliases: { main: { table: customerT, name: 'cust' }, mainName: nameT },//demos that we can set the name of the alias
          where: { ids: [ 'account.main=main.id', 'mainName.id = account.main' ] }
        },
        {
          dataD: JointAccountDd.structure.joint,
          aliases: { joint: { table: customerT, name: 'cust' }, jointName: nameT },
          where: { ids: [ 'account.joint=joint.id', 'jointName.id = account.joint' ] }
        },
        {
          dataD: JointAccountCustomerDD.structure.addresses,
          aliases: { address: addT },
          where: { ids: [ 'address.id=[cust].id' ] }//This line is interesting because it is in a different sql query to the above.
        } ]
    }
  }
}

