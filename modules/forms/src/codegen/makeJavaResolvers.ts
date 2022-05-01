import { flatMapRestAndActions, mapRestAndActions, RestD } from "../common/restD";
import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, OneDataDD, PrimitiveDD, RepeatingDataD, sampleFromDataD } from "../common/dataD";
import { fetcherInterfaceName, fetcherPackageName, fetcherVariableName, resolverName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";
import { RestAction } from "@focuson/utils";
import { MainPageD, PageD } from "../common/pageD";
import { getRestTypeDetails } from "@focuson/rest";


export function makeJavaResolversInterface<G> ( params: JavaWiringParams, page: MainPageD<any, G>, restD: RestD<G>, restAction: RestAction ): string[] {
  const { thePackage } = params
  const resolvers = findAllResolversFor ( restD, restAction ).map ( ( { resolver } ) => `   public DataFetcher<Map<String,Object>> ${resolver}();` )
  return [
    `package ${fetcherPackageName ( params, page )};`,
    '',
    'import graphql.schema.DataFetcher;',
    'import java.util.Map;',
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    '',
    `public interface ${fetcherInterfaceName ( params, restD, restAction )} extends IFetcher{`,
    ...resolvers,
    // ...findUniqueDataDsAndRestTypeDetails ( restD ).flatMap ( ( [ datad, rad ] ) => `   public DataFetcher ${resolverName ( datad, rad )}();` ),
    '}' ]
}

function makeWiring ( varName: string, parentName: string, resolver: string, name: string ): string {
  return `.type(newTypeWiring("${parentName}").dataFetcher("${name}", find(${varName}, dbName, f ->f.${resolver}())))`;
}


export function makeAllJavaWiring<B, G> ( params: JavaWiringParams, ps: PageD<B, G>[], directorySpec: DirectorySpec ): string[] {
  let imports = mapRestAndActions ( ps, p => r => a => `import ${fetcherPackageName ( params, p )}.${fetcherInterfaceName ( params, r, a )};` )
  let wiring: string[] = flatMapRestAndActions ( ps, p => r => a => findAllResolversFor ( r, a ).map ( ( { parent, resolver, name, sample } ) =>
    makeWiring ( fetcherVariableName ( params, r, a ), parent, resolver, name ) ) )
  let fetchers = flatMapRestAndActions ( ps, p => r => a => [ `@Autowired`, `List<${fetcherInterfaceName ( params, r, a )}> ${fetcherVariableName ( params, r, a )};` ] )
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
  needsObjectInOutput: boolean;

  samplerName: string,
  /** Values that represent a sample. Will only be present for a field */
  sample: string[];
}
export function findQueryMutationResolvers<G> ( r: RestD<G>, a: RestAction ): ResolverData {
  const rad = getRestTypeDetails ( a );
  let name = resolverName ( r, rad );
  return ({ isRoot: true, parent: rad.query, resolver: name, name, samplerName: sampleName ( r.dataDD ), sample: [], needsObjectInOutput: getRestTypeDetails ( a ).output.needsObj })

}

export function findChildResolvers<G> ( restD: RestD<G> ): ResolverData[] {
  function rData<D extends AllDataDD<G>> ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: D ): ResolverData[] {
    return parents.length > 0 && dataDD.resolver ? [ {
      isRoot: false,
      parent: parents[ parents.length - 1 ].name,
      resolver: dataDD.resolver,
      name: path[ path.length - 1 ],
      samplerName: sampleName ( dataDD ),
      sample: sampleFromDataD ( oneDataDD, dataDD ),
      needsObjectInOutput: true
    } ] : []
  }
  const mapper: AllDataFlatMap<ResolverData, G> = {
    ...emptyDataFlatMap (),
    walkDataStart ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G> ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
    walkRepStart ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G> ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
    walkPrim ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: PrimitiveDD ): ResolverData[] {
      return rData ( path, parents, oneDataDD, dataDD )
    },
  }
  return flatMapDD ( restD.dataDD, mapper )

}
export function findAllResolversFor<G> ( r: RestD<G>, restAction: RestAction ): ResolverData[] {
  const childresolvers = restAction === 'get' ? findChildResolvers ( r ) : []
  return [ findQueryMutationResolvers ( r, restAction ), ...childresolvers ]
}
// export function findAllResolvers <G> ( rs: RestD <G>[] ): ResolverData[] {
//   return [ ...rs.flatMap ( findQueryMutationResolvers ), ...rs.flatMap ( findChildResolvers ) ]
// }