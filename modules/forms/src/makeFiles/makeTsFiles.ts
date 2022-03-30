import { copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { TSParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { detailsLog, GenerateLogLevel, sortedEntries } from "@focuson/utils";
import { isMainPage, PageD, RestDefnInPageProperties } from "../common/pageD";
import { createRenderPage } from "../codegen/makeRender";
import { ButtonD } from "../buttons/allButtons";
import { makeAllDomainsFor, makePageDomainsFor } from "../codegen/makeDomain";
import { makeCommon } from "../codegen/makeCommon";
import { makeAllFetchers, makeFetcherDataStructureImport, makeFetchersDataStructure, makeFetchersImport } from "../codegen/makeTSFetchers";
import { makeRestDetailsPage, makeRests } from "../codegen/makeRests";
import { makeAllEmptyData, makeAllSampleVariables } from "../codegen/makeSample";
import { makePages } from "../codegen/makePages";
import { domainsFileName, emptyFileName, fetcherFileName, optionalsFileName, pactFileName, renderFileName, restFileName, samplesFileName, storybookFileName } from "../codegen/names";
import { makeOneStory } from "../codegen/makeStories";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { MakeButton } from "../codegen/makeButtons";
import { AppConfig } from "../focuson.config";
import { makeAllPactsForPage } from "../codegen/makePacts2";
import { makeOptionals } from "../codegen/makeOptionals";

export const makeTsFiles = <G extends GuardWithCondition> ( logLevel: GenerateLogLevel, appConfig: AppConfig, tsRoot: string, params: TSParams, makeGuards: MakeGuard<G>, makeButtons: MakeButton<G>, directorySpec: DirectorySpec ) => <B extends ButtonD> ( pages: PageD<B, G>[] ) => {
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

  pages.forEach ( p => {
    detailsLog ( logLevel, 1, `typescript page ${p.name}` )
    const tsPage = `${tsCode}/${p.name}`
    fs.mkdirSync ( tsPage, { recursive: true } )

    writeToFile ( renderFileName ( tsCode, params, p ) + ".tsx",
      () => createRenderPage ( params, makeGuards, makeButtons, p ), details )

    if ( isMainPage ( p ) ) {
      writeToFile ( domainsFileName ( tsCode, params, p ) + ".ts", () => [
        ...makePageDomainsFor ( params, [ p ] ),
        ...makeAllDomainsFor ( [ p ] ) ], details )

      writeToFile ( samplesFileName ( tsCode, params, p ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, p )}'`, '',
        ...([ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, [ p ], i ) )) ], details )

      writeToFile ( emptyFileName ( tsCode, params, p ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, p )}'`, '',
        ...makeAllEmptyData ( params, [ p ] ) ], details )

      writeToFile ( fetcherFileName ( tsCode, params, p ) + ".ts", () => [
        ...makeFetchersImport ( params, p ),
        ...(makeAllFetchers ( params, [ p ] )) ], details )

      writeToFile ( restFileName ( tsCode, params, p ) + ".ts", () => makeRests ( params, p ) )
      writeToFile ( storybookFileName ( tsCode, params, p ) + '.ts', () => makeOneStory ( params, p ), details )

      const optionals = makeOptionals ( params, p )
      if ( optionals.length > 0 ) writeToFile ( optionalsFileName ( tsCode, params, p ) + '.ts', () => optionals )

      if ( Object.keys ( p.rest ).length > 0 )
        writeToFile ( pactFileName ( tsCode, params, p ) + ".ts", () => makeAllPactsForPage ( params, p ) )
    }


  } )

  writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, () => [
    ...makeFetcherDataStructureImport ( params, pages ),
    ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, pages ) ], details )

  writeToFile ( `${tsCode}/${params.restsFile}.ts`, () => makeRestDetailsPage ( params, pages ), details )
  const rests = unique ( pages.flatMap ( pd => isMainPage ( pd ) ? sortedEntries ( pd.rest ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => x[ 1 ].rest ) : [] ), r => r.dataDD.name )

  writeToFile ( `${tsCode}/${params.commonFile}.ts`, () => makeCommon ( appConfig, params, pages, rests, directorySpec ), details )
  writeToFile ( `${tsCode}/${params.pagesFile}.tsx`, () => makePages ( params, pages ), details )


  templateFile ( `${tsCode}/index.tsx`, 'templates/index.template.ts', { ...params, firstPage: pages[ 0 ].name, fetch: appConfig.fetch, debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
  templateFile ( `${tsRoot}/package.json`, 'templates/packageTemplate.json', params, directorySpec, details )
  detailsLog ( logLevel, 1, 'copying files' )
  copyFiles ( tsRoot, 'templates/raw/ts', directorySpec ) ( '.env', 'README.md', 'tsconfig.json' )
  copyFiles ( tsScripts, 'templates/scripts', directorySpec ) ( 'makePact.sh', 'makeJava.sh', 'makeJvmPact.sh', 'template.java', 'ports' )
  copyFiles ( tsRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
  copyFiles ( tsStoryBook, 'templates/raw/ts/stories', directorySpec ) ( 'main.js', 'preview.js', 'preview-head.html' )
  copyFiles ( tsPublic, 'templates/raw/ts/public', directorySpec ) ( 'favicon.ico', 'index.css', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt' )

};