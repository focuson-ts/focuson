import { DataD, findAllDataDs, findDataDDIn } from "./dataD";
import { safeArray } from "@focuson/utils";

type AllLensRestParams = CommonLensRestParam | LensRestParam
export interface CommonLensRestParam {commonLens: string[]}
export interface LensRestParam {lens: string[]}

export interface RestParams {
  [ name: string ]: AllLensRestParams
}
export type QueryOrMutation = 'query' | 'mutation'


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
  name: string,
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
  'get': { name: 'get', query: 'query', params: { needsId: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '' },
  'getString': { name: 'getString', query: 'query', params: { needsId: true }, output: { needsPling: true }, graphQPrefix: 'get', graphQlPostfix: '' }, //special for mocks
  'getOption': { name: 'getoption', query: 'query', params: { needsId: true }, output: { needsObj: true }, graphQPrefix: 'getOption', graphQlPostfix: '' },
  'list': { name: 'list', query: 'query', params: {}, output: { needsObj: true, needsBrackets: true, needsPling: true }, graphQPrefix: 'list', graphQlPostfix: '' },
  'update': { name: 'update', query: 'mutation', params: { needsId: true, needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'update', graphQlPostfix: '' },
  'create': { name: 'create', query: 'mutation', params: { needsObj: true }, output: { needsObj: true, needsPling: true }, graphQPrefix: 'create', graphQlPostfix: '' },
  'delete': { name: 'delete', query: 'mutation', params: { needsId: true }, output: {}, graphQPrefix: 'delete', graphQlPostfix: '' },
}

type RestAction = 'get' | 'getOption' | 'list' | 'update' | 'create' | 'delete'

export interface RestD {
  params: RestParams,
  dataDD: DataD,
  url: string,
  actions: RestAction[]
}

export const actionDetail = ( r: RestAction ): RestActionDetail => defaultRestAction[ r ];
export const actionDetails = ( r: RestD ): RestActionDetail[] => r.actions.map ( actionDetail );

export function flapMapActionDetails<Acc> ( r: RestD, fn: ( r: RestD, rt: RestActionDetail ) => Acc[] ): Acc[] {
  return actionDetails ( r ).flatMap ( rt => fn ( r, rt ) )
}

export interface MustConstructForRest {
  objs: DataD[],
  input: DataD[],
  inputWithId: DataD[]
}

export function findMustConstructForRest ( rs: RestD[] ): MustConstructForRest {
  const objs = new Set<DataD> ()
  const input = new Set<DataD> ()
  const inputWithId = new Set<DataD> ()
  rs.flatMap ( findDataDsAndRestTypeDetails ).forEach ( ( [ d, rt ] ) => {
    if ( rt.params.needsObj ) if ( rt.params.needsId ) inputWithId.add ( d ); else input.add ( d )
    if ( rt.output.needsObj ) objs.add ( d )
  } )
  function ordered ( ds: Set<DataD> ) {return [ ...ds ].sort ( ( a, b ) => a.name.localeCompare ( b.name ) )}
  return { objs: ordered ( objs ), input: ordered ( input ), inputWithId: ordered ( inputWithId ) }
}

export function findDataDsAndRestTypeDetails ( r: RestD ): [ DataD, RestActionDetail ][] {
  return flapMapActionDetails ( r, ( r, rt ) => findDataDDIn ( r.dataDD ).map ( dataD => [ dataD, rt ] ) )
}
export function findUniqueDataDsAndRestTypeDetails ( rs: RestD[] ): [ DataD, RestActionDetail ][] {
  const nonUnique: [ DataD, RestActionDetail ][] = rs.flatMap ( r => {
    var x: [ DataD, RestActionDetail ][] = r.actions.map ( a => [ r.dataDD, defaultRestAction[ a ] ] )
    return x
  } )
  return unique<[ DataD, RestActionDetail ]> ( nonUnique, ( [ dataD, rad ] ) => dataD.name + "," + rad.name )
}

export function findUniqueDataDsIn ( rs: RestD[] ): DataD[] {
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
