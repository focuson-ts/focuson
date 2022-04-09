import { AllDataDD, CompDataD, DisplayParamDD, HasLayout, isDataDd, isPrimDd, isRepeatingDd } from "../common/dataD";
import { commonParams, DisplayCompD, OneDisplayCompParamD, SimpleDisplayComp } from "../common/componentsD";
import { dataDsIn, isMainPage, isModalPage, MainPageD, PageD } from "../common/pageD";

import { decamelize, NameAnd, sortedEntries } from "@focuson/utils";
import { componentName, domainName, domainsFileName, emptyFileName, guardName, modalImportFromFileName, optionalsFileName, optionalsName, pageComponentName, pageDomainName } from "./names";
import { addButtonsFromVariables, MakeButton, makeButtonsVariable, makeGuardButtonVariables } from "./makeButtons";
import { focusOnFor, indentList, noExtension } from "./codegen";
import { TSParams } from "./config";
import { unique } from "../common/restD";
import { ButtonD } from "../buttons/allButtons";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";
import { stateFocusQueryWithTildaFromPage } from "./lens";


export type AllComponentData<G> = ComponentData<G> | ErrorComponentData
export interface ComponentData<G> {
  path: string[];
  dataDD: AllDataDD<G>;
  display: DisplayCompD;
  hidden?: boolean;
  guard?: NameAnd<string[]>;
  displayParams?: ComponentDisplayParams
}
function componentDataForPage<G> ( d: CompDataD<G> ): ComponentData<G> {
  const display = { import: '', name: d.display?.name ? d.display.name : d.name, params: d.display?.params ? d.display.params : commonParams };
  return { dataDD: d, display, path: [] }

}
export interface ErrorComponentData {
  path: string[];
  error: string;
}
export function isComponentData<G> ( d: AllComponentData<G> ): d is ComponentData<G> {
  // @ts-ignore
  return d.error === undefined
}

export function isErrorComponentData<G> ( d: AllComponentData<G> ): d is ErrorComponentData {
  // @ts-ignore
  return d.error !== undefined
}

export interface ComponentDisplayParams {
  [ name: string ]: boolean | string | string[] | number
}


export const listComponentsIn = <G> ( dataDD: CompDataD<G> ): AllComponentData<G>[] => {
  if ( isRepeatingDd ( dataDD ) ) return [] //for now
  if ( isPrimDd ( dataDD ) ) throw  Error ( 'Showing a primitive... do we want this? I guess why not... might be a string. For now an error' );

  return Object.entries ( dataDD.structure ).map ( ( [ n, oneDataDD ] ) => {
    const child: AllDataDD<G> = oneDataDD.dataDD
    if ( isPrimDd ( child ) ) {
      const c: AllComponentData<G> = {
        displayParams: oneDataDD.displayParams,
        path: [ n ],
        dataDD: child,
        display: child.display,
        hidden: oneDataDD.hidden,
        guard: oneDataDD.guard
      }
      return c
    }
    const c = componentDataForPage ( child )
    delete c.path
    return { path: [ n ], ...c } //just to get format nice on o/p

  } )

  // return flatMapDD ( dataDD, listComponentsInFolder () );
};

