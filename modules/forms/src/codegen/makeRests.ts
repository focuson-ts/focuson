import { findIds } from "../common/restD";
import { domainName, pageDomainName, restDetailsName } from "./names";
import { TSParams } from "./config";
import { PageD, RestDefnInPageProperties } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { addStringToEndOfAllButLast, focusQueryFor } from "./codegen";


export const makeRest = <B> ( params: TSParams, p: PageD <B> ) => ( r: RestDefnInPageProperties ): string[] => {
  const [ ids, resourceIds ] = findIds ( r.rest )
  let pageDomain = `${params.pageDomainsFile}.${pageDomainName ( p )}`;
  return [
    `export function ${restDetailsName ( p, r.rest )}<S> ( cd: NameAndLens<S>, dateFn: DateFn  ): OneRestDetails<S, ${params.pageDomainsFile}.${pageDomainName ( p )}, ${params.domainsFile}.${domainName ( r.rest.dataDD )}, SimpleMessage> {`,
    `  const fdd: NameAndLens<${pageDomain}> = {}`,
    `  return {`,
    `    dLens: Lenses.identity<${pageDomain}>()${focusQueryFor ( r.targetFromPath )},`, //    dLens: Lenses.identity <pageDomains.EAccountsSummaryPageDomain> ().focusQuery ( 'tempCreatePlan' ),
    `    cd, fdd,`,
    `    ids: ${JSON.stringify ( ids )},`,
    `    resourceId:  ${JSON.stringify ( resourceIds )},`,
    "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
    `    url: "${r.rest.url}"`,
    `  }`,
    `}`,
    ``,
  ]
};
export function makeRestImports (params: TSParams) {
  return [
    `import { OneRestDetails, RestDetails } from "@focuson/rest"`,
    `import * as pageDomains from "./pageDomains"`,
    `import * as domains from "./domains"`,
    `import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"`,
    `import { Lenses, NameAndLens} from "@focuson/lens"`,
    `import { commonIds, ${params.stateName} } from "./${params.commonFile}";`,
    `` ]
}

export function makeRestDetails <B> ( params: TSParams, ps: PageD <B>[] ): string[] {
  return [
    `export const restDetails: RestDetails<${params.stateName}, SimpleMessage> = {`,
    ...addStringToEndOfAllButLast ( "," ) ( ps.flatMap ( pd => sortedEntries ( pd.rest ).flatMap ( ( [ name, rd ] ) =>
      `   ${restDetailsName ( pd, rd.rest )}: ${restDetailsName ( pd, rd.rest )}(commonIds, defaultDateFn)` ) ) ),
    ``,
    `}`, '' ]
}

export function makeRests <B> ( params: TSParams, ps: PageD <B>[] ): string[] {
  return [ ...makeRestImports (params),
    ...ps.flatMap ( pd => sortedEntries ( pd.rest ).flatMap ( ( [ name, rd ] ) => makeRest ( params, pd ) ( rd ) ) ),
    ...makeRestDetails ( params, ps ) ]
}
