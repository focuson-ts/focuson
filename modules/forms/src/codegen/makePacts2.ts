import { isMainPage, PageD, RestDefnInPageProperties } from "../common/pageD";
import { beforeSeparator, RestAction, sortedEntries } from "@focuson/utils";
import { fetcherName, restDetailsName, sampleName } from "./names";
import { defaultRestAction, findIds, makeCommonValueForTest, makeParamValueForTest } from "../common/restD";
import { TSParams } from "./config";
import { commonIds, FState, identityL } from "ExampleApp/src/common";
import * as samples from "ExampleApp/src/OccupationAndIncomeSummary/OccupationAndIncomeSummary.samples";
import { stateCodeBuilderWithSlashAndTildaFromIdentity } from "./lens";
import { parsePath } from "@focuson/lens";

export function makeAllPactsForPage<B, G> ( params: TSParams, page: PageD<B, G> ): string[] {
  if ( !isMainPage ( page ) ) return []
  return [
    `import { fetchWithPrefix, loggingFetchFn } from "@focuson/utils";`,
    `import { loadTree,wouldLoad,FetcherTree } from "@focuson/fetcher";`,
    `import { pactWith } from "jest-pact";`,
    `import { rest, RestCommand, restL } from "@focuson/rest";`,
    `import { simpleMessagesL } from "@focuson/pages";`,
    `import { Lenses, massTransform } from "@focuson/lens";`,
    `import * as samples from '../${page.name}/${page.name}.samples'`,
    `import {emptyState, ${params.stateName} , commonIds, identityL } from "../common";`,
    `import * as rests from "../rests";`,
    ...makeFetcherImports ( params, page ),
    ``,
    ...sortedEntries ( page.rest ).flatMap ( ( [ restName, defn ] ) => makeAllPactsForRest ( params, page, restName, defn ) )
  ]
}

export function makeFetcherImports<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  if ( !isMainPage ( p ) ) return [];
  return sortedEntries ( p.rest ).filter ( ( [ name, defn ] ) => defn.fetcher ).map ( ( [ name, defn ] ) => `import {${fetcherName ( defn )}} from './${p.name}.fetchers'` )
}
export function makeAllPactsForRest<B, G> ( params: TSParams, page: PageD<B, G>, restName: string, defn: RestDefnInPageProperties<G> ): string[] {
  const rest = defn.rest
  return [
    ...makeFetcherPact ( params, page, restName, defn ),
    ...rest.actions.flatMap ( action => makeRestPact ( params, page, restName, defn, action ) )
  ]
}

export function makeRestPact<B, G> ( params: TSParams, page: PageD<B, G>, restName: string, defn: RestDefnInPageProperties<G>, action: RestAction ): string[] {
  const rest = defn.rest
  const details = defaultRestAction[ action ]
  const dataD = rest.dataDD
  // const [ id, resourceIds ] = findIds ( rest )
  let paramsValueForTest = makeParamValueForTest ( rest, action );
  const bodyString = details.params.needsObj ? `body: ${params.samplesFile}.${sampleName ( dataD )}0` : `//no body needed for ${action}`
  return [
    `//Rest ${restName} ${action} pact test for ${page.name}`,
    `  pactWith ( { consumer: '${page.name}', provider: '${page.name}Provider', cors: true }, provider => {`,
    `    describe ( '${page.name} - ${restName} rest ${action}', () => {`,
    `      it ( 'should have a ${action} rest for ${dataD.name}', async () => {`,
    `        const restCommand: RestCommand = { name: '${restDetailsName ( page, restName, rest )}', restAction: '${action}' }`,
    `        const firstState: FState = {`,
    `          ...emptyState, restCommands: [ restCommand ],`,
    `          CommonIds: ${JSON.stringify ( makeCommonValueForTest ( rest, 'get' ) )},`,
    `          pageSelection: [ { pageName: '${page.name}', pageMode: 'view' } ]`,
    `        }`,

    `        await provider.addInteraction ( {`,
    `          state: 'default',`,
    `          uponReceiving: 'a rest for ${page.name} ${restName} ${action}',`,
    `          withRequest: {`,
    `            method: '${details.method}',`,
    `            path:  '${beforeSeparator ( "?", rest.url )}',`,
    `            query:${JSON.stringify ( paramsValueForTest )},`,
    `            ${bodyString},`,
    `          },`,
    `          willRespondWith: {`,
    `            status: 200,`,
    `            ${bodyString}`,
    `          },`,
    `        } )`,
    `        const withIds = massTransform(firstState,)`,
    `        let fetchFn = fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn );`,
    `        let newState = await rest ( fetchFn, rests.restDetails, simpleMessagesL(), restL(), withIds )`,
    `        const rawExpected:any = { ...firstState, restCommands: []}`,
    `        const expected = ${parsePath ( defn.targetFromPath, stateCodeBuilderWithSlashAndTildaFromIdentity ( params, page ) )}.set ( rawExpected, ${params.samplesFile}.${sampleName ( dataD )}0 )`,
    `        expect ( { ...newState, messages: []}).toEqual ( expected )`,
    `        expect ( newState.messages.length ).toEqual ( 1 )`,
    `        expect ( newState.messages[ 0 ].msg).toMatch(/^200.*/)`,
    `      } )`,
    `      } )`,
    `      })`,
    `  ` ]
}


export function makeFetcherPact<B, G> ( params: TSParams, page: PageD<B, G>, restName: string, defn: RestDefnInPageProperties<G> ): string[] {
  if ( !defn.fetcher ) return []
  let rest = defn.rest;
  let paramsValueForTest = makeParamValueForTest ( rest, 'get' );
  return [
    `//GetFetcher pact test`,
    `pactWith ( { consumer: '${page.name}', provider: '${page.name}Provider', cors: true }, provider => {`,
    `      describe ( '${page.name} - ${restName} - fetcher', () => {`,
    `        it ( 'should have a  fetcher for ${rest.dataDD.name}', async () => {`,
    `          await provider.addInteraction ( {`,
    `            state: 'default',`,
    `            uponReceiving: 'A request for ${rest.dataDD.name}',`,
    `            withRequest: {`,
    `              method: 'GET',`,
    `              path: '${beforeSeparator ( "?", rest.url )}',`,
    `              query:${JSON.stringify ( paramsValueForTest )}`,
    `            },`,
    `            willRespondWith: {`,
    `              status: 200,`,
    `              body: ${params.samplesFile}.${sampleName ( rest.dataDD )}0`,
    `            },`,
    `          } )`,
    `          const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: '${page.name}', pageMode: 'view' }], CommonIds: ${JSON.stringify ( makeCommonValueForTest ( rest, 'get' ) )} }`,
    `          const f: FetcherTree<${params.stateName}> = { fetchers: [ ${fetcherName ( defn )} (Lenses.identity<${params.stateName}>().focusQuery('${page.name}'), commonIds ) ], children: [] }`,
    `          let newState = await loadTree (f, firstState, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )`,
    `          let expectedRaw: any = {`,
    `            ... firstState,`,
    `              tags: {'${page.name}_${defn.targetFromPath}': ${JSON.stringify ( Object.values ( paramsValueForTest ) )}}`,
    `        };`,
    `        const expected = ${parsePath ( defn.targetFromPath, stateCodeBuilderWithSlashAndTildaFromIdentity ( params, page ) )}.set ( expectedRaw, ${params.samplesFile}.${sampleName ( rest.dataDD )}0 )`,
    `          expect ( newState ).toEqual ( expected )`,
    `        } )`,
    `        } )`,
    `      })`,
    ``,
  ]
}

