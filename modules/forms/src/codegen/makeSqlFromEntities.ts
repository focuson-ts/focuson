import { DBTable } from "../common/resolverD";
import { beforeAfterSeparator, beforeSeparator, ints, mapPathPlusInts, NameAnd, safeArray, toArray, safeString, unique } from "@focuson/utils";
import {
  AllLensRestParams,
  EntityAndWhere,
  InsertSqlStrategy, OneTableInsertSqlStrategyForIds,
  OneTableInsertSqlStrategyForNoIds,
  RestParams
} from "../common/restD";
import {
  CompDataD,
  emptyDataFlatMap,
  flatMapDD,
  HasSample,
  isRepeatingDd,
  OneDataDD,
  PrimitiveDD
} from "../common/dataD";
import { MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { addBrackets, addStringToEndOfAllButLast, indentList } from "./codegen";
import { JavaWiringParams } from "./config";
import { sqlListName, sqlMapName, sqlMapPackageName, sqlTafFieldName } from "./names";
import { selectSample } from "./makeSample";

export type DbValues = string | TableAndField

export interface TableAndField {
  table: DBTable;
  field: string;
  fieldAlias?: string;

}
export interface TableAliasAndField extends TableAndField {
  alias: string
}
export function isTableAndField ( d: DbValues ): d is TableAndField {
  // @ts-ignore
  return d?.table !== undefined
}

export function simplifyTableAndFields ( t: TableAndField ) {
  return `${t.table.name}.${t.field}`
}
function thePath ( path: string[] | undefined, incPath: boolean | undefined ) {
  return path && incPath ? `/${path}` : ''
}
export function simplifyTableAndFieldsData<G> ( t: TableAndFieldsData<G>, incPath?: boolean ) {
  return `${t.table.name} => ${t.fieldData.map ( fd => `${fd.dbFieldName}/${fd.fieldName}:${fd.reactType}${thePath ( fd.path, incPath )}` ).join ( ',' )}`
}
export function simplifyTableAndFieldData<G> ( t: TableAndFieldData<G>, incPath?: boolean ) {
  return `${t.table.name}.${t.fieldData.dbFieldName}/${t.fieldData.fieldName}${thePath ( t.fieldData.path, incPath )}`
}
export function simplifyTableAndFieldAndAliasData<G> ( t: TableAndFieldAndAliasData<G>, incPath?: boolean ) {
  return `${t.alias}:${simplifyTableAndFieldData ( t, incPath )}`
}
export function simplifyTableAndFieldDataArray<G> ( ts: TableAndFieldData<G>[], incPath?: boolean ) {
  return unique ( ts.map ( t => `${simplifyTableAndFieldData ( t, incPath )}` ), t => t )
}
export function simplifyTableAndFieldAndAliasDataArray<G> ( ts: TableAndFieldAndAliasData<G>[], incPath?: boolean ) {
  return unique ( ts.map ( t => simplifyTableAndFieldAndAliasData ( t, incPath ) ), t => t )
}
export interface CommonEntity {
  table: DBTable;
  staticWhere?: string;
  children?: NameAnd<ChildEntity>;
  type: 'Main' | 'Multiple' | 'Single';
}
export interface MainEntityWithoutStrategy extends CommonEntity {
  type: 'Main';
  alias?: string;
}

export interface MainEntityWithStrategy extends CommonEntity {
  type: 'Main';
  idField?: string;
  alias?: string;
  idStrategy: InsertSqlStrategy | InsertSqlStrategy[];
}

export function hasStrategy ( m: Entity | undefined ): m is MainEntityWithStrategy {
  const ma: any = m;
  return m && m.type === 'Main' && ma.idStrategy
}

export function getStrategy ( e: Entity | undefined ): InsertSqlStrategy[] {
  return hasStrategy ( e ) ? toArray ( e.idStrategy ) : []
}
export type MainEntity = MainEntityWithStrategy | MainEntityWithoutStrategy;


export interface MultipleEntity extends CommonEntity {  //parent id is in the child
  type: 'Multiple';
  idInParent: string;
  idInThis: string;
  filterPath?: string
}
export function isMultipleEntity ( e: Entity ): e is MultipleEntity {
  // @ts-ignore
  return e.type === 'Multiple'
}
export interface SingleEntity extends CommonEntity { //child id is in the parent
  type: 'Single'
  idInParent: string;
  idInThis: string;
  filterPath?: string
}

export type Entity = MainEntity | MultipleEntity | SingleEntity
export type ChildEntity = MultipleEntity | SingleEntity

export interface EntityFolder<Acc> {
  foldMain ( childAccs: Acc[], main: EntityAndWhere, e: Entity ): Acc;
  foldSingle ( childAccs: Acc[], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath: string | undefined, single: SingleEntity ): Acc;
  foldMultiple ( childAccs: Acc[], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath: string | undefined, multiple: MultipleEntity ): Acc;
}

export function foldEntitys<Acc> ( folder: EntityFolder<Acc>, main: EntityAndWhere, e: Entity, filterPath: string | undefined, zero: Acc ): Acc {
  let childAccs = foldChildEntitys ( folder, main, [], e.children, filterPath, zero );
  return folder.foldMain ( childAccs, main, e )
}
function foldChildEntitys<Acc> ( folder: EntityFolder<Acc>, main: EntityAndWhere, path: [ string, ChildEntity ][], children: NameAnd<ChildEntity> | undefined, filterPath: string | undefined, zero: Acc ): Acc[] {
  if ( !children ) return []
  return Object.entries ( children ).map ( ( [ name, child ] ) => foldChildEntity ( folder, main, path, name, child, filterPath, zero ) )
}
function foldChildEntity<Acc> ( folder: EntityFolder<Acc>, m: EntityAndWhere, path: [ string, ChildEntity ][], name: string, c: ChildEntity, filterPath: string | undefined, acc: Acc ) {
  const fullFilterPath = c.filterPath ? c.filterPath : filterPath
  let childAccs = foldChildEntitys ( folder, m, [ ...path, [ name, c ] ], c.children, fullFilterPath, acc );
  if ( c.type === 'Multiple' ) return folder.foldMultiple ( childAccs, m, path, name, fullFilterPath, c )
  if ( c.type === 'Single' ) return folder.foldSingle ( childAccs, m, path, name, fullFilterPath, c )
  throw  Error ( `Unknown type ${JSON.stringify ( c )}` )
}
// interface FlatMapper<T> {
//   main ( main: MainEntity ): T[];
//   single ( main: MainEntity, path: [ string, ChildEntity ][], name: string, single: SingleEntity ): T[];
//   multiple ( main: MainEntity, path: [ string, ChildEntity ][], name: string, multiple: MultipleEntity ): T[];
// }

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
  children: SqlRoot[];
  filterPath?: string
}

