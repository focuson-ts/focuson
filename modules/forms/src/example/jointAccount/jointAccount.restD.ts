import { JointAccountDd } from "./jointAccount.dataD";
import { accountT, addT, customerT, nameT } from "../database/tableNames";
import { RestParams } from "../../common/restD";
import { jointAccountSql } from "./jointAccount.sql";
import { fromCommonIds } from "../commonIds";
import { ExampleRestD } from "../common";

export const jointAccountParams: RestParams = fromCommonIds ( 'accountId', 'brandRef', 'dbName' )
export const jointAccountForResolverTablesRestD: ExampleRestD = {
  params: jointAccountParams,
  dataDD: JointAccountDd,
  url: '/api/jointAccount?{query}',
  actions: [ 'get' ],
  namePrefix: 'pre',
  resolvers: {
    getpreJointAccount: {
      type: 'autosql',
      staticWhere: '123=123',
      where: [
        { table: accountT, alias: 'j', field: 'acc_id', paramName: 'accountId' },
        { table: accountT, alias: 'j', field: 'brand_id', paramName: 'brandRef' },
      ],
      orderBy: [ 'mainCustomer.nameId' ],
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
  }
}

/** This is the 'old' way of doing tables and we are keeping it around for legacy reasons */
export const jointAccountRestD: ExampleRestD = {
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
    orderBy: [ 'mainCustomer.nameId' ],
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
}

