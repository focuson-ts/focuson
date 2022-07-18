import { ChildEntity, createTableSql, EntityFolder, findAliasAndTableLinksForLinkData, findAllFields, findAllTableAndFieldDatasIn, findAllTableAndFieldsIn, findFieldsFromWhere, findParamsForTable, findSqlLinkDataFromRootAndDataD, findSqlRoot, findTableAliasAndFieldFromDataD, findTableAndFieldFromDataD, findWhereLinksForSqlRoot, findWhereLinksForSqlRootGoingUp, foldEntitys, generateGetSql, getStrategy, JavaQueryParamDetails, MainEntity, makeInsertSqlForIds, makeInsertSqlForNoIds, makeMapsForRest, makeWhereClause, MultipleEntity, simplifyAliasAndChildEntityPath, simplifyAliasAndTables, simplifySqlLinkData, simplifySqlRoot, simplifyTableAndFieldAndAliasDataArray, simplifyTableAndFieldData, simplifyTableAndFieldDataArray, simplifyTableAndFieldsData, simplifyWhereFromQuery, simplifyWhereLinks, SingleEntity, walkSqlRoots, whereFieldToFieldDataFromTableQueryLink, whereFieldToFieldDataFromTableWhereLink } from "../codegen/makeSqlFromEntities";
import { AllLensRestParams, EntityAndWhere, IntParam, StringParam } from "../common/restD";
import { JointAccountCustomerDD, JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { nameAndAddressDataD, postCodeSearchResponseDD } from "../example/postCodeDemo/addressSearch.dataD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";
import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { jointAccountRestD } from "../example/jointAccount/jointAccount.restD";
import { paramsForTest } from "./paramsForTest";
import { fromCommonIds } from "../example/commonIds";
import { accountT, addT } from "../example/database/tableNames";
import { safeArray, unique } from "@focuson/utils";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { jointAccountSql } from "../example/jointAccount/jointAccount.sql";
import { ExampleDataD } from "../example/common";
import { DateDD, MoneyDD } from "../common/dataD";

const jointAccountRestDTables = jointAccountRestD.tables
if ( jointAccountRestDTables === undefined ) throw Error ( "jointAccountRestDTables must be defined" )
const eAccountsSummaryRestDTables = eAccountsSummaryRestD.tables
const eAccountsSummaryRestParams = eAccountsSummaryRestD.params
const createPlanRestDTables = createPlanRestD.tables
// if ( createPlanRestDTables === undefined ) throw Error ( "createPlanRestDTables must be defined" )
const createPlanRestParams = createPlanRestD.params
const jointAccountRestParams = jointAccountRestD.params
const addressRestDTables = addressRestD.tables
const addressRestDParams = addressRestD.params
if ( addressRestDTables === undefined ) throw Error ( "addressRestDTables must be defined" )

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
    expect ( foldEntitys ( testFolder, jointAccountRestDTables, jointAccountRestDTables.entity, undefined, [] ) ).toEqual ( [
      "multiple ACC_TBL path [mainCustomer -> CUST_TBL] => ADD_TBL -- fp main",
      "single ACC_TBL path [mainCustomer -> CUST_TBL] => NAME_TBL -- fp main",
      "single ACC_TBL path [] => CUST_TBL -- fp main",
      "multiple ACC_TBL path [jointCustomer -> CUST_TBL] => ADD_TBL -- fp joint",
      "single ACC_TBL path [jointCustomer -> CUST_TBL] => NAME_TBL -- fp joint",
      "single ACC_TBL path [] => CUST_TBL -- fp joint",
      "main: ACC_TBL where: ACC_TBL:ACC_TBL.acc_id==accountId , ACC_TBL:ACC_TBL.brand_id==brandRef "
    ] )
  } )
} )

describe ( "findSqlRoots", () => {
  it ( "should find a root for the main and each multiple", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), simplifySqlRoot ) ).toEqual ( [
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL] filterPath: undefined",
      "main ACC_TBL path [mainCustomer -> CUST_TBL] root ADD_TBL children [] filterPath: main",
      "main ACC_TBL path [jointCustomer -> CUST_TBL] root ADD_TBL children [] filterPath: joint"
    ] )
  } )
} )

