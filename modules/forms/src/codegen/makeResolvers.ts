import { JavaWiringParams } from "./config";
import { RefD } from "../common/pageD";
import { RestD } from "../common/restD";
import { toArray, unique } from "@focuson-nw/utils";
import { allInputParamNames, allOutputParams, allParentMutationParams, importForTubles, isAutoSqlResolver, isManualMutation, isMessageMutation, isMutationThatIsaList, isSelectMutationThatIsAList, isSqlMutationThatIsAList, ManualMutation, MutationDetail, Mutations, parametersFor } from "../common/resolverD";
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

export function callResolvers<G> ( p: RefD<G>, restName: string, r: RestD<G>, name: string, dbNameString: string, resolvers: MutationDetail[], indexPrefix: string ) {
  return resolvers.flatMap ( ( md, i ) => {
    if ( isMessageMutation ( md ) ) return [ `msgs.${md.level ? md.level : 'info'}("${md.message}");` ]
    if ( isSqlMutationThatIsAList ( md ) || isSelectMutationThatIsAList ( md ) )
      return [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
        `List<Map<String,Object>> params${i} = ${mutationMethodName ( r, name, md, indexPrefix + i )}(connection,msgs,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
      ];
    if ( isAutoSqlResolver ( md ) ) {
      const returnType = isRepeatingDd ( r.dataDD ) ? 'List<Map<String,Object>>' : 'Map<String,Object>'

      return [ `//Auto Sql Resolver from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
        `${returnType} result=  ${mutationMethodName ( r, name, md, indexPrefix + i )}(connection,msgs,${Object.keys ( r.params ).join ( ',' )});`,
      ];
    } else
      return [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( name )}]`,
        `${paramsDeclaration ( md, i )} ${mutationMethodName ( r, name, md, indexPrefix + i )}(connection,msgs,${[ dbNameString, ...allInputParamNames ( parametersFor ( md ) ) ].join ( ',' )});`,
        ...outputParamsDeclaration ( md, i )
      ];
  } );
}
function addParams<G> ( resolvers: MutationDetail[] ) {
  return resolvers.flatMap ( r =>
    isAutoSqlResolver ( r ) ?
      [ 'result.putAll(something)' ] :
      toArray ( parametersFor ( r ) ) ).flatMap ( p => typeof p !== 'string' && p.type === 'output' ? [ `result.put("${p.name}", ${p.name});` ] : [] )
}


function findManualMutationThatIsAList ( md: MutationDetail, name: string ): md is ManualMutation {
  return md.type === 'manual' && allOutputParams ( md.params ).find ( p => p.name === name && p.javaType === 'List<Map<String,Object>>' ) !== undefined
}

function makeCreateResultForlist ( revResolvers: MutationDetail[] ) {
  const lastList = revResolvers.findIndex ( m => isSqlMutationThatIsAList ( m ) || isSelectMutationThatIsAList ( m ) )
  return [
    `List<Map<String,Object>> result= ${lastList >= 0 ? `params${revResolvers.length - lastList - 1};` : "There isn't a resolver that is marked as a list;"}`,
    `return result;`
  ]
}
function makeCreateResultForManualList ( errorPrefix: string, resolver: ManualMutation, resolverData: ResolverData ) {
  const param = allOutputParams ( resolver.params ).reverse ().find ( p => p.javaType === 'List<Map<String,Object>>' )
  if ( param === undefined ) throw new Error ( `${errorPrefix} software error somehow have a resolver that doesn't have a List<Map<String,Object>> param. ${JSON.stringify ( resolver )}` )
  return [ `return ${param.name};` ]

}
function makeCreateResultForList ( errorPrefix: string, resolvers: MutationDetail[], resolverData: ResolverData ): string[] | undefined {
  const revResolvers = [ ...resolvers ].reverse ();
  const resolver: any = revResolvers.find ( md => isSqlMutationThatIsAList ( md ) || findManualMutationThatIsAList ( md, resolverData.name ) || isSelectMutationThatIsAList ( md ) )
  if ( resolver && isSqlMutationThatIsAList ( resolver ) ) return makeCreateResultForlist ( revResolvers )
  if ( resolver && isSelectMutationThatIsAList ( resolver ) ) return makeCreateResultForlist ( revResolvers )
  if ( resolver && resolver.type === 'Manual' ) return makeCreateResultForManualList ( errorPrefix, resolver, resolverData )
  if ( resolver === undefined ) return [ `There isn't a resolver that is marked as a list, or a manual mutation with an output param name ${resolverData.name} of type List<Map<String,Object>>;` ]
}
function makeCreateResultForObject ( errorPrefix: string, resolvers: MutationDetail[], resolverData: ResolverData ): string[] | undefined {
  const revResolvers = [ ...resolvers ].reverse ();
  const resolver = revResolvers.find ( m => isManualMutation ( m ) && allOutputParams ( m.params ).find ( p => p.javaType === 'Map<String,Object>' && p.name === resolverData.name ) )
  if ( resolver )
    return [ `return ${resolverData.name};` ]
  else
    return [
      `${resolverData.javaType} result=new HashMap<>();`,
      ...addParams ( resolvers.filter ( r => !isMutationThatIsaList ( r ) ) ),
      `return result;`
    ]
}

