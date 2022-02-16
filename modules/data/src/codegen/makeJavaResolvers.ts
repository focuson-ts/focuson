import { findUniqueDataDsAndRestTypeDetails, findUniqueDataDsIn, RestActionDetail, RestD } from "../common/restD";
import { resolverName } from "./makeGraphQlTypes";
import { dataDsIn, PageD } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { AllDataDD, DataD, emptyDataFlatMap, flatMapDD } from "../common/dataD";
import fs from "fs";


export function makeJavaResolversInterface ( packageName: string, intName: string, rs: RestD[] ): string[] {
  return [
    `package ${packageName};`,
    '',
    'import graphql.schema.DataFetcher;',
    '',
    `interface ${intName} {`,
    ...findUniqueDataDsAndRestTypeDetails ( rs ).flatMap ( ( [ datad, rad ] ) => `   public DataFetcher ${resolverName ( datad, rad )}();` ),
    '}' ]
}

function makeWiring ( data: string, resolver: string ) {
  return `.type(newTypeWiring("${data}").dataFetcher("${resolver}", fetchers.${resolver}()))`;
}
export const makeOneJavaWiringForQueryAndMutation = ( [ dd, rad ]: [ DataD, RestActionDetail ] ): string => {
  let rName = resolverName ( dd, rad );
  let q = rad.query === 'query' ? 'Query' : 'Mutation'
  return makeWiring ( q, rName )
};

export function makeJavaWiringForQueryAndMutation ( rs: RestD[] ): string[] {
  return findUniqueDataDsAndRestTypeDetails ( rs ).map ( makeOneJavaWiringForQueryAndMutation )
}

export const makeJavaWiringForDataD = ( name: string ) => ( d: AllDataDD ): string[] =>
  d.resolver ? [ makeWiring ( name, d.resolver ) ] : [];

export function makeJavaWiringForAllDataDs ( rs: RestD[] ): string[] {
  return rs.flatMap ( r => flatMapDD ( r.dataDD,
    {
      ...emptyDataFlatMap (),
      walkDataStart: ( path, oneDataDD, dataDD ) =>
        path.length<2 ? [] : [makeWiring ( path[ path.length - 2 ], path[ path.length - 1 ] )],
      walkPrim: ( path, oneDataDD, dataDD ) =>
        path.length<2 ? [] : [makeWiring ( path[ path.length - 2 ], path[ path.length - 1 ] )],
    } ) )
}


export interface JavaWiringParams {
  thePackage: string,
  fetcherClass: string,
  schema: string
}

export function makeAllJavaWiring ( params: JavaWiringParams, rs: RestD[] ): string[] {
  const str: string = fs.readFileSync ( 'templates/JavaWiringTemplate.java' ).toString ()
  let wiring = [ ...makeJavaWiringForQueryAndMutation ( rs ), ...makeJavaWiringForAllDataDs ( rs ) ]
  return sortedEntries ( { ...params, wiring: wiring.map ( s => '          ' + s ).join ( '\n' ) } ).reduce (
    ( acc: string, [ name, value ] ) => {
      const regex = new RegExp ( "<" + name + ">", 'g' )
      return acc.replace ( regex, value )
    }, str.replace ( /\r/g, '\n' ) ).split ( '\n' ).filter ( s => s.length > 0 )
}