import { makeGraphQlSchema } from "./codegen/makeGraphQlTypes";
import { createPlanRestD, exportAccountsSummaryRestD } from "./example/example.restD";
import fs from "fs";

export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) );
}


writeToFile ( 'dist/schema.graphql', makeGraphQlSchema ( [ exportAccountsSummaryRestD, createPlanRestD ] ) )
