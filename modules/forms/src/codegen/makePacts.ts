import { allRestAndActions, PageD, RestDefnInPageProperties } from "../common/pageD";
import { applyToTemplate } from "@focuson/template";
import {  DirectorySpec, loadFile } from "@focuson/files";
import fs from "fs";
import { beforeSeparator, NameAnd, sortedEntries } from "@focuson/utils";
import { sampleName } from "./names";
import { makeCommonParamsValueForTest, RestActionDetail, RestD } from "../common/restD";
import { TSParams } from "./config";
import { imports } from "./codegen";


interface PactProps extends NameAnd<string> {
  consumer: string,
  provider: string,
  description1: string,
  description2: string,
  method: string,
  path: string, // what about queries?
  status: string,
  body: string,
  tree: string,
  pageName: string,
  target: string,
  stateName: string,
  commonFile: string,
  commonParams: string,
  commonParamsValue: string,
  commonParamsTagsValue: string,
}
export function makeFetcherPact  <B>( params: TSParams, p: PageD <B>, r: RestDefnInPageProperties, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const fetcherType = r.fetcher
  if ( fetcherType == 'get' && rad.name === 'get' ) return makeGetFetcherPact ( params, p, r, rad, directorySpec )
  if ( fetcherType == 'list' && rad.name === 'list' ) return makeListFetcherPact ( params, p, r, rad, directorySpec )
  return []
}

export function makeGetFetcherPact <B> ( params: TSParams, p: PageD <B>, r: RestDefnInPageProperties, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const props = makePropsForFetcherPact ( p, r.rest, params );
  const str: string = loadFile ( 'templates/onePact.ts', directorySpec ).toString ()
  return [ '//GetFetcher pact test', ...applyToTemplate ( str, props ) ]
}

//currently no difference.. .but will be once we do the fetchers differently... its about the id of the item
export function makeListFetcherPact <B> ( params: TSParams, p: PageD <B>, r: RestDefnInPageProperties, rad: RestActionDetail, directorySpec: DirectorySpec ): string[] {
  const props = makePropsForFetcherPact ( p, r.rest, params );
  const str: string = loadFile ( 'templates/onePact.ts', directorySpec ).toString ()
  return [ '//ListFetcher pact test', ...applyToTemplate ( str, props ) ]
}

export function makeAllPacts <B> ( params: TSParams, ps: PageD <B>[], directorySpec: DirectorySpec ): string[] {
  return [
    ...imports ( params.samplesFile ),
    `import {emptyState, ${params.stateName} } from "./${params.commonFile}";`,
    `import * as ${params.fetchersFile} from "./${params.fetchersFile}";`,
    ...allRestAndActions ( ps ).flatMap ( ( [ pd, rd, rad ] ) => makeFetcherPact ( params, pd, rd, rad, directorySpec ) )
  ]
}
function makePropsForFetcherPact  <B>( p: PageD <B>, d: RestD, params: TSParams ) {
  let paramsValueForTest = makeCommonParamsValueForTest ( d );
  let body = params.samplesFile + "." + sampleName ( d.dataDD ) + '0';
  const props: PactProps = {
    body,
    consumer: d.dataDD.name,
    description1: p.name,
    description2: `should have a get fetcher for ${d.dataDD.name}`,
    method: "GET",
    path: beforeSeparator ( "?", d.url ),
    provider: d.dataDD.name + "Provider",
    status: "200",
    tree: `${params.fetchersFile}.fetchers`,
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