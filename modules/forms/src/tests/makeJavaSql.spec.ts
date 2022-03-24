import { DBTableAndName } from "../common/resolverD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { jointAccountRestD } from "../example/jointAccount/jointAccount.restD";
import { NameAnd } from "@focuson/utils";
import { accountT, customerT } from "../example/database/tableNames";
import { fieldsInWhere, findAggMapPutStatementsFromPrimitives, findAggMapPutStatementsFromWheres, findAliasMapFor, findFieldsFor, findFieldsNeededFor, findParentChildAndAliases, findParentChildCompDataLinks, findSqlRoot, findTableAlias, findTableAndFields, findTableAndFieldsForSqlGetDetails, findTableAndFieldsIn, findWheresFor, FoundParentChildLink, makeAggregateMapsFor, makeCreateTableSql, makeGetSqlFor, makeSqlDataFor, simplifyAliasAndWhere, simplifyAliasMap, simplifyTableAndFieldAndAliasDataArray, simplifyTableAndFieldDataArray, simplifyTableAndFieldsData, SqlRoot, walkRoots, walkSqlData } from "../codegen/makeJavaSql";
import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { unique } from "../common/restD";
import { paramsForTest } from "./makeJavaResolvers.spec";

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
    const sqlRoot = findSqlRoot ( JointAccountDd, sqlG );
    expect ( sqlRoot.children.length == 2 )
    expect ( walkRoots ( sqlRoot, root =>
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
    ] )

  } )


  it ( "should findRoots", () => {
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), root =>
      ` ${root.data.name} ${simplifyAliasAndWhere ( root )}` ) ).toEqual ( [
      " JointAccount {'account':'ACC_TBL'} Wheres: {'ids':['account.id=<query.accountId>']}",
      " JointAccountAddresses {'account':'ACC_TBL','address':'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]}",
      " JointAccountAddresses {'account':'ACC_TBL','address':'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL'} Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]}"
    ] )
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
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), ( { data, aliases } ) =>
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
    ] )
  } )
} )

describe ( "find findFieldsNeededFor", () => {
  it ( "should returns the fields needed by the data under a sql root until the next sql root", () => {
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), findFieldsNeededFor )
      .map ( list => list.map ( ( { table, fieldData } ) => `${table.name}.${JSON.stringify ( fieldData ).replace ( /"/g, "'" )}` ) ) ).toEqual ( [
      [
        "ACC_TBL.{'fieldName':'blnc','reactType':'number','rsGetter':'getInt'}",
        "NAME_TBL.{'fieldName':'zzname','reactType':'string','rsGetter':'getString'}",
        "NAME_TBL.{'fieldName':'zzname','reactType':'string','rsGetter':'getString'}"
      ],
      [
        "ADD_TBL.{'fieldName':'zzline1','reactType':'string','rsGetter':'getString'}",
        "ADD_TBL.{'fieldName':'zzline2','reactType':'string','rsGetter':'getString'}"
      ],
      [
        "ADD_TBL.{'fieldName':'zzline1','reactType':'string','rsGetter':'getString'}",
        "ADD_TBL.{'fieldName':'zzline2','reactType':'string','rsGetter':'getString'}"
      ]
    ] )
  } )
} )

describe ( "findAliasMapFor", () => {
  it ( "should make aliasMaps for each root", () => {
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), root =>
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
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), root =>
      findWheresFor ( root, sqlG ) ).map ( w => JSON.stringify ( w ).replace ( /"/g, "'" ) ) ).toEqual ( [
      "{'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','account.joint=joint.id','jointName.id = account.joint'],'other':[]}",
      "{'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]}",
      "{'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]}"
    ] )
  } )

} )

