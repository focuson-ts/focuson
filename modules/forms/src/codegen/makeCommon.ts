import { allMainPages, PageD } from "../common/pageD";
import { domainsFileName, hasDomainForPage, pageDomainName } from "./names";
import { addStringToEndOfAllButLast, importsDotDot, indentList } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";
import { isCommonLens, RestD, unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { PageMode } from "@focuson/pages";

export function makeFullState<B, G> ( params: TSParams, pds: PageD<B, G>[] ): string[] {
  const hasDomains = addStringToEndOfAllButLast ( ',' ) ( allMainPages ( pds ).map ( d => hasDomainForPage ( d ) ) )
  const constant = [ 'HasSimpleMessages', 'HasPageSelection', `Has${params.commonParams}`, 'HasTagHolder', `HasRestCommands`, 'HasFocusOnDebug' ].join ( ',' )
  return [
    `export interface ${params.stateName} extends ${constant},`,
    ...indentList ( hasDomains ), `{}` ]
}

export function makeContext ( params: TSParams ): string[] {
  // return [
  //   `export const context: Context = defaultPageSelectionAndRestCommandsContext<${params.stateName}> ( pages )` ]

  return [
    `export type Context = FocusOnContext<${params.stateName}>`,
    `export const context: Context = {`,
    `...defaultPageSelectionAndRestCommandsContext<FState> ( pages ),`,
    `combine: MyCombined`,
    `}` ]

}
export function makeCommon<B, G> ( params: TSParams, pds: PageD<B, G>[], rds: RestD<G>[], directorySpec: DirectorySpec ): string[] {
  const pageDomainsImport: string[] = pds.filter ( p => p.pageType === 'MainPage' ).map ( p => `import { ${hasDomainForPage ( p )} } from '${domainsFileName ( '.', params, p )}';` )
  return [
    `import { HasPageSelection, PageMode ,PageSelectionContext} from '@focuson/pages'`,
    `import { defaultDateFn, HasSimpleMessages, SimpleMessage, NameAnd } from '@focuson/utils';`,
    `import {  OnTagFetchErrorFn } from '@focuson/fetcher';`,
    `import { identityOptics,NameAndLens } from '@focuson/lens';`,
    `import { HasTagHolder } from '@focuson/template';`,
    ` import { HasRestCommands } from '@focuson/rest'`,
    `import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, FocusOnContext, HasFocusOnDebug } from '@focuson/focuson';`,
    `import { LensProps } from '@focuson/state';`,
    `import { pages } from "./pages";`,
    `import { MyCombined } from "./copied/MyCombined";`,
    ...pageDomainsImport,
    ...makeContext ( params ),
    ...makeFullState ( params, pds ),
    ...makeCommonParams ( params, rds, directorySpec ),
    ...makeStateWithSelectedPage ( params, JSON.stringify ( findAllCommonParamsWithSamples ( rds ) ), pds[ 0 ].name ) //TODO this should be slicker and aggregated params for example
  ]
}

export function makeStateWithSelectedPage ( params: TSParams, commonParamsValue: any, pageName?: string, pageMode?: PageMode ): string[] {
  const { stateName, commonParams } = params
  return [
    `export const emptyState: ${params.stateName} = {`,
    `  ${commonParams}: ${commonParamsValue},`,
    `  tags: {},`,
    `  messages: [],`,
    `  pageSelection: [{ pageName: '${pageName}', firstTime: true, pageMode: '${pageMode ? pageMode : 'view'}' }],`,
    ...pageName ? [ `  ${pageName}:{},` ] : [],
    `  restCommands: [],`,
    `    debug: { selectedPageDebug: true, fetcherDebug: true }`,
    `  }`
  ]
}

export function findAllCommonParams<G> ( rds: RestD<G>[] ): string[] {
  return unique ( rds.flatMap ( rd => sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? lens.commonLens : [] ) ), x => x )
}

export function findAllCommonParamsWithSamples<G> ( rds: RestD<G>[] ): any {
  return Object.fromEntries ( rds.flatMap ( rd => {
    let result: [ string, string ][] = sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? [ [ lens.commonLens, lens.testValue ] ] : [] );
    return result
  } ) )
}


export function makeCommonParams<G> ( params: TSParams, rds: RestD<G>[], directorySpec: DirectorySpec ) {
  let commonParams = findAllCommonParams ( rds );
  const commonParamDefns = commonParams.map ( s => s + "?:string;\n" ).join ( "" )
  const commonParamNameAndLens = commonParams.map ( s => `   ${s}: commonIdsL.focusQuery('${s}')` ).join ( ",\n" )
  return applyToTemplate ( loadFile ( 'templates/commonTemplate.ts', directorySpec ).toString (), { ...params, commonParamDefns, commonParamNameAndLens } )

}