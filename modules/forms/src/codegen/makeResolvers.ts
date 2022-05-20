import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { RestD, unique } from "../common/restD";
import { toArray } from "@focuson/utils";
import { allInputParamNames, importForTubles, MutationDetail, Mutations } from "../common/resolverD";
import { fetcherInterfaceForResolverName, fetcherPackageName, mutationMethodName, resolverClassName } from "./names";
import { makeCodeFragmentsForMutation, makeMutationMethod } from "./makeMutations";
import { ResolverData } from "./makeJavaFetchersInterface";
import { outputParamsDeclaration, paramsDeclaration } from "./makeSpringEndpoint";
import { indentList } from "./codegen";

function declareInputParamsFromEndpoint<G> ( r: RestD<G> ): string[] {
  return unique ( [ [ 'String dbName', 'dbName' ], ...Object.entries ( r.params ).map ( ( [ name, p ] ) => [ `${p.javaType} ${name}`, name ] ) ], t => t[ 0 ] )
    .map ( ( [ typeAndName, name ] ) => `${typeAndName} = dataFetchingEnvironment.getArgument("${name}");` )
}

export function callResolvers<G> ( p: MainPageD<any, G>, restName: string, r: RestD<G>, name: string, dbNameString: string, resolvers: MutationDetail[] ) {
  return resolvers.flatMap ( ( md, i ) =>
    [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
      `${paramsDeclaration ( md, i )} ${mutationMethodName ( r, name, md )}(connection,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
      ...outputParamsDeclaration ( md, i )
    ] );
}
function addParams<G> ( resolvers: MutationDetail[] ) {
  return resolvers.flatMap ( r => toArray ( r.params ) ).flatMap ( p => typeof p !== 'string' && p.type === 'output' ? [ `result.put("${p.name}", ${p.name});` ] : [] )
}

function makeCreateResult ( errorPrefix: string, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
  if ( resolverData.javaType === 'Map<String,Object>' ) return [
    `${resolverData.javaType} result=new HashMap<>();`,
    ...addParams ( resolvers ),
    `return result;`
  ]
  if ( resolverData.javaType === 'List<Map<String,Object>>' ) throw new Error ( `${errorPrefix} Currently cannot make resolvers for lists` )
  return [
    `//If there is a compilation error is it because you don't have an output variable called ${resolverData.name}, or because it is the wrong type. It should be ${resolverData.javaType}`,
    `return ${resolverData.name};` ]

}

export function makeFetcherMethod<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
  const errorPrefix = `${p.name}.rest[${restName}].resolvers[${resolverData.name}]`

  return [
    `public DataFetcher<${resolverData.javaType}> ${resolverData.resolver}(){`,
    ...indentList ( [
      'return dataFetchingEnvironment -> {',
      ...indentList ( [
        ...declareInputParamsFromEndpoint ( r ),
        'try(Connection connection = dataSource.getConnection()){',
        ...indentList ( [
          ...callResolvers ( p, restName, r, resolverData.name, 'dbName', resolvers ),
          ...makeCreateResult ( errorPrefix, resolvers, resolverData ),
        ] ),
        '}};', ] ),
      '}' ] )
  ]
}


export function findResolverData ( errorPrefix: string, childResolverData: ResolverData[], resolverName: string ) {
  const result = childResolverData.find ( rd => rd.name == resolverName )
  if ( result ) return result
  throw Error ( `${errorPrefix} cannot find resolver ${resolverName}. Legal values are ${childResolverData.map ( r => r.name ).sort ()}` )
}
function importsFromManual ( resolver: Mutations ) {
  return toArray ( resolver ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] );
}
//this is just hacking it in to see if it will work. Only works for get at moment
export function makeResolvers<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolverName: string, resolver: Mutations, resolverData: ResolverData ): string[] {
  // let resolvers = Object.values ( safeObject ( r.resolvers ) ).flatMap ( toArray );
  // if ( resolvers.length == 0 ) return []
  let resolvers = toArray ( resolver );
  const { importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( resolvers, p, r, params );
  const methods = makeMutationMethod ( resolvers, resolverName, p, r, false )
  let interfaceName = fetcherInterfaceForResolverName ( params, r, resolverData.resolver );
  const fetcherMethod = indentList ( makeFetcherMethod ( params, p, restName, r, resolvers, resolverData ) )
  return [
    `package ${params.thePackage}.${params.resolversPackage}.${p.name};`,
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
    ...importsFromManual ( resolver ),
    ...toArray ( r.mutations ).flatMap ( m => m.mutateBy ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] ),
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