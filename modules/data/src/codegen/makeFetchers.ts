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
    `export function optOutFetcher<S>(getUrlParams: GetUrlParams<S>) {`,
    `  return stateAndFromApiTagFetcherForModal<S, ${hasDomain ( d )}, ${dataType}, '${pageName}'>(`,
    `    commonFetch<S, ${hasDomain ( d )}>(),`,
    `     '${pageName}',`,
    `     '${targetFromPath}',`,
    `     (s) => (s.focusOn('${targetFromPath}'),`,
    `     (s) => getUrlParams(s, ${paramsString}),`,
    `     (s) => [makeUrl<S>('${def.rest.url})',getUrlParams)(s), undefined]))`,
    '}' ]

};

export const makeFetcher = ( p: PageD ) => ( [ name, def ]: [ string, RestDefnInPageProperties ] ): string[] =>
  def.fetcher ? makeFetcherCode ( p ) ( def ) : [];


export function makeAllFetchers ( ps: PageD[] ): string[] {
  return ps.flatMap ( pd => sortedEntries ( pd.rest ).flatMap ( makeFetcher ( pd ) ) )
}