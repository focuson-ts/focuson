import { ChildEntity, createTableSql, EntityFolder, findAliasAndTableLinksForLinkData, findAllFields, findAllTableAndFieldDatasIn, findAllTableAndFieldsIn, findFieldsFromWhere, findParamsForTable, findSqlLinkDataFromRootAndDataD, findSqlRoot, findTableAliasAndFieldFromDataD, findTableAndFieldFromDataD, findWhereLinksForSqlRoot, findWhereLinksForSqlRootGoingUp, foldEntitys, generateGetSql, MainEntity, makeInsertSqlForSample, makeMapsForRest, makeDataForMutate, MultipleEntity, simplifyAliasAndChildEntityPath, simplifyAliasAndTables, simplifyDataForMutate, simplifySqlLinkData, simplifySqlRoot, simplifyTableAndFieldAndAliasDataArray, simplifyTableAndFieldData, simplifyTableAndFieldDataArray, simplifyTableAndFieldsData, simplifyWhereFromQuery, simplifyWhereLinks, SingleEntity, walkSqlLinkData, walkSqlRoots, whereFieldToFieldData } from "../codegen/makeSqlFromEntities";
import { AllLensRestParams, EntityAndWhere, IntParam, StringParam, unique } from "../common/restD";
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
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( p, r ) => simplifySqlRoot ( r ) ) ).toEqual ( [
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL] filterPath: undefined",
      "main ACC_TBL path [mainCustomer -> CUST_TBL] root ADD_TBL children [] filterPath: main",
      "main ACC_TBL path [jointCustomer -> CUST_TBL] root ADD_TBL children [] filterPath: joint"
    ] )
  } )
  it ( "should have a walkSqlRoots that gives access to the parent as well", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( p, r ) => p ? simplifySqlRoot ( p ) : '' ) ).toEqual ( [
      "",
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL] filterPath: undefined",
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL] filterPath: undefined"
    ] )
  } )
} )

describe ( "findAliasAndTablesLinksForLinkDataFolder", () => {
  it ( "should generate aliasAndTables", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( parent, r ) => simplifyAliasAndTables ( findAliasAndTableLinksForLinkData ( r ) ) ) ).toEqual ( [
      "ACC_TBL->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
      "ACC_TBL->ACC_TBL,mainCustomer->CUST_TBL,mainAddress->ADD_TBL",
      "ACC_TBL->ACC_TBL,jointCustomer->CUST_TBL,jointAddress->ADD_TBL"
    ] )
  } )
} )
describe ( "findWhereLinkDataForLinkData", () => {
    it ( "should generate  findWhereLinkDataForLinkData", () => {
      expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( parent, r ) => simplifyWhereLinks ( findWhereLinksForSqlRoot ( r ) ) ) ).toEqual ( [
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
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( parent, r ) =>
      unique ( simplifyTableAndFieldAndAliasDataArray ( findFieldsFromWhere ( 'someErrorPrefix', findWhereLinksForSqlRoot ( r ) ), true ), s => s ) ) ).toEqual ( [
      [
        "mainCustomer:CUST_TBL.nameId/undefined[]",
        "mainName:NAME_TBL.id/undefined[]",
        "ACC_TBL:ACC_TBL.mainCustomerId/undefined[]",
        "mainCustomer:CUST_TBL.id/undefined[]",
        "jointCustomer:CUST_TBL.nameId/undefined[]",
        "jointName:NAME_TBL.id/undefined[]",
        "ACC_TBL:ACC_TBL.jointCustomerId/undefined[]",
        "jointCustomer:CUST_TBL.id/undefined[]",
        "ACC_TBL:ACC_TBL.acc_id/undefined[]",
        "ACC_TBL:ACC_TBL.brand_id/undefined[]"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id/undefined[]",
        "ACC_TBL:ACC_TBL.brand_id/undefined[]",
        "mainCustomer:CUST_TBL.id/undefined[]",
        "mainAddress:ADD_TBL.customerId/undefined[]",
        "ACC_TBL:ACC_TBL.mainCustomerId/undefined[]"
      ],
      [
        "ACC_TBL:ACC_TBL.acc_id/undefined[]",
        "ACC_TBL:ACC_TBL.brand_id/undefined[]",
        "jointCustomer:CUST_TBL.id/undefined[]",
        "jointAddress:ADD_TBL.customerId/undefined[]",
        "ACC_TBL:ACC_TBL.jointCustomerId/undefined[]"
      ]
    ] )
  } )

} )

