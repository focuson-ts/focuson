import { DBTableAndMaybeName, DBTableAndName, findAliasMapFor, findFieldsFor, findFieldsNeededFor, findParentChildAndAliases, findParentChildCompDataLinks, findRoots, findTableNameOrAliasInAliasMap, findWheresFor, isDbTableAndName, makeSqlDataFor, makeSqlFor, simplifyAliasAndWhere, simplifyAliasMap } from "../common/resolverD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { AliasAndWhere, fieldsInWhere, jointAccountRestD } from "../example/jointAccount/jointAccount.restD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { accountT, customerT, nameT } from "../example/database/tableNames";

// @ts-ignore
const sqlG = jointAccountRestD.resolver.get;

describe ( "findParentChildLinks", () => {
  it ( "it find parent child links  of the comp data - all", () => {
    expect ( findParentChildCompDataLinks ( {}, JointAccountDd )
      .map ( ( { parent, nameAndOneDataDD, child } ) =>
        [ parent.name, nameAndOneDataDD?.[ 0 ], nameAndOneDataDD?.[ 1 ].dataDD?.name, child.name ] ) ).toEqual ( [
      [ "JointAccount", "main", "JointAccountCustomer", "JointAccountCustomer" ],
      [ "JointAccountCustomer", "addresses", "JointAccountAddresses", "JointAccountAddresses" ],
      [ "JointAccountAddresses", undefined, undefined, "JointAccountAddress" ],
      [ "JointAccount", "joint", "JointAccountCustomer", "JointAccountCustomer" ],
      [ "JointAccountCustomer", "addresses", "JointAccountAddresses", "JointAccountAddresses" ],
      [ "JointAccountAddresses", undefined, undefined, "JointAccountAddress" ]
    ] )
  } )
  it ( "it find parent child links  for each sql root", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( root =>
      findParentChildCompDataLinks ( { stopAtRepeat: true }, root.data )
        .map ( ( { parent, nameAndOneDataDD, child } ) =>
          `${parent.name}, ${nameAndOneDataDD?.[ 0 ]}, ${nameAndOneDataDD?.[ 1 ].dataDD?.name}, ${child.name} ` ) ) ).toEqual ( [
      [ "JointAccount, main, JointAccountCustomer, JointAccountCustomer ",
        "JointAccount, joint, JointAccountCustomer, JointAccountCustomer " ],
      [ "JointAccountAddresses, undefined, undefined, JointAccountAddress " ],
      [ "JointAccountAddresses, undefined, undefined, JointAccountAddress " ]
    ] )
  } )


  it ( "should find the alias maps - all", () => {
    // @ts-ignore
    let sqlG = jointAccountRestD.resolver.get;
    expect ( findParentChildAndAliases ( {}, JointAccountDd, sqlG ).map ( ( { parent, nameAndOneDataDD, child, aliasAndWhere } ) =>
      `${parent.name} ${nameAndOneDataDD?.[ 0 ]} ${nameAndOneDataDD?.[ 1 ]?.dataDD?.name} ${child.name} ${simplifyAliasAndWhere ( aliasAndWhere )}` ) ).toEqual ( [
      "JointAccount main JointAccountCustomer JointAccountCustomer {'account':'ACC_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main'],'other':[]}",
      "JointAccountCustomer addresses JointAccountAddresses JointAccountAddresses {'account':'ACC_TBL','address':'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]}",
      "JointAccountAddresses undefined undefined JointAccountAddress {'account':'ACC_TBL','address':'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]}",
      "JointAccount joint JointAccountCustomer JointAccountCustomer {'account':'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint'],'other':[]}",
      "JointAccountCustomer addresses JointAccountAddresses JointAccountAddresses {'account':'ACC_TBL','address':'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]}",
      "JointAccountAddresses undefined undefined JointAccountAddress {'account':'ACC_TBL','address':'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]}"
    ])

  } )


  it ( "should findRoots", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( ( root ) =>
      ` ${root.data.name} ${simplifyAliasAndWhere ( root )}` ) ).toEqual ( [
      " JointAccount {'account':'ACC_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
      " JointAccountAddresses {'account':'ACC_TBL','address':'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]}",
      " JointAccountAddresses {'account':'ACC_TBL','address':'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]}"
    ])
  } )
  it ( "should find the alias maps - start at main  stop at repeats, include primitives", () => {
    expect ( findParentChildAndAliases ( { stopAtRepeat: true, includePrimitives: true }, JointAccountDd, sqlG ).map ( ( { parent, nameAndOneDataDD, child, aliasAndWhere } ) =>
      `${parent.name} ${nameAndOneDataDD?.[ 0 ]} ${nameAndOneDataDD?.[ 1 ]?.dataDD?.name} ${child.name} ${simplifyAliasAndWhere ( aliasAndWhere )}` ) ).toEqual ( [
      "JointAccount balance Money Money {'account':'ACC_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
      "JointAccount main JointAccountCustomer JointAccountCustomer {'account':'ACC_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main'],'other':[]}",
      "JointAccountCustomer name OneLineString OneLineString {'account':'ACC_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main'],'other':[]}",
      "JointAccount joint JointAccountCustomer JointAccountCustomer {'account':'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint'],'other':[]}",
      "JointAccountCustomer name OneLineString OneLineString {'account':'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint'],'other':[]}"
    ] )
  } )
  it ( "should find the alias maps - for each child root, include primitives, stop at repeats", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( ( { data, aliases } ) =>
      findParentChildAndAliases ( { stopAtRepeat: true, includePrimitives: true }, data, sqlG, aliases )
        .map ( ( { parent, nameAndOneDataDD, child, aliasAndWhere } ) =>
          `${parent.name} ${nameAndOneDataDD?.[ 0 ]} ${nameAndOneDataDD?.[ 1 ]?.dataDD?.name} ${child.name} ${simplifyAliasAndWhere ( aliasAndWhere )}` ) ) ).toEqual ( [
      [
        "JointAccount balance Money Money {'account':'ACC_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
        "JointAccount main JointAccountCustomer JointAccountCustomer {'account':'ACC_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main'],'other':[]}",
        "JointAccountCustomer name OneLineString OneLineString {'account':'ACC_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main'],'other':[]}",
        "JointAccount joint JointAccountCustomer JointAccountCustomer {'account':'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint'],'other':[]}",
        "JointAccountCustomer name OneLineString OneLineString {'account':'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint'],'other':[]}"
      ],
      [
        "JointAccountAddresses undefined undefined JointAccountAddress {'account':'ACC_TBL','address':'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
        "JointAccountAddress line1 OneLineString OneLineString {'account':'ACC_TBL','address':'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
        "JointAccountAddress line2 OneLineString OneLineString {'account':'ACC_TBL','address':'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}"
      ],
      [
        "JointAccountAddresses undefined undefined JointAccountAddress {'account':'ACC_TBL','address':'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
        "JointAccountAddress line1 OneLineString OneLineString {'account':'ACC_TBL','address':'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
        "JointAccountAddress line2 OneLineString OneLineString {'account':'ACC_TBL','address':'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}"
      ]
    ])
  } )
} )