export const processParam = <G> ( errorPrefix: string, dcd: DisplayCompD ) => ( name: string, s: number | string | string[] | boolean ) => {
  if ( dcd.params === undefined ) throw Error ( `${errorPrefix} Trying to get data for param ${name}, but no params have been defined` )
  const dcdType: OneDisplayCompParamD<any> | undefined = dcd.params[ name ]
  if ( dcdType === undefined ) throw Error ( `${errorPrefix}  param '${name}' not found in ${JSON.stringify ( Object.keys ( dcd.params ).sort () )}` )
  const fullErrorPrefix = ` ${errorPrefix} has a display component ${dcd.name} and sets a param ${name} `
  if ( dcdType === undefined ) throw new Error ( `${fullErrorPrefix}. Legal values are ${sortedEntries ( dcd.params ).map ( t => t[ 0 ] ).join ( ',' )}` )
  function processStringParam () {return "'" + s + "'"}
  function processObjectParam () {return "{" + s + "}"}
  function processStringArrayParam () {
    if ( Array.isArray ( s ) ) return `{${JSON.stringify ( s )}}`; else
      throw new Error ( `${fullErrorPrefix} needs to be a string[]` )
  }
  function processState ( prefix: string, postFix: string ) {
    if ( Array.isArray ( s ) ) return `{${prefix}${focusOnFor ( s )}${postFix}}`; else
      throw new Error ( `${fullErrorPrefix} needs to be a string[]. Actually is ${typeof s}, with value ${JSON.stringify ( s )}` )
  }

  if ( dcdType.paramType === 'string' ) return processStringParam ()
  if ( dcdType.paramType === 'boolean' ) return processObjectParam ()
  if ( dcdType.paramType === 'object' ) return processObjectParam ()
  if ( dcdType.paramType === 'string[]' ) return processStringArrayParam ()
  if ( dcdType.paramType === 'fullState' ) return processState ( 'fullState(state)', '' )
  if ( dcdType.paramType === 'pageState' ) return processState ( 'pageState(state)<any>()', '' )
  if ( dcdType.paramType === 'state' ) return processState ( 'state', '' )
  if ( dcdType.paramType === 'fullStateValue' ) return processState ( 'fullState(state)', '.json()' )
  if ( dcdType.paramType === 'pageStateValue' ) return processState ( 'pageState(state)<any>()', '.json()' )
  if ( dcdType.paramType === 'stateValue' ) return processState ( 'state', '.json()' )
  throw new Error ( `${fullErrorPrefix} with type ${dcdType.paramType} which can't be processed` )
};


function makeParams<G> ( errorPrefix: string, path: string[], optEnum: NameAnd<String> | undefined, display: DisplayCompD, definingParams: DisplayParamDD | undefined, displayParams: ComponentDisplayParams ) {
  const processOneParam = processParam ( errorPrefix, display )
  const dataDDParams: [ string, string ][] = definingParams ? Object.entries ( definingParams )
    .map ( ( [ name, value ] ) => [ name, processOneParam ( name, value ) ] ) : []
  const defaultParams: [ string, string ][] = Object.entries ( display.params ).flatMap ( ( [ name, param ] ) => {
    if ( param?.default ) return [ [ name, processOneParam ( name, param.default ) ] ]
    if ( param?.needed === 'defaultToCamelCaseOfName' ) return [ [ name, processOneParam ( name, decamelize ( path.slice ( -1 ) + "", ' ' ) ) ] ]
    if ( param?.needed === 'defaultToPath' ) return [ [ name, processOneParam ( name, path ) ] ]
    if ( param?.needed === 'defaultToButtons' ) return [ [ name, processOneParam ( name, 'buttons' ) ] ]
    if ( param?.needed === 'id' ) {
      const dot = path.length > 0 ? '.' : ''
      return [ [ name, processOneParam ( name, '`${id}' + dot + path.join ( "." ) + '`' ) ] ]
    }
    if ( param?.needed === 'defaultToEnum' )
      if ( optEnum ) return [ [ name, "{" + JSON.stringify ( optEnum ) + "}" ] ]
      else
        throw new Error ( `errorPrefix for ${path} has a display component ${display.name} and sets a param ${name}. Requires enums, but no enums have been defined` )
    return []
  } )
  const displayParamsA: [ string, string ][] = displayParams ? Object.entries ( displayParams ).map ( ( [ name, value ] ) => [ name, processOneParam ( name, value ) ] ) : []
  const fullDisplayParams = Object.entries ( Object.fromEntries ( [ ...defaultParams, ...dataDDParams, ...displayParamsA ] ) )
  return fullDisplayParams;
}
export function createOneReact<B, G> ( pageD: PageD<B, G>, { path, dataDD, display, displayParams, guard }: ComponentData<G> ): string[] {
  const { name, params } = display
  const fullDisplayParams = makeParams ( `Page ${pageD.name}, Datad ${dataDD.name} with path ${JSON.stringify ( path )}`, path,
    isPrimDd ( dataDD ) && dataDD.enum, display, dataDD.displayParams, displayParams );

  const displayParamsString = fullDisplayParams.map ( ( [ k, v ] ) => `${k}=${v}` ).join ( " " )

  const guardPrefix = guard ? sortedEntries ( guard ).map ( ( [ n, guard ] ) =>
    `<Guard value={${guardName ( n )}} cond={${JSON.stringify ( guard )}}>` ).join ( '' ) : ''
  const guardPostfix = guard ? sortedEntries ( guard ).map ( ( [ n, guard ] ) => `</Guard>` ).join ( '' ) : ''
  const buttons = isDataDd ( dataDD ) && !dataDD.display ? 'buttons={buttons} ' : ''
  return [ `${guardPrefix}<${name} ${displayParamsString} ${buttons}/>${guardPostfix}` ]
}
export function createAllReactCalls<B, G> ( p: PageD<B, G>, d: AllComponentData<G>[] ): string[] {
  return d.filter ( ds => isComponentData ( ds ) && !ds.hidden ).flatMap ( d => {
    const comment = []//isComponentData ( d ) ? [ " {/*" + JSON.stringify ( { ...d, dataDD: d.dataDD?.name } ) + '*/}' ] : []
    if ( isErrorComponentData ( d ) ) return [ d.error ]
    const comp = [ ...comment, ...createOneReact ( p, d ) ]
    return comp
  } )
}

