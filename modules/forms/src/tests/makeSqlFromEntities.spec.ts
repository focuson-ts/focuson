import { accountT, addT, customerT, nameT } from "../example/database/tableNames";
import { ChildEntity, EntityFolder, findAliasAndTableLinksForLinkData, findAllFields, findFieldsFromWhere, findSqlLinkDataFromRootAndDataD, findSqlRoots, findTableAliasAndFieldFromDataD, findTableAndFieldFromDataD, findWhereLinkDataForLinkData, findWhereLinksForSqlRoot, findWhereLinksForSqlRootGoingUp, foldEntitys, generateGetSql, MainEntity, MultipleEntity, simplifyAliasAndChildEntityPath, simplifyAliasAndTables, simplifySqlLinkData, simplifySqlRoot, simplifyTableAliasAndFields, simplifyWhereFromQuery, simplifyWhereLinks, SingleEntity, walkSqlRoots } from "../codegen/makeSqlFromEntities";
import { EntityAndWhere, RestD, unique } from "../common/restD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { simplifyTableAndFields } from "../codegen/makeJavaSql";
import { postCodeDataLineD } from "../example/postCodeDemo/addressSearch.dataD";
import { postcodeRestD } from "../example/postCodeDemo/addressSearch.restD";

const mainEntity: MainEntity = {
  type: 'Main',
  table: accountT,
  children: {
    mainCustomer: {
      type: 'Single',
      table: customerT,
      idInParent: 'mainCustomerId:number',
      idInThis: 'id:number',
      children: {
        mainAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInThis: "customerId" },
        mainName: { type: 'Single', table: nameT, idInParent: 'nameId', idInThis: 'id' },
      }
    },
    jointCustomer: {
      type: 'Single',
      table: customerT,
      idInParent: 'jointCustomerId:number', idInThis: 'id:number',
      children: {
        jointAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInThis: "customerId" },
        jointName: { type: 'Single', table: nameT, idInParent: 'nameId', idInThis: 'id' },
      }
    },
  }
}
const theRestD: RestD<any> = {
  dataDD: JointAccountDd,
  actions: [ 'get' ],
  url: "/some/url/not user",
  params: {
    accountId: { commonLens: 'customerId', testValue: 'theCustId' }, //Note that these are used in many places.. so we have to bind them somewhere else
    brandId: { commonLens: 'accountId', testValue: 'theBrandId' }
  },
  tables: {
    entity: mainEntity,
    where: [
      { table: accountT, alias: accountT.name, field: 'acc_id', paramName: 'accountId' },
      { table: accountT, alias: accountT.name, field: 'brand_id', paramName: 'brandId' },
    ]
  },
}


describe ( "EntityFolder", () => {
  it ( "should walk all the nodes", () => {
    const testFolder: EntityFolder<string[]> = {
      foldMain ( childAcc: string[][], main: EntityAndWhere ): string[] {return [ ...childAcc.flat (), `main: ${main.entity.table.name} where: ${simplifyWhereFromQuery ( main.where )}` ]},
      foldMultiple ( childAcc: string[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): string[] {
        return [ ...childAcc.flat (), `multiple ${main.entity.table.name} path ${simplifyAliasAndChildEntityPath ( path )} => ${multiple.table.name}` ]
      },
      foldSingle ( childAcc: string[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): string[] {
        return [ ...childAcc.flat (), `single ${main.entity.table.name} path ${simplifyAliasAndChildEntityPath ( path )} => ${single.table.name}` ]
      },
    }
    expect ( foldEntitys ( testFolder, theRestD.tables, theRestD.tables.entity, [] ) ).toEqual ( [
      "multiple ACC_TBL path [mainCustomer -> CUST_TBL] => ADD_TBL",
      "single ACC_TBL path [mainCustomer -> CUST_TBL] => NAME_TBL",
      "single ACC_TBL path [] => CUST_TBL",
      "multiple ACC_TBL path [jointCustomer -> CUST_TBL] => ADD_TBL",
      "single ACC_TBL path [jointCustomer -> CUST_TBL] => NAME_TBL",
      "single ACC_TBL path [] => CUST_TBL",
      "main: ACC_TBL where: ACC_TBL:ACC_TBL.acc_id==accountId , ACC_TBL:ACC_TBL.brand_id==brandId "
    ] )
  } )
} )

describe ( "findSqlRoots", () => {
  it ( "should find a root for the main and each multiple", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), simplifySqlRoot ) ).toEqual ( [
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL]}",
      "main ACC_TBL path [mainCustomer -> CUST_TBL] root ADD_TBL children []}",
      "main ACC_TBL path [jointCustomer -> CUST_TBL] root ADD_TBL children []}"
    ] )
  } )
} )