describe ( "find findFieldsNeededFor", () => {
  it ( "should returns the fields needed by the data under a sql root until the next sql root", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( findFieldsNeededFor )
      .map ( list => list.map ( ( { table, field } ) => `${table.name}.${field}` ) ) )
      .toEqual ( [
        [ "ACC_TBL.blnc", "NAME_TBL.zzname", "NAME_TBL.zzname" ],
        [ "ADD_TBL.zzline1", "ADD_TBL.zzline2" ],
        [ "ADD_TBL.zzline1", "ADD_TBL.zzline2" ]
      ] )
  } )
} )

describe ( "findAliasMapFor", () => {
  it ( "should make aliasMaps for each root", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( root =>
      Object.entries ( findAliasMapFor ( root, sqlG ) ).map ( ( [ n, d ] ) =>
        `${n} => {${d.name},${d.table.name}}` ).join ( ',' ) ) ).toEqual ( [
      "account => {ACC_TBL,ACC_TBL},main => {cust,CUST_TBL},mainName => {NAME_TBL,NAME_TBL},joint => {cust,CUST_TBL},jointName => {NAME_TBL,NAME_TBL}",
      "account => {ACC_TBL,ACC_TBL},main => {cust,CUST_TBL},mainName => {NAME_TBL,NAME_TBL},address => {ADD_TBL,ADD_TBL}",
      "account => {ACC_TBL,ACC_TBL},joint => {cust,CUST_TBL},jointName => {NAME_TBL,NAME_TBL},address => {ADD_TBL,ADD_TBL}"
    ] )
  } )

} )
describe ( "findWheresFor", () => {
  it ( "should make wheres for each root", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( root =>
      findWheresFor ( root, sqlG ) ).map ( w => JSON.stringify ( w ).replace ( /"/g, "'" ) ) ).toEqual ( [
      "{'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','account.joint=joint.id','jointName.id = account.joint'],'other':[]}",
      "{'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]}",
      "{'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]}"
    ] )
  } )

} )

