import { copyFiles, DirectorySpec, templateFile, writeToFile } from "@focuson/files";
import { CombinedParams, TSParams } from "../codegen/config";
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

export const makeTsFiles = ( tsRoot: string, params: TSParams, directorySpec: DirectorySpec ) => <B> ( pages: PageD<B>[] ) => {
  console.log ( "focusOnVersion", params.focusOnVersion )

  const tsScripts = tsRoot + "/scripts"
  const tsCode = tsRoot + "/src"
  const tsStory = tsRoot + "/src/stories"
  const tsStoryBook = tsRoot + "/.storybook"
  const tsPublic = tsRoot + "/public"

  fs.mkdirSync ( `${tsCode}`, { recursive: true } )
  fs.mkdirSync ( `${tsScripts}`, { recursive: true } )
  fs.mkdirSync ( `${tsPublic}`, { recursive: true } )
  fs.mkdirSync ( `${tsStory}`, { recursive: true } )
  fs.mkdirSync ( `${tsStoryBook}`, { recursive: true } )

// This isn't the correct aggregation... need to think about this. Multiple pages can ask for more. I think... we''ll have to refactor the structure
  const rests = unique ( pages.flatMap ( x => sortedEntries ( x.rest ) ).map ( ( x: [ string, RestDefnInPageProperties ] ) => x[ 1 ].rest ), r => r.dataDD.name )


  writeToFile ( `${tsCode}/${params.renderFile}.tsx`, [ ...imports ( params.domainsFile, params.pageDomainsFile, params.emptyFile ), ...createAllReactComponents ( params, transformButtons, pages ) ] )
  writeToFile ( `${tsCode}/${params.pageDomainsFile}.ts`, makePageDomainsFor ( params, pages ) )
  writeToFile ( `${tsCode}/${params.domainsFile}.ts`, makeAllDomainsFor ( pages ) )
  writeToFile ( `${tsCode}/${params.commonFile}.ts`, makeCommon ( params, pages, rests, directorySpec ) )

  writeToFile ( `${tsCode}/${params.fetchersFile}.ts`, [
    ...makeFetchersImport ( params ),
    ...makeAllFetchers ( params, pages ),
    ...makeFetchersDataStructure ( params, { variableName: 'fetchers', stateName: params.stateName }, pages ) ] )
  writeToFile ( `${tsCode}/${params.restsFile}.ts`, makeRests ( params, pages ) )

  console.log ( 1 )
  writeToFile ( `${tsCode}/${params.samplesFile}.ts`, [ ...imports ( params.domainsFile ), ...[ 0, 1, 2 ].flatMap ( i => makeAllSampleVariables ( params, pages, i ) ) ] )
  writeToFile ( `${tsCode}/${params.emptyFile}.ts`, [ ...imports ( params.domainsFile ), ...makeAllEmptyData ( params, pages ) ] )
  writeToFile ( `${tsCode}/${params.pagesFile}.tsx`, makePages ( params, pages ) )
  console.log ( 2 )
  templateFile ( `${tsCode}/${params.pactsFile}.ts`, 'templates/allPacts.ts', { content: makeAllPacts ( params, pages, directorySpec ).join ( "\n" ) }, directorySpec )
  templateFile ( `${tsCode}/index.tsx`, 'templates/index.template.ts', { ...params, firstPage: pages[ 0 ].name }, directorySpec )
  copyFiles ( tsRoot, 'templates/raw/ts', directorySpec ) ( '.env', 'README.md', 'tsconfig.json' )
  templateFile ( `${tsRoot}/package.json`, 'templates/packageTemplate.json', params, directorySpec )
  copyFiles ( tsScripts, 'templates/scripts', directorySpec ) ( 'makePact.sh', 'makeJava.sh', 'makeJvmPact.sh', 'template.java', 'ports' )
  copyFiles ( tsRoot, 'templates/raw', directorySpec ) ( '.gitignore' )
  console.log ( 3 )
  pages.forEach ( p => writeToFile ( `${tsStory}/${storybookFileName ( p )}`, makeOneStory ( params, p ) ) )
  copyFiles ( tsStoryBook, 'templates/raw/ts/stories', directorySpec ) ( 'main.js', 'preview.js', 'preview-head.html' )

  console.log ( 'stories' )

  copyFiles ( tsPublic, 'templates/raw/ts/public', directorySpec ) ( 'favicon.ico', 'index.css', 'index.html', 'logo192.png', 'logo512.png', 'manifest.json', 'robots.txt' )

};