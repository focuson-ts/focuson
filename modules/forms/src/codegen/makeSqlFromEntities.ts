import { DBTable } from "../common/resolverD";
import { beforeSeparator, NameAnd } from "@focuson/utils";
import { EntityAndWhere, unique } from "../common/restD";
import { isTableAndField, simplifyTableAndFields, TableAliasAndField, TableAndField } from "./makeJavaSql";
import { CompDataD, emptyDataFlatMap, flatMapDD } from "../common/dataD";
import { JointAccountDd } from "../example/jointAccount/jointAccount.dataD";
import { RestDefnInPageProperties } from "../common/pageD";

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
  idInParent: string;
  idInThis: string;
}

export interface SingleEntity extends CommonEntity { //child id is in the parent
  type: 'Single'
  idInParent: string;
  idInThis: string;
}

export type Entity = MainEntity | MultipleEntity | SingleEntity
export type ChildEntity = MultipleEntity | SingleEntity

export interface EntityFolder<Acc> {
  foldMain ( childAccs: Acc[], main: EntityAndWhere, e: Entity ): Acc;
  foldSingle ( childAccs: Acc[], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): Acc;
  foldMultiple ( childAccs: Acc[], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): Acc;
}

export function foldEntitys<Acc> ( folder: EntityFolder<Acc>, main: EntityAndWhere, e: Entity, zero: Acc ): Acc {
  let childAccs = foldChildEntitys ( folder, main, [], e.children, zero );
  return folder.foldMain ( childAccs, main, e )
}
function foldChildEntitys<Acc> ( folder: EntityFolder<Acc>, main: EntityAndWhere, path: [ string, ChildEntity ][], children: NameAnd<ChildEntity> | undefined, zero: Acc ): Acc[] {
  if ( !children ) return []
  return Object.entries ( children ).map ( ( [ name, child ] ) => foldChildEntity ( folder, main, path, name, child, zero ) )
}
function foldChildEntity<Acc> ( folder: EntityFolder<Acc>, m: EntityAndWhere, path: [ string, ChildEntity ][], name: string, c: ChildEntity, acc: Acc ) {
  if ( c.type === 'Multiple' ) return folder.foldMultiple ( foldChildEntitys ( folder, m, [ ...path, [ name, c ] ], c.children, acc ), m, path, name, c )
  if ( c.type === 'Single' ) return folder.foldSingle ( foldChildEntitys ( folder, m, [ ...path, [ name, c ] ], c.children, acc ), m, path, name, c )
  throw  Error ( `Unknown type ${JSON.stringify ( c )}` )
}
interface FlatMapper<T> {
  main ( main: MainEntity ): T[];
  single ( main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): T[];
  multiple ( main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): T[];
}

export function simplifyAliasAndChildEntityPath ( path: [ string, Entity ] [] ): string {return `[${path.map ( ( [ alias, child ] ) => `${alias} -> ${child.table.name}` ).join ( "," )}]`}
export function simplifyWhereFromQuery ( whereFromQuery: WhereFromQuery[] ) {
  return whereFromQuery.map ( w => `${w.table.name}:${w.table.name}.${w.field}==${w.paramName} ` ).join ( ", " )
}
export function simplifyTableAliasAndField ( taf: TableAliasAndField ): string {
  return `${taf.alias}:${taf.table.name}.${taf.field}`
}

export function simplifyTableAliasAndFields ( tafs: TableAliasAndField[] ): string[] {
  return tafs.map ( simplifyTableAliasAndField )
}

export interface SqlRoot {
  main: EntityAndWhere
  path: [ string, ChildEntity ][];
  alias: string;
  root: Entity;
  children: SqlRoot[]
}

