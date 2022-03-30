import { DBTable } from "../common/resolverD";
import { accountT, addT, customerT, nameT } from "../example/database/tableNames";
import { beforeSeparator, NameAnd } from "@focuson/utils";

export interface CommonEntity {
  table: DBTable;
  where?: string;
  children?: NameAnd<ChildEntity>;
  type: 'Main' | 'Multiple' | 'Single';
}
export interface MainEntity extends CommonEntity {
  type: 'Main'
}
export interface MultipleEntity extends CommonEntity {  //parent id is in the child
  type: 'Multiple';
  idInChild: string;
  idInParent: string;
}

export interface SingleEntity extends CommonEntity { //child id is in the parent
  type: 'Single'
  idInChild: string;
  idInParent: string;
}

export type Entity = MainEntity | MultipleEntity | SingleEntity
export type ChildEntity = MultipleEntity | SingleEntity

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
interface EntityFolder<Acc> {
  foldMain ( childAccs: Acc[], main: Entity ): Acc;
  foldSingle ( childAccs: Acc[], main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): Acc;
  foldMultiple ( childAccs: Acc[], main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): Acc;
}

function foldEntitys<Acc> ( folder: EntityFolder<Acc>, main: MainEntity, e: Entity, zero: Acc ): Acc {
  let childAccs = foldChildEntitys ( folder, main, [], e.children, zero );
  return folder.foldMain ( childAccs, e )
}
function foldChildEntitys<Acc> ( folder: EntityFolder<Acc>, main: MainEntity, path: [ string, ChildEntity ][], children: NameAnd<ChildEntity> | undefined, zero: Acc ): Acc[] {
  if ( !children ) return []
  return Object.entries ( children ).map ( ( [ name, child ] ) => foldChildEntity ( folder, main, path, name, child, zero ) )
}
function foldChildEntity<Acc> ( folder: EntityFolder<Acc>, m: MainEntity, path: [ string, ChildEntity ][], name: string, c: ChildEntity, acc: Acc ) {
  if ( c.type === 'Multiple' ) return folder.foldMultiple ( foldChildEntitys ( folder, m, [ ...path, [ name, c ] ], c.children, acc ), m, path, name, c )
  if ( c.type === 'Single' ) return folder.foldSingle ( foldChildEntitys ( folder, m, [ ...path, [ name, c ] ], c.children, acc ), m, path, name, c )
  throw  Error ( `Unknown type ${JSON.stringify ( c )}` )
}
interface FlatMapper<T> {
  main ( main: MainEntity ): T[];
  single ( main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): T[];
  multiple ( main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): T[];
}
// function flatMapEntities<T> ( parent: MainEntity, fn: FlatMapper<T> ): T[] {
//   return foldEntitys<T[]> ( {
//     foldMain ( acc: T[], main: MainEntity ): T[] {return [ ...acc, ...fn.main ( main ) ]},
//     foldSingle ( acc: T[], main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): T[] {return [ ...acc, ...fn.single ( parent, path, name, single ) ]},
//     foldMultiple ( acc: T[], main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): T[] {return [ ...acc, ...fn.multiple ( parent, path, name, multiple ) ]}
//   }, parent, [] )
// }
function simplifyAliasAndChildEntityPath ( path: [ string, Entity ] [] ): string {return `[${path.map ( ( [ alias, child ] ) => `${alias} -> ${child.table.name}` ).join ( "," )}]`}

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
  // it ( "should flatmap all the nodes", () => {
  //   expect ( flatMapEntities<string> ( mainEntity, {
  //     main ( main: MainEntity ): string[] {return [ `main ${main.table.name}` ]},
  //     single ( main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): string[] {return [ `single ${main.table.name} path ${simplifyAliasAndChildEntityPath ( path )} ${name} ${single.table.name}` ]},
  //     multiple ( main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): string[] {return [ `multiple ${main.table.name} path ${simplifyAliasAndChildEntityPath ( path )} ${name} ${multiple.table.name}` ]},
  //   } ) ).toEqual ( [
  //     "multiple ACC_TBL path [mainCustomer -> CUST_TBL] addresses ADD_TBL",
  //     "single ACC_TBL path [mainCustomer -> CUST_TBL] name NAME_TBL",
  //     "single ACC_TBL path [] mainCustomer CUST_TBL",
  //     "multiple ACC_TBL path [jointCustomer -> CUST_TBL] addresses ADD_TBL",
  //     "single ACC_TBL path [jointCustomer -> CUST_TBL] name NAME_TBL",
  //     "single ACC_TBL path [] jointCustomer CUST_TBL",
  //     "main ACC_TBL"
  //   ] )
  // } )

} )

