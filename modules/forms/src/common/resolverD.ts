import { NameAnd, RestAction } from "@focuson/utils";
import { AllDataDD, CompDataD, isDataDd, isPrimDd, isRepeatingDd, OneDataDD } from "./dataD";
import { SqlGetDetails, SqlResolverD } from "../example/jointAccount/jointAccount.restD";
import { RestD } from "./restD";
import { rest } from "@focuson/rest";

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

/** This is 'are you a resolver or a data. As we add more types than sql resolver, we'll need this */
export const isResolver = isSqlResolverD

export function isSqlResolverD ( r: ResolverD ): r is SqlResolverD {
  // @ts-ignore
  return r.sql !== undefined
}

export interface FoundParentChildLink<G> {
  parent: CompDataD<G>;
  /** If missing the parent will be a repeating block */
  oneDataD?: OneDataDD<G>;
  child: CompDataD<G>;
}

export function findParentChildCompDataLinks<G> ( d: CompDataD<G> ): FoundParentChildLink<G>[] {
  function makeLinksForChild ( d: CompDataD<G> ): FoundParentChildLink<G>[] {
    // console.log('makeLinksForChild', d.name)
    if ( isRepeatingDd ( d ) ) return makeLinksForParentChild ( d, undefined, d.dataDD )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).flatMap ( ( [ name, data ] ) => makeLinksForParentChild ( d, data, data.dataDD ) )
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeLinksForParentChild ( parent: CompDataD<G>, oneDataD: OneDataDD<G> | undefined, child: AllDataDD<G> ): FoundParentChildLink<G>[] {
    // console.log('makeLinksForParentChild', parent.name, child.name)
    if ( isPrimDd ( child ) ) return []
    return [ { parent, oneDataD, child }, ...makeLinksForChild ( child ) ]
  }
  return makeLinksForChild ( d )
}

export function findAliasMap<G>(s: SqlGetDetails, main: CompDataD<G>){
  const result = new Map()
  result.set('main', main.)
  s.sql.forEach(({data, aliases})=>)

}