export function simplifySqlRoot ( s: SqlRoot ): string {
  return `main ${s.main.entity.table.name} path ${simplifyAliasAndChildEntityPath ( s.path )} root ${s.root.table.name} children [${s.children.map ( c => c.root.table.name ).join ( ',' )}] filterPath: ${s.filterPath}`
}
export function findSqlRoot ( m: EntityAndWhere | undefined ): SqlRoot {
  if ( m === undefined ) throw Error ( "EntityAndWhere must be defined" )
  return foldEntitys ( {
    foldMain ( childAccs: SqlRoot[][], main: EntityAndWhere, e: Entity ): SqlRoot[] {
      return [ { main, path: [], alias: main.entity.alias ? main.entity.alias : main.entity.table.name, root: e, children: childAccs.flat () } ];
    },
    foldMultiple ( childAccs: SqlRoot[][], main: EntityAndWhere, path: [ string, ChildEntity ][], alias: string, filterPath, multiple: MultipleEntity ): SqlRoot[] {
      return [ { main, path, alias, root: multiple, children: childAccs.flat (), filterPath } ];
    },
    foldSingle ( childAccs: SqlRoot[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath, single: SingleEntity ): SqlRoot[] {
      return childAccs.flat ();
    }
  }, m, m.entity, undefined, [] )[ 0 ]
}
export function walkSqlRoots<T> ( s: SqlRoot, fn: ( s: SqlRoot, path: number[] ) => T, path?: number[] ): T[] {
  let safePath = safeArray ( path );
  return [ fn ( s, safePath ), ...s.children.flatMap ( ( c, i ) => walkSqlRoots ( c, fn, [ ...safePath, i ] ) ) ]
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
function simplifyWhereLink ( wl: WhereLink ) {
  if ( isTableWhereLink ( wl ) ) return `Table: parent${wl.parentAlias}:${wl.parentTable.name}.${wl.idInParent} == child ${wl.childAlias}:${wl.childTable.name}.${wl.idInThis}`
  if ( isWhereFromQuery ( wl ) ) return `Table: query ${wl.paramName} == child ${wl.alias}:${wl.table.name}.${wl.field}`
  throw Error ( `Unknown where link ${wl}` )
}
export interface WhereFromQuery {
  paramName: string;
  table: DBTable;
  alias: string
  field: string;
  comparator?: '=' | '<>' | 'like' | '>' | '<'; // defaults to =. We can use this for 'like' or for <> or > or <
  paramPrefix?: '%'; //added to the start of the parameter. For use with like
  paramPostfix?: '%';//added to the end of the parameter. For use with like
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
  fields: TableAndFieldAndAliasData<any>[],
  staticWheres: string[],
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
  return [ `sqlRoot: ${s.sqlRoot.root.table.name}`, `fields: ${simplifyTableAndFieldAndAliasDataArray ( s.fields ).join ( "," )}`, `aliasAndTables ${simplifyAliasAndTables ( s.aliasAndTables )}`, `where ${simplifyWhereLinks ( s.whereLinks )}` ]
}

function getAliasForMainEntity ( m: MainEntity ) {
  return m.alias ? m.alias : m.table.name
}
export function getParentTableAndAlias<T> ( main: EntityAndWhere, path: [ string, ChildEntity ][], fn: ( c: Entity ) => T ): [ string, T ] {
  if ( path.length === 0 ) return [ getAliasForMainEntity ( main.entity ), fn ( main.entity ) ]
  const [ alias, c ] = path[ path.length - 1 ]
  return [ alias, fn ( c ) ]
}

export function findAliasAndTableLinksForLinkData ( m: SqlRoot ): [ string, DBTable ][] {
  const findAliasAndTablesLinksForLinkDataFolder: EntityFolder<[ string, DBTable ][]> = {
    foldMain ( childAccs: [ string, DBTable ][][], main: EntityAndWhere, e: Entity ): [ string, DBTable ][] {return [ ...childAccs.flat (), [ m.alias, e.table ] ]},
    foldSingle ( childAccs: [ string, DBTable ][][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath, single: SingleEntity ): [ string, DBTable ][] {
      return [ ...childAccs.flat (), [ name, single.table ] ]
    },
    foldMultiple ( childAccs: [ string, DBTable ][][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath, multiple: MultipleEntity ): [ string, DBTable ][] {
      return [] // we throw away the child accs
    }
  }
  let zero: [ string, DBTable ][] = m.path.map ( d => [ d[ 0 ], d[ 1 ].table ] );
  let result = foldEntitys ( findAliasAndTablesLinksForLinkDataFolder, m.main, m.root, m.filterPath, [] );
  return unique ( [ [ getAliasForMainEntity ( m.main.entity ), m.main.entity.table ], ...zero, ...result ], ( [ alias, table ] ) => `${alias}:${table.name}` )
}

export function findWhereLinksForSqlRoot ( sqlRoot: SqlRoot ): WhereLink[] {
  let whereLinks = foldEntitys ( {
    foldMain ( childAccs: WhereLink[][], main: EntityAndWhere ): WhereLink[] { return [ ...childAccs.flat (), ...main.where ]},
    foldMultiple ( childAccs: WhereLink[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, filterPath, multiple: MultipleEntity ): WhereLink[] { return [] },
    foldSingle ( childAccs: WhereLink[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, filterPath, single: SingleEntity ): WhereLink[] {
      const [ parentAlias, parentTable ] = getParentTableAndAlias ( main, path, e => e.table )
      let whereLink: WhereLink = { parentTable, parentAlias, idInParent: single.idInParent, childAlias, childTable: single.table, idInThis: single.idInThis };
      return [ ...childAccs.flat (), whereLink ]
    }
  }, sqlRoot.main, sqlRoot.root, sqlRoot.filterPath, [] );
  const result: WhereLink[] = [ ...whereLinks.flat (), ...findWhereLinksForSqlRootGoingUp ( sqlRoot ) ]
  return result
}

export function findWhereLinksForSqlRootGoingUp ( sqlRoot: SqlRoot ): WhereLink[] {
  if ( sqlRoot.root === sqlRoot.main.entity ) return []

  let sqlRootAndParentsPath: [ string, Entity ][] = [ [ sqlRoot.alias, sqlRoot.root ], ...sqlRoot.path ];
  const upToMain: [ string, Entity ][] = [ ...sqlRootAndParentsPath, [ getAliasForMainEntity ( sqlRoot.main.entity ), sqlRoot.main.entity ] ]
  // console.log ( 'findWhereLinksForSqlRootGoingUp', upToMain.map ( ( [ alias, entity ] ) => `${alias} => ${entity.table.name}` ) )
  return sqlRootAndParentsPath.map ( ( p, i ) => {
    if ( p[ 1 ].type === 'Main' )
      throw Error ();
    const fromUpToMain = upToMain[ i + 1 ]
    let result: WhereLink = {
      parentTable: fromUpToMain[ 1 ].table, parentAlias: fromUpToMain[ 0 ],
      childTable: p[ 1 ].table, childAlias: p[ 0 ], idInThis: p[ 1 ].idInThis, idInParent: p[ 1 ].idInParent
    };
    // console.log('result / wherelink is', simplifyWhereLink(result))
    return result;
  } )
}
export const whereFieldToFieldDataFromTableWhereLink = <G> ( errorPrefix: string, name: string ): FieldData<G> => {
  const [ dbFieldName, theType ] = beforeAfterSeparator ( ":", name )
  if ( theType === '' || theType === 'integer' ) return ({ dbFieldName, reactType: 'number', rsGetter: 'getInt', dbType: 'integer', sample: [] })
  if ( theType === 'string' ) return ({ dbFieldName, reactType: 'string', rsGetter: 'getString', dbType: 'varchar(255)', sample: [] })
  throw Error ( `${errorPrefix} Cannot find whereFieldToFieldData for type [${theType}] in [${name}]` )
};
export const whereFieldToFieldDataFromTableQueryLink = <G> ( errorPrefix: string, w: WhereFromQuery, restParams: RestParams ): FieldData<G> => {
  const paramDetails = restParams[ w.paramName ]
  const dbFieldName = w.field
  if ( paramDetails === undefined ) throw Error ( `${errorPrefix}. Cannot find param [${w.paramName}] in ${JSON.stringify ( w )}\nLegal values are ${Object.keys ( restParams )}` )
  if ( paramDetails.javaType === 'String' ) return ({ dbFieldName, reactType: 'string', rsGetter: 'getString', dbType: 'varchar(255)', sample: [] })
  if ( paramDetails.javaType === 'int' ) return ({ dbFieldName, reactType: 'number', rsGetter: 'getInt', dbType: 'integer', sample: [] })
  throw Error ( `${errorPrefix} Cannot find whereFieldToFieldData for param [${w.paramName}]  with java type [${paramDetails.javaType}] (paramDetails are ${JSON.stringify ( paramDetails )})` )
};

export function findFieldsFromWhere<G> ( errorPrefix: string, ws: WhereLink[], restParams: RestParams ): TableAndFieldAndAliasData<G>[] {
  return ws.flatMap ( w => {
    if ( isWhereFromQuery ( w ) ) {
      return [ { ...w, fieldData: whereFieldToFieldDataFromTableQueryLink ( errorPrefix, w, restParams ) } ]
    }
    if ( isTableWhereLink ( w ) ) return [ { table: w.parentTable, alias: w.parentAlias, fieldData: whereFieldToFieldDataFromTableWhereLink ( errorPrefix, w.idInParent ) },
      { table: w.childTable, alias: w.childAlias, fieldData: whereFieldToFieldDataFromTableWhereLink ( errorPrefix, w.idInThis ) } ]
    throw Error ( `Unknown type of where ${w}` )
  } )
}

interface FieldData<G> extends HasSample<any> {
  /** Can be undefined if only present in a where clause and needed for ids */
  fieldName?: string;
  path?: string[]
  dbFieldName: string;
  dbFieldAlias?: string;
  rsGetter: string;
  reactType: string;
  dbType: string;
  sample?: string[] | number[];
  datePattern?: string
}
interface TableAndFieldData<G> {
  table: DBTable;
  fieldData: FieldData<G>
}
export interface TableAndFieldAndAliasData<G> extends TableAndFieldData<G> {
  table: DBTable;
  fieldData: FieldData<G>
  alias: string;
}
interface TableAndFieldsData<G> {
  table: DBTable;
  fieldData: FieldData<G>[]
}


export function findTableAndFieldFromDataD<G> ( dataD: CompDataD<G> ): TableAndFieldData<G>[] {
  return flatMapDD<TableAndFieldData<G>, any> ( dataD, {
    ...emptyDataFlatMap<TableAndFieldData<G>, any> (),
    walkPrim: ( path, parents, oneDataDD, dataDD: PrimitiveDD ) => {
      const fieldName = path[ path.length - 1 ];
      function selectSample ( oneDataDD: OneDataDD<G> ): string[] | undefined {
        if ( oneDataDD.sample ) return oneDataDD.sample
        return oneDataDD.dataDD.sample
      }

      if ( oneDataDD?.db )
        if ( isTableAndField ( oneDataDD.db ) ) {
          let fieldData: FieldData<any> = {
            dbFieldName: oneDataDD.db.field, dbFieldAlias: oneDataDD.db.fieldAlias,
            rsGetter: dataDD.rsGetter, reactType: dataDD.reactType, dbType: dataDD.dbType, fieldName, path,
            sample: selectSample ( oneDataDD ), datePattern: oneDataDD.dataDD.datePattern
          };
          return [ { table: oneDataDD.db.table, fieldData } ]
        } else {
          const parent = parents[ parents.length - 1 ]
          if ( !parent.table ) throw new Error ( `Have a field name [${oneDataDD.db} in ${path}], but there is no table in the parent ${parent.name}` )
          let fieldData: FieldData<any> = {
            dbFieldName: oneDataDD.db, rsGetter: dataDD.rsGetter,
            reactType: dataDD.reactType, dbType: dataDD.dbType, fieldName, path, sample: selectSample ( oneDataDD ),
            datePattern: oneDataDD.dataDD.datePattern
          };
          return [ { table: parent.table, fieldData: fieldData } ]
        }
      return []
    }
  } );
}


export function findTableAliasAndFieldFromDataD<G> ( sqlRoot: SqlRoot, fromDataD: TableAndFieldData<G>[] ) {
  const add = ( acc: TableAndFieldAndAliasData<G>[], e: Entity, alias: string, filterPath: string | undefined ): TableAndFieldAndAliasData<G>[] => {
    function fp ( tf: TableAndFieldData<G> ) {
      if ( filterPath && tf.fieldData.path )
        return tf.fieldData.path.join ( "/" ).startsWith ( filterPath )
      return true
    }
    let found = fromDataD.filter ( tf => tf.table.name === e.table.name );
    let rawResult: TableAndFieldAndAliasData<G>[] = [ ...acc, ...found.map ( tf => ({ ...tf, alias }) ) ];
    const result = rawResult.filter ( fp )
    return result;
  };
  const folder: EntityFolder<TableAndFieldAndAliasData<G>[]> = {
    foldMain ( childAccs: TableAndFieldAndAliasData<G>[][], main: EntityAndWhere, e: Entity ): TableAndFieldAndAliasData<G>[] {
      return add ( childAccs.flat (), e, sqlRoot.alias, sqlRoot.filterPath )
    },
    foldSingle ( childAccs: TableAndFieldAndAliasData<G>[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath, single: SingleEntity ): TableAndFieldAndAliasData<G>[] {
      return add ( childAccs.flat (), single, name, filterPath )
    },
    foldMultiple ( childAccs: TableAndFieldAndAliasData<G>[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath, multiple: MultipleEntity ): TableAndFieldAndAliasData<G>[] {
      return []//we stop at multiples
    }
  }
  return foldEntitys<TableAndFieldAndAliasData<G>[]> ( folder, sqlRoot.main, sqlRoot.root, sqlRoot.filterPath, [] )
}

export function findAllFields<G> ( sqlRoot: SqlRoot, dataD: CompDataD<any>, wheres: WhereLink[], restParams: RestParams ): TableAndFieldAndAliasData<G>[] {
  const errorPrefix = `Error dataD is ${dataD.name}`
  const tfFromData: TableAndFieldData<any>[] = findTableAndFieldFromDataD ( dataD )
  const tfAliasFromData: TableAndFieldAndAliasData<G>[] = findTableAliasAndFieldFromDataD ( sqlRoot, tfFromData )
  const fromWhere: TableAndFieldAndAliasData<G>[] = findFieldsFromWhere ( errorPrefix, wheres, restParams )
  return unique ( [ ...fromWhere, ...tfAliasFromData ], t => simplifyTableAndFieldAndAliasData ( t, true ) )
}

export function findStaticWheres ( sqlRoot: SqlRoot ): string[] { // things to ignore: path, childAlias
  let staticWhereLinks = foldEntitys ( {
    foldMain ( childAccs: string[][], main: EntityAndWhere ): string[] {
      if ( main.staticWhere === undefined ) return childAccs.flat ()
      return [ ...childAccs.flat (), main.staticWhere ]
    },
    foldMultiple ( childAccs: string[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, filterPath, multiple: MultipleEntity ): string[] { return [] },
    foldSingle ( childAccs: string[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, filterPath, single: SingleEntity ): string[] {
      if ( single.staticWhere === undefined ) return childAccs.flat ()
      return [ ...childAccs.flat (), single.staticWhere ]
    }
  }, sqlRoot.main, sqlRoot.root, sqlRoot.filterPath, [] );
  return [ ...staticWhereLinks.flat (), ...findStaticWheresForSqlRootGoingUp ( sqlRoot ) ]
}

export function findStaticWheresForSqlRootGoingUp ( sqlRoot: SqlRoot ): string[] {
  if ( sqlRoot.root === sqlRoot.main.entity )
    return sqlRoot.root.staticWhere != undefined ? [ sqlRoot.root.staticWhere ] : []

  let sqlRootAndParentsPath: [ string, Entity ][] = [ [ sqlRoot.alias, sqlRoot.root ], ...sqlRoot.path ];
  return sqlRootAndParentsPath.map ( ( p, _ ) => {
    if ( p[ 1 ].staticWhere === undefined ) return "";
    return p[ 1 ].staticWhere
  } )
}

export function findSqlLinkDataFromRootAndDataD ( sqlRoot: SqlRoot, dataD: CompDataD<any>, restParams: RestParams ): SqlLinkData {
  const aliasAndTables = findAliasAndTableLinksForLinkData ( sqlRoot )
  const whereLinks: WhereLink[] = findWhereLinksForSqlRoot ( sqlRoot )
  const fields: TableAndFieldAndAliasData<any>[] = findAllFields ( sqlRoot, dataD, whereLinks, restParams )
  const staticWheres = findStaticWheres ( sqlRoot )
  return { whereLinks, aliasAndTables, sqlRoot, fields, staticWheres }
}


export function makeWhereClauseStringsFrom ( ws: WhereLink[] ) {
  return ws.map ( ( w ) => {
    if ( isTableWhereLink ( w ) ) {
      const { parentAlias, idInParent, childAlias, idInThis } = w
      return `${parentAlias}.${beforeSeparator ( ":", idInParent )} = ${childAlias}.${beforeSeparator ( ":", idInThis )}`;
    }
    if ( isWhereFromQuery ( w ) ) {
      const comparator = w.comparator ? w.comparator : '='
      return ` ${w.alias}.${w.field} ${comparator} ?`
    }
    throw new Error ( `Unknown where link ${JSON.stringify ( w )}` )
  } )
}

export function makeWhereClause ( s: SqlLinkData ) {
  let whereList = [ ...makeWhereClauseStringsFrom ( s.whereLinks ), ...s.staticWheres.filter ( s => s !== '' ) ];
  return whereList.length === 0 ? '' : 'where ' + whereList.join ( ' and ' );
}
export function generateGetSql ( s: SqlLinkData ): string[] {
  function tableName ( t: DBTable ) { return t.prefix ? `${t.prefix}.${t.name}` : t.name}
  return [ `select`,
    ...indentList ( addStringToEndOfAllButLast ( ',' ) ( s.fields.map ( taf => `${taf.alias}.${taf.fieldData.dbFieldName} as ${sqlTafFieldName ( taf )}` ) ) ),
    ` from`,
    ...indentList ( addStringToEndOfAllButLast ( ',' ) ( s.aliasAndTables.map ( ( [ alias, table ] ) => `${tableName ( table )} ${alias}` ) ) ),
    ` ${(makeWhereClause ( s ))}` ]
}

export const findAllTableAndFieldsIn = <G> ( rdps: RestDefnInPageProperties<G>[] ) => unique ( rdps.flatMap ( rdp => {
  if ( !rdp.rest.tables ) return []
  return walkSqlRoots ( findSqlRoot ( rdp.rest.tables ), sqlRoot => findSqlLinkDataFromRootAndDataD ( sqlRoot, rdp.rest.dataDD, rdp.rest.params ) ).flatMap (
    linkData => linkData.fields.map ( taf =>
      ({ table: taf.table, fieldData: taf.fieldData }) )
  )
} ), simplifyTableAndFieldData );

export const findAllTableAndFieldDatasIn = <G> ( rdps: RestDefnInPageProperties<G>[] ): TableAndFieldsData<G>[] => {
  var empty: NameAnd<TableAndFieldsData<G>> = {}
  findAllTableAndFieldsIn ( rdps ).forEach ( tdp => {
    if ( empty[ tdp.table.name ] === undefined ) empty[ tdp.table.name ] = ({ table: tdp.table, fieldData: [] });
    empty[ tdp.table.name ].fieldData.push ( tdp.fieldData )
  } )
  return Object.values ( empty )
}

export function createTableSql<G> ( rdps: RestDefnInPageProperties<G>[] ): NameAnd<string[]> {
  const createSql = ( taf: TableAndFieldsData<G> ): string[] => {
    let columns = unique ( taf.fieldData.map ( fd => `${fd.dbFieldName} ${fd.dbType}` ), s => s.toLowerCase () );
    return [
      `create table ${taf.table.name}` + '(',
      ...indentList ( addStringToEndOfAllButLast ( "," ) ( columns ) ),
      ')'
    ];
  };
  return Object.fromEntries ( findAllTableAndFieldDatasIn ( rdps ).map ( taf => [ taf.table.name, createSql ( taf ) ] ) )
}

export function makeMapsForRest<B, G> ( params: JavaWiringParams, p: MainPageD<B, G>, restName: string, rdp: RestDefnInPageProperties<G>, ld: SqlLinkData, path: number[], childCount: number ): string[] {
  const restD = rdp.rest;
  function mapName ( path: string[] ) {return path.length === 0 ? '_root' : safeArray ( path ).join ( "_" )}

  const maps = flatMapDD<string, G> ( restD.dataDD, {
    ...emptyDataFlatMap (),
    walkDataStart: ( path1, parents, oneDataDD, dataDD ) =>
      [ `public final Map<String,Object> ${mapName ( path1 )} = new HashMap<>();` ]
  } )
  let onlyIds = ld.fields.filter ( taf => !taf.fieldData.fieldName );
  const ids = onlyIds.map ( taf => `public final Object ${sqlTafFieldName ( taf )};` )
  const className = sqlMapName ( p, restName, path );

  const constParams = [ `ResultSet rs`, ...ints ( childCount ).map ( i => `List<${sqlListName ( p, restName, path, i )}> list${i}` ) ].join ( ',' )
  const sql = generateGetSql ( ld )

  function createPutterString<T> ( fieldData: FieldData<T>, fieldAlias: string ) {
    return (fieldData.datePattern === undefined) ?
      `this.${mapName ( safeArray ( fieldData.path ).slice ( 0, -1 ) )}.put("${fieldData.fieldName}", rs.${fieldData.rsGetter}("${fieldAlias}"));`
      : `this.${mapName ( safeArray ( fieldData.path ).slice ( 0, -1 ) )}.put("${fieldData.fieldName}", new SimpleDateFormat("${fieldData.datePattern}").format(rs.${fieldData.rsGetter}("${fieldAlias}")));`;
  }

  const putters = ld.fields
    .filter ( taf => taf.fieldData.fieldName )
    .sort ( ( l, r ) => l.table.name.localeCompare ( r.table.name ) )
    .sort ( ( l, r ) => l.fieldData.dbFieldName.localeCompare ( r.fieldData.dbFieldName ) )
    .flatMap ( taf => {
      let fieldAlias = sqlTafFieldName ( taf );
      let result = createPutterString ( taf.fieldData, fieldAlias )
      return fieldAlias.length > 30 ? [ `//This is a very long  field alias. If it gives you problems consider giving it an explicit field alias in the dataDD`, result ] : result;
    } )
  const setIds = onlyIds.map ( taf => `this.${sqlTafFieldName ( taf )} = rs.${taf.fieldData.rsGetter}("${sqlTafFieldName ( taf )}");` )
  const allPaths = unique ( flatMapDD<string[], G> ( restD.dataDD, {
    ...emptyDataFlatMap (),
    walkDataStart: ( path1, parents, oneDataDD, dataDD ) =>
      [ path1 ]
  } ), r => r.toString () )

  const links = allPaths.filter ( p => p.length > 0 )
    .filter ( p => p.join ( "/" ).startsWith ( safeString ( ld.sqlRoot.filterPath ) ) )
    .map ( path => `${mapName ( path.slice ( 0, -1 ) )}.put("${path[ path.length - 1 ]}", ${mapName ( path )});` )

  const linksMultipleEntities = ( sqlRoot: SqlRoot ) => allPaths.filter ( p => p.length > 1 )
    .filter ( ( p: string[] ) => p.join ( "/" ).startsWith ( safeString ( sqlRoot.filterPath ) ) )
    .map ( path => [ path[ path.length - 1 ], mapName ( path ) ] );

  const linksToOtherMaps: string[] = ld.sqlRoot.children.flatMap ( ( childRoot, i ) => {
    let childEntity = childRoot.root
    if ( !isMultipleEntity ( childEntity ) ) throw Error ( `Page: ${p.name} rest ${restName} The parent of sql root must be a multiple entity.\n ${JSON.stringify ( childRoot )}` )
    if ( childRoot.children.length > 0 )
      throw Error ( `Page: ${p.name} rest ${restName} has nested 'multiples. Currently this is not supported` )
    return linksMultipleEntities ( childRoot ).map ( l => `this.${childRoot.filterPath}.put("${l[ 0 ]}", list${i}.stream().map(m ->m.${l[ 1 ]}).collect(Collectors.toList()));` )
  } );

  return [
    `package ${sqlMapPackageName ( params, p )};`,
    '',
    `import java.sql.ResultSet;`,
    `import java.sql.Connection;`,
    `import java.sql.PreparedStatement;`,
    `import java.sql.SQLException;`,
    `import java.util.HashMap;`,
    `import java.util.List;`,
    `import java.util.LinkedList;`,
    `import java.util.Optional;`,
    `import java.util.Map;`,
    `import java.util.stream.Collectors;`,
    `import java.text.SimpleDateFormat;`,
    '',
    `//${JSON.stringify ( restD.params )}`,
    `public class ${className} {`,
    ...indentList ( [
      `@SuppressWarnings("SqlResolve")`,
      ...addBrackets ( 'public static String sql = ', ';' ) ( addStringToEndOfAllButLast ( '+' ) ( sql.map ( s => '"' + s.replace ( /""/g, '\"' ) + '"' ) ) ),
      '',
      ...makeAllGetsAndAllSqlForRest ( params, p, restName, rdp ),
      '',
      ...ids,
      '',
      ...maps,
      '',
      `public ${className}(${constParams}) throws SQLException{`,
      ...indentList ( [ ...putters, '', ...setIds, '', ...links, '', ...linksToOtherMaps ] ),
      '}'
    ] ),
    `}`
  ]

}

export interface JavaQueryParamDetails {
  name: string;
  param: AllLensRestParams<any>
  paramPrefix?: string;
  paramPostfix?: string;
}

function getParameters<B, G> ( childCount: number, p: PageD<B, G>, restName: string, path: number[], queryParams: JavaQueryParamDetails[] ) {
  return [ 'Connection connection', ...queryParams.map ( ( { name, param, paramPostfix, paramPrefix } ) =>
    `${param.javaType} ${name}` ), ...mapPathPlusInts ( path, childCount ) ( pathAndI => `List<${sqlMapName ( p, restName, pathAndI )}> list${pathAndI}` ) ].join ( ", " );
}
function newMap ( mapName: string, childCount: number, path: number[] ) {
  return `new ${mapName}(${[ 'rs', ...ints ( childCount ).map ( i => `list${i}` ) ].join ( "," )})`
}

function makeGetRestForRoot<B, G> ( p: PageD<B, G>, restName: string, rdp: RestDefnInPageProperties<G>, childCount: number, queryParams: JavaQueryParamDetails[] ) {
  return makeGetRestForMainOrChild ( p, restName, [], childCount, queryParams, isRepeatingDd ( rdp.rest.dataDD ) )
}

function makeGetRestForChild<B, G> ( p: PageD<B, G>, restName: string, path: number[], childCount: number, queryParams: JavaQueryParamDetails[] ) {
  return makeGetRestForMainOrChild ( p, restName, path, childCount, queryParams, true )

}

function makeGetRestForMainOrChild<B, G> ( p: PageD<B, G>, restName: string, path: number[], childCount: number, queryParams: JavaQueryParamDetails[], repeating: Boolean ) {
  const mapName = `${sqlMapName ( p, restName, path )}`;
  const retreiveData: string[] = repeating ?
    [ `      List<${mapName}> result = new LinkedList<>();`,
      `      while (rs.next())`,
      `        result.add(${newMap ( mapName, childCount, [] )});`,
      `      return result;`,
    ] :
    [ `      return rs.next() ? Optional.of(${newMap ( mapName, childCount, [] )}) : Optional.empty();` ]

  function addPrefixPostFix ( { name, paramPrefix, paramPostfix }: JavaQueryParamDetails ): string {
    return (paramPrefix ? '"' + paramPrefix + '"+' : '') + name + (paramPostfix ? '+"' + paramPostfix + '"' : '')
  }
  return [
    `public static ${repeating ? 'List' : 'Optional'}<${mapName}> get${path.join ( '_' )}(${getParameters ( childCount, p, restName, [], queryParams )}) throws SQLException {`,
    `    PreparedStatement statement = connection.prepareStatement(${mapName}.sql);`,
    ...indentList ( indentList ( queryParams.map ( ( paramDetails, i ) => `statement.${paramDetails.param.rsSetter}(${i + 1},${addPrefixPostFix ( paramDetails )});` ) ) ),
    `    ResultSet rs = statement.executeQuery();`,
    `    try {`,
    ...retreiveData,
    `    } finally {`,
    `      rs.close();`,
    `      statement.close();`,
    `    }`,
    `}`
  ]
}

export function makeGetForRestFromLinkData<B, G> ( params: JavaWiringParams, p: PageD<B, G>, restName: string, rdp: RestDefnInPageProperties<G>, queryParams: JavaQueryParamDetails[], path: number[], childCount: number ) {
  return path.length === 0 ? makeGetRestForRoot ( p, restName, rdp, childCount, queryParams ) : makeGetRestForChild ( p, restName, path, childCount, queryParams );
}
interface QueryAndGetters {
  query: JavaQueryParamDetails[],
  getter: string[];
  sql: string[]
}
function isListOrOptional<G> ( rdp: RestDefnInPageProperties<G> ) {
  return isRepeatingDd ( rdp.rest.dataDD ) ? 'List' : 'Optional';
}
export function makeAllGetsAndAllSqlForRest<B, G> ( params: JavaWiringParams, p: PageD<B, G>, restName: string, rdp: RestDefnInPageProperties<G> ): string[] {
  const restD = rdp.rest
  if ( restD.tables === undefined ) throw Error ( `somehow have a sql root without a tables in ${p.name} ${restName}` )
  let sqlRoot = findSqlRoot ( restD.tables );
  const getters: QueryAndGetters[] = walkSqlRoots ( sqlRoot, ( r, path ) => {
    const ld = findSqlLinkDataFromRootAndDataD ( r, restD.dataDD, rdp.rest.params )
    if ( restD.tables === undefined ) throw Error ( `somehow have a sql root without a tables in ${p.name} ${restName}` )
    const query = findParamsForTable ( `Page ${p.name} rest ${restName}`, restD.params, restD.tables )
    return { query, getter: makeGetForRestFromLinkData ( params, p, restName, rdp, query, path, r.children.length ), sql: [ ...generateGetSql ( ld ), '' ] }
  } )
  const paramsForMainGet = getters.slice ( 1 ).map ( g => g.query )
  function callingParams ( qs: JavaQueryParamDetails[] ) {return qs.map ( q => q.name )}
  const allParams = unique ( getters.flatMap ( g => g.query ), ( { name, param } ) => name + param.javaType )
  const mapString = isRepeatingDd ( rdp.rest.dataDD ) ? '.stream().map(x -> x._root).collect(Collectors.toList())' : '.map(x -> x._root)'
  const mainGet: string[] = [
    `public static ${isListOrOptional ( rdp )}<Map<String,Object>> getAll(${[ 'Connection connection', ...allParams.map ( ( { name, param } ) =>
      `${param.javaType} ${name}` ) ].join ( "," )}) throws SQLException {`,
    `//from ${p.name}.rest[${restName}].dataDD which is of type ${rdp.rest.dataDD.name}`,
    `   return get(${[ 'connection', ...callingParams ( getters[ 0 ].query ), ...ints ( sqlRoot.children.length )
      .map ( i => `get${i}(${[ 'connection', ...callingParams ( paramsForMainGet[ i ] ) ].join ( ',' )})` ) ].join ( "," )})${mapString};`, // Note not yet recursing here
    `}` ]
  const allSql = addBrackets ( `public static String allSql=`, ';' ) ( addStringToEndOfAllButLast ( "+" ) ( getters.flatMap ( g => g.sql.map ( s => '"' + s + '\\n"' ) ) ) )
  return [ ...mainGet, ...allSql, ...getters.flatMap ( g => g.getter ) ]
}

export function findParamsForTable ( errorPrefix: string, params: RestParams, table: EntityAndWhere ): JavaQueryParamDetails[] {
  return table.where.flatMap ( wl => {
    const { paramPrefix, paramPostfix } = wl
    if ( isWhereFromQuery ( wl ) ) {
      let param = params[ wl.paramName ];
      if ( param == undefined ) throw Error ( `${errorPrefix} param ${wl.paramName} is defined in where ${JSON.stringify ( wl )}\nBut not available in the params[${Object.keys ( params )}]` )
      let result = { name: wl.paramName, param, paramPrefix, paramPostfix };
      return [ result ]
    }
    return []
  } )
}

function sqlIfy ( a: any ): string {
  return JSON.stringify ( a ).replace ( /"/g, "'" )
}
export function makeInsertSqlForNoIds ( dataD: CompDataD<any>, entity: MainEntity | undefined, strategy: OneTableInsertSqlStrategyForNoIds ) {
  if ( entity === undefined ) return [];
  const tafdsForThisTable: TableAndFieldData<any>[] = findTableAndFieldFromDataD ( dataD ).filter ( tafd => tafd.table.name === entity.table.name );
  const sampleCount = isRepeatingDd ( dataD ) && dataD.sampleCount ? dataD.sampleCount : 3
  const is = [ ...Array ( sampleCount ).keys () ]
  return is.map ( i => `INSERT INTO ${entity.table.name}(${tafdsForThisTable
                  .map ( ( fd: TableAndFieldData<any> ) => fd.fieldData.dbFieldName )})` +
    `values (${tafdsForThisTable.map ( fd => sqlIfy ( selectSample ( i, fd.fieldData ) ) ).join ( "," )});` );
}

export function makeInsertSqlForIds ( dataD: CompDataD<any>, entity: MainEntity | undefined, strategy: OneTableInsertSqlStrategyForIds ) {
  if ( entity === undefined ) return [];
  const tafdsForThisTable: TableAndFieldData<any>[] = findTableAndFieldFromDataD ( dataD )
    .filter ( tafd => tafd.table.name === entity.table.name );

  tafdsForThisTable.unshift ( {
    table: entity.table, fieldData:
      {
        fieldName: strategy.idField, dbFieldName: strategy.idField, rsGetter: "", reactType: "", dbType: "",
        sample: Array ( 5 ).fill ( 0 ).map ( ( _, idx ) => idx + strategy.idOffset )
      }
  } );

  const sampleCount = isRepeatingDd ( dataD ) && dataD.sampleCount ? dataD.sampleCount : 3
  const is = [ ...Array ( sampleCount ).keys () ]
  return is.map ( i => `INSERT INTO ${entity.table.name}(${tafdsForThisTable
                  .map ( fd => fd.fieldData.dbFieldName )})` +
    `values (${tafdsForThisTable.map ( ( fd: TableAndFieldData<any> ) => sqlIfy ( selectSample ( i, fd.fieldData ) ) ).join ( "," )});` );
}