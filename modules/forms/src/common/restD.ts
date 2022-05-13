import { CompDataD, findAllDataDs, findDataDDIn } from "./dataD";
import { NameAnd, RestAction, safeArray, sortedEntries } from "@focuson/utils";
import { filterParamsByRestAction } from "../codegen/codegen";
import {AccessDetails, AuditDetail, DBTable, ResolverD, Schema} from "./resolverD";
import { MainEntity, WhereFromQuery } from "../codegen/makeSqlFromEntities";
import { allMainPages, MainPageD, PageD, RestDefnInPageProperties } from "./pageD";
import { getRestTypeDetails, RestActionDetail, StateAccessDetails } from "@focuson/rest";
import { findChildResolvers, ResolverData } from "../codegen/makeJavaFetchersInterface";


export type AllLensRestParams = CommonLensRestParam | LensRestParam

export const StringParam = {
  rsSetter: 'setString',
  javaType: 'String',
  javaParser: ''
}
export const IntParam = {
  rsSetter: 'setInt',
  javaType: 'int',
  javaParser: 'Integer.parseInt'
}

export interface CommonLensRestParam {
  commonLens: string,
  testValue: string,
  main?: boolean,
  rsSetter: string;
  javaType: string;
  javaParser: string;
}
export interface LensRestParam {
  lens: string,
  testValue: string,
  main?: boolean,
  rsSetter: string;
  javaType: string;
  javaParser: string;
}

export function isCommonLens ( a: AllLensRestParams ): a is CommonLensRestParam {
  // @ts-ignore
  return a.commonLens !== undefined
}
export function isRestLens ( a: AllLensRestParams ): a is LensRestParam {
  // @ts-ignore
  return a.lens !== undefined
}

export interface RestParams {
  [ name: string ]: AllLensRestParams
}

export function postFixForEndpoint<G> ( restAction: RestAction ) {
  return '' //restAction === 'list' ? "/list" : ""
}
//  states: {
//     invalidate: {url: '/api/accountsSummary/invalidate?{query}', useStoredProcedure: {  schema: onlySchema, name: 'sda', params: ['accountId', 'customerId']}}
//   }
export interface StoredProcedureForStateDetails {
  schema: Schema,
  name: string,
  params: string[]
}
export interface RestStateDetailsUsingStoredProcedure {
  url: string,
  useStoredProcedure: StoredProcedureForStateDetails
}

// export interface InsertSqlStrategy {
//   type: string
// }
export interface OneTableInsertSqlStrategyForNoIds {
  type: string
  table: DBTable;
}

export function isRestStateDetailsUsingStoredProcedure ( r: RestStateDetails ): r is RestStateDetailsUsingStoredProcedure {
  // @ts-ignore
  return r.useStoredProcedure !== undefined
}

export interface SqlForStateDetails {
  schema: Schema;
  sql: string;
  params: string[]

}
export interface RestStateDetailsUsingSql {
  url: string,
  useSql: SqlForStateDetails
}
export function isRestStateDetailsUsingSql ( r: RestStateDetails ): r is RestStateDetailsUsingStoredProcedure {
  // @ts-ignore
  return r.useSql !== undefined
}
export type  RestStateDetails = RestStateDetailsUsingStoredProcedure | RestStateDetailsUsingSql

export interface RestD<G> {
  /** Only used for dedupping when the dataDd is repeated */
  namePrefix?: string;
  params: RestParams,
  dataDD: CompDataD<G>,
  url: string,
  actions: RestAction[];
  resolver?: ResolverD;
  /** @deprecated Replaced with ManualSqlStrategy */
  initialSql?: string[];
  // strategy?: InsertSqlStrategy | InsertSqlStrategy[];
  strategy?: OneTableInsertSqlStrategyForNoIds;
  tables?: EntityAndWhere;
  states?: NameAnd<RestStateDetails>;
  access?: AccessDetails[];
  audit?: AuditDetail[];
}

type InsertSqlStrategy = OneTableInsertSqlStrategyForNoIds | ManualSqlStrategy

export interface ManualSqlStrategy {
  type: "Manual"
  sql: string[]
}

export interface EntityAndWhere {
  entity: MainEntity;
  where: WhereFromQuery[],
  staticWhere?: string
}

export const actionDetails = <G> ( r: RestD<G> ): RestActionDetail[] => r.actions.map ( getRestTypeDetails );

export function flapMapActionDetails<Acc, G> ( r: RestD<G>, fn: ( r: RestD<G>, rt: RestActionDetail ) => Acc[] ): Acc[] {
  return actionDetails ( r ).flatMap ( rt => fn ( r, rt ) )
}

export interface MustConstructForRest<G> {
  objs: CompDataD<G>[],
  input: CompDataD<G>[],
  // inputWithId: DataD[]
}

export function findMustConstructForRest<G> ( rs: RestD<G>[] ): MustConstructForRest<G> {
  const objs = new Set<CompDataD<G>> ()
  const input = new Set<CompDataD<G>> ()
  // const inputWithId = new Set<DataD> ()
  rs.flatMap ( findDataDsAndRestTypeDetails ).forEach ( ( [ d, rt ] ) => {

    if ( rt.params.needsObj ) if ( rt.params.needsId ) input.add ( d ); else input.add ( d )
    if ( rt.output.needsObj ) objs.add ( d )

  } )
  function ordered ( ds: Set<CompDataD<G>> ) {return [ ...ds ].sort ( ( a, b ) => a.name.localeCompare ( b.name ) )}
  return { objs: ordered ( objs ), input: ordered ( input ) }
}

