import { NameAnd, RestAction, sortedEntries } from "@focuson/utils";
import { AllDataDD, CompDataD, isDataDd, isPrimDd, isRepeatingDd, OneDataDD } from "./dataD";
import { AliasAndWhere, fieldsInWhere, GetSqlFromDataDDetails, isSqlResolverD, mergeWhere, SqlGetDetails, SqlResolverD, Where } from "../example/jointAccount/jointAccount.restD";
import { unique } from "./restD";

export interface ResolverTree {
  main: ResolverD;
  dataD: CompDataD<any>;
  children: ResolverTree[]
}

export type ResolverD = SqlResolverD | 'not defined yet'

export interface TableAndField {
  table: DBTable;
  field: string;
}
export function isTableAndField ( d: DbValues ): d is TableAndField {
  // @ts-ignore
  return d?.table !== undefined

}
export type DbValues = string | TableAndField

export interface AuditDetails {
  restActions: RestAction[],
  by: string
}

export interface Schema {
  name: string
}
/** This is the meta data about a table (except for field names..those are declared elsewhere */
export interface DBTable {
  /** Which schema the database is in. For now we only support single schema worlds */
  schema: Schema;
  /** The physical name of the table */
  name: string,
  /** the business purpose of the table */
  description: string,
  /** Any important comments or notes about this*/
  notes: string,
  /** How we audit the file */
  audit: AuditDetails
}
export interface DBTableAndName {
  name: string;
  table: DBTable;
}
export function isDbTableAndName ( d: DBTableAndMaybeName ): d is DBTableAndName {
  // @ts-ignore
  return d && d.schema === undefined
}
export function isDBTable ( d: DBTableAndMaybeName ): d is DBTable {
  // @ts-ignore
  return d.schema !== undefined
}
export type DBTableAndMaybeName = DBTableAndName | DBTable


/** This is 'are you a resolver or a data. As we add more types than sql resolver, we'll need this */
export const isResolver = isSqlResolverD


export interface FoundParentChildLink {
  parent: CompDataD<any>;
  /** If missing the parent will be a repeating block */
  nameAndOneDataDD?: [ string, OneDataDD<any> ];
  child: AllDataDD<any>;
}


export interface FoundParentChildProps {
  stopAtRepeat?: boolean;
  includePrimitives?: boolean;
}

export function findParentChildCompDataLinks<G> ( props: FoundParentChildProps, d: CompDataD<G> ): FoundParentChildLink[] {
  const folder: ParentChildFoldFn<FoundParentChildLink[]> = ( acc: FoundParentChildLink[], parent: CompDataD<any>, nameAndOneDataDD, child: AllDataDD<any> ) => {
    if ( isPrimDd ( child ) && !props.includePrimitives ) return acc
    return [ ...acc, { parent, nameAndOneDataDD, child } ]
  }
  return walkParentChildCompDataLinks<FoundParentChildLink[]> ( props, d, folder, [] )

  // return makeLinksForChild ( d )
}


export interface FoundChildAliasAndWhere extends FoundParentChildLink {
  aliasAndWhere?: AliasAndWhere
}


export type ParentChildFoldFn<Acc> = ( acc: Acc, parent: CompDataD<any>, nameAndOneDataD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any> ) => Acc

export function walkParentChildCompDataLinks<Acc> ( { stopAtRepeat, includePrimitives }: FoundParentChildProps, d: CompDataD<any>, folder: ParentChildFoldFn<Acc>, zero: Acc ) {
  function makeLinksForChild ( acc: Acc, d: AllDataDD<any> ): Acc {
    if ( isPrimDd ( d ) ) return acc;
    if ( isRepeatingDd ( d ) ) return makeLinksForParentChild ( acc, d, undefined, d.dataDD )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).reduce ( ( acc, [ name, data ] ) => makeLinksForParentChild ( acc, d, [ name, data ], data.dataDD ), acc )
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeLinksForParentChild ( acc: Acc, parent: CompDataD<any>, nameAndOneDataD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any> ): Acc {
    if ( stopAtRepeat && isRepeatingDd ( child ) ) return acc;
    if ( isPrimDd ( child ) && !includePrimitives ) return acc
    return makeLinksForChild ( folder ( acc, parent, nameAndOneDataD, child ), child )
  }
  return makeLinksForChild ( zero, d )
}

export type ParentChildAliasMapFoldFn<Acc> = ( acc: Acc, parent: CompDataD<any>, nameAndOneDataDD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any>, aliasMap: NameAnd<DBTableAndMaybeName>, where: Where, getSqlFromDataDDetails: GetSqlFromDataDDetails ) => Acc

