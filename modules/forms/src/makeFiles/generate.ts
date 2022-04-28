import { DirectorySpec, writeToFile } from "@focuson/files";
import { CombinedParams } from "../codegen/config";
import { MainPageD } from "../common/pageD";
import { makeJavaFiles } from "./makeJavaFiles";
import { makeTsFiles } from "./makeTsFiles";
import { ButtonD } from "../buttons/allButtons";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { MakeButton } from "../codegen/makeButtons";
import { validate } from "./validateModel";
import { unique } from "../common/restD";
import { GenerateLogLevel, safeArray } from "@focuson/utils";
import * as process from "process";
import { makeCriticalReport, makeReport, makeReportData } from "../reporting/report";
import { AppConfig } from "../appConfig";

export const params: any = {
  pagesFile: 'pages',
  commonParams: "CommonIds",
  stateName: "FState",
  commonFile: "common",
  pageDomainsFile: "pageDomains",
  domainsFile: "domains",
  fetchersFile: "fetchers",
  mockFetcherPackage: "mockfetchers",
  h2FetcherPackage: 'h2Fetchers',
  controllerPackage: "request.controllers",
  restsFile: "rests",
  pactsFile: "pact.spec",
  samplesFile: "samples",
  emptyFile: "empty",
  renderFile: "render",
  guardReportFile: 'guards',
  urlparams: 'commonIds',
  queriesPackage: 'queries',
  thePackage: 'focuson.data',
  applicationName: 'ExampleApp',
  fetcherPackage: 'fetchers',
  fetcherInterface: 'FFetcher',
  wiringClass: 'Wiring',
  fetcherClass: 'MockFetchers',
  schema: 'someSchema.graphql',
  sampleClass: 'Sample',
  dbPackage: 'db',
  optionalsFile: 'optionals'
};

export const directorySpec: DirectorySpec = {
  main: '.',
  backup: 'node_modules/@focuson/forms'
}
export const generate = <G extends GuardWithCondition> ( logLevel: GenerateLogLevel, directorySpec: DirectorySpec, appConfig: AppConfig, params: CombinedParams, javaOutputRoot: string, tsRoot: string, makeGuards: MakeGuard<G>, makeButtons: MakeButton<G> ) => <B extends ButtonD> ( pages: MainPageD<B, G>[] ) => {
  if ( pages.length === 0 ) {
    console.log ( `no pages have been configured ${process.cwd ()}` )
    process.exit ( 2 )
  }
  if ( [].flatMap === undefined ) {
    console.log ( `This code is running with an old version of Node (less than 11). Please update the node version` )
    process.exit ( 2 )
  }

  validate ( pages )
  const fullPages = unique ( pages.flatMap ( p => [ p, ...safeArray ( p.modals ).map ( m => m.modal ) ] ), p => p.name )

  console.log ( "focusOnVersion", params.focusOnVersion )
  if ( logLevel === 'detailed' ) console.log ( "Making Java Files" )
  makeJavaFiles ( logLevel, appConfig, javaOutputRoot, params, directorySpec ) ( fullPages )
  if ( logLevel === 'detailed' ) console.log ( "Making Typescript Files" )
  makeTsFiles<G> ( logLevel, appConfig, tsRoot, params, makeGuards, makeButtons, directorySpec ) ( pages, fullPages )

  const reportData = makeReportData<B, G> ( pages );
  const criticals = makeCriticalReport ( reportData );
  const report = makeReport ( reportData )
  console.log ( criticals.join ( "\n" ) )
  writeToFile ( `${javaOutputRoot}/report.md`, () => report )
  writeToFile ( `${tsRoot}/report.md`, () => report )
  if ( logLevel === 'detailed' ) console.log ( "Finished" )
};
