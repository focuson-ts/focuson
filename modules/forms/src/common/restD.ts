import { CompDataD, findAllDataDs, findDataDDIn } from "./dataD";
import { NameAnd, RestAction, safeArray, safeObject, sortedEntries, toArray } from "@focuson/utils";
import { filterParamsByRestAction } from "../codegen/codegen";
import { AccessDetails, DBTable, MutationsForRestAction, Mutations, MutationDetail } from "./resolverD";
import { MainEntity, WhereFromQuery } from "../codegen/makeSqlFromEntities";
import { allMainPages, MainPageD, PageD, RestDefnInPageProperties } from "./pageD";
import { getRestTypeDetails, RestActionDetail } from "@focuson/rest";
import { findChildResolvers, ResolverData } from "../codegen/makeJavaFetchersInterface";


export type AllLensRestParams<T> = CommonLensRestParam<T> | LensRestParam<T>

export interface ParamPrim<T> {
  rsSetter: string,
  javaType: string,
  graphQlType: string
  javaParser: string
}
export const StringParam: ParamPrim<string> = {
  rsSetter: 'setString',
  javaType: 'String',
  graphQlType: 'String',
  javaParser: ''
}
export const IntParam: ParamPrim<number> = {
  rsSetter: 'setInt',
  javaType: 'int',
  graphQlType: 'Int',
  javaParser: 'Integer.parseInt'
}

export interface CommonLensRestParam<T> extends ParamPrim<T> {
  commonLens: string,
  testValue: T,
  main?: boolean,
  rsSetter: string;
  javaType: string;
  graphQlType: string;
  javaParser: string;
}
export interface LensRestParam<T> extends ParamPrim<T> {
  lens: string,
  testValue: string,
  main?: boolean,
  rsSetter: string;
  javaType: string;
  graphQlType: string;
  javaParser: string;
}

export function isCommonLens<T> ( a: AllLensRestParams<T> ): a is CommonLensRestParam<T> {
  // @ts-ignore
  return a.commonLens !== undefined
}
export function isRestLens<T> ( a: AllLensRestParams<T> ): a is LensRestParam<T> {
  // @ts-ignore
  return a.lens !== undefined
}

export interface RestParams {
  [ name: string ]: AllLensRestParams<any>
}

export function postFixForEndpoint<G> ( restAction: RestAction ) {
  return '' //restAction === 'list' ? "/list" : ""
}

export interface OneTableInsertSqlStrategyForNoIds {
  type: string
  table: DBTable;
}

export interface RestStateDetails {
  url: string;
  params: string[]
}

export interface RestD<G> {
  /** Only used for dedupping when the dataDd is repeated */
  namePrefix?: string;
  params: RestParams,
  dataDD: CompDataD<G>,
  url: string,
  actions: RestAction[];
  /** @deprecated Replaced with ManualSqlStrategy */
  initialSql?: string[];
  // strategy?: InsertSqlStrategy | InsertSqlStrategy[];
  insertSqlStrategy?: OneTableInsertSqlStrategyForNoIds;
  states?: NameAnd<RestStateDetails>;
  access?: AccessDetails[];
  audits?: any[] //doesn't do anything. Is just for legacy
  mutations?: MutationsForRestAction[];
  resolvers?: NameAnd<Mutations>;
  tables?: EntityAndWhere;
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
  return flatMapRest ( pages, p => ( r, restName, rdp ) => findChildResolvers ( r ).map ( ( resolverData ) => fn ( p ) ( r, restName, rdp ) ( resolverData ) ) )
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

export function foldPagesToRestToMutationsAndResolvers<Acc> ( ps: MainPageD<any, any>[], acc: Acc, fn: ( mut: MutationDetail, p: MainPageD<any, any>, r: RestD<any> ) => ( acc: Acc ) => Acc ): Acc {
  return ps.reduce ( ( acc, p ) => Object.entries ( p.rest ).reduce ( ( acc, [ name, rdp ] ) => {
    const mutationsAcc = toArray ( rdp.rest.mutations ).flatMap ( mr => toArray ( mr.mutateBy ) ).reduce ( ( acc, m ) => fn ( m, p, rdp.rest ) ( acc ), acc )
    const resolvers = Object.values ( safeObject ( rdp.rest.resolvers ) ).flatMap ( res => toArray ( res ) ).reduce ( ( acc, md ) => fn ( md, p, rdp.rest ) ( acc ), mutationsAcc )
    return resolvers
  }, acc ), acc )
}

