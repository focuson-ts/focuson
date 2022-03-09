import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, isPrimDd, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { DisplayCompD, OneDisplayCompParamD } from "../common/componentsD";
import { dataDsIn, isMainPage, isModalPage, PageD } from "../common/pageD";

import { decamelize, NameAnd, sortedEntries } from "@focuson/utils";
import { componentName, domainName, domainsFileName, emptyFileName, guardName, modalImportFromFileName, pageComponentName, pageDomainName } from "./names";
import { MakeButton, makeButtonsFrom, makeGuardButtonVariables } from "./makeButtons";
import { focusOnFor, indentList, noExtension } from "./codegen";
import { TSParams } from "./config";
import { unique } from "../common/restD";
import { ButtonD } from "../buttons/allButtons";
import { GuardWithCondition, MakeGuard } from "../buttons/guardButton";


export type AllComponentData<G> = ComponentData<G> | ErrorComponentData
export interface ComponentData<G> {
  path: string[];
  dataDD: AllDataDD<G>;
  display: DisplayCompD;
  hidden?: boolean;
  guard?: NameAnd<string[]>;
  displayParams?: ComponentDisplayParams
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
  [ name: string ]: boolean | string | string[]
}


export function listComponentsInFolder<G> (): AllDataFlatMap<AllComponentData<G>, G> {
  return {
    stopAtDisplay: true,
    ...emptyDataFlatMap (),
    walkDataStart: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: DataD<G> ): AllComponentData<G>[] =>
      dataDD.display ? [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display, hidden: oneDataDD.hidden, guard: oneDataDD.guard } ] : [],

    walkPrim: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: PrimitiveDD ): AllComponentData<G>[] =>
      dataDD.display ?
        [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display, hidden: oneDataDD.hidden, guard: oneDataDD.guard } ] :
        [ { path, dataDD, error: `Component ${JSON.stringify ( dataDD )} with displayParams [${JSON.stringify ( oneDataDD?.displayParams )}] does not have a display` } ],

    walkRepStart: ( path: string[], parents: DataD<G>[], oneDataDD: OneDataDD<G> | undefined, dataDD: RepeatingDataD<G> ): AllComponentData<G>[] =>
      [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display, hidden: oneDataDD.hidden, guard: oneDataDD.guard } ]
  }
}

export const listComponentsIn = <G> ( dataDD: AllDataDD<G> ): AllComponentData<G>[] => flatMapDD ( dataDD, listComponentsInFolder () );

export const processParam = <G> ( path: string[], dataDD: AllDataDD<G>, dcd: DisplayCompD ) => ( name: string, s: number | string | string[] | boolean ) => {
  const dcdType: OneDisplayCompParamD<any> = dcd.params[ name ]
  function errorPrefix () {return `Component ${dataDD.name} for ${path} has a display component ${dcd.name} and sets a param ${name} `}
  if ( dcdType === undefined ) throw new Error ( `${errorPrefix ()}. Legal values are ${sortedEntries ( dcd.params ).map ( t => t[ 0 ] ).join ( ',' )}` )
  function processStringParam () {return "'" + s + "'"}
  function processObjectParam () {return "{" + s + "}"}
  function processStringArrayParam () {
    if ( Array.isArray ( s ) ) return `{${JSON.stringify ( s )}}`; else
      throw new Error ( `${errorPrefix ()} needs to be a string[]` )
  }
  function processState ( prefix: string, postFix: string ) {
    if ( Array.isArray ( s ) ) return `{${prefix}${focusOnFor ( s )}${postFix}}`; else
      throw new Error ( `${errorPrefix ()} needs to be a string[]. Actually is ${typeof s}, with value ${JSON.stringify ( s )}` )
  }

  if ( dcdType.paramType === 'string' ) return processStringParam ()
  if ( dcdType.paramType === 'boolean' ) return processObjectParam ()
  if ( dcdType.paramType === 'object' ) return processObjectParam ()
  if ( dcdType.paramType === 'string[]' ) return processStringArrayParam ()
  if ( dcdType.paramType === 'fullState' ) return processState ( 'fullState(state)', '' )
  if ( dcdType.paramType === 'pageState' ) return processState ( 'pageState(state)', '' )
  if ( dcdType.paramType === 'state' ) return processState ( 'state', '' )
  if ( dcdType.paramType === 'fullStateValue' ) return processState ( 'fullState(state)', '.json()' )
  if ( dcdType.paramType === 'pageStateValue' ) return processState ( 'pageState(state)', '.json()' )
  if ( dcdType.paramType === 'stateValue' ) return processState ( 'state', '.json()' )
  throw new Error ( `${errorPrefix ()} with type ${dcdType.paramType} which can't be processed` )
};


