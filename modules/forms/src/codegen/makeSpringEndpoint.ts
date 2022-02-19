import { RestD } from "../common/restD";
import { restControllerName, sampleName } from "./names";
import { JavaWiringParams } from "./config";
import { beforeSeparator, sortedEntries } from "@focuson/utils";

function makeParamsForJava ( r: RestD ) {
  return sortedEntries ( r.params ).map ( (( [ name, param ] ) => `@RequestParam String ${name}`) ).join ( ", " )
}

function makeGetEndpoint ( params: JavaWiringParams, r: RestD ): string[] {
  return [ `    @RequestMapping(value="${beforeSeparator ( "?", r.url )}", produces="application/json")`,
    `    public static String Welcome(${makeParamsForJava ( r )}) throws Exception{`,
    `      return new ObjectMapper().writeValueAsString(${params.sampleClass}.${sampleName(r.dataDD)}0);`,
    `    }`,
    ``, ];
}
export function makeSpringEndpointsFor ( params: JavaWiringParams, r: RestD ): string[] {
  const endpoints: string[] = r.actions.flatMap ( action => {
    if ( action === 'get' ) return makeGetEndpoint ( params, r )
    return [ `// Not yet doing action ${action}` ]
  } )

  return [
    `package ${params.thePackage};`,
    '',
    'import com.fasterxml.jackson.databind.ObjectMapper;',
    `import org.springframework.web.bind.annotation.RequestMapping;`,
    "import org.springframework.web.bind.annotation.RequestParam;",
    `import org.springframework.web.bind.annotation.RestController;`,

    `  @RestController`,
    `  public class ${restControllerName ( r )} {`,
    ``,
    ...endpoints,
    `  }` ]
}