import { RestD, RestParams } from "../common/restD";
import { queryName, restControllerName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { beforeSeparator, sortedEntries } from "@focuson/utils";
import { indentList } from "./codegen";

function makeParamsForJava ( r: RestD ) {
  return sortedEntries ( r.params ).map ( (( [ name, param ] ) => `@RequestParam String ${name}`) ).join ( ", " )
}
function paramsForQuery ( r: RestParams ): string {
  return sortedEntries ( r ).map ( ( [ name, param ] ) => name ).join ( ", " )
}

function makeGetEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [ `    @RequestMapping(value="${beforeSeparator ( "?", r.url )}", produces="application/json")`,
    `    public String get${r.dataDD.name}(${makeParamsForJava ( r )}) throws Exception{`,
    `       Map data = (Map) graphQL.execute(${params.queriesClass}.${queryName ( r, 'get' )}(${paramsForQuery ( r.params )})).toSpecification().get("data");`,
    `       return new ObjectMapper().writeValueAsString(data.get("${queryName ( r, 'get' )}"));`,
    `    }`,
    `` ];
}
function makeQueryEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [ `    @RequestMapping(value="${beforeSeparator ( "?", r.url )}/query", produces="application/json")`,
    `    public String query${r.dataDD.name}(${makeParamsForJava ( r )}) throws Exception{`,
    `       return ${params.queriesClass}.${queryName ( r, 'get' )}(${paramsForQuery ( r.params )});`,
    `    }`,
    `` ];

}
function makeSampleEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [
    `  @RequestMapping(value = "${beforeSeparator ( "?", r.url )}/sample", produces = "application/json")`,
    `    public static String sample${r.dataDD.name}() throws Exception {`,
    `      return new ObjectMapper().writeValueAsString( ${params.sampleClass}.${sampleName ( r.dataDD)}0);`,
    `    }` ];
}
export function makeSpringEndpointsFor ( params: JavaWiringParams, r: RestD ): string[] {
  const endpoints: string[] = r.actions.flatMap ( action => {
    if ( action === 'get' ) return [
      ...makeGetEndpoint ( params, r ),
      ...makeQueryEndpoint ( params, r ),
      ...makeSampleEndpoint ( params, r ) ]
    return [ `// Not yet doing action ${action}` ]
  } )

  return [
    `package ${params.thePackage};`,
    '',
    'import com.fasterxml.jackson.databind.ObjectMapper;',
    `import org.springframework.web.bind.annotation.RequestMapping;`,
    "import org.springframework.web.bind.annotation.RequestParam;",
    `import org.springframework.web.bind.annotation.RestController;`,
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
    `  }` ]
}