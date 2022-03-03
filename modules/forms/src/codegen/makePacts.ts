import { allRestAndActions, PageD, RestDefnInPageProperties } from "../common/pageD";
import { applyToTemplate } from "@focuson/template";
import { DirectorySpec, loadFile } from "@focuson/files";
import { beforeSeparator, NameAnd, RestAction, sortedEntries } from "@focuson/utils";
import { restDetailsName, sampleName } from "./names";
import { defaultRestAction, makeCommonParamsValueForTest, RestActionDetail, RestD } from "../common/restD";
import { TSParams } from "./config";
import { imports } from "./codegen";


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
  stateName: string,
  commonFile: string,
  commonParams: string,
  commonParamsValue: string,
  commonParamsTagsValue: string,
}
interface FetcherPactProps extends CommonPactProps {
  tree: string,
}
interface RestPactProps extends CommonPactProps {
  restDetails: string;
  action: RestAction;
  sample: string;
  object: string;
  requestObject: string;
}
export function makeFetcherPact<B> ( params: TSParams, p: PageD<B>, r: RestDefnInPageProperties, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const fetcherType = r.fetcher
  if ( fetcherType == 'get' && rad.name === 'get' ) return makeGetFetcherPact ( params, p, r, rad, directorySpec )
  if ( fetcherType == 'list' && rad.name === 'list' ) return makeListFetcherPact ( params, p, r, rad, directorySpec )
  return []
}

export function makeGetFetcherPact<B> ( params: TSParams, p: PageD<B>, r: RestDefnInPageProperties, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const props = makePropsForFetcherPact ( p, r.rest, params );
  const str: string = loadFile ( 'templates/oneFetcherPact.ts', directorySpec ).toString ()
  return [ '//GetFetcher pact test', ...applyToTemplate ( str, props ) ]
}

//currently no difference.. .but will be once we do the fetchers differently... its about the id of the item
export function makeListFetcherPact<B> ( params: TSParams, p: PageD<B>, r: RestDefnInPageProperties, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const props = makePropsForFetcherPact ( p, r.rest, params );
  const str: string = loadFile ( 'templates/oneFetcherPact.ts', directorySpec ).toString ()
  return [ '//ListFetcher pact test', ...applyToTemplate ( str, props ) ]
}

export function makeRestPacts<B> ( params: TSParams, p: PageD<B>, r: RestDefnInPageProperties, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const props = makePropsForRestPact ( p, r, rad.name, params );
  const str: string = loadFile ( 'templates/oneRestPact.ts', directorySpec ).toString ()
  return [ `//Rest ${rad.name} pact test`, ...applyToTemplate ( str, { ...params, ...props } ) ]
}

export function makeAllPacts<B> ( params: TSParams, ps: PageD<B>[], directorySpec: DirectorySpec ): string[] {
  return [
    ...imports ( params.samplesFile ),
    `import {emptyState, ${params.stateName} } from "./${params.commonFile}";`,
    `import * as ${params.fetchersFile} from "./${params.fetchersFile}";`,
    `import * as ${params.restsFile} from "./${params.restsFile}";`,
    ...allRestAndActions ( ps ).flatMap ( ( [ pd, rd, rad ] ) => [
      ...makeFetcherPact ( params, pd, rd, rad, directorySpec ),
      ...makeRestPacts ( params, pd, rd, rad, directorySpec ),
    ] )
  ]
}


function makeCommonPropsForPact<B> ( p: PageD<B>, d: RestD, params: TSParams, restAction: RestAction, description2: string ) {
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
    target: p.display.target.join ( "." ),
    stateName: params.stateName,
    commonFile: params.commonFile,
    commonParamsValue: JSON.stringify ( paramsValueForTest ),
    commonParamsTagsValue: JSON.stringify ( sortedEntries ( paramsValueForTest ).map ( ( [ name, v ] ) => v ) )
  }
  return props;
}

function makePropsForFetcherPact<B> ( p: PageD<B>, d: RestD, params: TSParams ): FetcherPactProps {
  return { ...makeCommonPropsForPact ( p, d, params, 'get', `should have a get fetcher for ${d.dataDD.name}` ), tree: `${params.fetchersFile}.fetchers` }
}

function makePropsForRestPact<B> ( p: PageD<B>, r: RestDefnInPageProperties, restAction: RestAction, params: TSParams ): RestPactProps {
  const target = r.targetFromPath.join ( "." )
  let props = makeCommonPropsForPact ( p, r.rest, params, restAction, `should have a ${restAction} rest for ${r.rest.dataDD.name}` );
  let sample = sampleName ( r.rest.dataDD ) + "0"
  return {
    ...props,
    restDetails: `${params.restsFile}.restDetails`,
    restDetailsName: restDetailsName ( p, r.rest ),
    object: defaultRestAction[ restAction ].params.needsObj ? `${props.pageName}: { ${target}:${params.samplesFile}.${sampleName ( r.rest.dataDD ) + "0"} }` : `${props.pageName}:{}`,
    sample,
    target,
    requestObject: defaultRestAction[ restAction ].params.needsObj ? `,body: JSON.stringify(${params.samplesFile}.${sample})` : `//no body for ${restAction}`,
    action: restAction
  }
}