import { sortedEntries } from "@focuson/utils";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { domainName, domainsFileName, fetcherFileName, fetcherName, pageDomainName } from "./names";
import { TSParams } from "./config";
import { addStringToEndOfAllButLast, importsDot, importsDotDot, noExtension } from "./codegen";
import { findIds } from "../common/restD";


export const makeFetcherCode = ( params: TSParams ) => <B> ( p: PageD<B> ) => ( def: RestDefnInPageProperties ): string[] => {
  const pageDomain = noExtension ( params.pageDomainsFile )
  const domain = noExtension ( params.domainsFile )
  const common = noExtension ( params.commonFile )
  let d = def.rest.dataDD;

  const dataType = domainName ( d )
  const targetFromPath = def.targetFromPath;
  const [ ids, resourceIds ] = findIds ( def.rest )

  return [
    `//fetcher type ${def.fetcher}`,
    `export function ${fetcherName ( def )}<S extends  HasSimpleMessages & HasTagHolder & HasPageSelection>(fdLens:Optional<S, ${domain}.${pageDomainName ( p )}>,commonIds: NameAndLens<S>) {`,
    `  return pageAndTagFetcher<S, ${domain}.${pageDomainName ( p )}, ${domain}.${dataType}, SimpleMessage>(`,
    `    ${common}.commonFetch<S,  ${domain}.${dataType}>(),`,
    `     '${p.name}',`,
    `     '${targetFromPath}', fdLens, commonIds, {},${JSON.stringify ( ids )},${JSON.stringify ( resourceIds )},`,
    `      Lenses.identity< ${domain}.${pageDomainName ( p )}> ().focusQuery ( '${targetFromPath}' ),`,
    `     '${def.rest.url}')`,
    '}' ]
};


export function findAllFetchers<B> ( ps: PageD<B>[] ): [ PageD<B>, RestDefnInPageProperties ][] {
  return ps.flatMap ( pd => sortedEntries ( pd.rest ).flatMap ( ( [ name, d ] ) => {
    let x: [ PageD<B>, RestDefnInPageProperties ][] = d.fetcher ? [ [ pd, d ] ] : []
    return x
  } ) )
}

export const makeAllFetchers = <B> ( params: TSParams, ps: PageD<B>[] ): string[] => findAllFetchers ( ps ).flatMap ( ( [ pd, rd ] ) =>
  makeFetcherCode ( params ) ( pd ) ( rd ) );

interface FetcherDataStructureParams {
  stateName: string,
  variableName: string
}

export function makeFetchersImport<B> ( params: TSParams, p: PageD<B> ): string[] {
  return [
    ...importsDotDot ( params.commonFile ),
    `import * as domains from '${domainsFileName ( '..', params, p )}'`,
    `import { HasTagHolder } from "@focuson/template";`,
    `import { HasPageSelection } from "@focuson/pages";`,
    `import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';`,
    `import { pageAndTagFetcher } from "@focuson/focuson";`,
    `import { Optional, Lenses, NameAndLens} from '@focuson/lens';`

  ]
}
export function makeFetcherDataStructureImport<B> ( params: TSParams, pages: PageD<B>[] ): string[] {
  let fetchers = findAllFetchers ( pages );
  const fetcherImports = fetchers.map ( ( [ page, prop ] ) => `import { ${fetcherName ( prop )} } from '${fetcherFileName ( '.', params, page )}';` )
  return [
    ...importsDot ( params.commonFile ),
    ...fetcherImports,
    `import { FetcherTree,  } from "@focuson/fetcher";`,
    `import { HasTagHolder } from "@focuson/template";`,
    `import { HasPageSelection } from "@focuson/pages";`,
    `import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';`,
    `import { pageAndTagFetcher } from "@focuson/focuson";`,
    `import { commonIds, identityL } from './${params.commonFile}';`,
    `import { Optional, Lenses, NameAndLens} from '@focuson/lens';`

  ]
}
export function makeFetchersDataStructure<B> ( params: TSParams, { stateName, variableName }: FetcherDataStructureParams, ps: PageD<B>[] ): string[] {
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