describe ( "findAliasAndTablesLinksForLinkDataFolder", () => {
  it ( "should generate aliasAndTables", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r => simplifyAliasAndTables ( findAliasAndTableLinksForLinkData ( r ) ) ) ).toEqual ( [
      "j->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
      "j->ACC_TBL,mainCustomer->CUST_TBL,mainAddress->ADD_TBL",
      "j->ACC_TBL,jointCustomer->CUST_TBL,jointAddress->ADD_TBL"
    ])
  } )
} )
describe ( "findWhereLinkDataForLinkData", () => {
    it ( "should generate  findWhereLinkDataForLinkData", () => {
      expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r => simplifyWhereLinks ( findWhereLinksForSqlRoot ( r ) ) ) ).toEqual ( [
        [
          "mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id",
          "j:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer",
          "jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id",
          "j:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer",
          "param accountId == j:ACC_TBL.acc_id",
          "param brandRef == j:ACC_TBL.brand_id"
        ],
        [
          "param accountId == j:ACC_TBL.acc_id",
          "param brandRef == j:ACC_TBL.brand_id",
          "mainCustomer:CUST_TBL.id == mainAddress:ADD_TBL.customerId",
          "j:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
        ],
        [
          "param accountId == j:ACC_TBL.acc_id",
          "param brandRef == j:ACC_TBL.brand_id",
          "jointCustomer:CUST_TBL.id == jointAddress:ADD_TBL.customerId",
          "j:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
        ]
      ])
    } )
  }
)
describe ( "whereFieldToFieldData. Note that the undefined gets fixed later in the process", () => {
  it ( "should work with no type specified (defaulting to integer)", () => {
    expect ( whereFieldToFieldDataFromTableWhereLink ( 'someErrorPrefix', 'someField' ) ).toEqual ( { "dbType": "integer", "dbFieldName": "someField", "reactType": "number", "rsGetter": "getInt", "sample": [] } )
  } )
  it ( "should work with string type specified", () => {
    expect ( whereFieldToFieldDataFromTableWhereLink ( 'someErrorPrefix', 'someField:string' ) ).toEqual ( { "dbType": "varchar(255)", "dbFieldName": "someField", "reactType": "string", "rsGetter": "getString", "sample": [] } )
  } )
  it ( "should work with integer type specified ", () => {
    expect ( whereFieldToFieldDataFromTableWhereLink ( 'someErrorPrefix', 'someField:integer' ) ).toEqual ( { "dbType": "integer", "dbFieldName": "someField", "reactType": "number", "rsGetter": "getInt", "sample": [] } )
  } )

  it ( "should work with where clauses - ints ", () => {
    expect ( whereFieldToFieldDataFromTableQueryLink ( 'someErrorPrefix',
      { table: accountT, field: 'id', alias: 'all', paramName: 'accountId' },
      fromCommonIds ( 'accountId', 'employeeType' ) ) ).toEqual ( {
      "dbFieldName": "id",
      "dbType": "integer",
      "reactType": "number",
      "rsGetter": "getInt",
      "sample": []
    } )
  } )
  it ( "should work with where clauses - strings ", () => {
    expect ( whereFieldToFieldDataFromTableQueryLink ( 'someErrorPrefix',
      { table: accountT, field: 'id', alias: 'all', paramName: 'employeeType' },
      fromCommonIds ( 'accountId', 'employeeType' ) ) ).toEqual ( {
      "dbFieldName": "id",
      "dbType": "varchar(255)",
      "reactType": "string",
      "rsGetter": "getString",
      "sample": []
    } )
  } )

} )
describe ( "findFieldsFromWhere", () => {
  it ( "find the fields in the where clauses. ", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r =>
      unique ( simplifyTableAndFieldAndAliasDataArray ( findFieldsFromWhere ( 'someErrorPrefix', findWhereLinksForSqlRoot ( r ), jointAccountRestParams ) ), s => s ) ) ).toEqual ( [
      [
        "mainCustomer:CUST_TBL.nameId/undefined",
        "mainName:NAME_TBL.id/undefined",
        "j:ACC_TBL.mainCustomerId/undefined",
        "mainCustomer:CUST_TBL.id/undefined",
        "jointCustomer:CUST_TBL.nameId/undefined",
        "jointName:NAME_TBL.id/undefined",
        "j:ACC_TBL.jointCustomerId/undefined",
        "jointCustomer:CUST_TBL.id/undefined",
        "j:ACC_TBL.acc_id/undefined",
        "j:ACC_TBL.brand_id/undefined"
      ],
      [
        "j:ACC_TBL.acc_id/undefined",
        "j:ACC_TBL.brand_id/undefined",
        "mainCustomer:CUST_TBL.id/undefined",
        "mainAddress:ADD_TBL.customerId/undefined",
        "j:ACC_TBL.mainCustomerId/undefined"
      ],
      [
        "j:ACC_TBL.acc_id/undefined",
        "j:ACC_TBL.brand_id/undefined",
        "jointCustomer:CUST_TBL.id/undefined",
        "jointAddress:ADD_TBL.customerId/undefined",
        "j:ACC_TBL.jointCustomerId/undefined"
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
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r => simplifyTableAndFieldAndAliasDataArray ( findTableAliasAndFieldFromDataD ( r, fromDataD ), true ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name/main,name",
        "jointName:NAME_TBL.zzname/name/joint,name",
        "j:ACC_TBL.blnc/balance/balance"
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
    expect ( walkSqlRoots ( findSqlRoot ( addressRestDTables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, nameAndAddressDataD, findWhereLinksForSqlRootGoingUp ( r ), addressRestDParams ) ) ) ).toEqual ( [
      [
        "ADD_TBL:ADD_TBL.zzline1/line1",
        "ADD_TBL:ADD_TBL.zzline2/line2",
        "ADD_TBL:ADD_TBL.zzline3/line3",
        "ADD_TBL:ADD_TBL.zzline4/line4"
      ]
    ] )
  } )

  it ( "should findWhereLinksForSqlRootsGoingUp", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r => simplifyWhereLinks ( findWhereLinksForSqlRootGoingUp ( r ) ) ) ).toEqual ( [
      [],
      [
        "mainCustomer:CUST_TBL.id == mainAddress:ADD_TBL.customerId",
        "j:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
      ],
      [
        "jointCustomer:CUST_TBL.id == jointAddress:ADD_TBL.customerId",
        "j:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
      ]
    ] )
  } )

  it ( "should aggregate the fields from the where and from the dataD ", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, JointAccountDd, findWhereLinksForSqlRootGoingUp ( r ), jointAccountRestParams ), true ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name/main,name",
        "jointName:NAME_TBL.zzname/name/joint,name",
        "j:ACC_TBL.blnc/balance/balance"
      ],
      [
        "mainCustomer:CUST_TBL.id/undefined",
        "mainAddress:ADD_TBL.customerId/undefined",
        "j:ACC_TBL.mainCustomerId/undefined",
        "mainAddress:ADD_TBL.zzline1/line1/main,addresses,line1",
        "mainAddress:ADD_TBL.zzline2/line2/main,addresses,line2"
      ],
      [
        "jointCustomer:CUST_TBL.id/undefined",
        "jointAddress:ADD_TBL.customerId/undefined",
        "j:ACC_TBL.jointCustomerId/undefined",
        "jointAddress:ADD_TBL.zzline1/line1/joint,addresses,line1",
        "jointAddress:ADD_TBL.zzline2/line2/joint,addresses,line2"
      ]
    ] )
  } )
} )

