import { makeGraphQlSchema } from "./codegen/makeGraphQlTypes";
import fs from "fs";
import { JavaWiringParams, makeAllJavaWiring, makeJavaResolversInterface } from "./codegen/makeJavaResolvers";
import { createAllReactComponents } from "./codegen/makeComponents";
import { createPlanPD, EAccountsSummaryPD } from "./example/eAccountsSummary.pageD";
import { makeAllDomainsFor } from "./codegen/makeDomain";
import { sortedEntries } from "@focuson/utils";
import { unique } from "./common/restD";
import { makeAllFetchers, makeFetchersDataStructure } from "./codegen/makeFetchers";
import { makeAllSampleVariables } from "./codegen/makeSample";
import { copyFile, templateFile } from "./codegen/toFile";

export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) );
}

const javaParams: JavaWiringParams = { thePackage: 'focuson.data', fetcherInterface: 'FFetcher', wiringClass: 'Wiringx', schema: 'someSchema.graphql', applicationName: 'ExampleApp' };
let outputRoot = 'dist'
let javaRoot = outputRoot + "/java"
let javaAppRoot = outputRoot + "/java/" + javaParams.applicationName
let javaCodeRoot = javaAppRoot + "/src/main/java/focuson/data"
let javaResourcesRoot = javaAppRoot + "/src/main/resources"
let tsRoot = outputRoot + "/ts"


let pages = [ EAccountsSummaryPD, createPlanPD ];
// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
let rests = unique ( pages.flatMap ( x => sortedEntries ( x.rest ) ).map ( x => x[ 1 ].rest ), r => r.dataDD.name )
fs.mkdirSync ( `${outputRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaCodeRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaResourcesRoot}`, { recursive: true } )
fs.mkdirSync ( `${tsRoot}`, { recursive: true } )

copyFile ( `${javaAppRoot}/build.gradle`, 'templates/raw/build.gradle' )
templateFile ( `${javaAppRoot}/settings.gradle`, 'templates/settings.gradle', javaParams )
copyFile ( `${javaResourcesRoot}/application.properties`, 'templates/raw/application.properties' )
writeToFile ( `${javaResourcesRoot}/${javaParams.schema}`, makeGraphQlSchema ( rests ) )
writeToFile ( `${javaCodeRoot}/${javaParams.fetcherInterface}.java`, makeJavaResolversInterface ( javaParams, rests ) )
writeToFile ( `${javaCodeRoot}/${javaParams.wiringClass}.java`, makeAllJavaWiring ( javaParams, rests ) )
templateFile ( `${javaCodeRoot}/${javaParams.applicationName}.java`, 'templates/JavaApplicationTemplate.java', javaParams )

writeToFile ( `${tsRoot}/schema.graphql`, makeGraphQlSchema ( rests ) )
writeToFile ( `${tsRoot}/render.tsx`,
  [ 'import { LensProps } from "@focuson/state";', '',
    ...createAllReactComponents ( pages ),
    ...makeAllDomainsFor ( pages ) ] )
writeToFile ( `${tsRoot}/fetchers.ts`, [ ...makeAllFetchers ( pages ), ...makeFetchersDataStructure ( { variableName: 'fetchers', stateName: 'FullState', getUrlParamsName: "getUrLParams" }, pages ) ] )
writeToFile ( `${tsRoot}/samples.ts`, [ ...[ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( pages, i ) ), ...makeAllDomainsFor ( pages ) ] )
