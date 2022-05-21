import { copyFile, copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { TSParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { detailsLog, GenerateLogLevel, safeArray, sortedEntries } from "@focuson/utils";
import { allMainPages, isMainPage, MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { createRenderPage } from "../codegen/makeRender";
import { ButtonD } from "../buttons/allButtons";
import { makeAllDomainsFor, makePageDomainsFor } from "../codegen/makeDomain";
import { makeCommon } from "../codegen/makeCommon";
import { makeAllFetchers, makeFetcherDataStructureImport, makeFetchersDataStructure, makeFetchersImport } from "../codegen/makeTSFetchers";
import { makeRestDetailsPage, makeRests } from "../codegen/makeRests";
import { makeAllEmptyData, makeAllSampleVariables } from "../codegen/makeSample";
import { makePages } from "../codegen/makePages";
import { domainsFileName, emptyFileName, fetcherFileName, guardReportFileName, optionalsFileName, pactFileName, renderFileName, restFileName, samplesFileName, storybookFileName } from "../codegen/names";
import { makeOneStory } from "../codegen/makeStories";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { MakeButton } from "../codegen/makeButtons";
import { makeAllPactsForPage } from "../codegen/makePacts2";
import { makeOptionals } from "../codegen/makeOptionals";
import { mainPage } from "@focuson/pages";
import { makeGuardsReportForPage } from "../reporting/report";
import { AppConfig } from "../appConfig";

export const makeTsFiles = <G extends GuardWithCondition> ( logLevel: GenerateLogLevel, appConfig: AppConfig, tsRoot: string, params: TSParams, makeGuards: MakeGuard<G>, makeButtons: MakeButton<G>, directorySpec: DirectorySpec ) =>
  <B extends ButtonD> ( mainPs: MainPageD<B, G>[], allPages: PageD<B, G>[] ) => {
    //to help the readability of the writeFile/template files
    const details = logLevel === 'detailed' ? 2 : -1
    const minimal = logLevel === 'minimal' ? 2 : -1
    const overview = logLevel === 'overview' ? 2 : -1


    const tsScripts = tsRoot + "/scripts"
    const tsCode = tsRoot + "/src"

    const tsStoryBook = tsRoot + "/.storybook"
    const tsPublic = tsRoot + "/public"

    fs.mkdirSync ( `${tsCode}`, { recursive: true } )
    fs.mkdirSync ( `${tsScripts}`, { recursive: true } )
    fs.mkdirSync ( `${tsPublic}`, { recursive: true } )
    fs.mkdirSync ( `${tsStoryBook}`, { recursive: true } )
    templateFile ( tsRoot + "/project.details.json", 'templates/ts.projectDetails.json', {
      ...params,
      versionNumber: appConfig.versionNumber,
      applicationName: params.applicationName.toLowerCase (),
      javaPort: appConfig.javaPort,
      tsPort: appConfig.tsPort
    }, directorySpec )

    mainPs.forEach ( mainP => {
      detailsLog ( logLevel, 1, `typescript page ${mainP.name}` )
      const tsPage = `${tsCode}/${mainP.name}`
      fs.mkdirSync ( tsPage, { recursive: true } )
      // fs.mkdirSync ( tsPage + "/" + mainP.name, { recursive: true } )

      writeToFile ( renderFileName ( tsCode, params, mainP, mainP ) + ".tsx",
        () => createRenderPage ( params, makeGuards, makeButtons, mainP, mainP ), details )
      safeArray ( mainP.modals ).forEach ( ( { modal } ) => {
          // fs.mkdirSync ( tsPage + "/" + modal.name, { recursive: true } )
          writeToFile ( renderFileName ( tsCode, params, mainP, modal ) + ".tsx",
            () => createRenderPage ( params, makeGuards, makeButtons, mainP, modal ), details );
        }
      )
      writeToFile ( domainsFileName ( tsCode, params, mainP ) + ".ts", () => [
        ...makePageDomainsFor ( params, [ mainP ] ),
        ...makeAllDomainsFor ( [ mainP ] ) ], details )

      writeToFile ( samplesFileName ( tsCode, params, mainP ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, mainP )}'`, '',
        ...([ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, [ mainP ], i ) )) ], details )

      writeToFile ( emptyFileName ( tsCode, params, mainP ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, mainP )}'`, '',
        ...makeAllEmptyData ( params, [ mainP ] ) ], details )

      writeToFile ( fetcherFileName ( tsCode, params, mainP ) + ".ts", () => [
        ...makeFetchersImport ( params, mainP ),
        ...(makeAllFetchers ( params, [ mainP ] )) ], details )

      writeToFile ( restFileName ( tsCode, params, mainP ) + ".ts", () => makeRests ( params, mainP ) )
      writeToFile ( storybookFileName ( tsCode, params, mainP ) + '.ts', () => makeOneStory ( params, mainP ), details )

      writeToFile ( optionalsFileName ( tsCode, params, mainP ) + '.ts', () => makeOptionals ( params, mainP ) )

      if ( Object.keys ( mainP.rest ).length > 0 )
        writeToFile ( pactFileName ( tsCode, params, mainP ) + ".ts", () => makeAllPactsForPage ( params, mainP ) )

      let report = makeGuardsReportForPage ( mainP ).general;
      if ( report.length > 0 )
        writeToFile ( guardReportFileName ( tsCode, params, mainP ) + ".md", () => report )

    } )


    writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, () => [
      ...makeFetcherDataStructureImport ( params, allPages ),
      ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, allPages ) ], details )

    writeToFile ( `${tsCode}/${params.restsFile}.ts`, () => makeRestDetailsPage ( params, allPages ), details )
    const rests = unique ( allPages.flatMap ( pd => isMainPage ( pd ) ? sortedEntries ( pd.rest ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => x[ 1 ].rest ) : [] ), r => r.dataDD.name )

    writeToFile ( `${tsCode}/${params.commonFile}.ts`, () => makeCommon ( appConfig, params, mainPs, directorySpec ), details )
    writeToFile ( `${tsCode}/${params.pagesFile}.ts`, () => makePages ( params, mainPs ), details )


    templateFile ( `${tsCode}/index.tsx`, 'templates/index.template.ts', { ...params, pageMode: JSON.stringify ( allMainPages ( allPages )[ 0 ].modes[ 0 ] ), firstPage: allPages[ 0 ].name, fetch: appConfig.fetch, debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
    templateFile ( `${tsRoot}/package.json`, 'templates/packageTemplate.json',
      { ...params, applicationName: params.applicationName.toLowerCase (), versionNumber: appConfig.versionNumber }, directorySpec, details )
    detailsLog ( logLevel, 1, 'copying files' )
    copyFiles ( tsRoot, 'templates/raw/ts', directorySpec ) ( '.env', 'README.md', 'tsconfig.json' )
    copyFiles ( tsScripts, 'templates/scripts', directorySpec ) ( 'makePact.sh', 'makeJava.sh', 'makeJvmPact.sh', 'template.java', 'ports' )
    copyFile ( tsRoot + '/.gitignore', 'templates/raw/gitignore', directorySpec )

    // copyFiles ( tsRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
    copyFiles ( tsStoryBook, 'templates/raw/ts/stories', directorySpec ) ( 'main.js', 'preview.js', 'preview-head.html' )
    copyFiles ( tsPublic, 'templates/raw/ts/public', directorySpec ) ( 'favicon.ico', 'index.css', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt' )

  };