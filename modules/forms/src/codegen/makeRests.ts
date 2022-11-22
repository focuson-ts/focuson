import { AllLensRestParams, findIds, isCommonLens, isRestLens, LensRestParam, RestStateDetails } from "../common/restD";
import { domainName, domainsFileName, pageDomainName, restDetailsName, restFileName } from "./names";
import { TSParams } from "./config";
import { allRestAndActions, RefD, RestDefnInPageProperties } from "../common/pageD";
import { NameAnd, safeObject, SimpleMessage, sortedEntries, toArray, unique } from "@focuson/utils";
import { addStringToEndOfAllButLast, indentList, lensFocusQueryFor } from "./codegen";
import { lensFocusQueryWithSlashAndTildaFromIdentity, lensFocusQueryWithTildaFromPage } from "./lens";

const makeStates = <G> ( errorPrefix: string, tsparams: TSParams, p: RefD<G> ) => ( s: NameAnd<RestStateDetails> ): string[] =>
  Object.entries ( safeObject ( s ) ).map ( ( [ name, { url, params, bodyFrom } ] ) =>
    `${name}: {url: ${JSON.stringify ( url )},params: ${JSON.stringify ( Object.keys ( safeObject ( params ) ) )}${
      bodyFrom ?
        `, bodyFrom: ${lensFocusQueryWithSlashAndTildaFromIdentity ( errorPrefix, tsparams, p, bodyFrom )}` :
        ''
    }}` )
//[ name, { url: JSON.stringify(url), params: JSON.stringify(params), bodyFrom: bodyFrom ? lensFocusQueryWithSlashAndTildaFromIdentity ( errorPrefix, tsparams, p, bodyFrom ) : undefined } ] ) );

export const makeRest = <G> ( params: TSParams, p: RefD<G> ) => ( restName: string, r: RestDefnInPageProperties<G> ): string[] => {
  const [ ids, resourceIds ] = findIds ( r.rest )
  let pageDomain = `${params.domainsFile}.${pageDomainName ( p )}`;

  const paramsFromState: [ string, AllLensRestParams<any> ][] = sortedEntries ( r.rest.states ).flatMap ( ( [ name, state ] ) => sortedEntries ( state.params ) )
  const paramsFromRest: [ string, AllLensRestParams<any> ][] = sortedEntries ( r.rest.params )
  const allParams: [ string, AllLensRestParams<any> ][] = [ ...paramsFromRest, ...paramsFromState ]
  const locals: [ string, LensRestParam<any> ][] = unique ( allParams.flatMap ( ( [ n, l ] ) => isRestLens ( l ) ? [ [ n, l ] ] : [] ), t => t[ 0 ] + t[ 1 ] )
  const fddLens: string[] = locals.map ( ( [ n, l ] ) => `${n}: ${lensFocusQueryFor ( l.lens )}` )
  const compilationException = r.targetFromPath.indexOf ( '#' ) >= 0 ?
    [ `    //This compilation error is because you used a variable name in the target '${r.targetFromPath}'. Currently that is not supported` ] : []
  const states = safeObject ( r.rest.states )
  const errorPrefix = `${p.name}.rest[${restName}]`;
  const jwtIds =allParams.filter(([name, p]) => isCommonLens(p) && p.inJwtToken).map(([name,f]) =>name)
  const canBeUndefinedIds =allParams.filter(([name, p]) => p.allowUndefined).map(([name,f]) =>name)
  return [
    `//If you have a compilation error because of duplicate names, you need to give a 'namePrefix' to the offending restDs`,
    `export function ${restDetailsName ( p, restName, r.rest )} ( cd: NameAndLens<${params.stateName}>, dateFn: DateFn  ): OneRestDetails<${params.stateName}, ${pageDomain}, ${params.domainsFile}.${domainName ( r.rest.dataDD )}, SimpleMessage> {`,
    `  const pageIdL = Lenses.identity<${pageDomain}>()`,
    ` //If you get a compilation here with duplicate names is it because you have the same parameter in rest.params, or in the state params with the same name and different paths?`,
    `  const fdd: NameAndLens<${pageDomain}> = {` + fddLens.join ( "," ) + "}",
    `  return {`,
    `    fdLens: Lenses.identity<${params.stateName}>().focusQuery('${p.name}'),`,
    ...indentList ( compilationException ),
    `//From ${errorPrefix}.targetFromPath (${r.targetFromPath}). Does the path exist? Is the 'type' at the end of the path, the type that rest is fetching?`,
    `    dLens: ${lensFocusQueryWithTildaFromPage ( `makeRest for page ${p.name}, ${restName}`, params, p, r.targetFromPath )},`,
    `    cd, fdd,`,
    `    ids: ${JSON.stringify ( ids )},`,
    `    jwtIds:${JSON.stringify(jwtIds)},`,
    `    resourceId:  ${JSON.stringify ( resourceIds )},`,
    `    canBeUndefinedIds: ${JSON.stringify ( canBeUndefinedIds )},`,
    `    extractData: ${params.extractData},`,
    `    messages: extractMessages(dateFn),`,
    `    url: "${r.rest.url}",`,
    `    states : {`,
    ...indentList ( indentList ( indentList ( addStringToEndOfAllButLast ( "," ) ( makeStates ( errorPrefix, params, p ) ( states ) ) ) ) ),
    '    },',
    `    messagePostProcessors: justInfoToSuccessMessagesPostProcessor (),`,
    `    postProcessors:${JSON.stringify(toArray(r.rest.postProcessMessages))}`,
    `  }`,
    `}`,
    ``,
  ]
};
export function makeRestImports<G> ( params: TSParams, p: RefD<G> ) {
  return [
    `import { OneRestDetails, justInfoToSuccessMessagesPostProcessor } from "@focuson/rest"`,
    `import * as domains from "${domainsFileName ( '..', params, p )}"`,
    `import { createSimpleMessage, DateFn, defaultDateFn,  SimpleMessage, testDateFn } from "@focuson/utils"`,
    `import { Lenses, NameAndLens} from "@focuson/lens"`,
    `import { extractMessages } from "@focuson/pages";`,
    `` ]
}