describe ( "findTableAndFieldFromDataD", () => {
  it ( "find the tables and fields from a dataD -simple ", () => {
    expect ( findTableAndFieldFromDataD ( nameAndAddressDataD ).map ( t => simplifyTableAndFieldData ( t, true ) ) ).toEqual ( [
      "ADD_TBL.zzline1/line1/line1[4 Privet drive,27 Throughput Lane]",
      "ADD_TBL.zzline2/line2/line2[Little Whinging,Woodfield]",
      "ADD_TBL.zzline3/line3/line3[Surrey,]",
      "ADD_TBL.zzline4/line4/line4[England,Ireland]"
    ] )
  } )
  it ( "find the tables and fields from a dataD. ", () => {
    expect ( findTableAndFieldFromDataD ( JointAccountDd ).map ( t => simplifyTableAndFieldData ( t, true ) ) ).toEqual ( [
      "ACC_TBL.blnc/balance/balance[123,456]",
      "NAME_TBL.zzname/name/main,name[Fred Bloggs,Jill Blogs]",
      "ADD_TBL.zzline1/line1/main,addresses,line1[This is a one line string,another one line string]",
      "ADD_TBL.zzline2/line2/main,addresses,line2[This is a one line string,another one line string]",
      "NAME_TBL.zzname/name/joint,name[Fred Bloggs,Jill Blogs]",
      "ADD_TBL.zzline1/line1/joint,addresses,line1[This is a one line string,another one line string]",
      "ADD_TBL.zzline2/line2/joint,addresses,line2[This is a one line string,another one line string]"
    ] )
  } )
} )

describe ( "findTableAliasAndFieldFromDataD", () => {

  it ( "should start with the fields from the wheres, and add in the fields from the dataD: only adding where the data is needed - i.e. not adding fields to the 'path' to the root", () => {
    const fromDataD = findTableAndFieldFromDataD ( JointAccountDd )
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( parent, r ) => simplifyTableAndFieldAndAliasDataArray ( findTableAliasAndFieldFromDataD ( r, fromDataD ), true ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name/main,name[Fred Bloggs,Jill Blogs]",
        "jointName:NAME_TBL.zzname/name/joint,name[Fred Bloggs,Jill Blogs]",
        "ACC_TBL:ACC_TBL.blnc/balance/balance[123,456]"
      ],
      [
        "mainAddress:ADD_TBL.zzline1/line1/main,addresses,line1[This is a one line string,another one line string]",
        "mainAddress:ADD_TBL.zzline2/line2/main,addresses,line2[This is a one line string,another one line string]"
      ],
      [
        "jointAddress:ADD_TBL.zzline1/line1/joint,addresses,line1[This is a one line string,another one line string]",
        "jointAddress:ADD_TBL.zzline2/line2/joint,addresses,line2[This is a one line string,another one line string]"
      ]
    ] )
  } )
} )

describe ( "findAllFields", () => {
  it ( "should aggregate the fields from the where and from the dataD - simple ", () => {
    expect ( walkSqlRoots ( findSqlRoot ( addressRestD.tables ), ( parent, r ) => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, nameAndAddressDataD, findWhereLinksForSqlRootGoingUp ( r ) ), true ) ) ).toEqual ( [
      [
        "ADD_TBL:ADD_TBL.zzline1/line1/line1[4 Privet drive,27 Throughput Lane]",
        "ADD_TBL:ADD_TBL.zzline2/line2/line2[Little Whinging,Woodfield]",
        "ADD_TBL:ADD_TBL.zzline3/line3/line3[Surrey,]",
        "ADD_TBL:ADD_TBL.zzline4/line4/line4[England,Ireland]"
      ]
    ] )
  } )

  it ( "should findWhereLinksForSqlRootsGoingUp", () => {
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( parent, r ) => simplifyWhereLinks ( findWhereLinksForSqlRootGoingUp ( r ) ) ) ).toEqual ( [
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
    expect ( walkSqlRoots ( findSqlRoot ( theRestD.tables ), ( parent, r ) => simplifyTableAndFieldAndAliasDataArray ( findAllFields ( r, JointAccountDd, findWhereLinksForSqlRootGoingUp ( r ) ), true ) ) ).toEqual ( [
      [
        "mainName:NAME_TBL.zzname/name/main,name[Fred Bloggs,Jill Blogs]",
        "jointName:NAME_TBL.zzname/name/joint,name[Fred Bloggs,Jill Blogs]",
        "ACC_TBL:ACC_TBL.blnc/balance/balance[123,456]"
      ],
      [
        "mainCustomer:CUST_TBL.id/undefined[]",
        "mainAddress:ADD_TBL.customerId/undefined[]",
        "ACC_TBL:ACC_TBL.mainCustomerId/undefined[]",
        "mainAddress:ADD_TBL.zzline1/line1/main,addresses,line1[This is a one line string,another one line string]",
        "mainAddress:ADD_TBL.zzline2/line2/main,addresses,line2[This is a one line string,another one line string]"
      ],
      [
        "jointCustomer:CUST_TBL.id/undefined[]",
        "jointAddress:ADD_TBL.customerId/undefined[]",
        "ACC_TBL:ACC_TBL.jointCustomerId/undefined[]",
        "jointAddress:ADD_TBL.zzline1/line1/joint,addresses,line1[This is a one line string,another one line string]",
        "jointAddress:ADD_TBL.zzline2/line2/joint,addresses,line2[This is a one line string,another one line string]"
      ]
    ] )
  } )
} )

