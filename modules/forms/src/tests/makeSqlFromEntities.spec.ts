import { ChildEntity, createTableSql, EntityFolder, findAliasAndTableLinksForLinkData, findAllFields, findAllTableAndFieldDatasIn, findAllTableAndFieldsIn, findFieldsFromWhere, findSqlLinkDataFromRootAndDataD, findSqlRoots, findTableAliasAndFieldFromDataD, findTableAndFieldFromDataD, findWhereLinkDataForLinkData, findWhereLinksForSqlRoot, findWhereLinksForSqlRootGoingUp, foldEntitys, generateGetSql, MainEntity, MultipleEntity, simplifyAliasAndChildEntityPath, simplifyAliasAndTables, simplifySqlLinkData, simplifySqlRoot, simplifyWhereFromQuery, simplifyWhereLinks, SingleEntity, walkSqlRoots, whereFieldToFieldData } from "../codegen/makeSqlFromEntities";
import { EntityAndWhere, unique } from "../common/restD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { simplifyTableAndFieldAndAliasDataArray, simplifyTableAndFieldData, simplifyTableAndFieldDataArray, simplifyTableAndFieldsData } from "../codegen/makeJavaSql";
import { nameAndAddressDataD, postCodeDataLineD } from "../example/postCodeDemo/addressSearch.dataD";
import { addressRestD, postcodeRestD } from "../example/postCodeDemo/addressSearch.restD";
import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { jointAccountRestD } from "../example/jointAccount/jointAccount.restD";

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
describe ( "whereFieldToFieldData", () => {
  it ( "should work with no type specified (defaulting to integer)", () => {
    expect ( whereFieldToFieldData ( 'someErrorPrefix', 'someField' ) ).toEqual ( { "dbType": "integer", "fieldName": "someField", "reactType": "number", "rsGetter": "getInt" } )
  } )
  it ( "should work with string type specified", () => {
    expect ( whereFieldToFieldData ( 'someErrorPrefix', 'someField:string' ) ).toEqual ( { "dbType": "string", "fieldName": "someField", "reactType": "string", "rsGetter": "getString" } )
  } )
  it ( "should work with integer type specified ", () => {
    expect ( whereFieldToFieldData ( 'someErrorPrefix', 'someField:integer' ) ).toEqual ( { "dbType": "integer", "fieldName": "someField", "reactType": "number", "rsGetter": "getInt" } )
  } )

} )
describe ( "findFieldsFromWhere", () => {
  it ( "find the fields in the where clauses. These will be merged with the fields in the 'DataD' and deduped later. ", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r =>
      unique ( simplifyTableAndFieldAndAliasDataArray ( findFieldsFromWhere ( 'someErrorPrefix', findWhereLinksForSqlRoot ( r ) ) ), s => s ) ) ).toEqual ( [
      [
        "mainCustomer:CUST_TBL.nameId",
        "mainName:NAME_TBL.id",
        "ACC_TBL:ACC_TBL.mainCustomerId",
        "mainCustomer:CUST_TBL.id",
        "jointCustomer:CUST_TBL.nameId",
        "jointName:NAME_TBL.id",
        "ACC_TBL:ACC_TBL.jointCustomerId",
        "jointCustomer:CUST_TBL.id",
        "ACC_TBL:ACC_TBL.acc_id",
        "ACC_TBL:ACC_TBL.brand_id"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id",
        "ACC_TBL:ACC_TBL.brand_id",
        "mainAddress:ADD_TBL.id",
        "mainAddress:ADD_TBL.customerId",
        "mainCustomer:CUST_TBL.mainCustomerId",
        "mainCustomer:CUST_TBL.id"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id",
        "ACC_TBL:ACC_TBL.brand_id",
        "jointAddress:ADD_TBL.id",
        "jointAddress:ADD_TBL.customerId",
        "jointCustomer:CUST_TBL.jointCustomerId",
        "jointCustomer:CUST_TBL.id"
      ]
    ] )
  } )

} )

