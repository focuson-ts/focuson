import { postFixForEndpoint, RestD, RestParams } from "../common/restD";
import { endPointName, mutationClassName, mutationMethodName, queryClassName, queryName, queryPackage, restControllerName, sampleName, sqlMapName, sqlMapPackageName } from "./names";
import { JavaWiringParams } from "./config";
import { actionsEqual, beforeSeparator, isRestStateChange, RestAction, safeArray, safeObject, sortedEntries, toArray } from "@focuson/utils";
import { filterParamsByRestAction, indentList } from "./codegen";
import { isRepeatingDd } from "../common/dataD";
import { MainPageD } from "../common/pageD";
import { getRestTypeDetails, getUrlForRestAction, restActionToDetails, restActionForName } from "@focuson/rest";
import { AccessCondition, allInputParamNames, allOutputParams, displayParam, importForTubles, javaTypeForOutput, MutationDetail } from "../common/resolverD";


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
  return safeArray ( r.mutations ).flatMap ( ad => toArray ( ad.mutateBy ).map ( sp => `_audit.${mutationMethodName ( r, restActionForName ( restAction ), sp )}(${toArray ( sp.params ).map ( displayParam ).join ( ',' )})` ) )
}

export function paramsDeclaration ( md: MutationDetail, i: number ) {
  const outputs = allOutputParams ( md.params )
  if ( outputs.length === 1 ) return `${outputs[ 0 ].javaType} ${outputs[ 0 ].name} = `
  const javaType = javaTypeForOutput ( md.params )
  if ( javaType === 'void' ) return ''
  return `${javaType} params${i} = `
}

export function outputParamsDeclaration ( md: MutationDetail, i: number ): string[] {
  let ps = allOutputParams ( md.params );
  return ps.length === 1 ? [] : ps.map ( ( m, pi ) => `${m.javaType} ${m.name} = params${i}.t${pi + 1};` )
}

export function callMutationsCode<G> ( p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction, dbNameString: string ) {
  const callMutations = indentList ( safeArray ( r.mutations ).filter ( a => actionsEqual ( a.restAction, restAction ) ).flatMap ( ad =>
    toArray ( ad.mutateBy ).flatMap ( ( md, i ) =>
      [ `//from ${p.name}.rest[${restName}].mutations[${JSON.stringify ( restAction )}]`,
        `${paramsDeclaration ( md, i )}__mutations.${mutationMethodName ( r, restActionForName ( restAction ), md )}(connection,${[ dbNameString, ...allInputParamNames ( md.params ) ].join ( ',' )});`,
        ...outputParamsDeclaration ( md, i )
      ] ) ) )
  return callMutations;
}
function makeEndpoint<G> ( params: JavaWiringParams, p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction ): string[] {
  let safeParams: RestParams = safeObject ( r.params );
  const hasDbName = safeParams[ 'dbName' ] !== undefined
  const dbNameString = hasDbName ? 'dbName' : `IFetcher.${params.defaultDbName}`
  const url = getUrlForRestAction ( restAction, r.url, r.states )
  let selectionFromData = getRestTypeDetails ( restAction ).output.needsObj ? `"${queryName ( r, restAction )}"` : '""';
  const callMutations = callMutationsCode ( p, restName, r, restAction, dbNameString );

  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", url )}${postFixForEndpoint ( restAction )}", produces="application/json")`,
    `    public ResponseEntity ${endPointName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    `        try (Connection connection = dataSource.getConnection()) {`,
    ...indentList ( indentList ( indentList ( indentList ( [ ...accessDetails ( params, p, restName, r, restAction ), ...callMutations ] ) ) ) ),
    restActionToDetails ( restAction ).output.needsObj ?
      `          return Transform.result(connection,graphQL.get(${dbNameString}),${queryClassName ( params, r )}.${queryName ( r, restAction )}(${paramsForQuery ( r, restAction )}), ${selectionFromData});` :
      `          return  ResponseEntity.ok("");`,
    `        }`,
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
  const importForSql = r.tables === undefined ? [] : [ `import ${sqlMapPackageName ( params, p )}.${sqlMapName ( p, restName, [] )} ; ` ]
  const auditImports = safeArray ( r.mutations ).map ( ad => `import ${params.thePackage}.${params.mutatorPackage}.${p.name}.${mutationClassName ( r )};` )
  const auditVariables = safeArray ( r.mutations ).length > 0 ? indentList ( [ `@Autowired`, `${mutationClassName ( r )} __mutations;` ] ) : []


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
    `import java.sql.Connection;`,
    `import javax.sql.DataSource;`,
    `import java.util.List;`,
    `import java.util.Map;`,
    `import java.util.Arrays;`,
    ...importForTubles ( params ),
    ...importForSql,
    '',
    `  @RestController`,
    `  public class ${restControllerName ( p, r )} {`,
    ``,
    ...indentList ( [ `@Autowired`, `public IManyGraphQl graphQL;`, `@Autowired`, `public DataSource dataSource;` ] ),
    ...auditVariables,
    ...endpoints,
    ...queries,
    ...makeSampleEndpoint ( params, r ),
    ...makeSqlEndpoint ( params, p, restName, r ),
    `  }` ]
  // ...makeCreateTableEndpoints ( params, r ),
}