describe ( "makeSqlDataFor", () => {
  it ( "should make sql data for each root", () => {
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), root =>
      makeSqlDataFor ( root, sqlG ) ).map ( ( { fields, wheres, aliasMap } ) =>
      `${fields.map ( ( { table, fieldData } ) => `${table.name}.${fieldData.fieldName}` )}, Wheres: ${JSON.stringify ( wheres )},  Aliases:${simplifyAliasMap ( aliasMap )}` )
      .map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "ACC_TBL.blnc,NAME_TBL.zzname,NAME_TBL.zzname, Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','account.joint=joint.id','jointName.id = account.joint'],'other':[]},  Aliases:{'account':'ACC_TBL.'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL.'NAME_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL.'NAME_TBL'}",
      "ADD_TBL.zzline1,ADD_TBL.zzline2, Wheres: {'ids':['account.id=<query.accountId>','account.main=main.id','mainName.id = account.main','address.id=[cust].id'],'other':[]},  Aliases:{'account':'ACC_TBL.'ACC_TBL','address':'ADD_TBL.'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL.'NAME_TBL'}",
      "ADD_TBL.zzline1,ADD_TBL.zzline2, Wheres: {'ids':['account.id=<query.accountId>','account.joint=joint.id','jointName.id = account.joint','address.id=[cust].id'],'other':[]},  Aliases:{'account':'ACC_TBL.'ACC_TBL','address':'ADD_TBL.'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL.'NAME_TBL'}"
    ] )
  } )
} )
describe ( "fieldsInWhere", () => {
  let root = findSqlRoot ( JointAccountDd, sqlG );
  const sqlDataRoot = makeSqlDataFor ( root, sqlG )
  const allRoots: SqlRoot[] = [ root, ...root.children ]
  const allData = allRoots.map ( r => makeSqlDataFor ( r, sqlG ) )

  it ( "should have a set up alias map - just checking test setup", () => {
    expect ( allData.map ( r => simplifyAliasMap ( r.aliasMap ) ) ).toEqual ( [
      "{'account':'ACC_TBL.'ACC_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL.'NAME_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL.'NAME_TBL'}",
      "{'account':'ACC_TBL.'ACC_TBL','address':'ADD_TBL.'ADD_TBL','main':'cust.'CUST_TBL','mainName':'NAME_TBL.'NAME_TBL'}",
      "{'account':'ACC_TBL.'ACC_TBL','address':'ADD_TBL.'ADD_TBL','joint':'cust.'CUST_TBL','jointName':'NAME_TBL.'NAME_TBL'}"
    ] )
  } )
  it ( 'should return the two sides of the equal from the ids', () => {
    expect ( allData.map ( d => simplifyTableAndFieldAndAliasDataArray ( fieldsInWhere ( d.aliasMap,
      { ids: [ 'account.one = mainName.two ', 'jointName.x= main.y ' ], other: [ 'ssdgjkflkgj&()^*76' ] } ) ) ) ).toEqual ( [
      [ "ACC_TBL account =>one", "NAME_TBL mainName =>two", "NAME_TBL jointName =>x", "CUST_TBL main =>y" ],
      [ "ACC_TBL account =>one", "NAME_TBL mainName =>two", "CUST_TBL main =>y" ],
      [ "ACC_TBL account =>one", "NAME_TBL jointName =>x" ]
    ] )
  } )
  it ( 'should allow data in the form of [cust].. which is a table name not an alias', () => {
    expect ( allData.map ( d => simplifyTableAndFieldAndAliasDataArray ( fieldsInWhere ( d.aliasMap,
      { ids: [ '[cust].one = [ACC_TBL].two ' ] } ) ) ) ).toEqual ( [
      [ "CUST_TBL main =>one", "CUST_TBL joint =>one", "ACC_TBL account =>two" ],
      [ "CUST_TBL main =>one", "ACC_TBL account =>two" ],
      [ "CUST_TBL joint =>one", "ACC_TBL account =>two" ]
    ] )
  } )
  it ( 'should ignores <> in ids', () => {
    expect ( allData.map ( d => simplifyTableAndFieldAndAliasDataArray ( fieldsInWhere ( d.aliasMap,
      { ids: [ 'account.one=jointName.two', 'mainName.x=<accountId>' ], other: [ 'ssdgjkflkgj&()^*76' ] } ) ) ) ).toEqual ( [
      [ "ACC_TBL account =>one", "NAME_TBL jointName =>two", "NAME_TBL mainName =>x" ],
      [ "ACC_TBL account =>one", "NAME_TBL mainName =>x" ],
      [ "ACC_TBL account =>one", "NAME_TBL jointName =>two" ]
    ] )
  } )
  it ( 'should throw an error if the ids have aliases that are not in the map', () => {
    expect ( () => fieldsInWhere ( sqlDataRoot.aliasMap, { ids: [ 'one two', 'a.x=<accountId>' ] } ) ).toThrow ( 'Erroneous id one two has parts separated by equals of  1, which should just be 2' )
    expect ( () => fieldsInWhere ( sqlDataRoot.aliasMap, { ids: [ 'one = two = three', 'a.x=<accountId>' ] } ) ).toThrow ( 'Erroneous id one = two = three has parts separated by equals of  3, which should just be 2' )
    expect ( () => fieldsInWhere ( sqlDataRoot.aliasMap, { ids: [ 'on*()e = two = thre&*e', 'a.x=<accountId>' ] } ) ).toThrow ( 'Erroneous id on*()e = two = thre&*e has parts separated by equals of  3, which should just be 2' )
  } )

} )
describe ( "findFieldsFor", () => {
  it ( "should prepare the fields for sql", () => {
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), root => makeSqlDataFor ( root, sqlG ) ).map ( findFieldsFor ).map ( simplifyTableAndFieldAndAliasDataArray ) ).toEqual ( [
      [
        "ACC_TBL account =>blnc",
        "NAME_TBL mainName =>zzname",
        "NAME_TBL jointName =>zzname",
        "ACC_TBL account =>id",
        "ACC_TBL account =>main",
        "CUST_TBL main =>id",
        "NAME_TBL mainName =>id",
        "ACC_TBL account =>joint",
        "CUST_TBL joint =>id",
        "NAME_TBL jointName =>id"
      ],
      [
        "ADD_TBL address =>zzline1",
        "ADD_TBL address =>zzline2",
        "ACC_TBL account =>id",
        "ACC_TBL account =>main",
        "CUST_TBL main =>id",
        "NAME_TBL mainName =>id",
        "ADD_TBL address =>id"
      ],
      [
        "ADD_TBL address =>zzline1",
        "ADD_TBL address =>zzline2",
        "ACC_TBL account =>id",
        "ACC_TBL account =>joint",
        "CUST_TBL joint =>id",
        "NAME_TBL jointName =>id",
        "ADD_TBL address =>id"
      ]
    ] )
  } )
} )
describe ( "findTableAliasFor", () => {
  it ( "should prepare the table/alias for sql", () => {
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), root => makeSqlDataFor ( root, sqlG ) ).map ( findTableAlias ) ).toEqual ( [
      "ACC_TBL account,CUST_TBL main,NAME_TBL mainName,CUST_TBL joint,NAME_TBL jointName",
      "ACC_TBL account,CUST_TBL main,NAME_TBL mainName,ADD_TBL address",
      "ACC_TBL account,CUST_TBL joint,NAME_TBL jointName,ADD_TBL address"
    ] )
  } )
} )
describe ( "makeGetSqlFor", () => {
  it ( "should generate actual sql", () => {
    expect ( walkRoots ( findSqlRoot ( JointAccountDd, sqlG ), root => makeSqlDataFor ( root, sqlG ) ).map ( makeGetSqlFor ) ).toEqual ( [
      [
        "select account.blnc as account_blnc,mainName.zzname as mainName_zzname,jointName.zzname as jointName_zzname,account.id as account_id,account.main as account_main,main.id as main_id,mainName.id as mainName_id,account.joint as account_joint,joint.id as joint_id,jointName.id as jointName_id",
        "from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,CUST_TBL joint,NAME_TBL jointName",
        "where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and account.joint=joint.id and jointName.id = account.joint"
      ],
      [
        "select address.zzline1 as address_zzline1,address.zzline2 as address_zzline2,account.id as account_id,account.main as account_main,main.id as main_id,mainName.id as mainName_id,address.id as address_id",
        "from ACC_TBL account,CUST_TBL main,NAME_TBL mainName,ADD_TBL address",
        "where account.id=<query.accountId> and account.main=main.id and mainName.id = account.main and address.id=main.id"
      ],
      [
        "select address.zzline1 as address_zzline1,address.zzline2 as address_zzline2,account.id as account_id,account.joint as account_joint,joint.id as joint_id,jointName.id as jointName_id,address.id as address_id",
        "from ACC_TBL account,CUST_TBL joint,NAME_TBL jointName,ADD_TBL address",
        "where account.id=<query.accountId> and account.joint=joint.id and jointName.id = account.joint and address.id=joint.id"
      ]
    ] )
  } )
} )


