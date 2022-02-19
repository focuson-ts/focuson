import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isRepeatingDd, OneDataDD } from "../common/dataD";
import { findMustConstructForRest, findUniqueDataDsAndRestTypeDetails, QueryOrMutation, RestActionDetail, RestD, RestParams, RestTypeDetails } from "../common/restD";
import { resolverName } from "./names";
import { sortedEntries } from "@focuson/utils";

export function makeGraphQlTypeFolder ( { keyword, create, postfix }: RestTypeDetails ): AllDataFlatMap<string> {
  return {
    stopAtDisplay: false,
    ...emptyDataFlatMap (),
    walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) => create ? [ `${keyword} ${dataDD.name}${postfix}{` ] : [],
    walkPrim: ( path, parents: DataD[], oneDataDD, dataDD ) => create ? [ `  ${path.slice ( -1 )}: ${dataDD.graphQlType}` ] : [],
    walkDataEnd: ( path, parents: DataD[], oneDataDD, dataDD ) => create ? [ '}' ] : []
  }
}

export const rawTypeName = ( d: AllDataDD ): string => isRepeatingDd ( d ) ? rawTypeName ( d.dataDD ) : d.graphQlType ? d.graphQlType : d.name;
function theType ( d: AllDataDD ): string {
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


export function makeParamsString ( params: RestParams ): string {
  //later for things like create where we don't know some of the ids these will need to be more clever.
  return sortedEntries ( params ).map ( ( [ name, p ] ) => `${name}: String!` ).join ( ", " )
}
export const oneQueryMutateLine = ( [ restD, action ]: [ RestD, RestActionDetail ] ): string => {
  let rawType = rawTypeName ( restD.dataDD );
  const paramString = "("+ makeParamsString ( restD.params ) + ")";
  return `  ${resolverName ( restD.dataDD, action )}${paramString}:${makeOutputString ( rawType, action )}`;
}

export const makeSchemaBlockFor = ( [ dataD, rt ]: [ DataD, RestTypeDetails ] ): string[] =>
  flatMapDD ( dataD, makeGraphQlTypeFolder ( rt ) );


export function makeQueryOrMutateBlock ( rs: RestD[], q: QueryOrMutation ): string[] {
  const keyword = q == 'query' ? 'Query' : "Mutation"
  const lines = findUniqueDataDsAndRestTypeDetails ( rs ).filter ( ( [ d, a ] ) => a.query == q ).map ( oneQueryMutateLine )
  return [ "type " + keyword + "{",
    ...lines,
    "}" ]
}

export const oneSchemaLine = ( suffix: string , repeating: boolean) => ( [ name, one ]: [ string, OneDataDD ] ): string => {
  const { dataDD } = one

  if ( isDataDd ( dataDD ) ) return repeating? `  ${name}: [${dataDD.name}${suffix}!]!`:`  ${name}: ${dataDD.name}${suffix}!`
  if ( isRepeatingDd ( dataDD ) ) return oneSchemaLine ( suffix, true ) ( [ name, { ...one, dataDD: dataDD.dataDD } ] )
  return `  ${name}: String!`
};
export const makeSchemaBlock = ( keyword: string, suffix: string ) => ( d: DataD ): string[] => [ `${keyword} ${rawTypeName ( d )}${suffix}{`,
  ...Object.entries ( d.structure ).map ( oneSchemaLine ( suffix, false ) ),
  '}' ];

export const makeGraphQlSchema = ( rs: RestD[] ): string[] => {
  const query = makeQueryOrMutateBlock ( rs, 'query' )
  const mutate = makeQueryOrMutateBlock ( rs, 'mutation' )
  const { input, objs, inputWithId } = findMustConstructForRest ( rs )
  const doOne = ( keyword: string, suffix: string, ds: DataD[] ): string[] => ds.flatMap ( makeSchemaBlock ( keyword, suffix ) );

  return [
    ...makeQueryOrMutateBlock ( rs, 'query' ),
    ...makeQueryOrMutateBlock ( rs, 'mutation' ),
    ...doOne ( 'type', '', objs ),
    ...doOne ( 'input', 'Inp', input ),
    ...doOne ( 'input', 'IdAndInp', inputWithId ) ];
}
