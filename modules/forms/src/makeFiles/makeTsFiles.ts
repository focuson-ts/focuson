import { copyFile, copyFiles, CopyFilesRecursively, DirectorySpec, GetFilelistRecursively2, templateFile, writeToFile } from "@focuson/files";
import { TSParams } from "../codegen/config";
import fs from "fs";
import { detailsLog, GenerateLogLevel, safeArray, sortedEntries, unique } from "@focuson/utils";
import { allMainPages, flatMapToModal, isMainPage, MainPageD, PageD, RefD, RestDefnInPageProperties } from "../common/pageD";
import { createRenderPage } from "../codegen/makeRender";
import { ButtonD } from "../buttons/allButtons";
import { makeAllDomainsFor, makePageDomainsFor } from "../codegen/makeDomain";
import { makeCommon } from "../codegen/makeCommon";
import { makeFetcherDataStructureImport, makeNewFetchersDataStructure } from "../codegen/makeTSFetchers";
import { makeRestDetailsPage, makeRests } from "../codegen/makeRests";
import { makeAllEmptyData, makeAllSampleVariables } from "../codegen/makeSample";
import { makePages } from "../codegen/makePages";
import { domainsFileName, emptyFileName, guardReportFileName, optionalsFileName, pactFileName, renderFileName, restFileName, samplesFileName, storybookFileName } from "../codegen/names";
import { makeOneStory } from "../codegen/makeStories";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { MakeButton } from "../codegen/makeButtons";
import { makeAllPactsForPage } from "../codegen/makePacts2";
import { makeVariables } from "../codegen/makeVariables";
import { makeGuardsReportForPage } from "../reporting/report";
import { AppConfig } from "../appConfig";