interface SqlRoot {
  main: MainEntity
  path: [ string, ChildEntity ][];
  alias: string;
  root: Entity;
  children: SqlRoot[]
}

function simplifySqlRoot ( s: SqlRoot ): string {
  return `main ${s.main.table.name} path ${simplifyAliasAndChildEntityPath ( s.path )} root ${s.root.table.name} children [${s.children.map ( c => c.root.table.name ).join ( ',' )}]}`
}
const findSqlRootsMapper: EntityFolder<SqlRoot[]> = {
  foldMain ( childAccs: SqlRoot[][], main: MainEntity ): SqlRoot[] {
    return [ { main, path: [], alias: main.table.name, root: main, children: childAccs.flat () } ];
  },
  foldMultiple ( childAccs: SqlRoot[][], main: MainEntity, path: [ string, ChildEntity ][], alias: string, multiple: MultipleEntity ): SqlRoot[] {
    return [ { main, path, alias, root: multiple, children: childAccs.flat () } ];
  },
  foldSingle ( childAccs: SqlRoot[][], main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): SqlRoot[] {
    return childAccs.flat ();
  }
}
function findSqlRoots ( m: MainEntity ): SqlRoot {
  return foldEntitys ( findSqlRootsMapper, m, m, [] )[ 0 ]
}
function walkSqlRoots<T> ( s: SqlRoot, fn: ( s: SqlRoot ) => T ): T[] {
  return [ fn ( s ), ...s.children.flatMap ( c => walkSqlRoots ( c, fn ) ) ]
}

describe ( "findSqlRoots", () => {
  it ( "should find a root for the main and each multiple", () => {
    expect ( walkSqlRoots ( findSqlRoots ( mainEntity ), simplifySqlRoot ) ).toEqual ( [
      "main ACC_TBL path [] root ACC_TBL children [ADD_TBL,ADD_TBL]}",
      "main ACC_TBL path [mainCustomer -> CUST_TBL] root ADD_TBL children []}",
      "main ACC_TBL path [jointCustomer -> CUST_TBL] root ADD_TBL children []}"
    ] )
  } )
} )

interface WhereLink {
  parentTable: DBTable;
  parentAlias: string;
  idInParent: string;

  childTable: DBTable;
  childAlias: string
  idInChild: string;
}

interface SqlLinkData {
  sqlRoot: SqlRoot;
  aliasAndTables: [ string, DBTable ][];
  whereLinks: WhereLink[]
}
function simplifyAliasAndTables ( ats: [ string, DBTable ] [] ) {return ats.map ( ( [ alias, table ] ) => `${alias}->${table.name}` ).join ( "," )}
function simplifyWhereLinks ( ws: WhereLink[] ) {return ws.map ( w => `${w.parentTable.name}.${w.idInParent} == ${w.childTable.name}.${w.idInChild}` )}
function simplifySqlLinkData ( s: SqlLinkData ): string {
  return `sqlRoot: ${s.sqlRoot.root.table.name}    aliasAndTables          ${simplifyAliasAndTables ( s.aliasAndTables )}               where ${simplifyWhereLinks ( s.whereLinks )}`
}

function getParentTableAndAlias<T> ( main: MainEntity, path: [ string, ChildEntity ][], fn: ( c: Entity ) => T ): [ string, T ] {
  if ( path.length === 0 ) return [ main.table.name, fn ( main ) ]
  const [ alias, c ] = path[ path.length - 1 ]
  return [ alias, fn ( c ) ]
}