describe ( "findSqlLinkDataFromRootAndDataD", () => {
  it ( "should create the data for the links in nameAndAddressDataD (simple)", () => {
    expect ( walkSqlRoots ( findSqlRoot ( addressRestDTables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, nameAndAddressDataD, addressRestDParams ) ) ) ).toEqual ( [
      [
        "sqlRoot: ADD_TBL",
        "fields: ADD_TBL:ADD_TBL.zzline1/line1,ADD_TBL:ADD_TBL.zzline2/line2,ADD_TBL:ADD_TBL.zzline3/line3,ADD_TBL:ADD_TBL.zzline4/line4",
        "aliasAndTables ADD_TBL->ADD_TBL",
        "where "
      ]
    ] )
  } )

  it ( "shouldCreate the data for the links in accountD", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r => simplifySqlLinkData ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd, jointAccountRestParams ) ) ) ).toEqual ( [
      [
        "sqlRoot: ACC_TBL",
        "fields: mainCustomer:CUST_TBL.nameId/undefined,mainName:NAME_TBL.id/undefined,j:ACC_TBL.mainCustomerId/undefined,mainCustomer:CUST_TBL.id/undefined,jointCustomer:CUST_TBL.nameId/undefined,jointName:NAME_TBL.id/undefined,j:ACC_TBL.jointCustomerId/undefined,jointCustomer:CUST_TBL.id/undefined,j:ACC_TBL.acc_id/undefined,j:ACC_TBL.brand_id/undefined,mainName:NAME_TBL.zzname/name,jointName:NAME_TBL.zzname/name,j:ACC_TBL.blnc/balance",
        "aliasAndTables j->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
        "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,j:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,j:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer,param accountId == j:ACC_TBL.acc_id,param brandRef == j:ACC_TBL.brand_id"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: j:ACC_TBL.acc_id/undefined,j:ACC_TBL.brand_id/undefined,mainCustomer:CUST_TBL.id/undefined,mainAddress:ADD_TBL.customerId/undefined,j:ACC_TBL.mainCustomerId/undefined,mainAddress:ADD_TBL.zzline1/line1,mainAddress:ADD_TBL.zzline2/line2",
        "aliasAndTables j->ACC_TBL,mainCustomer->CUST_TBL,mainAddress->ADD_TBL",
        "where param accountId == j:ACC_TBL.acc_id,param brandRef == j:ACC_TBL.brand_id,mainCustomer:CUST_TBL.id == mainAddress:ADD_TBL.customerId,j:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: j:ACC_TBL.acc_id/undefined,j:ACC_TBL.brand_id/undefined,jointCustomer:CUST_TBL.id/undefined,jointAddress:ADD_TBL.customerId/undefined,j:ACC_TBL.jointCustomerId/undefined,jointAddress:ADD_TBL.zzline1/line1,jointAddress:ADD_TBL.zzline2/line2",
        "aliasAndTables j->ACC_TBL,jointCustomer->CUST_TBL,jointAddress->ADD_TBL",
        "where param accountId == j:ACC_TBL.acc_id,param brandRef == j:ACC_TBL.brand_id,jointCustomer:CUST_TBL.id == jointAddress:ADD_TBL.customerId,j:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer"
      ]
    ] )
  } )
} )
describe ( "generateGetSql", () => {
  it ( "should generate the get sql", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), r => generateGetSql ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd, jointAccountRestParams ) ) ) ).toEqual ( [
      [
        "select",
        "  mainCustomer.nameId as mainCustomer_nameId,",
        "  mainName.id as mainName_id,",
        "  j.mainCustomerId as j_mainCustomerId,",
        "  mainCustomer.id as mainCustomer_id,",
        "  jointCustomer.nameId as jointCustomer_nameId,",
        "  jointName.id as jointName_id,",
        "  j.jointCustomerId as j_jointCustomerId,",
        "  jointCustomer.id as jointCustomer_id,",
        "  j.acc_id as j_acc_id,",
        "  j.brand_id as j_brand_id,",
        "  mainName.zzname as mainName_zzname,",
        "  jointName.zzname as jointName_zzname,",
        "  j.blnc as j_blnc",
        " from",
        "  ACC_TBL j,",
        "  NAME_TBL mainName,",
        "  CUST_TBL mainCustomer,",
        "  NAME_TBL jointName,",
        "  CUST_TBL jointCustomer",
        " where mainCustomer.nameId = mainName.id and j.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and j.jointCustomerId = jointCustomer.id and  j.acc_id = ? and  j.brand_id = ? and 3=3 and 1=1 and 123=123 and ACC_TBL <> 'canceled'"
      ],
      [
        "select",
        "  j.acc_id as j_acc_id,",
        "  j.brand_id as j_brand_id,",
        "  mainCustomer.id as mainCustomer_id,",
        "  mainAddress.customerId as mainAddress_customerId,",
        "  j.mainCustomerId as j_mainCustomerId,",
        "  mainAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,",
        "  mainAddress.zzline2 as mainAddress_zzline2",
        " from",
        "  ACC_TBL j,",
        "  CUST_TBL mainCustomer,",
        "  ADD_TBL mainAddress",
        " where  j.acc_id = ? and  j.brand_id = ? and mainCustomer.id = mainAddress.customerId and j.mainCustomerId = mainCustomer.id and 123=123 and 2=2 and 1=1"
      ],
      [
        "select",
        "  j.acc_id as j_acc_id,",
        "  j.brand_id as j_brand_id,",
        "  jointCustomer.id as jointCustomer_id,",
        "  jointAddress.customerId as jointAddress_customerId,",
        "  j.jointCustomerId as j_jointCustomerId,",
        "  jointAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,",
        "  jointAddress.zzline2 as jointAddress_zzline2",
        " from",
        "  ACC_TBL j,",
        "  CUST_TBL jointCustomer,",
        "  ADD_TBL jointAddress",
        " where  j.acc_id = ? and  j.brand_id = ? and jointCustomer.id = jointAddress.customerId and j.jointCustomerId = jointCustomer.id and 123=123"
      ]
    ] )
  } )

} )

describe ( "findAllTableAndFieldsIn", () => {
  it ( "should find the table from a simple rest", () => {
    expect ( simplifyTableAndFieldDataArray ( findAllTableAndFieldsIn ( [ PostCodeMainPage.rest.address ] ) ) ).toEqual ( [
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
      "ADD_TBL => customerId/undefined:number,zzline1/line1:string/main,addresses,line1,zzline2/line2:string/main,addresses,line2,zzline3/line3:string/line3,zzline4/line4:string/line4"
    ] ) //where did post code go?
  } )
} )

describe ( "createTableSql", () => {
  it ( "should make h2 compatible create table ", () => {
    let rdps = [ JointAccountPageD.rest.jointAccount, PostCodeMainPage.rest.address, PostCodeMainPage.rest.postcode ];
    expect ( createTableSql ( rdps ) ).toEqual ( {
      "ACC_TBL": [
        "create table ACC_TBL(",
        "  mainCustomerId integer,",
        "  jointCustomerId integer,",
        "  acc_id integer,",
        "  brand_id integer,",
        "  blnc number",
        ")"
      ],
      "ADD_TBL": [
        "create table ADD_TBL(",
        "  customerId integer,",
        "  zzline1 varchar(255),",
        "  zzline2 varchar(255),",
        "  zzline3 varchar(255),",
        "  zzline4 varchar(255)",
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
        "  zzname varchar(255)",
        ")"
      ],
      "POSTCODE": [
        "create table POSTCODE(",
        "  PC_POSTCODE varchar(255),",
        "  zzline1 varchar(255),",
        "  zzline2 varchar(255),",
        "  zzline3 varchar(255),",
        "  zzline4 varchar(255)",
        ")"
      ]
    } )
  } )


} )

