import { copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { TSParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { isMainPage, PageD, RestDefnInPageProperties } from "../common/pageD";
import { createRenderPage } from "../codegen/makeRender";
import { ButtonD, transformButtons } from "../buttons/allButtons";
import { makeAllDomainsFor, makePageDomainsFor } from "../codegen/makeDomain";
import { makeCommon } from "../codegen/makeCommon";
import { makeAllFetchers, makeFetcherDataStructureImport, makeFetchersDataStructure, makeFetchersImport } from "../codegen/makeFetchers";
import { makeRestDetailsPage, makeRests } from "../codegen/makeRests";
import { makeAllEmptyData, makeAllSampleVariables } from "../codegen/makeSample";
import { makePages } from "../codegen/makePages";
import { makeAllPacts } from "../codegen/makePacts";
import { domainsFileName, emptyFileName, fetcherFileName, pactFileName, renderFileName, restFileName, samplesFileName, storybookFileName } from "../codegen/names";
import { makeOneStory } from "../codegen/makeStories";

export const makeTsFiles = ( tsRoot: string, params: TSParams, directorySpec: DirectorySpec ) => <B extends ButtonD> ( pages: PageD<B>[] ) => {
  console.log ( "focusOnVersion", params.focusOnVersion )

  const tsScripts = tsRoot + "/scripts"
  const tsCode = tsRoot + "/src"

  const tsStoryBook = tsRoot + "/.storybook"
  const tsPublic = tsRoot + "/public"

  fs.mkdirSync ( `${tsCode}`, { recursive: true } )
  fs.mkdirSync ( `${tsScripts}`, { recursive: true } )
  fs.mkdirSync ( `${tsPublic}`, { recursive: true } )
  fs.mkdirSync ( `${tsStoryBook}`, { recursive: true } )
  pages.forEach ( p => {
    const tsPage = `${tsCode}/${p.name}`
    fs.mkdirSync ( tsPage, { recursive: true } )

    writeToFile ( renderFileName ( tsCode, params, p ) + ".tsx",
      createRenderPage ( params, transformButtons, p ) )

    if ( isMainPage ( p ) ) {
      writeToFile ( domainsFileName ( tsCode, params, p ) + ".ts", [
        ...makePageDomainsFor ( params, [ p ] ),
        ...makeAllDomainsFor ( [ p ] ) ] )

      writeToFile ( samplesFileName ( tsCode, params, p ) + ".ts", [
        `import * as domains from '${domainsFileName ( '..', params, p )}'`, '',
        ...([ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, [ p ], i ) )) ] )

      writeToFile ( emptyFileName ( tsCode, params, p ) + ".ts", [
        `import * as domains from '${domainsFileName ( '..', params, p )}'`, '',
        ...makeAllEmptyData ( params, [ p ] ) ] )

      writeToFile ( fetcherFileName ( tsCode, params, p ) + ".ts", [
        ...makeFetchersImport ( params, p ),
        ...(makeAllFetchers ( params, [ p ] )) ] )

      writeToFile ( restFileName ( tsCode, params, p ) + ".ts", makeRests ( params, p ) )
      writeToFile ( storybookFileName ( tsCode, params, p ) + '.ts', makeOneStory ( params, p ) )

      if ( Object.keys ( p.rest ).length > 0 )
        templateFile ( pactFileName ( tsCode, params, p ) + ".ts", 'templates/allPacts.ts',
          { content: makeAllPacts ( params, p, directorySpec ).join ( "\n" ) }, directorySpec )
    }


  } )

  writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, [
    ...makeFetcherDataStructureImport ( params, pages ),
    ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, pages ) ] )

  writeToFile ( `${tsCode}/${params.restsFile}.ts`, makeRestDetailsPage ( params, pages ) )
  const rests = unique ( pages.flatMap ( pd => isMainPage ( pd ) ? sortedEntries ( pd.rest ).map ( ( x: [ string, RestDefnInPageProperties ] ) => x[ 1 ].rest ) : [] ), r => r.dataDD.name )

  writeToFile ( `${tsCode}/${params.commonFile}.ts`, makeCommon ( params, pages, rests, directorySpec ) )
  writeToFile ( `${tsCode}/${params.pagesFile}.tsx`, makePages ( params, pages ) )


  templateFile ( `${tsCode}/index.tsx`, 'templates/index.template.ts', { ...params, firstPage: pages[ 0 ].name }, directorySpec )
  copyFiles ( tsRoot, 'templates/raw/ts', directorySpec ) ( '.env', 'README.md', 'tsconfig.json' )
  templateFile ( `${tsRoot}/package.json`, 'templates/packageTemplate.json', params, directorySpec )
  copyFiles ( tsScripts, 'templates/scripts', directorySpec ) ( 'makePact.sh', 'makeJava.sh', 'makeJvmPact.sh', 'template.java', 'ports' )
  copyFiles ( tsRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
  copyFiles ( tsStoryBook, 'templates/raw/ts/stories', directorySpec ) ( 'main.js', 'preview.js', 'preview-head.html' )
  copyFiles ( tsPublic, 'templates/raw/ts/public', directorySpec ) ( 'favicon.ico', 'index.css', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt' )

};