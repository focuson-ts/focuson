import { ChildEntity, createTableSql, EntityFolder, findAliasAndTableLinksForLinkData, findAllFields, findAllTableAndFieldDatasIn, findAllTableAndFieldsIn, findFieldsFromWhere, findSqlLinkDataFromRootAndDataD, findSqlRoot, findTableAliasAndFieldFromDataD, findTableAndFieldFromDataD, findWhereLinksForSqlRoot, findWhereLinksForSqlRootGoingUp, foldEntitys, generateGetSql, MainEntity, makeAllGetsForRest, makeMapsForRest, MultipleEntity, simplifyAliasAndChildEntityPath, simplifyAliasAndTables, simplifySqlLinkData, simplifySqlRoot, simplifyTableAndFieldAndAliasDataArray, simplifyTableAndFieldData, simplifyTableAndFieldDataArray, simplifyTableAndFieldsData, simplifyWhereFromQuery, simplifyWhereLinks, SingleEntity, walkSqlRoots, whereFieldToFieldData } from "../codegen/makeSqlFromEntities";
import { EntityAndWhere, unique } from "../common/restD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { nameAndAddressDataD, postCodeDataLineD } from "../example/postCodeDemo/addressSearch.dataD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";
import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { jointAccountRestD } from "../example/jointAccount/jointAccount.restD";
import { paramsForTest } from "./makeJavaResolvers.spec";

const mainEntity: MainEntity = jointAccountRestD.tables.entity
const theRestD = jointAccountRestD


describe ( "EntityFolder", () => {
  it ( "should walk all the nodes", () => {
    const testFolder: EntityFolder<string[]> = {
      foldMain ( childAcc: string[][], main: EntityAndWhere ): string[] {return [ ...childAcc.flat (), `main: ${main.entity.table.name} where: ${simplifyWhereFromQuery ( main.where )}` ]},
      foldMultiple ( childAcc: string[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, fp, multiple: MultipleEntity ): string[] {
        return [ ...childAcc.flat (), `multiple ${main.entity.table.name} path ${simplifyAliasAndChildEntityPath ( path )} => ${multiple.table.name} -- fp ${fp}` ]
      },
      foldSingle ( childAcc: string[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, fp, single: SingleEntity ): string[] {
        return [ ...childAcc.flat (), `single ${main.entity.table.name} path ${simplifyAliasAndChildEntityPath ( path )} => ${single.table.name} -- fp ${fp}` ]
      },
    }
    expect ( foldEntitys ( testFolder, theRestD.tables, theRestD.tables.entity, undefined, [] ) ).toEqual ( [
      "multiple ACC_TBL path [mainCustomer -> CUST_TBL] => ADD_TBL -- fp main",
      "single ACC_TBL path [mainCustomer -> CUST_TBL] => NAME_TBL -- fp main",
      "single ACC_TBL path [] => CUST_TBL -- fp main",
      "multiple ACC_TBL path [jointCustomer -> CUST_TBL] => ADD_TBL -- fp joint",
      "single ACC_TBL path [jointCustomer -> CUST_TBL] => NAME_TBL -- fp joint",
      "single ACC_TBL path [] => CUST_TBL -- fp joint",
      "main: ACC_TBL where: ACC_TBL:ACC_TBL.acc_id==accountId , ACC_TBL:ACC_TBL.brand_id==brandId "
    ] )
  } )
} )

describe ( "findSqlRoots", () => {
  it ( "should find a root for the main and each multiple", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), simplifySqlRoot ) ).toEqual ( [
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL] filterPath: undefined",
      "main ACC_TBL path [mainCustomer -> CUST_TBL] root ADD_TBL children [] filterPath: main",
      "main ACC_TBL path [jointCustomer -> CUST_TBL] root ADD_TBL children [] filterPath: joint"
    ] )
  } )
} )

