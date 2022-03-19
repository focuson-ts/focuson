import { RestD } from "../../common/restD";
import { AllGuards } from "../../buttons/guardButton";
import { ETransferDataD } from "../eTransfers/eTransfers.dataD";
import { commonParams } from "../eTransfers/eTransfers.restD";
import { JointAccountCustomerDD, JointAccountDd } from "./jointAccount.dataD";
import { NameAnd, safeArray } from "@focuson/utils";
import { CompDataD, OneDataDD } from "../../common/dataD";
import { accountT, addT, customerT, nameT } from "../database/tableNames";
import { DBTable, DBTableAndMaybeName, ResolverD } from "../../common/resolverD";

export interface AliasAndWhere {
  aliases: NameAnd<DBTableAndMaybeName>;
  where: Where;
}

export interface SqlGetDetails extends AliasAndWhere {
  type: 'sql';
  aliases: NameAnd<DBTableAndMaybeName>;
  where: Where;
  sql: GetSqlFromDataDDetails[]
}
export interface GetSqlFromDataDDetails extends AliasAndWhere {
  data: OneDataDD<any>;
  aliases: NameAnd<DBTableAndMaybeName>;
  where: Where
}
export interface Where {
  ids: string[];
  other?: string[]
}

export function mergeWhere ( acc: Where, w: Where ) {return ({ ids: [ ...acc.ids, ...w.ids ], other: [ ...safeArray ( acc.other ), ...safeArray ( w.other ) ] })}
export function fieldsInWhere ( w: Where ): [ string, string ] [] {
  return w.ids.flatMap ( idEquals => {
    let result = idEquals.split ( '=' );
    if ( result.length != 2 ) throw Error ( `Erroneous id ${idEquals} has parts separated by equals of  ${result.length}, which should just be 2` )
    return [ [ idEquals, result[ 0 ] ], [ idEquals, result[ 1 ] ] ];
  } ).filter ( ( [ id, r ] ) => !r.match ( /^<[^>]*>$/g ) )
    .map ( ( [ idEquals, x ] ) => {
      let result = x.trim ();
      let match = result.match ( /^[A-Za-z0-9.[\]]*$/ )
      if ( !match ) throw Error ( `Erroneous id ${idEquals} has non alphabetic characters in it (${x})` )
      return [ idEquals, result ];
    } ).map ( ( [ idEquals, x ] ) => {
      const parts = x.split ( "." )
      if ( parts.length != 2 ) throw Error ( `Erroneous id [${idEquals}] part [${x}] is not in form a.b` )
      return [ parts[ 0 ], parts[ 1 ] ]
    } )
}

export function findGetSqlFromDataDDetails ( get: SqlGetDetails, d: CompDataD<any> ): AliasAndWhere {
  const found: GetSqlFromDataDDetails | undefined = get.sql.find ( s => s.data.dataDD === d )
  return found ? found : { aliases: get.aliases, where: get.where }
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
      where: { ids: [ 'account.id=<query.accountId>' ] }, //the <> reference params passed to the query. Perhaps we can do this cooler...}
      sql: [
        {//Looking at this I have no clue where it fits in the 'which sql blob is it in'. That's OK if I just express things in terms of alias.id = alias.id
          data: JointAccountDd.structure.main, aliases: { main: { table: customerT, name: 'cust' }, mainName: nameT },//demos that we can set the name of the alias
          where: { ids: [ 'account.main=main.id', 'mainName.id = account.main' ] }
        },
        {
          data: JointAccountDd.structure.joint, aliases: { joint: { table: customerT, name: 'cust' }, jointName: nameT },
          where: { ids: [ 'account.joint=joint.id', 'jointName.id = account.joint' ] }
        },
        {
          data: JointAccountCustomerDD.structure.addresses,
          aliases: { address: addT },
          where: { ids: [ 'address.id=[cust].id' ] }//This line is interesting because it is in a different sql query to the above.
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
