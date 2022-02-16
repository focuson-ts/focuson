import { makeGraphQlSchema } from "./codegen/makeGraphQlTypes";
import { createPlanRestD, eAccountsSummaryRestD } from "./example/eAccountsSummary.restD";
import fs from "fs";
import { makeAllJavaWiring, makeJavaResolversInterface } from "./codegen/makeJavaResolvers";
import { createAllReactComponents, createReactComponent } from "./codegen/makeComponents";
import { createPlanPD, EAccountsSummaryPD } from "./example/eAccountsSummary.pageD";
import { makeAllDomainsFor } from "./codegen/makeDomain";
import { sortedEntries } from "@focuson/utils";
import { unique } from "./common/restD";
import { makeAllFetchers } from "./codegen/makeFetchers";

export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) );
}


let pages = [ EAccountsSummaryPD, createPlanPD ];
// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
let rests = unique ( pages.flatMap ( x => sortedEntries ( x.rest ) ).map ( x => x[ 1 ].rest ), r => r.dataDD.name )
fs.mkdirSync ( 'dist/focus', { recursive: true } )
writeToFile ( 'dist/focus/schema.graphql', makeGraphQlSchema ( rests ) )
writeToFile ( 'dist/focus/resolvers.java', makeJavaResolversInterface ( 'somePackage', 'AllResolvers', rests ) )
writeToFile ( 'dist/focus/render.tsx',
  [ 'import { LensProps } from "@focuson/state";', '',
    ...createAllReactComponents ( pages ),
    ...makeAllDomainsFor ( pages ) ] )
writeToFile ( 'dist/focus/wiring.java', makeAllJavaWiring ( { thePackage: 'wiring', fetcherClass: 'wiring' , schema: 'someSchema'}, rests ) )
writeToFile ( 'dist/focus/fetchers.ts', makeAllFetchers ( pages) )
