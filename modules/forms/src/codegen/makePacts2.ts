import { isMainPage, MainPageD, PageD, RestDefnInPageProperties } from "../common/pageD";
import { beforeSeparator, RestAction, sortedEntries } from "@focuson/utils";
import { fetcherName, providerName, restDetailsName, sampleName } from "./names";
import { isRestLens, makeCommonValueForTest, makeParamValueForTest, postFixForEndpoint, RestD } from "../common/restD";
import { TSParams } from "./config";
import { lensFocusQueryWithSlashAndTildaFromIdentity, stateCodeBuilderWithSlashAndTildaFromIdentity } from "./lens";
import { parsePath } from "@focuson/lens";
import { addStringToEndOfAllButLast, indentList, paramsForRestAction } from "./codegen";
import { getRestTypeDetails, getUrlForRestAction, printRestAction, RestActionDetail, restActionForName } from "@focuson/rest";
import { CompDataD } from "../common/dataD";

export function makeAllPactsForPage<B, G> ( params: TSParams, page: PageD<B, G> ): string[] {
  if ( !isMainPage ( page ) ) return []
  return [
    `import { fetchWithPrefix, loggingFetchFn, stringToSimpleMsg, SimpleMessage } from "@focuson/utils";`,
    `import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";`,
    `import { pactWith } from "jest-pact";`,
    `import { rest, RestCommand, restL,RestToTransformProps } from "@focuson/rest";`,
    `import { simpleMessagesL} from "@focuson/pages";`,
    `import { Lenses, massTransform, Transform } from "@focuson/lens";`,
    `import * as samples from '../${page.name}/${page.name}.samples'`,
    `import {emptyState, ${params.stateName} , commonIds, identityL, pathToLens } from "../common";`,
    `import * as rests from "../rests";`,
    `import { restUrlMutator } from "../rests";`,
    `import { restCommandsFromFetchers, traceL } from "@focuson/focuson";`,
    `import { config } from "../config";`,
    // ...makeFetcherImports ( params, page ),
    '',
    `describe("Allow pacts to be run from intelliJ for ${page.name}", () =>{})`,
    ``,
    ...sortedEntries ( page.rest ).flatMap ( ( [ restName, defn ] ) => makeAllPactsForRest ( params, page, restName, defn ) )
  ]
}

export function makeFetcherImports<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  if ( !isMainPage ( p ) ) return [];
  return sortedEntries ( p.rest ).filter ( ( [ name, defn ] ) => defn.fetcher ).map ( ( [ name, defn ] ) => `import {${fetcherName ( defn )}} from './${p.name}.fetchers'` )
}
export function makeAllPactsForRest<B, G> ( params: TSParams, page: MainPageD<B, G>, restName: string, defn: RestDefnInPageProperties<G> ): string[] {
  const rest = defn.rest
  return [
    ...makeFetcherPact ( params, page, restName, defn ),
    ...rest.actions.flatMap ( action => makeRestPact ( params, page, restName, defn, action ) )
  ]
}

