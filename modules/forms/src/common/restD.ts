import { CompDataD, DataD, findAllDataDs, findDataDDIn, isDataDd } from "./dataD";
import { RestAction, safeArray, sortedEntries } from "@focuson/utils";
import { filterParamsByRestAction } from "../codegen/codegen";

export type AllLensRestParams = CommonLensRestParam | LensRestParam

export interface CommonLensRestParam {
  commonLens: string,
  testValue: string,
  main?: boolean
}
export interface LensRestParam {
  lens: string,
  testValue: string,
  main?: boolean
}
export function isCommonLens ( a: AllLensRestParams ): a is CommonLensRestParam {
  // @ts-ignore
  return a.commonLens !== undefined
}
export function isRestLens ( a: AllLensRestParams ): a is LensRestParam {
  // @ts-ignore
  return a.commonLens !== undefined
}

export interface RestParams {
  [ name: string ]: AllLensRestParams
}
export type QueryOrMutation = 'Query' | 'Mutation'


export interface RestParamsDetails {
  needsId?: boolean,
  needsObj?: boolean
}

export interface RestOutputDetails {
  needsBrackets?: boolean,
  needsObj?: boolean,
  needsPling?: boolean,
}

export interface RestActionDetail {
  /** get, update, insert... */
  name: RestAction,
  method: string,
  query: QueryOrMutation,
  params: RestParamsDetails,
  output: RestOutputDetails,
  graphQPrefix: string,
  graphQlPostfix: string
}

export interface RestTypeDetails {
  [ name: string ]: RestActionDetail
}

export const defaultRestAction: RestTypeDetails = {
  'get': { name: 'get', method: 'GET', query: 'Query', params: { needsId: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '' },
  // 'getString': { name: 'getString', query: 'Query', params: { needsId: true }, output: { needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '' }, //special for mocks
  'getOption': { name: 'getOption', method: 'GET', query: 'Query', params: { needsId: true }, output: { needsObj: true }, graphQPrefix: 'getOption', graphQlPostfix: '' },
  'list': { name: 'list', method: 'GET', query: 'Query', params: {}, output: { needsObj: true, needsBrackets: true, needsPling: true }, graphQPrefix: 'list', graphQlPostfix: '' },
  'update': { name: 'update', method: 'PUT', query: 'Mutation', params: { needsId: true, needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'update', graphQlPostfix: '' },
  'create': { name: 'create', method: 'POST', query: 'Mutation', params: { needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'create', graphQlPostfix: '' },
  'delete': { name: 'delete', method: 'DELETE', query: 'Mutation', params: { needsId: true }, output: {}, graphQPrefix: 'delete', graphQlPostfix: '' },
}


export interface RestD<G> {
  params: RestParams,
  dataDD: CompDataD<G>,
  url: string,
  actions: RestAction[]
}

export const actionDetail = ( r: RestAction ): RestActionDetail => defaultRestAction[ r ];
export const actionDetails = <G> ( r: RestD<G> ): RestActionDetail[] => r.actions.map ( actionDetail );

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
    var x: [ RestD<G>, RestAction, RestActionDetail ][] = r.actions.map ( a => [ r, a, defaultRestAction[ a ] ] )
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

export function makeCommonParamsValueForTest<G> ( r: RestD<G>, restAction: RestAction ) {
  return Object.fromEntries ( sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) ).map ( ( [ name, v ] ) => [ name, v.testValue ] ) )

}

export function findIds<G> ( rest: RestD<G> ) {
  const ids = sortedEntries ( rest.params ).filter ( t => !t[ 1 ].main ).map ( ( [ name, value ] ) => name )
  const resourceIds = sortedEntries ( rest.params ).filter ( t => t[ 1 ].main ).map ( ( [ name, value ] ) => name )
  return [ ids, resourceIds ]

}