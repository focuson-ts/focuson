import { TSParams } from "./config";
import { isMainPage, PageD } from "../common/pageD";
import { sortedEntries } from "@focuson/utils";
import { unique } from "../common/restD";


export function makeOptionals<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  if ( !isMainPage ( p ) ) return []
  const imports = unique ( sortedEntries ( p.optionals ).flatMap ( ( [ n, v ] ) => v.imports ), x => x )
  const values = sortedEntries ( p.optionals ).map ( ( [ n, v ] ) =>
    `const ${n}: Optional<${params.stateName}, ${v.type}> = ${v.code};` )
  return [ ...imports, ...values ]
}