export function makeCreateResult ( errorPrefix: string, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
  const auto = resolvers.find ( isAutoSqlResolver )
  if ( auto !== undefined ) return [ `return result;` ]
  if ( resolverData.javaType === 'Map<String,Object>' ) return makeCreateResultForObject ( errorPrefix, resolvers, resolverData )
  if ( resolverData.javaType === 'List<Map<String,Object>>' ) {
    const result = makeCreateResultForList ( errorPrefix, resolvers, resolverData )
    if ( result !== undefined ) return result
  }
  return [
    `//If there is a compilation error is it because you don't have an output variable called ${resolverData.name}, or because it is the wrong type. It should be ${resolverData.javaType}`,
    `return ${resolverData.name};` ]

}

export function makeFetcherMethodForMap<G> ( params: JavaWiringParams, p: RefD<G>, restName: string, r: RestD<G>, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
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
  throw Error ( ` ${errorPrefix} is defined, but there are no dataD elements that use it. Legal values are [${childResolverData.map ( r => r.resolver ).sort ()}]` )
}
export function importsFromManual ( resolver: Mutations ) {

  return toArray ( resolver ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] );
}

function declareInputParamsFromParent<G> ( r: RestD<G>, resolvers: MutationDetail[] ): string[] {
  const parentMParams = resolvers.flatMap ( r => allParentMutationParams ( parametersFor ( r ) ) )
  if ( parentMParams.length === 0 ) return []
  return [ `Map<String,Object> paramsFromParent = dataFetchingEnvironment.getSource();`,
    ...parentMParams.map ( p => `${p.javaType} ${p.name} = (${p.javaType})paramsFromParent.get("${p.name}");` ) ];
}
export function makeFetcherMethodForList<G> ( params: JavaWiringParams, p: RefD<G>, restName: string, r: RestD<G>, resolvers: MutationDetail[], resolverData: ResolverData ): string[] {
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


export function makeResolvers<G> ( params: JavaWiringParams, ref: RefD<G>, restName: string, r: RestD<G>, resolverName: string, resolver: Mutations, resolverData: ResolverData ): string[] {
  let resolvers = toArray ( resolver );
  const { importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( resolvers, ref, r, params );
  const methods = makeMutationMethod ( params, `${ref.name}.rest[${restName}].resolvers[${resolverName}]`, resolvers, resolverName, ref, r, false, '' )
  let interfaceName = fetcherInterfaceForResolverName ( params, r, resolverData.resolver );
  const fetcherMethod = indentList (
    isRepeatingDd ( r.dataDD ) ?
      makeFetcherMethodForList ( params, ref, restName, r, resolvers, resolverData ) :
      makeFetcherMethodForMap ( params, ref, restName, r, resolvers, resolverData ) )
  return [
    `package ${params.thePackage}.${params.resolversPackage}.${ref.name};`,
    ``,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    'import org.springframework.beans.factory.annotation.Autowired;',
    ``,
    'import org.slf4j.Logger;',
    'import org.slf4j.LoggerFactory;',
    'import java.text.MessageFormat;',
    'import java.util.*;',
    `import java.sql.*;`,
    'import graphql.schema.DataFetcher;',
    `import ${fetcherPackageName ( params, ref )}.${interfaceName};`,
    `import ${params.thePackage}.${params.utilsPackage}.LoggedDataSource;`,
    `import ${params.thePackage}.${params.utilsPackage}.Messages;`,
    `import ${params.thePackage}.${params.utilsPackage}.FocusonNotFound404Exception;`,
    `import ${params.thePackage}.${params.utilsPackage}.FocusonBadRequest400Exception;`,
    `import static ${params.thePackage}.${params.utilsPackage}.GraphQlUtils.getData;`,
    `import ${params.thePackage}.${params.utilsPackage}.DateFormatter;`,
    `import ${params.thePackage}.${params.utilsPackage}.IOGNL;`,
    ...importsFromParams,
    ...importForTubles ( params ),
    ...importsFromManual ( resolver ),
    ...toArray ( r.mutations ).flatMap ( m => m.mutateBy ).flatMap ( m => m.type === 'manual' ? toArray ( m.import ) : [] ),
    `@Component`,
    `public class ${resolverClassName ( r, resolverData.resolver )} implements ${interfaceName}{`,
    ``,
    `   Logger logger = LoggerFactory.getLogger(getClass());`,
    ``,
    `   @Autowired `,
    `   IOGNL ognlForBodyAsJson;`,
    '',
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