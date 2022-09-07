import { CompDataD, findAllDataDs, findDataDDIn } from "./dataD";
import { NameAnd, RestAction, safeObject, safeString, sortedEntries, toArray, unique } from "@focuson/utils";
import { paramsForRestAction } from "../codegen/codegen";
import { AccessDetails, GuardedMutation, MutationDetail, MutationsForRestAction, PrimaryMutationDetail, PrimaryMutations, SelectMutation } from "./resolverD";
import { MainEntity, WhereFromQuery } from "../codegen/makeSqlFromEntities";
import { allMainPages, MainPageD, PageD, RefD, RestDefnInPageProperties } from "./pageD";
import { getRestTypeDetails, RestActionDetail, restActionForName, UrlAndParamsForState } from "@focuson/rest";
import { findChildResolvers, ResolverData } from "../codegen/makeJavaFetchersInterface";


export type AllLensRestParams<T> = CommonLensRestParam<T> | LensRestParam<T>

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


export interface CommonLensRestParam<T> extends ParamPrim<T> {
  commonLens: string,
  testValue: T,
  main?: boolean,
  rsSetter: string;
  javaType: string;
  graphQlType: string;
  javaParser: string;
  annotation?: string;
  inJwtToken?: boolean
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
export function stateToNameAndUrlAndParamsForState ( state: NameAnd<RestStateDetails> | undefined ): NameAnd<UrlAndParamsForState> {
  return Object.fromEntries ( Object.entries ( safeObject ( state ) ).map ( ( [ name, { url, params } ] ) => [ name, { url, params: Object.keys ( params ) } ] ) );
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
  resolvers?: NameAnd<PrimaryMutations>;
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
  orderBy?: string | string[];
  noDataIs404?: boolean;
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
export function mapRestAndActions<G, T> ( refs: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G> ) => ( action: RestAction ) => T ): T[] {
  return refs.flatMap ( p => sortedEntries ( p.rest ).flatMap ( ( [ name, rdp ] ) => rdp.rest.actions.map ( a => fn ( p ) ( rdp.rest ) ( a ) ) ) )
}
export function mapRest<B, G, T> ( pages: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => T ): T[] {
  return allMainPages ( pages ).flatMap ( p => sortedEntries ( p.rest ).map ( ( [ name, rdp ] ) => fn ( p ) ( rdp.rest, name, rdp ) ) )
}
export function flatMapRest<G, T> ( refs: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => T[] ): T[] {
  return refs.flatMap ( p => sortedEntries ( p.rest ).flatMap ( ( [ name, rdp ] ) => fn ( p ) ( rdp.rest, name, rdp ) ) )
}
export function flatMapRestAndRefs<B, G, T> ( pages: PageD<B, G>[], refs: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => T[] ): T[] {
  return [ ...refs, ...allMainPages ( pages ) ].flatMap ( p => sortedEntries ( p.rest ).flatMap ( ( [ name, rdp ] ) => fn ( p ) ( rdp.rest, name, rdp ) ) )
}
export function mapRestAndResolver<B, G, T> ( refs: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( resolver: ResolverData, ) => T ): T[] {
  return flatMapRest ( refs, p => ( r, restName, rdp ) => findChildResolvers ( r ).map ( ( resolverData ) => fn ( p ) ( r, restName, rdp ) ( resolverData ) ) )
}
export function mapRestAndResolverincRefs<B, G, T> ( pages: PageD<B, G>[], refs: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( resolver: ResolverData, ) => T ): T[] {
  return flatMapRestAndRefs ( pages, refs, p => ( r, restName, rdp ) => findChildResolvers ( r ).map ( ( resolverData ) => fn ( p ) ( r, restName, rdp ) ( resolverData ) ) )
}
export function flatMapRestAndResolver<G, T> ( pages: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( resolver: ResolverData, ) => T[] ): T[] {
  return flatMapRest ( pages, p => ( r, restName, rdp ) => findChildResolvers ( r ).flatMap ( resolverData => fn ( p ) ( r, restName, rdp ) ( resolverData ) ) )
}

export function flatMapParams<T> ( pds: RefD<any>[], fn: ( p: RefD<any>, restName: string | undefined, r: RestD<any> | undefined, name: string, c: AllLensRestParams<any> ) => T[] ): T[] {
  const fromPage: T[] = pds.flatMap ( page => sortedEntries ( page.commonParams ).flatMap ( ( [ name, c ] ) => fn ( page, undefined, undefined, name, c ) ) )
  const fromRest: T[] = flatMapRestAndRefs ( [], pds, ( page ) => ( rest, restName ) =>
    sortedEntries ( rest.params ).flatMap ( ( [ name, c ] ) => fn ( page, restName, rest, name, c ) ) )
  const fromState: T[] = flatMapRestAndRefs ( [], pds, ( page ) => ( rest, restName ) =>
    sortedEntries ( rest.states ).flatMap ( ( [ name, s ] ) => sortedEntries ( s.params ).flatMap ( ( [ name, p ] ) => (fn ( page, restName, rest, name, p )) ) ) )
  return [ ...fromRest, ...fromPage, ...fromState ]
}
export function flatMapCommonParams<T> ( pds: RefD<any>[], fn: ( p: RefD<any>, restName: string | undefined, r: RestD<any> | undefined, name: string, c: CommonLensRestParam<any> ) => T[] ): T[] {
  return flatMapParams ( pds, ( p, restName, r, name, c ) =>
    isCommonLens ( c ) ? fn ( p, restName, r, name, c ) :  [] )
}


export function forEachRest<B, G> ( ps: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => void ) {
  return ps.forEach ( p => sortedEntries ( p.rest ).forEach ( ( [ restName, rdp ] ) => fn ( p ) ( rdp.rest, restName, rdp ) ) )

}
export function forEachRestAndActions<B, G> ( ps: PageD<B, G>[], fn: ( p: MainPageD<B, G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( action: RestAction ) => void ) {
  return allMainPages ( ps ).forEach ( p => sortedEntries ( p.rest ).forEach ( ( [ restName, rdp ] ) => rdp.rest.actions.forEach ( a => fn ( p ) ( rdp.rest, restName, rdp ) ( a ) ) ) )
}
export function forEachRestAndActionsUsingRefs<B, G> ( ps: PageD<B, G>[], refs: RefD<G>[], fn: ( p: RefD<G> ) => ( r: RestD<G>, restName: string, rdp: RestDefnInPageProperties<G> ) => ( action: RestAction ) => void ) {
  const frompages: RefD<G>[] = allMainPages ( ps );
  const allNamed = [ ...frompages, ...refs ]
  return allNamed.forEach ( p => sortedEntries ( p.rest ).forEach ( ( [ restName, rdp ] ) => rdp.rest.actions.forEach ( a => fn ( p ) ( rdp.rest, restName, rdp ) ( a ) ) ) )
}

export interface MutuationAndResolverFolder<G, Acc> {
  simple: ( mut: MutationDetail, index: string, p: RefD<G>, restName: string, rdp: RestDefnInPageProperties<G>, r: RestD<any>, resolverName: string | undefined ) => ( acc: Acc ) => Acc;
  guarded: ( mut: SelectMutation, guarded: GuardedMutation, index: string, p: RefD<G>, restName: string, rdp: RestDefnInPageProperties<G>, r: RestD<any>, resolverName: string | undefined ) => ( acc: Acc ) => Acc;
}
export function foldPagesToRestToMutationsAndResolvers<G, Acc> ( ps: RefD<G>[], acc: Acc, folder: MutuationAndResolverFolder<G, Acc> ): Acc {
  return ps.reduce ( ( acc, p ) => Object.entries ( p.rest ).reduce ( ( acc, [ name, rdp ], i ) => {
    if ( rdp.rest === undefined ) throw Error ( `Error in page ${p.name}.rest[${name}]. The rest is undefined.\n    ${JSON.stringify ( rdp )}` )
    const mutationsAcc = toArray ( rdp.rest.mutations ).flatMap ( mr => toArray ( mr.mutateBy ) ).reduce ( ( acc, m, j ) => {
      let simple = folder.simple ( m, i + "", p, name, rdp, rdp.rest, undefined ) ( acc );
      if ( m.type !== 'case' ) return simple;
      return m.select.reduce ( ( acc, g ) => folder.guarded ( m, g, i + '_' + j, p, name, rdp, rdp.rest, undefined ) ( acc ), simple )
    }, acc )
    const resolvers = Object.entries ( safeObject ( rdp.rest.resolvers ) ).flatMap ( ( [ resName, res ] ): [ string, PrimaryMutationDetail ][] => toArray ( res ).map ( r => [ resName, r ] ) ).reduce ( ( acc, tuple, i ) => {
      const [ resName, md ] = tuple
      return folder.simple ( md, i + "", p, name, rdp, rdp.rest, resName ) ( acc );
    }, mutationsAcc )
    return resolvers
  }, acc ), acc )
}