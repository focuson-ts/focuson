import { MainPageD } from "../common/pageD";
import { RestAction, safeArray, toArray } from "@focuson/utils";
import { JavaWiringParams } from "./config";
import { mutationClassName, mutationMethodName } from "./names";
import { RestD, SqlMutation, StoredProcedureMutation, unique } from "../common/restD";
import { indentList } from "./codegen";
import { ManualMutation, MutationDetail } from "../common/resolverD";

function findCodeForSpecificMutation ( m: StoredProcedureMutation | SqlMutation ) {
  if ( m.mutation === 'storedProc' ) return `CallableStatement s = connection.prepareCall("call ${m.name}(${m.params.map ( x => '?' ).join ( ", " )})")`;
  if ( m.mutation === 'sql' ) return `PreparedStatement s = connection.prepareStatement("${m.sql}")`
  throw Error ( `Don't know how to findCode for ${JSON.stringify ( m )}` )
}


export function mutationCodeForSqlCalls<G> ( p: MainPageD<any, any>, r: RestD<G>, restAction: RestAction, m: StoredProcedureMutation | SqlMutation ): string[] {
  let paramsForLog = m.params.length === 0 ? '' : m.params.join ( ' + ", " +' ) + '+';
  let codeForSpecificMutation = findCodeForSpecificMutation ( m )
  return [
    `    public void ${mutationMethodName ( r, restAction, m )}(Connection connection, ${unique ( [ 'dbName', ...m.params ], p => p ).map ( param => `String ${param}` ).join ( ", " )}) throws SQLException {`,
    `        if (dbName.equals(IFetcher.mock)) {`,
    `           System.out.println("Mock audit: ${mutationMethodName ( r, restAction, m )}(" + ${paramsForLog} ")");`,
    `           return;`,
    `    }`,
    `    try (${codeForSpecificMutation}) {`,
    ...indentList ( indentList ( indentList ( m.params.map ( ( param, i ) => `s.setObject(${i + 1},${param});` ) ) ) ),
    `    if (!s.execute()) throw new SQLException("Error in : ${mutationMethodName ( r, restAction, m )}");`,
    `  }}`,
  ];
}
export function mutationCodeForManual<G> ( p: MainPageD<any, any>, r: RestD<G>, restAction: RestAction, m: ManualMutation ): string[] {
  let paramsForLog = m.params.length === 0 ? '' : m.params.join ( ' + ", " +' ) + '+';
  return [
    `    public void ${mutationMethodName ( r, restAction, m )}(Connection connection, ${unique ( [ 'dbName', ...m.params ], p => p ).map ( param => `String ${param}` ).join ( ", " )}) throws SQLException {`,
    `        if (dbName.equals(IFetcher.mock)) {`,
    `           System.out.println("Mock audit: ${mutationMethodName ( r, restAction, m )}(" + ${paramsForLog} ")");`,
    `           return;`,
    `    }`,
    ...m.code,
    `  }`,
  ];
}
export function makeMutations<G> ( params: JavaWiringParams, p: MainPageD<any, any>, r: RestD<G> ): string[] {
  let mutations = safeArray ( r.mutations );
  if ( mutations.length == 0 ) return []
  const methods = mutations.flatMap ( ( { restAction, mutateBy } ) => toArray ( mutateBy ).flatMap ( ( m: MutationDetail ) => {
    if ( m.mutation === 'sql' || m.mutation === 'storedProc' ) return mutationCodeForSqlCalls ( p, r, restAction, m )
    if ( m.mutation === 'manual' ) return mutationCodeForManual ( p, r, restAction, m );
    throw Error ( `Don't know how to findCode (Page ${p.name}) for ${JSON.stringify ( m )}` )
  } ) )
  return [
    `package ${params.thePackage}.${params.mutatorPackage}.${p.name};`,
    ``,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import javax.sql.DataSource;`,
    `import java.sql.CallableStatement;`,
    `import java.sql.PreparedStatement;`,
    `import java.sql.Connection;`,
    `import java.sql.SQLException;`,
    `@Component`,
    `public class ${mutationClassName ( r )} {`,
    ``,
    ...methods,
    ``,
    `}`
  ]
}