describe ( "makeMapsForRest", () => {
  it ( "should make maps for each sql root, from the link data, for a 'single item'", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), ( r, path ) => {
      const ld = findSqlLinkDataFromRootAndDataD ( r, JointAccountDd, jointAccountRestParams )
      return makeMapsForRest ( paramsForTest, JointAccountPageD, 'jointAccount', JointAccountPageD.rest.jointAccount, ld, path, r.children.length )
    } ).map ( s => s.map ( s => s.replace ( /"/g, "'" ) ) ) ).toEqual ( [
      [
        "package focuson.data.db.JointAccount;",
        "",
        "import org.slf4j.Logger;",
        "import org.slf4j.LoggerFactory;",
        "import java.text.MessageFormat;",
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
        "import focuson.data.utils.DateFormatter;",
        "",
        "//{'accountId':{'rsSetter':'setInt','javaType':'int','graphQlType':'Int','typeScriptType':'number','javaParser':'Integer.parseInt','commonLens':'accountId','testValue':44444444},'brandRef':{'rsSetter':'setInt','javaType':'int','graphQlType':'Int','typeScriptType':'number','javaParser':'Integer.parseInt','commonLens':'brandRef','testValue':10},'dbName':{'rsSetter':'setString','javaType':'String','graphQlType':'String','typeScriptType':'string','javaParser':'','commonLens':'dbName','testValue':'mock'}}",
        "public class JointAccount_jointAccountMaps {",
        "",
        "  static Logger logger = LoggerFactory.getLogger(JointAccount_jointAccountMaps.class);",
        "",
        "  @SuppressWarnings('SqlResolve')",
        "  public static String sql = 'select'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,'+",
        "  '  mainName.id as mainName_id,'+",
        "  '  j.mainCustomerId as j_mainCustomerId,'+",
        "  '  mainCustomer.id as mainCustomer_id,'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,'+",
        "  '  jointName.id as jointName_id,'+",
        "  '  j.jointCustomerId as j_jointCustomerId,'+",
        "  '  jointCustomer.id as jointCustomer_id,'+",
        "  '  j.acc_id as j_acc_id,'+",
        "  '  j.brand_id as j_brand_id,'+",
        "  '  mainName.zzname as mainName_zzname,'+",
        "  '  jointName.zzname as jointName_zzname,'+",
        "  '  j.blnc as j_blnc'+",
        "  ' from'+",
        "  '  ACC_TBL j,'+",
        "  '  NAME_TBL mainName,'+",
        "  '  CUST_TBL mainCustomer,'+",
        "  '  NAME_TBL jointName,'+",
        "  '  CUST_TBL jointCustomer'+",
        "  ' where mainCustomer.nameId = mainName.id and j.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and j.jointCustomerId = jointCustomer.id and  j.acc_id = ? and  j.brand_id = ? and 3=3 and 1=1 and 123=123 and ACC_TBL <> 'canceled'';",
        "  ",
        "  public static Optional<Map<String,Object>> getAll(Connection connection,int accountId,int brandRef) throws SQLException {",
        "  //from JointAccount.rest[jointAccount].dataDD which is of type JointAccount",
        "     return get(connection,accountId,brandRef,get0(connection,accountId,brandRef),get1(connection,accountId,brandRef)).map(x -> x._root);",
        "  }",
        "  public static String allSql='select\\n'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,\\n'+",
        "  '  mainName.id as mainName_id,\\n'+",
        "  '  j.mainCustomerId as j_mainCustomerId,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,\\n'+",
        "  '  jointName.id as jointName_id,\\n'+",
        "  '  j.jointCustomerId as j_jointCustomerId,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  mainName.zzname as mainName_zzname,\\n'+",
        "  '  jointName.zzname as jointName_zzname,\\n'+",
        "  '  j.blnc as j_blnc\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  NAME_TBL mainName,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  NAME_TBL jointName,\\n'+",
        "  '  CUST_TBL jointCustomer\\n'+",
        "  ' where mainCustomer.nameId = mainName.id and j.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and j.jointCustomerId = jointCustomer.id and  j.acc_id = ? and  j.brand_id = ? and 3=3 and 1=1 and 123=123 and ACC_TBL <> 'canceled'\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  mainAddress.customerId as mainAddress_customerId,\\n'+",
        "  '  j.mainCustomerId as j_mainCustomerId,\\n'+",
        "  '  mainAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,\\n'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  ADD_TBL mainAddress\\n'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and mainCustomer.id = mainAddress.customerId and j.mainCustomerId = mainCustomer.id and 123=123 and 2=2 and 1=1\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  jointAddress.customerId as jointAddress_customerId,\\n'+",
        "  '  j.jointCustomerId as j_jointCustomerId,\\n'+",
        "  '  jointAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,\\n'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  CUST_TBL jointCustomer,\\n'+",
        "  '  ADD_TBL jointAddress\\n'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and jointCustomer.id = jointAddress.customerId and j.jointCustomerId = jointCustomer.id and 123=123\\n'+",
        "  '\\n';",
        "  public static Optional<JointAccount_jointAccountMaps> get(Connection connection, int accountId, int brandRef, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        logger.debug(MessageFormat.format('Duration: {0}', (System.nanoTime() - start) / 1000000.0));",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection, int accountId, int brandRef) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps0.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps0> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps0(rs));",
        "        logger.debug(MessageFormat.format('Duration: {0}, result: {1}', (System.nanoTime() - start) / 1000000.0, result ));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection, int accountId, int brandRef) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps1.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps1> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps1(rs));",
        "        logger.debug(MessageFormat.format('Duration: {0}, result: {1}', (System.nanoTime() - start) / 1000000.0, result ));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  ",
        "  public final Object mainCustomer_nameId;",
        "  public final Object mainName_id;",
        "  public final Object j_mainCustomerId;",
        "  public final Object mainCustomer_id;",
        "  public final Object jointCustomer_nameId;",
        "  public final Object jointName_id;",
        "  public final Object j_jointCustomerId;",
        "  public final Object jointCustomer_id;",
        "  public final Object j_acc_id;",
        "  public final Object j_brand_id;",
        "  ",
        "  public final Map<String,Object> _root = new HashMap<>();",
        "  public final Map<String,Object> main = new HashMap<>();",
        "  public final Map<String,Object> main_addresses = new HashMap<>();",
        "  public final Map<String,Object> joint = new HashMap<>();",
        "  public final Map<String,Object> joint_addresses = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps(ResultSet rs,List<JointAccount_jointAccountMaps0> list0,List<JointAccount_jointAccountMaps1> list1) throws SQLException{",
        "    this._root.put('balance', rs.getDouble('j_blnc'));",
        "    this.main.put('name', rs.getString('mainName_zzname'));",
        "    this.joint.put('name', rs.getString('jointName_zzname'));",
        "    ",
        "    this.mainCustomer_nameId = rs.getInt('mainCustomer_nameId');",
        "    this.mainName_id = rs.getInt('mainName_id');",
        "    this.j_mainCustomerId = rs.getInt('j_mainCustomerId');",
        "    this.mainCustomer_id = rs.getInt('mainCustomer_id');",
        "    this.jointCustomer_nameId = rs.getInt('jointCustomer_nameId');",
        "    this.jointName_id = rs.getInt('jointName_id');",
        "    this.j_jointCustomerId = rs.getInt('j_jointCustomerId');",
        "    this.jointCustomer_id = rs.getInt('jointCustomer_id');",
        "    this.j_acc_id = rs.getInt('j_acc_id');",
        "    this.j_brand_id = rs.getInt('j_brand_id');",
        "    ",
        "    _root.put('main', main);",
        "    main.put('addresses', main_addresses);",
        "    _root.put('joint', joint);",
        "    joint.put('addresses', joint_addresses);",
        "    ",
        "    this.main.put('addresses', list0.stream().map(m ->m.main_addresses).collect(Collectors.toList()));",
        "    this.joint.put('addresses', list1.stream().map(m ->m.joint_addresses).collect(Collectors.toList()));",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db.JointAccount;",
        "",
        "import org.slf4j.Logger;",
        "import org.slf4j.LoggerFactory;",
        "import java.text.MessageFormat;",
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
        "import focuson.data.utils.DateFormatter;",
        "",
        "//{'accountId':{'rsSetter':'setInt','javaType':'int','graphQlType':'Int','typeScriptType':'number','javaParser':'Integer.parseInt','commonLens':'accountId','testValue':44444444},'brandRef':{'rsSetter':'setInt','javaType':'int','graphQlType':'Int','typeScriptType':'number','javaParser':'Integer.parseInt','commonLens':'brandRef','testValue':10},'dbName':{'rsSetter':'setString','javaType':'String','graphQlType':'String','typeScriptType':'string','javaParser':'','commonLens':'dbName','testValue':'mock'}}",
        "public class JointAccount_jointAccountMaps0 {",
        "",
        "  static Logger logger = LoggerFactory.getLogger(JointAccount_jointAccountMaps0.class);",
        "",
        "  @SuppressWarnings('SqlResolve')",
        "  public static String sql = 'select'+",
        "  '  j.acc_id as j_acc_id,'+",
        "  '  j.brand_id as j_brand_id,'+",
        "  '  mainCustomer.id as mainCustomer_id,'+",
        "  '  mainAddress.customerId as mainAddress_customerId,'+",
        "  '  j.mainCustomerId as j_mainCustomerId,'+",
        "  '  mainAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2'+",
        "  ' from'+",
        "  '  ACC_TBL j,'+",
        "  '  CUST_TBL mainCustomer,'+",
        "  '  ADD_TBL mainAddress'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and mainCustomer.id = mainAddress.customerId and j.mainCustomerId = mainCustomer.id and 123=123 and 2=2 and 1=1';",
        "  ",
        "  public static Optional<Map<String,Object>> getAll(Connection connection,int accountId,int brandRef) throws SQLException {",
        "  //from JointAccount.rest[jointAccount].dataDD which is of type JointAccount",
        "     return get(connection,accountId,brandRef,get0(connection,accountId,brandRef),get1(connection,accountId,brandRef)).map(x -> x._root);",
        "  }",
        "  public static String allSql='select\\n'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,\\n'+",
        "  '  mainName.id as mainName_id,\\n'+",
        "  '  j.mainCustomerId as j_mainCustomerId,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,\\n'+",
        "  '  jointName.id as jointName_id,\\n'+",
        "  '  j.jointCustomerId as j_jointCustomerId,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  mainName.zzname as mainName_zzname,\\n'+",
        "  '  jointName.zzname as jointName_zzname,\\n'+",
        "  '  j.blnc as j_blnc\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  NAME_TBL mainName,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  NAME_TBL jointName,\\n'+",
        "  '  CUST_TBL jointCustomer\\n'+",
        "  ' where mainCustomer.nameId = mainName.id and j.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and j.jointCustomerId = jointCustomer.id and  j.acc_id = ? and  j.brand_id = ? and 3=3 and 1=1 and 123=123 and ACC_TBL <> 'canceled'\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  mainAddress.customerId as mainAddress_customerId,\\n'+",
        "  '  j.mainCustomerId as j_mainCustomerId,\\n'+",
        "  '  mainAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,\\n'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  ADD_TBL mainAddress\\n'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and mainCustomer.id = mainAddress.customerId and j.mainCustomerId = mainCustomer.id and 123=123 and 2=2 and 1=1\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  jointAddress.customerId as jointAddress_customerId,\\n'+",
        "  '  j.jointCustomerId as j_jointCustomerId,\\n'+",
        "  '  jointAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,\\n'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  CUST_TBL jointCustomer,\\n'+",
        "  '  ADD_TBL jointAddress\\n'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and jointCustomer.id = jointAddress.customerId and j.jointCustomerId = jointCustomer.id and 123=123\\n'+",
        "  '\\n';",
        "  public static Optional<JointAccount_jointAccountMaps> get(Connection connection, int accountId, int brandRef, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        logger.debug(MessageFormat.format('Duration: {0}', (System.nanoTime() - start) / 1000000.0));",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection, int accountId, int brandRef) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps0.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps0> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps0(rs));",
        "        logger.debug(MessageFormat.format('Duration: {0}, result: {1}', (System.nanoTime() - start) / 1000000.0, result ));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection, int accountId, int brandRef) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps1.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps1> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps1(rs));",
        "        logger.debug(MessageFormat.format('Duration: {0}, result: {1}', (System.nanoTime() - start) / 1000000.0, result ));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  ",
        "  public final Object j_acc_id;",
        "  public final Object j_brand_id;",
        "  public final Object mainCustomer_id;",
        "  public final Object mainAddress_customerId;",
        "  public final Object j_mainCustomerId;",
        "  ",
        "  public final Map<String,Object> _root = new HashMap<>();",
        "  public final Map<String,Object> main = new HashMap<>();",
        "  public final Map<String,Object> main_addresses = new HashMap<>();",
        "  public final Map<String,Object> joint = new HashMap<>();",
        "  public final Map<String,Object> joint_addresses = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps0(ResultSet rs) throws SQLException{",
        "    //This is a very long  field alias. If it gives you problems consider giving it an explicit field alias in the dataDD",
        "    this.main_addresses.put('line1', rs.getString('zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode'));",
        "    this.main_addresses.put('line2', DateFormatter.formatDate('dd-MM-yyyy',rs.getDate('mainAddress_zzline2')));",
        "    ",
        "    this.j_acc_id = rs.getInt('j_acc_id');",
        "    this.j_brand_id = rs.getInt('j_brand_id');",
        "    this.mainCustomer_id = rs.getInt('mainCustomer_id');",
        "    this.mainAddress_customerId = rs.getInt('mainAddress_customerId');",
        "    this.j_mainCustomerId = rs.getInt('j_mainCustomerId');",
        "    ",
        "    _root.put('main', main);",
        "    main.put('addresses', main_addresses);",
        "    ",
        "  }",
        "}"
      ],
      [
        "package focuson.data.db.JointAccount;",
        "",
        "import org.slf4j.Logger;",
        "import org.slf4j.LoggerFactory;",
        "import java.text.MessageFormat;",
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
        "import focuson.data.utils.DateFormatter;",
        "",
        "//{'accountId':{'rsSetter':'setInt','javaType':'int','graphQlType':'Int','typeScriptType':'number','javaParser':'Integer.parseInt','commonLens':'accountId','testValue':44444444},'brandRef':{'rsSetter':'setInt','javaType':'int','graphQlType':'Int','typeScriptType':'number','javaParser':'Integer.parseInt','commonLens':'brandRef','testValue':10},'dbName':{'rsSetter':'setString','javaType':'String','graphQlType':'String','typeScriptType':'string','javaParser':'','commonLens':'dbName','testValue':'mock'}}",
        "public class JointAccount_jointAccountMaps1 {",
        "",
        "  static Logger logger = LoggerFactory.getLogger(JointAccount_jointAccountMaps1.class);",
        "",
        "  @SuppressWarnings('SqlResolve')",
        "  public static String sql = 'select'+",
        "  '  j.acc_id as j_acc_id,'+",
        "  '  j.brand_id as j_brand_id,'+",
        "  '  jointCustomer.id as jointCustomer_id,'+",
        "  '  jointAddress.customerId as jointAddress_customerId,'+",
        "  '  j.jointCustomerId as j_jointCustomerId,'+",
        "  '  jointAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2'+",
        "  ' from'+",
        "  '  ACC_TBL j,'+",
        "  '  CUST_TBL jointCustomer,'+",
        "  '  ADD_TBL jointAddress'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and jointCustomer.id = jointAddress.customerId and j.jointCustomerId = jointCustomer.id and 123=123';",
        "  ",
        "  public static Optional<Map<String,Object>> getAll(Connection connection,int accountId,int brandRef) throws SQLException {",
        "  //from JointAccount.rest[jointAccount].dataDD which is of type JointAccount",
        "     return get(connection,accountId,brandRef,get0(connection,accountId,brandRef),get1(connection,accountId,brandRef)).map(x -> x._root);",
        "  }",
        "  public static String allSql='select\\n'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,\\n'+",
        "  '  mainName.id as mainName_id,\\n'+",
        "  '  j.mainCustomerId as j_mainCustomerId,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,\\n'+",
        "  '  jointName.id as jointName_id,\\n'+",
        "  '  j.jointCustomerId as j_jointCustomerId,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  mainName.zzname as mainName_zzname,\\n'+",
        "  '  jointName.zzname as jointName_zzname,\\n'+",
        "  '  j.blnc as j_blnc\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  NAME_TBL mainName,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  NAME_TBL jointName,\\n'+",
        "  '  CUST_TBL jointCustomer\\n'+",
        "  ' where mainCustomer.nameId = mainName.id and j.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and j.jointCustomerId = jointCustomer.id and  j.acc_id = ? and  j.brand_id = ? and 3=3 and 1=1 and 123=123 and ACC_TBL <> 'canceled'\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  mainAddress.customerId as mainAddress_customerId,\\n'+",
        "  '  j.mainCustomerId as j_mainCustomerId,\\n'+",
        "  '  mainAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,\\n'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  ADD_TBL mainAddress\\n'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and mainCustomer.id = mainAddress.customerId and j.mainCustomerId = mainCustomer.id and 123=123 and 2=2 and 1=1\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  j.acc_id as j_acc_id,\\n'+",
        "  '  j.brand_id as j_brand_id,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  jointAddress.customerId as jointAddress_customerId,\\n'+",
        "  '  j.jointCustomerId as j_jointCustomerId,\\n'+",
        "  '  jointAddress.zzline1 as zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode,\\n'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL j,\\n'+",
        "  '  CUST_TBL jointCustomer,\\n'+",
        "  '  ADD_TBL jointAddress\\n'+",
        "  ' where  j.acc_id = ? and  j.brand_id = ? and jointCustomer.id = jointAddress.customerId and j.jointCustomerId = jointCustomer.id and 123=123\\n'+",
        "  '\\n';",
        "  public static Optional<JointAccount_jointAccountMaps> get(Connection connection, int accountId, int brandRef, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        logger.debug(MessageFormat.format('Duration: {0}', (System.nanoTime() - start) / 1000000.0));",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection, int accountId, int brandRef) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps0.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps0> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps0(rs));",
        "        logger.debug(MessageFormat.format('Duration: {0}, result: {1}', (System.nanoTime() - start) / 1000000.0, result ));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection, int accountId, int brandRef) throws SQLException {",
        "      String sql = JointAccount_jointAccountMaps1.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setInt(1,accountId);",
        "      statement.setInt(2,brandRef);",
        "      logger.debug(MessageFormat.format('sql: {0}, accountId: {1}, brandRef: {2}', sql, accountId,brandRef));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<JointAccount_jointAccountMaps1> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new JointAccount_jointAccountMaps1(rs));",
        "        logger.debug(MessageFormat.format('Duration: {0}, result: {1}', (System.nanoTime() - start) / 1000000.0, result ));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  ",
        "  public final Object j_acc_id;",
        "  public final Object j_brand_id;",
        "  public final Object jointCustomer_id;",
        "  public final Object jointAddress_customerId;",
        "  public final Object j_jointCustomerId;",
        "  ",
        "  public final Map<String,Object> _root = new HashMap<>();",
        "  public final Map<String,Object> main = new HashMap<>();",
        "  public final Map<String,Object> main_addresses = new HashMap<>();",
        "  public final Map<String,Object> joint = new HashMap<>();",
        "  public final Map<String,Object> joint_addresses = new HashMap<>();",
        "  ",
        "  public JointAccount_jointAccountMaps1(ResultSet rs) throws SQLException{",
        "    //This is a very long  field alias. If it gives you problems consider giving it an explicit field alias in the dataDD",
        "    this.joint_addresses.put('line1', rs.getString('zzline1FieldAliasItIsVeryLongToLetUsTestIfWeGetACommentInTheGeneratedCode'));",
        "    this.joint_addresses.put('line2', DateFormatter.formatDate('dd-MM-yyyy',rs.getDate('jointAddress_zzline2')));",
        "    ",
        "    this.j_acc_id = rs.getInt('j_acc_id');",
        "    this.j_brand_id = rs.getInt('j_brand_id');",
        "    this.jointCustomer_id = rs.getInt('jointCustomer_id');",
        "    this.jointAddress_customerId = rs.getInt('jointAddress_customerId');",
        "    this.j_jointCustomerId = rs.getInt('j_jointCustomerId');",
        "    ",
        "    _root.put('joint', joint);",
        "    joint.put('addresses', joint_addresses);",
        "    ",
        "  }",
        "}"
      ]
    ])
  } )
  it ( "should  add 'where' to the sql if there is a where clause", () => {
    expect ( walkSqlRoots ( findSqlRoot ( jointAccountRestDTables ), ( r, path ) =>
      makeWhereClause ( findSqlLinkDataFromRootAndDataD ( r, JointAccountDd, jointAccountRestParams ) ) ) ).toEqual ( [
      "where mainCustomer.nameId = mainName.id and j.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and j.jointCustomerId = jointCustomer.id and  j.acc_id = ? and  j.brand_id = ? and 3=3 and 1=1 and 123=123 and ACC_TBL <> 'canceled'",
      "where  j.acc_id = ? and  j.brand_id = ? and mainCustomer.id = mainAddress.customerId and j.mainCustomerId = mainCustomer.id and 123=123 and 2=2 and 1=1",
      "where  j.acc_id = ? and  j.brand_id = ? and jointCustomer.id = jointAddress.customerId and j.jointCustomerId = jointCustomer.id and 123=123"
    ])
  } )
  it ( "should not add 'where' to the sql if there isn't a where clause", () => {


    expect ( walkSqlRoots ( findSqlRoot ( addressRestD.tables ), ( r, path ) =>
      makeWhereClause ( findSqlLinkDataFromRootAndDataD ( r, nameAndAddressDataD, addressRestDParams ) )
    ) ).toEqual ( [ '' ] )
  } )

  it ( "should make maps for a repeating item", () => {
    expect ( walkSqlRoots ( findSqlRoot ( addressRestDTables ), ( r, path ) => {
      const ld = findSqlLinkDataFromRootAndDataD ( r, postCodeSearchResponseDD, addressRestDParams )
      return makeMapsForRest ( paramsForTest, PostCodeMainPage, 'postcode', PostCodeMainPage.rest.postcode, ld, path, r.children.length )
    } ).map ( s => s.map ( s => s.replace ( /"/g, "'" ) ) ) ).toEqual ( [
      [
        "package focuson.data.db.PostCodeMainPage;",
        "",
        "import org.slf4j.Logger;",
        "import org.slf4j.LoggerFactory;",
        "import java.text.MessageFormat;",
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
        "import focuson.data.utils.DateFormatter;",
        "",
        "//{'dbName':{'rsSetter':'setString','javaType':'String','graphQlType':'String','typeScriptType':'string','javaParser':'','commonLens':'dbName','testValue':'mock'},'postcode':{'rsSetter':'setString','javaType':'String','graphQlType':'String','typeScriptType':'string','javaParser':'','lens':'~/postcode/search','testValue':'LW12 4RG'}}",
        "public class PostCodeMainPage_postcodeMaps {",
        "",
        "  static Logger logger = LoggerFactory.getLogger(PostCodeMainPage_postcodeMaps.class);",
        "",
        "  @SuppressWarnings('SqlResolve')",
        "  public static String sql = 'select'+",
        "  ' from'+",
        "  '  ADD_TBL ADD_TBL'+",
        "  ' ';",
        "  ",
        "  public static List<Map<String,Object>> getAll(Connection connection,String postcode) throws SQLException {",
        "  //from PostCodeMainPage.rest[postcode].dataDD which is of type PostCodeSearchResponse",
        "     return get(connection,postcode).stream().map(x -> x._root).collect(Collectors.toList());",
        "  }",
        "  public static String allSql='select\\n'+",
        "  '  POSTCODE.PC_POSTCODE as POSTCODE_PC_POSTCODE,\\n'+",
        "  '  POSTCODE.zzline1 as POSTCODE_zzline1,\\n'+",
        "  '  POSTCODE.zzline2 as POSTCODE_zzline2,\\n'+",
        "  '  POSTCODE.zzline3 as POSTCODE_zzline3,\\n'+",
        "  '  POSTCODE.zzline4 as POSTCODE_zzline4,\\n'+",
        "  '  POSTCODE.PC_POSTCODE as POSTCODE_PC_POSTCODE\\n'+",
        "  ' from\\n'+",
        "  '  search.POSTCODE POSTCODE\\n'+",
        "  ' where  POSTCODE.PC_POSTCODE like ?\\n'+",
        "  '\\n';",
        "  public static List<PostCodeMainPage_postcodeMaps> get(Connection connection, String postcode) throws SQLException {",
        "      String sql = PostCodeMainPage_postcodeMaps.sql;",
        "      PreparedStatement statement = connection.prepareStatement(sql);",
        "      statement.setString(1,'%'+postcode+'%');",
        "      logger.debug(MessageFormat.format('sql: {0}, postcode: {1}', sql, postcode));",
        "      long start = System.nanoTime();",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        List<PostCodeMainPage_postcodeMaps> result = new LinkedList<>();",
        "        while (rs.next())",
        "          result.add(new PostCodeMainPage_postcodeMaps(rs));",
        "        logger.debug(MessageFormat.format('Duration: {0}, result: {1}', (System.nanoTime() - start) / 1000000.0, result ));",
        "        return result;",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  ",
        "  ",
        "  public final Map<String,Object> _root = new HashMap<>();",
        "  ",
        "  public PostCodeMainPage_postcodeMaps(ResultSet rs) throws SQLException{",
        "    ",
        "    ",
        "    ",
        "  }",
        "}"
      ]
    ])
  } )
} )

