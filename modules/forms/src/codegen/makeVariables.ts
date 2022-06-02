import { TSParams } from "./config";
import { isMainPage, VariableD, PageD, VariableByCodeD, VariableByPathD } from "../common/pageD";
import { safeArray, sortedEntries, unique } from "@focuson/utils";
import { addStringToEndOfAllButLast, indentList } from "./codegen";
import { optionalsName } from "./names";


export function makeVariables<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  return makeCodeVariables ( params, p )
}
export function makePathVariables<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  function walkPathOptions ( fn: ( name: string, p: VariableByPathD ) => string[] ): string[] {
    if ( !isMainPage ( p ) ) return []
    let optionals = sortedEntries ( p.variables );
    return optionals.flatMap ( ( [ name, opt ] ) => opt.constructedBy === 'path' ? fn ( name, opt ) : [] )
  }
  return []
}
export function makeCodeVariables<B, G> ( params: TSParams, p: PageD<B, G> ): string[] {
  function walkCodeOptions ( fn: ( name: string, p: VariableByCodeD ) => string[] ): string[] {
    if ( !isMainPage ( p ) ) return []
    let optionals = sortedEntries ( p.variables );
    return optionals.flatMap ( ( [ name, opt ] ) => opt.constructedBy === 'code' ? fn ( name, opt ) : [] )
  }
  const imports = walkCodeOptions ( ( name, opt ) => safeArray ( opt.imports ) )
  const nameValues = walkCodeOptions ( ( name: string, opt ) => [ `${name}: ${opt.code}` ] )
  const allImports = unique ( [ `import {${params.stateName}, identityL } from '../common';`, `import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'`, ...imports ], x => x )
  return [ ...allImports, '',
    `export const ${optionalsName ( p )}: NameAndLensFn<${params.stateName}> = {`,
    ...indentList ( addStringToEndOfAllButLast ( ',' ) ( nameValues ) ),
    '}'
  ]

}