describe ( "findSqlLinkDataFromRootAndDataD", () => {
  it ( "should create the data for the links in postCodeDataLineD (simple)", () => {
    expect ( walkSqlLinkData ( findSqlLinkDataFromRootAndDataD ( findSqlRoot ( addressRestD.tables ), postCodeDataLineD ), ( parent, ld ) => simplifySqlLinkData ( ld ) ) ).toEqual ( [
      [
        "sqlRoot: ADD_TBL",
        "fields: ADD_TBL:ADD_TBL.zzline1/line1,ADD_TBL:ADD_TBL.zzline2/line2,ADD_TBL:ADD_TBL.zzline3/line3,ADD_TBL:ADD_TBL.zzline4/line4",
        "aliasAndTables ADD_TBL->ADD_TBL",
        "where ",
        "linksInThis: ",
        "linkToParent:undefined",
        "children: 0"
      ]
    ] )
  } )

  it ( "shouldCreate the data for the links in accountD", () => {
    expect ( walkSqlLinkData ( findSqlLinkDataFromRootAndDataD ( findSqlRoot ( theRestD.tables ), JointAccountDd ), ( parent, ld ) => simplifySqlLinkData ( ld, true ) ) ).toEqual ( [
      [
        "sqlRoot: ACC_TBL",
        "fields: mainCustomer:CUST_TBL.nameId/undefined[],mainName:NAME_TBL.id/undefined[],ACC_TBL:ACC_TBL.mainCustomerId/undefined[],mainCustomer:CUST_TBL.id/undefined[],jointCustomer:CUST_TBL.nameId/undefined[],jointName:NAME_TBL.id/undefined[],ACC_TBL:ACC_TBL.jointCustomerId/undefined[],jointCustomer:CUST_TBL.id/undefined[],ACC_TBL:ACC_TBL.acc_id/undefined[],ACC_TBL:ACC_TBL.brand_id/undefined[],mainName:NAME_TBL.zzname/name/main,name[Fred Bloggs,Jill Blogs],jointName:NAME_TBL.zzname/name/joint,name[Fred Bloggs,Jill Blogs],ACC_TBL:ACC_TBL.blnc/balance/balance[123,456]",
        "aliasAndTables ACC_TBL->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
        "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer,param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id",
        "linksInThis: mainCustomer__nameId__mainName__id,ACC_TBL__mainCustomerId__mainCustomer__id,jointCustomer__nameId__jointName__id,ACC_TBL__jointCustomerId__jointCustomer__id,param__accountId,param__brandId",
        "linkToParent:undefined",
        "children: 2"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id/undefined[],ACC_TBL:ACC_TBL.brand_id/undefined[],mainCustomer:CUST_TBL.id/undefined[],mainAddress:ADD_TBL.customerId/undefined[],ACC_TBL:ACC_TBL.mainCustomerId/undefined[],mainAddress:ADD_TBL.zzline1/line1/main,addresses,line1[This is a one line string,another one line string],mainAddress:ADD_TBL.zzline2/line2/main,addresses,line2[This is a one line string,another one line string]",
        "aliasAndTables ACC_TBL->ACC_TBL,mainCustomer->CUST_TBL,mainAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,mainCustomer:CUST_TBL.id == mainAddress:ADD_TBL.customerId,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer",
        "linksInThis: ",
        "linkToParent:Table: parent-mainCustomer:CUST_TBL.id == child-mainAddress:ADD_TBL.customerId",
        "children: 0"
      ],
      [
        "sqlRoot: ADD_TBL",
        "fields: ACC_TBL:ACC_TBL.acc_id/undefined[],ACC_TBL:ACC_TBL.brand_id/undefined[],jointCustomer:CUST_TBL.id/undefined[],jointAddress:ADD_TBL.customerId/undefined[],ACC_TBL:ACC_TBL.jointCustomerId/undefined[],jointAddress:ADD_TBL.zzline1/line1/joint,addresses,line1[This is a one line string,another one line string],jointAddress:ADD_TBL.zzline2/line2/joint,addresses,line2[This is a one line string,another one line string]",
        "aliasAndTables ACC_TBL->ACC_TBL,jointCustomer->CUST_TBL,jointAddress->ADD_TBL",
        "where param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id,jointCustomer:CUST_TBL.id == jointAddress:ADD_TBL.customerId,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer",
        "linksInThis: ",
        "linkToParent:Table: parent-jointCustomer:CUST_TBL.id == child-jointAddress:ADD_TBL.customerId",
        "children: 0"
      ]
    ] )
  } )

  it ( "should have a walkSqlLinkData that passes in the parent ", () => {
    expect ( walkSqlLinkData ( findSqlLinkDataFromRootAndDataD ( findSqlRoot ( theRestD.tables ), JointAccountDd ), ( parent, ld ) => parent.map ( p => simplifySqlLinkData ( p, true ) ) ) ).toEqual ( [
      [],
      [
        [
          "sqlRoot: ACC_TBL",
          "fields: mainCustomer:CUST_TBL.nameId/undefined[],mainName:NAME_TBL.id/undefined[],ACC_TBL:ACC_TBL.mainCustomerId/undefined[],mainCustomer:CUST_TBL.id/undefined[],jointCustomer:CUST_TBL.nameId/undefined[],jointName:NAME_TBL.id/undefined[],ACC_TBL:ACC_TBL.jointCustomerId/undefined[],jointCustomer:CUST_TBL.id/undefined[],ACC_TBL:ACC_TBL.acc_id/undefined[],ACC_TBL:ACC_TBL.brand_id/undefined[],mainName:NAME_TBL.zzname/name/main,name[Fred Bloggs,Jill Blogs],jointName:NAME_TBL.zzname/name/joint,name[Fred Bloggs,Jill Blogs],ACC_TBL:ACC_TBL.blnc/balance/balance[123,456]",
          "aliasAndTables ACC_TBL->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
          "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer,param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id",
          "linksInThis: mainCustomer__nameId__mainName__id,ACC_TBL__mainCustomerId__mainCustomer__id,jointCustomer__nameId__jointName__id,ACC_TBL__jointCustomerId__jointCustomer__id,param__accountId,param__brandId",
          "linkToParent:undefined",
          "children: 2"
        ]
      ],
      [
        [
          "sqlRoot: ACC_TBL",
          "fields: mainCustomer:CUST_TBL.nameId/undefined[],mainName:NAME_TBL.id/undefined[],ACC_TBL:ACC_TBL.mainCustomerId/undefined[],mainCustomer:CUST_TBL.id/undefined[],jointCustomer:CUST_TBL.nameId/undefined[],jointName:NAME_TBL.id/undefined[],ACC_TBL:ACC_TBL.jointCustomerId/undefined[],jointCustomer:CUST_TBL.id/undefined[],ACC_TBL:ACC_TBL.acc_id/undefined[],ACC_TBL:ACC_TBL.brand_id/undefined[],mainName:NAME_TBL.zzname/name/main,name[Fred Bloggs,Jill Blogs],jointName:NAME_TBL.zzname/name/joint,name[Fred Bloggs,Jill Blogs],ACC_TBL:ACC_TBL.blnc/balance/balance[123,456]",
          "aliasAndTables ACC_TBL->ACC_TBL,mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL",
          "where mainCustomer:CUST_TBL.nameId == mainName:NAME_TBL.id,ACC_TBL:ACC_TBL.mainCustomerId:integer == mainCustomer:CUST_TBL.id:integer,jointCustomer:CUST_TBL.nameId == jointName:NAME_TBL.id,ACC_TBL:ACC_TBL.jointCustomerId:integer == jointCustomer:CUST_TBL.id:integer,param accountId == ACC_TBL:ACC_TBL.acc_id,param brandId == ACC_TBL:ACC_TBL.brand_id",
          "linksInThis: mainCustomer__nameId__mainName__id,ACC_TBL__mainCustomerId__mainCustomer__id,jointCustomer__nameId__jointName__id,ACC_TBL__jointCustomerId__jointCustomer__id,param__accountId,param__brandId",
          "linkToParent:undefined",
          "children: 2"
        ] ] ] )
  } )
} )
describe ( "generateGetSql", () => {
  it ( "should generate the get sql", () => {
    expect ( walkSqlLinkData ( findSqlLinkDataFromRootAndDataD ( findSqlRoot ( theRestD.tables ), JointAccountDd ), ( parent, ld ) => generateGetSql ( ld ) ) ).toEqual ( [
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
        "  customerId integer,",
        "  zzline1 varchar(256),",
        "  zzline2 varchar(256),",
        "  zzline3 varchar(256),",
        "  zzline4 varchar(256)",
        ")"
      ],
      "CUST_TBL": [
        "create table CUST_TBL" + "(",
        "  nameId integer,",
        "  id integer",
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
    expect ( walkSqlLinkData ( findSqlLinkDataFromRootAndDataD ( findSqlRoot ( theRestD.tables ), JointAccountDd ), ( parent, ld, path ) => {
      return makeMapsForRest ( paramsForTest, JointAccountPageD, 'jointAccount', jointAccountRestD, ld, path, ld.children.length )
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
        "//{'accountId':{'rsSetter':'setInt','javaType':'int','javaParser':'Integer.parseInt','commonLens':'accountId','testValue':'custId'},'brandId':{'rsSetter':'setInt','javaType':'int','javaParser':'Integer.parseInt','commonLens':'brandId','testValue':'custId'},'dbName':{'rsSetter':'setString','javaType':'String','javaParser':'','commonLens':'dbName','testValue':'mock'}}",
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
        "  public static Optional<Map<String,Object>> getAll(Connection connection,int accountId,int brandId) throws SQLException {",
        "     return getRoot(connection,accountId,brandId,get0(connection,accountId,brandId),get1(connection,accountId,brandId)).map(x -> x._root);",
        "  }",
        "  public static String allSql='select\\n'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,\\n'+",
        "  '  mainName.id as mainName_id,\\n'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,\\n'+",
        "  '  jointName.id as jointName_id,\\n'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  mainName.zzname as mainName_zzname,\\n'+",
        "  '  jointName.zzname as jointName_zzname,\\n'+",
        "  '  ACC_TBL.blnc as ACC_TBL_blnc\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  NAME_TBL mainName,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  NAME_TBL jointName,\\n'+",
        "  '  CUST_TBL jointCustomer\\n'+",
        "  ' where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ?\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  mainAddress.customerId as mainAddress_customerId,\\n'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\\n'+",
        "  '  mainAddress.zzline1 as mainAddress_zzline1,\\n'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  ADD_TBL mainAddress\\n'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and mainCustomer.id = mainAddress.customerId and ACC_TBL.mainCustomerId = mainCustomer.id\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  jointAddress.customerId as jointAddress_customerId,\\n'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\\n'+",
        "  '  jointAddress.zzline1 as jointAddress_zzline1,\\n'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  CUST_TBL jointCustomer,\\n'+",
        "  '  ADD_TBL jointAddress\\n'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id\\n'+",
        "  '\\n';",
        "  public static Optional<JointAccount_jointAccountMaps> getRoot(Connection connection, int accountId, int brandId, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection, int accountId, int brandId) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
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
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection, int accountId, int brandId) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
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
        "  public final Object mainCustomer__nameId__mainName__id;",
        "  public final Object ACC_TBL__mainCustomerId__mainCustomer__id;",
        "  public final Object jointCustomer__nameId__jointName__id;",
        "  public final Object ACC_TBL__jointCustomerId__jointCustomer__id;",
        "  public final Object param__accountId;",
        "  public final Object param__brandId;",
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
        "    this.mainCustomer__nameId__mainName__id = rs.getInt('mainCustomer_nameId');",
        "    this.ACC_TBL__mainCustomerId__mainCustomer__id = rs.getInt('ACC_TBL_mainCustomerId');",
        "    this.jointCustomer__nameId__jointName__id = rs.getInt('jointCustomer_nameId');",
        "    this.ACC_TBL__jointCustomerId__jointCustomer__id = rs.getInt('ACC_TBL_jointCustomerId');",
        "    this.param__accountId = rs.getInt('ACC_TBL_acc_id');",
        "    this.param__brandId = rs.getInt('ACC_TBL_brand_id');",
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
        "//{'accountId':{'rsSetter':'setInt','javaType':'int','javaParser':'Integer.parseInt','commonLens':'accountId','testValue':'custId'},'brandId':{'rsSetter':'setInt','javaType':'int','javaParser':'Integer.parseInt','commonLens':'brandId','testValue':'custId'},'dbName':{'rsSetter':'setString','javaType':'String','javaParser':'','commonLens':'dbName','testValue':'mock'}}",
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
        "  public static Optional<Map<String,Object>> getAll(Connection connection,int accountId,int brandId) throws SQLException {",
        "     return getRoot(connection,accountId,brandId,get0(connection,accountId,brandId),get1(connection,accountId,brandId)).map(x -> x._root);",
        "  }",
        "  public static String allSql='select\\n'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,\\n'+",
        "  '  mainName.id as mainName_id,\\n'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,\\n'+",
        "  '  jointName.id as jointName_id,\\n'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  mainName.zzname as mainName_zzname,\\n'+",
        "  '  jointName.zzname as jointName_zzname,\\n'+",
        "  '  ACC_TBL.blnc as ACC_TBL_blnc\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  NAME_TBL mainName,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  NAME_TBL jointName,\\n'+",
        "  '  CUST_TBL jointCustomer\\n'+",
        "  ' where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ?\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  mainAddress.customerId as mainAddress_customerId,\\n'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\\n'+",
        "  '  mainAddress.zzline1 as mainAddress_zzline1,\\n'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  ADD_TBL mainAddress\\n'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and mainCustomer.id = mainAddress.customerId and ACC_TBL.mainCustomerId = mainCustomer.id\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  jointAddress.customerId as jointAddress_customerId,\\n'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\\n'+",
        "  '  jointAddress.zzline1 as jointAddress_zzline1,\\n'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  CUST_TBL jointCustomer,\\n'+",
        "  '  ADD_TBL jointAddress\\n'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id\\n'+",
        "  '\\n';",
        "  public static Optional<JointAccount_jointAccountMaps> getRoot(Connection connection, int accountId, int brandId, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection, int accountId, int brandId) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
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
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection, int accountId, int brandId) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
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
        "//{'accountId':{'rsSetter':'setInt','javaType':'int','javaParser':'Integer.parseInt','commonLens':'accountId','testValue':'custId'},'brandId':{'rsSetter':'setInt','javaType':'int','javaParser':'Integer.parseInt','commonLens':'brandId','testValue':'custId'},'dbName':{'rsSetter':'setString','javaType':'String','javaParser':'','commonLens':'dbName','testValue':'mock'}}",
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
        "  public static Optional<Map<String,Object>> getAll(Connection connection,int accountId,int brandId) throws SQLException {",
        "     return getRoot(connection,accountId,brandId,get0(connection,accountId,brandId),get1(connection,accountId,brandId)).map(x -> x._root);",
        "  }",
        "  public static String allSql='select\\n'+",
        "  '  mainCustomer.nameId as mainCustomer_nameId,\\n'+",
        "  '  mainName.id as mainName_id,\\n'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  jointCustomer.nameId as jointCustomer_nameId,\\n'+",
        "  '  jointName.id as jointName_id,\\n'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  mainName.zzname as mainName_zzname,\\n'+",
        "  '  jointName.zzname as jointName_zzname,\\n'+",
        "  '  ACC_TBL.blnc as ACC_TBL_blnc\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  NAME_TBL mainName,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  NAME_TBL jointName,\\n'+",
        "  '  CUST_TBL jointCustomer\\n'+",
        "  ' where mainCustomer.nameId = mainName.id and ACC_TBL.mainCustomerId = mainCustomer.id and jointCustomer.nameId = jointName.id and ACC_TBL.jointCustomerId = jointCustomer.id and  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ?\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  mainCustomer.id as mainCustomer_id,\\n'+",
        "  '  mainAddress.customerId as mainAddress_customerId,\\n'+",
        "  '  ACC_TBL.mainCustomerId as ACC_TBL_mainCustomerId,\\n'+",
        "  '  mainAddress.zzline1 as mainAddress_zzline1,\\n'+",
        "  '  mainAddress.zzline2 as mainAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  CUST_TBL mainCustomer,\\n'+",
        "  '  ADD_TBL mainAddress\\n'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and mainCustomer.id = mainAddress.customerId and ACC_TBL.mainCustomerId = mainCustomer.id\\n'+",
        "  '\\n'+",
        "  'select\\n'+",
        "  '  ACC_TBL.acc_id as ACC_TBL_acc_id,\\n'+",
        "  '  ACC_TBL.brand_id as ACC_TBL_brand_id,\\n'+",
        "  '  jointCustomer.id as jointCustomer_id,\\n'+",
        "  '  jointAddress.customerId as jointAddress_customerId,\\n'+",
        "  '  ACC_TBL.jointCustomerId as ACC_TBL_jointCustomerId,\\n'+",
        "  '  jointAddress.zzline1 as jointAddress_zzline1,\\n'+",
        "  '  jointAddress.zzline2 as jointAddress_zzline2\\n'+",
        "  ' from\\n'+",
        "  '  ACC_TBL ACC_TBL,\\n'+",
        "  '  CUST_TBL jointCustomer,\\n'+",
        "  '  ADD_TBL jointAddress\\n'+",
        "  ' where  ACC_TBL.acc_id = ? and  ACC_TBL.brand_id = ? and jointCustomer.id = jointAddress.customerId and ACC_TBL.jointCustomerId = jointCustomer.id\\n'+",
        "  '\\n';",
        "  public static Optional<JointAccount_jointAccountMaps> getRoot(Connection connection, int accountId, int brandId, List<JointAccount_jointAccountMaps0> list0, List<JointAccount_jointAccountMaps1> list1) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
        "      ResultSet rs = statement.executeQuery();",
        "      try {",
        "        return rs.next() ? Optional.of(new JointAccount_jointAccountMaps(rs,list0,list1)) : Optional.empty();",
        "      } finally {",
        "        rs.close();",
        "        statement.close();",
        "      }",
        "  }",
        "  public static List<JointAccount_jointAccountMaps0> get0(Connection connection, int accountId, int brandId) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps0.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
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
        "  public static List<JointAccount_jointAccountMaps1> get1(Connection connection, int accountId, int brandId) throws SQLException {",
        "      PreparedStatement statement = connection.prepareStatement(JointAccount_jointAccountMaps1.sql);",
        "    statement.setInt(1,accountId);",
        "    statement.setInt(2,brandId);",
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
        "    ",
        "    _root.put('joint', joint);",
        "    joint.put('addresses', joint_addresses);",
        "    ",
        "  }",
        "}"
      ]
    ] )
  } )
} )

