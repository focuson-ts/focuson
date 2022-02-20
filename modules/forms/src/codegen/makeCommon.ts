import { PageD } from "../common/pageD";
import { hasDomainForPage } from "./names";
import { imports, indentList } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import * as fs from "fs";
import { isCommonLens, makeCommonParamsValueForTest, RestD, unique } from "../common/restD";
import { sortedEntries } from "@focuson/utils";
import { Tags } from "@focuson/fetcher";

export function makeFullState ( params: TSParams, pd: PageD[] ): string[] {
  const hasDomains = pd.filter ( x => x.pageType === 'MainPage' ).map ( d => params.pageDomainsFile + "." + hasDomainForPage ( d ) ).join ( ',\n' ).split ( "\n" )
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
    ...makeStateWithSelectedPage ( params, JSON.stringify ( makeCommonParamsValueForTest ( rds[ 0 ] ) ), pds[ 0 ].path.join('.') ) //TODO this should be slicker and aggregated params for example
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

export function makeCommonParams ( params: TSParams, rds: RestD[] ) {
  const commonParamDefns = findAllCommonParams ( rds ).map ( s => s + "?:string;\n" ).join ( "" )
  return applyToTemplate ( fs.readFileSync ( 'templates/commonTemplate.ts' ).toString (), { ...params, commonParamDefns } )

}