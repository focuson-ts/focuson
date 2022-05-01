import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { RestD } from "../common/restD";
import { isRestStateChange, RestAction, sortedEntries } from "@focuson/utils";
import { fetcherInterfaceName, fetcherPackageName, h2FetcherClassName, h2FetcherPackage, resolverName } from "./names";
import { getRestTypeDetails } from "@focuson/rest";
import { indentList } from "./codegen";


export function makeUseStoredProcedure<B, G> ( params: JavaWiringParams, pageD: MainPageD<B, G>, restName, restD: RestD<G>, action: RestAction ): string[] {
  if ( restD.states === undefined || !isRestStateChange ( action ) ) return []
  const stateDetails = restD.states[ action.state ]
  if ( stateDetails.useStoredProcedure === undefined ) return []

  let spParams = stateDetails.useStoredProcedure.params;
  spParams.forEach ( name => {if ( restD.params[ name ] === undefined ) throw Error ( `Error in param for stored procedure. Page ${pageD.name}.rests[${restName}]. StoredProc for: ${action.state}. Param ${name}. Legal values are [${Object.keys ( restD.params )}] ` )} )
  const paramVariables = spParams.map ( name => `String ${name} = dataFetchingEnvironment.getArgument("${name}");` )
  const setParams = spParams.map ( ( name, i ) => `    s.setObject(${i + 1},${name});` )
  const questionMarks = spParams.map ( () => '?' ).join ( ', ' )
  return [
    `package ${h2FetcherPackage ( params, pageD )};`,
    ``,
    `import   ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import  ${fetcherPackageName ( params, pageD )}.${fetcherInterfaceName ( params, restD, action )};`,
    `import graphql.schema.DataFetcher;`,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import javax.sql.DataSource;`,
    `import java.sql.Connection;`,
    `import java.sql.CallableStatement;`,
    `import java.util.Map;`,
    `import java.util.Optional;`,
    ``,
    `@Component`,
    `public class ${h2FetcherClassName ( params, restD, action )} implements ${fetcherInterfaceName ( params, restD, action )} {`,
    ``,
    `  @Autowired`,
    `  private DataSource dataSource;`,
    ``,
    `  @SuppressWarnings("SqlResolve")`,
    `  public DataFetcher ${resolverName ( restD, getRestTypeDetails ( action ) )}() {`,
    `    return dataFetchingEnvironment -> {`,
    ...indentList ( indentList ( indentList ( [
      ...paramVariables,
      `try (Connection c = dataSource.getConnection()) {`,
      `  try(CallableStatement s = c.prepareCall("call ${stateDetails.useStoredProcedure.name}(${questionMarks})")){`,
      ...setParams,
      `    return s.execute();`,
      `  }`,
      `}` ] ) ) ),
    `  };`,
    `}`,
    ``,
    `  @Override`,
    `  public String dbName() {`,
    `    return IFetcher.h2;`,
    `  }`,
    `}` ]

}