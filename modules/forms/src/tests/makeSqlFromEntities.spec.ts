import { accountT, addT, customerT, nameT } from "../example/database/tableNames";
import { MainEntity, MultipleEntity, SingleEntity, ChildEntity, EntityFolder, simplifyAliasAndChildEntityPath,
  foldEntitys, walkSqlRoots, findSqlRoots, simplifySqlRoot, findSqlLinkData, simplifyAliasAndTables,
  findAliasAndTableLinksForLinkData, simplifySqlLinkData, generateGetSql, simplifyWhereLinks, findWhereLinksForSqlRoot } from "../codegen/makeSqlFromEntities";

const mainEntity: MainEntity = {
  type: 'Main',
  table: accountT,
  children: {
    mainCustomer: {
      type: 'Single',
      table: customerT,
      idInParent: 'mainCustomerId:number', idInChild: 'id:number',
      children: {
        mainAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInChild: "customerId" },
        mainName: { type: 'Single', table: nameT, idInParent: 'nameId', idInChild: 'id' },
      }
    },
    jointCustomer: {
      type: 'Single',
      table: customerT,
      idInParent: 'jointCustomerId:number', idInChild: 'id:number',
      children: {
        jointAddress: { type: 'Multiple', table: addT, idInParent: 'id', idInChild: "customerId" },
        jointName: { type: 'Single', table: nameT, idInParent: 'nameId', idInChild: 'id' },
      }
    },
  }
}

describe ( "EntityFolder", () => {
  it ( "should walk all the nodes", () => {
    const testFolder: EntityFolder<string[]> = {
      foldMain ( childAcc: string[][], main: MainEntity ): string[] {return [ ...childAcc.flat (), `main: ${main.table.name}` ]},
      foldMultiple ( childAcc: string[][], main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): string[] {
        return [ ...childAcc.flat (), `multiple ${main.table.name} path ${simplifyAliasAndChildEntityPath ( path )} => ${multiple.table.name}` ]
      },
      foldSingle ( childAcc: string[][], main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): string[] {
        return [ ...childAcc.flat (), `single ${main.table.name} path ${simplifyAliasAndChildEntityPath ( path )} => ${single.table.name}` ]
      },
    }
    expect ( foldEntitys ( testFolder, mainEntity, mainEntity, [] ) ).toEqual ( [
      "multiple ACC_TBL path [mainCustomer -> CUST_TBL] => ADD_TBL",
      "single ACC_TBL path [mainCustomer -> CUST_TBL] => NAME_TBL",
      "single ACC_TBL path [] => CUST_TBL",
      "multiple ACC_TBL path [jointCustomer -> CUST_TBL] => ADD_TBL",
      "single ACC_TBL path [jointCustomer -> CUST_TBL] => NAME_TBL",
      "single ACC_TBL path [] => CUST_TBL",
      "main: ACC_TBL"
    ] )
  } )
} )

describe ( "findSqlRoots", () => {
  it ( "should find a root for the main and each multiple", () => {
    expect ( walkSqlRoots ( findSqlRoots ( mainEntity ), simplifySqlRoot ) ).toEqual ( [
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL]}",
      "main ACC_TBL path [mainCustomer -> CUST_TBL] root ADD_TBL children []}",
      "main ACC_TBL path [jointCustomer -> CUST_TBL] root ADD_TBL children []}"
    ] )
  } )
} )

describe ( "findAliasAndTablesLinksForLinkDataFolder", () => {
  it ( "should generate aliasAndTables", () => {
    expect ( walkSqlRoots ( findSqlRoots ( mainEntity ), r => simplifyAliasAndTables ( findAliasAndTableLinksForLinkData ( r ) ) ) ).toEqual ( [
      "mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL,ACC_TBL->ACC_TBL",
      "mainAddress->ADD_TBL",
      "jointAddress->ADD_TBL"
    ] )
  } )
} )
describe ( "findWhereLinkDataForLinkData", () => {
    it ( "should generate  findWhereLinkDataForLinkData", () => {
      expect ( walkSqlRoots ( findSqlRoots ( mainEntity ), r => simplifyWhereLinks ( findWhereLinksForSqlRoot ( r ) ) ) ).toEqual ( [
        [
          "CUST_TBL.nameId == NAME_TBL.id",
          "ACC_TBL.mainCustomerId:number == CUST_TBL.id:number",
          "CUST_TBL.nameId == NAME_TBL.id",
          "ACC_TBL.jointCustomerId:number == CUST_TBL.id:number"
        ],
        [
          "ADD_TBL.id == ADD_TBL.customerId",
          "CUST_TBL.mainCustomerId:number == CUST_TBL.id:number"
        ],
        [
          "ADD_TBL.id == ADD_TBL.customerId",
          "CUST_TBL.jointCustomerId:number == CUST_TBL.id:number"
        ]
      ] )
    } )
  }
)

describe ( "findLinkData", () => {
  it ( "shouldCreate the data for the links", () => {
    expect ( walkSqlRoots ( findSqlRoots ( mainEntity ), r => simplifySqlLinkData ( findSqlLinkData ( r ) ) ) ).toEqual ( [
      "sqlRoot: ACC_TBL    aliasAndTables          mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL,ACC_TBL->ACC_TBL               where CUST_TBL.nameId == NAME_TBL.id,ACC_TBL.mainCustomerId:number == CUST_TBL.id:number,CUST_TBL.nameId == NAME_TBL.id,ACC_TBL.jointCustomerId:number == CUST_TBL.id:number",
      "sqlRoot: ADD_TBL    aliasAndTables          mainAddress->ADD_TBL               where ADD_TBL.id == ADD_TBL.customerId,CUST_TBL.mainCustomerId:number == CUST_TBL.id:number",
      "sqlRoot: ADD_TBL    aliasAndTables          jointAddress->ADD_TBL               where ADD_TBL.id == ADD_TBL.customerId,CUST_TBL.jointCustomerId:number == CUST_TBL.id:number"
    ] )
  } )

} )

describe ( "generateGetSql", () => {
  it ( "should generate the get sql", () => {
    expect ( walkSqlRoots ( findSqlRoots ( mainEntity ), r => generateGetSql ( '*', findSqlLinkData ( r ) ) ) ).toEqual ( [
      [
        "select *",
        "from NAME_TBL mainName,CUST_TBL mainCustomer,NAME_TBL jointName,CUST_TBL jointCustomer,ACC_TBL ACC_TBL",
        "where mainCustomer.nameId = mainName.id,ACC_TBL.mainCustomerId = mainCustomer.id,jointCustomer.nameId = jointName.id,ACC_TBL.jointCustomerId = jointCustomer.id"
      ],
      [
        "select *",
        "from ADD_TBL mainAddress",
        "where mainAddress.id = mainAddress.customerId,mainCustomer.mainCustomerId = mainCustomer.id"
      ],
      [
        "select *",
        "from ADD_TBL jointAddress",
        "where jointAddress.id = jointAddress.customerId,jointCustomer.jointCustomerId = jointCustomer.id"
      ]
    ])
  } )

} )