export function makeRestDetailsPage<G> ( params: TSParams, ps: RefD<G>[] ): string[] {
  const imports = [
    `import { RestDetails, OneRestDetails,  } from "@focuson/rest"`,
    `import { createSimpleMessage, DateFn, defaultDateFn, RestAction, insertBefore, SimpleMessage } from "@focuson/utils"`,
    `import { Lenses, NameAndLens} from "@focuson/lens"`,
    `import { ${params.stateName} , commonIds, identityL} from "./${params.commonFile}";`,
    `` ]
  const imp = unique ( allRestAndActions ( ps ).map ( ( [ pd, name, rd, rad ] ) => `import { ${restDetailsName ( pd, name, rd.rest )} } from '${restFileName ( '.', params, pd )}';` ), x => x );

  return [ ...imports, ...imp, ...makeRestDetails ( params, ps ) ]
}
export function makeRestDetails<G> ( params: TSParams, ps: RefD<G>[] ): string[] {
  return [
    '',
    // "export function restUrlMutator ( r: RestAction, url: string ): string { return insertBefore ( '?', r === 'list' ? '/list' : '', url )}", '',
    "export function restUrlMutator ( r: RestAction, url: string ): string { return url }", '',
    `export const restDetails: RestDetails<${params.stateName}, SimpleMessage> = {`,
    ...addStringToEndOfAllButLast ( "," ) ( ps.flatMap ( ref => sortedEntries ( ref.rest ).flatMap ( ( [ name, rd ] ) =>
      `   ${restDetailsName ( ref, name, rd.rest )}: ${restDetailsName ( ref, name, rd.rest )}(commonIds, defaultDateFn)` ) ) ),
    ``,
    `}`, '' ]
}

export function makeRests<G> ( params: TSParams, pd: RefD<G> ): string[] {
  let rests = sortedEntries ( pd.rest ).flatMap ( ( [ name, rd ] ) => makeRest ( params, pd ) ( name, rd ) );
  let imports = rests.length > 0 ? makeRestImports ( params, pd ) : []
  return [ ...imports, `import { ${params.stateName} } from "../common"`, '', ...rests ]
}
