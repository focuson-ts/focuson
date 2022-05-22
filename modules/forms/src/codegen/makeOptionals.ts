import { TSParams } from "./config";
import { isMainPage, OptionalD, PageD } from "../common/pageD";
import { safeArray, sortedEntries, unique } from "@focuson/utils";
import { addStringToEndOfAllButLast, indentList } from "./codegen";
import { optionalsName } from "./names";


export function makeOptionals<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  function walkOptions ( fn: ( name: string, p: OptionalD ) => string[] ): string[] {
    if ( !isMainPage ( p ) ) return []
    let optionals = sortedEntries ( p.variables );
    return optionals.flatMap ( ( [ name, opt ] ) => fn ( name, opt ) )
  }
  const imports = walkOptions ( ( name, opt ) => safeArray ( opt.imports ) )
  const nameValues = walkOptions ( ( name: string, opt ) => [ `${name}: ${opt.code}` ] )
  const allImports = unique ( [ `import {${params.stateName}, identityL } from '../common';`, `import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'`, ...imports ], x => x )
  return [ ...allImports, '',
    `export const ${optionalsName (  p )}: NameAndLensFn<${params.stateName}> = {`,
    ...indentList ( addStringToEndOfAllButLast ( ',' ) ( nameValues ) ),
    '}'
  ]

}