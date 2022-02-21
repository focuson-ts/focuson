import { defaultRestAction, findUniqueDataDsAndRestTypeDetails, RestActionDetail, RestD } from "../common/restD";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { AllDataDD, DataD, emptyDataFlatMap, flatMapDD, isDataDd, isRepeatingDd } from "../common/dataD";
import fs from "fs";
import { resolverName } from "./names";
import { JavaWiringParams } from "./config";
import { applyToTemplate } from "@focuson/template";


export function makeJavaResolversInterface ( { thePackage, fetcherInterface }: JavaWiringParams, rs: RestD[] ): string[] {
  const resolvers = findResolvers ( rs ).map ( ( [ parent, output, dataD, name, resolver ] ) =>
    `   public DataFetcher ${resolver}();` )
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

function makeWiring ( parentName: string,name,  resolver: string ): string {
  return `.type(newTypeWiring("${parentName}").dataFetcher("${name}", fetchers.${resolver}()))`;
}


export function makeAllJavaWiring ( params: JavaWiringParams, rs: RestD[] ): string[] {
  let wiring = findResolvers ( rs ).map ( ( [ parent, outputD, dataD,name, resolver ] ) => {
    return parent ?
      makeWiring ( parent.name,name, resolver ) :
      makeWiring ( outputD.query,resolver, resolver )
  } )
  // let wiring = [ ...makeJavaWiringForQueryAndMutation ( rs ), ...makeJavaWiringForAllDataDs ( rs ) ]
  const str: string = fs.readFileSync ( 'templates/JavaWiringTemplate.java' ).toString ()
  return applyToTemplate ( str, { ...params, wiring: wiring.map ( s => '          ' + s ).join ( '\n' ) } )
}

/** The first string is the name the second is the resolver */
export function findResolvers ( rs: RestD[] ): [ DataD | undefined, RestActionDetail, AllDataDD, string, string ][] {
  const fromRest: [ undefined, RestActionDetail, DataD, string, string ][] = findUniqueDataDsAndRestTypeDetails ( rs ).//
    map ( ( [ restD, rad ] ) => [ undefined, rad, restD.dataDD, restD.dataDD.name, resolverName( restD.dataDD, rad ) ] )

  //this is a bit of fake. Maybe we would be better with more explicit fakes...
  function restActionDetailFor ( d: AllDataDD ): RestActionDetail {
    if ( isDataDd ( d ) ) return defaultRestAction.get
    if ( isRepeatingDd ( d ) ) return defaultRestAction.list
    return defaultRestAction.getString
  }
  const fromSpecifics: [ DataD, RestActionDetail, AllDataDD, string, string ][] = rs.flatMap ( r => {
    let y: [ DataD, RestActionDetail, AllDataDD, string, string ][] = flatMapDD ( r.dataDD, {
      ...emptyDataFlatMap (),
      walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], restActionDetailFor ( dataDD ), dataDD, path[ path.length - 1 ], dataDD.resolver ] ] : [],
      walkPrim: ( path, parents: DataD[], oneDataDD, dataDD ) =>
        dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], restActionDetailFor ( dataDD ), dataDD, path[ path.length - 1 ], dataDD.resolver ] ] : [],
    } )
    return y
  } )
  return [ ...fromRest, ...fromSpecifics ]

}