describe ( "paramsForLinkedData", () => {
  const accountId: AllLensRestParams = { ...IntParam, commonLens: 'accountId', testValue: 'custId' }
  const brandId: AllLensRestParams = { ...IntParam, commonLens: 'brandId', testValue: 'custId' }
  const dbName: AllLensRestParams = { ...StringParam, commonLens: 'dbName', testValue: 'mock' }

  it ( "should find the params (in the correct order) from the wheres in the linked data", () => {
    expect ( findParamsForTable ( `error`, { accountId, brandId }, jointAccountRestD.tables ) ).toEqual ( [ [ 'accountId', accountId ], [ 'brandId', brandId ] ] )
    expect ( findParamsForTable ( `error`, { brandId, accountId }, jointAccountRestD.tables ) ).toEqual ( [ [ 'accountId', accountId ], [ 'brandId', brandId ] ] )
    expect ( findParamsForTable ( `error`, { brandId, accountId, dbName }, jointAccountRestD.tables ) ).toEqual ( [ [ 'accountId', accountId ], [ 'brandId', brandId ] ] )
    const reversed: EntityAndWhere = { ...jointAccountRestD.tables, where: jointAccountRestD.tables.where.reverse () }
    expect ( findParamsForTable ( `error`, { accountId, brandId }, reversed ) ).toEqual ( [ [ 'brandId', brandId ], [ 'accountId', accountId ] ] )
    expect ( findParamsForTable ( `error`, { brandId, accountId }, reversed ) ).toEqual ( [ [ 'brandId', brandId ], [ 'accountId', accountId ] ] )

  } )

  it ( "should throw a nice error message if a param is needed but isn't available", () => {
      expect ( () => findParamsForTable ( `error`, {}, jointAccountRestD.tables ) ).toThrow ( 'error param brandId is defined in where' )
    }
  )
} )

