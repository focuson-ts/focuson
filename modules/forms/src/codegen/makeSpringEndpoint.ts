import { isHeaderLens, postFixForEndpoint, RestD, RestParams, stateToNameAndUrlAndParamsForState } from "../common/restD";
import { endPointName, mutationClassName, mutationMethodName, mutationVariableName, queryClassName, queryName, queryPackage, restControllerName, sampleName, sqlMapName, sqlMapPackageName } from "./names";
import { JavaWiringParams } from "./config";
import { actionsEqual, beforeSeparator, isRestStateChange, RestAction, safeArray, safeObject, toArray, unique } from "@focuson/utils";
import { indentList, paramsForRestAction } from "./codegen";
import { isRepeatingDd } from "../common/dataD";
import { MainPageD } from "../common/pageD";
import { getRestTypeDetails, getUrlForRestAction, RestActionDetail, restActionForName, restActionToDetails } from "@focuson/rest";
import { AccessCondition, allInputParamNames, allOutputParams, displayParam, importForTubles, isMessageMutation, javaTypeForOutput, MutationDetail, parametersFor } from "../common/resolverD";
import { applyToTemplateOrUndefinedIfNoParamsPresent } from "@focuson/template";


function makeCommaIfHaveParams<G> ( errorPrefix: string, r: RestD<G>, restAction: RestAction ) {
  const params = paramsForRestAction ( errorPrefix, r, restAction );
  return params.length === 0 ? '' : ', '
}

export function makeParamsForJava<G> ( errorPrefix: string, r: RestD<G>, restAction: RestAction ): string {
  const params = paramsForRestAction ( errorPrefix, r, restAction );
  const comma = makeCommaIfHaveParams ( errorPrefix, r, restAction );
  const requestParam = getRestTypeDetails ( restAction ).params.needsObj ? `${comma}@RequestBody String body` : ""
  return params.map ( (( [ name, param ] ) => {
    if ( isHeaderLens ( param ) )
      return `${param.annotation ? param.annotation : '@RequestHeader @RequestParam'} ${param.javaType} ${name}`;
    else
      return `${param.annotation ? param.annotation : '@RequestParam'} ${param.javaType} ${name}`;
  }) ).join ( ", " ) + requestParam
}
function paramsForQuery<G> ( errorPrefix: string, r: RestD<G>, restAction: RestAction ): string {
  const clazz = isRepeatingDd ( r.dataDD ) ? 'List' : 'Map'
  let params = paramsForRestAction ( errorPrefix, r, restAction );
  const comma = params.length === 0 ? '' : ', '
  const objParam = getRestTypeDetails ( restAction ).params.needsObj ? `${comma}  Transform.removeQuoteFromProperties(body, ${clazz}.class)` : ""
  return params.map ( ( [ name, param ] ) => name ).join ( ", " ) + objParam
}


export function accessDetails ( params: JavaWiringParams, p: MainPageD<any, any>, restName: string, r: RestD<any>, restAction: RestAction ): string[] {
  const allAccess = safeArray ( r.access )
  const legalParamNames = Object.keys ( r.params )
  return allAccess.filter ( a => actionsEqual ( a.restAction, restAction ) ).flatMap (
    ( { restAction, condition } ) => toArray<AccessCondition> ( condition ).flatMap (
      ( cond ) => {
        const hintString = isRestStateChange ( restAction ) ? ` - if you have a compilation error here check which parameters you defined in {yourRestD}.states[${restAction.state}]` : ''
        if ( cond.type === 'in' ) {
          const { param, values } = cond
          return [ `//from ${p.name}.rest[${restName}.access[${JSON.stringify ( restAction )}]${hintString}`, `if (!Arrays.asList(${values.map ( v => `"${v}"` ).join ( "," )}).contains(${param})) return new ResponseEntity("", new HttpHeaders(), HttpStatus.FORBIDDEN);` ]
        }
        throw Error ( `Page ${p.name}.rests[${restName}].access. action is ${restAction}. Do not recognise condition ${JSON.stringify ( cond )}` )
      } ) )

}


export function auditDetails ( params: JavaWiringParams, r: RestD<any>, restAction: RestAction ): string[] {
  return safeArray ( r.mutations ).flatMap ( ad => toArray ( ad.mutateBy ).map ( ( md, i ) =>
    `_audit.${mutationMethodName ( r, restActionForName ( restAction ), md, '' + i )}(${toArray ( parametersFor ( md ) ).map ( displayParam ).join ( ',' )})` ) )
}

export function paramsDeclaration ( md: MutationDetail, i: number ) {
  const outputs = allOutputParams ( parametersFor ( md ) )
  if ( outputs.length === 1 ) return `${outputs[ 0 ].javaType} ${outputs[ 0 ].name} = `
  const javaType = javaTypeForOutput ( parametersFor ( md ) )
  if ( javaType === 'void' ) return ''
  return `${javaType} params${i} = `
}