const themes = [ 'theme-dark', 'theme-light' ]
export const makeTsFiles = <G extends GuardWithCondition> ( logLevel: GenerateLogLevel, appConfig: AppConfig, tsRoot: string, params: TSParams, makeGuards: MakeGuard<G>, makeButtons: MakeButton<G>, directorySpec: DirectorySpec ) =>
  <B extends ButtonD> ( mainPs: MainPageD<B, G>[], allPages: PageD<B, G>[], refs: RefD<G>[] ) => {
    const allRefs: RefD<G>[] = [ ...refs, ...mainPs ]
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
    fs.mkdirSync ( `${tsPublic}/themes`, { recursive: true } )
    fs.mkdirSync ( `${tsPublic}/css`, { recursive: true } )
    themes.forEach ( theme => fs.mkdirSync ( `${tsPublic}/themes/${theme}/icons`, { recursive: true } ) )
    fs.mkdirSync ( `${tsStoryBook}`, { recursive: true } )
    templateFile ( tsRoot + "/project.details.json", 'templates/ts.projectDetails.json', {
      ...params,
      versionNumber: appConfig.versionNumber,
      applicationName: params.applicationName.toLowerCase (),
      javaPort: appConfig.javaPort,
      tsPort: appConfig.tsPort
    }, directorySpec )

    allRefs.forEach ( mainP => {
      detailsLog ( logLevel, 1, `typescript page ${mainP.name}` )
      const tsPage = `${tsCode}/${mainP.name}`
      fs.mkdirSync ( tsPage, { recursive: true } )
      // fs.mkdirSync ( tsPage + "/" + mainP.name, { recursive: true } )

      if ( isMainPage<B, G> ( mainP ) ) {
        writeToFile ( renderFileName ( tsCode, params, mainP, mainP ) + ".tsx",
          () => createRenderPage ( params, makeGuards, makeButtons, mainP, mainP ), details )
        safeArray ( mainP.modals ).flatMap ( flatMapToModal ).forEach ( ( { modal } ) => {
            // fs.mkdirSync ( tsPage + "/" + modal.name, { recursive: true } )
            writeToFile ( renderFileName ( tsCode, params, mainP, modal ) + ".tsx",
              () => createRenderPage ( params, makeGuards, makeButtons, mainP, modal ), details );
          }
        )
        writeToFile ( storybookFileName ( tsCode, params, mainP ) + '.ts', () => makeOneStory ( params, mainP ), details )

        writeToFile ( optionalsFileName ( tsCode, params, mainP ) + '.ts', () => makeVariables ( params, mainP ) )

      }
      writeToFile ( domainsFileName ( tsCode, params, mainP ) + ".ts", () => [
        ...makePageDomainsFor ( params, [ mainP ] ),
        ...makeAllDomainsFor ( [ mainP ] ) ], details )

      writeToFile ( samplesFileName ( tsCode, params, mainP ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, mainP )}'`, '',
        ...([ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, [ mainP ], i ) )) ], details )

      writeToFile ( emptyFileName ( tsCode, params, mainP ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, mainP )}'`, '',
        ...makeAllEmptyData ( params, [ mainP ] ) ], details )

      // writeToFile ( fetcherFileName ( tsCode, params, mainP ) + ".ts", () => [
      //   ...makeFetchersImport ( params, mainP ),
      //   ...(makeAllFetchers ( params, [ mainP ] )) ], details )

      writeToFile ( restFileName ( tsCode, params, mainP ) + ".ts", () => makeRests ( params, mainP ) )

      if ( Object.keys ( mainP.rest ).length > 0 )
        writeToFile ( pactFileName ( tsCode, params, mainP ) + ".ts", () => makeAllPactsForPage ( params, mainP ) )

      let report = isMainPage<B, G> ( mainP ) ? makeGuardsReportForPage ( mainP ).general : [];
      if ( report.length > 0 )
        writeToFile ( guardReportFileName ( tsCode, params, mainP ) + ".md", () => report )
    } )

    writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, () => [
      ...makeFetcherDataStructureImport ( params, mainPs ),
      // ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, mainPs ),
      ...makeNewFetchersDataStructure ( params, mainPs ) ], details )

    writeToFile ( `${tsCode}/${params.restsFile}.ts`, () => makeRestDetailsPage ( params, allRefs ), details )
    const rests = unique ( allPages.flatMap ( pd => isMainPage ( pd ) ? sortedEntries ( pd.rest ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => x[ 1 ].rest ) : [] ), r => r.dataDD.name )

    writeToFile ( `${tsCode}/${params.commonFile}.ts`, () => makeCommon ( appConfig, params, allRefs, directorySpec ), details )
    writeToFile ( `${tsCode}/${params.pagesFile}.ts`, () => makePages ( params, mainPs ), details )


    templateFile ( `${tsCode}/index.tsx`, 'templates/index.template.ts', { ...params, pageMode: JSON.stringify ( allMainPages ( allPages )[ 0 ].modes[ 0 ] ), firstPage: allPages[ 0 ].name, fetch: appConfig.fetch, debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
    templateFile ( `${tsCode}/store.ts`, 'templates/store.template.ts', { ...params, pageMode: JSON.stringify ( allMainPages ( allPages )[ 0 ].modes[ 0 ] ), firstPage: allPages[ 0 ].name, fetch: appConfig.fetch, debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
    templateFile ( `${tsCode}/config.ts`, 'templates/config.template.ts', { ...params, pageMode: JSON.stringify ( allMainPages ( allPages )[ 0 ].modes[ 0 ] ), firstPage: allPages[ 0 ].name, fetch: appConfig.fetch, debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
    templateFile ( `${tsCode}/index.package.ts`, 'templates/index.package.ts', params, directorySpec, details )
    templateFile ( `${tsRoot}/package.json`, 'templates/packageTemplate.json',
      { ...params, applicationName: params.applicationName.toLowerCase (), versionNumber: appConfig.versionNumber }, directorySpec, details )
    detailsLog ( logLevel, 1, 'copying files' )
    copyFiles ( tsRoot, 'templates/raw/ts', directorySpec ) ( '.env', 'README.md', 'tsconfig.json' )
    // copyFiles ( tsScripts, 'templates/scripts', directorySpec ) ( 'makePact.sh', 'makeJava.sh', 'makeJvmPact.sh', 'template.java', 'ports' )
    copyFile ( tsRoot + '/.gitignore', 'templates/raw/gitignore', directorySpec )

    // copyFiles ( tsRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
    copyFiles ( tsStoryBook, 'templates/raw/ts/stories', directorySpec ) ( 'main.js', 'preview.js', 'preview-head.html' )
    copyFiles ( tsPublic, 'templates/raw/ts/public', directorySpec ) ( 'favicon.ico', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt' )
    function copyTheme ( theme: string ) {
      copyFiles ( tsPublic + `/themes/${theme}`, `templates/raw/ts/public/themes/${theme}`, directorySpec ) ( 'button.css', 'checkbox.css', 'core.css', 'dropdown.css', 'index.css', 'input.css', 'radio.css', 'table.css' )
      copyFiles ( tsPublic + `/themes/${theme}/icons`, `templates/raw/ts/public/themes/${theme}/icons`, directorySpec ) ( 'chevron-down.svg' )
    }
    themes.forEach ( copyTheme )
    templateFile ( `${tsPublic}/index.css`, 'templates/raw/ts/public/index.css', params, directorySpec, details )
    const cssImports = params.cssDirectory && fs.existsSync ( params.cssDirectory ) ? GetFilelistRecursively2 ( params.cssDirectory, 0 )
      .filter ( res => !res.isDir && res.file.endsWith ( '.css' ) )
      .map ( ( { isDir, file } ) => `    <link rel="stylesheet" href="%PUBLIC_URL%/css/${file}" type="text/css">` ).join ( "\n" ) : ''
    templateFile ( `${tsPublic}/index.html`, 'templates/raw/ts/public/index.html', { ...params, cssImports }, directorySpec, details )

    if ( fs.existsSync ( 'src/actions.ts' ) )
      copyFile ( tsCode + '/actions.ts', 'src/actions.ts' )
    else
      copyFile ( tsCode + '/actions.ts', 'templates/actions.ts', directorySpec )

    if ( params.cssDirectory && fs.existsSync ( params.cssDirectory ) )
      CopyFilesRecursively ( params.cssDirectory, `${tsPublic}/css`, 0 )
    else
      console.log ( `Not copying css files in cssDirectory [${params.cssDirectory}]` )
  };
