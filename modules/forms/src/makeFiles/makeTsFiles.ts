import { copyFile, copyFiles, CopyFilesRecursively, DirectorySpec, GetFilelistRecursively2, templateFile, writeToFile } from "@focuson/files";
import { TSParams } from "../codegen/config";
import fs, { write } from "fs";
import { detailsLog, GenerateLogLevel, NameAnd, safeArray, sortedEntries, unique } from "@focuson/utils";
import { allMainPages, flatMapToModal, isMainPage, MainPageD, PageD, RefD, RestDefnInPageProperties } from "../common/pageD";
import { createRenderPage } from "../codegen/makeRender";
import { ButtonD } from "../buttons/allButtons";
import { makeAllDomainsFor, makePageDomainsFor } from "../codegen/makeDomain";
import { makeCommon } from "../codegen/makeCommon";
import { makeFetcherDataStructureImport, makeNewFetchersDataStructure } from "../codegen/makeTSFetchers";
import { makeRestDetailsPage, makeRests } from "../codegen/makeRests";
import { makeAllEmptyData, makeAllSampleVariables } from "../codegen/makeSample";
import { ExtraPage, makePages } from "../codegen/makePages";
import { domainsFileName, emptyFileName, guardReportFileName, optionalsFileName, pactFileName, renderFileName, restFileName, samplesFileName, storybookFileName } from "../codegen/names";
import { makeOneStory } from "../codegen/makeStories";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { MakeButton } from "../codegen/makeButtons";
import { makeAllPactsForPage } from "../codegen/makePacts2";
import { makeVariables } from "../codegen/makeVariables";
import { makeGuardsReportForPage } from "../reporting/report";
import { AppConfig } from "../appConfig";
import { makeRefs } from "../codegen/makeRefs";

