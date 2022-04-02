import { lensBuilder, Lenses, Optional, parsePath, PathBuilder, prefixNameAndLens, stateCodeBuilder } from "@focuson/lens";
import { TSParams } from "./config";
import { PageD } from "../common/pageD";
import { optionalsName, pageDomainName } from "./names";
import { CreateButtonData } from "./makeButtons";

export function pathBuilderForLensIncPage ( pageName: string ): PathBuilder<Optional<any, any>> {
  return lensBuilder ( prefixNameAndLens<any> ( [ '~', Lenses.identity<any> ().focusQuery ( pageName ) ] ), {} )
}
export function pathBuilderForLensWithPageAsIdentity (): PathBuilder<Optional<any, any>> {
  return lensBuilder ( prefixNameAndLens<any> ( [ '~', Lenses.identity<any> () ], [ '', Lenses.identity<any> () ] ), {} )
}

export function stateCodeBuilderWithSlashAndTildaFromIdentity<B, G> ( params: TSParams, p: PageD<B, G> ) {
  return stateCodeBuilder ( {
    '/': `Lenses.identity<${params.stateName}>()`,
    '~': `Lenses.identity<${params.stateName}>().focusQuery('${p.name}')`,
  }, 'changeme' );
}
export const lensFocusQueryWithSlashAndTildaFromIdentity = <B, G> ( errorPrefix: string, params: TSParams, p: PageD<B, G>, path: string ) :string=> {
  try {
    return parsePath ( path, stateCodeBuilderWithSlashAndTildaFromIdentity ( params, p ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const lensFocusQueryWithTildaFromPage = <B, G> ( errorPrefix: string, params: TSParams, p: PageD<B, G>, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '~': `Lenses.identity<${params.domainsFile}.${pageDomainName ( p )}>()`,
    }, 'changeme' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateFocusQueryWithTildaFromPage = <B, G> ( errorPrefix: string, params: TSParams, p: PageD<B, G>, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '/': `.copyWithLens(Lenses.identity<${params.domainsFile}.${pageDomainName ( p )}>())`,
      '~': ``,
    }, optionalsName(p), 'focusOn' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateFocusQueryWithEmptyFromHere = <B, G> ( errorPrefix: string, params: TSParams, p: PageD<B, G>, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '/': `.copyWithLens(Lenses.identity<${params.domainsFile}.${pageDomainName ( p )}>())`,
      '': ``,
    }, optionalsName(p),'focusOn' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateForButton = <B, G> ( { parent, params, button, name }: CreateButtonData<B, G>, buttonName: string ) =>
  ( path: string ) => `fullState${stateFocusQueryWithTildaFromPage ( `${buttonName} page ${parent}${name})`, params, parent, path )}`;

export const stateForGuardVariable = <B, G> ( page: PageD<B, G>, params: TSParams, guardName: string ) =>
  ( path: string ) => `state${stateFocusQueryWithEmptyFromHere ( `Page ${page.name} guard variable ${guardName}`, params, page, path )}`;


export const stateForGuardButton = <B, G> ( page: PageD<B, G>, params: TSParams, guardName: string ) =>
  ( path: string ) => `fullState${stateFocusQueryWithTildaFromPage ( `Page ${page.name} guard variable ${guardName}`, params, page, path )}`;

