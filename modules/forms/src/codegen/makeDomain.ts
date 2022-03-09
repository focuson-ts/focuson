import { AllDataDD, DataD, isDataDd, isPrimDd, isRepeatingDd, OneDataDD } from "../common/dataD";
import { domainName, hasDomainForPage, pageDomainName } from "./names";
import { sortedEntries } from "@focuson/utils";
import { dataDsIn, PageD } from "../common/pageD";
import { TSParams } from "./config";
import { indentList, noExtension } from "./codegen";

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
    '}', '' ]
}
export function makeAllDomainsFor<B> ( ps: PageD<B>[] ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeDomainFor ( dataD ) )
}

export function makeHasDomainsFor<B> ( p: PageD<B> ): string[] {
  if ( p.pageType === 'ModalPage' ) return []
  return [ `export interface ${hasDomainForPage ( p )} {   ${p.name}?: ${pageDomainName ( p )}}`, '' ]
}

export function typeNameFor ( params: TSParams, d: AllDataDD ): string {
  if ( isPrimDd ( d ) ) return d.reactType
  if ( isRepeatingDd ( d ) ) return typeNameFor ( params, d.dataDD ) + "[]"
  return domainName ( d )

}

export function makePageDomainsFor<B> ( params: TSParams, ps: PageD<B>[] ): string[] {
  return [
    ...ps.flatMap ( p => p.pageType === 'ModalPage' ? [] : [
      ...makeHasDomainsFor ( p ),
      `export interface ${pageDomainName ( p )}{`,
      ...indentList ( sortedEntries ( p.domain ).map ( ( [ name, dd ] ) => `${name}?:${typeNameFor ( params, dd.dataDD )};` ) ),
      '}', ''
    ] ) ]
}

