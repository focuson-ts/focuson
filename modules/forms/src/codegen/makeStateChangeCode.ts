import { JavaWiringParams } from "./config";
import { MainPageD } from "../common/pageD";
import { isRestStateDetailsUsingSql, isRestStateDetailsUsingStoredProcedure, RestD, SqlForStateDetails, StoredProcedureForStateDetails } from "../common/restD";
import { isRestStateChange, RestAction, sortedEntries } from "@focuson/utils";
import { fetcherInterfaceName, fetcherPackageName, dbFetcherClassName, dbFetcherPackage, resolverName } from "./names";
import { getRestTypeDetails } from "@focuson/rest";
import { indentList } from "./codegen";


export interface CommonJavaDetails {
  errorPrefix: string;
  paramVariables: string[]
  setParams: string[];
  questionMarks: string;
}
export interface CreateJavaDetailsForStoredProcedure extends CommonJavaDetails {
  type: 'storedProcedure'
  useStoredProcedure: StoredProcedureForStateDetails
}
export interface CreateJavaDetailsForSSql extends CommonJavaDetails {
  type: 'sql'
  useSql: SqlForStateDetails
}
type CreateJavaDetailsForState = CreateJavaDetailsForStoredProcedure | CreateJavaDetailsForSSql

export function findParamDetails<G> ( errorPrefix: string, restD: RestD<G>, params: string[] ) {
  params.forEach ( name => {if ( restD.params[ name ] === undefined ) throw Error ( `${errorPrefix}Error in param for stored procedure. Param ${name}. Legal values are [${Object.keys ( restD.params )}] ` )} )
  const paramVariables = params.map ( name => `String ${name} = dataFetchingEnvironment.getArgument("${name}");` )
  const setParams = params.map ( ( name, i ) => `    s.setObject(${i + 1},${name});` )
  const questionMarks = params.map ( () => '?' ).join ( ', ' )
  return { errorPrefix, paramVariables, setParams, questionMarks }
}

export function findCreateJavaDetailsForState<B, G> ( pageD: MainPageD<B, G>, restName: string, restD: RestD<G>, action: RestAction ): CreateJavaDetailsForState | undefined {
  if ( restD.states === undefined || !isRestStateChange ( action ) ) return undefined
  const state = action.state
  const stateDetails = restD.states[ action.state ]
  const errorPrefix = `Page ${pageD.name}.rests[${restName}]. StoredProc for: ${state}`
  if ( isRestStateDetailsUsingStoredProcedure ( stateDetails ) ) return { ...findParamDetails ( errorPrefix, restD, stateDetails.useStoredProcedure.params ), type: 'storedProcedure', useStoredProcedure: stateDetails.useStoredProcedure }
  if ( isRestStateDetailsUsingSql ( stateDetails ) ) return { ...findParamDetails ( errorPrefix, restD, stateDetails.useSql.params ), type: 'sql', useSql: stateDetails.useSql }
  throw Error ( `${errorPrefix}. Cannot work out how to process ${JSON.stringify ( stateDetails )}` )
}

export function makHeartForSql<B, G> ( createJavaDetailsForState: CreateJavaDetailsForSSql ): string[] {
  const { setParams, questionMarks, useSql } = createJavaDetailsForState
  return [ `Connection connection = dataFetchingEnvironment.getLocalContext();`,
    `try(PreparedStatement s = connection.prepareStatement("${useSql.sql}")){`,
    ...setParams,
    `  return s.execute();`,
    `}};` ]
}
export function makeHeartForStoredProcedure<B, G> ( createJavaDetailsForState: CreateJavaDetailsForStoredProcedure ): string[] {
  const { setParams, questionMarks, useStoredProcedure } = createJavaDetailsForState
  return [ `Connection connection = dataFetchingEnvironment.getLocalContext();`,
    `try(CallableStatement s = connection.prepareCall("call ${useStoredProcedure.name}(${questionMarks})")){`,
    ...setParams,
    `  return s.execute();`,
    `}};` ]
}
export function makeHeartFor ( createJavaDetailsForState: CreateJavaDetailsForState ): string[] {
  if ( createJavaDetailsForState.type === 'storedProcedure' ) return makeHeartForStoredProcedure ( createJavaDetailsForState )
  if ( createJavaDetailsForState.type === 'sql' ) return makHeartForSql ( createJavaDetailsForState )
}

export function makeStateChangeCode<B, G> ( params: JavaWiringParams, pageD: MainPageD<B, G>, restName, restD: RestD<G>, action: RestAction ): string[] {
  if ( restD.states === undefined || !isRestStateChange ( action ) ) return []
  const details = findCreateJavaDetailsForState ( pageD, restName, restD, action )

  return [
    `package ${dbFetcherPackage ( params, pageD )};`,
    ``,
    `import   ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import  ${fetcherPackageName ( params, pageD )}.${fetcherInterfaceName ( params, restD, action )};`,
    `import graphql.schema.DataFetcher;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import java.sql.Connection;`,
    `import java.sql.CallableStatement;`,
    `import java.sql.PreparedStatement;`,
    `import java.util.Map;`,
    `import java.util.Optional;`,
    ``,
    `@Component`,
    `public class ${dbFetcherClassName ( params, restD, action )} implements ${fetcherInterfaceName ( params, restD, action )} {`,

    ``,
    `  @SuppressWarnings("SqlResolve")`,
    `  public DataFetcher ${resolverName ( restD, getRestTypeDetails ( action ) )}() {`,
    `    return dataFetchingEnvironment -> {`,
    ...indentList ( indentList ( indentList ( [
      ...details.paramVariables,
      ...makeHeartFor ( details )
    ] ) ) ),
    `  }`,
    ``,
    `  @Override`,
    `  public String dbName() {`,
    `    return IFetcher.db;`,
    `  }`,
    `}` ]

}