function makeLayoutPrefixPostFix ( errorPrefix: string, path: string[], hasLayout: HasLayout, defaultOpen: string, defaultClose: string ) {
  if ( hasLayout.layout ) {
    const { component, displayParams } = hasLayout.layout
    const params = makeParams ( errorPrefix, path, undefined, component, displayParams, {} )
    const layoutPrefixString = `<${component.name} ${params.map ( ( [ n, v ] ) => `${n}=${v}` ).join ( ' ' )}>`
    const layoutPostfixString = `</${component.name}>`
    return { layoutPrefixString, layoutPostfixString };
  } else return { layoutPrefixString: defaultOpen, layoutPostfixString: defaultClose }
}
export const createReactComponent = <B, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, mainP: MainPageD<B, G>, page: PageD<B, G> ) => ( dataD: CompDataD<G> ): string[] => {
  const contents = indentList ( indentList ( createAllReactCalls ( page, listComponentsIn ( dataD ) ) ) )
  const guardStrings = isDataDd ( dataD ) ? sortedEntries ( dataD.guards ).map ( ( [ name, guard ] ) => {
    const maker = makeGuard[ guard.condition ]
    if ( !maker ) throw new Error ( `Don't know how to process guard with name ${name}: ${JSON.stringify ( guard )}` )
    return maker.makeGuardVariable ( params, mainP, page, name, guard )
  } ) : []
  const layout = dataD.layout
  const { layoutPrefixString, layoutPostfixString } = makeLayoutPrefixPostFix ( `createReactComponent-layout ${dataD.name}`, [], dataD, '<>', '</>' );
  return [
    `export function ${componentName ( dataD )}({id,state,mode,buttons}: FocusedProps<${params.stateName}, ${domainName ( dataD )},Context>){`,
    ...guardStrings,
    `  return ${layoutPrefixString}`,
    ...contents,
    layoutPostfixString,
    '}', ''
  ]
};