function getResponseBodyString<G> ( details: RestActionDetail, params: TSParams, dataD: CompDataD<G>, restD: RestD<G>, restAction: RestAction ) {
  return details.output.needsObj ? `body: ${params.samplesFile}.${sampleName ( dataD )}0` : `body: {}`;
}
export function makeRestPact<B, G> ( params: TSParams, page: MainPageD<B, G>, restName: string, defn: RestDefnInPageProperties<G>, action: RestAction ): string[] {
  const rest = defn.rest
  const details = getRestTypeDetails ( action )
  const dataD = rest.dataDD
  // const [ id, resourceIds ] = findIds ( rest )
  const errorPrefix = `${page.name}.rest[${restName}] Action ${JSON.stringify ( action )}`

  let paramsValueForTest = makeParamValueForTest ( errorPrefix, rest, action );
  const restActionName = printRestAction ( action )
  const requestBodyString = details.params.needsObj ? `body: JSON.stringify(${params.samplesFile}.${sampleName ( dataD )}0)` : `//no request body needed for ${restActionName}`
  const responseBodyString = getResponseBodyString ( details, params, dataD, rest, action )
  // const suppressExpectedResult = details.output.needsObj ? [] : [ `// @ts-ignore` ]
  const initialStateBodyTransforms = details.params.needsObj ? [ `[${lensFocusQueryWithSlashAndTildaFromIdentity ( `initialStateBodyTransform for page ${page.name} ${restName}`, params, page, defn.targetFromPath )}, () => ${params.samplesFile}.${sampleName ( dataD )}0]` ] : []
  let expectedResult = details.output.needsObj ? `${params.samplesFile}.${sampleName ( dataD )}0` : `{}`; //Not really sure the best way to do this.
  let url = getUrlForRestAction ( action, rest.url, rest.states );
  const setExpectedResult: string[] = getRestTypeDetails ( action ).output.needsObj ?
    [ `    const expected = ${parsePath ( defn.targetFromPath, stateCodeBuilderWithSlashAndTildaFromIdentity ( params, page ) )}.set ( rawExpected, ${expectedResult} )` ] :
    [ `    const expected = rawExpected; // this rest action doesn't load data` ];
  return [
    `//Rest ${restName} ${action} pact test for ${page.name}`,
    `pactWith ( { consumer: '${page.name}', provider: '${providerName ( page )}', cors: true }, provider => {`,
    `  describe ( '${page.name} - ${restName} rest ${restActionName}', () => {`,
    `   it ( 'should have a ${restActionName} rest for ${dataD.name}', async () => {`,
    `    const restCommand: RestCommand = { name: '${restDetailsName ( page, restName, rest )}', restAction: ${JSON.stringify ( action )} }`,
    `    const firstState: FState = {`,
    `       ...emptyState,debug:{}, restCommands: [ restCommand ],`,
    `       CommonIds: ${JSON.stringify ( makeCommonValueForTest ( errorPrefix, rest, 'get' ) )},`,
    `       pageSelection: [ { pageName: '${page.name}', pageMode: 'view', time: 'now' } ]`,
    `    }`,
    `    await provider.addInteraction ( {`,
    `      state: 'default',`,
    `      uponReceiving: 'a rest for ${page.name} ${restName} ${restActionName}',`,
    `      withRequest: {`,
    `         method: '${details.method}',`,
    `         path:   '${beforeSeparator ( "?", url )}${postFixForEndpoint ( action )}',`,
    `         query:${JSON.stringify ( paramsValueForTest )},`,
    `         ${requestBodyString},`,
    `      },`,
    `      willRespondWith: {`,
    `         status: 200,`,
    `         ${responseBodyString}`,
    `      },`,
    `    } )`,
    ...indentList ( indentList ( makeLensParamsTransformers ( params, page, restName, defn, action, initialStateBodyTransforms ) ) ),
    `    const withIds = massTransform ( firstState, ...lensTransforms )`,
    `    const fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );`,
    `    const props: RestToTransformProps<${params.stateName}, SimpleMessage> = {`,
    `       fetchFn, d: rests.restDetails, urlMutatorForRest: restUrlMutator, pathToLens, messageL: simpleMessagesL (), stringToMsg: stringToSimpleMsg ( () => 'now', 'info' ), traceL: traceL ()`,
    `    }`,
    `    const newState = await rest ( props, restL(), withIds )`,
    `    const rawExpected:any = { ...withIds, restCommands: []}`,
    // ...suppressExpectedResult,
    ...setExpectedResult,
    // `    expect ( newState.messages.length ).toEqual ( 1 )`,
    // `    expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)`,
    // `    expect ( { ...newState, messages: []}).toEqual ( expected )`,
    `   })`,
    ` })`,
    `})`,
    `` ]
}


export function makeFetcherPact<B, G> ( params: TSParams, page: MainPageD<B, G>, restName: string, defn: RestDefnInPageProperties<G> ): string[] {
  if ( !defn.fetcher ) return []
  let rest = defn.rest;
  const errorPrefix = `${page.name}.rest[${restName}]`
  return [
    `//GetFetcher pact test`,
    `describe ( '${page.name} - ${restName} - fetcher', () => {`,
    ...indentList ( [
      `it ( 'should have a  fetcher for ${rest.dataDD.name}', async () => {`,
      ...indentList ( [
        `const firstState: FState  = { ...emptyState,debug:{}, pageSelection:[{ pageName: '${page.name}', pageMode: 'view', time: 'now' }], CommonIds: ${JSON.stringify ( makeCommonValueForTest ( errorPrefix, rest, 'get' ) )} }`,
        ...makeLensParamsTransformers ( params, page, restName, defn, 'get', [] ),
        `const withIds = massTransform ( firstState, ...lensTransforms )`,
        `const restCommands: RestCommand[] = restCommandsFromFetchers ( config.tagHolderL, config.newFetchers, config.restDetails, '${page.name}', withIds )`,
        `expect ( restCommands.length ).toBeGreaterThan(0)`,
        `const restCommand = restCommands.find(rc =>rc.name==='${restDetailsName ( page, restName, rest )}')`,
        `expect ( restCommand?.restAction ).toEqual ('get')`,
      ] ),
      `})`,
    ] ),
    `})`,
    ``, ]
}

function makeLensParamsTransformers<B, G> ( params: TSParams, page: PageD<B, G>, restName: string, defn: RestDefnInPageProperties<G>, restAction: RestAction, extraTransforms: string[] ): string[] {
  let visibleParams = paramsForRestAction ( `Page ${page.name}.rest[${restName}] ${restActionForName ( restAction )}`, defn.rest, restAction );
  const theseParams = visibleParams.map ( ( [ name, p ] ) => p )

  return [ `const lensTransforms: Transform<${params.stateName},any>[] = [`,
    ...indentList ( addStringToEndOfAllButLast ( "," ) ( [ ...extraTransforms, ...theseParams.flatMap ( v =>
      isRestLens ( v ) ? [ `[${lensFocusQueryWithSlashAndTildaFromIdentity ( `makeLensParams for page ${page.name} ${restName}`, params, page, v.lens )}, () =>${JSON.stringify ( v.testValue )} ]` ] : [] ) ] ) ),
    `]` ]

}