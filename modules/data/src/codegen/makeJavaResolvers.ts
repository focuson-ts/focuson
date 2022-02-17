import { findUniqueDataDsAndRestTypeDetails, RestD, RestOutputDetails } from "../common/restD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { AllDataDD, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isRepeatingDd } from "../common/dataD";
import fs from "fs";
import { resolverName } from "./names";


export function makeJavaResolversInterface ( { thePackage, fetcherInterface }: JavaWiringParams, rs: RestD[] ): string[] {
  const resolvers = findResolvers ( rs ).map ( ( [ parent, output, dataD, resolver ] ) => `   public DataFetcher ${resolver}();` )
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
  sampleClass: string,
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
  let wiring = findResolvers ( rs ).map ( ( [ parent, outputD, dataD, resolver ] ) => makeWiring ( dataD.name, resolver ) )
  // let wiring = [ ...makeJavaWiringForQueryAndMutation ( rs ), ...makeJavaWiringForAllDataDs ( rs ) ]
  const str: string = fs.readFileSync ( 'templates/JavaWiringTemplate.java' ).toString ()
  return adjustTemplate ( str, { ...params, wiring: wiring.map ( s => '          ' + s ).join ( '\n' ) } )
}

export function findResolvers ( rs: RestD[] ): [ DataD | undefined, RestOutputDetails, AllDataDD, string ][] {
  const fromRest: [ undefined, RestOutputDetails, DataD, string ][] = findUniqueDataDsAndRestTypeDetails ( rs ).//
    map ( ( [ dataD, rad ] ) => [ undefined, rad.output, dataD, resolverName ( dataD, rad ) ] )

  function outputDetailsFor ( d: AllDataDD ): RestOutputDetails {
    if ( isDataDd ( d ) ) return { needsObj: true }
    if ( isRepeatingDd ( d ) ) return { needsObj: true, needsBrackets: true }
    return {}
  }
  const fromSpecifics: [ DataD, RestOutputDetails, AllDataDD, string ][] = rs.flatMap ( r => {
    let y: [ DataD, RestOutputDetails, AllDataDD, string ][] = flatMapDD ( r.dataDD, {
      ...emptyDataFlatMap (),
      walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], outputDetailsFor ( dataDD ), dataDD, dataDD.resolver ] ] : [],
      walkPrim: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], outputDetailsFor ( dataDD ), dataDD, dataDD.resolver ] ] : [],
    } )
    return y
  } )
  return [ ...fromRest, ...fromSpecifics ]

}