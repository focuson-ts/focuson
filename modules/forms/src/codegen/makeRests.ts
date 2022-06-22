import { AllLensRestParams, findIds, isRestLens, LensRestParam } from "../common/restD";
import { domainName, domainsFileName, pageDomainName, restDetailsName, restFileName } from "./names";
import { TSParams } from "./config";
import { allRestAndActions, isMainPage, MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { createSimpleMessage, safeObject, SimpleMessage, sortedEntries, testDateFn, unique } from "@focuson/utils";
import { addStringToEndOfAllButLast, indentList, lensFocusQueryFor } from "./codegen";
import { lensFocusQueryWithTildaFromPage } from "./lens";


export const makeRest = <B, G> ( params: TSParams, p: PageD<B, G> ) => ( restName: string, r: RestDefnInPageProperties<G> ): string[] => {
  const [ ids, resourceIds ] = findIds ( r.rest )
  let pageDomain = `${params.domainsFile}.${pageDomainName ( p )}`;

  const locals: [ string, LensRestParam<any> ][] = sortedEntries ( r.rest.params ).flatMap ( ( [ n, l ] ) => isRestLens ( l ) ? [ [ n, l ] ] : [] )
  const fddLens: string[] = locals.map ( ( [ n, l ] ) => `${n}: ${lensFocusQueryFor ( l.lens )}` )
  const compilationException = r.targetFromPath.indexOf ( '#' ) >= 0 ?
    [ `    //This compilation error is because you used a variable name in the target '${r.targetFromPath}'. Currently that is not supported` ] : []
  const states = safeObject ( r.rest.states )
  return [
    `//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs`,
    `export function ${restDetailsName ( p, restName, r.rest )} ( cd: NameAndLens<${params.stateName}>, dateFn: DateFn  ): OneRestDetails<${params.stateName}, ${pageDomain}, ${params.domainsFile}.${domainName ( r.rest.dataDD )}, SimpleMessage> {`,
    `  const pageIdL = Lenses.identity<${pageDomain}>()`,
    `  const fdd: NameAndLens<${pageDomain}> = {` + fddLens.join ( "," ) + "}",
    `  return {`,
    `    fdLens: Lenses.identity<${params.stateName}>().focusQuery('${p.name}'),`,
    ...indentList ( compilationException ),
    `//From ${p.name}.rest[${restName}].targetFromPath (${r.targetFromPath}). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?`,
    `    dLens: ${lensFocusQueryWithTildaFromPage ( `makeRest for page ${p.name}, ${restName}`, params, p, r.targetFromPath )},`,
    `    cd, fdd,`,
    `    ids: ${JSON.stringify ( ids )},`,
    `    resourceId:  ${JSON.stringify ( resourceIds )},`,
    `    extractData: ${params.extractData},`,
    `    messages: extractMessages(dateFn),`,
    // "    messages: ( status: number | undefined, body: any ): SimpleMessage[] => status == undefined ?",
    // "      [ createSimpleMessage ( 'error', `Cannot connect. ${JSON.stringify ( body )}`, testDateFn () ) ] :",
    // "      [ createSimpleMessage ( 'info', `${status}/${JSON.stringify ( body )}`, testDateFn () ) ],",
    // "    messages: ( status: number, body: any ): SimpleMessage[] => [ createSimpleMessage ( 'info', `${status} /${JSON.stringify ( body )}`, dateFn () ) ],",
    `    url: "${r.rest.url}",`,
    `    states : ${JSON.stringify ( states )}`,
    `  }`,
    `}`,
    ``,
  ]
};
export function makeRestImports<B, G> ( params: TSParams, p: PageD<B, G> ) {
  return [
    `import { OneRestDetails } from "@focuson/rest"`,
    `import * as domains from "${domainsFileName ( '..', params, p )}"`,
    `import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage, testDateFn } from "@focuson/utils"`,
    `import { Lenses, NameAndLens} from "@focuson/lens"`,
  `import { extractMessages } from "@focuson/pages";`,
    `` ]
}

export function makeRestDetailsPage<B, G> ( params: TSParams, ps: PageD<B, G>[] ): string[] {
  const imports = [
    `import { RestDetails, OneRestDetails } from "@focuson/rest"`,
    `import { createSimpleMessage, DateFn, defaultDateFn, RestAction, insertBefore, SimpleMessage } from "@focuson/utils"`,
    `import { Lenses, NameAndLens} from "@focuson/lens"`,
    `import { ${params.stateName} , commonIds, identityL} from "./${params.commonFile}";`,
    `` ]
  const imp = unique ( allRestAndActions ( ps ).map ( ( [ pd, name, rd, rad ] ) => `import { ${restDetailsName ( pd, name, rd.rest )} } from '${restFileName ( '.', params, pd )}';` ), x => x );

  return [ ...imports, ...imp, ...makeRestDetails ( params, ps ) ]
}
export function makeRestDetails<B, G> ( params: TSParams, ps: PageD<B, G>[] ): string[] {
  return [
    '',
    // "export function restUrlMutator ( r: RestAction, url: string ): string { return insertBefore ( '?', r === 'list' ? '/list' : '', url )}", '',
    "export function restUrlMutator ( r: RestAction, url: string ): string { return url }", '',
    `export const restDetails: RestDetails<${params.stateName}, SimpleMessage> = {`,
    ...addStringToEndOfAllButLast ( "," ) ( ps.flatMap ( pd => (isMainPage ( pd ) ? sortedEntries ( pd.rest ) : []).flatMap ( ( [ name, rd ] ) =>
      `   ${restDetailsName ( pd, name, rd.rest )}: ${restDetailsName ( pd, name, rd.rest )}(commonIds, defaultDateFn)` ) ) ),
    ``,
    `}`, '' ]
}

export function makeRests<B, G> ( params: TSParams, pd: MainPageD<B, G> ): string[] {
  let rests = sortedEntries ( pd.rest ).flatMap ( ( [ name, rd ] ) => makeRest ( params, pd ) ( name, rd ) );
  let imports = rests.length > 0 ? makeRestImports ( params, pd ) : []
  return [ ...imports, `import { ${params.stateName} } from "../common"`, '', ...rests ]
}
