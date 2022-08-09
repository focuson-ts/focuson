import { JointAccountDd } from "./jointAccount.dataD";
import { accountT, addT, customerT, nameT } from "../database/tableNames";
import { RestD, RestParams } from "../../common/restD";
import { jointAccountSql } from "./jointAccount.sql";
import { fromCommonIds } from "../commonIds";

export const jointAccountParams: RestParams = fromCommonIds ( 'accountId', 'brandRef', 'dbName' )
export const jointAccountRestD: RestD<any> = {
  params: jointAccountParams,
  dataDD: JointAccountDd,
  url: '/api/jointAccount?{query}',
  actions: [ 'get' ],
  namePrefix: 'pre',
  tables: {
    staticWhere: '123=123',
    where: [
      { table: accountT, alias: 'j', field: 'acc_id', paramName: 'accountId' },
      { table: accountT, alias: 'j', field: 'brand_id', paramName: 'brandRef' },
    ],
    orderBy: ['mainCustomer.nameId'],
    noDataIs404: true,
    entity: {
      type: 'Main',
      table: accountT,
      alias: 'j',
      staticWhere: `${accountT.name} <> 'canceled'`,
      idStrategy: { type: 'Manual', sql: jointAccountSql },
      children: {
        mainCustomer: {
          type: 'Single',
          table: customerT,
          staticWhere: '1=1',
          filterPath: 'main', //if it exists then we are into path filtering and only variables with this path get this data. This is a / separated path
          idInParent: 'mainCustomerId:integer',
          idInThis: 'id:integer',
          children: {
            mainAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInThis: "customerId", staticWhere: '2=2' },
            mainName: { type: 'Single', table: nameT, idInParent: 'nameId', idInThis: 'id', staticWhere: '3=3' },
          }
        },
        jointCustomer: {
          type: 'Single',
          table: customerT,
          filterPath: 'joint',
          idInParent: 'jointCustomerId:integer', idInThis: 'id:integer',
          children: {
            jointAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInThis: "customerId" },
            jointName: { type: 'Single', table: nameT, idInParent: 'nameId', idInThis: 'id' },
          }
        }
      }
    }
  }





  //
  // resolver: {
  //   get: {
  //     type: 'sql',
  //     aliases: { account: accountT },
  //     where: { ids: [ 'account.id=<query.accountId>' ] }, //the <> reference params passed to the query. Perhaps we can do this cooler...}
  //     sql: [
  //       {//Looking at this I have no clue where it fits in the 'which sql blob is it in'. That's OK if I just express things in terms of alias.id = alias.id
  //         dataD: JointAccountDd.structure.main,
  //         aliases: { main: { table: customerT, name: 'cust' }, mainName: nameT },//demos that we can set the name of the alias
  //         where: { ids: [ 'account.main=main.id', 'mainName.id = account.main' ] }
  //       },
  //       {
  //         dataD: JointAccountDd.structure.joint,
  //         aliases: { joint: { table: customerT, name: 'cust' }, jointName: nameT },
  //         where: { ids: [ 'account.joint=joint.id', 'jointName.id = account.joint' ] }
  //       },
  //       {
  //         dataD: JointAccountCustomerDD.structure.addresses,
  //         aliases: { address: addT },
  //         where: { ids: [ 'address.id=[cust].id' ] }//This line is interesting because it is in a different sql query to the above.
  //       } ]
  //   }
}


