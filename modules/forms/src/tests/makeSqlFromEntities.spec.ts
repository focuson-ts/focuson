import { ChildEntity, createTableSql, EntityFolder, findAliasAndTableLinksForLinkData, findAllFields, findAllTableAndFieldDatasIn, findAllTableAndFieldsIn, findFieldsFromWhere, findSqlLinkDataFromRootAndDataD, findSqlRoots, findTableAliasAndFieldFromDataD, findTableAndFieldFromDataD, findWhereLinkDataForLinkData, findWhereLinksForSqlRoot, findWhereLinksForSqlRootGoingUp, foldEntitys, generateGetSql, MainEntity, makeMapsForRest, MultipleEntity, simplifyAliasAndChildEntityPath, simplifyAliasAndTables, simplifySqlLinkData, simplifySqlRoot, simplifyTableAndFieldAndAliasDataArray, simplifyTableAndFieldData, simplifyTableAndFieldDataArray, simplifyTableAndFieldsData, simplifyWhereFromQuery, simplifyWhereLinks, SingleEntity, walkSqlRoots, whereFieldToFieldData } from "../codegen/makeSqlFromEntities";
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
          "ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer",
          "jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id",
          "ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer",
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id"
        ],
        [
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id",
          "mainAddress:ADD_TBL.id == mainAddress:ADD_TBL.customerId",
          "mainCustomer:CUST_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
        ],
        [
          "param accountId == ACC_TBL:ACC_TBL.acc_id",
          "param brandId == ACC_TBL:ACC_TBL.brand_id",
          "jointAddress:ADD_TBL.id == jointAddress:ADD_TBL.customerId",
          "jointCustomer:CUST_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
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
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r =>
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
        "mainAddress:ADD_TBL.id/undefined",
        "mainAddress:ADD_TBL.customerId/undefined",
        "mainCustomer:CUST_TBL.mainCustomerId/undefined",
        "mainCustomer:CUST_TBL.id/undefined"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id/undefined",
        "ACC_TBL:ACC_TBL.brand_id/undefined",
        "jointAddress:ADD_TBL.id/undefined",
        "jointAddress:ADD_TBL.customerId/undefined",
        "jointCustomer:CUST_TBL.jointCustomerId/undefined",
        "jointCustomer:CUST_TBL.id/undefined"
      ]
    ] )
  } )

} )

describe ( "findTableAndFieldFromDataD", () => {
  it ( "find the tables and fields from a dataD -simple ", () => {
    expect ( findTableAndFieldFromDataD ( nameAndAddressDataD ).map ( simplifyTableAndFieldData ) ).toEqual ( [
      "ADD_TBL.zzline1/line1",
      "ADD_TBL.zzline2/line2",
      "ADD_TBL.zzline3/line3",
      "ADD_TBL.zzline4/line4"
    ] )
  } )
  it ( "find the tables and fields from a dataD. ", () => {
    expect ( findTableAndFieldFromDataD ( JointAccountDd ).map ( simplifyTableAndFieldData ) ).toEqual ( [
      "ACC_TBL.blnc/balance",
      "NAME_TBL.zzname/name",
      "ADD_TBL.zzline1/line1",
      "ADD_TBL.zzline2/line2"
    ] )
  } )
} )

describe ( "findTableAliasAndFieldFromDataD", () => {

  it ( "should start with the fields from the wheres, and add in the fields from the dataD: only adding where the data is needed - i.e. not adding fields to the 'path' to the root", () => {
    const fromDataD = findTableAndFieldFromDataD ( JointAccountDd )
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findTableAliasAndFieldFromDataD ( r, fromDataD ) ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name",
        "jointName:NAME_TBL.zzname/name",
        "ACC_TBL:ACC_TBL.blnc/balance"
      ],
      [
        "mainAddress:ADD_TBL.zzline1/line1",
        "mainAddress:ADD_TBL.zzline2/line2"
      ],
      [
        "jointAddress:ADD_TBL.zzline1/line1",
        "jointAddress:ADD_TBL.zzline2/line2"
      ]
    ] )
  } )
} )

