import { sortedEntries } from "@focuson/utils";
import { isMainPage, MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { domainName, domainsFileName, fetcherFileName, fetcherName, pageDomainName, restDetailsName } from "./names";
import { TSParams } from "./config";
import { addStringToEndOfAllButLast, importsDot, importsDotDot, lensFocusQueryFor, noExtension } from "./codegen";
import { findIds, isRestLens, LensRestParam } from "../common/restD";
import { lensFocusQueryWithSlashAndTildaFromIdentity, lensFocusQueryWithTildaFromPage } from "./lens";


export const makeFetcherCode = ( params: TSParams ) => <B, G> ( p: PageD<B, G> ) => ( restName: string, def: RestDefnInPageProperties<G> ): string[] => {
  const pageDomain = noExtension ( params.pageDomainsFile )
  const domain = noExtension ( params.domainsFile )
  const common = noExtension ( params.commonFile )
  let d = def.rest.dataDD;

  const dataType = domainName ( d )
  const targetFromPath = def.targetFromPath;
  const [ ids, resourceIds ] = findIds ( def.rest )
  const locals: [ string, LensRestParam<any> ][] = sortedEntries ( def.rest.params ).flatMap ( ( [ n, l ] ) => isRestLens ( l ) ? [ [ n, l ] ] : [] )
  const localLens: string[] = locals.map ( ( [ n, l ] ) => `${n}: ${lensFocusQueryFor ( l.lens )}` )
  const lensVariableString = [
    `//If you have a compilation here it might be because of the 'local' params in ${p.name}.rest[${restName}].params`,
    `  const localIds = {` + localLens.join ( "," ) + "}" ]
  return [
    `//fetcher type ${def.fetcher}`,
    `export function ${fetcherName ( def )}(fdLens:Optional<${params.stateName}, ${domain}.${pageDomainName ( p )}>,commonIds: NameAndLens<${params.stateName}>) {`,
    `  const pageIdL = Lenses.identity< ${domain}.${pageDomainName ( p )}>()`,
    ...lensVariableString,
    `  return pageAndTagFetcher<${params.stateName}, ${domain}.${pageDomainName ( p )}, ${domain}.${dataType}, SimpleMessage>(`,
    `    ${common}.commonFetch<${params.stateName},  ${domain}.${dataType}>(),`,
    `     '${p.name}',`,
    `     '${targetFromPath}', fdLens, commonIds, localIds,${JSON.stringify ( ids )},${JSON.stringify ( resourceIds )},`,
    `      //From ${p.name}.rest[${restName}].targetFromPath ${targetFromPath} Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?`,
    `      ${lensFocusQueryWithTildaFromPage ( `Error making fetcher ${p.name} ${restName}. Target is '${targetFromPath}'. Do you need to start the path with a ~?`, params, p, targetFromPath )},`,
    `     '${def.rest.url}')`,
    '}' ]
};


export function findAllFetchers<B, G> ( ps: PageD<B, G>[] ): [ PageD<B, G>, string, RestDefnInPageProperties<G> ][] {
  return ps.flatMap ( pd => (isMainPage ( pd ) ? sortedEntries ( pd.rest ) : []).flatMap ( ( [ name, d ] ) => {
    let x: [ PageD<B, G>, string, RestDefnInPageProperties<G> ][] = d.fetcher ? [ [ pd, name, d ] ] : []
    return x
  } ) )
}

export const makeAllFetchers = <B, G> ( params: TSParams, ps: PageD<B, G>[] ): string[] => findAllFetchers ( ps ).flatMap ( ( [ pd, restName, rd ] ) =>
  makeFetcherCode ( params ) ( pd ) ( restName, rd ) );

interface FetcherDataStructureParams {
  stateName: string,
  variableName: string
}

export function makeFetchersImport<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  return [
    ...importsDotDot ( params.commonFile ),
    `import * as domains from '${domainsFileName ( '..', params, p )}'`,
    `import { HasTagHolder } from "@focuson/template";`,
    `import { HasPageSelection } from "@focuson/pages";`,
    `import { HasSimpleMessages, SimpleMessage } from '@focuson/utils';`,
    `import { pageAndTagFetcher } from "@focuson/focuson";`,
    `import { ${params.stateName}, identityL} from "../${params.commonFile}";`,
    `import { Optional, Lenses, NameAndLens} from '@focuson/lens';`

  ]
}
export function makeFetcherDataStructureImport<B, G> ( params: TSParams, pages: PageD<B, G>[] ): string[] {
  let fetchers = findAllFetchers ( pages );
  const fetcherImports = fetchers.map ( ( [ page, restName, prop ] ) => `import { ${fetcherName ( prop )} } from '${fetcherFileName ( '.', params, page )}';` )
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
export function makeFetchersDataStructure<B, G> ( params: TSParams, { stateName, variableName }: FetcherDataStructureParams, ps: PageD<B, G>[] ): string[] {
  let fetchers = findAllFetchers ( ps );
  const common = noExtension ( params.commonFile )
  return [
    `export const ${variableName}: FetcherTree<${params.commonFile}.${stateName}> = {`,
    `fetchers: [`,
    ...addStringToEndOfAllButLast ( ',' ) ( fetchers.map ( ( [ pd, restName, rd ], i ) =>
      `    ${fetcherName ( rd )}( identityL.focusQuery ( '${pd.name}' ), commonIds )` ) ),
    `],`,
    'children: []}',
  ]

}


export function makeNewFetchersDataStructure<B, G> ( params: TSParams, ps: MainPageD<B, G>[] ) {
  const obj = Object.fromEntries ( ps.map ( p =>
    [ p.name, sortedEntries ( p.rest ).filter ( t => t[ 1 ].fetcher ).map ( ( [ restName, rdp ] ) => ({ tagName: rdp.targetFromPath, restName: restDetailsName ( p, restName, rdp.rest ) }) ) ] )
  )
  return (`export const newFetchers = ` + JSON.stringify ( obj, null, 2 )).split ( "\n" )
}