import { findUniqueDataDsAndRestTypeDetails, RestD } from "../common/restD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { DataD, emptyDataFlatMap, flatMapDD } from "../common/dataD";
import fs from "fs";
import { resolverName } from "./names";


export function makeJavaResolversInterface ( { thePackage, fetcherInterface }: JavaWiringParams, rs: RestD[] ): string[] {
  const resolvers = findResolvers ( rs ).map ( ( [ dataD, resolver ] ) => `   public DataFetcher ${resolver}();` )
  return [
    `package ${thePackage};`,
    '',
    'import graphql.schema.DataFetcher;',
    '',
    `public interface ${fetcherInterface} {`,
    ...resolvers,
    // ...findUniqueDataDsAndRestTypeDetails ( rs ).flatMap ( ( [ datad, rad ] ) => `   public DataFetcher ${resolverName ( datad, rad )}();` ),
    '}' ]
}

function makeWiring ( name: string, resolver: string ): string {
  return `.type(newTypeWiring("${name}").dataFetcher("${resolver}", fetchers.${resolver}()))`;
}


export interface JavaWiringParams {
  thePackage: string;
  applicationName: string,
  fetcherInterface: string;
  wiringClass: string;
  schema: string;
}

export function adjustTemplate ( template: string, params: NameAnd<string> ): string [] {
  let sorted: [ string, string ][] = sortedEntries ( params );
  return sorted.reduce ( ( acc: string, [ name, value ]: [ string, string ] ) => {
    const regex = new RegExp ( "<" + name + ">", 'g' )
    return acc.replace ( regex, value )
  }, template.replace ( /\r/g, '\n' ) ).split ( '\n' ).filter ( s => s.length > 0 )

}

export function makeAllJavaWiring ( params: JavaWiringParams, rs: RestD[] ): string[] {
  let wiring = findResolvers ( rs ).map ( ( [ dataD, resolver ] ) => makeWiring ( dataD.name, resolver ) )
  // let wiring = [ ...makeJavaWiringForQueryAndMutation ( rs ), ...makeJavaWiringForAllDataDs ( rs ) ]
  const str: string = fs.readFileSync ( 'templates/JavaWiringTemplate.java' ).toString ()
  return adjustTemplate ( str, { ...params, wiring: wiring.map ( s => '          ' + s ).join ( '\n' ) } )
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