import { RestD, RestParams } from "../common/restD";
import { endPointName, queryName, restControllerName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { beforeSeparator, RestAction, sortedEntries } from "@focuson/utils";
import { filterParamsByRestAction, indentList } from "./codegen";


export function makeParamsForJava ( r: RestD, restAction: RestAction ): string {
  return sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) ).map ( (( [ name, param ] ) => `@RequestParam String ${name}`) ).join ( ", " )
}
function paramsForQuery ( r: RestParams, restAction: RestAction ): string {
  return sortedEntries ( r ).filter ( filterParamsByRestAction ( restAction ) ).map ( ( [ name, param ] ) => name ).join ( ", " )
}

function mappingAnnotation ( restAction: RestAction ) {
  if ( restAction === 'get' ) return 'GetMapping'
  if ( restAction === 'update' ) return 'PutMapping'
  if ( restAction === 'list' ) return 'GetMapping'
  if ( restAction === 'create' ) return 'PostMapping'
  if ( restAction === 'delete' ) return 'DeleteMapping'
  throw new Error ( `unknown rest action ${restAction} for mappingAnnotation` )
}
function postFixForEndpoint ( r: RestD, restAction: RestAction ) {
  return restAction === 'list' ? "/list" : ""
}
function makeEndpoint ( params: JavaWiringParams, r: RestD, restAction: RestAction ): string[] {
  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", r.url )}${postFixForEndpoint ( r, restAction )}", produces="application/json")`,
    `    public String ${endPointName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    `       return Results.result(graphQL,${params.queriesClass}.${queryName ( r, restAction )}(${paramsForQuery ( r.params, restAction )}), "${queryName ( r, restAction )}");`,
    `    }`,
    `` ];
}


function makeQueryEndpoint ( params: JavaWiringParams, r: RestD, restAction: RestAction ): string[] {
  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", r.url )}${postFixForEndpoint ( r, restAction )}/query", produces="application/json")`,
    `    public String query${queryName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    `       return ${params.queriesClass}.${queryName ( r, restAction )}(${paramsForQuery ( r.params, restAction )});`,
    `    }`,
    `` ];

}
function makeSampleEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [
    `  @${mappingAnnotation ( 'get' )}(value = "${beforeSeparator ( "?", r.url )}/sample", produces = "application/json")`,
    `    public static String sample${r.dataDD.name}() throws Exception {`,
    `      return new ObjectMapper().writeValueAsString( ${params.sampleClass}.${sampleName ( r.dataDD )}0);`,
    `    }` ];
}
export function makeSpringEndpointsFor ( params: JavaWiringParams, r: RestD ): string[] {
  const endpoints: string[] = r.actions.flatMap ( action => makeEndpoint ( params, r, action ) )
  const queries: string[] = r.actions.flatMap ( action => makeQueryEndpoint ( params, r, action ) )
  return [
    `package ${params.thePackage};`,
    '',
    'import com.fasterxml.jackson.databind.ObjectMapper;',
    `import org.springframework.web.bind.annotation.*;`,
    `import java.util.Map;`,
    `import graphql.GraphQL;`,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    '',
    `  @RestController`,
    `  public class ${restControllerName ( r )} {`,
    ``,
    ...indentList ( [ `@Autowired`,
      `public GraphQL graphQL;`, ] ),
    ...endpoints,
    ...queries,
    ...makeSampleEndpoint ( params, r ),
    `  }` ]
}