function findAliasAndTableLinksForLinkData ( m: SqlRoot ): [ string, DBTable ][] {
  const findAliasAndTablesLinksForLinkDataFolder: EntityFolder<[ string, DBTable ][]> = {
    foldMain ( childAccs: [ string, DBTable ][][], main: MainEntity ): [ string, DBTable ][] {return [ ...childAccs.flat (), [ m.alias, main.table ] ]},
    foldSingle ( childAccs: [ string, DBTable ][][], main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): [ string, DBTable ][] {
      return [ ...childAccs.flat (), [ name, single.table ] ]
    },
    foldMultiple ( childAccs: [ string, DBTable ][][], main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): [ string, DBTable ][] {
      return [] // we throw away the child accs
    }
  }
  return foldEntitys ( findAliasAndTablesLinksForLinkDataFolder, m.main, m.root, [] )

}
const findWhereLinkDataForLinkData: EntityFolder<WhereLink[]> = {
  foldMain ( childAccs: WhereLink[][], main: MainEntity ): WhereLink[] {return childAccs.flat ()},
  foldMultiple ( childAccs: WhereLink[][], main: MainEntity, path: [ string, ChildEntity ][], childAlias: string, multiple: MultipleEntity ): WhereLink[] { return [] },
  foldSingle ( childAccs: WhereLink[][], main: MainEntity, path: [ string, ChildEntity ][], childAlias: string, single: SingleEntity ): WhereLink[] {
    const [ parentAlias, parentTable ] = getParentTableAndAlias ( main, path, e => e.table )
    return [ ...childAccs.flat (), { parentTable, parentAlias, idInParent: single.idInParent, childAlias, childTable: single.table, idInChild: single.idInChild } ]
  }
}
function findWhereLinksForSqlRoot ( sqlRoot: SqlRoot ): WhereLink[] {
  let whereLinks = foldEntitys ( findWhereLinkDataForLinkData, sqlRoot.main, sqlRoot.root, [] );
  const result: WhereLink[] = [ ...whereLinks.flat (), ...findWhereLinksForSqlRootGoingUp ( sqlRoot ) ]
  return result
}

function findWhereLinksForSqlRootGoingUp ( sqlRoot: SqlRoot ): WhereLink[] {
  if ( sqlRoot.root === sqlRoot.main ) return []

  let meAndParents: [ string, Entity ][] = [ [ sqlRoot.alias, sqlRoot.root ], ...sqlRoot.path ];
  const upToMain: [ string, Entity ][] = [ ...meAndParents, [ sqlRoot.main.table.name, sqlRoot.main ] ]
  console.log ( 'findWhereLinksForSqlRootGoingUp', upToMain.map ( ( [ alias, entity ] ) => `${alias} => ${entity.table.name}` ) )
  return meAndParents.map ( ( p, i ) => {
    if ( p[ 1 ].type === 'Main' )
      throw Error ();
    return ({
        parentTable: upToMain[ i ][ 1 ].table, parentAlias: upToMain[ i ][ 0 ],
        childTable: p[ 1 ].table, childAlias: p[ 0 ], idInChild: p[ 1 ].idInChild, idInParent: p[ 1 ].idInParent
      }
    );
  } )
}

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

function findSqlLinkData ( sqlRoot: SqlRoot ): SqlLinkData {
  const aliasAndTables = findAliasAndTableLinksForLinkData ( sqlRoot )
  const whereLinks = findWhereLinksForSqlRoot ( sqlRoot )
  return { whereLinks, aliasAndTables, sqlRoot }
}

describe ( "findLinkData", () => {
  it ( "shouldCreate the data for the links", () => {
    expect ( walkSqlRoots ( findSqlRoots ( mainEntity ), r => simplifySqlLinkData ( findSqlLinkData ( r ) ) ) ).toEqual ( [
      "sqlRoot: ACC_TBL    aliasAndTables          mainName->NAME_TBL,mainCustomer->CUST_TBL,jointName->NAME_TBL,jointCustomer->CUST_TBL,ACC_TBL->ACC_TBL               where CUST_TBL.nameId == NAME_TBL.id,ACC_TBL.mainCustomerId:number == CUST_TBL.id:number,CUST_TBL.nameId == NAME_TBL.id,ACC_TBL.jointCustomerId:number == CUST_TBL.id:number",
      "sqlRoot: ADD_TBL    aliasAndTables          mainAddress->ADD_TBL               where ADD_TBL.id == ADD_TBL.customerId,CUST_TBL.mainCustomerId:number == CUST_TBL.id:number",
      "sqlRoot: ADD_TBL    aliasAndTables          jointAddress->ADD_TBL               where ADD_TBL.id == ADD_TBL.customerId,CUST_TBL.jointCustomerId:number == CUST_TBL.id:number"
    ] )
  } )

} )

function makeWhereClause ( ws: WhereLink[] ) {
  return ws.map ( ( { parentAlias, idInParent, childAlias, idInChild } ) => `${parentAlias}.${beforeSeparator ( ":", idInParent )} = ${childAlias}.${beforeSeparator ( ":", idInChild )}` )
}

function generateGetSql ( fields: string, s: SqlLinkData ): string[] {
  return [ `select ${fields}`,
    `from ${s.aliasAndTables.map ( ( [ alias, table ] ) => `${table.name} ${alias}` ).join ( "," )}`,
    `where ${makeWhereClause ( s.whereLinks )}` ]

}
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
