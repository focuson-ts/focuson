import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { RestD } from "../common/restD";
import { toArray, unique } from "@focuson/utils";
import { allInputParamNames, importForTubles, MutationDetail, Mutations } from "../common/resolverD";
import { fetcherInterfaceForResolverName, fetcherPackageName, mutationMethodName, resolverClassName } from "./names";
import { makeCodeFragmentsForMutation, makeMutationMethod } from "./makeMutations";
import { ResolverData } from "./makeJavaFetchersInterface";
import { outputParamsDeclaration, paramsDeclaration } from "./makeSpringEndpoint";
import { indentList } from "./codegen";
import { isRepeatingDd } from "../common/dataD";

function declareInputParamsFromEndpoint<G> ( r: RestD<G> ): string[] {
  return unique ( [ [ 'String dbName', 'dbName' ], ...Object.entries ( r.params ).map ( ( [ name, p ] ) => [ `${p.javaType} ${name}`, name ] ) ], t => t[ 0 ] )
    .map ( ( [ typeAndName, name ] ) => `${typeAndName} = dataFetchingEnvironment.getArgument("${name}");` )
}

export function callResolvers<G> ( p: MainPageD<any, G>, restName: string, r: RestD<G>, name: string, dbNameString: string, resolvers: MutationDetail[] ) {
  return resolvers.flatMap ( ( md, i ) => {
    if ( md.list )
      return [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
        `List<Map<String,Object>> params${i} = ${mutationMethodName ( r, name, md )}(connection,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
      ];
    else
      return [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
        `${paramsDeclaration ( md, i )} ${mutationMethodName ( r, name, md )}(connection,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
        ...outputParamsDeclaration ( md, i )
      ];
  } );
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
  if ( resolverData.javaType === 'List<Map<String,Object>>' ) {
    const lastList = resolvers.reverse ().findIndex ( r => r.list )
    return [
      `List<Map<String,Object>> result= ${lastList >= 0 ? `params${resolvers.length - lastList - 1};` : "There isn't a resolver that is marked as a list;"}`,
      `return result;`
    ]
  }

  // throw new Error ( `${errorPrefix} Currently cannot make resolvers for lists` )
  return [
    `//If there is a compilation error is it because you don't have an output variable called ${resolverData.name}, or because it is the wrong type. It should be ${resolverData.javaType}`,
    `return ${resolverData.name};` ]

}

export function makeFetcherMethodForMap<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
  const errorPrefix = `${p.name}.rest[${restName}].resolvers[${resolverData.name}]`

  return [
    `public DataFetcher<${resolverData.javaType}> ${resolverData.resolver}(){`,
    ...indentList ( [
      'return dataFetchingEnvironment -> {',
      ...indentList ( [
        ...declareInputParamsFromEndpoint ( r ),
        'try(Connection connection = dataSource.getConnection()){',
        ...indentList ( [
          ...callResolvers ( p, restName, r, resolverData.resolver, 'dbName', resolvers ),
          ...makeCreateResult ( errorPrefix, resolvers, resolverData ),
        ] ),
        '}};', ] ),
      '}' ] )
  ]
}

export function findResolverData ( errorPrefix: string, childResolverData: ResolverData[], resolverName: string ) {
  const result = childResolverData.find ( rd => rd.resolver == resolverName )
  if ( result ) return result
  throw Error (` ${errorPrefix} is defined, but there are no dataD elements that use it. Legal values are [${childResolverData.map ( r => r.resolver ).sort ()}` )
}
function importsFromManual ( resolver: Mutations ) {
  return toArray ( resolver ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] );
}

export function makeFetcherMethodForList<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
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


export function makeResolvers<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolverName: string, resolver: Mutations, resolverData: ResolverData ): string[] {
  // let resolvers = Object.values ( safeObject ( r.resolvers ) ).flatMap ( toArray );
  // if ( resolvers.length == 0 ) return []
  let resolvers = toArray ( resolver );
  const { importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( resolvers, p, r, params );
  const methods = makeMutationMethod ( `${p.name}.rest[${restName}].resolvers[${resolverName}]`, resolvers, resolverName, p, r, false )
  let interfaceName = fetcherInterfaceForResolverName ( params, r, resolverData.resolver );
  const fetcherMethod = indentList (
    isRepeatingDd ( r.dataDD ) ?
      makeFetcherMethodForList ( params, p, restName, r, resolvers, resolverData ) :
      makeFetcherMethodForMap ( params, p, restName, r, resolvers, resolverData ) )
  return [
    `package ${params.thePackage}.${params.resolversPackage}.${p.name};`,
    ``,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    'import org.springframework.beans.factory.annotation.Autowired;',
    ``,
    'import java.util.List;',
    'import java.util.ArrayList;',
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