describe ( "findAllFields", () => {
  it ( "should aggregate the fields from the where and from the dataD - simple ", () => {
    expect ( walkSqlRoots ( findSqlRoots ( addressRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, nameAndAddressDataD, findWhereLinksForSqlRootGoingUp ( r ) ) ) ) ).toEqual ( [
      [
        "ADD_TBL:ADD_TBL.zzline1/line1",
        "ADD_TBL:ADD_TBL.zzline2/line2",
        "ADD_TBL:ADD_TBL.zzline3/line3",
        "ADD_TBL:ADD_TBL.zzline4/line4"
      ]
    ] )
  } )

  it ( "should aggregate the fields from the where and from the dataD ", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, JointAccountDd, findWhereLinksForSqlRootGoingUp ( r ) ) ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name",
        "jointName:NAME_TBL.zzname/name",
        "ACC_TBL:ACC_TBL.blnc/balance"
      ],
      [
        "mainAddress:ADD_TBL.id/undefined",
        "mainAddress:ADD_TBL.customerId/undefined",
        "mainCustomer:CUST_TBL.mainCustomerId/undefined",
        "mainCustomer:CUST_TBL.id/undefined",
        "mainAddress:ADD_TBL.zzline1/line1",
        "mainAddress:ADD_TBL.zzline2/line2"
      ],
      [
        "jointAddress:ADD_TBL.id/undefined",
        "jointAddress:ADD_TBL.customerId/undefined",
        "jointCustomer:CUST_TBL.jointCustomerId/undefined",
        "jointCustomer:CUST_TBL.id/undefined",
        "jointAddress:ADD_TBL.zzline1/line1",
        "jointAddress:ADD_TBL.zzline2/line2"
      ]
    ])
  } )
} )

