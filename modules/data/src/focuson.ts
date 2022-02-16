import { makeGraphQlSchema } from "./codegen/makeGraphQlTypes";
import { createPlanRestD, exportAccountsSummaryRestD } from "./example/example.restD";
import fs from "fs";
import { makeJavaResolversInterface } from "./codegen/makeJavaResolvers";
import { createAllReactComponents, createReactComponent } from "./codegen/makeComponents";
import { createPlanPD, EAccountsSummaryPD } from "./example/example.pageD";

export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) );
}


writeToFile ( 'dist/schema.graphql', makeGraphQlSchema ( [ exportAccountsSummaryRestD, createPlanRestD ] ) )
writeToFile ( 'dist/resolvers.java', makeJavaResolversInterface ( 'somePackage', 'AllResolvers', [ exportAccountsSummaryRestD, createPlanRestD ] ) )
writeToFile ( 'dist/render.tsx', createAllReactComponents ( [ EAccountsSummaryPD, createPlanPD, EAccountsSummaryPD, createPlanPD ] ) )
