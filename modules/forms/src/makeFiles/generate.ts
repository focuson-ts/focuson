import { DirectorySpec, writeToFile } from "@focuson/files";
import { CombinedParams } from "../codegen/config";
import { flatMapToModal, MainPageD, RefD } from "../common/pageD";
import { makeJavaFiles } from "./makeJavaFiles";
import { makeTsFiles } from "./makeTsFiles";
import { ButtonD } from "../buttons/allButtons";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { MakeButton } from "../codegen/makeButtons";
import { validate } from "./validateModel";
import { foldPagesToRestToMutationsAndResolvers } from "../common/restD";
import { GenerateLogLevel, NameAnd, safeArray, toArray, unique } from "@focuson/utils";
import * as process from "process";
import { makeCriticalReport, makeReport, makeReportData } from "../reporting/report";
import { AppConfig } from "../appConfig";
import { allOutputParams, parametersFor } from "../common/resolverD";
import { ExtraPage } from "../codegen/makePages";

export const params: Omit<CombinedParams, 'focusOnVersion'> = {
  defaultDbName: "mock",
  pagesFile: 'pages',
  commonParams: "CommonIds",
  stateName: "FState",
  commonFile: "common",
  pageDomainsFile: "pageDomains",
  domainsFile: "domains",
  fetchersFile: "fetchers",
  mockFetcherPackage: "mockfetchers",
  dbFetcherPackage: 'dbFetchers',
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
  optionalsFile: 'optionals',
  mutatorPackage: 'mutator',
  resolversPackage: 'resolvers',
  utilsPackage: 'utils',
  maxTuples: 3,
  theme: 'theme-light',
  teamName: 'focuson',
  extractData: `( status: number | undefined, body: any ) => body.data`,
  controllerAnnotations: [ "@CrossOrigin()" ],
  endpointAnnotations: [],// ['@ApiOperation(value="{description}",notes="{notes}")', '@PreAuthorise("{authorisation}")']
  debugLevel: 'info',
  cssDirectory: 'css'
};

export const directorySpec: DirectorySpec = {
  main: '.',
  backup: 'node_modules/@focuson/forms'
}
export function maxTuplesFor<G> ( pages: RefD<G>[] ) {
  return foldPagesToRestToMutationsAndResolvers<G, number> ( pages, 0, {
    simple: ( mut ) => ( acc ) => {
      let fromMd: number = Math.max ( acc, allOutputParams ( parametersFor ( mut ) ).length );
      return mut.type === 'case' ?
        mut.select.reduce ( ( acc, smd ) => Math.max ( allOutputParams ( parametersFor ( smd ) ).length, acc ), fromMd ) :
        fromMd
    },
    guarded: ( sel, guarded ) => ( acc ) => acc
  } )
}
export const generate = <G extends GuardWithCondition> ( logLevel: GenerateLogLevel, directorySpec: DirectorySpec, appConfig: AppConfig, params: CombinedParams, javaOutputRoot: string, tsRoot: string, makeGuards: MakeGuard<G>, makeButtons: MakeButton<G> ) =>
  <B extends ButtonD> ( pages: MainPageD<B, G>[], references?: RefD<G>[], extraPages?: NameAnd<ExtraPage> ) => {
    const refs = toArray ( references );
    const paramsWithTuples = {
      ...params, maxTuples: maxTuplesFor ( [ ...refs, ...pages ] )
    }

    if ( pages.length === 0 ) {
      console.log ( `no pages have been configured ${process.cwd ()}` )
      process.exit ( 2 )
    }
    if ( [].flatMap === undefined ) {
      console.log ( `This code is running with an old version of Node (less than 11). Please update the node version` )
      process.exit ( 2 )
    }

    validate ( pages )
    const fullPages = unique ( pages.flatMap ( p => [ p, ...safeArray ( p.modals ).flatMap ( flatMapToModal ).map ( m => m.modal ) ] ), p => p.name )

    console.log ( "focusOnVersion", paramsWithTuples.focusOnVersion )
    if ( logLevel === 'detailed' ) console.log ( "Making Java Files" )
    makeJavaFiles ( logLevel, appConfig, javaOutputRoot, paramsWithTuples, directorySpec ) ( fullPages, refs )
    if ( logLevel === 'detailed' ) console.log ( "Making Typescript Files" )

    makeTsFiles<G> ( logLevel, appConfig, tsRoot, paramsWithTuples, makeGuards, makeButtons, directorySpec ) ( pages, fullPages, refs, extraPages )

    const reportData = makeReportData<B, G> ( pages );
    const criticals = makeCriticalReport ( reportData );
    const report = makeReport ( reportData )
    console.log ( criticals.join ( "\n" ) )
    writeToFile ( `${javaOutputRoot}/report.md`, () => report )
    writeToFile ( `${tsRoot}/report.md`, () => report )
    if ( logLevel === 'detailed' ) console.log ( "Finished" )
  };
