import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isRepeatingDd, OneDataDD } from "../common/dataD";
import { findMustConstructForRest, findUniqueDataDsAndRestTypeDetails, QueryOrMutation, RestActionDetail, RestD, RestTypeDetails } from "../common/restD";

export function makeGraphQlTypeFolder ( { keyword, create, postfix }: RestTypeDetails ): AllDataFlatMap<string> {
  return {
    stopAtDisplay: false,
    ...emptyDataFlatMap (),
    walkDataStart: ( path, oneDataDD, dataDD ) => create ? [ `${keyword} ${dataDD.name}${postfix}{` ] : [],
    walkPrim: ( path, oneDataDD, dataDD ) => create ? [ `  ${path.slice ( -1 )}: ${dataDD.graphQlType}` ] : [],
    walkDataEnd: ( path, oneDataDD, dataDD ) => create ? [ '}' ] : []
  }
}

const rawTypeName = ( d: AllDataDD ): string => isRepeatingDd ( d ) ? rawTypeName ( d.dataDD ) : d.graphQlType ? d.graphQlType : d.name;
function theType ( d: AllDataDD ): string {
  if ( isDataDd ( d ) ) return rawTypeName ( d ) + "!"
  if ( isRepeatingDd ( d ) ) return "[" + theType ( d.dataDD ) + "]!"
  return d.graphQlType ? d.graphQlType : 'String!'
}

export function makeParamsString ( { params, output }: RestActionDetail, rawType: string ) {
  const idParam = params.needsId ? [ 'id: String!' ] : []
  const suffix = params.needsId ? 'IdAndInp' : 'Inp'
  const objParam = params.needsObj ? [ 'obj :' + rawType + suffix ] : []
  const allParams = [ ...idParam, ...objParam ]
  return allParams.length === 0 ? '' : "(" + allParams.join ( "," ) + ")";
}


export function makeOutputString ( name: string, { params, query, output, graphQlPostfix }: RestActionDetail ) {
  const obj = output.needsObj ? (name + (output.needsPling ? "!" : "")) : 'String'; // this String is probably the id
  return output.needsBrackets ? "[" + obj + "]!" : obj
}

export function resolverName ( dataD: DataD, action: RestActionDetail ) {
  let rawType = rawTypeName ( dataD );
  return `${action.graphQPrefix}${rawType}${action.graphQlPostfix}`
}
export const oneQueryMutateLine = ( [ dataD, action ]: [ DataD, RestActionDetail ] ): string => {
  let rawType = rawTypeName ( dataD );
  const paramString = makeParamsString ( action, rawType );
  return `  ${resolverName ( dataD, action )}${paramString}:${makeOutputString ( rawType, action )}`;
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

export const oneSchemaLine = ( suffix: string ) => ( [ name, one ]: [ string, OneDataDD ] ): string => {
  const { dataDD } = one
  if ( isDataDd ( dataDD ) ) return `  ${name}: ${dataDD.name}${suffix}!`
  if ( isRepeatingDd ( dataDD ) ) return oneSchemaLine ( suffix ) ( [ name, { ...one, dataDD: dataDD.dataDD } ] )
  return `  ${name}: String!`
};
export const makeSchemaBlock = ( keyword: string, suffix: string ) => ( d: DataD ): string[] => [ `${keyword} ${rawTypeName ( d )}${suffix}{`,
  ...Object.entries ( d.structure ).map ( oneSchemaLine ( suffix ) ),
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


// export function makeSchemaForNameAndDataDs ( ds: NamesAndDataDs ): string[] {
//   return sortedEntries<DataD> ( ds ).flatMap ( ( [ name, d ] ) => makeSchemaForDataD ( d ) )
// }
// export function paramDeclarationsToDecl ( r: RestParamDeclarations ) {
//   if ( r.length === 0 ) return ''
//   return '(' + r.map ( d => d.name + ': ' + d.graphQlType ).join ( ',' ) + ')'
// }


// export function makeQueryOrMutationEntriesForRestDQuery ( r: RestD, q: QueryOrMutation ): string[] {
//   return queriesOrMutations ( r, q ).map (
//     ( { name, graphQPrefix, graphQlPostfix, params } ) =>
//       graphQPrefix + rawTypeName ( r.dataDD ) + graphQlPostfix + paramDeclarationsToDecl ( params ) )
//
// }
//
// export function makeDefnInSchemaForRestQueries ( rs: RestD[], q: QueryOrMutation ): string[] {
//   const keyword = q === 'query' ? 'Query' : 'Mutation'
//   return [ 'type ' + keyword + "{",
//     ...rs.flatMap ( r => makeQueryOrMutationEntriesForRestDQuery ( r, q ).map ( s => '  ' + s ) ),
//     '}'
//   ]

