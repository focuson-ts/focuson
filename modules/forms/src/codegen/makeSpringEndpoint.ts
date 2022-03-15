import { defaultRestAction, RestD, RestParams } from "../common/restD";
import { endPointName, queryClassName, queryName, restControllerName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { beforeSeparator, RestAction, sortedEntries } from "@focuson/utils";
import { filterParamsByRestAction, indentList } from "./codegen";


function makeCommaIfHaveParams<G> ( r: RestD<G>, restAction: RestAction) {
  const params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) );
  return params.length === 0 ? '' : ', '
}

export function makeParamsForJava<G> ( r: RestD<G>, restAction: RestAction ): string {
  const params = sortedEntries ( r.params ).filter ( filterParamsByRestAction ( restAction ) );
  const  comma  = makeCommaIfHaveParams ( r, restAction );
  const requestParam = defaultRestAction[ restAction ].params.needsObj ? `${comma}@RequestBody String body` : ""
  return params.map ( (( [ name, param ] ) => `@RequestParam String ${name}`) ).join ( ", " )+requestParam
}
function paramsForQuery ( r: RestParams, restAction: RestAction ): string {
  let params = sortedEntries ( r ).filter ( filterParamsByRestAction ( restAction ) );
  const comma =params.length===0?'':', '
  const objParam = defaultRestAction[ restAction ].params.needsObj ? `${comma}  Transform.removeQuoteFromProperties(body)` : ""
  return params.map ( ( [ name, param ] ) => name ).join ( ", " )+objParam
}

function mappingAnnotation ( restAction: RestAction ) {
  if ( restAction === 'get' ) return 'GetMapping'
  if ( restAction === 'update' ) return 'PutMapping'
  if ( restAction === 'list' ) return 'GetMapping'
  if ( restAction === 'create' ) return 'PostMapping'
  if ( restAction === 'delete' ) return 'DeleteMapping'
  throw new Error ( `unknown rest action ${restAction} for mappingAnnotation` )
}
function postFixForEndpoint <G>( r: RestD<G>, restAction: RestAction ) {
  return restAction === 'list' ? "/list" : ""
}
function makeEndpoint<G> ( params: JavaWiringParams, r: RestD<G>, restAction: RestAction ): string[] {
  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", r.url )}${postFixForEndpoint ( r, restAction )}", produces="application/json")`,
    `    public ResponseEntity ${endPointName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    `       return Transform.result(graphQL,${queryClassName ( params, r )}.${queryName ( r, restAction )}(${paramsForQuery ( r.params, restAction )}), "${queryName ( r, restAction )}");`,
    `    }`,
    `` ];
}


function makeQueryEndpoint<G> ( params: JavaWiringParams, r: RestD<G>, restAction: RestAction ): string[] {
  return [
    `    @${mappingAnnotation ( restAction )}(value="${beforeSeparator ( "?", r.url )}${postFixForEndpoint ( r, restAction )}/query", produces="application/json")`,
    `    public String query${queryName ( r, restAction )}(${makeParamsForJava ( r, restAction )}) throws Exception{`,
    `       return ${queryClassName ( params, r )}.${queryName ( r, restAction )}(${paramsForQuery ( r.params, restAction )});`,
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
export function makeSpringEndpointsFor<G>( params: JavaWiringParams, r: RestD<G> ): string[] {
  const endpoints: string[] = r.actions.flatMap ( action => makeEndpoint ( params, r, action ) )
  const queries: string[] = r.actions.flatMap ( action => makeQueryEndpoint ( params, r, action ) )
  return [
    `package ${params.thePackage}.${params.controllerPackage};`,
    '',
    'import com.fasterxml.jackson.databind.ObjectMapper;',
    `import org.springframework.http.ResponseEntity;`,
    `import org.springframework.web.bind.annotation.*;`,
    `import focuson.data.Sample;`,
    `import focuson.data.${params.queriesPackage}.${queryClassName ( params, r )};`,
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