describe ( "findAliasAndTablesLinksForLinkDataFolder", () => {
  it ( "should generate aliasAndTables", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r => simplifyAliasAndTables ( findAliasAndTableLinksForLinkData ( r ) ) ) ).toEqual ( [
      "ACC_TBL->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
      "ACC_TBL->ACC_TBL,mainCustomer->CUST_TBL,mainAddress->ADD_TBL",
      "ACC_TBL->ACC_TBL,jointCustomer->CUST_TBL,jointAddress->ADD_TBL"
    ] )
  } )
} )
describe ( "findWhereLinkDataForLinkData", () => {
    it ( "should generate  findWhereLinkDataForLinkData", () => {
      expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r => simplifyWhereLinks ( findWhereLinksForSqlRoot ( r ) ) ) ).toEqual ( [
        [
          "mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id",
          "ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer",
          "jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id",
          "ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer",
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id"
        ],
        [
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id",
          "mainCustomer:CUST_TBL.id == mainAddress:ADD_TBL.customerId",
          "ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
        ],
        [
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id",
          "jointCustomer:CUST_TBL.id == jointAddress:ADD_TBL.customerId",
          "ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
        ]
      ] )
    } )
  }
)
describe ( "whereFieldToFieldData. Note that the undefined gets fixed later in the process", () => {
  it ( "should work with no type specified (defaulting to integer)", () => {
    expect ( whereFieldToFieldData ( 'someErrorPrefix', 'someField' ) ).toEqual ( { "dbType": "integer", "dbFieldName": "someField", "reactType": "number", "rsGetter": "getInt" } )
  } )
  it ( "should work with string type specified", () => {
    expect ( whereFieldToFieldData ( 'someErrorPrefix', 'someField:string' ) ).toEqual ( { "dbType": "string", "dbFieldName": "someField", "reactType": "string", "rsGetter": "getString" } )
  } )
  it ( "should work with integer type specified ", () => {
    expect ( whereFieldToFieldData ( 'someErrorPrefix', 'someField:integer' ) ).toEqual ( { "dbType": "integer", "dbFieldName": "someField", "reactType": "number", "rsGetter": "getInt" } )
  } )

} )
describe ( "findFieldsFromWhere", () => {
  it ( "find the fields in the where clauses. ", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r =>
      unique ( simplifyTableAndFieldAndAliasDataArray ( findFieldsFromWhere ( 'someErrorPrefix', findWhereLinksForSqlRoot ( r ) ) ), s => s ) ) ).toEqual ( [
      [
        "mainCustomer:CUST_TBL.nameId/undefined",
        "mainName:NAME_TBL.id/undefined",
        "ACC_TBL:ACC_TBL.mainCustomerId/undefined",
        "mainCustomer:CUST_TBL.id/undefined",
        "jointCustomer:CUST_TBL.nameId/undefined",
        "jointName:NAME_TBL.id/undefined",
        "ACC_TBL:ACC_TBL.jointCustomerId/undefined",
        "jointCustomer:CUST_TBL.id/undefined",
        "ACC_TBL:ACC_TBL.acc_id/undefined",
        "ACC_TBL:ACC_TBL.brand_id/undefined"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id/undefined",
        "ACC_TBL:ACC_TBL.brand_id/undefined",
        "mainCustomer:CUST_TBL.id/undefined",
        "mainAddress:ADD_TBL.customerId/undefined",
        "ACC_TBL:ACC_TBL.mainCustomerId/undefined"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id/undefined",
        "ACC_TBL:ACC_TBL.brand_id/undefined",
        "jointCustomer:CUST_TBL.id/undefined",
        "jointAddress:ADD_TBL.customerId/undefined",
        "ACC_TBL:ACC_TBL.jointCustomerId/undefined"
      ]
    ])
  } )

} )

