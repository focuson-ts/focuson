import { lensBuilder, Lenses, Optional, parsePath, PathBuilder, prefixNameAndLens, stateCodeBuilder } from "@focuson/lens";
import { TSParams } from "./config";
import { MainPageD, PageD, RefD } from "../common/pageD";
import { optionalsName, pageDomainName } from "./names";
import { CreateButtonData } from "./makeButtons";
import { HasName } from "@focuson/utils";

export function pathBuilderForLensIncPage ( pageName: string ): PathBuilder<Optional<any, any>> {
  return lensBuilder ( prefixNameAndLens<any> ( [ '~', Lenses.identity<any> ().focusQuery ( pageName ) ] ), {} )
}
export function pathBuilderForLensWithPageAsIdentity (): PathBuilder<Optional<any, any>> {
  return lensBuilder ( prefixNameAndLens<any> ( [ '~', Lenses.identity<any> () ], [ '', Lenses.identity<any> () ] ), {} )
}

export function stateCodeBuilderWithSlashAndTildaFromIdentity< G> ( params: TSParams, p: RefD< G> ) {
  return stateCodeBuilder ( {
    '/': `Lenses.identity<${params.stateName}>()`,
    '~': `Lenses.identity<${params.stateName}>().focusQuery('${p.name}')`,
  }, 'changeme' );
}
export const lensFocusQueryWithSlashAndTildaFromIdentity = <G> ( errorPrefix: string, params: TSParams, p: RefD<G>, path: string ): string => {
  try {
    return parsePath ( path, stateCodeBuilderWithSlashAndTildaFromIdentity ( params, p ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const lensFocusQueryWithTildaFromPage = <G> ( errorPrefix: string, params: TSParams, p: RefD<G>, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '~': `Lenses.identity<${params.domainsFile}.${pageDomainName ( p )}>()`,
    }, 'changeme' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateFocusQueryWithTildaFromPage = < G> ( errorPrefix: string, params: TSParams, mainPage: RefD< G>, p: HasName, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '/': `.copyWithLens(Lenses.identity<${params.domainsFile}.${pageDomainName ( p )}>())`,
      '~': ``,
    }, optionalsName ( mainPage ), 'focusOn' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateQueryForParams = <B, G> ( errorPrefix: string, params: TSParams, mainPage: MainPageD<B, G>, p: PageD<B, G>, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '/': `fullState<${params.stateName},any,Context>(state)`,
      '~': `pageState(state)<domain.${pageDomainName ( mainPage )}>()`,
      '': 'state'
    }, optionalsName ( mainPage ), 'focusOn' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateQueryForPathsFnButtonParams = <B, G> ( errorPrefix: string, params: TSParams, mainPage: MainPageD<B, G>, p: PageD<B, G>, path: string ) => {
  try {
    let result = parsePath ( path, stateCodeBuilder ( {
      '/': `state => fullState<${params.stateName},any,Context>(state)`,
      '~': `state =>pageState(state)<domain.${pageDomainName ( mainPage )}>()`,
      '': 'state => state'
    }, optionalsName ( mainPage ), 'focusOn' ) );
    return result
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateQueryForPathsFnParams = <B, G> ( errorPrefix: string, params: TSParams, mainPage: MainPageD<B, G>, p: PageD<B, G>, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '': 'state=>state'
    }, optionalsName ( mainPage ), 'focusOn' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateQueryForGuards = <B, G> ( errorPrefix: string, params: TSParams, mainPage: MainPageD<B, G>, p: PageD<B, G>, path: string ) => {
  // if ( path.indexOf ( '#' ) >= 0 ) throw new Error ( `${errorPrefix}\nCurrently guards cannot use variables. Path is ${path}` )
  return stateQueryForParams ( errorPrefix, params, mainPage, p, path )
}

export const stateFocusQueryWithEmptyFromHere = <B, G> ( errorPrefix: string, params: TSParams, mainPage: MainPageD<B, G>, p: PageD<B, G>, path: string ) => {
  try {
    return parsePath ( path, stateCodeBuilder ( {
      '/': `.copyWithLens(Lenses.identity<${params.domainsFile}.${pageDomainName ( p )}>())`,
      '': ``,
    }, optionalsName ( mainPage ), 'focusOn' ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}
export const stateForButton = <B, G> ( { parent, params, button, name, mainPage }: CreateButtonData<B, G>, buttonName: string ) =>
  ( path: string ) => `fullState${stateFocusQueryWithTildaFromPage ( `${buttonName} page ${parent.name}${name})`, params, mainPage, parent, path )}`;

export const stateForButtonWithPath = <B, G> ( { parent, params, button, name, mainPage }: CreateButtonData<B, G>, buttonName: string ) =>
  ( path: string ) => `${stateQueryForParams ( `${buttonName} page ${parent}${name})`, params, mainPage, parent, path )}`;

export const stateForGuardVariable = <B, G> ( mainPage: MainPageD<B, G>, page: PageD<B, G>, params: TSParams, guardName: string ) =>
  ( path: string ) => `state${stateFocusQueryWithEmptyFromHere ( `Page ${page.name} guard variable ${guardName}`, params, mainPage, page, path )}`;


export const stateForGuardButton = <B, G> ( mainPage: MainPageD<B, G>, page: PageD<B, G>, params: TSParams, guardName: string ) =>
  ( path: string ) => `fullState${stateFocusQueryWithTildaFromPage ( `Page ${page.name} guard variable ${guardName}`, params, mainPage, page, path )}`;

export function stateCodeBuilderWithSlashAndTildaFromIdFn<B, G> ( params: TSParams, p: PageD<B, G>, optionalsName: string ) {
  return {
    ...stateCodeBuilder ( {
      '/': `id`,
      '~': `id.focusQuery('${p.name}')`,
    }, optionalsName ),
    initialVariable ( name: string ): string {return `${optionalsName}.${name}(identityL)`;},
  }
}
export const lensFocusQueryWithSlashAndTildaFromIdFn = <B, G> ( errorPrefix: string, params: TSParams, p: PageD<B, G>, optionalsName: string, path: string ): string => {
  try {
    return parsePath ( path, stateCodeBuilderWithSlashAndTildaFromIdFn ( params, p, optionalsName ) )
  } catch ( e: any ) {
    console.error ( errorPrefix )
    throw e
  }
}