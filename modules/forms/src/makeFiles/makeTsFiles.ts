import { copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { TSParams } from "../codegen/config";
import fs from "fs";
import { unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { hasDomains, PageD, RestDefnInPageProperties } from "../common/pageD";
import { importsDot } from "../codegen/codegen";
import { createRenderPage } from "../codegen/makeRender";
import { transformButtons } from "../buttons/allButtons";
import { makeAllDomainsFor, makePageDomainsFor } from "../codegen/makeDomain";
import { makeCommon } from "../codegen/makeCommon";
import { makeAllFetchers, makeFetcherDataStructureImport, makeFetchersDataStructure, makeFetchersImport } from "../codegen/makeFetchers";
import { makeRestDetailsPage, makeRests } from "../codegen/makeRests";
import { makeAllEmptyData, makeAllSampleVariables } from "../codegen/makeSample";
import { makePages } from "../codegen/makePages";
import { makeAllPacts } from "../codegen/makePacts";
import { storybookFileName } from "../codegen/names";
import { makeOneStory } from "../codegen/makeStories";

export const makeTsFiles = ( tsRoot: string, params: TSParams, directorySpec: DirectorySpec ) => <B> ( pages: PageD<B>[] ) => {
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

    writeToFile ( `${tsPage}/${params.renderFile}.tsx`, createRenderPage ( params, transformButtons, p  ) )

    if ( hasDomains ( p ) ) {
      writeToFile ( `${tsPage}/${params.domainsFile}.ts`, [
        ...makePageDomainsFor ( params, [ p ] ),
        ...makeAllDomainsFor ( [ p ] ) ] )

      writeToFile ( `${tsPage}/${params.samplesFile}.ts`, [
        ...importsDot ( params.domainsFile ),
        ...([ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, [ p ], i ) )) ] )

      writeToFile ( `${tsPage}/${params.emptyFile}.ts`, [
        ...importsDot ( params.domainsFile ),
        ...makeAllEmptyData ( params, [ p ] ) ] )

      writeToFile ( `${tsPage}/${params.fetchersFile}.ts`, [
        ...makeFetchersImport ( params ),
        ...(makeAllFetchers ( params, [ p ] )) ] )

      writeToFile ( `${tsPage}/${params.restsFile}.ts`, makeRests ( params, [ p ] ) )
      writeToFile ( `${tsPage}/${storybookFileName ( p )}`, makeOneStory ( params, p ) )

    }

    if ( Object.keys ( p.rest ).length > 0 ) templateFile ( `${tsPage}/${params.pactsFile}.ts`, 'templates/allPacts.ts', { content: makeAllPacts ( params, [ p ], directorySpec ).join ( "\n" ) }, directorySpec )

  } )

  writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, [
    ...makeFetcherDataStructureImport ( params, pages ),
    ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, pages ) ] )

  writeToFile ( `${tsCode}/${params.restsFile}.ts`, makeRestDetailsPage ( params, pages ) )
  const rests = unique ( pages.flatMap ( x => sortedEntries ( x.rest ) ).map ( ( x: [ string, RestDefnInPageProperties ] ) => x[ 1 ].rest ), r => r.dataDD.name )

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