import { makeGraphQlSchema } from "./codegen/makeGraphQlTypes";
import fs from "fs";
import { makeAllJavaWiring, makeJavaResolversInterface } from "./codegen/makeJavaResolvers";
import { createAllReactComponents } from "./codegen/makeComponents";
import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { makeAllDomainsFor, makePageDomainsFor } from "./codegen/makeDomain";
import { sortedEntries } from "@focuson/utils";
import { unique } from "./common/restD";
import { makeAllFetchers, makeFetchersDataStructure, makeFetchersImport } from "./codegen/makeFetchers";
import { makeAllEmptyData, makeAllJavaVariableName, makeAllSampleVariables, makeEmptyData } from "./codegen/makeSample";
import { copyFiles, templateFile } from "@focuson/template";
import { makeAllPacts } from "./codegen/makePacts";
import { makeAllMockFetchers } from "./codegen/makeMockFetchers";
import { CombinedParams } from "./codegen/config";
import { imports, indentList } from "./codegen/codegen";
import { makeCommon } from "./codegen/makeCommon";
import { makeSpringEndpointsFor } from "./codegen/makeSpringEndpoint";
import { restControllerName } from "./codegen/names";
import { makeJavaVariablesForGraphQlQuery } from "./codegen/makeGraphQlQuery";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { OccupationAndIncomeDetailsPageD } from "./example/occupationAndIncomeDetails/occupationAndIncomeDetails.pageD";
import { makePages } from "./codegen/makePages";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { CreatePlanPD } from "./example/eAccounts/createPlanPD";
import { RestDefnInPageProperties } from "./common/pageD";
import { makeRest, makeRests } from "./codegen/makeRests";
import { ChequeCreditbooksPD, OrderChequeBookOrPayingInModalPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";

console.log ( 0 )

export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) );
}

const params: CombinedParams = {
  pagesFile: 'pages',
  focusOnVersion: "^0.4.13",
  commonParams: "CommonIds",
  stateName: "FState",
  commonFile: "common",
  pageDomainsFile: "pageDomains",
  domainsFile: "domains",
  fetchersFile: "fetchers",
  restsFile: "rests",
  pactsFile: "pact.spec",
  samplesFile: "samples",
  emptyFile: "empty",
  renderFile: "render",
  urlparams: 'commonIds',
  queriesClass: 'Queries',
  thePackage: 'focuson.data',
  applicationName: 'ExampleApp',
  fetcherInterface: 'FFetcher',
  wiringClass: 'Wiring',
  fetcherClass: 'MockFetchers',
  schema: 'someSchema.graphql',
  sampleClass: 'Sample'
};
let outputRoot = '../formJava'
let javaRoot = outputRoot + "/java"
let javaAppRoot = outputRoot + "/java/" + params.applicationName
let javaScriptRoot = javaAppRoot + "/scripts"
let javaCodeRoot = javaAppRoot + "/src/main/java/focuson/data"
let javaResourcesRoot = javaAppRoot + "/src/main/resources"
let tsRoot = "../formTs"
let tsScripts = tsRoot + "/scripts"
let tsCode = tsRoot + "/src"
let tsPublic = tsRoot + "/public"

fs.mkdirSync ( `${outputRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaAppRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaCodeRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaResourcesRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaScriptRoot}`, { recursive: true } )
fs.mkdirSync ( `${tsCode}`, { recursive: true } )
fs.mkdirSync ( `${tsScripts}`, { recursive: true } )
fs.mkdirSync ( `${tsPublic}`, { recursive: true } )

let pages = [ OccupationAndIncomeDetailsPageD, EAccountsSummaryPD, CreatePlanPD, ETransferPageD, CreateEAccountPageD, ChequeCreditbooksPD, OrderChequeBookOrPayingInModalPD ];
// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
let rests = unique ( pages.flatMap ( x => sortedEntries ( x.rest ) ).map ( ( x: [ string, RestDefnInPageProperties ] ) => x[ 1 ].rest ), r => r.dataDD.name )


writeToFile ( `${tsCode}/${params.renderFile}.tsx`, [ ...imports ( params.domainsFile, params.pageDomainsFile , params.emptyFile), ...createAllReactComponents ( params, pages ) ] )
writeToFile ( `${tsCode}/${params.pageDomainsFile}.ts`, makePageDomainsFor ( params, pages ) )
writeToFile ( `${tsCode}/${params.domainsFile}.ts`, makeAllDomainsFor ( pages ) )
writeToFile ( `${tsCode}/${params.commonFile}.ts`, makeCommon ( params, pages, rests ) )

writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, [
  ...makeFetchersImport ( params ),
  ...makeAllFetchers ( params, pages ),
  ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, pages ) ] )
writeToFile ( `${tsCode}/${params.restsFile}.ts`, makeRests ( params, pages ) )

console.log ( 1 )
writeToFile ( `${tsCode}/${params.samplesFile}.ts`, [ ...imports ( params.domainsFile ), ...[ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, pages, i ) ) ] )
writeToFile ( `${tsCode}/${params.emptyFile}.ts`, [ ...imports ( params.domainsFile ), ...makeAllEmptyData ( pages ) ] )
writeToFile ( `${tsCode}/${params.pagesFile}.tsx`, makePages ( params, pages ) )
console.log ( 2 )
templateFile ( `${tsCode}/${params.pactsFile}.ts`, 'templates/allPacts.ts', { content: makeAllPacts ( params, pages ).join ( "\n" ) } )
copyFiles ( tsRoot, 'templates/raw/ts' ) ( '.env', 'README.md', 'tsconfig.json' )
templateFile ( `${tsRoot}/package.json`, 'templates/packageTemplate.json', params )
copyFiles ( tsScripts, 'templates/scripts' ) ( 'makePact.sh', 'makeJava.sh', 'makeJvmPact.sh', 'template.java', 'ports' )
copyFiles ( tsRoot, 'templates/raw' ) ( '.gitignore' )
templateFile ( `${tsScripts}/makePactsAndCopyFirstTime.sh`, 'templates/scripts/makePactsAndCopyFirstTime.sh', { ...params, javaRoot: javaAppRoot } )
console.log ( 3 )

copyFiles ( tsPublic, 'templates/raw/ts/public' ) ( 'favicon.ico', 'index.css', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt' )

copyFiles ( javaScriptRoot, 'templates/scripts' ) ( 'makeJava.sh', 'makeJvmPact.sh', 'template.java' )

console.log ( 4 )
// copyFiles ( javaAppRoot, 'templates/raw/java' ) ( '/build.gradle', 'application.properties' )
// templateFile ( `${javaAppRoot}/settings.gradle`, 'templates/settings.gradle', params )
templateFile ( `${javaAppRoot}/pom.xml`, 'templates/mvnTemplate.pom', params )
copyFiles ( javaAppRoot, 'templates/raw/java' ) ( 'application.properties' )
templateFile ( `${javaCodeRoot}/SchemaController.java`, 'templates/raw/java/SchemaController.java', params )
copyFiles ( javaAppRoot, 'templates/raw' ) ( '.gitignore' )
copyFiles ( javaCodeRoot, 'templates/raw/java' ) ( 'CorsConfig.java' )

console.log ( 5 )

writeToFile ( `${javaResourcesRoot}/${params.schema}`, makeGraphQlSchema ( rests ) )
writeToFile ( `${javaCodeRoot}/${params.fetcherInterface}.java`, makeJavaResolversInterface ( params, rests ) )
writeToFile ( `${javaCodeRoot}/${params.wiringClass}.java`, makeAllJavaWiring ( params, rests ) )
templateFile ( `${javaCodeRoot}/${params.applicationName}.java`, 'templates/JavaApplicationTemplate.java', params )
templateFile ( `${javaCodeRoot}/${params.fetcherClass}.java`, 'templates/JavaFetcherClassTemplate.java',
  { ...params, content: makeAllMockFetchers ( params, rests ).join ( "\n" ) } )
templateFile ( `${javaCodeRoot}/${params.sampleClass}.java`, 'templates/JavaSampleTemplate.java',
  { ...params, content: indentList ( makeAllJavaVariableName ( pages, 0 ) ).join ( "\n" ) } )
templateFile ( `${javaCodeRoot}/${params.queriesClass}.java`, 'templates/JavaQueryTemplate.java',
  { ...params, content: indentList ( makeJavaVariablesForGraphQlQuery ( rests ) ).join ( "\n" ) } )

rests.forEach ( rest => writeToFile ( `${javaCodeRoot}/${restControllerName ( rest )}.java`, makeSpringEndpointsFor ( params, rest ) ) )

