import { JavaWiringParams } from "./config";
import { MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { RestD } from "../common/restD";
import { fetcherInterfaceName, fetcherName, h2FetcherClassName, sqlMapName } from "./names";
import { indentList } from "./codegen";
import { findParamsForTable } from "./makeSqlFromEntities";


export function makeH2Fetchers<B, G> ( params: JavaWiringParams, pageD: MainPageD<B, G>, restName: string, rdp: RestDefnInPageProperties<G> ): string[] {
  const rest = rdp.rest
  const paramVariables = sortedEntries ( rest.params ).map ( ( [ name, props ] ) =>
    `String ${name} = dataFetchingEnvironment.getArgument("${name}");` )
  if ( rest.tables === undefined ) throw Error ( `Calling makeH2Fetchers when tables not defined for page ${pageD.name}` )
  const getAllParams = [ 'c',
    ...findParamsForTable ( `Error in page ${pageD.name} rest ${restName}`, rest.params, rest.tables )
      .map ( ( [ name, param ] ) =>
        `${param.javaParser}(${name})` ) ].join ( ',' )
  return [
    ` package ${params.thePackage}.${params.h2FetcherPackage};`,
    ``,
    `import  ${params.thePackage}.${params.dbPackage}.${sqlMapName ( pageD, restName, [] )};`,
    `import  ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import  ${params.thePackage}.${params.fetcherPackage}.${fetcherInterfaceName ( params, rdp.rest )};`,
    `import graphql.schema.DataFetcher;`,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import javax.sql.DataSource;`,
    `import java.sql.Connection;`,
    `import java.util.Map;`,
    `import java.util.Optional;`,
    ``,
    `  @Component`,
    `public class ${h2FetcherClassName ( params, rest )} implements ${fetcherInterfaceName ( params, rest )} {`,
    ``,
    `  @Autowired`,
    `  private DataSource dataSource;`,
    ``,
    `  public DataFetcher get${rest.dataDD.name}() {`,
    `    return dataFetchingEnvironment -> {`,
    ...indentList ( indentList ( indentList ( paramVariables ) ) ),
    `       Connection c = dataSource.getConnection();`,
    `       try {`,
    `         Optional<Map<String, Object>> opt = ${sqlMapName ( pageD, restName, [] )}.getAll(${getAllParams});`,
    `         Map json = opt.get();`,
    `         return json;`,
    `       } finally {`,
    `         c.close();`,
    `       }`,
    `    };`,
    `  }`,
    ``,
    `  @Override`,
    `  public String dbName() {`,
    `      return IFetcher.h2;`,
    `  }`,
    `}`,
  ]

}