export const createReactPageComponent = <B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButtons: MakeButton<G>, mainP: MainPageD<B, G>, pageD: PageD<B, G> ): string[] => {
  if ( isMainPage ( pageD ) ) return createReactMainPageComponent ( params, makeGuard, makeButtons, pageD )
  if ( isModalPage ( pageD ) ) return createReactModalPageComponent ( params, makeGuard, makeButtons, mainP, pageD )
  // @ts-ignore
  throw new Error ( `Unknown page type ${pageD.pageType} in ${pageD.name}` )
};

export function createReactModalPageComponent<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButtons: MakeButton<G>, mainP: MainPageD<B, G>, pageD: PageD<B, G> ): string[] {
  const { dataDD } = pageD.display
  // const focus = focusOnFor ( pageD.display.target );
  const domName = domainName ( pageD.display.dataDD );
  const { layoutPrefixString, layoutPostfixString } = makeLayoutPrefixPostFix ( `createReactModalPageComponent-layout ${pageD.name}`, [], pageD, "<>", '</>' );

  return [
    `export function ${pageComponentName ( pageD )}(){`,
    `  return focusedPage<${params.stateName}, ${domName}, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page`,
    `     ( state, d, mode, index ) => {`,
    ...(indentList ( indentList ( indentList ( indentList ( indentList ( [
      ...makeGuardButtonVariables ( params, makeGuard, mainP, pageD ),
      'const id=`root${index}`;',
      ...makeButtonsVariable ( params, makeGuard, makeButtons, pageD ),
      `return ${layoutPrefixString}`,
      ...createAllReactCalls ( pageD, [ componentDataForPage ( pageD.display.dataDD ) ] ),
      ...addButtonsFromVariables ( pageD ),
      `${layoutPostfixString}})}`
    ] ) ) ) ) )),
  ]
}
export function createReactMainPageComponent<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButtons: MakeButton<G>, pageD: MainPageD<B, G> ): string[] {
  const { dataDD } = pageD.display
  let errorPrefix: string = `createReactMainPageComponent-layout ${pageD.name}`;
  const { layoutPrefixString, layoutPostfixString } = makeLayoutPrefixPostFix ( errorPrefix, [], pageD, `<>`, '</>' );
  return [
    `export function ${pageComponentName ( pageD )}(){`,
    `  return focusedPageWithExtraState<${params.stateName}, ${pageDomainName ( pageD )}, ${domainName ( pageD.display.dataDD )}, Context> ( s => '${decamelize ( pageD.name, ' ' )}' ) ( state => state${stateFocusQueryWithTildaFromPage ( `createReactMainPageComponent for page ${pageD.name}`, params, pageD, pageD.display.target )}) (`,
    `( fullState, state , full, d, mode, index) => {`,
    ...indentList ( makeGuardButtonVariables ( params, makeGuard, pageD, pageD ) ),
    'const id=`root${index}`;',
    ...indentList ( makeButtonsVariable ( params, makeGuard, makeButtons, pageD ) ),
    '',
    ...indentList ( indentList ( indentList ( [
      `return ${layoutPrefixString}`,
      ...indentList ( indentList ( createAllReactCalls ( pageD, [ componentDataForPage ( pageD.display.dataDD ), ] ) ) ),
      ...addButtonsFromVariables ( pageD ),
      `${layoutPostfixString}})}`
    ] ) ) ),
    ''
  ]
}

export function createRenderPage<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, transformButtons: MakeButton<G>, mainP: MainPageD<B, G>, p: PageD<B, G> ): string[] {
  const imports = isMainPage ( p ) ? [ `import * as empty from '${emptyFileName ( '..', params, p )}';` ] : []
  return [ ...imports, `import * as domain from '${domainsFileName ( '..', params, mainP )}';`,
    ...createAllReactComponents ( params, makeGuard, transformButtons, mainP, p ) ]
}