describe ( "findSqlLinkDataFromRootAndDataD", () => {
  it ( "should create the data for the links in postCodeDataLineD (simple)", () => {
    expect ( walkSqlRoots ( findSqlRoots ( addressRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, postCodeDataLineD ) ) ) ).toEqual ( [
      [
        "sqlRoot: ADD_TBL",
        "fields: ADD_TBL:ADD_TBL.postcode/undefined,ADD_TBL:ADD_TBL.zzline1/line1,ADD_TBL:ADD_TBL.zzline2/line2,ADD_TBL:ADD_TBL.zzline3/line3,ADD_TBL:ADD_TBL.zzline4/line4",
        "aliasAndTables ADD_TBL->ADD_TBL",
        "where param postcode == ADD_TBL:ADD_TBL.postcode"
      ]
    ])
  } )

  it ( "shouldCreate the data for the links in accountD", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "sqlRoot: ACC_TBL",
        "fields: mainCustomer:CUST_TBL.nameId/undefined,mainName:NAME_TBL.id/undefined,ACC_TBL:ACC_TBL.mainCustomerId/undefined,mainCustomer:CUST_TBL.id/undefined,jointCustomer:CUST_TBL.nameId/undefined,jointName:NAME_TBL.id/undefined,ACC_TBL:ACC_TBL.jointCustomerId/undefined,jointCustomer:CUST_TBL.id/undefined,ACC_TBL:ACC_TBL.acc_id/undefined,ACC_TBL:ACC_TBL.brand_id/undefined,mainName:NAME_TBL.zzname/name,jointName:NAME_TBL.zzname/name,ACC_TBL:ACC_TBL.blnc/balance",
        "aliasAndTables mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL,ACC_TBL->ACC_TBL",
        "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer,param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id/undefined,ACC_TBL:ACC_TBL.brand_id/undefined,mainAddress:ADD_TBL.id/undefined,mainAddress:ADD_TBL.customerId/undefined,mainCustomer:CUST_TBL.mainCustomerId/undefined,mainCustomer:CUST_TBL.id/undefined,mainAddress:ADD_TBL.zzline1/line1,mainAddress:ADD_TBL.zzline2/line2",
        "aliasAndTables mainAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,mainAddress:ADD_TBL.id == mainAddress:ADD_TBL.customerId,mainCustomer:CUST_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id/undefined,ACC_TBL:ACC_TBL.brand_id/undefined,jointAddress:ADD_TBL.id/undefined,jointAddress:ADD_TBL.customerId/undefined,jointCustomer:CUST_TBL.jointCustomerId/undefined,jointCustomer:CUST_TBL.id/undefined,jointAddress:ADD_TBL.zzline1/line1,jointAddress:ADD_TBL.zzline2/line2",
        "aliasAndTables jointAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,jointAddress:ADD_TBL.id == jointAddress:ADD_TBL.customerId,jointCustomer:CUST_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
      ]
    ])
  } )
} )
describe ( "generateGetSql", () => {
  it ( "should generate the get sql", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => generateGetSql ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "select mainCustomer.nameId as mainCustomer_nameId,mainName.id as mainName_id,ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,mainCustomer.id as mainCustomer_id,jointCustomer.nameId as jointCustomer_nameId,jointName.id as jointName_id,ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,jointCustomer.id as jointCustomer_id,ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,mainName.zzname as mainName_zzname,jointName.zzname as jointName_zzname,ACC_TBL.blnc as ACC_TBL_blnc",
        "from NAME_TBL mainName,CUST_TBL mainCustomer,NAME_TBL jointName,CUST_TBL jointCustomer,ACC_TBL ACC_TBL",
        "where mainCustomer.nameId = mainName.id,ACC_TBL.mainCustomerId = mainCustomer.id,jointCustomer.nameId = jointName.id,ACC_TBL.jointCustomerId = jointCustomer.id, ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?"
      ],
      [
        "select ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,mainAddress.id as mainAddress_id,mainAddress.customerId as mainAddress_customerId,mainCustomer.mainCustomerId as mainCustomer_mainCustomerId,mainCustomer.id as mainCustomer_id,mainAddress.zzline1 as mainAddress_zzline1,mainAddress.zzline2 as mainAddress_zzline2",
        "from ADD_TBL mainAddress",
        "where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,mainAddress.id = mainAddress.customerId,mainCustomer.mainCustomerId = mainCustomer.id"
      ],
      [
        "select ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,jointAddress.id as jointAddress_id,jointAddress.customerId as jointAddress_customerId,jointCustomer.jointCustomerId as jointCustomer_jointCustomerId,jointCustomer.id as jointCustomer_id,jointAddress.zzline1 as jointAddress_zzline1,jointAddress.zzline2 as jointAddress_zzline2",
        "from ADD_TBL jointAddress",
        "where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,jointAddress.id = jointAddress.customerId,jointCustomer.jointCustomerId = jointCustomer.id"
      ]
    ])
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
    ])
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
      "ADD_TBL.id/undefined",
      "ADD_TBL.customerId/undefined",
      "CUST_TBL.mainCustomerId/undefined",
      "ADD_TBL.zzline1/line1",
      "ADD_TBL.zzline2/line2",
      "CUST_TBL.jointCustomerId/undefined",
      "ADD_TBL.postcode/undefined",
      "ADD_TBL.zzline3/line3",
      "ADD_TBL.zzline4/line4"
    ] )
  } )

} )

describe ( "findAllTableAndFieldDatasIn", () => {
  it ( "should group the field data by table", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( findAllTableAndFieldDatasIn ( rdps ).map ( simplifyTableAndFieldsData ) ).toEqual ( [
      "CUST_TBL => nameId/undefined:number,id/undefined:number,mainCustomerId/undefined:number,jointCustomerId/undefined:number",
      "NAME_TBL => id/undefined:number,zzname/name:string",
      "ACC_TBL => mainCustomerId/undefined:number,jointCustomerId/undefined:number,acc_id/undefined:number,brand_id/undefined:number,blnc/balance:number",
      "ADD_TBL => id/undefined:number,customerId/undefined:number,zzline1/line1:string,zzline2/line2:string,postcode/undefined:number,zzline3/line3:string,zzline4/line4:string"
    ] )
  } )
} )