export function walkParentChildCompDataLinksWithAliasMapAndWhere<Acc> ( { stopAtRepeat, includePrimitives }: FoundParentChildProps, d: CompDataD<any>, sqlG: SqlGetDetails, folder: ParentChildAliasMapFoldFn<Acc>, zero: Acc, initialAliasMap?: NameAnd<DBTableAndMaybeName> ) {
  function makeLinksForChild ( acc: Acc, d: AllDataDD<any>, aliasMap: NameAnd<DBTableAndMaybeName>, oldWhere: Where ): Acc {
    if ( isRepeatingDd ( d ) ) return makeLinksForParentChild ( acc, d, undefined, d.dataDD, aliasMap, oldWhere )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).reduce ( ( acc, [ name, data ] ) =>
      makeLinksForParentChild ( acc, d, [ name, data ], data.dataDD, aliasMap, oldWhere ), acc, )
    if ( isPrimDd ( d ) ) return acc
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeLinksForParentChild ( acc: Acc, parent: CompDataD<any>, nameAndOneDataDD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any>, oldAliasMap: NameAnd<DBTableAndMaybeName>, oldWhere: Where ): Acc {
    if ( isPrimDd ( child ) && !includePrimitives ) return acc
    if ( stopAtRepeat && isRepeatingDd ( child ) ) return acc;
    const found: GetSqlFromDataDDetails | undefined = sqlG.sql.find ( ( { data, aliases } ) => data === nameAndOneDataDD?.[ 1 ] );
    const aliasMap: NameAnd<DBTableAndMaybeName> = found ? { ...oldAliasMap, ...found.aliases } : oldAliasMap
    const newWhere = found ? mergeWhere ( oldWhere, found.where ) : oldWhere
    const newAcc = folder ( acc, parent, nameAndOneDataDD, child, aliasMap, newWhere, found );
    return makeLinksForChild ( newAcc, child, aliasMap, newWhere )
  }
  return makeLinksForChild ( zero, d, initialAliasMap ? initialAliasMap : sqlG.aliases, sqlG.where )
}

export function findParentChildAndAliases<G> ( props: FoundParentChildProps, d: CompDataD<G>, sqlG: SqlGetDetails, initialAliasMap?: NameAnd<DBTableAndMaybeName> ): FoundChildAliasAndWhere[] {
  const folder: ParentChildAliasMapFoldFn<FoundChildAliasAndWhere[]> =
          ( acc: FoundChildAliasAndWhere[], parent: CompDataD<any>, nameAndOneDataDD: [ string, OneDataDD<any> ] | undefined, child: AllDataDD<any>, aliases: NameAnd<DBTableAndMaybeName>, where, getSqlFromDataDDetails ) => {
            if ( isPrimDd ( child ) && !props.includePrimitives ) return acc
            const found: FoundChildAliasAndWhere = {
              parent, nameAndOneDataDD, child, ...getSqlFromDataDDetails,
              aliasAndWhere: { aliases, where }
            };
            return [ ...acc, found ]
          }
  return walkParentChildCompDataLinksWithAliasMapAndWhere<FoundChildAliasAndWhere[]> ( props, d, sqlG, folder, [], initialAliasMap )
}

export interface SqlRoot {
  data: CompDataD<any>;
  /** The aliases we have accumulated to get to the sql root */
  aliases: NameAnd<DBTableAndMaybeName>;
  /** The wheres we have accumulated to get to the sql root */
  where: Where
}
export function findRoots ( d: CompDataD<any>, sqlG: SqlGetDetails ): SqlRoot[] {
  const children: SqlRoot[] = findParentChildAndAliases ( {}, d, sqlG ).filter ( ( { parent } ) => isRepeatingDd ( parent ) )
    .map ( ( { parent, aliasAndWhere } ) => ({ data: parent, aliases: aliasAndWhere.aliases, where: aliasAndWhere.where }) );
  return [ { data: d, aliases: sqlG.aliases, where: sqlG.where }, ...children ]
}

export interface TableNameAndRef {
  name: string;
  ref: string;
}
function findTableAndField ( parent: CompDataD<any>, name: string, db: string | TableAndField | undefined ): TableAndField {
  if ( !isDataDd ( parent ) ) throw new Error ( `Trying to findField in ${parent.name} which isn't a DataD. db is ${JSON.stringify ( db )}` )
  if ( isTableAndField ( db ) ) return db
  if ( parent.table ) return { table: parent.table, field: db ? db : name }
  throw Error ( `In ${parent.name} ${name}. Have  db field ${db} but not table in parent` )
}

export function findFieldsNeededFor ( sqlRoot: SqlRoot ): TableAndField[] {
  const folder: ParentChildFoldFn<TableAndField[]> = ( acc, parent, nameAndOneDataD, child ) =>
    isPrimDd ( child ) ? [ ...acc, findTableAndField ( parent, nameAndOneDataD[ 0 ], nameAndOneDataD[ 1 ].db ) ] : acc
  return walkParentChildCompDataLinks ( { stopAtRepeat: true, includePrimitives: true }, sqlRoot.data, folder, [] )
}

