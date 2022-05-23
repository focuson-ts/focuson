import { JavaWiringParams } from "./config";
import { MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { RestD } from "../common/restD";
import { fetcherName, fetcherPackageName, dbFetcherClassName, dbFetcherPackage, resolverName, sqlMapName, sqlMapPackageName, fetcherInterfaceForResolverName, fetcherInterfaceName } from "./names";
import { indentList } from "./codegen";
import { findParamsForTable } from "./makeSqlFromEntities";
import { getRestTypeDetails, restActionToDetails } from "@focuson/rest";
import { isRepeatingDd } from "../common/dataD";
import { findJavaType } from "./makeJavaFetchersInterface";


export function makeDBFetchers<B, G> ( params: JavaWiringParams, pageD: MainPageD<B, G>, restName: string, rdp: RestDefnInPageProperties<G> ): string[] {
  const rest = rdp.rest
  if ( rest.actions.indexOf ( 'get' ) < 0 ) return []
  const paramVariables = sortedEntries ( rest.params ).map ( ( [ name, props ] ) =>
    `String ${name} = dataFetchingEnvironment.getArgument("${name}");` )
  if ( rest.tables === undefined ) throw Error ( `Calling makeH2Fetchers when tables not defined for page ${pageD.name}` )
  const getAllParams = [ 'c',
    ...findParamsForTable ( `Error in page ${pageD.name} rest ${restName}`, rest.params, rest.tables )
      .map ( ( { name, param } ) =>
        `${param.javaParser}(${name})` ) ].join ( ',' )
  const getDataFromRS: string[] = isRepeatingDd ( rdp.rest.dataDD ) ?
    [ `         List<Map<String, Object>> list = ${sqlMapName ( pageD, restName, [] )}.getAll(${getAllParams});`,
      `         return list;`, ] :
    [ `         Optional<Map<String, Object>> opt = ${sqlMapName ( pageD, restName, [] )}.getAll(${getAllParams});`,
      `         Map json = opt.get();`,
      `         return json;`, ]


  return [
    ` package ${dbFetcherPackage ( params, pageD )};`,
    ``,
    `import  ${sqlMapPackageName ( params, pageD )}.${sqlMapName ( pageD, restName, [] )};`,
    `import  ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import  ${fetcherPackageName ( params, pageD )}.${fetcherInterfaceName ( params, rdp.rest, 'get' )};`,
    `import graphql.schema.DataFetcher;`,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import javax.sql.DataSource;`,
    `import java.sql.Connection;`,
    `import java.util.Map;`,
    `import java.util.List;`,
    `import java.util.Optional;`,
    ``,
    `  @Component`,
    `public class ${dbFetcherClassName ( params, rest, 'get' )} implements ${fetcherInterfaceName ( params, rest, "get" )} {`,
    ``,
    `  @Autowired`,
    `  private DataSource dataSource;`,
    ``,
    `  public DataFetcher<${findJavaType ( rest.dataDD )}> ${resolverName ( rest,  'get' )}() {`,
    `    return dataFetchingEnvironment -> {`,
    ...indentList ( indentList ( indentList ( paramVariables ) ) ),
    `       Connection c = dataSource.getConnection();`,
    `       try {`,
    `         //from the data type in ${pageD.name}.rest[${restName}].dataDD which is a ${rdp.rest.dataDD.name} `,
    ...getDataFromRS,
    `       } finally {`,
    `         c.close();`,
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
