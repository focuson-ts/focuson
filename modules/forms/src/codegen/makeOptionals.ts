import { TSParams } from "./config";
import { isMainPage, PageD } from "../common/pageD";
import { safeArray, sortedEntries } from "@focuson/utils";
import { unique } from "../common/restD";


export function makeOptionals<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  if ( !isMainPage ( p ) ) return []
  let optionals = sortedEntries ( p.optionals );
  if ( optionals.length === 0 ) return []
  let rawImports = optionals.flatMap ( ( [ n, v ] ) => v.imports );
  const allImports = [ `import {FState, identityL } from '../common';`, `import { Lenses, Optional } from '@focuson/lens'`,
    ...rawImports ]
  const imports = unique ( allImports, x => x )
  const values = optionals.map ( ( [ n, v ] ) =>
    `const ${n}: Optional<${params.stateName}, ${v.type}> = ${v.code};` )
  return [ ...imports, '', ...values ]
}