describe ( "findTableAndFieldFromDataD", () => {
  it ( "find the tables and fields from a dataD -simple ", () => {
    expect ( findTableAndFieldFromDataD ( nameAndAddressDataD ).map ( simplifyTableAndFieldData ) ).toEqual ( [
      "ADD_TBL.zzline1",
      "ADD_TBL.zzline2",
      "ADD_TBL.zzline3",
      "ADD_TBL.zzline4"
    ] )
  } )
  it ( "find the tables and fields from a dataD. ", () => {
    expect ( findTableAndFieldFromDataD ( JointAccountDd ).map ( simplifyTableAndFieldData ) ).toEqual ( [
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
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findTableAliasAndFieldFromDataD ( r, fromDataD ) ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname",
        "jointName:NAME_TBL.zzname",
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
  it ( "should aggregate the fields from the where and from the dataD - simple ", () => {
    expect ( walkSqlRoots ( findSqlRoots ( addressRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, nameAndAddressDataD, findWhereLinksForSqlRootGoingUp ( r ) ) ) ) ).toEqual ( [
      [
        "ADD_TBL:ADD_TBL.zzline1",
        "ADD_TBL:ADD_TBL.zzline2",
        "ADD_TBL:ADD_TBL.zzline3",
        "ADD_TBL:ADD_TBL.zzline4"
      ]
    ] )
  } )

  it ( "should aggregate the fields from the where and from the dataD ", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, JointAccountDd, findWhereLinksForSqlRootGoingUp ( r ) ) ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname",
        "jointName:NAME_TBL.zzname",
        "ACC_TBL:ACC_TBL.blnc"
      ],
      [
        "mainAddress:ADD_TBL.id",
        "mainAddress:ADD_TBL.customerId",
        "mainCustomer:CUST_TBL.mainCustomerId",
        "mainCustomer:CUST_TBL.id",
        "mainAddress:ADD_TBL.zzline1",
        "mainAddress:ADD_TBL.zzline2"
      ],
      [
        "jointAddress:ADD_TBL.id",
        "jointAddress:ADD_TBL.customerId",
        "jointCustomer:CUST_TBL.jointCustomerId",
        "jointCustomer:CUST_TBL.id",
        "jointAddress:ADD_TBL.zzline1",
        "jointAddress:ADD_TBL.zzline2"
      ]
    ] )
  } )
} )

describe ( "findSqlLinkDataFromRootAndDataD", () => {
  it ( "should create the data for the links in postCodeDataLineD (simple)", () => {
    expect ( walkSqlRoots ( findSqlRoots ( addressRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, postCodeDataLineD ) ) ) ).toEqual ( [
      [
        "sqlRoot: ADD_TBL",
        "fields: ADD_TBL:ADD_TBL.postcode,ADD_TBL:ADD_TBL.zzline1,ADD_TBL:ADD_TBL.zzline2,ADD_TBL:ADD_TBL.zzline3,ADD_TBL:ADD_TBL.zzline4",
        "aliasAndTables ADD_TBL->ADD_TBL",
        "where param postcode == ADD_TBL:ADD_TBL.postcode"
      ]
    ] )
  } )

  it ( "shouldCreate the data for the links in accountD", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "sqlRoot: ACC_TBL",
        "fields: mainCustomer:CUST_TBL.nameId,mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId,mainCustomer:CUST_TBL.id,jointCustomer:CUST_TBL.nameId,jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId,jointCustomer:CUST_TBL.id,ACC_TBL:ACC_TBL.acc_id,ACC_TBL:ACC_TBL.brand_id,mainName:NAME_TBL.zzname,jointName:NAME_TBL.zzname,ACC_TBL:ACC_TBL.blnc",
        "aliasAndTables mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL,ACC_TBL->ACC_TBL",
        "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer,param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id,ACC_TBL:ACC_TBL.brand_id,mainAddress:ADD_TBL.id,mainAddress:ADD_TBL.customerId,mainCustomer:CUST_TBL.mainCustomerId,mainCustomer:CUST_TBL.id,mainAddress:ADD_TBL.zzline1,mainAddress:ADD_TBL.zzline2",
        "aliasAndTables mainAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,mainAddress:ADD_TBL.id == mainAddress:ADD_TBL.customerId,mainCustomer:CUST_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id,ACC_TBL:ACC_TBL.brand_id,jointAddress:ADD_TBL.id,jointAddress:ADD_TBL.customerId,jointCustomer:CUST_TBL.jointCustomerId,jointCustomer:CUST_TBL.id,jointAddress:ADD_TBL.zzline1,jointAddress:ADD_TBL.zzline2",
        "aliasAndTables jointAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,jointAddress:ADD_TBL.id == jointAddress:ADD_TBL.customerId,jointCustomer:CUST_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
      ]
    ] )
  } )
} )
describe ( "generateGetSql", () => {
  it ( "should generate the get sql", () => {
    expect ( walkSqlRoots ( findSqlRoots ( theRestD.tables ), r => generateGetSql ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd ) ) ) ).toEqual ( [
      [
        "select mainCustomer.nameId,mainName.id,ACC_TBL.mainCustomerId,mainCustomer.id,jointCustomer.nameId,jointName.id,ACC_TBL.jointCustomerId,jointCustomer.id,ACC_TBL.acc_id,ACC_TBL.brand_id,mainName.zzname,jointName.zzname,ACC_TBL.blnc",
        "from NAME_TBL mainName,CUST_TBL mainCustomer,NAME_TBL jointName,CUST_TBL jointCustomer,ACC_TBL ACC_TBL",
        "where mainCustomer.nameId = mainName.id,ACC_TBL.mainCustomerId = mainCustomer.id,jointCustomer.nameId = jointName.id,ACC_TBL.jointCustomerId = jointCustomer.id, ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?"
      ],
      [
        "select ACC_TBL.acc_id,ACC_TBL.brand_id,mainAddress.id,mainAddress.customerId,mainCustomer.mainCustomerId,mainCustomer.id,mainAddress.zzline1,mainAddress.zzline2",
        "from ADD_TBL mainAddress",
        "where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,mainAddress.id = mainAddress.customerId,mainCustomer.mainCustomerId = mainCustomer.id"
      ],
      [
        "select ACC_TBL.acc_id,ACC_TBL.brand_id,jointAddress.id,jointAddress.customerId,jointCustomer.jointCustomerId,jointCustomer.id,jointAddress.zzline1,jointAddress.zzline2",
        "from ADD_TBL jointAddress",
        "where  ACC_TBL.acc_id = ?, ACC_TBL.brand_id = ?,jointAddress.id = jointAddress.customerId,jointCustomer.jointCustomerId = jointCustomer.id"
      ]
    ] )
  } )

} )

