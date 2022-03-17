import { NameAnd, RestAction } from "@focuson/utils";
import { AllDataDD, CompDataD, isDataDd, isPrimDd, isRepeatingDd, OneDataDD } from "./dataD";

export interface ResolverTree {
  main: ResolverD;
  dataD: CompDataD<any>;
  children: ResolverTree[]
}

export type ResolverD = SqlResolverD | 'not defined yet'
export type ResolverOrDb = ResolverD | DbValues

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

export interface SqlResolverD {
  /** he key is the alias and the value is the table name
   * The tablename needs to match names in the DataD. The same table can be in multiple times*/
  tables: NameAnd<String>
  /* The hand coded where clause. It's unclear what we do about paging and stuff */
  where: string;
}

/** This is 'are you a resolver or a data. As we add more types than sql resolver, we'll need this */
export const isResolver = isSqlResolverD

export function isSqlResolverD ( r: ResolverD ): r is SqlResolverD {
  // @ts-ignore
  return r.sql !== undefined
}


export function findParentChildCompDataLinks<G> ( d: CompDataD<G> ): [ CompDataD<G>, CompDataD<G> ][] {
  function makeLinksForChild ( d: CompDataD<G> ): [ CompDataD<G>, CompDataD<G> ][] {
    if ( isRepeatingDd ( d ) ) return makeParentChildrenStopping ( d, d.dataDD )
    if ( isDataDd ( d ) ) return Object.entries ( d.structure ).flatMap ( ( [ name, data ] ) => makeParentChildrenStopping ( d, data.dataDD ) )
    throw Error ( `Cannot process dataD ${d}` )
  }
  function makeParentChildrenStopping ( parent: CompDataD<G>, child: AllDataDD<G> ): [ CompDataD<G>, CompDataD<G> ][] {
    if ( isPrimDd ( child ) ) return []
    return [ [ parent, child ], ...makeLinksForChild ( d ) ]
  }
  return makeLinksForChild ( d )
}