describe ( "makeSqlDataFor", () => {
  it ( "should make sql data for each root", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( root =>
      makeSqlDataFor ( root, sqlG ) ).map ( ( { fields, wheres, aliasMap } ) =>
      `${fields.map ( ( { table, field } ) => `${table.name}.${field}` )}, Wheres: ${JSON.stringify ( wheres )},  Aliases:${simplifyAliasMap ( aliasMap )}` )
      .map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "ACC_TBL.blnc,NAME_TBL.zzname,NAME_TBL.zzname, Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','account.joint=joint.id','jointName.id = account.joint'],'other':[]},  Aliases:{'account':'ACC_TBL.'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL.'NAME_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL.'NAME_TBL'}",
      "ADD_TBL.zzline1,ADD_TBL.zzline2, Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]},  Aliases:{'account':'ACC_TBL.'ACC_TBL','address':'ADD_TBL.'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL.'NAME_TBL'}",
      "ADD_TBL.zzline1,ADD_TBL.zzline2, Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]},  Aliases:{'account':'ACC_TBL.'ACC_TBL','address':'ADD_TBL.'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL.'NAME_TBL'}"
    ] )
  } )
} )
describe ( "fieldsInWhere", () => {
  it ( 'should return the two sides of the equal from the ids', () => {
    expect ( fieldsInWhere ( { ids: [ 'a.one=b.two ', 'a.x= b.y ' ], other: [ 'ssdgjkflkgj&()^*76' ] } ) ).toEqual ( [
      [ "a", "one" ],
      [ "b", "two" ],
      [ "a", "x" ],
      [ "b", "y" ]
    ] )
  } )
  it ( 'should ignores <> in ids', () => {
    expect ( fieldsInWhere ( { ids: [ 'a.one=b.two', 'a.x=<accountId>' ], other: [ 'ssdgjkflkgj&()^*76' ] } ) ).toEqual ( [
      [ "a", "one" ],
      [ "b", "two" ],
      [ "a", "x" ]
    ] )
  } )
  it ( 'should throw an error if the ids are malformed', () => {
    expect ( () => fieldsInWhere ( { ids: [ 'one two', 'a.x=<accountId>' ] } ) ).toThrow ( 'Erroneous id one two has parts separated by equals of  1, which should just be 2' )
    expect ( () => fieldsInWhere ( { ids: [ 'one = two = three', 'a.x=<accountId>' ] } ) ).toThrow ( 'Erroneous id one = two = three has parts separated by equals of  3, which should just be 2' )
    expect ( () => fieldsInWhere ( { ids: [ 'on*()e = two = thre&*e', 'a.x=<accountId>' ] } ) ).toThrow ( 'Erroneous id on*()e = two = thre&*e has parts separated by equals of  3, which should just be 2' )
  } )

} )
describe ( "findTableNameOrAliasInAliasMap", () => {
  const aliasMap: NameAnd<DBTableAndName> = {
    aliasForAccount: { table: accountT, name: 'someName' },
    main: { table: customerT, name: 'cust' },

  }
  it ( "should replace tablenames/field with alias.field when there is a table", () => {
    expect ( findTableNameOrAliasInAliasMap ( aliasMap ) ( [ accountT.name, 'someField' ] ) ).toEqual ( 'aliasForAccount.someField' )
  } )
  it ( "should replace leave the alias alone if the alias exists", () => {
    expect ( findTableNameOrAliasInAliasMap ( aliasMap ) ( [ 'aliasForAccount', 'someField' ] ) )
      .toEqual ( 'aliasForAccount.someField' )
  } )
  it ( "should replace [alias] with the correct alias: based on the table name", () => {
    expect ( findTableNameOrAliasInAliasMap ( aliasMap ) ( [ '[cust]', 'someField' ] ) )
      .toEqual ( 'main.someField' )
  } )
} )
describe ( "findFieldsFor", () => {
  it ( "should prepare the fields for sql", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( root => makeSqlDataFor ( root, sqlG ) ).map ( findFieldsFor ) ).toEqual ( [
      "account.blnc,mainName.zzname,account.id,account.main,main.id,mainName.id,account.joint,joint.id,jointName.id",
      "address.zzline1,address.zzline2,account.id,account.main,main.id,mainName.id,address.id",
      "address.zzline1,address.zzline2,account.id,account.joint,joint.id,jointName.id,address.id"
    ] )
  } )
} )
describe ( "makeSql", () => {
  it ( "should generate actual sql", () => {
    expect ( findRoots ( JointAccountDd, sqlG ).map ( root => makeSqlDataFor ( root, sqlG ) ).map ( makeSqlFor ) ).toEqual ( [
      "select account.blnc,mainName.zzname,account.id,account.main,main.id,mainName.id,account.joint,joint.id,jointName.id",
      "select address.zzline1,address.zzline2,account.id,account.main,main.id,mainName.id,address.id",
      "select address.zzline1,address.zzline2,account.id,account.joint,joint.id,jointName.id,address.id"
    ] )
  } )
} )


