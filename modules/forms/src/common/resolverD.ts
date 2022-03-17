import { NameAnd, RestAction } from "@focuson/utils";
import { AllDataDD, CompDataD, isDataDd, isPrimDd, isRepeatingDd, OneDataDD } from "./dataD";
import { GetSqlFromChildTableDetails, isSqlResolverD, SqlGetDetails, SqlResolverD } from "../example/jointAccount/jointAccount.restD";

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
  return d.table != undefined

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
  return d.schema === undefined
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
  oneDataD?: OneDataDD<any>;
  child: CompDataD<any>;
}


export interface FoundParentChildProps {
  stopAtRepeat?: boolean;
}

export function findParentChildCompDataLinks<G> ( props: FoundParentChildProps, d: CompDataD<G> ): FoundParentChildLink[] {
  const folder: ParentChildFoldFn<FoundParentChildLink[]> = ( acc: FoundParentChildLink[], parent: CompDataD<any>, oneDataD: OneDataDD<any> | undefined, child: AllDataDD<any> ) => {
    if ( isPrimDd ( child ) ) return acc
    return [ ...acc, { parent, oneDataD, child } ]
  }
  return walkParentChildCompDataLinks<FoundParentChildLink[]> ( props, d, folder, [] )

  // return makeLinksForChild ( d )
}


export interface FoundChildAndAlias extends FoundParentChildLink {
  aliasMap: NameAnd<DBTableAndMaybeName>
}
export interface FoundChildAcc {
  links: FoundChildAndAlias[];
  aliasMap: NameAnd<DBTableAndMaybeName>
}
export function findParentChildAndAliases<G> ( props: FoundParentChildProps, d: CompDataD<G>, sqlG: SqlGetDetails ): FoundChildAcc {
  const folder: ParentChildFoldFn<FoundChildAcc> = ( acc: FoundChildAcc, parent: CompDataD<any>, oneDataD: OneDataDD<any> | undefined, child: AllDataDD<any> ) => {
    if ( isPrimDd ( child ) ) return acc
    const found: GetSqlFromChildTableDetails | undefined = sqlG.sql.find ( ( { data, aliases } ) => data === oneDataD );
    const aliasMap: NameAnd<DBTableAndMaybeName> = found ? { ...acc.aliasMap, ...found.aliases } : acc.aliasMap
    const links = [ ...acc.links, { parent, oneDataD, child, aliasMap } ]
    return { links, aliasMap }
  }
  return walkParentChildCompDataLinks<FoundChildAcc> ( props, d, folder, { links: [], aliasMap: sqlG.aliases } )
}

export type ParentChildFoldFn<Acc> = ( acc: Acc, parent: CompDataD<any>, oneDataD: OneDataDD<any> | undefined, child: AllDataDD<any> ) => Acc

export function walkParentChildCompDataLinks<Acc> ( { stopAtRepeat }: FoundParentChildProps, d: CompDataD<any>, folder: ParentChildFoldFn<Acc>, zero: Acc ) {
  function makeLinksForChild ( acc: Acc, d: CompDataD<any> ): Acc {
    if ( isRepeatingDd ( d ) ) return makeLinksForParentChild ( acc, d, undefined, d.dataDD )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).reduce ( ( acc, [ name, data ] ) => makeLinksForParentChild ( acc, d, data, data.dataDD ), acc )
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeLinksForParentChild ( acc: Acc, parent: CompDataD<any>, oneDataD: OneDataDD<any> | undefined, child: AllDataDD<any> ): Acc {
    if ( stopAtRepeat && isRepeatingDd ( child ) ) return acc;
    if ( isPrimDd ( child ) ) return acc
    return makeLinksForChild ( folder ( acc, parent, oneDataD, child ), child )
  }
  return makeLinksForChild ( zero, d )
}






