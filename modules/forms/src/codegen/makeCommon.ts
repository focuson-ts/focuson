import { allMainPages, PageD } from "../common/pageD";
import { hasDomainForPage } from "./names";
import { addStringToEndOfAllButLast, imports, indentList } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import * as fs from "fs";
import { isCommonLens, RestD, unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";

export function makeFullState ( params: TSParams, pds: PageD[] ): string[] {
  const hasDomains = addStringToEndOfAllButLast ( ',' ) ( allMainPages ( pds ).map ( d => params.pageDomainsFile + "." + hasDomainForPage ( d ) ) )
  const constant = [ 'HasSimpleMessages', 'HasPageSelection', `Has${params.commonParams}`, 'HasTagHolder', 'HasSelectedModalPage', `HasPostCommand<FState,any>`, 'HasFocusOnDebug' ].join ( ',' )
  return [
    `export interface ${params.stateName} extends ${constant},`,
    ...indentList ( hasDomains ), `{}` ]
}
export function makeCommon ( params: TSParams, pds: PageD[], rds: RestD[] ): string[] {

  return [
    `import { HasPageSelection, HasSelectedModalPage, HasSimpleMessages, SimpleMessage } from '@focuson/pages'`,
    `import { defaultDateFn } from '@focuson/utils';`,
    `import { commonTagFetchProps, HasTagHolder, OnTagFetchErrorFn } from '@focuson/fetcher';`,
    `import { Lenses } from '@focuson/lens';`,
    `import { tagOps } from '@focuson/template';`,
    `import { HasPostCommand } from '@focuson/poster';`,
    `import { HasFocusOnDebug } from '@focuson/focuson';`,
    ...imports ( params.pageDomainsFile ),
    ...makeFullState ( params, pds ),
    ...makeCommonParams ( params, rds ),
    ...makeStateWithSelectedPage ( params, JSON.stringify ( findAllCommonParamsWithSamples ( rds ) ), pds[ 0 ].name ) //TODO this should be slicker and aggregated params for example
  ]
}

export function makeStateWithSelectedPage ( params: TSParams, commonParamsValue: any, pageName?: string ): string[] {
  const { stateName, commonParams } = params
  return [
    `export const emptyState: ${params.stateName} = {`,
    `  ${commonParams}: ${commonParamsValue},`,
    `  tags: {},`,
    `  messages: [],`,
    `  pageSelection: { pageName: '${pageName}' },`,
    ...pageName ? [ `  ${pageName}:{},` ] : [],
    `  postCommands: [],`,
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


export function makeCommonParams ( params: TSParams, rds: RestD[] ) {
  const commonParamDefns = findAllCommonParams ( rds ).map ( s => s + "?:string;\n" ).join ( "" )
  return applyToTemplate ( fs.readFileSync ( 'templates/commonTemplate.ts' ).toString (), { ...params, commonParamDefns } )

}