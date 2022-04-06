import { commonParams } from "../eTransfers/eTransfers.restD";
import { JointAccountCustomerDD, JointAccountDd } from "./jointAccount.dataD";
import { accountT, addT, customerT, nameT } from "../database/tableNames";
import { IntParam, RestD, RestParams, StringParam } from "../../common/restD";

export const jointAccountParams: RestParams = {
  accountId: { ...IntParam, commonLens: 'accountId', testValue: 'custId' },
  brandId: { ...IntParam, commonLens: 'brandId', testValue: 'custId' }
}

export const jointAccountRestD: RestD<any> = {
  params: jointAccountParams,
  dataDD: JointAccountDd,
  url: '/api/jointAccount?{query}',
  actions: [ 'get' ],
  tables: {
    where: [
      { table: accountT, alias: accountT.name, field: 'acc_id', paramName: 'accountId' },
      { table: accountT, alias: accountT.name, field: 'brand_id', paramName: 'brandId' },
    ],
    entity: {
      type: 'Main',
      table: accountT,
      children: {
        mainCustomer: {
          type: 'Single',
          table: customerT,
          filterPath: 'main', //if it exists then we are into path filtering and only variables with this path get this data. This is a / separated path
          idInParent: 'mainCustomerId:integer',
          idInThis: 'id:integer',
          children: {
            mainAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInThis: "customerId", linkInData: { mapName: 'main', field: 'addresses', link: 'main_addresses'} },
            mainName: { type: 'Single', table: nameT, idInParent: 'nameId', idInThis: 'id' },
          }
        },
        jointCustomer: {
          type: 'Single',
          table: customerT,
          filterPath: 'joint',
          idInParent: 'jointCustomerId:integer', idInThis: 'id:integer',
          children: {
            jointAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInThis: "customerId", linkInData: { mapName: 'joint', field: 'addresses' , link: 'joint_addresses'} },
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