export function findDataDsAndRestTypeDetails<G> ( r: RestD<G> ): [ CompDataD<G>, RestActionDetail ][] {
  return flapMapActionDetails ( r, ( r, rt ) => findDataDDIn ( r.dataDD ).map ( dataD => [ dataD, rt ] ) )
}
export function findUniqueDataDsAndRestTypeDetails<G> ( rs: RestD<G>[] ): [ RestD<G>, RestAction, RestActionDetail ][] {
  const nonUnique: [ RestD<G>, RestAction, RestActionDetail ][] = rs.flatMap ( r => {
    var x: [ RestD<G>, RestAction, RestActionDetail ][] = r.actions.map ( a => [ r, a, getRestTypeDetails ( a ) ] )
    return x
  } )
  return unique<[ RestD<G>, RestAction, RestActionDetail ]> ( nonUnique, ( [ restD, a, rad ] ) => restD.dataDD.name + "," + a )
}

export function findUniqueDataDsIn<G> ( rs: RestD<G>[] ): CompDataD<G>[] {
  return unique ( Object.values ( findAllDataDs ( rs.map ( r => r.dataDD ) ) ), d => d.name )
}

export function unique<T> ( ts: T[] | undefined, tagFn: ( t: T ) => string ): T[] {
  const alreadyIn: Set<string> = new Set ()
  var result: T[] = []
  safeArray ( ts ).forEach ( t => {
    const tag = tagFn ( t );
    if ( !alreadyIn.has ( tag ) ) {
      result.push ( t );
      alreadyIn.add ( tag )
    }
  } )
  return result
}

export function makeParamValueForTest<G> ( r: RestD<G>, restAction: RestAction ) {
  let visibleParams = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) );
  // const paramsInCorrectOrder = [ ...visibleParams.filter ( ( [ name, p ] ) => isRestLens ( p ) ), ...visibleParams.filter ( ( [ name, p ] ) => !isRestLens ( p ) ) ]
  return Object.fromEntries ( visibleParams.map ( ( [ name, v ] ) => [ name, v.testValue ] ) )
}
export function makeCommonValueForTest<G> ( r: RestD<G>, restAction: RestAction ) {
  let visibleParams = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) );
  return Object.fromEntries ( visibleParams.filter ( ( [ name, p ] ) => isCommonLens ( p ) ).map ( ( [ name, v ] ) => [ name, v.testValue ] ) )
}

export function findIds<G> ( rest: RestD<G> ) {
  const ids = sortedEntries ( rest.params ).filter ( t => !t[ 1 ].main ).map ( ( [ name, value ] ) => name )
  const resourceIds = sortedEntries ( rest.params ).filter ( t => t[ 1 ].main ).map ( ( [ name, value ] ) => name )
  return [ ids, resourceIds ]

}

export function flatMapRestAndActions<B, G, T> ( ps: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G> ) => ( action: RestAction ) => T[] ): T[] {
  return allMainPages ( ps ).flatMap ( p => sortedEntries ( p.rest ).flatMap ( ( [ name, rdp ] ) => rdp.rest.actions.flatMap ( a => fn ( p ) ( rdp.rest ) ( a ) ) ) )
}
export function mapRestAndActions<B, G, T> ( pages: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G> ) => ( action: RestAction ) => T ): T[] {
  return allMainPages ( pages ).flatMap ( p => sortedEntries ( p.rest ).flatMap ( ( [ name, rdp ] ) => rdp.rest.actions.map ( a => fn ( p ) ( rdp.rest ) ( a ) ) ) )
}
export function mapRest<B, G, T> ( pages: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => T ): T[] {
  return allMainPages ( pages ).flatMap ( p => sortedEntries ( p.rest ).map ( ( [ name, rdp ] ) => fn ( p ) ( rdp.rest, name, rdp ) ) )
}
export function flatMapRest<B, G, T> ( pages: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => T[] ): T[] {
  return allMainPages ( pages ).flatMap ( p => sortedEntries ( p.rest ).flatMap ( ( [ name, rdp ] ) => fn ( p ) ( rdp.rest, name, rdp ) ) )
}
export function mapRestAndResolver<B, G, T> ( pages: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( resolver: ResolverData, ) => T ): T[] {
  return flatMapRest ( pages, p => ( r, restName, rdp ) => findChildResolvers ( r ).map ( (resolverData) => fn ( p ) ( r, restName, rdp ) ( resolverData ) ) )
}
export function flatMapRestAndResolver<B, G, T> ( pages: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( resolver: ResolverData, ) => T[] ): T[] {
  return flatMapRest ( pages, p => ( r, restName, rdp ) => findChildResolvers ( r ).flatMap ( resolverData => fn ( p ) ( r, restName, rdp ) ( resolverData ) ) )
}


export function forEachRest<B, G> ( ps: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => void ) {
  return allMainPages ( ps ).forEach ( p => sortedEntries ( p.rest ).forEach ( ( [ restName, rdp ] ) => fn ( p ) ( rdp.rest, restName, rdp ) ) )

}
export function forEachRestAndActions<B, G> ( ps: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( action: RestAction ) => void ) {
  return allMainPages ( ps ).forEach ( p => sortedEntries ( p.rest ).forEach ( ( [ restName, rdp ] ) => rdp.rest.actions.forEach ( a => fn ( p ) ( rdp.rest, restName, rdp ) ( a ) ) ) )
}