export function createOneReact<B, G> ( { path, dataDD, display, displayParams, guard }: ComponentData<G> ): string[] {
  const { name, params } = display
  const processOneParam = processParam ( path, dataDD, display )
  const dataDDParamsA: [ string, string ][] = dataDD.displayParams ? Object.entries ( dataDD.displayParams ).map ( ( [ name, o ] ) => [ name, processOneParam ( name, o.value ) ] ) : []
  const defaultParams: [ string, string ][] = Object.entries ( display.params ).flatMap ( ( [ name, param ] ) => {
    if ( param?.default ) return [ [ name, processOneParam ( name, param.default ) ] ]
    if ( param?.needed === 'defaultToCamelCaseOfName' ) return [ [ name, processOneParam ( name, decamelize ( path.slice ( -1 ) + "", ' ' ) ) ] ]
    if ( param?.needed === 'defaultToPath' ) return [ [ name, processOneParam ( name, path ) ] ]
    if ( param?.needed === 'id' ) return [ [ name, processOneParam ( name, '`${id}.' + path.join ( "." ) + '`' ) ] ]
    if ( param?.needed === 'defaultToEnum' )
      if ( isPrimDd ( dataDD ) && dataDD.enum ) return [ [ name, "{" + JSON.stringify ( dataDD.enum ) + "}" ] ]
      else
        throw new Error ( `Component ${dataDD.name} for ${path} has a display component ${display.name} and sets a param ${name}. Requires enums, but no enums have been defined` )
    return []
  } )
  const displayParamsA: [ string, string ][] = displayParams ? Object.entries ( displayParams ).map ( ( [ name, value ] ) => [ name, processOneParam ( name, value ) ] ) : []
  const fullDisplayParams = Object.entries ( Object.fromEntries ( [ ...defaultParams, ...dataDDParamsA, ...displayParamsA ] ) )
  const displayParamsString = fullDisplayParams.map ( ( [ k, v ] ) => `${k}=${v}` ).join ( " " )

  const guardPrefix = guard ? sortedEntries ( guard ).map ( ( [ n, guard ] ) =>
    `<Guard value={${guardName ( n )}} cond={${JSON.stringify ( guard )}}>` ).join ( '' ) : ''
  const guardPostfix = guard ? sortedEntries ( guard ).map ( ( [ n, guard ] ) => `</Guard>` ).join ( '' ) : ''
  return [ `${guardPrefix}<${name} ${displayParamsString} />${guardPostfix}` ]
}
export function createAllReactCalls<G> ( d: AllComponentData<G>[] ): string[] {
  return d.filter ( ds => isComponentData ( ds ) && !ds.hidden ).flatMap ( d => isErrorComponentData ( d ) ? [ d.error ] : createOneReact ( d ) )
}

export const createReactComponent = <G extends GuardWithCondition> ( makeGuard: MakeGuard<G> ) => ( dataD: DataD<G> ): string[] => {
  const contents = indentList ( indentList ( createAllReactCalls ( listComponentsIn ( dataD ) ) ) )
  const guardStrings = sortedEntries ( dataD.guards ).map ( ( [ name, guard ] ) => {
    const maker = makeGuard[ guard.condition ]
    if ( !maker ) throw new Error ( `Don't know how to process guard with name ${name}: ${JSON.stringify ( guard )}` )
    return maker.makeGuardVariable ( name, guard )
    // return `const ${guardName ( name )} = state.chainLens(Lenses.fromPath(${JSON.stringify ( guard.pathFromHere )})).optJson();console.log('${guardName ( name )}', ${guardName ( name )})`;
  } )
  return [
    `export function ${componentName ( dataD )}<S, Context extends FocusOnContext<S>>({id,state,mode}: FocusedProps<S, ${domainName ( dataD )},Context>){`,
    ...guardStrings,
    "  return(<>",
    ...contents,
    "</>)",
    '}', ''
  ]
};


export const createReactPageComponent = <B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButtons: MakeButton<G>, pageD: PageD<B, G> ): string[] => {
  if ( pageD.pageType === 'MainPage' ) return createReactMainPageComponent ( params, makeGuard, makeButtons, pageD )
  if ( pageD.pageType === 'ModalPage' ) return createReactModalPageComponent ( params, makeGuard, makeButtons, pageD )
  // @ts-ignore
  throw new Error ( `Unknown page type ${pageD.pageType} in ${pageD.name}` )
};