describe ( "findTableAndFieldFromDataD", () => {
  it ( "find the tables and fields from a dataD -simple ", () => {
    expect ( findTableAndFieldFromDataD ( nameAndAddressDataD ).map ( t => simplifyTableAndFieldData ( t, true ) ) ).toEqual ( [
      "ADD_TBL.zzline1/line1/line1",
      "ADD_TBL.zzline2/line2/line2",
      "ADD_TBL.zzline3/line3/line3",
      "ADD_TBL.zzline4/line4/line4"
    ] )
  } )
  it ( "find the tables and fields from a dataD. ", () => {
    expect ( findTableAndFieldFromDataD ( JointAccountDd ).map ( t => simplifyTableAndFieldData ( t, true ) ) ).toEqual ( [
      "ACC_TBL.blnc/balance/balance",
      "NAME_TBL.zzname/name/main,name",
      "ADD_TBL.zzline1/line1/main,addresses,line1",
      "ADD_TBL.zzline2/line2/main,addresses,line2",
      "NAME_TBL.zzname/name/joint,name",
      "ADD_TBL.zzline1/line1/joint,addresses,line1",
      "ADD_TBL.zzline2/line2/joint,addresses,line2"
    ] )
  } )
} )

describe ( "findTableAliasAndFieldFromDataD", () => {

  it ( "should start with the fields from the wheres, and add in the fields from the dataD: only adding where the data is needed - i.e. not adding fields to the 'path' to the root", () => {
    const fromDataD = findTableAndFieldFromDataD ( JointAccountDd )
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findTableAliasAndFieldFromDataD ( r, fromDataD ), true ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name/main,name",
        "jointName:NAME_TBL.zzname/name/joint,name",
        "ACC_TBL:ACC_TBL.blnc/balance/balance"
      ],
      [
        "mainAddress:ADD_TBL.zzline1/line1/main,addresses,line1",
        "mainAddress:ADD_TBL.zzline2/line2/main,addresses,line2"
      ],
      [
        "jointAddress:ADD_TBL.zzline1/line1/joint,addresses,line1",
        "jointAddress:ADD_TBL.zzline2/line2/joint,addresses,line2"
      ]
    ] )
  } )
} )

describe ( "findAllFields", () => {
  it ( "should aggregate the fields from the where and from the dataD - simple ", () => {
    expect ( walkSqlRoots ( findSqlRoot ( addressRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, nameAndAddressDataD, findWhereLinksForSqlRootGoingUp ( r ) ) ) ) ).toEqual ( [
      [
        "ADD_TBL:ADD_TBL.zzline1/line1",
        "ADD_TBL:ADD_TBL.zzline2/line2",
        "ADD_TBL:ADD_TBL.zzline3/line3",
        "ADD_TBL:ADD_TBL.zzline4/line4"
      ]
    ] )
  } )

  it ( "should findWhereLinksForSqlRootsGoingUp", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r => simplifyWhereLinks ( findWhereLinksForSqlRootGoingUp ( r ) ) ) ).toEqual ( [
      [],
      [
        "mainCustomer:CUST_TBL.id == mainAddress:ADD_TBL.customerId",
        "ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
      ],
      [
        "jointCustomer:CUST_TBL.id == jointAddress:ADD_TBL.customerId",
        "ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
      ]
    ] )
  } )

  it ( "should aggregate the fields from the where and from the dataD ", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, JointAccountDd, findWhereLinksForSqlRootGoingUp ( r ) ), true ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name/main,name",
        "jointName:NAME_TBL.zzname/name/joint,name",
        "ACC_TBL:ACC_TBL.blnc/balance/balance"
      ],
      [
        "mainCustomer:CUST_TBL.id/undefined",
        "mainAddress:ADD_TBL.customerId/undefined",
        "ACC_TBL:ACC_TBL.mainCustomerId/undefined",
        "mainAddress:ADD_TBL.zzline1/line1/main,addresses,line1",
        "mainAddress:ADD_TBL.zzline2/line2/main,addresses,line2"
      ],
      [
        "jointCustomer:CUST_TBL.id/undefined",
        "jointAddress:ADD_TBL.customerId/undefined",
        "ACC_TBL:ACC_TBL.jointCustomerId/undefined",
        "jointAddress:ADD_TBL.zzline1/line1/joint,addresses,line1",
        "jointAddress:ADD_TBL.zzline2/line2/joint,addresses,line2"
      ]
    ])
  } )
} )

