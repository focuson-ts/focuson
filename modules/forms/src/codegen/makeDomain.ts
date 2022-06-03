import { AllDataDD, DataD, isDataDd, isPrimDd, isRepeatingDd, OneDataDD, RepeatingDataD } from "../common/dataD";
import { domainName, hasDomainForPage, pageDomainName } from "./names";
import { sortedEntries } from "@focuson/utils";
import { allMainPages, dataDsIn, isModalPage, PageD } from "../common/pageD";
import { TSParams } from "./config";
import { indentList } from "./codegen";

export function domainTypeName<G> ( o: AllDataDD<G> ): string {
  if ( isDataDd ( o ) ) return domainName ( o )
  if ( isRepeatingDd ( o ) ) return domainTypeName ( o.dataDD )
  return o.reactType
}

export function oneDomainLine<G> ( [ name, o ]: [ string, OneDataDD<G> ] ): string {
  const brackets = isRepeatingDd ( o.dataDD ) ? '[]' : ''
  const questionMark = isPrimDd ( o.dataDD ) && o.dataDD.allowUndefined ? '?' : ''
  return `  ${name}${questionMark}: ${domainTypeName ( o.dataDD )}${brackets};`
}
export function makeDomainForDataD<G> ( d: DataD<G> ): string[] {
  return [
    `export interface ${domainName ( d )}{`,
    ...sortedEntries ( d.structure ).map ( oneDomainLine ),
    '}', '' ]
}
export function makeDomainForRepD<G> ( d: RepeatingDataD<G> ): string[] {
  return [
    `export type ${domainName ( d )} = ${domainName ( d.dataDD )}[]`, '' ]
}
export function makeAllDomainsFor<B, G> ( ps: PageD<B, G>[] ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => {
    if ( isDataDd ( dataD ) ) return makeDomainForDataD ( dataD );
    if ( isRepeatingDd ( dataD ) ) return makeDomainForRepD ( dataD )
    throw new Error ( `Don't know how to make domain for ${dataD}` )
  } )
}

export function makeHasDomainsFor<B, G> ( p: PageD<B, G> ): string[] {
  if ( p.pageType === 'ModalPage' ) return []
  return [ `export interface ${hasDomainForPage ( p )} {   ${p.name}?: ${pageDomainName ( p )}}`, '' ]
}

export function typeNameFor<G> ( params: TSParams, d: AllDataDD<G> ): string {
  if ( isPrimDd ( d ) ) return d.reactType
  if ( isRepeatingDd ( d ) ) return typeNameFor ( params, d.dataDD ) + "[]"
  return domainName ( d )

}

export function makePageDomainsFor<B, G> ( params: TSParams, ps: PageD<B, G>[] ): string[] {
  return [
    ...allMainPages ( ps ).flatMap ( p => [
      ...makeHasDomainsFor ( p ),
      `export interface ${pageDomainName ( p )}{`,
      ...indentList ( sortedEntries ( p.domain ).map ( ( [ name, dd ] ) => `${name}?:${typeNameFor ( params, dd.dataDD )};` ) ),
      '}', ''
    ] ) ]
}