export function createReactModalPageComponent<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButton: MakeButton<G>, pageD: PageD<B, G> ): string[] {
  const { dataDD, layout } = pageD.display
  const focus = focusOnFor ( pageD.display.target );
  const domName = domainName ( pageD.display.dataDD );
  return [
    `export function ${pageComponentName ( pageD )}<S, Context extends FocusOnContext<S>>(){`,
    `  return focusedPage<S, ${domName}, Context> ( s => '' ) (//If there is a compilation here have you added this to the 'domain' of the main page`,
    `     ( state, d, mode ) => {`,
    ...makeGuardButtonVariables ( params, makeGuard, pageD ),
    `          return (<${layout.name}  details='${layout.details}'>`,
    `               <${componentName ( dataDD )} id='root' state={state}  mode={mode} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom<B, G> ( params, makeGuard, makeButton, pageD ) ) ) ),
    `            </${layout.name}>)})}`,
    ''
  ]
}
export function createReactMainPageComponent<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButtons: MakeButton<G>, pageD: PageD<B, G> ): string[] {
  const { dataDD, layout } = pageD.display
  const focus = focusOnFor ( pageD.display.target );
  return [
    `export function ${pageComponentName ( pageD )}<S, Context extends FocusOnContext<S>>(){`,
    `  return focusedPageWithExtraState<S, ${pageDomainName ( pageD )}, ${domainName ( pageD.display.dataDD )}, Context> ( s => '${pageD.name}' ) ( s => s${focus}) (
    ( fullState, state , full, d, mode) => {`,
    ...makeGuardButtonVariables ( params, makeGuard, pageD ),
    `  return (<${layout.name}  details='${layout.details}'>`,
    `     <${componentName ( dataDD )} id='root' state={state}  mode={mode} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom ( params, makeGuard, makeButtons, pageD ) ) ) ),
    `   </${layout.name}>)})}`,
    ''
  ]
}

export function createRenderPage<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, transformButtons: MakeButton<G>, p: PageD<B, G> ): string[] {
  const imports = isMainPage ( p ) ? [
    `import * as domain from '${domainsFileName ( '..', params, p )}';`,
    `import * as empty from '${emptyFileName ( '..', params, p )}';` ] : []
  return [ ...imports,
    ...createAllReactComponents ( params, makeGuard, transformButtons, [ p ] ) ]
}

export function createAllReactComponents<B extends ButtonD, G extends GuardWithCondition> ( params: TSParams, makeGuard: MakeGuard<G>, makeButton: MakeButton<G>, pages: PageD<B, G>[] ): string[] {
  const dataComponents = sortedEntries ( dataDsIn ( pages, false ) ).flatMap ( ( [ name, dataD ] ) => dataD.display ? [] : createReactComponent ( makeGuard ) ( dataD ) )
  const pageComponents = pages.flatMap ( p => createReactPageComponent ( params, makeGuard, makeButton, p ) )
  const imports = [
    `import { LensProps } from "@focuson/state";`,
    `import { Layout } from "../copied/layout";`,
    `import { FocusOnContext } from '@focuson/focuson';`,
    `import {  focusedPage, focusedPageWithExtraState,   fullState,pageState} from "@focuson/pages";`,
    `import { Context, FocusedProps } from "../${params.commonFile}";`,
    `import { Lenses } from '@focuson/lens';`,
    `import { Guard } from "../copied/guard";`
  ]
  let pageDomain = noExtension ( params.pageDomainsFile );
  let domain = noExtension ( params.domainsFile );
  const pageDomainsImports = pages.filter ( p => p.pageType === 'MainPage' ).map ( p => `import {${pageDomainName ( p )}} from "${domainsFileName ( '..', params, p )}";` )
  const domainImports = pages.flatMap ( p => sortedEntries ( dataDsIn ( [ p ] ) ).map ( ( [ name, dataD ] ) => `import {${domainName ( dataD )}} from "${domainsFileName ( '..', params, p )}"` ) )
  const modalDomainImports = pages.flatMap ( p => isModalPage ( p ) ? [
    `//if there is an error message here... did you set the importFrom on this modal correctly, and also check that the PageD links to this DataD in a domain or rest block`,
    `import {${domainName ( p.display.dataDD )}} from '${modalImportFromFileName ( '..', p, params.domainsFile )}'; ` ] : [] )
  const modalRenderImports = pages.flatMap ( p => isModalPage ( p ) ? [ `import {${componentName ( p.display.dataDD )}} from '${modalImportFromFileName ( '..', p, params.renderFile )}'` ] : [] )
  return [ ...imports, ...modalDomainImports, ...modalRenderImports, ...makeComponentImports ( pages ), ...makeButtonImports ( makeButton ), ...pageDomainsImports, ...domainImports, ...pageComponents, ...dataComponents ]
}


export function makeComponentImports<B, G> ( ps: PageD<B, G>[] ): string[] {
  let allItemsWithDisplay: DisplayCompD[] = sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ d, n ] ) => sortedEntries ( n.structure ).map ( a => a[ 1 ].dataDD ) ).filter ( d => d.display ).map ( d => d.display );
  let fromPageDisplay: DisplayCompD[] = ps.flatMap ( p => p.display.dataDD.display ? [ p.display.dataDD.display ] : [] )
  return unique ( [ ...allItemsWithDisplay, ...fromPageDisplay ], d => `${d.import}/${d.name}` ).map ( d => `import { ${d.name} } from '${d.import}';` )
}
export function makeButtonImports<B, G> ( transformButtons: MakeButton<G> ): string[] {
  return unique ( sortedEntries ( transformButtons ).map ( ( [ name, creator ] ) => `import {${name}} from '${creator.import}';` ), x => x )
}