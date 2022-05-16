import { flatMapRestAndActions, flatMapRestAndResolver, mapRest, mapRestAndActions, mapRestAndResolver, RestD } from "../common/restD";
import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, isPrimDd, isRepeatingDd, OneDataDD, PrimitiveDD, RepeatingDataD, sampleFromDataD } from "../common/dataD";
import { fetcherInterfaceForResolverName, fetcherInterfaceName, fetcherPackageName, fetcherVariableName, fetcherVariableNameForResolver, resolverName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";
import { RestAction } from "@focuson/utils";
import { MainPageD, PageD } from "../common/pageD";
import { getRestTypeDetails } from "@focuson/rest";


export function makeJavaFetchersInterface<G> ( params: JavaWiringParams, page: MainPageD<any, G>, restD: RestD<G>, restAction: RestAction ): string[] {
  let resolverData: ResolverData = findQueryMutationResolvers ( restD, restAction );
  return [
    `package ${fetcherPackageName ( params, page )};`,
    '',
    'import graphql.schema.DataFetcher;',
    'import java.util.Map;',
    'import java.util.List;',

    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    '',
    `public interface ${fetcherInterfaceName ( params, restD, restAction )} extends IFetcher{`,
    `   public DataFetcher<${resolverData.javaType}> ${resolverData.resolver}();`,
    '}' ]
}

export function makeJavaFetcherInterfaceForResolver<G> ( params: JavaWiringParams, page: MainPageD<any, G>, restD: RestD<G>, resolverName: string, javaType: string ): string[] {
  return [
    `package ${fetcherPackageName ( params, page )};`,
    '',
    'import graphql.schema.DataFetcher;',
    'import java.util.Map;',
    'import java.util.List;',
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    '',
    `public interface ${fetcherInterfaceForResolverName ( params, restD, resolverName )} extends IFetcher{`,
    `   public DataFetcher<${javaType}> ${resolverName}();`,
    // ...findUniqueDataDsAndRestTypeDetails ( restD ).flatMap ( ( [ datad, rad ] ) => `   public DataFetcher ${resolverName ( datad, rad )}();` ),
    '}' ]
}

function makeWiring ( varName: string, parentName: string, resolver: string, name: string ): string {
  return `.type(newTypeWiring("${parentName}").dataFetcher("${name}", find(${varName}, dbName, f ->f.${resolver}())))`;
}


export function makeAllJavaWiring<B, G> ( params: JavaWiringParams, ps: PageD<B, G>[], directorySpec: DirectorySpec ): string[] {
  let imports = [
    ...mapRestAndActions ( ps, p => r => a => `import ${fetcherPackageName ( params, p )}.${fetcherInterfaceName ( params, r, a )};` ),
    ...mapRestAndResolver ( ps, p => r => ( { resolver } ) => `import ${fetcherPackageName ( params, p )}.${fetcherInterfaceForResolverName ( params, r, resolver )};` )
  ]
  let wiringForRest: string[] = mapRestAndActions ( ps, p => r => a => {
    const { parent, resolver, name, sample } = findQueryMutationResolvers ( r, a )
    return makeWiring ( fetcherVariableName ( params, r, a ), parent, resolver, name )
  } )
  let wiringForResolvers: string[] = mapRestAndResolver ( ps, p => r => ( { resolver, parent, name } ) =>
    makeWiring ( fetcherVariableNameForResolver ( params, r, resolver ), parent, resolver, name ) )
  let wiring = [ ...wiringForRest, ...wiringForResolvers ]


  let fetchers = [ ...(flatMapRestAndActions ( ps, p => r => a => [ `@Autowired`, `List<${fetcherInterfaceName ( params, r, a )}> ${fetcherVariableName ( params, r, a )};` ] )),
    ...flatMapRestAndResolver ( ps, p => r => ( { resolver } ) => [
      `@Autowired`,
      `List<${fetcherInterfaceForResolverName ( params, r, resolver )}> ${fetcherVariableNameForResolver ( params, r, resolver )};` ] ) ]

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
  javaType: string;
  samplerName: string,
  /** Values that represent a sample. Will only be present for a field */
  sample: string[];
}
export function findQueryMutationResolvers<G> ( r: RestD<G>, a: RestAction ): ResolverData {
  const rad = getRestTypeDetails ( a );
  let name = resolverName ( r, rad );
  return ({ isRoot: true, parent: rad.query, resolver: name, name, samplerName: sampleName ( r.dataDD ), sample: [], needsObjectInOutput: getRestTypeDetails ( a ).output.needsObj, javaType: findJavaType ( r.dataDD ) })

}

export function findJavaType ( dataDD: AllDataDD<any> ): string {
  if ( isPrimDd ( dataDD ) ) return dataDD.javaType
  if ( isRepeatingDd ( dataDD ) ) return `List<${findJavaType ( dataDD.dataDD )}>`
  return "Map<String,Object>"
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
      needsObjectInOutput: true,
      javaType: findJavaType ( dataDD )
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