import { DirectorySpec } from "@focuson/files";
import { CombinedParams } from "../codegen/config";
import { PageD } from "../common/pageD";
import { makeJavaFiles } from "./makeJavaFiles";
import { makeTsFiles } from "./makeTsFiles";
import { ButtonD, makeButtons } from "../buttons/allButtons";
import { AllGuardCreator, AllGuards, GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { MakeButton } from "../codegen/makeButtons";
import { AppConfig } from "../focuson.config";

export const generate = <G extends GuardWithCondition> ( appConfig: AppConfig, javaOutputRoot: string, tsRoot: string, focusOnVersion: string, makeGuards: MakeGuard<G>, makeButtons: MakeButton<G> ) => <B extends ButtonD> ( pages: PageD<B, G>[] ) => {
  const params: CombinedParams = {
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
    sampleClass: 'Sample',
    dbPackage: 'db'
  };

  console.log ( 0 )
  console.log ( "focusOnVersion", focusOnVersion )
  const directorySpec: DirectorySpec = {
    main: '.',
    backup: 'node_modules/@focuson/forms'
  }

  makeJavaFiles (appConfig, javaOutputRoot, params, directorySpec ) ( pages )
  makeTsFiles<G> (appConfig, tsRoot, params, makeGuards, makeButtons, directorySpec ) ( pages )
};