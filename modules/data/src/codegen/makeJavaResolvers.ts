import { defaultRestAction, findUniqueDataDsAndRestTypeDetails, RestActionDetail, RestD } from "../common/restD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { AllDataDD, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isRepeatingDd } from "../common/dataD";
import fs from "fs";
import { resolverName } from "./names";
import { JavaWiringParams } from "./config";


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


export function adjustTemplate ( template: string, params: NameAnd<string> ): string [] {
  let sorted: [ string, string ][] = sortedEntries ( params );
  return sorted.reduce ( ( acc: string, [ name, value ]: [ string, string ] ) => {
    const regex = new RegExp ( "<" + name + ">", 'g' )
    return acc.replace ( regex, value )
  }, template.replace ( /\r/g, '\n' ) ).split ( '\n' ).filter ( s => s.length > 0 )

}

export function makeAllJavaWiring ( params: JavaWiringParams, rs: RestD[] ): string[] {
  let wiring = findResolvers ( rs ).map ( ( [ parent, outputD, dataD, resolver ] ) => {
    return parent ? makeWiring ( dataD.name, resolver ) : makeWiring ( (outputD.query === 'query' ? 'Query' : 'Mutation'), resolver )
  } )
  // let wiring = [ ...makeJavaWiringForQueryAndMutation ( rs ), ...makeJavaWiringForAllDataDs ( rs ) ]
  const str: string = fs.readFileSync ( 'templates/JavaWiringTemplate.java' ).toString ()
  return adjustTemplate ( str, { ...params, wiring: wiring.map ( s => '          ' + s ).join ( '\n' ) } )
}

export function findResolvers ( rs: RestD[] ): [ DataD | undefined, RestActionDetail, AllDataDD, string ][] {
  const fromRest: [ undefined, RestActionDetail, DataD, string ][] = findUniqueDataDsAndRestTypeDetails ( rs ).//
    map ( ( [ dataD, rad ] ) => [ undefined, rad, dataD, resolverName ( dataD, rad ) ] )

  //this is a bit of fake. Maybe we would be better with more explicit fakes...
  function restActionDetailFor ( d: AllDataDD ): RestActionDetail {
    if ( isDataDd ( d ) ) return defaultRestAction.get
    if ( isRepeatingDd ( d ) ) return defaultRestAction.list
    return defaultRestAction.getString
  }
  const fromSpecifics: [ DataD, RestActionDetail, AllDataDD, string ][] = rs.flatMap ( r => {
    let y: [ DataD, RestActionDetail, AllDataDD, string ][] = flatMapDD ( r.dataDD, {
      ...emptyDataFlatMap (),
      walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], restActionDetailFor ( dataDD ), dataDD, dataDD.resolver ] ] : [],
      walkPrim: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], restActionDetailFor ( dataDD ), dataDD, dataDD.resolver ] ] : [],
    } )
    return y
  } )
  return [ ...fromRest, ...fromSpecifics ]

}