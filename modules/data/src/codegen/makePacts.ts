import { allRestAndActions, PageD, RestDefnInPageProperties } from "../common/pageD";
import { adjustTemplate } from "./makeJavaResolvers";
import fs from "fs";
import { NameAnd, sortedEntries } from "@focuson/utils";
import { sampleName } from "./names";
import { RestD } from "../common/restD";
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
  emptyState: string,
  target: string
}
export function makeFetcherPact (params: TSParams, p: PageD, r: RestDefnInPageProperties ): string[] {
  const d = r.rest
  let body = params.samplesFile + "." + sampleName ( d.dataDD ) + '0';
  const props: PactProps = {
    body,
    consumer: d.dataDD.name,
    description1: p.name,
    description2: `should have a get fetcher for ${d.dataDD.name}`,
    emptyState: body,
    method: "GET",
    path: d.url,
    provider: d.dataDD.name + "Provider",
    status: "200",
    target: r.targetFromPath,
    tree: `${params.fetchersFile}.fetchers`
  }
  const str: string = fs.readFileSync ( 'templates/onePact.ts' ).toString ()
  return [...imports(params.samplesFile, params.fetchersFile), ...adjustTemplate ( str, props )]

}

export function makeAllPacts (params: TSParams,  ps: PageD[] ) : string[]{
  return allRestAndActions ( ps ).flatMap ( ( [ pd, rd ] ) => rd.fetcher ? makeFetcherPact ( params, pd, rd ) : [] )
}