describe ( "findSqlLinkDataFromRootAndDataD", () => {
  it ( "should create the data for the links in postCodeDataLineD (simple)", () => {
    expect ( walkSqlRoots ( findSqlRoot ( addressRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, postCodeDataLineD ) ) ) ).toEqual ( [
      [
        "sqlRoot: ADD_TBL",
        "fields: ADD_TBL:ADD_TBL.postcode/undefined,ADD_TBL:ADD_TBL.zzline1/line1,ADD_TBL:ADD_TBL.zzline2/line2,ADD_TBL:ADD_TBL.zzline3/line3,ADD_TBL:ADD_TBL.zzline4/line4",
        "aliasAndTables ADD_TBL->ADD_TBL",
        "where param postcode == ADD_TBL:ADD_TBL.postcode"
      ]
    ] )
  } )

  it ( "shouldCreate the data for the links in accountD", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "sqlRoot: ACC_TBL",
        "fields: mainCustomer:CUST_TBL.nameId/undefined,mainName:NAME_TBL.id/undefined,ACC_TBL:ACC_TBL.mainCustomerId/undefined,mainCustomer:CUST_TBL.id/undefined,jointCustomer:CUST_TBL.nameId/undefined,jointName:NAME_TBL.id/undefined,ACC_TBL:ACC_TBL.jointCustomerId/undefined,jointCustomer:CUST_TBL.id/undefined,ACC_TBL:ACC_TBL.acc_id/undefined,ACC_TBL:ACC_TBL.brand_id/undefined,mainName:NAME_TBL.zzname/name,jointName:NAME_TBL.zzname/name,ACC_TBL:ACC_TBL.blnc/balance",
        "aliasAndTables ACC_TBL->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
        "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer,param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id/undefined,ACC_TBL:ACC_TBL.brand_id/undefined,mainCustomer:CUST_TBL.id/undefined,mainAddress:ADD_TBL.customerId/undefined,ACC_TBL:ACC_TBL.mainCustomerId/undefined,mainAddress:ADD_TBL.zzline1/line1,mainAddress:ADD_TBL.zzline2/line2",
        "aliasAndTables ACC_TBL->ACC_TBL,mainCustomer->CUST_TBL,mainAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,mainCustomer:CUST_TBL.id == mainAddress:ADD_TBL.customerId,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id/undefined,ACC_TBL:ACC_TBL.brand_id/undefined,jointCustomer:CUST_TBL.id/undefined,jointAddress:ADD_TBL.customerId/undefined,ACC_TBL:ACC_TBL.jointCustomerId/undefined,jointAddress:ADD_TBL.zzline1/line1,jointAddress:ADD_TBL.zzline2/line2",
        "aliasAndTables ACC_TBL->ACC_TBL,jointCustomer->CUST_TBL,jointAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,jointCustomer:CUST_TBL.id == jointAddress:ADD_TBL.customerId,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
      ]
    ] )
  } )
} )
describe ( "generateGetSql", () => {
  it ( "should generate the get sql", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), r => generateGetSql ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "select",
        "  mainCustomer.nameId as mainCustomer_nameId,",
        "  mainName.id as mainName_id,",
        "  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,",
        "  mainCustomer.id as mainCustomer_id,",
        "  jointCustomer.nameId as jointCustomer_nameId,",
        "  jointName.id as jointName_id,",
        "  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,",
        "  jointCustomer.id as jointCustomer_id,",
        "  ACC_TBL.acc_id as ACC_TBL_acc_id,",
        "  ACC_TBL.brand_id as ACC_TBL_brand_id,",
        "  mainName.zzname as mainName_zzname,",
        "  jointName.zzname as jointName_zzname,",
        "  ACC_TBL.blnc as ACC_TBL_blnc",
        " from",
        "  ACC_TBL ACC_TBL,",
        "  NAME_TBL mainName,",
        "  CUST_TBL mainCustomer,",
        "  NAME_TBL jointName,",
        "  CUST_TBL jointCustomer",
        " where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ?"
      ],
      [
        "select",
        "  ACC_TBL.acc_id as ACC_TBL_acc_id,",
        "  ACC_TBL.brand_id as ACC_TBL_brand_id,",
        "  mainCustomer.id as mainCustomer_id,",
        "  mainAddress.customerId as mainAddress_customerId,",
        "  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,",
        "  mainAddress.zzline1 as mainAddress_zzline1,",
        "  mainAddress.zzline2 as mainAddress_zzline2",
        " from",
        "  ACC_TBL ACC_TBL,",
        "  CUST_TBL mainCustomer,",
        "  ADD_TBL mainAddress",
        " where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and mainCustomer.id = mainAddress.customerId and ACC_TBL.mainCustomerId = mainCustomer.id"
      ],
      [
        "select",
        "  ACC_TBL.acc_id as ACC_TBL_acc_id,",
        "  ACC_TBL.brand_id as ACC_TBL_brand_id,",
        "  jointCustomer.id as jointCustomer_id,",
        "  jointAddress.customerId as jointAddress_customerId,",
        "  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,",
        "  jointAddress.zzline1 as jointAddress_zzline1,",
        "  jointAddress.zzline2 as jointAddress_zzline2",
        " from",
        "  ACC_TBL ACC_TBL,",
        "  CUST_TBL jointCustomer,",
        "  ADD_TBL jointAddress",
        " where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id"
      ]
    ] )
  } )

} )

