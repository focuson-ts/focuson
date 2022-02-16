import { AllDataDD, DataD, isDataDd, isRepeatingDd, OneDataDD } from "../common/dataD";
import { domainName } from "./names";
import { sortedEntries } from "@focuson/utils";
import { rawTypeName } from "./makeGraphQlTypes";
import { dataDsIn, PageD } from "../common/pageD";

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
  return [ `interface ${domainName ( d )}{`,
    ...sortedEntries ( d.structure ).map ( oneDomainLine ),
    '}' ]
}
export function makeAllDomainsFor ( ps: PageD[] ): string[] {
  return sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ name, dataD ] ) => makeDomainFor ( dataD ) )
}
