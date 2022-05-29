import { allMainPages, MainPageD, PageD } from "../common/pageD";
import { domainsFileName, hasDomainForPage } from "./names";
import { addStringToEndOfAllButLast, indentList } from "./codegen";
import { TSParams } from "./config";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";
import { AllLensRestParams, CommonLensRestParam, flatMapCommonParams, flatMapParams, isCommonLens, isHeaderLens, RestD } from "../common/restD";
import { NameAnd, sortedEntries, unique } from "@focuson/utils";
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

export function makeCommon<B, G> ( appConfig: AppConfig, params: TSParams, pds: MainPageD<B, G>[], directorySpec: DirectorySpec ): string[] {
  const pageDomainsImport: string[] = pds.filter ( p => p.pageType === 'MainPage' ).map ( p => `import { ${hasDomainForPage ( p )} } from '${domainsFileName ( '.', params, p )}';` )
  let paramsWithSamples = findAllCommonParamsWithSamples ( pds );
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
    ...makeCommonParams ( params, pds, directorySpec ),
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
  page: MainPageD<any, any>;
  restName?: string
  rest?: RestD<any>;
}
const paramToDetails = <B, G> ( page: MainPageD<B, G>, restName?: string, rest?: RestD<G> ) => ( params: NameAnd<AllLensRestParams<any>> ) =>
  sortedEntries ( params ).flatMap<CommonParamsDetails> ( ( [ name, param ] ) => isCommonLens ( param ) ? [ { name, param, page, restName, rest } ] : [] )

export function findAllCommonParamsDetails<B, G> ( pds: MainPageD<B, G>[] ): CommonParamsDetails[] {
  return flatMapParams ( pds, ( page, restName, rest, name, param ) =>
    isCommonLens ( param ) ? [ { name, param, page, rest, restName } ] : isHeaderLens ( param ) ? [ { name, param: { ...param, commonLens: param.header }, page, rest, restName } ] : [] )
  //TODO This is a fix while we work out how to deal with the head parameters differently
}
export const findAllCommonParams = <B, G> ( pds: MainPageD<B, G>[] ) => unique ( flatMapParams ( pds, ( page, restName, rest, name, param ) =>
  isCommonLens ( param ) ? [ name ] : [] ), t => t );

export interface CommonParamError {
  name: string;
  details: string[]
}
export function validateCommonParams ( cs: CommonParamsDetails[] ): CommonParamError[] {
  const summary = ( c: CommonParamsDetails ) => `Test value: ${c.param.testValue}. Types ${c.param.javaParser}+${c.param.javaType}+${c.param.graphQlType}+${c.param.rsSetter}`;
  const names = unique ( cs.map ( c => c.name ), t => t )
  let nameDuplicates = names.flatMap ( name => {
    const withSameName = cs.filter ( c => c.name === name );
    const uniqueOverImportantDetails = unique ( withSameName, summary )
    return uniqueOverImportantDetails.length > 1 ? { name, details: withSameName.map ( c => `${c.page.name}${c.restName ? `.rest[${c.restName}].params[${name}}]` : `.params[${name}]`} => ${summary ( c )}` ) } : [];
  } );
  const nameMismatches: CommonParamError[] = cs.filter ( c => c.name != c.param.commonLens )
    .map ( c => {
      const ref = c.restName ? `.rest[${c.restName}]` : '.commonParams'
      return ({ name: c.name, details: [ `${c.page.name}.${ref} Have common lens with name [${c.name}] which doesn't match the common lens [${c.param.commonLens}]. Currently this will give issues` ] });
    } )
  return [ ...nameDuplicates, ...nameMismatches ]
}
export function findAllCommonParamsWithSamples<B, G> ( pages: MainPageD<B, G>[] ): any {
  const lensAndValue: [ string, any ][] = flatMapCommonParams ( pages, ( p, restName, r, name, c ) =>
    [ [ c.commonLens, c.testValue ] ] )
  const result = unique ( lensAndValue.sort ( ( l, r ) => l[ 0 ].localeCompare ( l[ 0 ] ) ), x => x[ 0 ] )
  return Object.fromEntries ( result )
}

//

export function makeCommonParams<B, G> ( params: TSParams, pages: MainPageD<B, G>[], directorySpec: DirectorySpec ) {
  let commonParams: CommonParamsDetails[] = unique ( findAllCommonParamsDetails ( pages ), t => t.param.commonLens );
  const commonParamDefns = commonParams.map ( s => '  ' + s.param.commonLens + ` ? : ${s.param.typeScriptType};\n` ).join ( "" )
  const commonParamNameAndLens = commonParams.map ( s => `   ${s.name}  :    commonIdsL.focusQuery ( '${s.param.commonLens}' )` ).join ( ",\n" )
  return applyToTemplate ( loadFile ( 'templates/commonTemplate.ts', directorySpec ).toString (), { ...params, commonParamDefns, commonParamNameAndLens } )
}