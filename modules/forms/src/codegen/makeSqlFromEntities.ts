import { DBTable } from "../common/resolverD";
import { beforeAfterSeparator, beforeSeparator, ints, lastButOneItem, lastItem, mapPathPlusInts, NameAnd, safeArray, safeString } from "@focuson/utils";
import { AllLensRestParams, EntityAndWhere, RestD, RestParams, unique } from "../common/restD";
import { CompDataD, emptyDataFlatMap, flatMapDD, HasSample, OneDataDD, PrimitiveDD } from "../common/dataD";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { addBrackets, addStringToEndOfAllButLast, indentList } from "./codegen";
import { JavaWiringParams } from "./config";
import { sqlListName, sqlMapName, sqlTafFieldName } from "./names";
import { selectSample } from "./makeSample";
import * as path from "path";

export type DbValues = string | TableAndField

export interface TableAndField {
  table: DBTable;
  field: string;
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
export function simplifyTableAndFieldsData<G> ( t: TableAndFieldsData<G>, incPathAndSamples?: boolean ) {
  return `${t.table.name} => ${t.fieldData.map ( fd => `${fd.dbFieldName}/${fd.fieldName}:${fd.reactType}${thePath ( fd.path, incPathAndSamples )}` ).join ( ',' )}`
}
export function simplifyTableAndFieldData<G> ( t: TableAndFieldData<G>, incPathAndSamples?: boolean ) {
  return `${t.table.name}.${t.fieldData.dbFieldName}/${t.fieldData.fieldName}${thePath ( t.fieldData.path, incPathAndSamples )}${incPathAndSamples ? `[${safeArray ( t.fieldData.sample )}]` : ''}`
}
export function simplifyTableAndFieldAndAliasData<G> ( t: TableAndFieldAndAliasData<G>, incPathAndSamples?: boolean ) {
  return `${t.alias}:${simplifyTableAndFieldData ( t, incPathAndSamples )}`
}
export function simplifyTableAndFieldDataArray<G> ( ts: TableAndFieldData<G>[], incPathAndSamples?: boolean ) {
  return unique ( ts.map ( t => `${simplifyTableAndFieldData ( t, incPathAndSamples )}` ), t => t )
}
export function simplifyTableAndFieldAndAliasDataArray<G> ( ts: TableAndFieldAndAliasData<G>[], incPathAndSamples?: boolean ) {
  return unique ( ts.map ( t => simplifyTableAndFieldAndAliasData ( t, incPathAndSamples ) ), t => t )
}
export interface CommonEntity {
  table: DBTable;
  where?: string;
  children?: NameAnd<ChildEntity>;
  type: 'Main' | 'Multiple' | 'Single';
  samples: SamplesForEntity;
}

export interface SamplesForEntity {
  idOffset: number;  //no default you have to specify it
  sampleOffset?: number; //default 0
}
export interface SamplesForEntityWithCount extends SamplesForEntity {
  count?: number; //default 1
}
export interface MainEntity extends CommonEntity {
  type: 'Main';
  samples: SamplesForEntityWithCount
}
export interface MultipleEntity extends CommonEntity {  //parent id is in the child
  type: 'Multiple';
  idInParent: string;
  idInThis: string;
  linkInData: { mapName: string, field: string, link: string };
  filterPath?: string;
  samples: SamplesForEntityWithCount
}
export function isMultipleEntity ( e: Entity ): e is MultipleEntity {
  // @ts-ignore
  return e.linkInData != undefined
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
  children: SqlRoot[];
  filterPath?: string
}

export function sqlRootToLinkToParent ( s: SqlRoot ): TableWhereLink | undefined {
  const root = s.root
  if ( isMultipleEntity ( root ) ) {
    const [ parentAlias, parentEntity ] = lastItem ( s.path )
    const whereLink: TableWhereLink = { linking: true, parentTable: parentEntity.table, idInParent: root.idInParent, parentAlias, childTable: root.table, childAlias: s.alias, idInThis: root.idInThis }
    return whereLink
  }
  return undefined
}

export function simplifySqlRoot ( s: SqlRoot ): string {
  return `main ${s.main.entity.table.name} path ${simplifyAliasAndChildEntityPath ( s.path )} root ${s.root.table.name} children [${s.children.map ( c => c.root.table.name ).join ( ',' )}] filterPath: ${s.filterPath}`
}
export function findSqlRoot ( m: EntityAndWhere ): SqlRoot {
  return foldEntitys ( {
    foldMain ( childAccs: SqlRoot[][], main: EntityAndWhere, e: Entity ): SqlRoot[] {
      return [ { main, path: [], alias: main.entity.table.name, root: e, children: childAccs.flat () } ];
    },
    foldMultiple ( childAccs: SqlRoot[][], main: EntityAndWhere, path: [ string, ChildEntity ][], alias: string, filterPath, multiple: MultipleEntity ): SqlRoot[] {
      return [ { main, path, alias, root: multiple, children: childAccs.flat (), filterPath } ];
    },
    foldSingle ( childAccs: SqlRoot[][], main: EntityAndWhere, path: [ string, ChildEntity ][], name: string, filterPath, single: SingleEntity ): SqlRoot[] {
      return childAccs.flat ();
    }
  }, m, m.entity, undefined, [] )[ 0 ]
}
export function walkSqlRoots<T> ( s: SqlRoot, fn: ( parent: SqlRoot | undefined, s: SqlRoot, path: number[] ) => T, path?: number[] ): T[] {
  return walkSqlRootsWithparent ( undefined, s, fn )
}
function walkSqlRootsWithparent<T> ( parent: SqlRoot | undefined, s: SqlRoot, fn: ( parent: SqlRoot | undefined, s: SqlRoot, path: number[] ) => T, path?: number[] ): T[] {
  let safePath = safeArray ( path );
  return [ fn ( parent, s, safePath ), ...s.children.flatMap ( ( c, i ) => walkSqlRootsWithparent ( s, c, fn, [ ...safePath, i ] ) ) ]
}

export function walkSqlLinkData<T> ( ld: SqlLinkData, fn: ( parent: SqlLinkData [], ld: SqlLinkData, path?: number[] ) => T ): T[] {
  return walkSqlLinkDataWithParents ( [], ld, fn, [] )
}
export function walkSqlLinkDataWithParents<T> ( parents: SqlLinkData[], ld: SqlLinkData, fn: ( parent: SqlLinkData [], ld: SqlLinkData, path?: number[] ) => T, path: number[] ): T[] {
  let safePath = safeArray ( path );
  return [ fn ( parents, ld, safePath ), ...ld.children.flatMap ( ( c, i ) => walkSqlLinkDataWithParents ( [ ...parents, ld ], c, fn, [ ...safePath, i ] ) ) ]
}

type SqlLinkDataFolder<Acc> = ( ld: SqlLinkData, childResults: Acc[] ) => Acc

export const foldSqlLinkData = <Acc> ( folder: SqlLinkDataFolder<Acc> ) => ( ld: SqlLinkData ): Acc => {
  return folder ( ld, ld.children.map ( foldSqlLinkData ( folder ) ) );
}

export interface TableWhereLink {
  parentTable: DBTable;
  parentAlias: string;
  idInParent: string;