describe ( "findAliasAndTablesLinksForLinkDataFolder", () => {
  it ( "should generate aliasAndTables", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyAliasAndTables ( findAliasAndTableLinksForLinkData ( r ) ) ) ).toEqual ( [
      "mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL,ACC_TBL->ACC_TBL",
      "mainAddress->ADD_TBL",
      "jointAddress->ADD_TBL"
    ] )
  } )
} )
describe ( "findWhereLinkDataForLinkData", () => {
    it ( "should generate  findWhereLinkDataForLinkData", () => {
      expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyWhereLinks ( findWhereLinksForSqlRoot ( r ) ) ) ).toEqual ( [
        [
          "mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id",
          "ACC_TBL:ACC_TBL.mainCustomerId:number == mainCustomer:CUST_TBL.id:number",
          "jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id",
          "ACC_TBL:ACC_TBL.jointCustomerId:number == jointCustomer:CUST_TBL.id:number",
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id"
        ],
        [
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id",
          "mainAddress:ADD_TBL.id == mainAddress:ADD_TBL.customerId",
          "mainCustomer:CUST_TBL.mainCustomerId:number == mainCustomer:CUST_TBL.id:number"
        ],
        [
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id",
          "jointAddress:ADD_TBL.id == jointAddress:ADD_TBL.customerId",
          "jointCustomer:CUST_TBL.jointCustomerId:number == jointCustomer:CUST_TBL.id:number"
        ]
      ] )
    } )
  }
)

describe ( "findFieldsFromWhere", () => {
  it ( "find the fields in the where clauses. These will be merged with the fields in the 'DataD' and deduped later. ", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r =>
      unique ( simplifyTableAliasAndFields ( findFieldsFromWhere ( findWhereLinksForSqlRoot ( r ) ) ), s => s ) ) ).toEqual ( [
      [
        "mainCustomer:CUST_TBL.nameId",
        "mainName:NAME_TBL.id",
        "ACC_TBL:ACC_TBL.mainCustomerId:number",
        "mainCustomer:CUST_TBL.id:number",
        "jointCustomer:CUST_TBL.nameId",
        "jointName:NAME_TBL.id",
        "ACC_TBL:ACC_TBL.jointCustomerId:number",
        "jointCustomer:CUST_TBL.id:number",
        "ACC_TBL:ACC_TBL.acc_id",
        "ACC_TBL:ACC_TBL.brand_id"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id",
        "ACC_TBL:ACC_TBL.brand_id",
        "mainAddress:ADD_TBL.id",
        "mainAddress:ADD_TBL.customerId",
        "mainCustomer:CUST_TBL.mainCustomerId:number",
        "mainCustomer:CUST_TBL.id:number"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id",
        "ACC_TBL:ACC_TBL.brand_id",
        "jointAddress:ADD_TBL.id",
        "jointAddress:ADD_TBL.customerId",
        "jointCustomer:CUST_TBL.jointCustomerId:number",
        "jointCustomer:CUST_TBL.id:number"
      ]
    ] )
  } )

} )

describe ( "findTableAndFieldFromDataD", () => {
  it ( "find the tables and fields from a dataD. ", () => {
    expect ( findTableAndFieldFromDataD ( JointAccountDd ).map ( simplifyTableAndFields ) ).toEqual ( [
      "ACC_TBL.blnc",
      "NAME_TBL.zzname",
      "ADD_TBL.zzline1",
      "ADD_TBL.zzline2"
    ] )
  } )
} )

describe ( "findTableAliasAndFieldFromDataD", () => {
  it ( "should start with the fields from the wheres, and add in the fields from the dataD: only adding where the data is needed - i.e. not adding fields to the 'path' to the root", () => {
    const fromDataD = findTableAndFieldFromDataD ( JointAccountDd )
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyTableAliasAndFields ( findTableAliasAndFieldFromDataD ( r, fromDataD ) ) ) ).toEqual ( [
      [
        "ACC_TBL:ACC_TBL.blnc"
      ],
      [
        "mainAddress:ADD_TBL.zzline1",
        "mainAddress:ADD_TBL.zzline2"
      ],
      [
        "jointAddress:ADD_TBL.zzline1",
        "jointAddress:ADD_TBL.zzline2"
      ]
    ] )
  } )
} )

describe ( "findAllFields", () => {
  it ( "should aggregate the fields from the where and from the dataD ", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyTableAliasAndFields ( findAllFields ( r, JointAccountDd, findWhereLinksForSqlRootGoingUp ( r ) ) ) ) ).toEqual ( [
      [
        "ACC_TBL:ACC_TBL.blnc"
      ],
      [
        "mainAddress:ADD_TBL.id",
        "mainAddress:ADD_TBL.customerId",
        "mainCustomer:CUST_TBL.mainCustomerId:number",
        "mainCustomer:CUST_TBL.id:number",
        "mainAddress:ADD_TBL.zzline1",
        "mainAddress:ADD_TBL.zzline2"
      ],
      [
        "jointAddress:ADD_TBL.id",
        "jointAddress:ADD_TBL.customerId",
        "jointCustomer:CUST_TBL.jointCustomerId:number",
        "jointCustomer:CUST_TBL.id:number",
        "jointAddress:ADD_TBL.zzline1",
        "jointAddress:ADD_TBL.zzline2"
      ]
    ] )
  } )
} )

