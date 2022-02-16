import { sortedEntries } from "@focuson/utils";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { domainName, fetcherName, hasDomain, pageComponentName, selectedPage } from "./names";


export const makeFetcherCode = ( p: PageD ) => ( def: RestDefnInPageProperties ): string[] => {
  const paramsString = sortedEntries ( def.rest.params ).flatMap ( ( [ name, params ] ) => "'" + name + "'" ).join ( ", " )
  let d = def.rest.dataDD;
  const dataType = domainName ( d )
  const pageName = selectedPage ( p )
  const targetFromPath = def.targetFromPath;
  return [
    `export function ${fetcherName(def)}<S>(getUrlParams: GetUrlParams<S>) {`,
    `  return stateAndFromApiTagFetcher<S, ${hasDomain ( d )}, ${dataType}, '${pageName}'>(`,
    `    commonFetch<S, ${hasDomain ( d )}>(),`,
    `     '${pageName}',`,
    `     '${targetFromPath}',`,
    `     (s) => (s.focusOn('${targetFromPath}'),`,
    `     (s) => getUrlParams(s, ${paramsString}),`,
    `     (s) => [makeUrl<S>('${def.rest.url})',getUrlParams)(s), undefined]))`,
    '}' ]

};


export function findAllFetchers ( ps: PageD[] ): [ PageD, RestDefnInPageProperties ][] {
  return ps.flatMap ( pd => sortedEntries ( pd.rest ).flatMap ( ( [ name, d ] ) => {
    let x: [ PageD, RestDefnInPageProperties ][] = d.fetcher ? [ [ pd, d ] ] : []
    return x
  } ) )
}

export const makeAllFetchers = ( ps: PageD[] ): string[] => findAllFetchers ( ps ).flatMap ( ( [ pd, rd ] ) => makeFetcherCode ( pd ) ( rd ) );

interface FetcherDataStructureParams {
  stateName: string,
  variableName: string,
  getUrlParamsName: string
}
export function makeFetchersDataStructure ( { stateName, variableName,getUrlParamsName }: FetcherDataStructureParams, ps: PageD[] ): string[] {
  let fetchers = findAllFetchers ( ps );
  return [
    `export const ${variableName}: FetcherTree<${stateName}> = {`,
    `fetchers: [`,
    ...fetchers.map ( ( [ pd, rd ], i ) => `   ${fetcherName ( rd )}<${stateName}>(${getUrlParamsName})${i == fetchers.length - 1 ? '' : ','}` ),
    `]}`
  ]

}