  childTable: DBTable;
  childAlias: string
  idInThis: string;
  linking: boolean;
}
export type WhereLink = TableWhereLink | WhereFromQuery
function simplifyWhereLink ( wl: WhereLink | undefined ) {
  if ( wl === undefined ) return 'undefined'
  if ( isTableWhereLink ( wl ) ) return `Table: parent-${wl.parentAlias}:${wl.parentTable.name}.${wl.idInParent} == child-${wl.childAlias}:${wl.childTable.name}.${wl.idInThis}`
  if ( isWhereFromQuery ( wl ) ) return `Table: query-${wl.paramName} == child ${wl.alias}:${wl.table.name}.${wl.field}`
  throw Error ( `Unknown where link ${wl}` )
}
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

export interface SingleLinkData {
  w: WhereLink;
  tafs: TableAndFieldAndAliasData<any>[]; //There will be one or two fields in the Where link. When we are inserting we need to put the id in both. If two they should obviously both be the same type or crazyness happens
  name: string
}
function findNameForTableWhereLink ( w: TableWhereLink | undefined ) {
  if ( w === undefined ) return undefined
  return `${w.parentAlias}__${beforeSeparator ( ":", w.idInParent )}__${w.childAlias}__${beforeSeparator ( ":", w.idInThis )}`;
}

export const singleLinkData = ( errorPrefix: string, tfads: TableAndFieldAndAliasData<any>[] ) => ( w: WhereLink ): SingleLinkData => {
  function find ( alias: string, fieldName: string ): TableAndFieldAndAliasData<any> {
    const cleanName = beforeSeparator ( ":", fieldName )
    const result = tfads.findIndex ( t => t.alias === alias && t.fieldData.dbFieldName === cleanName )
    if ( result < 0 )
      throw Error ( `${errorPrefix}. Software error: looking for [${alias}.${cleanName}] in [${tfads.map ( t => `${t.alias}.${t.fieldData.dbFieldName}` )}]. Whereclause is ${JSON.stringify ( w )}` )
    return tfads[ result ]
  }
  if ( isWhereFromQuery ( w ) ) return { w, name: `param__${w.paramName}`, tafs: [ find ( w.alias, w.field ) ] }
  return {
    w,
    name: findNameForTableWhereLink ( w ),
    tafs: [ find ( w.parentAlias, w.idInParent ), find ( w.childAlias, w.idInThis ) ]
  }
};
export interface SqlLinkData {
  sqlRoot: SqlRoot;
  aliasAndTables: [ string, DBTable ][];
  fields: TableAndFieldAndAliasData<any>[],
  linkToParent: TableWhereLink | undefined
  whereLinks: WhereLink[] // refactoring to loose this and move into next structure + parent
  linksInThis: SingleLinkData[];
  children: SqlLinkData[]
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
export function simplifySqlLinkData ( s: SqlLinkData, incPathAndSample?: boolean ): string[] {
  return [ `sqlRoot: ${s.sqlRoot.root.table.name}`,
    `fields: ${simplifyTableAndFieldAndAliasDataArray ( s.fields, incPathAndSample ).join ( "," )}`,
    `aliasAndTables ${simplifyAliasAndTables ( s.aliasAndTables )}`,
    `where ${simplifyWhereLinks ( s.whereLinks )}`,
    `linksInThis: ${s.linksInThis.map ( l => l.name ).join ( "," )}`,
    `linkToParent:${simplifyWhereLink ( s.linkToParent )}`,
    `children: ${s.children.length}` ]
}

export function getParentTableAndAlias<T> ( main: EntityAndWhere, path: [ string, ChildEntity ][], fn: ( c: Entity ) => T ): [ string, T ] {
  if ( path.length === 0 ) return [ main.entity.table.name, fn ( main.entity ) ]
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
  return unique ( [ [ m.main.entity.table.name, m.main.entity.table ], ...zero, ...result ], ( [ alias, table ] ) => `${alias}:${table.name}` )
}

function findWhereLinksForSqlRootGoingDown ( sqlRoot: SqlRoot ) {
  function makeWhere ( main: EntityAndWhere, path: [ string, ChildEntity ][], entity: MultipleEntity | SingleEntity, childAlias: string, multiple: boolean ): WhereLink {
    const [ parentAlias, parentTable ] = getParentTableAndAlias ( main, path, e => e.table )
    return { parentTable, parentAlias, idInParent: entity.idInParent, childAlias, childTable: entity.table, idInThis: entity.idInThis, linking: multiple }
  }
  let whereLinks = foldEntitys ( {
    foldMain ( childAccs: WhereLink[][], main: EntityAndWhere ): WhereLink[] { return [ ...childAccs.flat (), ...main.where ]},
    foldMultiple ( childAccs: WhereLink[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, filterPath, multiple: MultipleEntity ): WhereLink[] {
      return []
    },
    foldSingle ( childAccs: WhereLink[][], main: EntityAndWhere, path: [ string, ChildEntity ][], childAlias: string, filterPath, single: SingleEntity ): WhereLink[] {
      return [ ...childAccs.flat (), makeWhere ( main, path, single, childAlias, false ) ]
    }
  }, sqlRoot.main, sqlRoot.root, sqlRoot.filterPath, [] );
  return whereLinks;
}
export function findWhereLinksForSqlRoot ( sqlRoot: SqlRoot ): WhereLink[] {
  return [ ...(findWhereLinksForSqlRootGoingDown ( sqlRoot )), ...findWhereLinksForSqlRootGoingUp ( sqlRoot ) ]
}

export function findWhereLinksForSqlRootGoingUp ( sqlRoot: SqlRoot ): WhereLink[] {
  if ( sqlRoot.root === sqlRoot.main.entity ) return []

  let sqlRootAndParentsPath: [ string, Entity ][] = [ [ sqlRoot.alias, sqlRoot.root ], ...sqlRoot.path ];
  const upToMain: [ string, Entity ][] = [ ...sqlRootAndParentsPath, [ sqlRoot.main.entity.table.name, sqlRoot.main.entity ] ]
  // console.log ( 'findWhereLinksForSqlRootGoingUp', upToMain.map ( ( [ alias, entity ] ) => `${alias} => ${entity.table.name}` ) )
  return sqlRootAndParentsPath.map ( ( p, i ) => {
    if ( p[ 1 ].type === 'Main' )
      throw Error ();
    const fromUpToMain = upToMain[ i + 1 ]
    let result: WhereLink = {
      parentTable: fromUpToMain[ 1 ].table, parentAlias: fromUpToMain[ 0 ],
      childTable: p[ 1 ].table, childAlias: p[ 0 ], idInThis: p[ 1 ].idInThis, idInParent: p[ 1 ].idInParent, linking: false
    };
    // console.log('result / wherelink is', simplifyWhereLink(result))
    return result;
  } )
}
export const whereFieldToFieldData = <G> ( errorPrefix: string, name: string ): FieldData<G> => {
  const [ dbFieldName, theType ] = beforeAfterSeparator ( ":", name )
  if ( theType === '' || theType === 'integer' ) return ({ dbFieldName, reactType: 'number', rsGetter: 'getInt', dbType: 'integer' })
  if ( theType === 'string' ) return ({ dbFieldName, reactType: 'string', rsGetter: 'getString', dbType: 'string' })
  throw Error ( `${errorPrefix} Cannot find whereFieldToFieldData for type [${theType}] in [${name}]` )
};

export function findFieldsFromWhere<G> ( errorPrefix: string, ws: WhereLink[] ): TableAndFieldAndAliasData<G>[] {
  return ws.flatMap ( w => {
    if ( isWhereFromQuery ( w ) ) {
      return [ { ...w, fieldData: whereFieldToFieldData ( errorPrefix, w.field ) } ]
    }
    if ( isTableWhereLink ( w ) ) return [ { table: w.parentTable, alias: w.parentAlias, fieldData: whereFieldToFieldData ( errorPrefix, w.idInParent ) },
      { table: w.childTable, alias: w.childAlias, fieldData: whereFieldToFieldData ( errorPrefix, w.idInThis ) } ]
    throw Error ( `Unknown type of where ${w}` )
  } )
}

interface FieldData<G> extends HasSample<(string | number | boolean)> {
  /** Can be undefined if only present in a where clause and needed for ids */
  fieldName?: string;
  path?: string[]
  dbFieldName: string;
  rsGetter: string;
  reactType: string;
  dbType: string;
  sample?: (string | number | boolean)[];
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
interface TableAndFieldsAndAliasData<G> extends TableAndFieldsData<G> {
  alias: string;
}

export function foldTableAndFieldIntoTableAndFields<G> ( tafs: TableAndFieldData<G>[] ): TableAndFieldsData<G>[] {
  const justTables = unique ( tafs.map ( t => t.table ), t => t.name )
  return justTables.map ( table => ({ table, fieldData: tafs.filter ( taf => taf.table.name == table.name ).map ( t => t.fieldData ) }) )
}
function getSample<G> ( oneDataD: OneDataDD<G> | undefined, prim: PrimitiveDD ): any[] {
  if ( oneDataD.sample ) return oneDataD.sample
  return safeArray<any> ( prim.sample )
}

export function findTableAndFieldFromDataD<G> ( dataD: CompDataD<G> ): TableAndFieldData<G>[] {
  return flatMapDD<TableAndFieldData<G>, any> ( dataD, {
    ...emptyDataFlatMap<TableAndFieldData<G>, any> (),
    walkPrim: ( path, parents, oneDataDD, dataDD ) => {
      const fieldName = path[ path.length - 1 ];
      const samples: any[] = getSample ( oneDataDD, dataDD )
      if ( oneDataDD?.db )
        if ( isTableAndField ( oneDataDD.db ) ) {
          let fieldData: FieldData<any> = { dbFieldName: oneDataDD.db.field, rsGetter: dataDD.rsGetter, reactType: dataDD.reactType, dbType: dataDD.dbType, fieldName, path, sample: samples };
          return [ { table: oneDataDD.db.table, fieldData } ]
        } else {
          const parent = parents[ parents.length - 1 ]
          if ( !parent.table ) throw new Error ( `Have a field name [${oneDataDD.db} in ${path}], but there is no table in the parent ${parent.name}` )
          let fieldData: FieldData<any> = { dbFieldName: oneDataDD.db, rsGetter: dataDD.rsGetter, reactType: dataDD.reactType, dbType: dataDD.dbType, fieldName, path, sample: samples };
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

export function findAllFields<G> ( sqlRoot: SqlRoot, dataD: CompDataD<any>, wheres: WhereLink[] ): TableAndFieldAndAliasData<G>[] {
  const errorPrefix = `Error dataD is ${dataD.name}`
  const tfFromData: TableAndFieldData<any>[] = findTableAndFieldFromDataD ( dataD )
  const tfAliasFromData: TableAndFieldAndAliasData<G>[] = findTableAliasAndFieldFromDataD ( sqlRoot, tfFromData )
  const fromWhere: TableAndFieldAndAliasData<G>[] = findFieldsFromWhere ( errorPrefix, wheres )
  return unique ( [ ...fromWhere, ...tfAliasFromData ], t => simplifyTableAndFieldAndAliasData ( t, true ) )
}

export function findSqlLinkDataFromRootAndDataD ( sqlRoot: SqlRoot, dataD: CompDataD<any> ): SqlLinkData {
  return findSqlLinkDataFromRootAndDataDWithParent ( undefined, sqlRoot, dataD )
}
export function findSqlLinkDataFromRootAndDataDWithParent ( parent: SqlRoot | undefined, sqlRoot: SqlRoot, dataD: CompDataD<any> ): SqlLinkData {
  const aliasAndTables = findAliasAndTableLinksForLinkData ( sqlRoot )
  const whereLinks: WhereLink[] = findWhereLinksForSqlRoot ( sqlRoot )
  const linkToParent = sqlRootToLinkToParent ( sqlRoot )
  const fields: TableAndFieldAndAliasData<any>[] = findAllFields ( sqlRoot, dataD, whereLinks )
  const children = sqlRoot.children.map ( childRoot => findSqlLinkDataFromRootAndDataDWithParent ( sqlRoot, childRoot, dataD ) )
  const rawLinksInThis = findWhereLinksForSqlRootGoingDown ( sqlRoot ).filter ( wl => isWhereFromQuery ( wl ) || !wl.linking ).map ( singleLinkData ( `In ${dataD.name}, sqlRoot is ${sqlRoot.root.table.name}/${sqlRoot.filterPath} trying to find sql link data`, fields ) )
  const linksInThis = parent ? rawLinksInThis.filter ( l => isTableWhereLink ( l.w ) ) : rawLinksInThis //we only have param links in the top most.. by definition that params are constant in one query
  return { whereLinks, aliasAndTables, sqlRoot, fields, linksInThis, children, linkToParent }
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
  } ).join ( " and " )
}

export function generateGetSql ( s: SqlLinkData ): string[] {
  return [ `select`, ...indentList ( addStringToEndOfAllButLast ( ',' ) ( s.fields.map ( taf => `${taf.alias}.${taf.fieldData.dbFieldName} as ${sqlTafFieldName ( taf )}` ) ) ),
    ` from`, ...indentList ( addStringToEndOfAllButLast ( ',' ) ( s.aliasAndTables.map ( ( [ alias, table ] ) => `${table.name} ${alias}` ) ) ),
    ` where ${makeWhereClause ( s.whereLinks )}` ]
}

export const findAllTableAndFieldsIn = <G> ( rdps: RestDefnInPageProperties<G>[] ) => unique ( rdps.flatMap ( rdp => {
  if ( !rdp.rest.tables ) return []
  return walkSqlRoots ( findSqlRoot ( rdp.rest.tables ), ( parent, sqlRoot ) => findSqlLinkDataFromRootAndDataD ( sqlRoot, rdp.rest.dataDD ) ).flatMap (
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
  const createSql = ( taf: TableAndFieldsData<G> ): string[] => [
    `create table ${taf.table.name}` + '(',
    ...indentList ( addStringToEndOfAllButLast ( "," ) ( taf.fieldData.map ( fd => `${fd.dbFieldName} ${fd.dbType}` ) ) ),
    ')'
  ];
  return Object.fromEntries ( findAllTableAndFieldDatasIn ( rdps ).map ( taf => [ taf.table.name, createSql ( taf ) ] ) )
}

export function makeMapsForRest<B, G> ( params: JavaWiringParams, p: PageD<B, G>, restName: string, restD: RestD<G>, ld: SqlLinkData, path: number[], childCount: number ): string[] {
  function mapName ( path: string[] ) {return path.length === 0 ? '_root' : safeArray ( path ).join ( "_" )}

  const maps = flatMapDD<string, G> ( restD.dataDD, {
    ...emptyDataFlatMap (),
    walkDataStart: ( path1, parents, oneDataDD, dataDD ) =>
      [ `public final Map<String,Object> ${mapName ( path1 )} = new HashMap<>();` ]
  } )
  const ids = ld.linksInThis.map ( l => `public final Object ${l.name};` )
  const className = sqlMapName ( p, restName, path );

  const constParams = [ `ResultSet rs`, ...ints ( childCount ).map ( i => `List<${sqlListName ( p, restName, path, i )}> list${i}` ) ].join ( ',' )
  const sql = generateGetSql ( ld )
  const putters = ld.fields
    .filter ( taf => taf.fieldData.fieldName )
    .sort ( ( l, r ) => l.table.name.localeCompare ( r.table.name ) )
    .sort ( ( l, r ) => l.fieldData.dbFieldName.localeCompare ( r.fieldData.dbFieldName ) )
    .map ( taf => `this.${mapName ( taf.fieldData.path.slice ( 0, -1 ) )}.put("${taf.fieldData.fieldName}", rs.${taf.fieldData.rsGetter}("${sqlTafFieldName ( taf )}"));` )
  const setIds = ld.linksInThis.map ( l => `this.${l.name} = rs.${l.tafs[ 0 ].fieldData.rsGetter}("${sqlTafFieldName ( l.tafs[ 0 ] )}");` )
  const allPaths = unique ( flatMapDD<string[], G> ( restD.dataDD, {
    ...emptyDataFlatMap (),
    walkDataStart: ( path1, parents, oneDataDD, dataDD ) =>
      [ path1 ]
  } ), r => r.toString () )

  const links = allPaths.filter ( p => p.length > 0 )
    .filter ( p => p.join ( "/" ).startsWith ( safeString ( ld.sqlRoot.filterPath ) ) )
    .map ( path => `${mapName ( path.slice ( 0, -1 ) )}.put("${path[ path.length - 1 ]}", ${mapName ( path )});` )
  const linksToOtherMaps = ld.sqlRoot.children.map ( ( childRoot, i ) => {
    let childEntity = childRoot.root
    if ( !isMultipleEntity ( childEntity ) ) throw Error ( `Page: ${p.name} rest ${restName} The parent of sql root must be a multiple entity.\n ${JSON.stringify ( childRoot )}` )
    if ( childRoot.children.length > 0 )
      throw Error ( `Page: ${p.name} rest ${restName} has nested 'multiples. Currently this is not supported` )
    return `this.${childEntity.linkInData.mapName}.put("${childEntity.linkInData.field}", list${i}.stream().map(m ->m.${childEntity.linkInData.link}).collect(Collectors.toList()));`
  } );

  return [
    `package ${params.thePackage}.${params.dbPackage};`,
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
    ``,
    `//${JSON.stringify ( restD.params )}`,
    `public class ${className} {`,
    ...indentList ( [
      `@SuppressWarnings("SqlResolve")`,
      ...addBrackets ( 'public static String sql = ', ';' ) ( addStringToEndOfAllButLast ( '+' ) ( sql.map ( s => '"' + s.replace ( /""/g, '\"' ) + '"' ) ) ),
      '',
      ...makeAllGetsAndAllSqlForRest ( params, p, restName, restD ),
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

type JavaQueryParamDetails = [ string, AllLensRestParams ]
function getParameters<B, G> ( childCount: number, p: PageD<B, G>, restName: string, path: number[], queryParams: JavaQueryParamDetails[] ) {
  return [ 'Connection connection', ...queryParams.map ( ( [ name, param ] ) =>
    `${param.javaType} ${name}` ), ...mapPathPlusInts ( path, childCount ) ( pathAndI => `List<${sqlMapName ( p, restName, pathAndI )}> list${pathAndI}` ) ].join ( ", " );
}
function newMap ( mapName: string, childCount: number, path: number[] ) {
  return `new ${mapName}(${[ 'rs', ...ints ( childCount ).map ( i => `list${i}` ) ].join ( "," )})`
}
function makeGetRestForRoot<B, G> ( p: PageD<B, G>, restName: string, childCount: number, queryParams: JavaQueryParamDetails[] ) {
  const mapName = `${sqlMapName ( p, restName, [] )}`;
  return [
    `public static Optional<${mapName}> getRoot(${getParameters ( childCount, p, restName, [], queryParams )}) throws SQLException {`,
    `    PreparedStatement statement = connection.prepareStatement(${mapName}.sql);`,
    ...indentList ( queryParams.map ( ( [ name, param ], i ) => `statement.${param.rsSetter}(${i + 1},${name});` ) ),
    `    ResultSet rs = statement.executeQuery();`,
    `    try {`,
    `      return rs.next() ? Optional.of(${newMap ( mapName, childCount, [] )}) : Optional.empty();`,
    `    } finally {`,
    `      rs.close();`,
    `      statement.close();`,
    `    }`,
    `}`
  ]
}
function makeGetRestForChild<B, G> ( p: PageD<B, G>, restName: string, path: number[], childCount: number, queryParams: JavaQueryParamDetails[] ) {
  const mapName = `${sqlMapName ( p, restName, path )}`;
  return [
    `public static List<${mapName}> get${path.join ( '_' )}(${getParameters ( childCount, p, restName, [], queryParams )}) throws SQLException {`,
    `    PreparedStatement statement = connection.prepareStatement(${mapName}.sql);`,
    ...indentList ( queryParams.map ( ( [ name, param ], i ) => `statement.${param.rsSetter}(${i + 1},${name});` ) ),
    `    ResultSet rs = statement.executeQuery();`,
    `    try {`,
    `      List<${mapName}> result = new LinkedList<>();`,
    `      while (rs.next())`,
    `        result.add(${newMap ( mapName, childCount, [] )});`,
    `      return result;`,
    `    } finally {`,
    `      rs.close();`,
    `      statement.close();`,
    `    }`,
    `}`
  ]
}

export function makeGetForRestFromLinkData<B, G> ( params: JavaWiringParams, p: PageD<B, G>, restName: string, rest: RestD<G>, queryParams: JavaQueryParamDetails[], path: number[], childCount: number ) {
  return path.length === 0 ? makeGetRestForRoot ( p, restName, childCount, queryParams ) : makeGetRestForChild ( p, restName, path, childCount, queryParams );
}
interface QueryAndGetters {
  query: JavaQueryParamDetails[],
  getter: string[];
  sql: string[]
}
export function makeAllGetsAndAllSqlForRest<B, G> ( params: JavaWiringParams, p: PageD<B, G>, restName: string, restD: RestD<G> ): string[] {
  let sqlRoot = findSqlRoot ( restD.tables );
  const getters: QueryAndGetters[] = walkSqlRoots ( sqlRoot, ( parent, r, path ) => {
    const ld = findSqlLinkDataFromRootAndDataD ( r, restD.dataDD )
    if ( restD.tables === undefined ) throw Error ( `somehow have a sql root without a tables in ${p.name} ${restName}` )
    const query = findParamsForTable ( `Page ${p.name} rest ${restName}`, restD.params, restD.tables )
    return { query, getter: makeGetForRestFromLinkData ( params, p, restName, restD, query, path, r.children.length ), sql: [ ...generateGetSql ( ld ), '' ] }
  } )
  const paramsForMainGet = getters.slice ( 1 ).map ( g => g.query )
  function callingParams ( qs: JavaQueryParamDetails[] ) {return qs.map ( q => q[ 0 ] )}
  const allParams = unique ( getters.flatMap ( g => g.query ), q => q[ 0 ] + q[ 1 ].javaType )
  const mainGet: string[] = [
    `public static Optional<Map<String,Object>> getAll(${[ 'Connection connection', ...allParams.map ( ( [ name, param ] ) =>
      `${param.javaType} ${name}` ) ].join ( "," )}) throws SQLException {`,
    `   return getRoot(${[ 'connection', ...callingParams ( getters[ 0 ].query ), ...ints ( sqlRoot.children.length )
      .map ( i => `get${i}(${[ 'connection', ...callingParams ( paramsForMainGet[ i ] ) ].join ( ',' )})` ) ].join ( "," )}).map(x -> x._root);`, // Note not yet recursing here
    `}` ]
  const allSql = addBrackets ( `public static String allSql=`, ';' ) ( addStringToEndOfAllButLast ( "+" ) ( getters.flatMap ( g => g.sql.map ( s => '"' + s + '\\n"' ) ) ) )
  return [ ...mainGet, ...allSql, ...getters.flatMap ( g => g.getter ) ]
}

export function findParamsForTable ( errorPrefix: string, params: RestParams, table: EntityAndWhere ): JavaQueryParamDetails[] {
  return table.where.flatMap ( wl => {
    if ( isWhereFromQuery ( wl ) ) {
      let param = params[ wl.paramName ];
      if ( param == undefined ) throw Error ( `${errorPrefix} param ${wl.paramName} is defined in where ${JSON.stringify ( wl )}\nBut not available in the params[${Object.keys ( params )}]` )
      let result: [ string, AllLensRestParams ] = [ wl.paramName, param ];
      return [ result ]
    }
    return []
  } )
}


export function makeSampleForOneTable ( ld: SqlLinkData, table: string, i: number ) {
  const data: any = {}
  function addSample ( f: FieldData<any> ) {
    if ( data[ f.dbFieldName ] !== undefined ) return
    selectSample ( i, f )
  }
  ld.fields.filter ( f => f.table.name = table ).forEach ( f => f.fieldData.dbFieldName )


}
// function addBracketsTo ( [ reactType, value ]: [ string, any ] ) {
//   if ( reactType === 'string' ) return `'${value}'`
//   if ( reactType === 'number' ) return `${value}`
//   throw new Error ( `Don't know how to handle brackets for reactType ${reactType}` )
// }

interface DataForMutate {
  parent?: DataForMutate
  data: NameAnd<NameAnd< FieldData<any> >>; //alias name maps to fieldname maps to value
  idData: NameAnd<SingleLinkData>; //the link name to all the data we have about that id.
  ld: SqlLinkData;
  aliasToTable: NameAnd<DBTable>;
  children: DataForMutate[]
}

function setForDataForMutate<T> ( na: NameAnd<NameAnd<T>>, name1: string, name2: string, t: T ) {
  if ( na[ name1 ] === undefined ) na[ name1 ] = {}
  na[ name1 ][ beforeSeparator ( ":", name2 ) ] = t
}
function foldTableAndFieldDataArrayIntoNameAndNameAndFieldDataWithValue ( i: number, tafs: TableAndFieldAndAliasData<any>[] ): NameAnd<NameAnd<string>> {
  const result: NameAnd<NameAnd<string>> = {}
  tafs.forEach ( taf => {
    if ( taf.fieldData.sample ) {
      const sample = selectSample ( i, taf.fieldData );
      const quotedSample = taf.fieldData.reactType === 'number' ? sample : "'" + sample + "'"
      setForDataForMutate ( result, taf.alias, taf.fieldData.dbFieldName, quotedSample )
    }
  } )
  return result
}
export function walkDataForMutate<Acc> ( path: DataForMutate[], fold: ( path: DataForMutate[] ) => Acc ): Acc[] {
  let tail = lastItem ( path );
  return [ fold ( path ), ...tail.children.flatMap ( (c: DataForMutate) => walkDataForMutate ( [ ...path, c ], fold ) ) ]
}
export function getValueFrom ( path: DataForMutate[], table: string, name: string ): any {
  const actualName = beforeSeparator ( ':', name )
  let found = path.find ( dm => dm.data?.[ table ]?.[ actualName ] );
  return found?.data[ table ]?.[ actualName ]
}
export function setDataFrom ( na: NameAnd<NameAnd<any>>, path: DataForMutate[], alias: string, field: string ) {
  let valueFrom = getValueFrom ( path, alias, field );
  if ( valueFrom === undefined ) valueFrom = 'wasUndefined'
  setForDataForMutate ( na, alias, field, valueFrom )
}
export function makeDataForMutate ( ld: SqlLinkData, i: number ): DataForMutate {
  const result: DataForMutate = foldSqlLinkData<DataForMutate> ( ( ld, children ) => {
    const aliasToTable: NameAnd<DBTable> = Object.fromEntries ( ld.fields.map ( taf => [ taf.alias, taf.table ] ) )
    const withoutChildren: DataForMutate = {
      data: foldTableAndFieldDataArrayIntoNameAndNameAndFieldDataWithValue ( i, ld.fields ), aliasToTable,
      children: [], ld, idData: {},
    }
    withoutChildren.children = children.map ( c => ({ ...c, parent: withoutChildren }) )
    return withoutChildren
  } )
  ( ld );
  walkDataForMutate ( [ result ], path => lastItem ( path ).parent = lastButOneItem ( path ) )
  walkDataForMutate ( [ result ], path => {
    const dm = lastItem ( path )
    const parentDm = lastButOneItem ( path )

    dm.ld.linksInThis.forEach ( (link: { name: string | number; w: WhereLink; }) => {
      const id = `idFor${link.name}`
      dm.idData[ link.name ] = link
      if ( isWhereFromQuery ( link.w ) )
        setForDataForMutate ( dm.data, link.w.alias, link.w.field, id )
      if ( isTableWhereLink ( link.w ) ) {
        setForDataForMutate ( dm.data, link.w.parentAlias, link.w.idInParent, id );
        setForDataForMutate ( dm.data, link.w.childAlias, link.w.idInThis, id );
      }
    } )
    const linkToParent = dm.ld.linkToParent
    let linkName = findNameForTableWhereLink ( linkToParent );
    function findIdInParentOrMakeNew () {
      if ( parentDm ) {
        const id = getValueFrom ( path, linkToParent.parentAlias, linkToParent.idInParent )
        if ( id ) return id
      }
      const id = `idFor${linkName}`//need to check if already exists
      return id;
    }
    if ( linkToParent ) {
      const id = findIdInParentOrMakeNew ();
      if ( parentDm ) setForDataForMutate ( parentDm.data, linkToParent.parentAlias, linkToParent.idInParent, id );
      dm.idData[ linkName ] = {
        name: linkName, w: linkToParent, tafs: [
          { table: linkToParent.parentTable, alias: linkToParent.parentAlias, fieldData: { dbFieldName: linkToParent.idInParent } },
          { table: linkToParent.childTable, alias: linkToParent.childTable, fieldData: { dbFieldName: linkToParent.idInParent, } }
        ]
      }

      setForDataForMutate ( dm.data, linkToParent.childAlias, linkToParent.idInThis, id );
    }
  } )
  return result
}

export function simplifyDataForMutate ( d: DataForMutate ): string[] {
  return [ `Parent ${d.parent ? 'parent' : 'noParent'}`,
    `data - ${JSON.stringify ( d.data )}`,
    `idData - ${JSON.stringify ( d.idData )}`,
    `linkToParent: ${simplifyWhereLink ( d.ld.linkToParent )}`,
    ...indentList ( d.children.flatMap ( simplifyDataForMutate ) ) ]
}

export function makeInsertSqlForSample ( ld: SqlLinkData, i: number ): string[] {
  return walkDataForMutate ( [ makeDataForMutate ( ld, i ) ], path => {
    const dm = lastItem ( path )
    return Object.entries ( dm.data ).map ( ( [ alias, values ] ) =>
      `insert into ${dm.aliasToTable[ alias ].name} (${Object.keys ( values ).join ( "," )})` + ` values (${Object.values ( values ).join ( ',' )})` )
  } ).flat ()
}
