import { sortedEntries } from "@focuson/utils";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { domainName, fetcherName, pageDomainName } from "./names";
import { CombinedParams, TSParams } from "./config";
import { addStringToEndOfAllButLast, imports, noExtension } from "./codegen";
import { findIds } from "../common/restD";


export const makeFetcherCode = ( params: CombinedParams ) => ( p: PageD ) => ( def: RestDefnInPageProperties ): string[] => {
  const pageDomain = noExtension ( params.pageDomainsFile )
  const domain = noExtension ( params.domainsFile )
  const common = noExtension ( params.commonFile )
  let d = def.rest.dataDD;

  const dataType = domainName ( d )
  const targetFromPath = def.targetFromPath;
  const [ ids, resourceIds ] = findIds ( def.rest )

  return [
    `//fetcher type ${def.fetcher}`,
    `export function ${fetcherName ( def )}<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, ${pageDomain}.${pageDomainName ( p )}>,commonIds: NameAndLens<S>) {`,
    `  return pageAndTagFetcher<S, ${pageDomain}.${pageDomainName ( p )}, ${domain}.${dataType}, SimpleMessage>(`,
    `    ${common}.commonFetch<S,  ${domain}.${dataType}>(),`,
    `     '${p.name}',`,
    `     '${targetFromPath}', fdLens, commonIds, {},${JSON.stringify ( ids )},${JSON.stringify ( resourceIds )},`,
    `      Lenses.identity< ${pageDomain}.${pageDomainName ( p )}> ().focusQuery ( '${targetFromPath}' ),`,
    `     '${def.rest.url}')`,

    //
    // `     (s) => s.focusQuery('${targetFromPath}'),`,
    // `     tagOps.tags(${paramsString}),`,
    // `     tagOps.getReqFor('${def.rest.url}',undefined,${paramsString}))`,
    '}' ]

  // export function EAccountsSummaryDDFetcher<S extends HasSimpleMessages & HasTagHolder & HasPageSelection & pageDomains.HasEAccountsSummaryPageDomain> ( fdLens: Optional<S, pageDomains.EAccountsSummaryPageDomain>, commonIds: NameAndLens<S> ) {
  //   return pageAndTagFetcher<S, pageDomains.EAccountsSummaryPageDomain, domains.EAccountsSummaryDDDomain, SimpleMessage> (
  //     common.commonFetch<S, domains.EAccountsSummaryDDDomain> (),
  //     'EAccountsSummary', 'fromApi', fdLens, commonIds, {}, [ 'customerId' ], [ 'accountId' ],
  //     ( s ) => s.focusQuery ( 'fromApi' ),
  //     '/api/accountsSummary?{query}' )
  // }


};


export function findAllFetchers ( ps: PageD[] ): [ PageD, RestDefnInPageProperties ][] {
  return ps.flatMap ( pd => sortedEntries ( pd.rest ).flatMap ( ( [ name, d ] ) => {
    let x: [ PageD, RestDefnInPageProperties ][] = d.fetcher ? [ [ pd, d ] ] : []
    return x
  } ) )
}

export const makeAllFetchers = ( params: CombinedParams, ps: PageD[] ): string[] => findAllFetchers ( ps ).flatMap ( ( [ pd, rd ] ) =>
  makeFetcherCode ( params ) ( pd ) ( rd ) );

interface FetcherDataStructureParams {
  stateName: string,
  variableName: string
}

export function makeFetchersImport ( params: TSParams ): string[] {
  return [
    ...imports ( params.pageDomainsFile, params.domainsFile, params.commonFile ),
    `import { FetcherTree,  } from "@focuson/fetcher";`,
    `import { HasTagHolder, NameAndLens } from "@focuson/template";`,
    `import { HasPageSelection } from "@focuson/pages";`,
    `import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';`,
    `import { pageAndTagFetcher } from "@focuson/focuson";`,
    `import { commonIds, identityL } from './${params.commonFile}';`,
    `import { Optional, Lenses } from '@focuson/lens';`

  ]
}
export function makeFetchersDataStructure ( params: CombinedParams, { stateName, variableName }: FetcherDataStructureParams, ps: PageD[] ): string[] {
  let fetchers = findAllFetchers ( ps );
  const common = noExtension ( params.commonFile )
  return [
    `export const ${variableName}: FetcherTree<${params.commonFile}.${stateName}> = {`,
    `fetchers: [`,
    ...addStringToEndOfAllButLast ( ',' ) ( fetchers.map ( ( [ pd, rd ], i ) =>
      `    ${fetcherName ( rd )}<${params.commonFile}.${stateName}> ( identityL.focusQuery ( '${pd.name}' ), commonIds )` ) ),
    `],`,
    'children: []}',
  ]

}
