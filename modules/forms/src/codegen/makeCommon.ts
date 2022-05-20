import { allMainPages, PageD } from "../common/pageD";
import { domainsFileName, hasDomainForPage, pageDomainName } from "./names";
import { addStringToEndOfAllButLast, importsDotDot, indentList } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";
import { AllLensRestParams, CommonLensRestParam, isCommonLens, RestD, unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { PageMode } from "@focuson/pages";
import { AppConfig } from "../appConfig";

export function makeFullState<B, G> ( params: TSParams, pds: PageD<B, G>[] ): string[] {
  const hasDomains = addStringToEndOfAllButLast ( ',' ) ( allMainPages ( pds ).map ( d => hasDomainForPage ( d ) ) )
  const constant = [ 'HasSimpleMessages', 'HasPageSelection', `Has${params.commonParams}`, 'HasTagHolder', `HasRestCommands`, 'HasFocusOnDebug' ].join ( ',' )
  return [
    `export interface ${params.stateName} extends ${constant},`,
    ...indentList ( hasDomains ), `{}` ]
}

export function makeContext ( appConfig: AppConfig, params: TSParams ): string[] {
  // return [
  //   `export const context: Context = defaultPageSelectionAndRestCommandsContext<${params.stateName}> ( pages )` ]

  return [
    `export type Context = FocusOnContext<${params.stateName}>`,
    `export const context: Context = {`,
    `   ...defaultPageSelectionAndRestCommandsContext<FState> ( pages, commonIds),`,
    `   combine: ${appConfig.combine.name}`,
    `}` ]
}

export function makePathToLens ( params: TSParams ): string[] {
  return [ `export const pathToLens: ( s: ${params.stateName} ) => ( path: string ) => Optional<${params.stateName}, any> =`,
    `    fromPathFromRaw ( pageSelectionlens<${params.stateName}> (), pages )` ]
}

export function makeCommon<B, G> ( appConfig: AppConfig, params: TSParams, pds: PageD<B, G>[], rds: RestD<G>[], directorySpec: DirectorySpec ): string[] {
  const pageDomainsImport: string[] = pds.filter ( p => p.pageType === 'MainPage' ).map ( p => `import { ${hasDomainForPage ( p )} } from '${domainsFileName ( '.', params, p )}';` )
  let paramsWithSamples = findAllCommonParamsWithSamples ( pds, rds );
  return [
    `import { fromPathFromRaw, HasPageSelection, PageMode ,PageSelectionContext, pageSelectionlens} from '@focuson/pages'`,
    `import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';`,
    `import {  OnTagFetchErrorFn } from '@focuson/fetcher';`,
    `import { identityOptics,NameAndLens, Optional } from '@focuson/lens';`,
    `import { HasTagHolder } from '@focuson/template';`,
    ` import { HasRestCommands } from '@focuson/rest'`,
    `import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug } from '@focuson/focuson';`,
    `import { LensProps } from '@focuson/state';`,
    `import { pages } from "./pages";`,

    `import { ${appConfig.combine.name} } from "${appConfig.combine.import}";`,
    ...pageDomainsImport,
    '',
    ...makeFullState ( params, pds ),
    ...makeCommonParams ( params, pds, rds, directorySpec ),
    ...makeContext ( appConfig, params ),
    ...makePathToLens ( params ),
    ...makeStateWithSelectedPage ( appConfig, params, JSON.stringify ( paramsWithSamples ), pds[ 0 ].name ) //TODO this should be slicker and aggregated params for example
  ]
}

export function makeStateWithSelectedPage ( appConfig: AppConfig, params: TSParams, commonParamsValue: any, pageName?: string, pageMode?: PageMode ): string[] {
  const { stateName, commonParams } = params
  return [
    `export const emptyState: ${params.stateName} = {`,
    `  ${commonParams}: ${commonParamsValue},`,
    `  tags: {},`,
    `  messages: [],`,
    `  pageSelection: [{ pageName: '${pageName}', firstTime: true, pageMode: '${pageMode ? pageMode : 'view'}' }],`,
    ...pageName ? [ `  ${pageName}:{},` ] : [],
    `  restCommands: [],`,
    `  debug: ${JSON.stringify ( appConfig.debug )}`,
    `  }`
  ]
}

export interface CommonParamsDetails {
  name: string;
  param: CommonLensRestParam<any>;
  page: PageD<any, any>;
  restD: RestD<any>;
}
export function findAllCommonParams<B, G> ( pds: PageD<B, G>[], rds: RestD<G>[] ): string[] {
  let fromRests = rds.flatMap ( rd => sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? [{name, param: lens.commonLens, page}] : [] ) );
  const fromPages = allMainPages ( pds ).flatMap ( p => sortedEntries ( p.commonParams ).map ( ( [ n, l ] ) => l.commonLens ) )
  return unique ( [ ...fromRests, ...fromPages ], x => x ).sort ()
}

export function findAllCommonParamsWithSamples<B, G> ( pages: PageD<B, G>[], rds: RestD<G>[] ): any {
  let fromParams: [ string, string ][] = rds.flatMap ( rd => {
    let result: [ string, string ][] = sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? [ [ lens.commonLens, lens.testValue ] ] : [] );
    return result
  } )
  const fromPages: [ string, string ][] = allMainPages ( pages ).flatMap ( p => sortedEntries ( p.commonParams ).map ( ( [ n, lens ] ) => {
    let result: [ string, string ] = [ lens.commonLens, lens.testValue ];
    return result;
  } ) )

  const result = unique ( [ ...fromParams, ...fromPages ].sort ( ( l, r ) => l[ 0 ].localeCompare ( l[ 1 ] ) ), x => x[ 0 ] )
  return Object.fromEntries ( result )
}

export function makeCommonParams<B, G> ( params: TSParams, pages: PageD<B, G>[], rds: RestD<G>[], directorySpec: DirectorySpec ) {
  let commonParams: string[] = findAllCommonParams ( pages, rds );
  const commonParamDefns = commonParams.map ( s => '  ' + s + `?:string;\n` ).join ( "" )
  const commonParamNameAndLens = commonParams.map ( s => `   ${s}: commonIdsL.focusQuery('${s}')` ).join ( ",\n" )
  return applyToTemplate ( loadFile ( 'templates/commonTemplate.ts', directorySpec ).toString (), { ...params, commonParamDefns, commonParamNameAndLens } )
}