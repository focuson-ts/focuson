import { AllDataDD, DataD, isDataDd, isRepeatingDd, OneDataDD } from "../common/dataD";
import { domainForPage, domainName, hasDomainForPage } from "./names";
import { safeArray, sortedEntries } from "@focuson/utils";
import { dataDsIn, PageD } from "../common/pageD";
import { TSParams } from "./config";
import { imports, indentList, noExtension } from "./codegen";

export function domainTypeName ( o: AllDataDD ): string {
  if ( isDataDd ( o ) ) return domainName ( o )
  if ( isRepeatingDd ( o ) ) return domainTypeName ( o.dataDD )
  return o.reactType
}

export function oneDomainLine ( [ name, o ]: [ string, OneDataDD ] ): string {
  const brackets = isRepeatingDd ( o.dataDD ) ? '[]' : ''
  return `  ${name}: ${domainTypeName ( o.dataDD )}${brackets};`
}
export function makeDomainFor ( d: DataD ): string[] {
  return [
    `export interface ${domainName ( d )}{`,
    ...sortedEntries ( d.structure ).map ( oneDomainLine ),
    '}' ]
}
export function makeAllDomainsFor ( ps: PageD[] ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeDomainFor ( dataD ) )
}

export function makeHasDomainsFor ( p: PageD ): string[] {
  if ( p.pageType === 'ModalPage' ) return []
  if ( p.path === undefined || p.path.length > 1 ) throw new Error ( `Don't support multistep paths yet. Page is ${p.name} path is ${JSON.stringify ( p.path )}. le ${safeArray ( p.path ).length}` )
  if ( p.path === undefined || p.path.length == 0 ) throw new Error ( `Don't support zero length paths yet. Page is ${p.name}` )
  return [ `export interface ${hasDomainForPage ( p )} {   ${p.path[ 0 ]}?: ${domainForPage ( p )}}` ]
}
export function makePageDomainsFor ( params: TSParams, ps: PageD[] ): string[] {
  let domain = noExtension ( params.domainsFile );
  return ps.flatMap ( p => p.pageType === 'ModalPage' ? [] : [
    ...imports ( domain ),
    ...makeHasDomainsFor ( p ),
    `export interface ${domainForPage ( p )}{`,
    ...indentList ( sortedEntries ( p.domain ).map ( ( [ name, dd ] ) => `${name} : ${domain}.${domainName ( dd.dataDD )};` ) ),
    '}'
  ] )
}

