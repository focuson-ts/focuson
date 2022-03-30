import { TSParams } from "./config";
import { isMainPage, OptionalD, PageD } from "../common/pageD";
import { safeArray, sortedEntries } from "@focuson/utils";
import { unique } from "../common/restD";
import { addStringToEndOfAllButLast, indentList } from "./codegen";


export function makeOptionals<B, G> ( params: TSParams, ps: PageD<B, G>[] ): string[] {
  function walkOptions ( fn: ( name: string, p: OptionalD ) => string[] ): string[] {
    return ps.flatMap ( p => {
      if ( !isMainPage ( p ) ) return []
      let optionals = sortedEntries ( p.optionals );
      return optionals.flatMap ( ( [ name, opt ] ) => fn ( name, opt ) )
    } )
  }
  const imports = walkOptions ( ( name, opt ) => safeArray ( opt.imports ) )
  const nameValues = walkOptions ( ( name: string, opt ) => [ `${name}: ${opt.code}` ] )
  const allImports = unique ( [ `import {${params.stateName}, identityL } from './common';`, `import { Lenses, NameAndLens, Optional } from '@focuson/lens'`, ...imports ], x => x )
  return [ ...allImports, '',
    `const optionals: NameAndLens<${params.stateName}> = {`,
    ...indentList ( addStringToEndOfAllButLast ( ',' ) ( nameValues ) ),
    '}'
  ]

}