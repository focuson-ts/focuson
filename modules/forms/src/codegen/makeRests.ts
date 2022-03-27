import { findIds, isRestLens, LensRestParam, unique } from "../common/restD";
import { domainName, domainsFileName, pageDomainName, restDetailsName, restFileName } from "./names";
import { TSParams } from "./config";
import { allRestAndActions, isMainPage, MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { addStringToEndOfAllButLast, lensFocusQueryFor, stateFocusQueryForRepl } from "./codegen";
import { parsePath, stateCodeBuilder } from "@focuson/lens";
import { lensFocusQueryWithSlashAndTildaFromIdentity, lensFocusQueryWithTildaFromPage } from "./lens";


export const makeRest = <B, G> ( params: TSParams, p: PageD<B, G> ) => ( restName: string, r: RestDefnInPageProperties<G> ): string[] => {
  const [ ids, resourceIds ] = findIds ( r.rest )
  let pageDomain = `${params.domainsFile}.${pageDomainName ( p )}`;
  const locals: [ string, LensRestParam ][] = sortedEntries ( r.rest.params ).flatMap ( ( [ n, l ] ) => isRestLens ( l ) ? [ [ n, l ] ] : [] )
  const fddLens: string[] = locals.map ( ( [ n, l ] ) => `${n}: Lenses.identity< ${pageDomain}>()${lensFocusQueryFor ( l.lens )}` )
  return [
    `export function ${restDetailsName ( p, restName, r.rest )} ( cd: NameAndLens<${params.stateName}>, dateFn: DateFn  ): OneRestDetails<${params.stateName}, ${pageDomain}, ${params.domainsFile}.${domainName ( r.rest.dataDD )}, SimpleMessage> {`,
    `  const fdd: NameAndLens<${pageDomain}> = {` + fddLens.join ( "," ) + "}",
    `  return {`,
    `    fdLens: Lenses.identity<${params.stateName}>().focusQuery('${p.name}'),`,
    `    dLens: ${lensFocusQueryWithTildaFromPage ( `makeRest for page ${p.name}, ${restName}`, params, p, r.targetFromPath )},`,
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
export function makeRestImports<B, G> ( params: TSParams, p: PageD<B, G> ) {
  return [
    `import { OneRestDetails } from "@focuson/rest"`,
    `import * as domains from "${domainsFileName ( '..', params, p )}"`,
    `import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"`,
    `import { Lenses, NameAndLens} from "@focuson/lens"`,
    `` ]
}

export function makeRestDetailsPage<B, G> ( params: TSParams, ps: PageD<B, G>[] ): string[] {
  const imports = [
    `import { RestDetails, OneRestDetails } from "@focuson/rest"`,
    `import { createSimpleMessage, DateFn, defaultDateFn, SimpleMessage } from "@focuson/utils"`,
    `import { Lenses, NameAndLens} from "@focuson/lens"`,
    `import { ${params.stateName} , commonIds} from "./${params.commonFile}";`,
    `` ]
  const imp = unique ( allRestAndActions ( ps ).map ( ( [ pd, name, rd, rad ] ) => `import { ${restDetailsName ( pd, name, rd.rest )} } from '${restFileName ( '.', params, pd )}';` ), x => x );

  return [ ...imports, ...imp, ...makeRestDetails ( params, ps ) ]
}
export function makeRestDetails<B, G> ( params: TSParams, ps: PageD<B, G>[] ): string[] {
  return [
    `export const restDetails: RestDetails<${params.stateName}, SimpleMessage> = {`,
    ...addStringToEndOfAllButLast ( "," ) ( ps.flatMap ( pd => (isMainPage ( pd ) ? sortedEntries ( pd.rest ) : []).flatMap ( ( [ name, rd ] ) =>
      `   ${restDetailsName ( pd, name, rd.rest )}: ${restDetailsName ( pd, name, rd.rest )}(commonIds, defaultDateFn)` ) ) ),
    ``,
    `}`, '' ]
}

export function makeRests<B, G> ( params: TSParams, pd: MainPageD<B, G> ): string[] {
  let rests = sortedEntries ( pd.rest ).flatMap ( ( [ name, rd ] ) => makeRest ( params, pd ) ( name, rd ) );
  let imports = rests.length > 0 ? makeRestImports ( params, pd ) : []
  return [ ...imports, `import { ${params.stateName} } from "../common"`, ...rests ]
}