export function createAllReactComponents<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButton: MakeButton<G>, mainP: MainPageD<B, G>, page: PageD<B, G> ): string[] {
  const pages = [ page ]
  const dataComponents = sortedEntries ( dataDsIn ( pages, false ) ).flatMap ( ( [ name, dataD ] ) => dataD.display ? [] : createReactComponent ( params, makeGuard, mainP, page ) ( dataD ) )
  const pageComponents = pages.flatMap ( p => createReactPageComponent ( params, makeGuard, makeButton, mainP, p ) )
  const optionalImports = isMainPage ( page ) ? [ `import { ${optionalsName ( page )} } from "${optionalsFileName ( `..`, params, page )}";` ] : []
  const imports = [
    `import { LensProps } from "@focuson/state";`,
    `import { FocusOnContext } from '@focuson/focuson';`,
    `import {  focusedPage, focusedPageWithExtraState, fullState, pageState} from "@focuson/pages";`,
    `import { Context, FocusedProps, ${params.stateName}, identityL } from "../${params.commonFile}";`,
    `import { Lenses } from '@focuson/lens';`,
    `import { Guard } from "@focuson/form_components";`,
    `import { GuardButton } from "@focuson/form_components";`,
    ...optionalImports

  ]
  let pageDomain = noExtension ( params.pageDomainsFile );
  let domain = noExtension ( params.domainsFile );
  const pageDomainsImports = pages.filter ( p => p.pageType === 'MainPage' ).map ( p => `import {${pageDomainName ( p )}} from "${domainsFileName ( '..', params, p )}";` )
  const domainImports = pages.flatMap ( p => sortedEntries ( dataDsIn ( [ p ] ) ).map ( ( [ name, dataD ] ) => `import {${domainName ( dataD )}} from "${domainsFileName ( '..', params, p )}"` ) )
  const modalDomainImports = pages.flatMap ( p => isModalPage ( p ) ? [
    `//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block`,
    `import {${domainName ( p.display.dataDD )}} from '${modalImportFromFileName ( '..',mainP, p, params.domainsFile )}'; ` ] : [] )
  const modalRenderImports = pages.flatMap ( p => (isModalPage ( p ) && !p.display.dataDD.display) ? [
    `import {${componentName ( p.display.dataDD )}} from '${modalImportFromFileName ( '..',mainP,p, params.renderFile )}'` ] : [] )
  const pageLayoutImports = pages.flatMap ( p => p.layout ? [ `import { ${p.layout.component.name} } from '${p.layout.component.import}';` ] : [] )
  return [ ...imports, ...modalDomainImports, ...modalRenderImports, ...makeComponentImports ( pages ), ...makeButtonImports ( makeButton ), ...pageDomainsImports, ...pageLayoutImports, ...domainImports, ...pageComponents, ...dataComponents ]
}


export function makeComponentImports<B, G> ( ps: PageD<B, G>[] ): string[] {
  let dataDs = sortedEntries ( dataDsIn ( ps ) );
  let allItemsWithDisplay: SimpleDisplayComp[] = dataDs.flatMap ( ( [ d, n ] ) => isDataDd ( n ) ? sortedEntries ( n.structure ).map ( a => a[ 1 ].dataDD ) : [] ).filter ( d => d.display ).map ( d => d.display );
  let allLayouts: SimpleDisplayComp[] = dataDs.flatMap ( ( [ n, dataD ] ) => dataD.layout ? [ dataD.layout.component ] : [] )
  let fromPageDisplay: SimpleDisplayComp[] = ps.flatMap ( p => p.display.dataDD.display ? [ p.display.dataDD.display ] : [] )
  return unique ( [ ...allItemsWithDisplay, ...fromPageDisplay, ...allLayouts ], d => `${d.import}/${d.name}` ).map ( d => `import { ${d.name} } from '${d.import}';` )
}
export function makeButtonImports<B, G> ( transformButtons: MakeButton<G> ): string[] {
  return unique ( sortedEntries ( transformButtons ).map ( ( [ name, creator ] ) => `import {${name}} from '${creator.import}';` ), x => x )
}