describe ( "findAllTableAndFieldsIn", () => {
  it ( "should find the table from a simple rest", () => {
    expect ( simplifyTableAndFieldDataArray ( findAllTableAndFieldsIn ( [ PostCodeMainPage.rest.address ] ) ) ).toEqual ( [
      "ADD_TBL.postcode/undefined",
      "ADD_TBL.zzline1/line1",
      "ADD_TBL.zzline2/line2",
      "ADD_TBL.zzline3/line3",
      "ADD_TBL.zzline4/line4"
    ] )
  } )


  it ( "should find the table  a table from multiple link datas.. because the tables can be used in multiple dataDs", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( simplifyTableAndFieldDataArray ( findAllTableAndFieldsIn ( rdps ) ) ).toEqual ( [
      "CUST_TBL.nameId/undefined",
      "NAME_TBL.id/undefined",
      "ACC_TBL.mainCustomerId/undefined",
      "CUST_TBL.id/undefined",
      "ACC_TBL.jointCustomerId/undefined",
      "ACC_TBL.acc_id/undefined",
      "ACC_TBL.brand_id/undefined",
      "NAME_TBL.zzname/name",
      "ACC_TBL.blnc/balance",
      "ADD_TBL.customerId/undefined",
      "ADD_TBL.zzline1/line1",
      "ADD_TBL.zzline2/line2",
      "ADD_TBL.postcode/undefined",
      "ADD_TBL.zzline3/line3",
      "ADD_TBL.zzline4/line4"
    ] )
  } )

} )

describe ( "findAllTableAndFieldDatasIn", () => {
  it ( "should group the field data by table", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( findAllTableAndFieldDatasIn ( rdps ).map ( t => simplifyTableAndFieldsData ( t, true ) ) ).toEqual ( [
      "CUST_TBL => nameId/undefined:number,id/undefined:number",
      "NAME_TBL => id/undefined:number,zzname/name:string/main,name",
      "ACC_TBL => mainCustomerId/undefined:number,jointCustomerId/undefined:number,acc_id/undefined:number,brand_id/undefined:number,blnc/balance:number/balance",
      "ADD_TBL => customerId/undefined:number,zzline1/line1:string/main,addresses,line1,zzline2/line2:string/main,addresses,line2,postcode/undefined:number,zzline3/line3:string/line3,zzline4/line4:string/line4"
    ])
  } )
} )

