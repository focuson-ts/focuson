import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isRepeatingDd, OneDataDD } from "../common/dataD";
import { findMustConstructForRest, findUniqueDataDsAndRestTypeDetails, QueryOrMutation, RestActionDetail, RestD, RestParams, RestTypeDetails } from "../common/restD";
import { resolverName } from "./names";
import { RestAction, sortedEntries } from "@focuson/utils";
import { filterParamsByRestAction } from "./codegen";

export function makeGraphQlTypeFolder <G> ( { keyword, create, postfix }: RestTypeDetails ): AllDataFlatMap<string,G> {
  return {
    stopAtDisplay: false,
    ...emptyDataFlatMap (),
    walkDataStart: ( path, parents: DataD <G>[], oneDataDD, dataDD ) => create ? [ `${keyword} ${dataDD.name}${postfix}{` ] : [],
    walkPrim: ( path, parents: DataD <G>[], oneDataDD, dataDD ) => create ? [ `  ${path.slice ( -1 )}: ${dataDD.graphQlType}` ] : [],
    walkDataEnd: ( path, parents: DataD <G>[], oneDataDD, dataDD ) => create ? [ '}' ] : []
  }
}

export const rawTypeName = <G> ( d: AllDataDD  <G>): string => isRepeatingDd ( d ) ? rawTypeName ( d.dataDD ) : d.graphQlType ? d.graphQlType : d.name;
function theType <G> ( d: AllDataDD <G> ): string {
  if ( isDataDd ( d ) ) return rawTypeName ( d ) + "!"
  if ( isRepeatingDd ( d ) ) return "[" + theType ( d.dataDD ) + "]!"
  return d.graphQlType ? d.graphQlType : 'String!'
}

// export function makeParamsString ( { params, output }: RestActionDetail, rawType: string ) {
//
//
//   const idParam = params.needsId ? [ 'id: String!' ] : []
//   const suffix = params.needsId ? 'IdAndInp' : 'Inp'
//   const objParam = params.needsObj ? [ 'obj :' + rawType + suffix ] : []
//   const allParams = [ ...idParam, ...objParam ]
//   return allParams.length === 0 ? '' : "(" + allParams.join ( "," ) + ")";
// }


export function makeOutputString ( name: string, { params, query, output, graphQlPostfix }: RestActionDetail ) {
  const obj = output.needsObj ? (name + (output.needsPling ? "!" : "")) : 'String'; // this String is probably the id
  return output.needsBrackets ? "[" + obj + "]!" : obj
}


export const makeParamsString = ( restAction: RestAction ) => ( params: RestParams ): string => {
  //later for things like create where we don't know some of the ids these will need to be more clever.
  return sortedEntries ( params ).filter ( filterParamsByRestAction ( restAction ) ).map ( ( [ name, p ] ) => `${name}: String!` ).join ( ", " )
};
function extraParam  <G>( restD: RestD <G>, action: RestActionDetail ) {
  const prefix = ",obj: "
  if ( action.params.needsObj ) return prefix + restD.dataDD.name + "Inp!"
  return ""
}
export const oneQueryMutateLine = <G> ( [ restD, a, action ]: [ RestD <G>, RestAction, RestActionDetail ] ): string => {
  let rawType = rawTypeName ( restD.dataDD );
  const paramString = "(" + makeParamsString ( a ) ( restD.params ) + extraParam ( restD, action ) + ")";
  return `  ${resolverName ( restD.dataDD, action )}${paramString}:${makeOutputString ( rawType, action )}`;
}

export const makeSchemaBlockFor =  <G>( [ dataD, rt ]: [ DataD <G>, RestTypeDetails ] ): string[] =>
  flatMapDD ( dataD, makeGraphQlTypeFolder ( rt ) );


export function makeQueryOrMutateBlock <G>( rs: RestD <G>[], q: QueryOrMutation ): string[] {
  const lines = findUniqueDataDsAndRestTypeDetails ( rs ).filter ( ( [ d, a, rad ] ) => rad.query == q ).map ( oneQueryMutateLine )
  return lines.length === 0 ? [] : [ "type " + q + "{", ...lines, "}" ]
}

export const oneSchemaLine = <G> ( suffix: string, repeating: boolean ) => ( [ name, one ]: [ string, OneDataDD <G> ] ): string => {
  const { dataDD } = one
  if ( isDataDd ( dataDD ) ) return repeating ? `  ${name}: [${dataDD.name}${suffix}!]!` : `  ${name}: ${dataDD.name}${suffix}!`
  if ( isRepeatingDd ( dataDD ) ) return oneSchemaLine ( suffix, true ) ( [ name, { ...one, dataDD: dataDD.dataDD } ] )
  return `  ${name}: ${dataDD.graphQlType}!`
};
export const makeSchemaBlock =  <G>( keyword: string, suffix: string ) => ( d: DataD <G> ): string[] => [ `${keyword} ${rawTypeName ( d )}${suffix}{`,
  ...Object.entries ( d.structure ).map ( oneSchemaLine ( suffix, false ) ),
  '}' ];

export const makeGraphQlSchema = <G> ( rs: RestD <G>[] ): string[] => {
  const query = makeQueryOrMutateBlock ( rs, 'Query' )
  const mutate = makeQueryOrMutateBlock ( rs, 'Mutation' )
  const { input, objs } = findMustConstructForRest ( rs )
  const doOne = ( keyword: string, suffix: string, ds: DataD <G>[] ): string[] => ds.flatMap ( makeSchemaBlock ( keyword, suffix ) );

  return [
    ...makeQueryOrMutateBlock ( rs, 'Query' ),
    ...makeQueryOrMutateBlock ( rs, 'Mutation' ),
    ...doOne ( 'type', '', objs ),
    ...doOne ( 'input', 'Inp', input )
    // ...doOne ( 'input', 'IdAndInp', inputWithId )
  ];
}
