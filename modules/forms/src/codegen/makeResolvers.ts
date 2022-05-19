import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { RestD, unique } from "../common/restD";
import { NameAnd, toArray } from "@focuson/utils";
import { allInputParamNames, importForTubles, MutationDetail, Mutations } from "../common/resolverD";
import { fetcherInterfaceForResolverName, fetcherInterfaceName, fetcherPackageName, mutationMethodName, resolverClassName, resolverName } from "./names";
import { makeCodeFragmentsForMutation, makeMutationMethod } from "./makeMutations";
import { findChildResolvers, findJavaType, ResolverData } from "./makeJavaFetchersInterface";
import { defaultRestAction } from "@focuson/rest";
import { outputParamsDeclaration, paramsDeclaration } from "./makeSpringEndpoint";
import { indentList } from "./codegen";

function declareInputParamsFromEndpoint<G> ( r: RestD<G> ): string[] {
  return unique ( [ 'dbName', ...Object.keys ( r.params ) ], t => t ).map ( name => `String ${name} = dataFetchingEnvironment.getArgument("${name}");` )
}

export function callResolvers<G> ( p: MainPageD<any, G>, restName: string, r: RestD<G>, name: string, dbNameString: string, resolvers: MutationDetail[] ) {
  return resolvers.flatMap ( ( md, i ) =>
    [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
      '//' + JSON.stringify ( md.params ),
      `${paramsDeclaration ( md, i )} ${mutationMethodName ( r, name, md )}(connection,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
      ...outputParamsDeclaration ( md, i )
    ] );
}
function addParams<G> ( resolvers: MutationDetail[] ) {
  return resolvers.flatMap ( r => toArray ( r.params ) ).flatMap ( p => typeof p !== 'string' && p.type === 'output' ? [ `result.put("${p.name}", ${p.name});` ] : [] )
}
export function makeFetcherMethod<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
  return [
    `public DataFetcher<${resolverData.javaType}> ${resolverData.resolver}(){`,
    ...indentList ( [
      'return dataFetchingEnvironment -> {',
      ...indentList ( [
        ...declareInputParamsFromEndpoint ( r ),
        'try(Connection connection = dataSource.getConnection()){',
        ...indentList ( [
          'Map<String,Object> result = new HashMap<>();',
          ...callResolvers ( p, restName, r, resolverData.name, 'dbName', resolvers ),
          '',
          ...addParams ( resolvers ),
          'return result;' ] ),
        '}};', ] ),
      '}' ] )
  ]
}


export function findResolverData ( errorPrefix: string, childResolverData: ResolverData[], resolverName: string ) {
  const result = childResolverData.find ( rd => rd.name == resolverName )
  if ( result ) return result
  throw Error ( `${errorPrefix} cannot find resolver ${resolverName}. Legal values are ${childResolverData.map ( r => r.name ).sort ()}` )
}
//this is just hacking it in to see if it will work. Only works for get at moment
export function makeResolvers<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolverName: string, resolver: Mutations, resolverData: ResolverData ): string[] {
  // let resolvers = Object.values ( safeObject ( r.resolvers ) ).flatMap ( toArray );
  // if ( resolvers.length == 0 ) return []
  let resolvers = toArray ( resolver );
  const { importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( resolvers, p, r, params );
  const methods = makeMutationMethod ( resolvers, resolverName, p, r, false )
  let interfaceName = fetcherInterfaceForResolverName ( params, r, resolverData.resolver);
  const fetcherMethod = makeFetcherMethod ( params, p, restName, r, resolvers, resolverData )
  return [
    `package ${params.thePackage}.${params.resolversPackage}.${p.name};`,
    `//${JSON.stringify ( resolverData )}`,
    ``,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    'import org.springframework.beans.factory.annotation.Autowired;',
    ``,
    'import java.util.Map;',
    'import java.util.HashMap;',
    `import java.sql.CallableStatement;`,
    `import java.sql.PreparedStatement;`,
    `import java.sql.ResultSet;`,
    `import java.sql.Connection;`,
    `import java.sql.SQLException;`,
    'import javax.sql.DataSource;',
    'import graphql.schema.DataFetcher;',
    `import ${fetcherPackageName ( params, p )}.${interfaceName};`,
    ...importsFromParams,
    ...importForTubles ( params ),
    ...toArray ( r.mutations ).flatMap ( m => m.mutateBy ).flatMap ( m => m.mutation === 'manual' ? toArray ( m.import ) : [] ),
    `@Component`,
    `public class ${resolverClassName ( r, resolverData.resolver )} implements ${interfaceName}{`,
    ``,
    '   @Autowired',
    '   private DataSource dataSource;',
    ...autowiringVariables,
    ...fetcherMethod,
    '',
    ...methods,
    ``,
    `public String dbName() {return IFetcher.db; }`,
    `}`
  ]
}