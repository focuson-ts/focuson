import { AllDataDD, AllDataFlatMap, CompDataD, compDataDIn, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isRepeatingDd, OneDataDD } from "../common/dataD";
import { findMustConstructForRest, findUniqueDataDsAndRestTypeDetails, RestD, RestParams } from "../common/restD";
import { resolverName } from "./names";
import { RestAction } from "@focuson-nw/utils";
import { paramsForRestAction } from "./codegen";
import { QueryOrMutation, RestActionDetail, RestTypeDetails } from "@focuson-nw/rest";

export function makeGraphQlTypeFolder<G> ( { keyword, create, postfix }: RestTypeDetails ): AllDataFlatMap<string, G> {
  return {
    stopAtDisplay: false,
    ...emptyDataFlatMap (),
    walkDataStart: ( path, parents: DataD<G>[], oneDataDD, dataDD ) => create ? [ `${keyword} ${dataDD.name}${postfix}{` ] : [],
    walkPrim: ( path, parents: DataD<G>[], oneDataDD, dataDD ) => create ? [ `  ${path.slice ( -1 )}: ${dataDD.graphQlType}` ] : [],
    walkDataEnd: ( path, parents: DataD<G>[], oneDataDD, dataDD ) => create ? [ '}' ] : []
  }
}

export const rawTypeName = <G> ( d: AllDataDD<G> ): string => isRepeatingDd ( d ) ? rawTypeName ( d.dataDD ) : d.graphQlType ? d.graphQlType : d.name;
function theType<G> ( d: AllDataDD<G> ): string {
  if ( isDataDd ( d ) ) return rawTypeName ( d ) + mandatoryPling
  if ( isRepeatingDd ( d ) ) return "[" + theType ( d.dataDD ) + `]${mandatoryPling}`
  return d.graphQlType ? d.graphQlType : `String${mandatoryPling}`
}


export function makeOutputString ( name: string, needExtrabrackets: boolean, { params, query, output, graphQlPostfix }: RestActionDetail ) {
  const obj = output.needsObj ? (name + (output.needsPling ? mandatoryPling : "")) : 'Boolean';
  const raw = output.needsBrackets ? "[" + obj + `]${mandatoryPling}` : obj
  return needExtrabrackets ? "[" + raw + `]${mandatoryPling}` : raw
}


export const makeParamsString = ( errorPrefix: string, rest: RestD<any>, restAction: RestAction ) => ( params: RestParams ): string => {
  //later for things like create where we don't know some of the ids these will need to be more clever.
  return paramsForRestAction ( errorPrefix, rest, restAction ).map ( ( [ name, p ] ) => {
    if (!p) throw Error(`${errorPrefix} The param is [${name}] with value [${p}].`)
    return `${name}: ${p.graphQlType}!`;
  } ).join ( ", " )
};
function extraParam<G> ( restD: RestD<G>, action: RestActionDetail ) {
  const prefix = ",obj: "
  if ( action.params.needsObj ) {
    if ( isDataDd ( restD.dataDD ) ) return prefix + restD.dataDD.name + "Inp!"
    if ( isRepeatingDd ( restD.dataDD ) ) return prefix + "[" + restD.dataDD.dataDD.name + "Inp!]!"
    throw new Error ( `Don't know how to make extra param ${restD.dataDD}` )
  }
  return ""
}
export const oneQueryMutateLine = <G> ( [ restD, a, action ]: [ RestD<G>, RestAction, RestActionDetail ] ): string => {
  let rawType = rawTypeName ( restD.dataDD );
  const errorPrefix = `Making rest with url ${restD.url} Action ${JSON.stringify ( action )}`
  const paramString = "(" + makeParamsString ( errorPrefix, restD, a ) ( restD.params ) + extraParam ( restD, action ) + ")";
  const realParamString = paramString === '()' ? '' : paramString
  const needExtrabrackets = isRepeatingDd ( restD.dataDD )
  return `  ${resolverName ( restD, a )}${realParamString}:${makeOutputString ( rawType, needExtrabrackets, action )}`;
}

export const makeSchemaBlockFor = <G> ( [ dataD, rt ]: [ DataD<G>, RestTypeDetails ] ): string[] =>
  flatMapDD ( dataD, makeGraphQlTypeFolder ( rt ) );


export function makeQueryOrMutateBlock<G> ( rs: RestD<G>[], q: QueryOrMutation ): string[] {
  const lines = findUniqueDataDsAndRestTypeDetails ( rs ).filter ( ( [ d, a, rad ] ) => rad.query == q ).map ( oneQueryMutateLine )
  return lines.length === 0 ? [] : [ "type " + q + "{", ...lines, "}" ]
}
const mandatoryPling = '' /// might be !
export const oneSchemaLine = <G> ( suffix: string, repeating: boolean ) => ( [ name, one ]: [ string, OneDataDD<G> ] ): string => {
  const { dataDD } = one
  if ( isDataDd ( dataDD ) ) return repeating ? `  ${name}: [${dataDD.name}${suffix}${mandatoryPling}]${mandatoryPling}` : `  ${name}: ${dataDD.name}${suffix}${mandatoryPling}`
  if ( isRepeatingDd ( dataDD ) ) return oneSchemaLine ( suffix, true ) ( [ name, { ...one, dataDD: dataDD.dataDD } ] )
  return `  ${name}: ${dataDD.graphQlType}${mandatoryPling}`
};
export const makeSchemaBlock = <G> ( keyword: string, suffix: string ) => ( d: CompDataD<G> ): string[] => {
  if ( isDataDd ( d ) )
    return [ `${keyword} ${d.name}${suffix}{`,
      ...Object.entries ( compDataDIn ( d ).structure ).map ( oneSchemaLine ( suffix, false ) ),
      '}' ];
  return []
  // if ( isRepeatingDd ( d ) ) return [ 'repeating goes here' ]
  // throw new Error ( `Don't know how to make schema block for ${d}` )
};

export const makeGraphQlSchema = <G> ( rs: RestD<G>[] ): string[] => {
  const query = makeQueryOrMutateBlock ( rs, 'Query' )
  const mutate = makeQueryOrMutateBlock ( rs, 'Mutation' )
  const { input, objs } = findMustConstructForRest ( rs )
  const doOne = ( keyword: string, suffix: string, ds: CompDataD<G>[] ): string[] => ds.flatMap ( makeSchemaBlock ( keyword, suffix ) );

  let result = [
    ...makeQueryOrMutateBlock ( rs, 'Query' ),
    ...makeQueryOrMutateBlock ( rs, 'Mutation' ),
    ...doOne ( 'type', '', objs ),
    ...doOne ( 'input', 'Inp', input )
    // ...doOne ( 'input', 'IdAndInp', inputWithId )
  ];
  return result.length > 0 ? result : [ `type Query{notUsed: String}` ];
}