describe ( "findTableAndFields", () => {
  it ( "findTableAndFieldsIn(CompDataD) should find all the table and field data that are used by the CompDataD", () => {
    expect ( simplifyTableAndFieldDataArray ( findTableAndFieldsIn ( JointAccountDd ) ) ).toEqual ( [
      "ACC_TBL =>blnc",
      "NAME_TBL =>zzname",
      "ADD_TBL =>zzline1",
      "ADD_TBL =>zzline2"
    ] )
  } )
  it ( "findTableAndFieldsForSql(sqlG) should find all the table and field data that are used in the sqlG", () => {
    expect ( simplifyTableAndFieldDataArray ( findTableAndFieldsForSqlGetDetails ( sqlG ) ) ).toEqual ( [
      "ACC_TBL =>id",
      "ACC_TBL =>main",
      "CUST_TBL =>id",
      "NAME_TBL =>id",
      "ACC_TBL =>joint",
      "ADD_TBL =>id"
    ] )
  } )
  it ( "findTableAndFields(dataD sqlG) should find all the table and field data that are used in the dataD and  sqlG", () => {
    expect ( findTableAndFields ( JointAccountDd, sqlG ).map ( simplifyTableAndFieldsData ) ).toEqual ( [
      "ACC_TBL => id:number,main:number,joint:number,blnc:number",
      "CUST_TBL => id:number",
      "NAME_TBL => id:number,zzname:string",
      "ADD_TBL => id:number,zzline1:string,zzline2:string"
    ] )
  } )
} )