export function outputParamsDeclaration ( md: MutationDetail, i: number ): string[] {
  let ps = allOutputParams ( parametersFor ( md ) );
  return ps.length === 1 ? [] : ps.map ( ( m, pi ) => `${m.javaType} ${m.name} = params${i}.t${pi + 1};` )
}
export const addOutputParamsToMessages = ( md: MutationDetail ): string[] =>
  allOutputParams ( parametersFor ( md ) ).filter ( p => p.msgLevel ).map ( p => `msgs.${p.msgLevel}(${p.name});` )

export function callMutationsCode<G> ( p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction, dbNameString: string ) {
  const hintString = isRestStateChange ( restAction ) ? ` - if you have a compilation error here check which parameters you defined in {yourRestD}.states[${restAction.state}]` : ''
  const callMutations = indentList ( safeArray ( r.mutations ).filter ( a => actionsEqual ( a.restAction, restAction ) ).flatMap ( ad =>
    toArray ( ad.mutateBy ).flatMap ( ( md, i ) => {
      return isMessageMutation ( md ) ?
        [ `msgs.${md.level ? md.level : 'info'}("${md.message}");` ] : [
          `${paramsDeclaration ( md, i )}${mutationVariableName ( r, restAction )}.${mutationMethodName ( r, restActionForName ( restAction ), md, '' + i )}(connection,${[ 'msgs',
            dbNameString, ...allInputParamNames ( parametersFor ( md ) ) ].join ( ',' )});`,
          ...outputParamsDeclaration ( md, i ),
          ...addOutputParamsToMessages ( md )
        ];
    } ) ) )
  return [ `//from ${p.name}.rest[${restName}].mutations[${JSON.stringify ( restAction )}]${hintString}`, ...callMutations ];
}
export function endpointAnnotation<G> ( params: JavaWiringParams, p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction, purpose: string ): string[] {
  const description = purpose === 'endpoint' ? r.description : `This is a helper endpoint`
  const notes = purpose === 'endpoint' ? r.notes : undefined
  const fullParams = { ...params, ...r, restAction, purpose, notes, description, restName }
  return safeArray ( params.endpointAnnotations ).map ( a => applyToTemplateOrUndefinedIfNoParamsPresent ( a, fullParams ) ).flatMap ( s => s ? [ s ] : [] )
}
function makeReturnStatement<G> ( params: JavaWiringParams, errorPrefix: string, r: RestD<G>, restAction: RestAction, dbNameString: string, selectionFromData: string ) {
  if ( isRestStateChange ( restAction ) ) {
    const stateDetails = safeObject ( r.states )[ restAction.state ]
    if ( stateDetails !== undefined ) {
      if ( stateDetails.returns ) {
        return [ `        Map resultMap= new HashMap();`,
          ...stateDetails.returns.map ( r => `        resultMap.put("${r}",${r});` ),
          `         return  ResponseEntity.ok(msgs.result(resultMap));`
        ]
      }
    }
  }
  return restActionToDetails ( restAction ).output.needsObj ?
    [ `          return Transform.result(graphQL.get(${dbNameString}),${queryClassName ( params, r )}.${queryName ( r, restAction )}(${paramsForQuery ( errorPrefix, r, restAction )}), ${selectionFromData}, msgs);` ] :
    [ `         return  ResponseEntity.ok(msgs.emptyResult());` ];
}
function makeEndpoint<G> ( params: JavaWiringParams, p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction ): string[] {
  let safeParams: RestParams = safeObject ( r.params );
  const hasDbName = safeParams[ 'dbName' ] !== undefined
  const dbNameString = hasDbName ? 'dbName' : `IFetcher.${params.defaultDbName}`
  const url = getUrlForRestAction ( restAction, r.url, stateToNameAndUrlAndParamsForState(r.states) )
  let restTypeDetails: RestActionDetail = getRestTypeDetails ( restAction );
  let selectionFromData = restTypeDetails.output.needsObj ? `"${queryName ( r, restAction )}"` : '""';
  const callMutations = callMutationsCode ( p, restName, r, restAction, dbNameString );
  const errorPrefix = `${p.name}.rest[${restName}] ${JSON.stringify ( restName )}`
  const hasBody = restTypeDetails.params.needsObj
  const makeJsonString = hasBody ? [ `         Map<String,Object> bodyAsJson = new ObjectMapper().readValue(body, Map.class);` ] : []
  const openConnection = callMutations.length > 1 ? [ `        Connection connection = dataSource.getConnection(getClass());`,
    `        try  {`, ] : []
  const closeConnection = callMutations.length > 1 ? [ `        } finally {dataSource.close(getClass(),connection);}`, ] : []
  let resultStatement = makeReturnStatement ( params, errorPrefix, r, restAction, dbNameString, selectionFromData );
  return [
    ...indentList ( endpointAnnotation ( params, p, restName, r, restAction, 'endpoint' ) ),
    `    @${restTypeDetails.annotation}(value="${beforeSeparator ( "?", url )}${postFixForEndpoint ( restAction )}", produces="application/json")`,
    `    public ResponseEntity ${endPointName ( r, restAction )}(${makeParamsForJava ( errorPrefix, r, restAction )}) throws Exception{`,
    ...makeJsonString,
    `         Messages msgs = Transform.msgs();`,
    ...openConnection,
    ...indentList ( indentList ( indentList ( indentList ( [
      ...accessDetails ( params, p, restName, r, restAction ),
      ...callMutations ] ) ) ) ),
    ...resultStatement,
    ...closeConnection,
    `    }`,
    `` ];
}

