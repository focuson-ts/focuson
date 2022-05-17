import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { RestD, unique } from "../common/restD";
import { actionsEqual, RestAction, safeArray, safeObject, toArray } from "@focuson/utils";
import { allInputParamNames, importForTubles, MutationDetail } from "../common/resolverD";
import { fetcherInterfaceName, fetcherPackageName, mutationMethodName, resolverClassName, resolverName } from "./names";
import { makeCodeFragmentsForMutation } from "./makeMutations";
import { findJavaType } from "./makeJavaFetchersInterface";
import { defaultRestAction } from "@focuson/rest";
import { outputParamsDeclaration, paramsDeclaration } from "./makeSpringEndpoint";
import { indentList } from "./codegen";

function declareInputParamsFromEndpoint<G> ( r: RestD<G> ): string[] {
  return unique ( [ 'dbName',...Object.keys ( r.params ) ], t => t ).map ( name => `String ${name} = dataFetchingEnvironment.getArgument("${name}");` )
}

export function callResolvers<G> ( p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction, dbNameString: string, resolvers: MutationDetail[] ) {
  return indentList ( resolvers.filter ( a => actionsEqual ( 'get', restAction ) ).flatMap ( ( md, i ) =>
    [ `//from ${p.name}.rest[${restName}].resolvers[${JSON.stringify ( restAction )}]`,
      '//' + JSON.stringify ( md.params ),
      `${paramsDeclaration ( md, i )} ${mutationMethodName ( r, restAction, md )}(connection,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
      ...outputParamsDeclaration ( md, i )
    ] ) );
}

export function makeFetcherMethod<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G>, resolvers: MutationDetail[] ): string[] {
  return [
    `public DataFetcher<${findJavaType ( r.dataDD )}> ${resolverName ( r, defaultRestAction[ 'get' ] )}(){`,
    '  return dataFetchingEnvironment -> {',
    ...declareInputParamsFromEndpoint ( r ),
    '      try(Connection connection = dataSource.getConnection()){',
    '         Map<String,Object> result = new HashMap<>();',
    ...callResolvers ( p, restName, r, 'get', 'dbName', resolvers ),
    '         return result;',
    '  }};',
    '}'
  ]
}
//this is just hacking it in to see if it will work. Only works for get at moment
export function makeResolvers<G> ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<G> ): string[] {
  let resolvers = Object.values ( safeObject ( r.resolvers ) ).flatMap ( toArray );
  if ( resolvers.length == 0 ) return []
  const { methods, importsFromParams, autowiringVariables } = makeCodeFragmentsForMutation ( resolvers.map ( r => ({ restAction: 'get', mutateBy: r }) ), p, r, params );
  let interfaceName = fetcherInterfaceName ( params, r, 'get' );
  const fetcherMethod = makeFetcherMethod ( params, p, restName, r, resolvers )
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
    ...toArray ( r.mutations ).flatMap ( m => m.mutateBy ).flatMap ( m => m.mutation === 'manual' ? toArray ( m.import ) : [] ),
    `@Component`,
    `public class ${resolverClassName ( r )} implements ${interfaceName}{`,
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