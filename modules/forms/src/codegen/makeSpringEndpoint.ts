import { postFixForEndpoint, RestD, RestParams, unique } from "../common/restD";
import { auditClassName, auditMethodName, endPointName, queryClassName, queryName, queryPackage, restControllerName, sampleName, sqlMapName } from "./names";
import { JavaWiringParams } from "./config";
import { actionsEqual, beforeSeparator, isRestStateChange, RestAction, safeArray, safeObject, sortedEntries, toArray } from "@focuson/utils";
import { addBrackets, filterParamsByRestAction, indentList } from "./codegen";
import { isRepeatingDd } from "../common/dataD";
import { MainPageD } from "../common/pageD";
import { getRestTypeDetails, getUrlForRestAction, rest } from "@focuson/rest";
import { AccessCondition } from "../common/resolverD";


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

export function accessDetails ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<any>, restAction: RestAction ): string[] {
  const allAccess = safeArray ( r.access )
  const legalParamNames = Object.keys ( r.params )
  return allAccess.filter ( a => actionsEqual ( a.restAction, restAction ) ).flatMap (
    ( { restAction, condition } ) => toArray<AccessCondition> ( condition ).flatMap (
      ( cond ) => {
        if ( cond.type === 'in' ) {
          const { param, values } = cond
          return [ `//from ${p.name}.rest[${restName}.access[${JSON.stringify ( restAction )}]]`, `if (!Arrays.asList(${values.map ( v => `"${v}"` ).join ( "," )}).contains(${param})) return new ResponseEntity("", new HttpHeaders(), HttpStatus.FORBIDDEN);` ]
        }
        throw Error ( `Page ${p.name}.rests[${restName}].access. action is ${restAction}. Do not recognise condition ${JSON.stringify ( cond )}` )
      } ) )

}
export function auditDetails ( params: JavaWiringParams, r: RestD<any>, restAction: RestAction ): string[] {
  return safeArray ( r.audit ).flatMap ( ad => toArray ( ad.storedProcedure ).map ( sp => `_audit.${auditMethodName ( r, restAction, sp )}(${sp.params.join ( ',' )})` ) )
}

function makeEndpoint<G> ( params: JavaWiringParams, p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction ): string[] {
  let safeParams: RestParams = safeObject ( r.params );
  const hasDbName = safeParams[ 'dbName' ] !== undefined
  const dbNameString = hasDbName ? 'dbName' : `IFetcher.${params.defaultDbName}`
  const url = getUrlForRestAction ( restAction, r.url, r.states )
  let selectionFromData = getRestTypeDetails ( restAction ).output.needsObj ? `"${queryName ( r, restAction )}"` : '""';
  const callAudit = indentList ( safeArray ( r.audit ).filter ( a => actionsEqual ( a.restAction, restAction ) ).flatMap ( ad =>
    toArray ( ad.storedProcedure ).flatMap ( sp =>
      [ `//from ${p.name}.rest[${restName}].audit[${JSON.stringify ( restAction )}]`, `__audit.${auditMethodName ( r, restAction, sp )}(${[ dbNameString, sp.params ].join ( ',' )});` ] ) ) )

  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", url )}${postFixForEndpoint ( restAction )}", produces="application/json")`,
    `    public ResponseEntity ${endPointName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    ...indentList ( indentList ( indentList ( [ ...accessDetails ( params, p, restName, r, restAction ), ...callAudit ] ) ) ),
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
  const endpoints: string[] = r.actions.flatMap ( action => makeEndpoint ( params, p, restName, r, action ) )
  const queries: string[] = r.actions.flatMap ( action => makeQueryEndpoint ( params, r, action ) )
  const importForSql = r.tables === undefined ? [] : [ `import ${params.thePackage}.${params.dbPackage}.${sqlMapName ( p, restName, [] )} ; ` ]
  const auditImports = safeArray ( r.audit ).map ( ad => `import ${params.thePackage}.${params.auditPackage}.${p.name}.${auditClassName ( r )};` )
  const auditVariables = safeArray ( r.audit ).length > 0 ? indentList ( [ `@Autowired`, `${auditClassName ( r )} __audit;` ] ) : []


  return [
    `package ${params.thePackage}.${params.controllerPackage};`,
    '',
    'import com.fasterxml.jackson.databind.ObjectMapper;',
    `import org.springframework.http.ResponseEntity;`,
    `import org.springframework.web.bind.annotation.*;`,
    `import org.springframework.http.HttpHeaders;`,
    `import org.springframework.http.HttpStatus;`,
    `import ${params.thePackage}.Sample;`,
    `import ${queryPackage ( params, p )}.${queryClassName ( params, r )};`,
    `import ${params.thePackage}.IManyGraphQl;`,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    ...auditImports,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import java.util.List;`,
    `import java.util.Map;`,
    `import java.util.Arrays;`,
    ...importForSql,
    '',
    `  @RestController`,
    `  public class ${restControllerName ( r )} {`,
    ``,
    ...indentList ( [ `@Autowired`,
      `public IManyGraphQl graphQL;`, ] ),
    ...auditVariables,
    ...endpoints,
    ...queries,
    ...makeSampleEndpoint ( params, r ),
    ...makeSqlEndpoint ( params, p, restName, r ),
    `  }` ]
  // ...makeCreateTableEndpoints ( params, r ),
}