describe ( "findSqlLinkDataFromRootAndDataD", () => {
  it ( "should create the data for the links in postCodeDataLineD (simple)", () => {
    expect ( walkSqlRoots ( findSqlRoots ( postcodeRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, postCodeDataLineD ) ) ) ).toEqual ([
      [
        "sqlRoot: ADD_TBL",
        "fields: ADD_TBL:ADD_TBL.,ADD_TBL:ADD_TBL.zzline1,ADD_TBL:ADD_TBL.zzline2",
        "aliasAndTables ADD_TBL->ADD_TBL",
        "where param postcode == ADD_TBL:ADD_TBL."
      ]
    ])
  } )

  it ( "shouldCreate the data for the links in accountD", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "sqlRoot: ACC_TBL",
        "fields: mainCustomer:CUST_TBL.nameId,mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:number,mainCustomer:CUST_TBL.id:number,jointCustomer:CUST_TBL.nameId,jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:number,jointCustomer:CUST_TBL.id:number,ACC_TBL:ACC_TBL.acc_id,ACC_TBL:ACC_TBL.brand_id,ACC_TBL:ACC_TBL.blnc",
        "aliasAndTables mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL,ACC_TBL->ACC_TBL",
        "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:number == mainCustomer:CUST_TBL.id:number,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:number == jointCustomer:CUST_TBL.id:number,param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id,ACC_TBL:ACC_TBL.brand_id,mainAddress:ADD_TBL.id,mainAddress:ADD_TBL.customerId,mainCustomer:CUST_TBL.mainCustomerId:number,mainCustomer:CUST_TBL.id:number,mainAddress:ADD_TBL.zzline1,mainAddress:ADD_TBL.zzline2",
        "aliasAndTables mainAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,mainAddress:ADD_TBL.id == mainAddress:ADD_TBL.customerId,mainCustomer:CUST_TBL.mainCustomerId:number == mainCustomer:CUST_TBL.id:number"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id,ACC_TBL:ACC_TBL.brand_id,jointAddress:ADD_TBL.id,jointAddress:ADD_TBL.customerId,jointCustomer:CUST_TBL.jointCustomerId:number,jointCustomer:CUST_TBL.id:number,jointAddress:ADD_TBL.zzline1,jointAddress:ADD_TBL.zzline2",
        "aliasAndTables jointAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,jointAddress:ADD_TBL.id == jointAddress:ADD_TBL.customerId,jointCustomer:CUST_TBL.jointCustomerId:number == jointCustomer:CUST_TBL.id:number"
      ]
    ] )
  } )
} )
describe ( "generateGetSql", () => {
  it ( "should generate the get sql", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => generateGetSql ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "select mainCustomer.nameId,mainName.id,ACC_TBL.mainCustomerId:number,mainCustomer.id:number,jointCustomer.nameId,jointName.id,ACC_TBL.jointCustomerId:number,jointCustomer.id:number,ACC_TBL.acc_id,ACC_TBL.brand_id,ACC_TBL.blnc",
        "from NAME_TBL mainName,CUST_TBL mainCustomer,NAME_TBL jointName,CUST_TBL jointCustomer,ACC_TBL ACC_TBL",
        "where mainCustomer.nameId = mainName.id,ACC_TBL.mainCustomerId = mainCustomer.id,jointCustomer.nameId = jointName.id,ACC_TBL.jointCustomerId = jointCustomer.id, ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?"
      ],
      [
        "select ACC_TBL.acc_id,ACC_TBL.brand_id,mainAddress.id,mainAddress.customerId,mainCustomer.mainCustomerId:number,mainCustomer.id:number,mainAddress.zzline1,mainAddress.zzline2",
        "from ADD_TBL mainAddress",
        "where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,mainAddress.id = mainAddress.customerId,mainCustomer.mainCustomerId = mainCustomer.id"
      ],
      [
        "select ACC_TBL.acc_id,ACC_TBL.brand_id,jointAddress.id,jointAddress.customerId,jointCustomer.jointCustomerId:number,jointCustomer.id:number,jointAddress.zzline1,jointAddress.zzline2",
        "from ADD_TBL jointAddress",
        "where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,jointAddress.id = jointAddress.customerId,jointCustomer.jointCustomerId = jointCustomer.id"
      ]
    ] )
  } )

} )
//
// describe ( "findAllTableData", () => {
//   it ( "should find the table  a table from multiple link datas.. because the tables can be used in multiple dataDs", () => {
//      expect(findAllTableData(JointAccountPageD.rest.fromApi, PostCodeMainPage.rest.main)).toEqual([])
//
//   } )
//
// } )