export function findAliasMapFor ( sqlRoot: SqlRoot, sqlG: SqlGetDetails ): NameAnd<DBTableAndName> {
  const initialValue: NameAnd<DBTableAndName> = {};
  const aliasMap: NameAnd<DBTableAndName> = findParentChildAndAliases ( { stopAtRepeat: true }, sqlRoot.data, sqlG, sqlRoot.aliases )
    .reduce ( ( acc, am ) => ({
      ...acc, ...Object.fromEntries ( Object.entries ( am.aliasAndWhere.aliases ).map (
        ( [ n, d ] ) => [ n, isDbTableAndName ( d ) ? d : { name: d.name, table: d } ] ) )
    }), initialValue )
  return aliasMap

}

export function findWheresFor ( sqlRoot: SqlRoot, sqlG: SqlGetDetails ): Where {
  const { data } = sqlRoot
  const wheres = findParentChildCompDataLinks ( { stopAtRepeat: true }, data ).flatMap ( ( { nameAndOneDataDD } ) => {
    const found: GetSqlFromDataDDetails | undefined = sqlG.sql.find ( ( { data, aliases } ) => data === nameAndOneDataDD?.[ 1 ] );
    return found ? [ found.where ] : []
  } )
  const allWheres = [ sqlRoot.where, ...wheres ];
  return allWheres.reduce ( mergeWhere )

}

export interface SqlData {
  /** Alias name, fieldname, as */
  fields: TableAndField[];
  aliasMap: NameAnd<DBTableAndName>;
  wheres: Where
}

export function makeSqlDataFor ( sqlRoot: SqlRoot, sqlG: SqlGetDetails ): SqlData {
  const fields = findFieldsNeededFor ( sqlRoot )
  const aliasMap: NameAnd<DBTableAndName> = findAliasMapFor ( sqlRoot, sqlG )
  const wheres = findWheresFor ( sqlRoot, sqlG )
  return { fields, aliasMap, wheres }
}

export const findTableNameOrAliasInAliasMap = ( aliasMap: NameAnd<DBTableAndName> ) => ( [ table, field ]: [ string, string ] ): string => {
  let entries = Object.entries ( aliasMap );
  const foundByName = entries.find ( ( [ n, db ] ) => db.table.name === table )
  if ( foundByName ) return foundByName[ 0 ] + '.' + field
  const foundByAlias = entries.find ( ( [ n, db ] ) => n === table )
  if ( foundByAlias ) return foundByAlias[ 0 ] + '.' + field
  const match = table.match ( /^\[.*]$/ )
  if ( match ) {
    const name = table.slice ( 1, -1 )
    const foundByBracketName = entries.find ( ( [ n, t ] ) => t.name == name )
    if ( foundByBracketName ) return foundByBracketName[ 0 ] + '.' + field
  }
  throw Error ( `Don't now how to find the alias for the tablename ${table}\nLegal names are ${Object.keys ( aliasMap )}` )
};
// export const findAliasField = ( aliasMap: NameAnd<DBTableAndName> ) => ( { table, field }: TableAndField ) => {
//   if ( table === undefined ) return field
//   return `${table.name}.${field}`
// };
export function findFieldsFor ( { fields, aliasMap, wheres }: SqlData ) {
  try {
    const fromWhere: [ string, string ][] = fieldsInWhere ( wheres )
    let fromFields: [ string, string ][] = fields.map ( tf => [ tf.table.name, tf.field ] );
    return unique ( [ ...fromFields, ...fromWhere ].map ( findTableNameOrAliasInAliasMap ( aliasMap ) ), x => x ).join ( ',' )
  } catch ( e: any ) {
    console.error ( e )
    throw Error ( `Error findFields for\n${simplifyAliasAndWhere ( { aliases: aliasMap, where: wheres } )}` )
  }
}
export function makeSqlFor ( sqlData: SqlData ) {
  return `select ${findFieldsFor ( sqlData )}`
}

export function simplifyAliasMap ( a: NameAnd<DBTableAndMaybeName> ) {
  return JSON.stringify ( Object.fromEntries ( sortedEntries ( a ).map ( ( [ name, t ] ) => [ name, isDbTableAndName ( t ) ? t.name + ".'" + t.table?.name : t?.name ] ) ) ).replace ( /"/g, "'" )
}

export function simplifyAliasAndWhere ( aliasAndWhere: AliasAndWhere ) {
  return simplifyAliasMap ( aliasAndWhere?.aliases ) + " Wheres: " + JSON.stringify ( aliasAndWhere?.where )?.replace ( /"/g, "'" )
}
