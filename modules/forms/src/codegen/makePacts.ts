import { allRestAndActions, isMainPage, PageD, RestDefnInPageProperties } from "../common/pageD";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";
import { beforeSeparator, NameAnd, RestAction, sortedEntries } from "@focuson/utils";
import { fetcherName, restDetailsName, sampleName, samplesFileName } from "./names";
import { defaultRestAction, isRestLens, LensRestParam, makeCommonParamsValueForTest, RestActionDetail, RestD } from "../common/restD";
import { TSParams } from "./config";
import { focusQueryFor, indentList } from "./codegen";


interface CommonPactProps extends NameAnd<string> {
  consumer: string,
  provider: string,
  description1: string,
  description2: string,
  method: string,
  path: string, // what about queries?
  status: string,
  body: string,
  pageName: string,
  target: string,
  closeTarget: string,
  stateName: string,
  commonFile: string,
  commonParams: string,
  commonParamsValue: string,
  commonParamsTagsValue: string,
}
interface FetcherPactProps extends CommonPactProps {
  content: string;
}
interface RestPactProps extends CommonPactProps {
  restDetails: string;
  action: RestAction;
  sample: string;
  object: string;
  requestObject: string;
  content: string;
  expected: string
}
export function makeFetcherPact<B, G> ( params: TSParams, p: PageD<B, G>, r: RestDefnInPageProperties<G>, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const fetcherType = r.fetcher
  if ( fetcherType && rad.name === 'get' ) return makeGetFetcherPact ( params, p, r, rad, directorySpec )
  return []
}

export function makeGetFetcherPact<B, G> ( params: TSParams, p: PageD<B, G>, defn: RestDefnInPageProperties<G>, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const props = makePropsForFetcherPact ( p, defn, defn.rest, params, defn.targetFromPath );
  const str: string = loadFile ( 'templates/oneFetcherPact.ts', directorySpec ).toString ()
  return [ '//GetFetcher pact test', ...applyToTemplate ( str, props ) ]
}

export function makeRestPacts<B, G> ( params: TSParams, p: PageD<B, G>, restName: string, r: RestDefnInPageProperties<G>, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const props = makePropsForRestPact ( p, restName, r, rad.name, params );
  const str: string = loadFile ( 'templates/oneRestPact.ts', directorySpec ).toString ()
  return [ `//Rest ${rad.name} pact test`, ...applyToTemplate ( str, { ...params, ...props } ) ]
}

function makeFetcherImports<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  if ( !isMainPage ( p ) ) return [];
  return sortedEntries ( p.rest ).map ( ( [ name, defn ] ) => `import {${fetcherName ( defn )}} from './${p.name}.fetchers'` )
}
export function makeAllPacts<B, G> ( params: TSParams, p: PageD<B, G>, directorySpec: DirectorySpec ): string[] {
  return [
    `import * as samples from '${samplesFileName ( '..', params, p )}'`,
    `import {emptyState, ${params.stateName} , commonIds, identityL } from "../${params.commonFile}";`,
    `import * as ${params.restsFile} from "../${params.restsFile}";`,
    ...makeFetcherImports ( params, p ),
    ``,
    `describe("To support manually running the tests", () =>{it ("should support ${p.name}", () =>{})})`,
    ...allRestAndActions ( [ p ] ).flatMap ( ( [ pd, restName, rd, rad ] ) => [
      ...makeFetcherPact ( params, pd, rd, rad, directorySpec ),
      ...makeRestPacts ( params, pd, restName, rd, rad, directorySpec ),
    ] )
  ]
}

export function makeTargetFor ( path: string[] ) {
  return path.join ( ":{" )
}
export function closeTargetFor ( path: string[] ) {
  return '}'.repeat ( path.length )
}
function makeCommonPropsForPact<B, G> ( p: PageD<B, G>, d: RestD<G>, params: TSParams, path: string[], restAction: RestAction, description2: string ) {
  let paramsValueForTest = makeCommonParamsValueForTest ( d, restAction );
  let body = params.samplesFile + "." + sampleName ( d.dataDD ) + '0';
  const props: CommonPactProps = {
    body,
    consumer: d.dataDD.name,
    description1: p.name,
    description2,
    method: defaultRestAction[ restAction ].method.toUpperCase (),
    path: beforeSeparator ( "?", d.url ),
    provider: d.dataDD.name + "Provider",
    status: "200",
    commonParams: params.commonParams,
    pageName: p.name,
    target: makeTargetFor ( path ),
    closeTarget: closeTargetFor ( path ),
    stateName: params.stateName,
    commonFile: params.commonFile,
    commonParamsValue: JSON.stringify ( paramsValueForTest ),
    commonParamsTagsValue: JSON.stringify ( Object.entries ( paramsValueForTest ).map ( ( [ name, v ] ) => v ) )
  } //     {pageName}: {{target}: {body}},
  return props;
}

