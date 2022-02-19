import { RestD } from "../common/restD";
import { queryName, restControllerName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { beforeSeparator, sortedEntries } from "@focuson/utils";
import { indentList } from "./codegen";

function makeParamsForJava ( r: RestD ) {
  return sortedEntries ( r.params ).map ( (( [ name, param ] ) => `@RequestParam String ${name}`) ).join ( ", " )
}

function makeGetEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [ `    @RequestMapping(value="${beforeSeparator ( "?", r.url )}", produces="application/json")`,
    `    public String get${r.dataDD.name}(${makeParamsForJava ( r )}) throws Exception{`,
    `       return graphQL.execute(${params.queriesClass}.${queryName ( r )}).getData().toString();`,
    `    }`,
    `` ];
}
function makeQueryEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [ `    @RequestMapping(value="${beforeSeparator ( "?", r.url )}/query", produces="application/json")`,
    `    public String query${r.dataDD.name}() throws Exception{`,
    `      return ${params.queriesClass}.${queryName ( r )};`,
    `    }`,
    `` ];
}
function makeSampleEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [
    `  @RequestMapping(value = "${beforeSeparator ( "?", r.url )}/sample", produces = "application/json")`,
    `    public static String sample${r.dataDD.name}() throws Exception {`,
    `      return new ObjectMapper().writeValueAsString(Sample.EAccountsSummaryDDSample0);`,
    `    }` ];
}
function makeValidateEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [ `    @RequestMapping(value="${beforeSeparator ( "?", r.url )}/validate", produces="application/json")`,
    `    public String validate${r.dataDD.name}() throws Exception{`,
    `      try {`,
    `        return graphQL.execute(Queries.EAccountsSummaryDD).getData().toString();`,
    `      } catch (Exception e) {`,
    `        return e.getClass() + " " + e.getMessage() + "/" + e.getCause();`,
    `      }}`,
    `    ` ];
}
export function makeSpringEndpointsFor ( params: JavaWiringParams, r: RestD ): string[] {
  const endpoints: string[] = r.actions.flatMap ( action => {
    if ( action === 'get' ) return [
      ...makeGetEndpoint ( params, r ),
      ...makeQueryEndpoint ( params, r ),
      ...makeSampleEndpoint ( params, r ),
      ...makeValidateEndpoint ( params, r ) ]
    return [ `// Not yet doing action ${action}` ]
  } )

  return [
    `package ${params.thePackage};`,
    '',
    'import com.fasterxml.jackson.databind.ObjectMapper;',
    `import org.springframework.web.bind.annotation.RequestMapping;`,
    "import org.springframework.web.bind.annotation.RequestParam;",
    `import org.springframework.web.bind.annotation.RestController;`,
    `import graphql.GraphQL;`,
    `import org.springframework.beans.factory.annotation.Autowired;`,
    `  @RestController`,
    `  public class ${restControllerName ( r )} {`,
    ``,
    ...indentList ( [ `@Autowired`,
      `public GraphQL graphQL;`, ] ),
    ...endpoints,
    `  }` ]
}