export function simplifySqlRoot ( s: SqlRoot ): string {
  return `main ${s.main.entity.table.name} path ${simplifyAliasAndChildEntityPath ( s.path )} root ${s.root.table.name} children [${s.children.map ( c => c.root.table.name ).join ( ',' )}]}`
}
const findSqlRootsMapper: EntityFolder<SqlRoot[]> = {
  foldMain ( childAccs: SqlRoot[][], main: EntityAndWhere, e: Entity ): SqlRoot[] {
    return [ { main, path: [], alias: main.entity.table.name, root: e, children: childAccs.flat () } ];
  },
  foldMultiple ( childAccs: SqlRoot[][], main: EntityAndWhere, path: [ string, ChildEntity ][], alias: string, multiple: MultipleEntity ): SqlRoot[] {
    return [ { main, path, alias, root: multiple, children: childAccs.flat () } ];
  },
  foldSingle ( childAccs: SqlRoot[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): SqlRoot[] {
    return childAccs.flat ();
  }
}
export function findSqlRoots ( m: EntityAndWhere ): SqlRoot {
  return foldEntitys ( findSqlRootsMapper, m, m.entity, [] )[ 0 ]
}
export function walkSqlRoots<T> ( s: SqlRoot, fn: ( s: SqlRoot ) => T ): T[] {
  return [ fn ( s ), ...s.children.flatMap ( c => walkSqlRoots ( c, fn ) ) ]
}

export interface TableWhereLink {
  parentTable: DBTable;
  parentAlias: string;
  idInParent: string;

  childTable: DBTable;
  childAlias: string
  idInThis: string;
}
export type WhereLink = TableWhereLink | WhereFromQuery

export interface WhereFromQuery {
  paramName: string;
  table: DBTable;
  alias: string
  field: string;
}
export function isWhereFromQuery ( w: WhereLink ): w is WhereFromQuery {
  // @ts-ignore
  return w.paramName !== undefined
}
export function isTableWhereLink ( w: WhereLink ): w is TableWhereLink {
  // @ts-ignore
  return w.parentTable !== undefined
}

export interface SqlLinkData {
  sqlRoot: SqlRoot;
  aliasAndTables: [ string, DBTable ][];
  fields: TableAliasAndField[],
  whereLinks: WhereLink[]
}
export function simplifyAliasAndTables ( ats: [ string, DBTable ] [] ) {return ats.map ( ( [ alias, table ] ) => `${alias}->${table.name}` ).join ( "," )}
export function simplifyWhereLinks ( ws: WhereLink[] ) {
  return ws.map ( w => {
      if ( isTableWhereLink ( w ) ) return `${w.parentAlias}:${w.parentTable.name}.${w.idInParent} == ${w.childAlias}:${w.childTable.name}.${w.idInThis}`;
      if ( isWhereFromQuery ( w ) ) return `param ${w.paramName} == ${w.alias}:${w.table.name}.${w.field}`
      throw Error ( `Unknown where link ${JSON.stringify ( w )}` )
    }
  )
}
export function simplifySqlLinkData ( s: SqlLinkData ): string[] {
  return [ `sqlRoot: ${s.sqlRoot.root.table.name}`, `fields: ${simplifyTableAliasAndFields ( s.fields ).join ( "," )}`, `aliasAndTables ${simplifyAliasAndTables ( s.aliasAndTables )}`, `where ${simplifyWhereLinks ( s.whereLinks )}` ]
}

export function getParentTableAndAlias<T> ( main: EntityAndWhere, path: [ string, ChildEntity ][], fn: ( c: Entity ) => T ): [ string, T ] {
  if ( path.length === 0 ) return [ main.entity.table.name, fn ( main.entity ) ]
  const [ alias, c ] = path[ path.length - 1 ]
  return [ alias, fn ( c ) ]
}

export function findAliasAndTableLinksForLinkData ( m: SqlRoot ): [ string, DBTable ][] {
  const findAliasAndTablesLinksForLinkDataFolder: EntityFolder<[ string, DBTable ][]> = {
    foldMain ( childAccs: [ string, DBTable ][][], main: EntityAndWhere, e: Entity ): [ string, DBTable ][] {return [ ...childAccs.flat (), [ m.alias, e.table ] ]},
    foldSingle ( childAccs: [ string, DBTable ][][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): [ string, DBTable ][] {
      return [ ...childAccs.flat (), [ name, single.table ] ]
    },
    foldMultiple ( childAccs: [ string, DBTable ][][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): [ string, DBTable ][] {
      return [] // we throw away the child accs
    }
  }
  return foldEntitys ( findAliasAndTablesLinksForLinkDataFolder, m.main, m.root, [] )
}

export const findWhereLinkDataForLinkData: EntityFolder<WhereLink[]> = {
  foldMain ( childAccs: WhereLink[][], main: EntityAndWhere ): WhereLink[] { return [ ...childAccs.flat (), ...main.where ]},
  foldMultiple ( childAccs: WhereLink[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, multiple: MultipleEntity ): WhereLink[] { return [] },
  foldSingle ( childAccs: WhereLink[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, single: SingleEntity ): WhereLink[] {
    const [ parentAlias, parentTable ] = getParentTableAndAlias ( main, path, e => e.table )
    return [ ...childAccs.flat (), { parentTable, parentAlias, idInParent: single.idInParent, childAlias, childTable: single.table, idInThis: single.idInThis } ]
  }
}

export function findWhereLinksForSqlRoot ( sqlRoot: SqlRoot ): WhereLink[] {
  let whereLinks = foldEntitys ( findWhereLinkDataForLinkData, sqlRoot.main, sqlRoot.root, [] );
  const result: WhereLink[] = [ ...whereLinks.flat (), ...findWhereLinksForSqlRootGoingUp ( sqlRoot ) ]
  return result
}

export function findWhereLinksForSqlRootGoingUp ( sqlRoot: SqlRoot ): WhereLink[] {
  if ( sqlRoot.root === sqlRoot.main.entity ) return []

  let meAndParents: [ string, Entity ][] = [ [ sqlRoot.alias, sqlRoot.root ], ...sqlRoot.path ];
  const upToMain: [ string, Entity ][] = [ ...meAndParents, [ sqlRoot.main.entity.table.name, sqlRoot.main.entity ] ]
  console.log ( 'findWhereLinksForSqlRootGoingUp', upToMain.map ( ( [ alias, entity ] ) => `${alias} => ${entity.table.name}` ) )
  return meAndParents.map ( ( p, i ) => {
    if ( p[ 1 ].type === 'Main' )
      throw Error ();
    return ({
        parentTable: upToMain[ i ][ 1 ].table, parentAlias: upToMain[ i ][ 0 ],
        childTable: p[ 1 ].table, childAlias: p[ 0 ], idInThis: p[ 1 ].idInThis, idInParent: p[ 1 ].idInParent
      }
    );
  } )
}
export function findFieldsFromWhere ( ws: WhereLink[] ): TableAliasAndField[] {
  return ws.flatMap ( w => {
    if ( isWhereFromQuery ( w ) ) return [ w ]
    if ( isTableWhereLink ( w ) ) return [ { table: w.parentTable, alias: w.parentAlias, field: w.idInParent }, { table: w.childTable, alias: w.childAlias, field: w.idInThis } ]
    throw Error ( `Unknown type of where ${w}` )
  } )
}

export const findTableAndFieldFromDataD = <G> ( dataD: CompDataD<G> ) => unique ( flatMapDD<TableAndField, any> ( JointAccountDd, {
  ...emptyDataFlatMap<TableAndField, any> (),
  walkPrim: ( path, parents, oneDataDD, dataDD ) => {
    if ( oneDataDD?.db )
      if ( isTableAndField ( oneDataDD.db ) ) return [ oneDataDD.db ]
      else {
        const parent = parents[ parents.length - 1 ]
        if ( !parent.table ) throw new Error ( `Have a field name [${oneDataDD.db} in ${path}], but there is no table in the parent ${parent.name}` )
        return [ { table: parent.table, field: oneDataDD.db } ]
      }
    return []
  }
} ), s => simplifyTableAndFields ( s ) )


export function findTableAliasAndFieldFromDataD ( sqlRoot: SqlRoot, fromDataD: TableAndField[] ) {
  const add = ( acc: TableAliasAndField[], e: Entity, alias: string ) => fromDataD.filter ( tf => tf.table.name === e.table.name ).map ( tf => ({ ...tf, alias }) );
  const folder: EntityFolder<TableAliasAndField[]> = {
    foldMain ( childAccs: TableAliasAndField[][], main: EntityAndWhere, e: Entity ): TableAliasAndField[] {return add ( childAccs.flat (), e, sqlRoot.alias )},
    foldSingle ( childAccs: TableAliasAndField[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): TableAliasAndField[] {
      return add ( childAccs.flat (), single, name )
    },
    foldMultiple ( childAccs: TableAliasAndField[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): TableAliasAndField[] {
      return []//we stop at multiples
    }
  }
  return foldEntitys<TableAliasAndField[]> ( folder, sqlRoot.main, sqlRoot.root, [] )
}

export function findAllFields ( sqlRoot: SqlRoot, dataD: CompDataD<any>, wheres: WhereLink[] ): TableAliasAndField[] {
  const tfFromData = findTableAndFieldFromDataD ( dataD )
  const tfAliasFromData = findTableAliasAndFieldFromDataD ( sqlRoot, tfFromData )
  const fromWhere = findFieldsFromWhere ( wheres )
  return unique ( [ ...fromWhere, ...tfAliasFromData ], t => simplifyTableAliasAndField ( t ) )
}

export function findSqlLinkDataFromRootAndDataD ( sqlRoot: SqlRoot, dataD: CompDataD<any> ): SqlLinkData {
  const aliasAndTables = findAliasAndTableLinksForLinkData ( sqlRoot )
  const whereLinks = findWhereLinksForSqlRoot ( sqlRoot )
  const fields = findAllFields ( sqlRoot, dataD, whereLinks )
  return { whereLinks, aliasAndTables, sqlRoot, fields }
}


export function makeWhereClause ( ws: WhereLink[] ) {
  return ws.map ( ( w ) => {
    if ( isTableWhereLink ( w ) ) {
      const { parentAlias, idInParent, childAlias, idInThis } = w
      return `${parentAlias}.${beforeSeparator ( ":", idInParent )} = ${childAlias}.${beforeSeparator ( ":", idInThis )}`;
    }
    if ( isWhereFromQuery ( w ) ) {
      return ` ${w.alias}.${w.field} = ?`
    }
    throw new Error ( `Unknown where link ${JSON.stringify ( w )}` )
  } )
}

export function generateGetSql ( s: SqlLinkData ): string[] {
  return [ `select ${s.fields.map ( taf => `${taf.alias}.${taf.field}` ).join ( "," )}`,
    `from ${s.aliasAndTables.map ( ( [ alias, table ] ) => `${table.name} ${alias}` ).join ( "," )}`,
    `where ${makeWhereClause ( s.whereLinks )}` ]
}

// export interface TableData {
//
// }
// export function findAllTableData ( ...rdsps: RestDefnInPageProperties<any>[] ): TableData[] {
//   rdsps.flatMap ( rdp => {
//     if ( !rdp.rest.tables ) return []
//     return walkSqlRoots ( findSqlRoots ( rdp.rest.tables ), r => findSqlLinkDataFromRootAndDataD ( r, rdp.rest.dataDD ).fields )
//   } )
//
//   return []
//
//
// }