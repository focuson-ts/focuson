import { JavaWiringParams } from "./config";
import { RefD, RestDefnInPageProperties } from "../common/pageD";
import { safeObject, sortedEntries, toArray } from "@focuson/utils";
import { dbFetcherClassName, dbFetcherPackage, fetcherInterfaceName, fetcherPackageName, resolverName, sqlMapName, sqlMapPackageName } from "./names";
import { indentList } from "./codegen";
import { findParamsForTable } from "./makeSqlFromEntities";
import { AllDataDD, isRepeatingDd } from "../common/dataD";
import { findJavaType } from "./makeJavaFetchersInterface";
import { EntityAndWhere, RestD } from "../common/restD";
import { isAutoSqlResolver } from "../common/resolverD";


export function getDataFromRS<G> ( dataD: AllDataDD<G>, pageD: RefD<G>, restOrResolverName: string, r: RestD<G>, tables: EntityAndWhere ) {
  const getAllParams = getAllParamsForDbFetcher ( pageD, restOrResolverName, r, tables )
  return isRepeatingDd ( dataD ) ?
    [ `         List<Map<String, Object>> list = ${sqlMapName ( pageD, restOrResolverName, [] )}.getAll(${getAllParams});`,
      `         return list;`, ] :
    [ `         Optional<Map<String, Object>> opt = ${sqlMapName ( pageD, restOrResolverName, [] )}.getAll(${getAllParams});`,
      `         if (opt.isPresent()) { `,
      `            Map json = opt.get();`,
      `            return json;`,
      `         } else throw new FocusonNotFound404Exception(msgs);` ];
}
export function getAllParamsForDbFetcher<G> ( pageD: RefD<G>, restName: string, rest: RestD<G>, tables: EntityAndWhere ) {
  const getAllParams = [ 'c', 'msgs',
    ...findParamsForTable ( `Error in page ${pageD.name} rest ${restName}`, rest.params, tables )
      .map ( ( { name, param } ) => name ) ].join ( ',' )
  return getAllParams;
}
export function makeDBFetchers<B, G> ( params: JavaWiringParams, ref: RefD<G>, restName: string, rdp: RestDefnInPageProperties<G>, tables: EntityAndWhere ): string[] {
  const rest = rdp.rest
  if ( rest.actions.indexOf ( 'get' ) < 0 ) return []
  const paramVariables = sortedEntries ( rest.params ).map ( ( [ name, props ] ) =>
    `${props.javaType} ${name} = dataFetchingEnvironment.getArgument("${name}");` )
  if ( rest.tables === undefined ) throw Error ( `Calling makeDBFetchers when tables not defined for page ${ref.name}` )

  const hasImportMaps = Object.values ( safeObject ( rdp.rest.resolvers ) ).flatMap ( toArray ).find ( r => isAutoSqlResolver ( r ) )
  const importMaps = hasImportMaps? [ `import ${params.thePackage}.${params.dbPackage}.${ref.name}`]:[]
  return [
    ` package ${dbFetcherPackage ( params, ref )};`,
    ``,
    `import  ${sqlMapPackageName ( params, ref )}.${sqlMapName ( ref, restName, [] )};`,
    `import  ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import  ${fetcherPackageName ( params, ref )}.${fetcherInterfaceName ( params, rdp.rest, 'get' )};`,
    `import graphql.schema.DataFetcher;`,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import ${params.thePackage}.${params.utilsPackage}.LoggedDataSource;`,
    `import ${params.thePackage}.${params.utilsPackage}.Messages;`,
    `import ${params.thePackage}.${params.utilsPackage}.FocusonNotFound404Exception;`,
    `import java.sql.Connection;`,
    `import java.util.Map;`,
    `import java.util.List;`,
    `import java.util.Optional;`,
    `import java.util.Date;`,
    `import java.text.SimpleDateFormat;`,
    ...importMaps,
    ``,
    `  @Component`,
    `public class ${dbFetcherClassName ( params, rest, 'get' )} implements ${fetcherInterfaceName ( params, rest, "get" )} {`,
    ``,
    `  @Autowired`,
    `  private LoggedDataSource dataSource;`,
    ``,
    `  public DataFetcher<${findJavaType ( rest.dataDD )}> ${resolverName ( rest, 'get' )}() {`,
    `    return dataFetchingEnvironment -> {`,
    ...indentList ( indentList ( indentList ( paramVariables ) ) ),
    `       Messages msgs = dataFetchingEnvironment.getLocalContext();`,
    `       Connection c = dataSource.getConnection(getClass());`,
    `       try {`,
    `         //from the data type in ${ref.name}.rest[${restName}].dataDD which is a ${rdp.rest.dataDD.name} `,
    ...getDataFromRS ( rdp.rest.dataDD, ref, restName, rest, tables ),
    `       } finally {`,
    `        dataSource.close(getClass(), c);`,
    `       }`,
    `    };`,
    `  }`,
    ``,
    `  @Override`,
    `  public String dbName() {`,
    `      return IFetcher.db;`,
    `  }`,
    `}`,
  ]

}