describe ( "createTableSql", () => {
  it ( "should make h2 compatible create table ", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( createTableSql ( rdps ) ).toEqual ( {
      "ACC_TBL": [
        "create table ACC_TBL(",
        "  mainCustomerId integer,",
        "  jointCustomerId integer,",
        "  acc_id integer,",
        "  brand_id integer,",
        "  blnc integer",
        ")"
      ],
      "ADD_TBL": [
        "create table ADD_TBL(",
        "  customerId integer,",
        "  zzline1 varchar(256),",
        "  zzline2 varchar(256),",
        "  postcode integer,",
        "  zzline3 varchar(256),",
        "  zzline4 varchar(256)",
        ")"
      ],
      "CUST_TBL": [
        "create table CUST_TBL(",
        "  nameId integer,",
        "  id integer",
        ")"
      ],
      "NAME_TBL": [
        "create table NAME_TBL(",
        "  id integer,",
        "  zzname varchar(256)",
        ")"
      ]
    } )

  } )
} )

describe ( "makeMapsForRest", () => {
  it ( "should make maps for each sql root, from the link data", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( r, path ) => {
      const ld = findSqlLinkDataFromRootAndDataD ( r, JointAccountDd )
      return makeMapsForRest ( paramsForTest, JointAccountPageD, 'jointAccount', jointAccountRestD, ld, path, r.children.length )
    } ).map ( s => s.map ( s => s.replace ( /"/g, "'" ) ) ) ).toEqual ( [
      [
        "package focuson.data.db;",
        "",
        "import java.sql.ResultSet;",
        "import java.sql.Connection;",
        "import java.sql.PreparedStatement;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.LinkedList;",
        "import java.util.Optional;",
        "import java.util.Map;",
        "import java.util.stream.Collectors;",
        "",
        "//{'customerId':{'commonLens':'accountId','testValue':'custId'},'brandId':{'commonLens':'brandId','testValue':'custId'}}",
        "public class JointAccount_jointAccountMaps {",
        "  @SuppressWarnings('SqlResolve')",
        "  public static String sql = 'select'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,'+",
        "  '  mainName.id as mainName_id,'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,'+",
        "  '  mainCustomer.id as mainCustomer_id,'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,'+",
        "  '  jointName.id as jointName_id,'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,'+",
        "  '  jointCustomer.id as jointCustomer_id,'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,'+",
        "  '  mainName.zzname as mainName_zzname,'+",
        "  '  jointName.zzname as jointName_zzname,'+",
        "  '  ACC_TBL.blnc as ACC_TBL_blnc'+",
        "  ' from'+",
        "  '  ACC_TBL ACC_TBL,'+",
        "  '  NAME_TBL mainName,'+",
        "  '  CUST_TBL mainCustomer,'+",
        "  '  NAME_TBL jointName,'+",
        "  '  CUST_TBL jointCustomer'+",
        "  ' where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ?';",
        "  ",
        "  public static Optional<Map<String,Object>> getAll(Connection connection) throws SQLException {",
        "     return getRoot(connection,get0(connection),get1(connection)).map(x -> x._root);",
        "  }",
        "  public static Optional<JointAccount_jointAccountMaps> getRoot(Connection connection, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps0> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps0(rs));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps1> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps1(rs));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  ",
        "  public final Object mainCustomer_nameId;",
        "  public final Object mainName_id;",
        "  public final Object ACC_TBL_mainCustomerId;",
        "  public final Object mainCustomer_id;",
        "  public final Object jointCustomer_nameId;",
        "  public final Object jointName_id;",
        "  public final Object ACC_TBL_jointCustomerId;",
        "  public final Object jointCustomer_id;",
        "  public final Object ACC_TBL_acc_id;",
        "  public final Object ACC_TBL_brand_id;",
        "  ",
        "  public final Map<String,Object> _root = new HashMap<>();",
        "  public final Map<String,Object> main = new HashMap<>();",
        "  public final Map<String,Object> main_addresses = new HashMap<>();",
        "  public final Map<String,Object> joint = new HashMap<>();",
        "  public final Map<String,Object> joint_addresses = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps(ResultSet rs,List<JointAccount_jointAccountMaps0> list0,List<JointAccount_jointAccountMaps1> list1) throws SQLException{",
        "    this._root.put('balance', rs.getInt('ACC_TBL_blnc'));",
        "    this.main.put('name', rs.getString('mainName_zzname'));",
        "    this.joint.put('name', rs.getString('jointName_zzname'));",
        "    ",
        "    this.mainCustomer_nameId = rs.getInt('mainCustomer_nameId');",
        "    this.mainName_id = rs.getInt('mainName_id');",
        "    this.ACC_TBL_mainCustomerId = rs.getInt('ACC_TBL_mainCustomerId');",
        "    this.mainCustomer_id = rs.getInt('mainCustomer_id');",
        "    this.jointCustomer_nameId = rs.getInt('jointCustomer_nameId');",
        "    this.jointName_id = rs.getInt('jointName_id');",
        "    this.ACC_TBL_jointCustomerId = rs.getInt('ACC_TBL_jointCustomerId');",
        "    this.jointCustomer_id = rs.getInt('jointCustomer_id');",
        "    this.ACC_TBL_acc_id = rs.getInt('ACC_TBL_acc_id');",
        "    this.ACC_TBL_brand_id = rs.getInt('ACC_TBL_brand_id');",
        "    ",
        "    _root.put('main', main);",
        "    main.put('addresses', main_addresses);",
        "    _root.put('joint', joint);",
        "    joint.put('addresses', joint_addresses);",
        "    ",
        "    this.main.put('addresses', list0.stream().map(m ->m.main).collect(Collectors.toList()));",
        "    this.joint.put('addresses', list1.stream().map(m ->m.joint).collect(Collectors.toList()));",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db;",
        "",
        "import java.sql.ResultSet;",
        "import java.sql.Connection;",
        "import java.sql.PreparedStatement;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.LinkedList;",
        "import java.util.Optional;",
        "import java.util.Map;",
        "import java.util.stream.Collectors;",
        "",
        "//{'customerId':{'commonLens':'accountId','testValue':'custId'},'brandId':{'commonLens':'brandId','testValue':'custId'}}",
        "public class JointAccount_jointAccountMaps0 {",
        "  @SuppressWarnings('SqlResolve')",
        "  public static String sql = 'select'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,'+",
        "  '  mainCustomer.id as mainCustomer_id,'+",
        "  '  mainAddress.customerId as mainAddress_customerId,'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,'+",
        "  '  mainAddress.zzline1 as mainAddress_zzline1,'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2'+",
        "  ' from'+",
        "  '  ACC_TBL ACC_TBL,'+",
        "  '  CUST_TBL mainCustomer,'+",
        "  '  ADD_TBL mainAddress'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and mainCustomer.id = mainAddress.customerId and ACC_TBL.mainCustomerId = mainCustomer.id';",
        "  ",
        "  public static Optional<Map<String,Object>> getAll(Connection connection) throws SQLException {",
        "     return getRoot(connection,get0(connection),get1(connection)).map(x -> x._root);",
        "  }",
        "  public static Optional<JointAccount_jointAccountMaps> getRoot(Connection connection, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps0> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps0(rs));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps1> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps1(rs));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  ",
        "  public final Object ACC_TBL_acc_id;",
        "  public final Object ACC_TBL_brand_id;",
        "  public final Object mainCustomer_id;",
        "  public final Object mainAddress_customerId;",
        "  public final Object ACC_TBL_mainCustomerId;",
        "  ",
        "  public final Map<String,Object> _root = new HashMap<>();",
        "  public final Map<String,Object> main = new HashMap<>();",
        "  public final Map<String,Object> main_addresses = new HashMap<>();",
        "  public final Map<String,Object> joint = new HashMap<>();",
        "  public final Map<String,Object> joint_addresses = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps0(ResultSet rs) throws SQLException{",
        "    this.main_addresses.put('line1', rs.getString('mainAddress_zzline1'));",
        "    this.main_addresses.put('line2', rs.getString('mainAddress_zzline2'));",
        "    ",
        "    this.ACC_TBL_acc_id = rs.getInt('ACC_TBL_acc_id');",
        "    this.ACC_TBL_brand_id = rs.getInt('ACC_TBL_brand_id');",
        "    this.mainCustomer_id = rs.getInt('mainCustomer_id');",
        "    this.mainAddress_customerId = rs.getInt('mainAddress_customerId');",
        "    this.ACC_TBL_mainCustomerId = rs.getInt('ACC_TBL_mainCustomerId');",
        "    ",
        "    _root.put('main', main);",
        "    main.put('addresses', main_addresses);",
        "    ",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db;",
        "",
        "import java.sql.ResultSet;",
        "import java.sql.Connection;",
        "import java.sql.PreparedStatement;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.LinkedList;",
        "import java.util.Optional;",
        "import java.util.Map;",
        "import java.util.stream.Collectors;",
        "",
        "//{'customerId':{'commonLens':'accountId','testValue':'custId'},'brandId':{'commonLens':'brandId','testValue':'custId'}}",
        "public class JointAccount_jointAccountMaps1 {",
        "  @SuppressWarnings('SqlResolve')",
        "  public static String sql = 'select'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,'+",
        "  '  jointCustomer.id as jointCustomer_id,'+",
        "  '  jointAddress.customerId as jointAddress_customerId,'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,'+",
        "  '  jointAddress.zzline1 as jointAddress_zzline1,'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2'+",
        "  ' from'+",
        "  '  ACC_TBL ACC_TBL,'+",
        "  '  CUST_TBL jointCustomer,'+",
        "  '  ADD_TBL jointAddress'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id';",
        "  ",
        "  public static Optional<Map<String,Object>> getAll(Connection connection) throws SQLException {",
        "     return getRoot(connection,get0(connection),get1(connection)).map(x -> x._root);",
        "  }",
        "  public static Optional<JointAccount_jointAccountMaps> getRoot(Connection connection, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps0> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps0(rs));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);",
        "      //set params needed",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps1> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps1(rs));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  ",
        "  public final Object ACC_TBL_acc_id;",
        "  public final Object ACC_TBL_brand_id;",
        "  public final Object jointCustomer_id;",
        "  public final Object jointAddress_customerId;",
        "  public final Object ACC_TBL_jointCustomerId;",
        "  ",
        "  public final Map<String,Object> _root = new HashMap<>();",
        "  public final Map<String,Object> main = new HashMap<>();",
        "  public final Map<String,Object> main_addresses = new HashMap<>();",
        "  public final Map<String,Object> joint = new HashMap<>();",
        "  public final Map<String,Object> joint_addresses = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps1(ResultSet rs) throws SQLException{",
        "    this.joint_addresses.put('line1', rs.getString('jointAddress_zzline1'));",
        "    this.joint_addresses.put('line2', rs.getString('jointAddress_zzline2'));",
        "    ",
        "    this.ACC_TBL_acc_id = rs.getInt('ACC_TBL_acc_id');",
        "    this.ACC_TBL_brand_id = rs.getInt('ACC_TBL_brand_id');",
        "    this.jointCustomer_id = rs.getInt('jointCustomer_id');",
        "    this.jointAddress_customerId = rs.getInt('jointAddress_customerId');",
        "    this.ACC_TBL_jointCustomerId = rs.getInt('ACC_TBL_jointCustomerId');",
        "    ",
        "    _root.put('joint', joint);",
        "    joint.put('addresses', joint_addresses);",
        "    ",
        "  }",
        "}"
      ]
    ])
  } )
} )