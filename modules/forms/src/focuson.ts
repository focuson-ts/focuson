import { makeGraphQlSchema } from "./codegen/makeGraphQlTypes";
import fs from "fs";
import { makeAllJavaWiring, makeJavaResolversInterface } from "./codegen/makeJavaResolvers";
import { createAllReactComponents } from "./codegen/makeComponents";
import { EAccountsSummaryPD } from "./example/eAccounts/eAccountsSummary.pageD";
import { makeAllDomainsFor, makePageDomainsFor } from "./codegen/makeDomain";
import { sortedEntries } from "@focuson/utils";
import { unique } from "./common/restD";
import { makeAllFetchers, makeFetchersDataStructure, makeFetchersImport } from "./codegen/makeFetchers";
import { makeAllEmptyData, makeAllJavaVariableName, makeAllSampleVariables } from "./codegen/makeSample";
import { copyFiles, DirectorySpec, loadFile, templateFile } from "@focuson/files";
import { makeAllPacts } from "./codegen/makePacts";
import { makeAllMockFetchers } from "./codegen/makeMockFetchers";
import { CombinedParams } from "./codegen/config";
import { imports, indentList } from "./codegen/codegen";
import { makeCommon } from "./codegen/makeCommon";
import { makeSpringEndpointsFor } from "./codegen/makeSpringEndpoint";
import { fetcherInterfaceName, mockFetcherClassName, queryClassName, restControllerName, storybookFileName } from "./codegen/names";
import { makeJavaVariablesForGraphQlQuery } from "./codegen/makeGraphQlQuery";
import { ETransferPageD } from "./example/eTransfers/eTransfers.pageD";
import { OccupationAndIncomeDetailsPageD } from "./example/occupationAndIncomeDetails/occupationAndIncomeDetails.pageD";
import { makePages } from "./codegen/makePages";
import { CreateEAccountPageD } from "./example/createEAccount/createEAccount.pageD";
import { CreatePlanPD } from "./example/eAccounts/createPlanPD";
import { RestDefnInPageProperties } from "./common/pageD";
import { makeRests } from "./codegen/makeRests";
import { ChequeCreditbooksPD, OrderChequeBookOrPayingInModalPD } from "./example/chequeCreditBooks/chequeCreditBooks.pageD";
import { makeOneStory } from "./codegen/makeStories";
import { transformButtons } from "./buttons/allButtons";

console.log ( 0 )

export function writeToFile ( name: string, contents: string[] ) {
  fs.writeFileSync ( name, contents.join ( '\n' ) );
}

const focusOnVersion: string = JSON.parse ( loadFile ( 'package.json' ) ).version
console.log ( "focusOnVersion", focusOnVersion )
export const params: CombinedParams = {
  pagesFile: 'pages',
  focusOnVersion,
  commonParams: "CommonIds",
  stateName: "FState",
  commonFile: "common",
  pageDomainsFile: "pageDomains",
  domainsFile: "domains",
  fetchersFile: "fetchers",
  mockFetcherPackage: "mockfetchers",
  controllerPackage: "controllers",
  restsFile: "rests",
  pactsFile: "pact.spec",
  samplesFile: "samples",
  emptyFile: "empty",
  renderFile: "render",
  urlparams: 'commonIds',
  queriesPackage: 'queries',
  thePackage: 'focuson.data',
  applicationName: 'ExampleApp',
  fetcherPackage: 'fetchers',
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
let javaFetcherRoot = javaCodeRoot + "/" + params.fetcherPackage
let javaControllerRoot = javaCodeRoot + "/" + params.controllerPackage
let javaMockFetcherRoot = javaCodeRoot + "/" + params.mockFetcherPackage
let javaQueriesPackages = javaCodeRoot + "/" + params.queriesPackage
let tsRoot = "../formTs"
let tsScripts = tsRoot + "/scripts"
let tsCode = tsRoot + "/src"
let tsStory = tsRoot + "/src/stories"
let tsStoryBook = tsRoot + "/.storybook"
let tsPublic = tsRoot + "/public"

fs.mkdirSync ( `${outputRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaAppRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaCodeRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaResourcesRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaScriptRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaFetcherRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaMockFetcherRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaControllerRoot}`, { recursive: true } )
fs.mkdirSync ( `${javaQueriesPackages}`, { recursive: true } )

fs.mkdirSync ( `${tsCode}`, { recursive: true } )
fs.mkdirSync ( `${tsScripts}`, { recursive: true } )
fs.mkdirSync ( `${tsPublic}`, { recursive: true } )
fs.mkdirSync ( `${tsStory}`, { recursive: true } )
fs.mkdirSync ( `${tsStoryBook}`, { recursive: true } )

const directorySpec: DirectorySpec = {
  main: '.',
  backup: 'node_modules/@focuson/forms'
}
let pages = [ OccupationAndIncomeDetailsPageD, EAccountsSummaryPD, CreatePlanPD, ETransferPageD, CreateEAccountPageD, ChequeCreditbooksPD, OrderChequeBookOrPayingInModalPD ];
// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
let rests = unique ( pages.flatMap ( x => sortedEntries ( x.rest ) ).map ( ( x: [ string, RestDefnInPageProperties ] ) => x[ 1 ].rest ), r => r.dataDD.name )


writeToFile ( `${tsCode}/${params.renderFile}.tsx`, [ ...imports ( params.domainsFile, params.pageDomainsFile, params.emptyFile ), ...createAllReactComponents ( params, transformButtons, pages ) ] )
writeToFile ( `${tsCode}/${params.pageDomainsFile}.ts`, makePageDomainsFor ( params, pages ) )
writeToFile ( `${tsCode}/${params.domainsFile}.ts`, makeAllDomainsFor ( pages ) )
writeToFile ( `${tsCode}/${params.commonFile}.ts`, makeCommon ( params, pages, rests, directorySpec ) )

writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, [
  ...makeFetchersImport ( params ),
  ...makeAllFetchers ( params, pages ),
  ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, pages ) ] )
