import { NameAnd } from "@focuson/utils";

export type ResolverD = SqlResolverD | string


export interface SqlResolverD {
  name: string;
  /** The sql query. If a DataD or primitive, only one row will be read. if  repeating block... then multiple
   * PrimitiveDDs can have alias and field names, they must relate to this*/
  sql: string;
  /** Not sure how we will do params yet. examples... paging*/
  params: NameAnd<string>;
}

export function getName(r: ResolverD){
  if ( isSqlResolverD ( r ) ) return r.name
  if ( typeof r === 'string' ) return r
  throw new Error(`Don't know how to getName for ${r}`)
}

export function isSqlResolverD ( r: ResolverD ): r is SqlResolverD {
  // @ts-ignore
  return r.sql !== undefined
}

