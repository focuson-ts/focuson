import { findUniqueDataDsAndRestTypeDetails, RestActionDetail, RestD } from "../common/restD";
import { resolverName } from "./makeGraphQlTypes";
import { dataDsIn, PageD } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { DataD } from "../common/dataD";
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

export const makeOneJavaWiring = ( [ dd, rad ]: [ DataD, RestActionDetail ] ): string => {
  let rName = resolverName ( dd, rad );
  let q = rad.query === 'query' ? 'Query' : 'Mutation'
  return `.type(newTypeWiring("${q}").dataFetcher("${rName}", fetchers.${rName}()))`
};

export function makeJavaWiring ( rs: RestD[] ): string[] {
  return findUniqueDataDsAndRestTypeDetails ( rs ).map ( makeOneJavaWiring )
}
interface JavaWiringParams {
  thePackage: string,
  fetcherClass: string,
}

export function makeAllJavaWiring ( params: JavaWiringParams, rs: RestD[] ): string[] {
  const str: string = fs.readFileSync ( 'templates/JavaWiringTemplate.java' ).toString ()
  return sortedEntries ( { ...params, wiring: makeJavaWiring ( rs ).map ( s => '          ' + s ).join ( '\n' ) } ).reduce (
    ( acc: string, [ name, value ] ) => {
      const regex = new RegExp ( "<" + name + ">", 'g' )
      return acc.replace ( regex, value )
    }, str.replace ( /\r/g, '\n' ) ).split ( '\n' ).filter ( s => s.length > 0 )
}