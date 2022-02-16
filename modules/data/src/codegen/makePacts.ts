import { RestDefnInPageProperties } from "../common/pageD";
import { adjustTemplate } from "./makeJavaResolvers";
import fs from "fs";
import { NameAnd } from "@focuson/utils";
import { sampleName } from "./names";


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
export function makePact ( r: RestDefnInPageProperties ): string[] {
  const d = r.rest
  let body = sampleName ( d.dataDD ) + '0';
  const props: PactProps = {
    body,
    consumer: d.dataDD.name,
    description1: d.dataDD.name,
    description2: "should have a get fetcher",
    emptyState: body,
    method: "Get",
    path: d.url,
    provider: d.dataDD.name + "Provider",
    status: "200",
    target: r.targetFromPath,
    tree: "tree"
  }
  const str: string = fs.readFileSync ( 'templates/pact.ts' ).toString ()
  return adjustTemplate ( str, props )

}