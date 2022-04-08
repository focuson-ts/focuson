import { defaultRestAction, RestD } from "../common/restD";
import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, OneDataDD, PrimitiveDD, RepeatingDataD, sampleFromDataD } from "../common/dataD";
import { fetcherInterfaceName, fetcherVariableName, resolverName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";


export function makeJavaResolversInterface <G> ( params: JavaWiringParams, restD: RestD <G> ): string[] {
  const { thePackage } = params
  const resolvers = findAllResolvers ( [ restD ] ).map ( ( { resolver } ) => `   public DataFetcher ${resolver}();` )
  return [
    `package ${thePackage}.${params.fetcherPackage};`,
    '',
    'import graphql.schema.DataFetcher;',
    '',
    `public interface ${fetcherInterfaceName ( params, restD )} extends IFetcher{`,
    ...resolvers,
    // ...findUniqueDataDsAndRestTypeDetails ( restD ).flatMap ( ( [ datad, rad ] ) => `   public DataFetcher ${resolverName ( datad, rad )}();` ),
    '}' ]
}

function makeWiring ( varName: string, parentName: string, resolver: string, name: string ): string {
  return `.type(newTypeWiring("${parentName}").dataFetcher("${name}", find(${varName}, dbName, f ->f.${resolver}())))`;
}


export function makeAllJavaWiring  <G>( params: JavaWiringParams, rs: RestD <G>[], directorySpec: DirectorySpec ): string[] {
  let imports = rs.map ( r => `import ${params.thePackage}.${params.fetcherPackage}.${fetcherInterfaceName ( params, r )};` )
  let wiring: string[] = rs.flatMap ( r => findAllResolversFor ( r ).map ( ( { parent, resolver, name, sample } ) =>
    makeWiring ( fetcherVariableName ( params, r ), parent, resolver, name ) ) )
  let fetchers = rs.flatMap ( r => [ `@Autowired`, `List<${fetcherInterfaceName ( params, r )}> ${fetcherVariableName ( params, r )};` ] )
  const str: string = loadFile ( 'templates/JavaWiringTemplate.java', directorySpec ).toString ()
  return applyToTemplate ( str, {
    ...params,
    imports: imports.join ( '\n' ),
    fetchers: fetchers.map ( s => '      ' + s ).join ( '\n' ),
    wiring: wiring.map ( s => '          ' + s ).join ( '\n' )
  } )
}


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
export function findQueryMutationResolvers <G> ( r: RestD <G> ): ResolverData[] {
  return r.actions.map ( a => {
    const rad = defaultRestAction[ a ];
    let name = resolverName ( r.dataDD, rad );
    return ({ isRoot: true, parent: rad.query, resolver: name, name, samplerName: sampleName ( r.dataDD ), sample: [] })
  } )
}

export function findChildResolvers  <G>( restD: RestD <G> ): ResolverData[] {
  function rData<D extends AllDataDD <G>> ( path: string[], parents: DataD <G>[], oneDataDD: OneDataDD  <G>| undefined, dataDD: D ): ResolverData[] {
    return parents.length > 0 && dataDD.resolver ? [ {
      isRoot: false,
      parent: parents[ parents.length - 1 ].name,
      resolver: dataDD.resolver,
      name: path[ path.length - 1 ],
      samplerName: sampleName ( dataDD ),
      sample: sampleFromDataD ( oneDataDD, dataDD ),
    } ] : []
  }
  const mapper: AllDataFlatMap<ResolverData,G> = {
    ...emptyDataFlatMap (),
    walkDataStart ( path: string[], parents: DataD <G>[], oneDataDD: OneDataDD <G> | undefined, dataDD: DataD <G> ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
    walkRepStart ( path: string[], parents: DataD <G>[], oneDataDD: OneDataDD <G> | undefined, dataDD: RepeatingDataD <G> ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
    walkPrim ( path: string[], parents: DataD <G>[], oneDataDD: OneDataDD  <G>| undefined, dataDD: PrimitiveDD ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
  }
  return flatMapDD ( restD.dataDD, mapper )

}
export function findAllResolversFor <G> ( r: RestD <G> ): ResolverData[] {
  return [ ...findQueryMutationResolvers ( r ), ...findChildResolvers ( r ) ]
}
export function findAllResolvers <G> ( rs: RestD <G>[] ): ResolverData[] {
  return [ ...rs.flatMap ( findQueryMutationResolvers ), ...rs.flatMap ( findChildResolvers ) ]
}