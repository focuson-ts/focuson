import { CompDataD, findAllDataDs, findDataDDIn } from "./dataD";
import { NameAnd, RestAction, safeObject, safeString, sortedEntries, toArray, unique } from "@focuson/utils";
import { paramsForRestAction } from "../codegen/codegen";
import { AccessDetails, GuardedMutation, MutationDetail, Mutations, MutationsForRestAction, SelectMutation } from "./resolverD";
import { MainEntity, WhereFromQuery } from "../codegen/makeSqlFromEntities";
import { allMainPages, MainPageD, PageD, RestDefnInPageProperties } from "./pageD";
import { getRestTypeDetails, RestActionDetail, restActionForName, UrlAndParamsForState } from "@focuson/rest";
import { findChildResolvers, ResolverData } from "../codegen/makeJavaFetchersInterface";


export type AllLensRestParams<T> = CommonLensRestParam<T> | LensRestParam<T> | HeaderRestParam<T>

export interface ParamPrim<T> {
  rsSetter: string,
  javaType: string,
  graphQlType: string
  javaParser: string
  typeScriptType: string
}
export const StringParam: ParamPrim<string> = {
  rsSetter: 'setString',
  javaType: 'String',
  graphQlType: 'String',
  typeScriptType: 'string',
  javaParser: ''
}
export const IntParam: ParamPrim<number> = {
  rsSetter: 'setInt',
  javaType: 'int',
  graphQlType: 'Int',
  typeScriptType: 'number',
  javaParser: 'Integer.parseInt'
}
export const FloatParam: ParamPrim<number> = {
  rsSetter: 'setDouble',
  javaType: 'Double',
  graphQlType: 'Float',
  typeScriptType: 'number',
  javaParser: 'Double.parseDouble'
}

export interface HeaderRestParam<T> extends ParamPrim<T> {
  header: string,
  testValue: T,
  main?: false,
  rsSetter: string;
  javaType: string;
  graphQlType: string;
  javaParser: string;
  annotation?: string;
}

export interface CommonLensRestParam<T> extends ParamPrim<T> {
  commonLens: string,
  testValue: T,
  main?: boolean,
  rsSetter: string;
  javaType: string;
  graphQlType: string;
  javaParser: string;
  annotation?: string;
}
export interface LensRestParam<T> extends ParamPrim<T> {
  lens: string,
  testValue: T,
  main?: boolean,
  rsSetter: string;
  javaType: string;
  graphQlType: string;
  javaParser: string;
  annotation?: string;
}

export function isCommonLens<T> ( a: AllLensRestParams<T> ): a is CommonLensRestParam<T> {
  // @ts-ignore
  return a.commonLens !== undefined
}
export function isRestLens<T> ( a: AllLensRestParams<T> ): a is LensRestParam<T> {
  // @ts-ignore
  return a.lens !== undefined
}
export function isHeaderLens<T> ( a: AllLensRestParams<T> ): a is HeaderRestParam<T> {
  // @ts-ignore
  return a.header !== undefined
}

export interface RestParams {
  [ name: string ]: AllLensRestParams<any>
}

export function postFixForEndpoint<G> ( restAction: RestAction ) {
  return '' //restAction === 'list' ? "/list" : ""
}

export interface InsertSqlStrategyInterface {
  type: string
}

export interface OneTableInsertSqlStrategyForNoIds {
  type: 'WithoutId';
  // table: DBTable;
}

export interface OneTableInsertSqlStrategyForIds {
  type: 'WithId';
  // table: DBTable;
  idOffset: number;
  idField: string;
}

export type RestStateDetails = {
  url: string;
  params: RestParams;
  bodyFrom?: string;
  returns?: string[]
  mergeDataOnResponse?: boolean
}
export function stateToNameAndUrlAndParamsForState ( state: NameAnd<RestStateDetails> |undefined): NameAnd<UrlAndParamsForState> {
  return Object.fromEntries ( Object.entries (safeObject( state )).map ( ( [ name, { url, params } ] ) => [ name, { url, params: Object.keys ( params ) } ] ) );
}

export interface RestD<G> {
  /** Only used for dedupping when the dataDd is repeated */
  namePrefix?: string;
  description?: string;
  notes?: string;
  authorisation?: string;
  params: RestParams,
  dataDD: CompDataD<G>,
  url: string,
  actions: RestAction[];
  /** @deprecated Replaced with ManualSqlStrategy */
  initialSql?: string[];
  /** @deprecated Moved to be inside Entity */
  insertSqlStrategy?: any;
  states?: NameAnd<RestStateDetails>;
  access?: AccessDetails[];
  audits?: any[] //doesn't do anything. Is just for legacy
  mutations?: MutationsForRestAction[];
  resolvers?: NameAnd<Mutations>;
  tables?: EntityAndWhere;
}


export type InsertSqlStrategy = OneTableInsertSqlStrategyForIds | OneTableInsertSqlStrategyForNoIds | ManualSqlStrategy

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
  return unique<[ RestD<G>, RestAction, RestActionDetail ]> ( nonUnique, ( [ restD, a, rad ] ) => restD.dataDD.name + safeString ( restD.namePrefix ) + "," + restActionForName ( a ) )
}

