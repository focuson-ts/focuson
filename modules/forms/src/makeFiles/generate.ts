import { copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { CombinedParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { imports, indentList } from "../codegen/codegen";
import { createAllReactComponents } from "../codegen/makeComponents";
import { transformButtons } from "../buttons/allButtons";
import { makeAllDomainsFor, makePageDomainsFor } from "../codegen/makeDomain";
import { makeCommon } from "../codegen/makeCommon";
import { makeAllFetchers, makeFetchersDataStructure, makeFetchersImport } from "../codegen/makeFetchers";
import { makeRests } from "../codegen/makeRests";
import { makeAllEmptyData, makeAllJavaVariableName, makeAllSampleVariables } from "../codegen/makeSample";
import { makePages } from "../codegen/makePages";
import { makeAllPacts } from "../codegen/makePacts";
import { fetcherInterfaceName, mockFetcherClassName, queryClassName, restControllerName, storybookFileName } from "../codegen/names";
import { makeOneStory } from "../codegen/makeStories";
import { makeGraphQlSchema } from "../codegen/makeGraphQlTypes";
import { makeAllJavaWiring, makeJavaResolversInterface } from "../codegen/makeJavaResolvers";
import { makeAllMockFetchers } from "../codegen/makeMockFetchers";
import { makeJavaVariablesForGraphQlQuery } from "../codegen/makeGraphQlQuery";
import { makeSpringEndpointsFor } from "../codegen/makeSpringEndpoint";
import { makeJavaFiles } from "./makeJavaFiles";
import { makeTsFiles } from "./makeTsFiles";

export const generate = ( javaOutputRoot: string, tsRoot: string, focusOnVersion: string ) => <B> ( pages: PageD<B>[] ) => {
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