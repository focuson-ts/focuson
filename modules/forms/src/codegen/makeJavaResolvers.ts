import { defaultRestAction, RestD } from "../common/restD";
import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, OneDataDD, PrimitiveDD, RepeatingDataD, sampleFromDataD } from "../common/dataD";
import { resolverName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { applyToTemplate, DirectorySpec, loadFile } from "@focuson/template";


export function makeJavaResolversInterface ( { thePackage, fetcherInterface }: JavaWiringParams, rs: RestD[] ): string[] {
  const resolvers = findAllResolvers2 ( rs ).map ( ( { resolver } ) => `   public DataFetcher ${resolver}();` )
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

function makeWiring ( parentName: string, resolver: string, name: string ): string {
  return `.type(newTypeWiring("${parentName}").dataFetcher("${name}", fetchers.${resolver}()))`;
}


export function makeAllJavaWiring ( params: JavaWiringParams, rs: RestD[], directorySpec: DirectorySpec ): string[] {
  let wiring = findAllResolvers2 ( rs ).map ( ( { parent, resolver, name, sample } ) => makeWiring ( parent, resolver, name ) )


// let wiring = findResolvers ( rs ).map ( ( [ parent, outputD, dataD, name, resolver ] ) => {
//   return parent ?
//     makeWiring ( parent.name, name, resolver ) :
//     makeWiring ( outputD.query, resolver, resolver )
// } )
// let wiring = [ ...makeJavaWiringForQueryAndMutation ( rs ), ...makeJavaWiringForAllDataDs ( rs ) ]
  const str: string = loadFile ( 'templates/JavaWiringTemplate.java', directorySpec ).toString ()
  return applyToTemplate ( str, { ...params, wiring: wiring.map ( s => '          ' + s ).join ( '\n' ) } )
}

// /** The first string is the name the second is the resolver */
// export function findResolvers ( rs: RestD[] ): [ DataD | undefined, RestActionDetail, AllDataDD, string, string ][] {
//   const fromRest: [ undefined, RestActionDetail, DataD, string, string ][] = findUniqueDataDsAndRestTypeDetails ( rs ).//
//     map ( ( [ restD, rad ] ) => [ undefined, rad, restD.dataDD, restD.dataDD.name, resolverName ( restD.dataDD, rad ) ] )
//
//   //this is a bit of fake. Maybe we would be better with more explicit fakes...
//   function restActionDetailFor ( d: AllDataDD ): RestActionDetail {
//     if ( isDataDd ( d ) ) return defaultRestAction.get
//     if ( isRepeatingDd ( d ) ) return defaultRestAction.list
//     return defaultRestAction.getString
//   }
//   const fromSpecifics: [ DataD, RestActionDetail, AllDataDD, string, string ][] = rs.flatMap ( r => {
//     let y: [ DataD, RestActionDetail, AllDataDD, string, string ][] = flatMapDD ( r.dataDD, {
//       ...emptyDataFlatMap (),
//       walkDataStart: ( path, parents: DataD[], oneDataDD, dataDD ) =>
//         dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], restActionDetailFor ( dataDD ), dataDD, path[ path.length - 1 ], dataDD.resolver ] ] : [],
//       walkPrim: ( path, parents: DataD[], oneDataDD, dataDD ) =>
//         dataDD.resolver && parents.length > 0 ? [ [ parents[ parents.length - 1 ], restActionDetailFor ( dataDD ), dataDD, path[ path.length - 1 ], dataDD.resolver ] ] : [],
//     } )
//     return y
//   } )
//   return [ ...fromRest, ...fromSpecifics ]
//
// }

export interface ResolverData {
  isRoot: boolean;
  /** Query/Mutation or the name of the class */
  parent: string;
  /** The resolver name. Query/Mutation child => query name, Other => resolver name */
  resolver: string;
  /** In the case of the Query/Mutation = resolver. Other => the field name (both are logically the field name)*/
  name: string;

  samplerName: string,
  /** Values that represent a sample. Will only be present for a field */
  sample: string[];
}
export function findQueryMutationResolvers2 ( r: RestD ): ResolverData[] {
  return r.actions.map ( a => {
    const rad = defaultRestAction[ a ];
    let name = resolverName ( r.dataDD, rad );
    return ({ isRoot: true, parent: rad.query, resolver: name, name, samplerName: sampleName ( r.dataDD ), sample: [] })
  } )
}

export function findChildResolvers2 ( rs: RestD[] ): ResolverData[] {
  function rData<D extends AllDataDD> ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: D ): ResolverData[] {
    return parents.length > 0 && dataDD.resolver ? [ {
      isRoot: false,
      parent: parents[ parents.length - 1 ].name,
      resolver: dataDD.resolver,
      name: path[ path.length - 1 ],
      samplerName: sampleName ( dataDD ),
      sample: sampleFromDataD ( oneDataDD, dataDD ),
    } ] : []
  }
  const mapper: AllDataFlatMap<ResolverData> = {
    ...emptyDataFlatMap (),
    walkDataStart ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: DataD ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
    walkRepStart ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
    walkPrim ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
  }
  return rs.flatMap ( r => flatMapDD ( r.dataDD, mapper ) )

}

export function findAllResolvers2 ( rs: RestD[] ): ResolverData[] {
  return [ ...rs.flatMap ( findQueryMutationResolvers2 ), ...findChildResolvers2 ( rs ) ]
}