import { findUniqueDataDsAndRestTypeDetails, RestActionDetail, RestD } from "../common/restD";
import { resolverName } from "./makeGraphQlTypes";
import { sortedEntries } from "@focuson/utils";
import { AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD } from "../common/dataD";
import fs from "fs";


export function makeJavaResolversInterface ( packageName: string, intName: string, rs: RestD[] ): string[] {
  const resolvers = findResolvers ( rs ).map ( ( [ dataD, resolver ] ) => `   public DataFetcher ${resolver}();` )
  return [
    `package ${packageName};`,
    '',
    'import graphql.schema.DataFetcher;',
    '',
    `interface ${intName} {`,
    ...resolvers,
    // ...findUniqueDataDsAndRestTypeDetails ( rs ).flatMap ( ( [ datad, rad ] ) => `   public DataFetcher ${resolverName ( datad, rad )}();` ),
    '}' ]
}

function makeWiring ( name: string, resolver: string ): string {
  return `.type(newTypeWiring("${name}").dataFetcher("${resolver}", fetchers.${resolver}()))`;
}

// export const makeJavaWiringForDataD = ( name: string ) => ( d: AllDataDD ): string[] =>
//   d.resolver ? makeWiring ( d, d.resolver )  : [];

// export function makeJavaWiringForAllDataDs ( rs: RestD[] ): string[] {
//   return rs.flatMap ( r => flatMapDD ( r.dataDD,
//     {
//       ...emptyDataFlatMap (),
//       walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) =>
//         dataDD.resolver && parents.length > 0 ? [ makeWiring ( parents[ parents.length - 1 ].name, dataDD.resolver ) ] : [],
//       walkPrim: ( path, parents: DataD[], oneDataDD, dataDD ) =>
//         dataDD.resolver && parents.length > 0 ? [ makeWiring ( parents[ parents.length - 1 ].name, dataDD.resolver ) ] : [],
//     } ) )
// }


export interface JavaWiringParams {
  thePackage: string,
  fetcherClass: string,
  schema: string
}


export function makeAllJavaWiring ( params: JavaWiringParams, rs: RestD[] ): string[] {
  const str: string = fs.readFileSync ( 'templates/JavaWiringTemplate.java' ).toString ()
  let wiring = findResolvers ( rs ).map ( ( [ dataD, resolver ] ) => makeWiring ( dataD.name, resolver ) )
  // let wiring = [ ...makeJavaWiringForQueryAndMutation ( rs ), ...makeJavaWiringForAllDataDs ( rs ) ]
  return sortedEntries ( { ...params, wiring: wiring.map ( s => '          ' + s ).join ( '\n' ) } ).reduce (
    ( acc: string, [ name, value ] ) => {
      const regex = new RegExp ( "<" + name + ">", 'g' )
      return acc.replace ( regex, value )
    }, str.replace ( /\r/g, '\n' ) ).split ( '\n' ).filter ( s => s.length > 0 )
}

export function findResolvers ( rs: RestD[] ): [ DataD, string ][] {
  const fromRest: [ DataD, string ][] = findUniqueDataDsAndRestTypeDetails ( rs ).map ( ( [ dataD, rad ] ) => [ dataD, resolverName ( dataD, rad ) ] )
  const fromSpecifics: [ DataD, string ][] = rs.flatMap ( r => {
    let y: [ DataD, string ][] = flatMapDD ( r.dataDD, {
      ...emptyDataFlatMap (),
      walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], dataDD.resolver ] ] : [],
      walkPrim: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], dataDD.resolver ] ] : [],
    } )
    return y
  } )
  return [ ...fromRest, ...fromSpecifics ]

}