describe ( "makeSampleDataForMutate", () => {
  it ( "should get data from samples, and from the ids", () => {
    const ld = findSqlLinkDataFromRootAndDataD ( findSqlRoot ( jointAccountRestD.tables ), JointAccountDd )
    expect ( simplifyDataForMutate ( makeDataForMutate ( ld, 0 ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "Parent noParent",
      "data - {'mainName':{'zzname':''Fred Bloggs'','id':'idFormainCustomer__nameId__mainName__id'},'jointName':{'zzname':''Fred Bloggs'','id':'idForjointCustomer__nameId__jointName__id'},'ACC_TBL':{'blnc':123,'mainCustomerId':'idForACC_TBL__mainCustomerId__mainCustomer__id','jointCustomerId':'idForACC_TBL__jointCustomerId__jointCustomer__id','brand_id':'idForparam__brandId','acc_id':'idForparam__accountId'},'mainCustomer':{'nameId':'idFormainCustomer__nameId__mainName__id','id':'idForACC_TBL__mainCustomerId__mainCustomer__id'},'jointCustomer':{'nameId':'idForjointCustomer__nameId__jointName__id','id':'idForACC_TBL__jointCustomerId__jointCustomer__id'}}",
      "idData - {'mainCustomer__nameId__mainName__id':['idFormainCustomer__nameId__mainName__id','1'],'ACC_TBL__mainCustomerId__mainCustomer__id':['idForACC_TBL__mainCustomerId__mainCustomer__id','1'],'jointCustomer__nameId__jointName__id':['idForjointCustomer__nameId__jointName__id','1'],'ACC_TBL__jointCustomerId__jointCustomer__id':['idForACC_TBL__jointCustomerId__jointCustomer__id','1'],'param__brandId':['idForparam__brandId','1'],'param__accountId':['idForparam__accountId','1']}",
      "linkToParent: undefined",
      "  Parent parent",
      "  data - {'mainAddress':{'zzline1':''This is a one line string'','zzline2':''This is a one line string'','customerId':'idForACC_TBL__mainCustomerId__mainCustomer__id'}}",
      "  idData - {'mainCustomer__id__mainAddress__customerId':['idForACC_TBL__mainCustomerId__mainCustomer__id','1']}",
      "  linkToParent: Table: parent-mainCustomer:CUST_TBL.id == child-mainAddress:ADD_TBL.customerId",
      "  Parent parent",
      "  data - {'jointAddress':{'zzline1':''This is a one line string'','zzline2':''This is a one line string'','customerId':'idForACC_TBL__jointCustomerId__jointCustomer__id'}}",
      "  idData - {'jointCustomer__id__jointAddress__customerId':['idForACC_TBL__jointCustomerId__jointCustomer__id','1']}",
      "  linkToParent: Table: parent-jointCustomer:CUST_TBL.id == child-jointAddress:ADD_TBL.customerId"
    ] )
  } )
} )

describe ("make sampleData for the databases", () =>{
  it("", () =>{
    const ld = findSqlLinkDataFromRootAndDataD ( findSqlRoot ( jointAccountRestD.tables ), JointAccountDd )
    expect ( simplifyDataForMutate ( makeDataForMutate ( ld, 0 ) ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [])

  })
})

describe ( "make insert sql for samples", () => {
  it ( "should make sample sql - simple case", () => {
    const ld = findSqlLinkDataFromRootAndDataD ( findSqlRoot ( PostCodeMainPage.rest.address.rest.tables ), nameAndAddressDataD )
    // noinspection SqlResolve
    expect ( makeInsertSqlForSample ( ld, 0 ) ).toEqual ( [
      "insert into ADD_TBL (zzline1,zzline2,zzline3,zzline4) values ('4 Privet drive','Little Whinging','Surrey','England')"
    ])

  } )
  it ( "should make sample sql", () => {
    const ld = findSqlLinkDataFromRootAndDataD ( findSqlRoot ( jointAccountRestD.tables ), JointAccountDd )
    expect ( makeInsertSqlForSample ( ld, 0 ) ).toEqual ( [
      "insert into NAME_TBL (zzname,id) values ('Fred Bloggs',idFormainCustomer__nameId__mainName__id)",
      "insert into NAME_TBL (zzname,id) values ('Fred Bloggs',idForjointCustomer__nameId__jointName__id)",
      "insert into ACC_TBL (blnc,mainCustomerId,jointCustomerId,brand_id,acc_id) values (123,idForACC_TBL__mainCustomerId__mainCustomer__id,idForACC_TBL__jointCustomerId__jointCustomer__id,idForparam__brandId,idForparam__accountId)",
      "insert into CUST_TBL (nameId,id) values (idFormainCustomer__nameId__mainName__id,idForACC_TBL__mainCustomerId__mainCustomer__id)",
      "insert into CUST_TBL (nameId,id) values (idForjointCustomer__nameId__jointName__id,idForACC_TBL__jointCustomerId__jointCustomer__id)",
      "insert into ADD_TBL (zzline1,zzline2,customerId) values ('This is a one line string','This is a one line string',idForACC_TBL__mainCustomerId__mainCustomer__id)",
      "insert into ADD_TBL (zzline1,zzline2,customerId) values ('This is a one line string','This is a one line string',idForACC_TBL__jointCustomerId__jointCustomer__id)"
    ] )

  } )

} )
