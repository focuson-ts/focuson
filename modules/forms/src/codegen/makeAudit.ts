import { MainPageD } from "../common/pageD";
import { RestAction, safeArray, toArray } from "@focuson/utils";
import { JavaWiringParams } from "./config";
import { auditClassName, auditMethodName } from "./names";
import { RestD } from "../common/restD";
import { indentList } from "./codegen";


export function makeAudit<G> ( params: JavaWiringParams, p: MainPageD<any, any>, r: RestD<G> ): string[] {
  let audits = safeArray ( r.audit );
  if ( audits.length == 0 ) return []
  const methods = audits.flatMap ( ( { restAction, storedProcedure } ) => toArray ( storedProcedure ).flatMap ( sp => [
    `    public void ${auditMethodName ( r, restAction, sp )}(${[ 'dbName', ...sp.params ].map ( param => `String ${param}` ).join ( ", " )}) throws SQLException {`,
    `        if (dbName.equals(IFetcher.mock)) {`,
    `           System.out.println("Mock audit: EAccountsSummary_state_invalidate_auditStuff(" + accountId + "," + customerId + ")");`,
    `           return;`,
    `    }`,
    `    try (Connection c = dataSource.getConnection()) {`,
    `      try (CallableStatement s = c.prepareCall("call ${sp.name}(${sp.params.map ( x => '?' ).join ( ", " )})")) {`,
    ...indentList ( indentList ( indentList ( sp.params.map ( ( param, i ) => `s.setObject(${i + 1},${param});` ) ) ) ),
    `      if (!s.execute()) throw new SQLException("Count not audit");`,
    `  }}}`,
  ] ) )
  return [
    `package ${params.thePackage}.${params.auditPackage}.${p.name};`,
    ``,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.stereotype.Component;`,
    ``,
    `import javax.sql.DataSource;`,
    `import java.sql.CallableStatement;`,
    `import java.sql.Connection;`,
    `import java.sql.SQLException;`,
    `@Component`,
    `public class ${auditClassName ( r )} {`,
    `    @Autowired`,
    `    private DataSource dataSource;`,
    ``,
    ...methods,
    ``,
    `}`
  ]
}