describe ( "paramsForLinkedData", () => {
  const accountId: AllLensRestParams<number> = { ...IntParam, commonLens: 'accountId', testValue: 123 }
  const brandRef: AllLensRestParams<number> = { ...IntParam, commonLens: 'brandRef', testValue: 456 }
  const dbName: AllLensRestParams<string> = { ...StringParam, commonLens: 'dbName', testValue: 'mock' }

  it ( "should find the params (in the correct order) from the wheres in the linked data", () => {
    function justNameAndParam ( ps: JavaQueryParamDetails[] ) {return ps.map ( ( { name, param } ) => [ name, param ] )}
    expect ( justNameAndParam ( findParamsForTable ( `error`, { accountId, brandRef }, jointAccountRestDTables ) ) ).toEqual ( [ [ 'accountId', accountId ], [ 'brandRef', brandRef ] ] )
    expect ( justNameAndParam ( findParamsForTable ( `error`, { brandRef, accountId }, jointAccountRestDTables ) ) ).toEqual ( [ [ 'accountId', accountId ], [ 'brandRef', brandRef ] ] )
    expect ( justNameAndParam ( findParamsForTable ( `error`, { brandRef, accountId, dbName }, jointAccountRestDTables ) ) ).toEqual ( [ [ 'accountId', accountId ], [ 'brandRef', brandRef ] ] )
    const reversed: EntityAndWhere = { ...jointAccountRestDTables, where: jointAccountRestDTables.where.reverse () }
    expect ( justNameAndParam ( findParamsForTable ( `error`, { accountId, brandRef }, reversed ) ) ).toEqual ( [ [ 'brandRef', brandRef ], [ 'accountId', accountId ] ] )
    expect ( justNameAndParam ( findParamsForTable ( `error`, { brandRef, accountId }, reversed ) ) ).toEqual ( [ [ 'brandRef', brandRef ], [ 'accountId', accountId ] ] )

  } )

  it ( "should throw a nice error message if a param is needed but isn't available", () => {
      expect ( () => findParamsForTable ( `error`, {}, jointAccountRestDTables ) ).toThrow ( 'error param brandRef is defined in where' )
    }
  )
} )