describe ( "createTableSql", () => {
  it ( "should make h2 compatible create table ", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( createTableSql ( rdps ) ).toEqual ( {
      "ACC_TBL": [
        "create table ACC_TBL" + "(",
        "  mainCustomerId integer,",
        "  jointCustomerId integer,",
        "  acc_id integer,",
        "  brand_id integer,",
        "  blnc integer",
        ")"
      ],
      "ADD_TBL": [
        "create table ADD_TBL" + "(",
        "  id integer,",
        "  customerId integer,",
        "  zzline1 varchar(256),",
        "  zzline2 varchar(256),",
        "  postcode integer,",
        "  zzline3 varchar(256),",
        "  zzline4 varchar(256)",
        ")"
      ],
      "CUST_TBL": [
        "create table CUST_TBL" + "(",
        "  nameId integer,",
        "  id integer,",
        "  mainCustomerId integer,",
        "  jointCustomerId integer",
        ")"
      ],
      "NAME_TBL": [
        "create table NAME_TBL" + "(",
        "  id integer,",
        "  zzname varchar(256)",
        ")"
      ]
    } )

  } )
} )

describe ( "makeMapsForRest", () => {
  it ( "should make maps for each sql root, from the link data", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), ( r, path ) => {
      const ld = findSqlLinkDataFromRootAndDataD ( r, JointAccountDd )
      return makeMapsForRest ( paramsForTest, JointAccountPageD, 'jointAccount', ld, path, r.children.length )
    } ).map ( s => s.map ( s => s.replace ( /"/g, "'" ) ) ) ).toEqual ( [
      [
        "package focuson.data.db;",
        "",
        "import java.sql.ResultSet;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.Map;",
        "",
        "/**",
        "  select mainCustomer.nameId as mainCustomer_nameId,mainName.id as mainName_id,ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,mainCustomer.id as mainCustomer_id,jointCustomer.nameId as jointCustomer_nameId,jointName.id as jointName_id,ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,jointCustomer.id as jointCustomer_id,ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,mainName.zzname as mainName_zzname,jointName.zzname as jointName_zzname,ACC_TBL.blnc as ACC_TBL_blnc",
        "  from NAME_TBL mainName,CUST_TBL mainCustomer,NAME_TBL jointName,CUST_TBL jointCustomer,ACC_TBL ACC_TBL",
        "  where mainCustomer.nameId = mainName.id,ACC_TBL.mainCustomerId = mainCustomer.id,jointCustomer.nameId = jointName.id,ACC_TBL.jointCustomerId = jointCustomer.id, ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?",
        "*/",
        "public class JointAccount_jointAccountMaps {",
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
        "  public final Map<String,Object> mainName = new HashMap<>();",
        "  public final Map<String,Object> mainCustomer = new HashMap<>();",
        "  public final Map<String,Object> jointName = new HashMap<>();",
        "  public final Map<String,Object> jointCustomer = new HashMap<>();",
        "  public final Map<String,Object> ACC_TBL = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps(ResultSet rs,List<JointAccount_jointAccountMaps0> list0,List<JointAccount_jointAccountMaps1> list1) throws SQLException{",
        "    this.ACC_TBL.put('balance', rs.getInt('ACC_TBL_blnc'));",
        "    this.mainName.put('name', rs.getString('mainName_zzname'));",
        "    this.jointName.put('name', rs.getString('jointName_zzname'));",
        "    ",
        "    this.mainCustomer_nameId = rs.getInt('{mainCustomer_nameId');",
        "    this.mainName_id = rs.getInt('{mainName_id');",
        "    this.ACC_TBL_mainCustomerId = rs.getInt('{ACC_TBL_mainCustomerId');",
        "    this.mainCustomer_id = rs.getInt('{mainCustomer_id');",
        "    this.jointCustomer_nameId = rs.getInt('{jointCustomer_nameId');",
        "    this.jointName_id = rs.getInt('{jointName_id');",
        "    this.ACC_TBL_jointCustomerId = rs.getInt('{ACC_TBL_jointCustomerId');",
        "    this.jointCustomer_id = rs.getInt('{jointCustomer_id');",
        "    this.ACC_TBL_acc_id = rs.getInt('{ACC_TBL_acc_id');",
        "    this.ACC_TBL_brand_id = rs.getInt('{ACC_TBL_brand_id');",
        "    ",
        "    this.mainCustomer.put('', list0);",
        "    this.jointCustomer.put('', list1);",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db;",
        "",
        "import java.sql.ResultSet;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.Map;",
        "",
        "/**",
        "  select ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,mainAddress.id as mainAddress_id,mainAddress.customerId as mainAddress_customerId,mainCustomer.mainCustomerId as mainCustomer_mainCustomerId,mainCustomer.id as mainCustomer_id,mainAddress.zzline1 as mainAddress_zzline1,mainAddress.zzline2 as mainAddress_zzline2",
        "  from ADD_TBL mainAddress",
        "  where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,mainAddress.id = mainAddress.customerId,mainCustomer.mainCustomerId = mainCustomer.id",
        "*/",
        "public class JointAccount_jointAccountMaps0 {",
        "  public final Object ACC_TBL_acc_id;",
        "  public final Object ACC_TBL_brand_id;",
        "  public final Object mainAddress_id;",
        "  public final Object mainAddress_customerId;",
        "  public final Object mainCustomer_mainCustomerId;",
        "  public final Object mainCustomer_id;",
        "  ",
        "  public final Map<String,Object> mainAddress = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps0(ResultSet rs) throws SQLException{",
        "    this.mainAddress.put('line1', rs.getString('mainAddress_zzline1'));",
        "    this.mainAddress.put('line2', rs.getString('mainAddress_zzline2'));",
        "    ",
        "    this.ACC_TBL_acc_id = rs.getInt('{ACC_TBL_acc_id');",
        "    this.ACC_TBL_brand_id = rs.getInt('{ACC_TBL_brand_id');",
        "    this.mainAddress_id = rs.getInt('{mainAddress_id');",
        "    this.mainAddress_customerId = rs.getInt('{mainAddress_customerId');",
        "    this.mainCustomer_mainCustomerId = rs.getInt('{mainCustomer_mainCustomerId');",
        "    this.mainCustomer_id = rs.getInt('{mainCustomer_id');",
        "    ",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db;",
        "",
        "import java.sql.ResultSet;",
        "import java.sql.SQLException;",
        "import java.util.HashMap;",
        "import java.util.List;",
        "import java.util.Map;",
        "",
        "/**",
        "  select ACC_TBL.acc_id as ACC_TBL_acc_id,ACC_TBL.brand_id as ACC_TBL_brand_id,jointAddress.id as jointAddress_id,jointAddress.customerId as jointAddress_customerId,jointCustomer.jointCustomerId as jointCustomer_jointCustomerId,jointCustomer.id as jointCustomer_id,jointAddress.zzline1 as jointAddress_zzline1,jointAddress.zzline2 as jointAddress_zzline2",
        "  from ADD_TBL jointAddress",
        "  where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,jointAddress.id = jointAddress.customerId,jointCustomer.jointCustomerId = jointCustomer.id",
        "*/",
        "public class JointAccount_jointAccountMaps1 {",
        "  public final Object ACC_TBL_acc_id;",
        "  public final Object ACC_TBL_brand_id;",
        "  public final Object jointAddress_id;",
        "  public final Object jointAddress_customerId;",
        "  public final Object jointCustomer_jointCustomerId;",
        "  public final Object jointCustomer_id;",
        "  ",
        "  public final Map<String,Object> jointAddress = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps1(ResultSet rs) throws SQLException{",
        "    this.jointAddress.put('line1', rs.getString('jointAddress_zzline1'));",
        "    this.jointAddress.put('line2', rs.getString('jointAddress_zzline2'));",
        "    ",
        "    this.ACC_TBL_acc_id = rs.getInt('{ACC_TBL_acc_id');",
        "    this.ACC_TBL_brand_id = rs.getInt('{ACC_TBL_brand_id');",
        "    this.jointAddress_id = rs.getInt('{jointAddress_id');",
        "    this.jointAddress_customerId = rs.getInt('{jointAddress_customerId');",
        "    this.jointCustomer_jointCustomerId = rs.getInt('{jointCustomer_jointCustomerId');",
        "    this.jointCustomer_id = rs.getInt('{jointCustomer_id');",
        "    ",
        "  }",
        "}"
      ]
    ])

  } )
} )