//
// describe ( "findSqlFragmentsAndAliasMap", () => {
//   it ( "should find the clumps of sql that can be grouped together and their alias map ", () => {
//     let resolver = jointAccountRestD.resolver;
//     if ( !isSqlResolverD ( resolver ) ) throw new Error ();
//     expect ( findSqlFragmentsAndAliasMap ( JointAccountDd, resolver.get ) ).toEqual ( [] )
//
//   } )
// } )


// describe ( "makeGraphQlResultMaps", () => {
//     it ( "should generate the java code for the maps structure ", () => {
//       expect ( makeGraphQlResultMaps ( 'someName', findParentChildCompDataLinks ( occupationAndIncomeFullDomainDD, { includePrimitives: false, stopAtResolvers: false } ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
//         "public static class someName {",
//         "  public final Map OccupationAndIncomeFullDomain = new HashMap();",
//         "  public final Map CustomerOccupationIncomeDetails = new HashMap();",
//         "  public final Map OneOccupationIncomeDetails = new HashMap();",
//         "  OccupationAndIncomeFullDomain.put('CustomerOccupationIncomeDetails', CustomerOccupationIncomeDetails);",
//         "  CustomerOccupationIncomeDetails.put('OneOccupationIncomeDetails', OneOccupationIncomeDetails);",
//         "}"
//       ] )
//     } )
//   }
// )