const themes = [ 'theme-dark', 'theme-light' ]
export const makeTsFiles = <G extends GuardWithCondition> ( logLevel: GenerateLogLevel, appConfig: AppConfig, tsRoot: string, params: TSParams, makeGuards: MakeGuard<G>, makeButtons: MakeButton<G>, directorySpec: DirectorySpec ) =>
  <B extends ButtonD> ( mainPs: MainPageD<B, G>[], allPages: PageD<B, G>[], refs: RefD<G>[], extraPages: NameAnd<ExtraPage> | undefined ) => {
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
    fs.mkdirSync ( `${tsPublic}/css/focuson`, { recursive: true } )
    fs.mkdirSync ( `${tsPublic}/icons/focuson`, { recursive: true } )
    themes.forEach ( theme => fs.mkdirSync ( `${tsPublic}/themes/${theme}/icons`, { recursive: true } ) )
    fs.mkdirSync ( `${tsStoryBook}`, { recursive: true } )
    templateFile ( tsRoot + "/project.details.json", 'templates/ts.projectDetails.json', {
      ...params,
      versionNumber: appConfig.versionNumber,
      applicationName: params.applicationName.toLowerCase (),
      javaPort: appConfig.javaPort,
      tsPort: appConfig.tsPort
    }, directorySpec )

    allRefs.forEach ( mainRef => {
      detailsLog ( logLevel, 1, `typescript page ${mainRef.name}` )
      const tsPage = `${tsCode}/${mainRef.name}`
      fs.mkdirSync ( tsPage, { recursive: true } )
      // fs.mkdirSync ( tsPage + "/" + mainRef.name, { recursive: true } )

      if ( isMainPage<B, G> ( mainRef ) ) {
        writeToFile ( renderFileName ( tsCode, params, mainRef, mainRef ) + ".tsx",
          () => createRenderPage ( params, makeGuards, makeButtons, mainRef, mainRef ), details )
        safeArray ( mainRef.modals ).flatMap ( flatMapToModal ).forEach ( ( { modal } ) => {
            // fs.mkdirSync ( tsPage + "/" + modal.name, { recursive: true } )
            writeToFile ( renderFileName ( tsCode, params, mainRef, modal ) + ".tsx",
              () => createRenderPage ( params, makeGuards, makeButtons, mainRef, modal ), details );
          }
        )
        writeToFile ( storybookFileName ( tsCode, params, mainRef ) + '.ts', () => makeOneStory ( params, mainRef ), details )

        writeToFile ( optionalsFileName ( tsCode, params, mainRef ) + '.ts', () => makeVariables ( params, mainRef ) )

      }
      writeToFile ( domainsFileName ( tsCode, params, mainRef ) + ".ts", () => [
        ...makePageDomainsFor ( params, [ mainRef ] ),
        ...makeAllDomainsFor ( [ mainRef ] ) ], details )

      writeToFile ( samplesFileName ( tsCode, params, mainRef ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, mainRef )}'`, '',
        ...([ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, [ mainRef ], i ) )) ], details )

      writeToFile ( emptyFileName ( tsCode, params, mainRef ) + ".ts", () => [
        `import * as domains from '${domainsFileName ( '..', params, mainRef )}'`, '',
        ...makeAllEmptyData ( params, [ mainRef ] ) ], details )

      // writeToFile ( fetcherFileName ( tsCode, params, mainRef ) + ".ts", () => [
      //   ...makeFetchersImport ( params, mainRef ),
      //   ...(makeAllFetchers ( params, [ mainRef ] )) ], details )

      writeToFile ( restFileName ( tsCode, params, mainRef ) + ".ts", () => makeRests ( params, mainRef ) )


      // if ( Object.keys ( mainRef.rest ).length > 0 )
      //   writeToFile ( pactFileName ( tsCode, params, mainRef ) + ".ts", () => makeAllPactsForPage ( params, mainRef ) )

      let report = isMainPage<B, G> ( mainRef ) ? makeGuardsReportForPage ( mainRef ).general : [];
      if ( report.length > 0 )
        writeToFile ( guardReportFileName ( tsCode, params, mainRef ) + ".md", () => report )
    } )

    writeToFile ( `${tsCode}/${params.loadRefsFile}.ts`, () => makeRefs ( params, allRefs ), details )
    writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, () => [
      ...makeFetcherDataStructureImport ( params, allRefs ),
      // ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, mainPs ),
      ...makeNewFetchersDataStructure ( params, allRefs ) ], details )

    writeToFile ( `${tsCode}/${params.restsFile}.ts`, () => makeRestDetailsPage ( params, allRefs ), details )
    // const rests = unique ( allPages.flatMap ( pd => isMainPage ( pd ) ? sortedEntries ( pd.rest ).map ( ( x: [ string, RestDefnInPageProperties<G> ] ) => x[ 1 ].rest ) : [] ), r => r.dataDD.name )

    writeToFile ( `${tsCode}/${params.commonFile}.ts`, () => makeCommon ( appConfig, params, allRefs, directorySpec ), details )
    writeToFile ( `${tsCode}/${params.pagesFile}.ts`, () => makePages ( params, mainPs, extraPages ), details )


    templateFile ( `${tsCode}/index.tsx`, 'templates/index.template.ts', { ...params, pageMode: JSON.stringify ( allMainPages ( allPages )[ 0 ].modes[ 0 ] ), firstPage: allPages[ 0 ].name, fetch: appConfig.fetch, delayBeforeMessagesRemoved: appConfig.delayBeforeMessagesRemoved ? appConfig.delayBeforeMessagesRemoved : 'undefined', debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
    templateFile ( `${tsCode}/store.ts`, 'templates/store.template.ts', { ...params, pageMode: JSON.stringify ( allMainPages ( allPages )[ 0 ].modes[ 0 ] ), firstPage: allPages[ 0 ].name, fetch: appConfig.fetch, debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
    templateFile ( `${tsCode}/config.ts`, 'templates/config.template.ts', { ...params, mockJwt: appConfig.mockJwt !== false, pageMode: JSON.stringify ( allMainPages ( allPages )[ 0 ].modes[ 0 ] ), firstPage: allPages[ 0 ].name, fetch: appConfig.fetch, debug: JSON.stringify ( appConfig.debug ) }, directorySpec, details )
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
      copyFiles ( tsPublic + `/themes/${theme}/icons`, `templates/raw/ts/public/themes/${theme}/icons`, directorySpec )
      ( 'chevron-down.svg', 'close-cross-icon.svg', 'icon-error_medium.svg', 'icon-warning_medium.svg', 'icon-info_medium.svg', 'icon-success_medium.svg' )
    }
    themes.forEach ( copyTheme )
    // templateFile ( `${tsPublic}/index.css`, 'templates/raw/ts/public/index.css', params, directorySpec, details )
    copyFiles ( tsPublic + "/css/focuson", 'templates/raw/ts/public/css/focuson', directorySpec ) ( 'confirm.css', 'datepicker.css', 'debug.css', 'focuson.css', 'notifications.css', 'pages.css', 'storybook.css', 'tags.css', 'primitives.css' )
    copyFiles ( tsPublic + "/icons/focuson", 'templates/raw/ts/public/icons/focuson', directorySpec ) ( 'chevron-down.svg', 'close-cross-icon.svg', 'icon-error_medium.svg', 'icon-warning_medium.svg', 'icon-info_medium.svg', 'icon-success_medium.svg' , 'calendar.svg')

    // templateFile ( `${tsPublic}/confirm.css`, 'templates/raw/ts/public/confirm.css', params, directorySpec, details )
    templateFile ( `${tsPublic}/notifications.css`, 'templates/raw/ts/public/notifications.css', params, directorySpec, details )
    const cssImports = params.cssDirectory && fs.existsSync ( params.cssDirectory ) ? GetFilelistRecursively2 ( params.cssDirectory, 0 )
      .filter ( res => !res.isDir && res.file.endsWith ( '.css' ) )
      .map ( ( { isDir, file } ) => `    <link rel="stylesheet" href="%PUBLIC_URL%/css/${params.teamName}/${file}" type="text/css">` ).join ( "\n" ) : ''
    templateFile ( `${tsPublic}/index.html`, 'templates/raw/ts/public/index.html', { ...params, cssImports }, directorySpec, details )

    if ( fs.existsSync ( 'src/actions.ts' ) )
      copyFile ( tsCode + '/actions.ts', 'src/actions.ts' )
    else
      copyFile ( tsCode + '/actions.ts', 'templates/actions.ts', directorySpec )

    const customCssDirectory = `${tsPublic}/css/${params.teamName}`;
    if ( params.cssDirectory && fs.existsSync ( params.cssDirectory ) )
      CopyFilesRecursively ( params.cssDirectory, customCssDirectory, 0 )
    else
      console.log ( `Not copying css files in cssDirectory [${customCssDirectory}]` )
  };
