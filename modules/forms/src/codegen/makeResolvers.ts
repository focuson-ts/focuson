import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { RestD } from "../common/restD";
import { toArray, unique } from "@focuson/utils";
import { allInputParamNames, allParentMutationParams, importForTubles, isMessageMutation, isSqlMutationThatIsAList, MutationDetail, Mutations, parametersFor } from "../common/resolverD";
import { fetcherInterfaceForResolverName, fetcherPackageName, mutationMethodName, resolverClassName } from "./names";
import { makeCodeFragmentsForMutation, makeMutationMethod } from "./makeMutations";
import { ResolverData } from "./makeJavaFetchersInterface";
import { outputParamsDeclaration, paramsDeclaration } from "./makeSpringEndpoint";
import { indentList } from "./codegen";
import { isRepeatingDd } from "../common/dataD";

function declareInputParamsFromEndpoint<G> ( r: RestD<G> ): string[] {
  return unique ( [ [ 'String dbName', 'dbName' ], ...Object.entries ( r.params ).map ( ( [ name, p ] ) => [ `${p.javaType} ${name}`, name ] ) ], t => t[ 0 ] )
    .map ( ( [ typeAndName, name ] ) => `${typeAndName} =  getData(dataFetchingEnvironment, "${name}");` )//      Integer accountId =getData(dataFetchingEnvironment, "accountId", Integer.class);
}

export function callResolvers<G> ( p: MainPageD<any, G>, restName: string, r: RestD<G>, name: string, dbNameString: string, resolvers: MutationDetail[], indexPrefix: string ) {
  return resolvers.flatMap ( ( md, i ) => {
    if ( isMessageMutation ( md ) ) return [`msgs.${md.level ? md.level : 'info'}("${md.message}");` ]
    if ( isSqlMutationThatIsAList ( md ) )
      return [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
        `List<Map<String,Object>> params${i} = ${mutationMethodName ( r, name, md, indexPrefix + i )}(connection,msgs,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
      ];
    else
      return [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
        `${paramsDeclaration ( md, i )} ${mutationMethodName ( r, name, md, indexPrefix + i )}(connection,msgs,${[ dbNameString, ...allInputParamNames ( parametersFor ( md ) ) ].join ( ',' )});`,
        ...outputParamsDeclaration ( md, i )
      ];
  } );
}
function addParams<G> ( resolvers: MutationDetail[] ) {
  return resolvers.flatMap ( r => toArray ( parametersFor ( r ) ) ).flatMap ( p => typeof p !== 'string' && p.type === 'output' ? [ `result.put("${p.name}", ${p.name});` ] : [] )
}

export function makeCreateResult ( errorPrefix: string, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
  if ( resolverData.javaType === 'Map<String,Object>' ) return [
    `${resolverData.javaType} result=new HashMap<>();`,
    ...addParams ( resolvers ),
    `return result;`
  ]
  if ( resolverData.javaType === 'List<Map<String,Object>>' ) {
    const lastList = resolvers.reverse ().findIndex ( isSqlMutationThatIsAList )
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
        ...declareInputParamsFromParent ( r, resolvers ),
        `Messages msgs=dataFetchingEnvironment.getLocalContext();`,
        `Connection connection = dataSource.getConnection(getClass());`,
        `try  {`,
        // 'try(Connection connection = dataSource.getConnection()){',
        ...indentList ( [
          ...callResolvers ( p, restName, r, resolverData.resolver, 'dbName', resolvers, '' ),
          ...makeCreateResult ( errorPrefix, resolvers, resolverData ),
        ] ),
        ' } finally {dataSource.close(getClass(),connection);}', ] ),
      '};}' ] )
  ]
}

export function findResolverData ( errorPrefix: string, childResolverData: ResolverData[], resolverName: string ) {
  const result = childResolverData.find ( rd => rd.resolver == resolverName )
  if ( result ) return result
  throw Error ( ` ${errorPrefix} is defined, but there are no dataD elements that use it. Legal values are [${childResolverData.map ( r => r.resolver ).sort ()}` )
}
function importsFromManual ( resolver: Mutations ) {
  return toArray ( resolver ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] );
}

function declareInputParamsFromParent<G> ( r: RestD<G>, resolvers: MutationDetail[] ): string[] {
  const parentMParams = resolvers.flatMap ( r => allParentMutationParams ( parametersFor ( r ) ) )
  if ( parentMParams.length === 0 ) return []
  return [ `Map<String,Object> paramsFromParent = dataFetchingEnvironment.getSource();`,
    ...parentMParams.map ( p => `${p.javaType} ${p.name} = (${p.javaType})paramsFromParent.get("${p.name}");` ) ];
}
export function makeFetcherMethodForList<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
  const errorPrefix = `${p.name}.rest[${restName}].resolvers[${resolverData.name}]`
  return [
    `public DataFetcher<${resolverData.javaType}> ${resolverData.resolver}(){`,
    ...indentList ( [
      'return dataFetchingEnvironment -> {',
      ...indentList ( [
        ...declareInputParamsFromEndpoint ( r ),
        ...declareInputParamsFromParent ( r, resolvers ),
        ` Messages msgs=dataFetchingEnvironment.getLocalContext();`,
        `Connection connection = dataSource.getConnection(getClass());`,
        `try  {`,
        ...indentList ( [
          ...callResolvers ( p, restName, r, resolverData.name, 'dbName', resolvers, '' ),
          ...makeCreateResult ( errorPrefix, resolvers, resolverData ),
        ] ),
        ' } finally {dataSource.close(getClass(),connection);}', ] ),
      '};}' ] )

  ]
}


export function makeResolvers<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolverName: string, resolver: Mutations, resolverData: ResolverData ): string[] {
  // let resolvers = Object.values ( safeObject ( r.resolvers ) ).flatMap ( toArray );
  // if ( resolvers.length == 0 ) return []
  let resolvers = toArray ( resolver );
  const { importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( resolvers, p, r, params );
  const methods = makeMutationMethod ( `${p.name}.rest[${restName}].resolvers[${resolverName}]`, resolvers, resolverName, p, r, false, '' )
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
    `import java.util.Date;`,
    `import java.sql.CallableStatement;`,
    `import java.sql.PreparedStatement;`,
    `import java.sql.ResultSet;`,
    `import java.sql.Connection;`,
    `import java.sql.SQLException;`,
    'import graphql.schema.DataFetcher;',
    `import java.text.SimpleDateFormat;`,
    `import ${fetcherPackageName ( params, p )}.${interfaceName};`,
    `import ${params.thePackage}.${params.utilsPackage}.LoggedDataSource;`,
    `import ${params.thePackage}.${params.utilsPackage}.Messages;`,
    `import ${params.thePackage}.${params.utilsPackage}.FocusonNotFound404Exception;`,
    `import static ${params.thePackage}.${params.utilsPackage}.GraphQlUtils.getData;`,
    ...importsFromParams,
    ...importForTubles ( params ),
    ...importsFromManual ( resolver ),
    ...toArray ( r.mutations ).flatMap ( m => m.mutateBy ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] ),
    `@Component`,
    `public class ${resolverClassName ( r, resolverData.resolver )} implements ${interfaceName}{`,
    ``,
    '   @Autowired',
    '   private LoggedDataSource dataSource;',
    ...autowiringVariables,
    ...fetcherMethod,
    '',
    ...methods,
    ``,
    `public String dbName() {return IFetcher.db; }`,
    `}`
  ]
}