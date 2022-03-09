import { DirectorySpec } from "@focuson/files";
import { CombinedParams } from "../codegen/config";
import { PageD } from "../common/pageD";
import { makeJavaFiles } from "./makeJavaFiles";
import { makeTsFiles } from "./makeTsFiles";
import { ButtonD } from "../buttons/allButtons";

export const generate = ( javaOutputRoot: string, tsRoot: string, focusOnVersion: string ) => <B extends ButtonD> ( pages: PageD<B>[] ) => {
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
    sampleClass: 'Sample'
  };

  console.log ( 0 )
  console.log ( "focusOnVersion", focusOnVersion )
  const directorySpec: DirectorySpec = {
    main: '.',
    backup: 'node_modules/@focuson/forms'
  }

  makeJavaFiles ( javaOutputRoot, params, directorySpec )(pages)
  makeTsFiles ( tsRoot, params, directorySpec )(pages)
};