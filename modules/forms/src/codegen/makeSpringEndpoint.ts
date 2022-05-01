import { postFixForEndpoint, RestD } from "../common/restD";
import { endPointName, queryClassName, queryName, queryPackage, restControllerName, sampleName, sqlMapName } from "./names";
import { JavaWiringParams } from "./config";
import { beforeSeparator, isRestStateChange, RestAction, safeObject, sortedEntries } from "@focuson/utils";
import { filterParamsByRestAction, indentList } from "./codegen";
import { isRepeatingDd } from "../common/dataD";
import { MainPageD } from "../common/pageD";
import { getRestTypeDetails, getUrlForRestAction } from "@focuson/rest";


function makeCommaIfHaveParams<G> ( r: RestD<G>, restAction: RestAction ) {
  const params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) );
  return params.length === 0 ? '' : ', '
}

export function makeParamsForJava<G> ( r: RestD<G>, restAction: RestAction ): string {
  const params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) );
  const comma = makeCommaIfHaveParams ( r, restAction );
  const requestParam = getRestTypeDetails ( restAction ).params.needsObj ? `${comma}@RequestBody String body` : ""
  return params.map ( (( [ name, param ] ) => `@RequestParam String ${name}`) ).join ( ", " ) + requestParam
}
function paramsForQuery<G> ( r: RestD<G>, restAction: RestAction ): string {
  const clazz = isRepeatingDd ( r.dataDD ) ? 'List' : 'Map'
  let params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) );
  const comma = params.length === 0 ? '' : ', '
  const objParam = getRestTypeDetails ( restAction ).params.needsObj ? `${comma}  Transform.removeQuoteFromProperties(body, ${clazz}.class)` : ""
  return params.map ( ( [ name, param ] ) => name ).join ( ", " ) + objParam
}

function mappingAnnotation ( restAction: RestAction ) {
  if ( restAction === 'get' ) return 'GetMapping'
  if ( restAction === 'update' ) return 'PutMapping'
  // if ( restAction === 'list' ) return 'GetMapping'
  if ( restAction === 'create' ) return 'PostMapping'
  if ( restAction === 'delete' ) return 'DeleteMapping'
  if ( isRestStateChange ( (restAction) ) ) return 'PostMapping'
  throw new Error ( `unknown rest action ${restAction} for mappingAnnotation` )
}

function makeEndpoint<G> ( params: JavaWiringParams, r: RestD<G>, restAction: RestAction ): string[] {
  const hasDbName = safeObject ( r.params )[ 'dbName' ] !== undefined
  const dbNameString = hasDbName ? 'dbName' : `IFetcher.${params.defaultDbName}`
  const url = getUrlForRestAction ( restAction, r.url, r.states )
  let selectionFromData = getRestTypeDetails ( restAction ).output.needsObj ? `"${queryName ( r, restAction )}"` : '""';
  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", url )}${postFixForEndpoint ( restAction )}", produces="application/json")`,
    `    public ResponseEntity ${endPointName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    `       return Transform.result(graphQL.get(${dbNameString}),${queryClassName ( params, r )}.${queryName ( r, restAction )}(${paramsForQuery ( r, restAction )}), ${selectionFromData});`,
    `    }`,
    `` ];
}

function makeQueryEndpoint<G> ( params: JavaWiringParams, r: RestD<G>, restAction: RestAction ): string[] {
  const url = getUrlForRestAction ( restAction, r.url, r.states )
  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", url )}${postFixForEndpoint ( restAction )}/query", produces="application/json")`,
    `    public String query${queryName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    `       return ${queryClassName ( params, r )}.${queryName ( r, restAction )}(${paramsForQuery ( r, restAction )});`,
    `    }`,
    `` ];

}


function makeSampleEndpoint<G> ( params: JavaWiringParams, r: RestD<G> ): string[] {
  return [
    `  @${mappingAnnotation ( 'get' )}(value = "${beforeSeparator ( "?", r.url )}/sample", produces = "application/json")`,
    `    public static String sample${r.dataDD.name}() throws Exception {`,
    `      return new ObjectMapper().writeValueAsString( ${params.sampleClass}.${sampleName ( r.dataDD )}0);`,
    `    }` ];
}

function makeSqlEndpoint<B, G> ( params: JavaWiringParams, p: MainPageD<B, G>, restName: string, r: RestD<G> ): string[] {
  if ( r.tables === undefined ) return []
  return [
    `  @${mappingAnnotation ( 'get' )}(value = "${beforeSeparator ( "?", r.url )}/sql", produces = "text/html")`,
    `    public static String sql${r.dataDD.name}() throws Exception {`,
    `      return ${sqlMapName ( p, restName, [] )}.allSql;`,
    `    }` ];
}
export function makeSpringEndpointsFor<B, G> ( params: JavaWiringParams, p: MainPageD<B, G>, restName: string, r: RestD<G> ): string[] {
  const endpoints: string[] = r.actions.flatMap ( action => makeEndpoint ( params, r, action ) )
  const queries: string[] = r.actions.flatMap ( action => makeQueryEndpoint ( params, r, action ) )
  const importForSql = r.tables === undefined ? [] : [ `import ${params.thePackage}.${params.dbPackage}.${sqlMapName ( p, restName, [] )} ; ` ]
  return [
    `package ${params.thePackage}.${params.controllerPackage};`,
    '',
    'import com.fasterxml.jackson.databind.ObjectMapper;',
    `import org.springframework.http.ResponseEntity;`,
    `import org.springframework.web.bind.annotation.*;`,
    `import ${params.thePackage}.Sample;`,
    `import ${queryPackage ( params, p )}.${queryClassName ( params, r )};`,
    `import ${params.thePackage}.IManyGraphQl;`,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import java.util.List;`,
    `import java.util.Map;`,
    ...importForSql,
    '',
    `  @RestController`,
    `  public class ${restControllerName ( r )} {`,
    ``,
    ...indentList ( [ `@Autowired`,
      `public IManyGraphQl graphQL;`, ] ),
    ...endpoints,
    ...queries,
    ...makeSampleEndpoint ( params, r ),
    ...makeSqlEndpoint ( params, p, restName, r ),
    `  }` ]
  // ...makeCreateTableEndpoints ( params, r ),
}