writeToFile ( `${tsCode}/${params.restsFile}.ts`, makeRests ( params, pages ) )

console.log ( 1 )
writeToFile ( `${tsCode}/${params.samplesFile}.ts`, [ ...imports ( params.domainsFile ), ...[ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, pages, i ) ) ] )
writeToFile ( `${tsCode}/${params.emptyFile}.ts`, [ ...imports ( params.domainsFile ), ...makeAllEmptyData ( params, pages ) ] )
writeToFile ( `${tsCode}/${params.pagesFile}.tsx`, makePages ( params, pages ) )
console.log ( 2 )
templateFile ( `${tsCode}/${params.pactsFile}.ts`, 'templates/allPacts.ts', { content: makeAllPacts ( params, pages, directorySpec ).join ( "\n" ) }, directorySpec )
templateFile ( `${tsCode}/index.tsx`, 'templates/index.template.ts', { ...params, firstPage: pages[ 0 ].name }, directorySpec )
copyFiles ( tsRoot, 'templates/raw/ts', directorySpec ) ( '.env', 'README.md', 'tsconfig.json' )
templateFile ( `${tsRoot}/package.json`, 'templates/packageTemplate.json', params, directorySpec )
copyFiles ( tsScripts, 'templates/scripts', directorySpec ) ( 'makePact.sh', 'makeJava.sh', 'makeJvmPact.sh', 'template.java', 'ports' )
copyFiles ( tsRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
templateFile ( `${tsScripts}/makePactsAndCopyFirstTime.sh`, 'templates/scripts/makePactsAndCopyFirstTime.sh', { ...params, javaRoot: javaAppRoot }, directorySpec )
console.log ( 3 )
pages.forEach ( p => writeToFile ( `${tsStory}/${storybookFileName ( p )}`, makeOneStory ( params, p ) ) )
copyFiles ( tsStoryBook, 'templates/raw/ts/stories', directorySpec ) ( 'main.js', 'preview.js', 'preview-head.html' )

console.log ( 'stories' )

copyFiles ( tsPublic, 'templates/raw/ts/public', directorySpec ) ( 'favicon.ico', 'index.css', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt' )

copyFiles ( javaScriptRoot, 'templates/scripts', directorySpec ) ( 'makeJava.sh', 'makeJvmPact.sh', 'template.java' )

console.log ( 4 )
// copyFiles ( javaAppRoot, 'templates/raw/java' ) ( '/build.gradle', 'application.properties' )
// templateFile ( `${javaAppRoot}/settings.gradle`, 'templates/settings.gradle', params )
templateFile ( `${javaAppRoot}/pom.xml`, 'templates/mvnTemplate.pom', params, directorySpec )
copyFiles ( javaAppRoot, 'templates/raw/java', directorySpec ) ( 'application.properties' )
templateFile ( `${javaCodeRoot}/SchemaController.java`, 'templates/raw/java/SchemaController.java', params, directorySpec )
templateFile ( `${javaControllerRoot}/Results.java`, 'templates/Results.java', params, directorySpec )
copyFiles ( javaAppRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
copyFiles ( javaCodeRoot, 'templates/raw/java', directorySpec ) ( 'CorsConfig.java' )

console.log ( 5 )

writeToFile ( `${javaResourcesRoot}/${params.schema}`, makeGraphQlSchema ( rests ) )
rests.forEach ( rest =>
  writeToFile ( `${javaCodeRoot}/${params.fetcherPackage}/${fetcherInterfaceName ( params, rest )}.java`, makeJavaResolversInterface ( params, rest ) )
)
writeToFile ( `${javaCodeRoot}/${params.wiringClass}.java`, makeAllJavaWiring ( params, rests, directorySpec ) )
templateFile ( `${javaCodeRoot}/${params.applicationName}.java`, 'templates/JavaApplicationTemplate.java', params, directorySpec )
rests.forEach ( restD => templateFile ( `${javaMockFetcherRoot}/${mockFetcherClassName ( params, restD )}.java`, 'templates/JavaFetcherClassTemplate.java',
  {
    ...params,
    fetcherInterface: fetcherInterfaceName ( params, restD ),
    fetcherClass: mockFetcherClassName ( params, restD ),
    thePackage: params.thePackage + "." + params.mockFetcherPackage,
    content: makeAllMockFetchers ( params, [ restD ] ).join ( "\n" )
  }, directorySpec ) )
templateFile ( `${javaCodeRoot}/${params.sampleClass}.java`, 'templates/JavaSampleTemplate.java',
  { ...params, content: indentList ( makeAllJavaVariableName ( pages, 0 ) ).join ( "\n" ) }, directorySpec )
rests.forEach ( r => templateFile ( `${javaQueriesPackages}/${queryClassName ( params, r )}.java`, 'templates/JavaQueryTemplate.java',
  {
    ...params,
    queriesClass: queryClassName(params,r),
    content: indentList ( makeJavaVariablesForGraphQlQuery ( [r] ) ).join ( "\n" )
  }, directorySpec ) )

rests.forEach ( rest => writeToFile ( `${javaControllerRoot}/${restControllerName ( rest )}.java`, makeSpringEndpointsFor ( params, rest ) ) )