describe ( "makeCreate", () => {
  it ( "should make 'create table' sql", () => {
    expect ( makeCreateTableSql ( JointAccountDd, sqlG ) ).toEqual ( [
      "create table ACC_TBL(",
      "  id integer,",
      "  main integer,",
      "  joint integer,",
      "  blnc integer",
      ")",
      "",
      "create table CUST_TBL(",
      "  id integer",
      ")",
      "",
      "create table NAME_TBL(",
      "  id integer,",
      "  zzname varchar(256)",
      ")",
      "",
      "create table ADD_TBL(",
      "  id integer,",
      "  zzline1 varchar(256),",
      "  zzline2 varchar(256)",
      ")",
      ""
    ] )
  } )
} )

describe ( "makeAggMaps", () => {
  const data = makeSqlDataFor ( findSqlRoot ( JointAccountDd, sqlG ), sqlG )


  it ( "should findAggMapPutStatementsFromPrimitives", () => {
    expect ( walkSqlData ( data, '_s', ( data, suffix ) => {
      const foundChildAliasAndWheres: FoundParentChildLink[] = findParentChildCompDataLinks ( { includePrimitives: true, stopWithRepeatAsChild: true }, data.foundChildAliasAndWheres[ 0 ].parent )
      return findAggMapPutStatementsFromPrimitives ( foundChildAliasAndWheres, data.aliasMap ).map ( s => s.replace ( /"/g, "'" ) );
    } ) ).toEqual ( [
      [
        "account.put('balance', rs.getInt('account_blnc'));",
        "mainName.put('name', rs.getInt('mainName_zzname'));",
        "jointName.put('name', rs.getInt('jointName_zzname'));"
      ],
      [
        "address.put('line1', rs.getInt('address_zzline1'));",
        "address.put('line2', rs.getInt('address_zzline2'));"
      ],
      [
        "address.put('line1', rs.getInt('address_zzline1'));",
        "address.put('line2', rs.getInt('address_zzline2'));"
      ]
    ] )
  } )
  it ( "should findAggMapPutStatementsFromWheres", () => {
    expect ( walkSqlData ( data, '_s', ( data, suffix ) => findAggMapPutStatementsFromWheres ( data.wheres, data.aliasMap ).map ( s => s.replace ( /"/g, "'" ) ) ) ).toEqual ( [
      [
        "account.put('id', rs.getInt('account_id'));",
        "account.put('main', rs.getInt('account_main'));",
        "main.put('id', rs.getInt('main_id'));",
        "mainName.put('id', rs.getInt('mainName_id'));",
        "account.put('joint', rs.getInt('account_joint'));",
        "joint.put('id', rs.getInt('joint_id'));",
        "jointName.put('id', rs.getInt('jointName_id'));"
      ],
      [
        "account.put('id', rs.getInt('account_id'));",
        "account.put('main', rs.getInt('account_main'));",
        "main.put('id', rs.getInt('main_id'));",
        "mainName.put('id', rs.getInt('mainName_id'));",
        "address.put('id', rs.getInt('address_id'));"
      ],
      [
        "account.put('id', rs.getInt('account_id'));",
        "account.put('joint', rs.getInt('account_joint'));",
        "joint.put('id', rs.getInt('joint_id'));",
        "jointName.put('id', rs.getInt('jointName_id'));",
        "address.put('id', rs.getInt('address_id'));"
      ]
    ])
  } )
  it ( "should make the aggregate map classes", () => {
    expect ( walkSqlData ( data, '_s', ( data, suffix ) => makeAggregateMapsFor ( paramsForTest, JointAccountPageD, suffix, data ).map ( s => s.replace ( /"/g, "'" ) ) ) ).toEqual ( [
      [
        "package focuson.data.db;",
        "import java.sql.ResultSet;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.Map;",
        "",
        "public class AllJointAccount__s_Maps {",
        "  Map account = new HashMap();",
        "  Map main = new HashMap();",
        "  Map mainName = new HashMap();",
        "  Map joint = new HashMap();",
        "  Map jointName = new HashMap();",
        "  public AllJointAccount__s_Maps(ResultSet rs, List<AllJointAccount__s_0_Maps> aggMap0s, List<AllJointAccount__s_1_Maps> aggMap1s) throws SQLException {",
        "    account.put('balance', rs.getInt('account_blnc'));",
        "    mainName.put('name', rs.getInt('mainName_zzname'));",
        "    jointName.put('name', rs.getInt('jointName_zzname'));",
        "    account.put('id', rs.getInt('account_id'));",
        "    account.put('main', rs.getInt('account_main'));",
        "    main.put('id', rs.getInt('main_id'));",
        "    mainName.put('id', rs.getInt('mainName_id'));",
        "    account.put('joint', rs.getInt('account_joint'));",
        "    joint.put('id', rs.getInt('joint_id'));",
        "    jointName.put('id', rs.getInt('jointName_id'));",
        "  //found: 0 - JointAccountAddresses - JointAccountAddresses - [object Object]",
        "  //found: 1 - JointAccountAddresses - JointAccountAddresses - [object Object]",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db;",
        "import java.sql.ResultSet;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.Map;",
        "",
        "public class AllJointAccount__s_0_Maps {",
        "  Map account = new HashMap();",
        "  Map main = new HashMap();",
        "  Map mainName = new HashMap();",
        "  Map address = new HashMap();",
        "  public AllJointAccount__s_0_Maps(ResultSet rs) throws SQLException {",
        "    address.put('line1', rs.getInt('address_zzline1'));",
        "    address.put('line2', rs.getInt('address_zzline2'));",
        "    account.put('id', rs.getInt('account_id'));",
        "    account.put('main', rs.getInt('account_main'));",
        "    main.put('id', rs.getInt('main_id'));",
        "    mainName.put('id', rs.getInt('mainName_id'));",
        "    address.put('id', rs.getInt('address_id'));",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db;",
        "import java.sql.ResultSet;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.Map;",
        "",
        "public class AllJointAccount__s_1_Maps {",
        "  Map account = new HashMap();",
        "  Map joint = new HashMap();",
        "  Map jointName = new HashMap();",
        "  Map address = new HashMap();",
        "  public AllJointAccount__s_1_Maps(ResultSet rs) throws SQLException {",
        "    address.put('line1', rs.getInt('address_zzline1'));",
        "    address.put('line2', rs.getInt('address_zzline2'));",
        "    account.put('id', rs.getInt('account_id'));",
        "    account.put('joint', rs.getInt('account_joint'));",
        "    joint.put('id', rs.getInt('joint_id'));",
        "    jointName.put('id', rs.getInt('jointName_id'));",
        "    address.put('id', rs.getInt('address_id'));",
        "  }",
        "}"
      ]
    ])
  } )

} )

// describe("makeResultMapsFor", () =>{
// it ('should make a class full of maps for each sql root.', () =>{
//   expect ( walkRoots ( findRoots ( JointAccountDd, sqlG ), root => makeSqlDataFor ( root, sqlG ) ).map ( makeResultMapsFor ) ).toEqual ( [])
//     [
//
// })
//
// })