describe ( "Make INSERT SQL", () => {
  const JointAccountDdForTest: ExampleDataD = {
    name: "JointAccount",
    description: "A sample project for an account with two customers",
    table: accountT,
    structure: {
      // accountId: { dataDD: AccountIdDD, db: 'acc_id' },
      balance: { dataDD: MoneyDD, db: 'blnc' },
      sampleDate: { dataDD: DateDD, db: 'someDateField' },
      main: { dataDD: JointAccountCustomerDD },
      joint: { dataDD: JointAccountCustomerDD, sampleOffset: 1 }
    }
  };
  it ( "should make SQL for manual queries", () => {
    const entity: MainEntity = {
      type: 'Main',
      table: accountT,
      staticWhere: `${accountT.name} <> 'canceled'`,
      idStrategy: {type: 'Manual', sql: jointAccountSql},
      children: { }
    };

    expect(
    getStrategy(entity).flatMap( s => {
      if (s.type === 'WithId') return safeArray(makeInsertSqlForIds(JointAccountDdForTest, entity, s))
      else if (s.type === 'WithoutId') return safeArray(makeInsertSqlForNoIds(JointAccountDdForTest, entity, s))
      else if (s.type === 'Manual') return s.sql
      else return []
    })).toEqual([
      "INSERT INTO CUST_TBL (nameId, id)\n     values (101, 1001),\n            (102, 1002),\n            (103, 1003),\n            (104, 2001),\n            (105, 2002),\n            (106, 2003);",
      "INSERT INTO NAME_TBL(id, zzname)\n   values (101, 'name One'),\n          (102, 'name Two'),\n          (103, 'name Three'),\n          (104, 'name Four'),\n          (105, 'name Five'),\n          (106, 'name Six');",
      "INSERT INTO ACC_TBL (mainCustomerId, jointCustomerId, acc_id, brand_id, blnc)\n   values (1001, 2001, 1, 111, 1000),\n          (1002, 2002, 2, 222, 2000),\n          (1003, 2003, 3, 333, 3000);",
      "INSERT INTO ADD_TBL(customerId, zzline1, zzline2, zzline3, zzline4)\n   values (1001, 'oneLineOne', 'oneLineTwo', 'oneLineThree', 'oneLineFour'),\n          (1002, 'twoLineOne', 'twoLineTwo', 'twoLineThree', 'twoLineFour'),\n          (1003, 'threeLineOne', 'threeLineTwo', 'threeLineThree', 'threeLineFour'),\n          (2001, 'fourLineOne', 'fourLineTwo', 'fourLineThree', 'fourLineFour'),\n          (2002, 'fiveLineOne', 'fiveLineTwo', 'fiveLineThree', 'fiveLineFour'),\n          (2002, 'sixLineOne', 'sixLineTwo', 'sixLineThree', 'sixLineFour');"
    ]);
  } );

  it ( "should make SQL for with IDs", () => {
    const entity: MainEntity = { type: 'Main', table: addT, children: {}, idStrategy: {type: "WithId", idField: "someId", idOffset: 100} };
    expect(
    getStrategy(entity).flatMap( s => {
      if (s.type === 'WithId') return safeArray(makeInsertSqlForIds(JointAccountDdForTest, entity, s))
      else if (s.type === 'WithoutId') return safeArray(makeInsertSqlForNoIds(JointAccountDdForTest, entity, s))
      else if (s.type === 'Manual') return s.sql
      else return []
    })).toEqual([
      "INSERT INTO ADD_TBL(someId,zzline1,zzline2,zzline1,zzline2)values (100,'This is a one line string','This is a one line string','This is a one line string','This is a one line string');",
      "INSERT INTO ADD_TBL(someId,zzline1,zzline2,zzline1,zzline2)values (101,'another one line string','another one line string','another one line string','another one line string');",
      "INSERT INTO ADD_TBL(someId,zzline1,zzline2,zzline1,zzline2)values (102,'This is a one line string','This is a one line string','This is a one line string','This is a one line string');"
    ]);
  } )

  it ( "should make SQL for without IDs", () => {
    const entity: MainEntity = { type: 'Main', table: addT, children: {}, idStrategy: {type: "WithoutId"} };
    expect(
        getStrategy(entity).flatMap( s => {
          if (s.type === 'WithId') return safeArray(makeInsertSqlForIds(JointAccountDdForTest, entity, s))
          else if (s.type === 'WithoutId') return safeArray(makeInsertSqlForNoIds(JointAccountDdForTest, entity, s))
          else if (s.type === 'Manual') return s.sql
          else return []
        })).toEqual([
      "INSERT INTO ADD_TBL(zzline1,zzline2,zzline1,zzline2)values ('This is a one line string','This is a one line string','This is a one line string','This is a one line string');",
      "INSERT INTO ADD_TBL(zzline1,zzline2,zzline1,zzline2)values ('another one line string','another one line string','another one line string','another one line string');",
      "INSERT INTO ADD_TBL(zzline1,zzline2,zzline1,zzline2)values ('This is a one line string','This is a one line string','This is a one line string','This is a one line string');"
    ]);
  } )
} )