describe ( "findAllTableAndFieldsIn", () => {
  it ( "should find the table from a simple rest", () => {
    expect ( simplifyTableAndFieldDataArray ( findAllTableAndFieldsIn ( [ PostCodeMainPage.rest.address ] ) ) ).toEqual ( [
      "ADD_TBL =>postcode",
      "ADD_TBL =>zzline1",
      "ADD_TBL =>zzline2",
      "ADD_TBL =>zzline3",
      "ADD_TBL =>zzline4"
    ] )
  } )


  it ( "should find the table  a table from multiple link datas.. because the tables can be used in multiple dataDs", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( simplifyTableAndFieldDataArray ( findAllTableAndFieldsIn ( rdps ) ) ).toEqual ( [
      "CUST_TBL =>nameId",
      "NAME_TBL =>id",
      "ACC_TBL =>mainCustomerId",
      "CUST_TBL =>id",
      "ACC_TBL =>jointCustomerId",
      "ACC_TBL =>acc_id",
      "ACC_TBL =>brand_id",
      "NAME_TBL =>zzname",
      "ACC_TBL =>blnc",
      "ADD_TBL =>id",
      "ADD_TBL =>customerId",
      "CUST_TBL =>mainCustomerId",
      "ADD_TBL =>zzline1",
      "ADD_TBL =>zzline2",
      "CUST_TBL =>jointCustomerId",
      "ADD_TBL =>postcode",
      "ADD_TBL =>zzline3",
      "ADD_TBL =>zzline4"
    ] )
  } )

} )

describe ( "findAllTableAndFieldDatasIn", () => {
  it ( "should group the field data by table", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( findAllTableAndFieldDatasIn ( rdps ).map ( simplifyTableAndFieldsData ) ).toEqual ( [
      "CUST_TBL => nameId:number,id:number,mainCustomerId:number,jointCustomerId:number",
      "NAME_TBL => id:number,zzname:string",
      "ACC_TBL => mainCustomerId:number,jointCustomerId:number,acc_id:number,brand_id:number,blnc:number",
      "ADD_TBL => id:number,customerId:number,zzline1:string,zzline2:string,postcode:number,zzline3:string,zzline4:string"
    ] )
  } )
} )

describe ( "createTableSql", () => {
  it ( "should make h2 compatible create table ", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address ];
    expect ( createTableSql( rdps ) ).toEqual ( {
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
        "create table CUST_TBL(",
        "  nameId integer,",
        "  id integer,",
        "  mainCustomerId integer,",
        "  jointCustomerId integer",
        ")"
      ],
      "NAME_TBL": [
        "create table NAME_TBL(",
        "  id integer,",
        "  zzname varchar(256)",
        ")"
      ]
    })

  } )
} )