function makePropsForFetcherPact<B, G> ( p: PageD<B, G>, defn: RestDefnInPageProperties<G>, d: RestD<G>, params: TSParams, path: string[] ): FetcherPactProps {
  const locals: [ string, LensRestParam ][] = sortedEntries ( d.params ).flatMap ( ( [ n, l ] ) => isRestLens ( l ) ? [ [ n, l ] ] : [] )
  const localLens: string[] = locals.map ( ( [ n, l ] ) => `${n}: Lenses.identity<${params.stateName}>().focusQuery('${p.name}')${focusQueryFor ( l.lens )}` )
  const lensTransformString = locals.map ( ( [ n, l ] ) => `[ids.${n}, () =>"${l.testValue}"]` )
  const tag = [ p.name, ...path ].join ( "_" )
  let commonPactProps = makeCommonPropsForPact ( p, d, params, path, 'get', `should have a get fetcher for ${d.dataDD.name}` );

  const content: string[] = indentList ( indentList ( indentList ( [
    `const ids = {`, ...indentList ( localLens ), '}',
    `const firstState: FState  = { ...emptyState, pageSelection:[{ pageName: '${p.name}', pageMode: 'view' }] , ${p.name}: { }}`,
    `const withIds = massTransform(firstState,${lensTransformString})`,
    ` const f: FetcherTree<${params.stateName}> = { fetchers: [ ${fetcherName ( defn )} ( identityL.focusQuery ( '${p.name}' ), commonIds ) ], children: [] }`,
    `let newState = await loadTree (f, withIds, fetchWithPrefix ( provider.mockService.baseUrl, loggingFetchFn ), {} )`,
    `let expectedRaw: any = {`,
    `  ... firstState,`,
    `   ${p.name}: {${commonPactProps.target}:${commonPactProps.body}${commonPactProps.closeTarget},`,
    `  tags: { ${tag}:${commonPactProps.commonParamsTagsValue}}`,
    `};`,
    `const expected = massTransform(expectedRaw,${lensTransformString})`,
    `expect ( newState ).toEqual ( expected )`,
  ] ) ) )
  return {
    ...commonPactProps,
    content: content.join ( "\n" )
  }
}

function makePropsForRestPact<B, G> ( p: PageD<B, G>, restName: string, r: RestDefnInPageProperties<G>, restAction: RestAction, params: TSParams ): RestPactProps {

  let props = makeCommonPropsForPact ( p, r.rest, params, r.targetFromPath, restAction, `should have a ${restAction} rest for ${r.rest.dataDD.name}` );
  let sample = sampleName ( r.rest.dataDD ) + "0"
  let target = makeTargetFor ( r.targetFromPath );
  let closeTarget = closeTargetFor ( r.targetFromPath );
  const locals: [ string, LensRestParam ][] = sortedEntries ( r.rest.params ).flatMap ( ( [ n, l ] ) => isRestLens ( l ) ? [ [ n, l ] ] : [] )
  const lensTransformString = locals.map ( ( [ n, l ] ) => `[ids.${n}, () =>"${l.testValue}"]` )
  const localLens: string[] = locals.map ( ( [ n, l ] ) => `${n}: Lenses.identity<${params.stateName}>().focusQuery('${p.name}')${focusQueryFor ( l.lens )}` )

  let content = indentList ( indentList ( indentList ( [
    `const ids = {`, ...indentList ( localLens ), '}',
    `const withIds = massTransform(firstState,${lensTransformString})`, ] ) ) ).join ( "\n" )
  let expected = `const expected = massTransform(rawExpected,${lensTransformString})`;
  return {
    ...props,
    restDetails: `${params.restsFile}.restDetails`,
    restDetailsName: restDetailsName ( p, restName, r.rest ),
    object: defaultRestAction[ restAction ].params.needsObj ? `${props.pageName}: { ${target}:${params.samplesFile}.${sampleName ( r.rest.dataDD ) + "0"} ${closeTarget}` : `${props.pageName}:{}`,
    sample,
    content,
    expected,
    target: target,
    closeTarget: closeTarget,
    requestObject: defaultRestAction[ restAction ].params.needsObj ? `,body: JSON.stringify(${params.samplesFile}.${sample})` : `//no body for ${restAction}`,
    action: restAction
  }
}