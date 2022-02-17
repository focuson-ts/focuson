import { safeArray, sortedEntries } from "@focuson/utils";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { domainName, fetcherName, hasDomainForPage, selectedPage } from "./names";
import { CombinedParams, TSParams } from "./config";
import { imports, noExtension } from "./codegen";


export const makeFetcherCode = ( params: CombinedParams ) => ( p: PageD ) => ( def: RestDefnInPageProperties ): string[] => {
  const pageDomain = noExtension ( params.pageDomainsFile )
  const domain = noExtension ( params.domainsFile )
  const common = noExtension ( params.commonFile )
  const paramsString = sortedEntries ( def.rest.params ).flatMap ( ( [ name, params ] ) => "'" + name + "'" ).join ( ", " )
  let d = def.rest.dataDD;
  const dataType = domainName ( d )
  const pageName = selectedPage ( p )
  const targetFromPath = def.targetFromPath;
  return [
    `export function ${fetcherName ( def )}<S extends ${pageDomain}.${hasDomainForPage ( p )}>(getUrlParams:  ${common}.GetUrlParams<S>) {`,
    `  return pageAndTagFetcher<S,  ${domain}.${dataType}, SimpleMessage>(`,
    `    ${common}.commonFetch<S,  ${domain}.${dataType}>(),`,
    `     '${safeArray ( p.path ).join ( '.' )}',`,
    `     '${targetFromPath}',`,
    `     (s) => s.focusOn('${targetFromPath}'),`,
    `     (s) => getUrlParams(s, ${paramsString}),`,
    `     (s) => [ ${params.commonFile}.makeUrl<S>('${def.rest.url})', ${common}.getUrlParams)(s), undefined])`,
    '}' ]

};


export function findAllFetchers ( ps: PageD[] ): [ PageD, RestDefnInPageProperties ][] {
  return ps.flatMap ( pd => sortedEntries ( pd.rest ).flatMap ( ( [ name, d ] ) => {
    let x: [ PageD, RestDefnInPageProperties ][] = d.fetcher ? [ [ pd, d ] ] : []
    return x
  } ) )
}

export const makeAllFetchers = ( params: CombinedParams, ps: PageD[] ): string[] => findAllFetchers ( ps ).flatMap ( ( [ pd, rd ] ) => makeFetcherCode ( params ) ( pd ) ( rd ) );

interface FetcherDataStructureParams {
  stateName: string,
  variableName: string,
  getUrlParamsName: string
}

export function makeFetchersImport ( params: TSParams ): string[] {
  return [
    ...imports ( params.pageDomainsFile, params.domainsFile, params.commonFile ),
    'import { commonTagFetchProps, defaultErrorMessage, pageAndTagFetcher, updateTagsAndMessagesOnError, FetcherTree } from "@focuson/fetcher";',
    `import { SimpleMessage } from "@focuson/pages";` ]
}
export function makeFetchersDataStructure ( params: CombinedParams, { stateName, variableName, getUrlParamsName }: FetcherDataStructureParams, ps: PageD[] ): string[] {
  let fetchers = findAllFetchers ( ps );
  const common = noExtension ( params.commonFile )
  return [
    `export const ${variableName}: FetcherTree<${params.commonFile}.${stateName}> = {`,
    `fetchers: [`,
    ...fetchers.map ( ( [ pd, rd ], i ) => `   ${fetcherName ( rd )}<${common}.${stateName}>(${common}.${getUrlParamsName})${i == fetchers.length - 1 ? '' : ','}` ),
    `],`,
    'children: []}',
  ]

}