export function findUniqueDataDsIn<G> ( rs: RestD<G>[] ): CompDataD<G>[] {
  return unique ( Object.values ( findAllDataDs ( rs.map ( r => r.dataDD ) ) ), d => d.name )
}

export function makeParamValueForTest<G> ( errorPrefix: string, r: RestD<G>, restAction: RestAction ) {
  let visibleParams = paramsForRestAction ( errorPrefix, r, restAction );
  // const paramsInCorrectOrder = [ ...visibleParams.filter ( ( [ name, p ] ) => isRestLens ( p ) ), ...visibleParams.filter ( ( [ name, p ] ) => !isRestLens ( p ) ) ]
  return Object.fromEntries ( visibleParams.map ( ( [ name, v ] ) => [ name, v.testValue.toString () ] ) )
}
export function makeCommonValueForTest<G> ( errorPrefix: string, r: RestD<G>, restAction: RestAction ) {
  let visibleParams = paramsForRestAction ( errorPrefix, r, restAction );
  return Object.fromEntries ( visibleParams.filter ( ( [ name, p ] ) => isCommonLens ( p ) || isHeaderLens ( p ) ).map ( ( [ name, v ] ) => [ name, v.testValue ] ) )
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

export function flatMapParams<T> ( pds: MainPageD<any, any>[], fn: ( p: MainPageD<any, any>, restName: string | undefined, r: RestD<any> | undefined, name: string, c: AllLensRestParams<any> ) => T[] ): T[] {
  const fromPage: T[] = pds.flatMap ( page => sortedEntries ( page.commonParams ).flatMap ( ( [ name, c ] ) => fn ( page, undefined, undefined, name, c ) ) )
  const fromRest: T[] = flatMapRest ( pds, ( page ) => ( rest, restName ) =>
    sortedEntries ( rest.params ).flatMap ( ( [ name, c ] ) => fn ( page, restName, rest, name, c ) ) )
  const fromState: T[] = flatMapRest ( pds, ( page ) => ( rest, restName ) =>
    sortedEntries ( rest.states ).flatMap ( ( [ name, s ] ) => sortedEntries ( s.params ).flatMap ( ( [ name, p ] ) => (fn ( page, restName, rest, name, p )) ) ) )
  return [ ...fromRest, ...fromPage, ...fromState ]
}
export function flatMapCommonParams<T> ( pds: MainPageD<any, any>[], fn: ( p: MainPageD<any, any>, restName: string | undefined, r: RestD<any> | undefined, name: string, c: CommonLensRestParam<any> ) => T[] ): T[] {
  return flatMapParams ( pds, ( p, restName, r, name, c ) =>
    isCommonLens ( c ) ? fn ( p, restName, r, name, c ) : isHeaderLens ( c ) ? fn ( p, restName, r, name, { ...c, commonLens: c.header } ) : [] )
}


export function forEachRest<B, G> ( ps: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => void ) {
  return allMainPages ( ps ).forEach ( p => sortedEntries ( p.rest ).forEach ( ( [ restName, rdp ] ) => fn ( p ) ( rdp.rest, restName, rdp ) ) )

}
export function forEachRestAndActions<B, G> ( ps: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( action: RestAction ) => void ) {
  return allMainPages ( ps ).forEach ( p => sortedEntries ( p.rest ).forEach ( ( [ restName, rdp ] ) => rdp.rest.actions.forEach ( a => fn ( p ) ( rdp.rest, restName, rdp ) ( a ) ) ) )
}

export interface MutuationAndResolverFolder<Acc> {
  simple: ( mut: MutationDetail, p: MainPageD<any, any>, r: RestD<any> ) => ( acc: Acc ) => Acc;
  guarded: ( mut: SelectMutation, guarded: GuardedMutation, p: MainPageD<any, any>, r: RestD<any> ) => ( acc: Acc ) => Acc;
}
export function foldPagesToRestToMutationsAndResolvers<Acc> ( ps: MainPageD<any, any>[], acc: Acc, folder: MutuationAndResolverFolder<Acc> ): Acc {
  return ps.reduce ( ( acc, p ) => Object.entries ( p.rest ).reduce ( ( acc, [ name, rdp ] ) => {
    if ( rdp.rest === undefined ) throw Error ( `Error in page ${p.name}.rest[${name}]. The rest is undefined.\n    ${JSON.stringify ( rdp )}` )
    const mutationsAcc = toArray ( rdp.rest.mutations ).flatMap ( mr => toArray ( mr.mutateBy ) ).reduce ( ( acc, m ) => {
      let simple = folder.simple ( m, p, rdp.rest ) ( acc );
      if ( m.type !== 'case' ) return simple;
      return m.select.reduce ( ( acc, g ) => folder.guarded ( m, g, p, rdp.rest ) ( acc ), simple )
    }, acc )
    const resolvers = Object.values ( safeObject ( rdp.rest.resolvers ) ).flatMap ( res => toArray ( res ) ).reduce ( ( acc, md ) => folder.simple ( md, p, rdp.rest ) ( acc ), mutationsAcc )
    return resolvers
  }, acc ), acc )
}