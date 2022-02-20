import { allRestAndActions, PageD, RestDefnInPageProperties } from "../common/pageD";
import { applyToTemplate } from "@focuson/template";
import fs from "fs";
import { beforeSeparator, NameAnd, sortedEntries } from "@focuson/utils";
import { sampleName } from "./names";
import { makeCommonParamsValueForTest, RestActionDetail, RestD } from "../common/restD";
import { TSParams } from "./config";
import { imports } from "./codegen";
import { makeStateWithSelectedPage } from "./makeCommon";


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
export function makeFetcherPact ( params: TSParams, p: PageD, r: RestDefnInPageProperties , rad: RestActionDetail): string[] {
  if(rad.name === 'get') return makeGetFetcherPact(params, p, r, rad)
  return [`//Cannot make fetcher pacts for ${p.name} / ${rad.name}`]
}
export function makeGetFetcherPact ( params: TSParams, p: PageD, r: RestDefnInPageProperties , rad: RestActionDetail): string[] {

  const d = r.rest
  let body = params.samplesFile + "." + sampleName ( d.dataDD ) + '0';
  let paramsValueForTest = makeCommonParamsValueForTest ( d );
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
  const str: string = fs.readFileSync ( 'templates/onePact.ts' ).toString ()
  return applyToTemplate ( str, props )
}

export function makeAllPacts ( params: TSParams, ps: PageD[] ): string[] {
  return [
    ...imports ( params.samplesFile ),
    `import {emptyState, ${params.stateName} } from "./${params.commonFile}";`,
    `import * as ${params.fetchersFile} from "./${params.fetchersFile}";`,
    ...allRestAndActions ( ps ).flatMap ( ( [ pd, rd, rad ] ) => rd.fetcher ? makeFetcherPact ( params, pd, rd , rad) : [] )
  ]
}