import { allMainPages, PageD } from "../common/pageD";
import { hasDomainForPage } from "./names";
import { addStringToEndOfAllButLast, imports, indentList } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate, DirectorySpec, loadFile } from "@focuson/template";
import * as fs from "fs";
import { isCommonLens, RestD, unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { PageMode } from "@focuson/pages";

export function makeFullState ( params: TSParams, pds: PageD[] ): string[] {
  const hasDomains = addStringToEndOfAllButLast ( ',' ) ( allMainPages ( pds ).map ( d => params.pageDomainsFile + "." + hasDomainForPage ( d ) ) )
  const constant = [ 'HasSimpleMessages', 'HasPageSelection', `Has${params.commonParams}`, 'HasTagHolder', `HasRestCommands`, 'HasFocusOnDebug' ].join ( ',' )
  return [
    `export interface ${params.stateName} extends ${constant},`,
    ...indentList ( hasDomains ), `{}` ]
}

export function makeContext ( params: TSParams ): string[] {
  return [ `export type Context = PageSelectionAndRestCommandsContext<${params.stateName}>`,
    `export const context: Context = defaultPageSelectionAndRestCommandsContext<${params.stateName}> ( pages )` ]
}
export function makeCommon ( params: TSParams, pds: PageD[], rds: RestD[] , directorySpec: DirectorySpec): string[] {
  return [
    `import { HasPageSelection, PageMode ,PageSelectionContext} from '@focuson/pages'`,
    `import { defaultDateFn, HasSimpleMessages, SimpleMessage } from '@focuson/utils';`,
    `import {  OnTagFetchErrorFn } from '@focuson/fetcher';`,
    `import { identityOptics } from '@focuson/lens';`,
    `import { HasTagHolder, NameAndLens } from '@focuson/template';`,
    ` import { HasRestCommands } from '@focuson/rest'`,
    `import { commonTagFetchProps, defaultPageSelectionAndRestCommandsContext, PageSelectionAndRestCommandsContext, HasFocusOnDebug } from '@focuson/focuson';`,
    `import { LensProps } from '@focuson/state';`,
    `import { pages } from "./pages";`,
    ...imports ( params.pageDomainsFile ),
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

export function findAllCommonParams ( rds: RestD[] ): string[] {
  return unique ( rds.flatMap ( rd => sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? lens.commonLens : [] ) ), x => x )
}

export function findAllCommonParamsWithSamples ( rds: RestD[] ): any {
  return Object.fromEntries ( rds.flatMap ( rd => {
    let result: [ string, string ][] = sortedEntries ( rd.params ).flatMap ( ( [ name, lens ] ) => isCommonLens ( lens ) ? [ [ lens.commonLens, lens.testValue ] ] : [] );
    return result
  } ) )
}


export function makeCommonParams ( params: TSParams, rds: RestD[] , directorySpec: DirectorySpec) {
  let commonParams = findAllCommonParams ( rds );
  const commonParamDefns = commonParams.map ( s => s + "?:string;\n" ).join ( "" )
  const commonParamNameAndLens = commonParams.map ( s => `   ${s}: commonIdsL.focusQuery('${s}')` ).join ( ",\n" )
  return applyToTemplate ( loadFile('templates/commonTemplate.ts',directorySpec ).toString (), { ...params, commonParamDefns, commonParamNameAndLens } )

}