function makeQueryEndpoint<G> ( params: JavaWiringParams, p: MainPageD<any, G>, restName: string, errorPrefix: string, r: RestD<G>, restAction: RestAction ): string[] {
  let restTypeDetails: RestActionDetail = getRestTypeDetails ( restAction );
  const url = getUrlForRestAction ( restAction, r.url, stateToNameAndUrlAndParamsForState(r.states) )
  return [
    ...indentList ( endpointAnnotation ( params, p, restName, r, restAction, 'query' ) ),
    `    @${restTypeDetails.annotation}(value="${beforeSeparator ( "?", url )}${postFixForEndpoint ( restAction )}/query", produces="application/json")`,
    `    public String query${queryName ( r, restAction )}(${makeParamsForJava ( errorPrefix, r, restAction )}) throws Exception{`,
    `       return ${queryClassName ( params, r )}.${queryName ( r, restAction )}(${paramsForQuery ( errorPrefix, r, restAction )});`,
    `    }`,
    `` ];

}


function makeSampleEndpoint<G> ( params: JavaWiringParams, p: MainPageD<any, G>, restName: string, r: RestD<G>, restAction: RestAction ): string[] {
  return [
    ...indentList ( endpointAnnotation ( params, p, restName, r, restAction, 'query' ) ),
    `  @${getRestTypeDetails ( 'get' ).annotation}(value = "${beforeSeparator ( "?", r.url )}/sample", produces = "application/json")`,
    `    public static String sample${r.dataDD.name}() throws Exception {`,
    `      return new ObjectMapper().writeValueAsString( ${params.sampleClass}.${sampleName ( r.dataDD )}0);`,
    `    }` ];
}

function makeSqlEndpoint<B, G> ( params: JavaWiringParams, p: MainPageD<B, G>, restName: string, r: RestD<G> ): string[] {
  if ( r.tables === undefined ) return []
  return [
    `  @${getRestTypeDetails ( 'get' ).annotation}(value = "${beforeSeparator ( "?", r.url )}/sql", produces = "text/html")`,
    `    public static String sql${r.dataDD.name}() throws Exception {`,
    `      return ${sqlMapName ( p, restName, [] )}.allSql;`,
    `    }` ];
}
export function makeSpringEndpointsFor<B, G> ( params: JavaWiringParams, p: MainPageD<B, G>, restName: string, r: RestD<G> ): string[] {
  const errorPrefix = `${p.name}.rest[${restName}] ${JSON.stringify ( restName )}`
  const endpoints: string[] = r.actions.flatMap ( action => makeEndpoint ( params, p, restName, r, action ) )
  const queries: string[] = r.actions.flatMap ( action => makeQueryEndpoint ( params, p, restName, errorPrefix, r, action ) )
  const importForSql = r.tables === undefined ? [] : [ `import ${sqlMapPackageName ( params, p )}.${sqlMapName ( p, restName, [] )} ; ` ]
  const auditImports = safeArray ( r.mutations ).map ( m => `import ${params.thePackage}.${params.mutatorPackage}.${p.name}.${mutationClassName ( r, m.restAction )};` )
  const mutationVariables = indentList ( unique ( safeArray ( r.mutations ).flatMap ( m =>
    [ [ `@Autowired`, `${mutationClassName ( r, m.restAction )} ${mutationVariableName ( r, m.restAction )};` ] ] ), ( [ autowired, string ] ) => string ).flat () )


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
    `import ${params.thePackage}.${params.utilsPackage}.IManyGraphQl;`,
    `import ${params.thePackage}.${params.fetcherPackage}.IFetcher;`,
    ...auditImports,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `import java.sql.Connection;`,
    `import javax.sql.DataSource;`,
    `import ${params.thePackage}.${params.utilsPackage}.LoggedDataSource;`,
    `import ${params.thePackage}.${params.utilsPackage}.Messages;`,
    `import java.util.List;`,
    `import java.util.Map;`,
    `import java.util.HashMap;`,
    `import java.util.Arrays;`,
    ...importForTubles ( params ),
    ...importForSql,
    '',
    `  @RestController`,
    ...indentList ( params.controllerAnnotations ),
    `  public class ${restControllerName ( p, r )} {`,
    ``,
    ...indentList ( [ `@Autowired`, `public IManyGraphQl graphQL;`, `@Autowired`, `public LoggedDataSource dataSource;` ] ),
    ...mutationVariables,
    ...endpoints,
    ...queries,
    ...makeSampleEndpoint ( params, p, restName, r, 'get' ),
    ...makeSqlEndpoint ( params, p, restName, r ),
    `  }` ]
  // ...makeCreateTableEndpoints ( params, r ),
}
