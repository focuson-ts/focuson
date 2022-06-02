import { TSParams } from "./config";
import { isMainPage, VariableD, PageD, VariableByCodeD, VariableByPathD, MainPageD } from "../common/pageD";
import { safeArray, sortedEntries, unique } from "@focuson/utils";
import { addStringToEndOfAllButLast, indentList } from "./codegen";
import { optionalsName } from "./names";
import { lensFocusQueryWithSlashAndTildaFromIdDn, lensFocusQueryWithSlashAndTildaFromIdentity, lensFocusQueryWithTildaFromPage, stateCodeBuilderWithSlashAndTildaFromIdFn, stateQueryForGuards } from "./lens";

const walkCodeOptions = <B, G> ( p: MainPageD<B, G> ) => ( fn: ( name: string, p: VariableByCodeD ) => string[] ): string[] => {
  let optionals = sortedEntries ( p.variables );
  return optionals.flatMap ( ( [ name, opt ] ) => opt.constructedBy === 'code' ? fn ( name, opt ) : [] )
};

const walkPathOptions = <B, G> ( p: MainPageD<B, G> ) => ( fn: ( name: string, p: MainPageD<B, G>, v: VariableByPathD ) => string[] ): string[] => {
  let optionals = sortedEntries ( p.variables );
  return optionals.flatMap ( ( [ name, opt ] ) => opt.constructedBy === 'path' ? fn ( name, p, opt ) : [] )
}

export function makeVariables<B, G> ( params: TSParams, p: MainPageD<B, G> ): string[] {
  const imports = walkCodeOptions ( p ) ( ( name, opt ) => safeArray ( opt.imports ) )
  const allImports = unique ( [ `import {${params.stateName}, identityL } from '../common';`, `import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'`, ...imports ], x => x )
  return [ ...allImports, '',
    `export const ${optionalsName ( p )}: NameAndLensFn<${params.stateName}> = {`,
    ...indentList ( addStringToEndOfAllButLast ( ',' ) ( makeCodeVariables ( params, p ) ) ),
    '}'
  ]
}

export function makeCodeVariables<B, G> ( params: TSParams, p: MainPageD<B, G> ): string[] {
  const fromCode = walkCodeOptions ( p ) ( ( name: string, opt ) => [ `${name}: ${opt.code}` ] )
  const fromPath = walkPathOptions ( p ) ( ( name: string, p, v ) => [ `${name}: ${lensFocusQueryWithSlashAndTildaFromIdDn ( `${p.name}.variables[${name}]`, params, p, v.path )}` ] )
  return [ ...fromCode, ...fromPath ]
}