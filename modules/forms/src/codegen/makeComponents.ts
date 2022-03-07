import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, isPrimDd, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { DisplayCompD, OneDisplayCompParamD } from "../common/componentsD";
import { dataDsIn, PageD } from "../common/pageD";

import { decamelize, NameAnd, sortedEntries } from "@focuson/utils";
import { componentName, domainName, guardName, pageComponentName, pageDomainName } from "./names";
import { MakeButton, makeButtonsFrom } from "./makeButtons";
import { focusOnFor, indentList, noExtension } from "./codegen";
import { TSParams } from "./config";
import { unique } from "../common/restD";


export type AllComponentData = ComponentData | ErrorComponentData
export interface ComponentData {
  path: string[];
  dataDD: AllDataDD;
  display: DisplayCompD;
  hidden?: boolean;
  guard?: NameAnd<string[]>;
  displayParams?: ComponentDisplayParams
}
export interface ErrorComponentData {
  path: string[];
  error: string;
}
export function isComponentData ( d: AllComponentData ): d is ComponentData {
  // @ts-ignore
  return d.error === undefined
}

export function isErrorComponentData ( d: AllComponentData ): d is ErrorComponentData {
  // @ts-ignore
  return d.error !== undefined
}

export interface ComponentDisplayParams {
  [ name: string ]: string | string[]
}


export const listComponentsInFolder: AllDataFlatMap<AllComponentData> = {
  stopAtDisplay: true,
  ...emptyDataFlatMap (),
  walkDataStart: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: DataD ): AllComponentData[] =>
    dataDD.display ? [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display, hidden: oneDataDD.hidden, guard: oneDataDD.guard } ] : [],

  walkPrim: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ): AllComponentData[] =>
    dataDD.display ?
      [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display, hidden: oneDataDD.hidden, guard: oneDataDD.guard } ] :
      [ { path, dataDD, error: `Component ${JSON.stringify ( dataDD )} with displayParams [${JSON.stringify ( oneDataDD?.displayParams )}] does not have a display` } ],

  walkRepStart: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ): AllComponentData[] =>
    [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display, hidden: oneDataDD.hidden, guard: oneDataDD.guard } ]
}

export const listComponentsIn = ( dataDD: AllDataDD ): AllComponentData[] => flatMapDD ( dataDD, listComponentsInFolder );

export const processParam = ( path: string[], dataDD: AllDataDD, dcd: DisplayCompD ) => ( name: string, s: number | string | string[] ) => {
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


export function createOneReact<B> ( { path, dataDD, display, displayParams, guard }: ComponentData ): string[] {
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
export function createAllReactCalls ( d: AllComponentData[] ): string[] {
  return d.filter ( ds => isComponentData ( ds ) && !ds.hidden ).flatMap ( d => isErrorComponentData ( d ) ? [ d.error ] : createOneReact ( d ) )
}

export function createReactComponent ( dataD: DataD ): string[] {
  const contents = indentList ( indentList ( createAllReactCalls ( listComponentsIn ( dataD ) ) ) )
  const guardStrings = sortedEntries ( dataD.guards ).map ( ( [ name, guard ] ) =>
    `const ${guardName ( name )} = state.chainLens(Lenses.fromPath(${JSON.stringify ( guard.pathFromHere )})).optJson();console.log('${guardName ( name )}', ${guardName ( name )})` )
  return [
    `export function ${componentName ( dataD )}<S, Context extends PageSelectionAndRestCommandsContext<S>>({id,state,mode}: FocusedProps<S, ${domainName ( dataD )},Context>){`,
    ...guardStrings,
    "  return(<>",
    ...contents,
    "</>)",
    '}', ''
  ]
}


export const createReactPageComponent = <B> ( params: TSParams, transformButtons: MakeButton, pageD: PageD<B> ): string[] => {
  if ( pageD.pageType === 'MainPage' ) return createReactMainPageComponent ( params, transformButtons, pageD )
  if ( pageD.pageType === 'ModalPage' ) return createReactModalPageComponent ( params, transformButtons, pageD )
  throw new Error ( `Unknown page type ${pageD.pageType} in ${pageD.name}` )
};

export function createReactModalPageComponent<B> ( params: TSParams, transformButtons: MakeButton, pageD: PageD<B> ): string[] {
  const { dataDD, layout } = pageD.display
  const focus = focusOnFor ( pageD.display.target );
  const domName = domainName ( pageD.display.dataDD );
  return [
    `export function ${pageComponentName ( pageD )}<S, Context extends PageSelectionAndRestCommandsContext<S>>(){`,
    `  return focusedPage<S, ${domName}, Context> ( s => '' ) (`,
    `     ( state, d, mode ) => {`,
    `          return (<${layout.name}  details='${layout.details}'>`,
    `               <${componentName ( dataDD )} id='root' state={state}  mode={mode} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom ( params, transformButtons, pageD ) ) ) ),
    `            </${layout.name}>)})}`,
    ''
  ]
}
export function createReactMainPageComponent<B> ( params: TSParams, transformButtons: MakeButton, pageD: PageD<B> ): string[] {
  const { dataDD, layout } = pageD.display
  const focus = focusOnFor ( pageD.display.target );
  return [
    `export function ${pageComponentName ( pageD )}<S, Context extends PageSelectionAndRestCommandsContext<S>>(){`,
    `  return focusedPageWithExtraState<S, ${pageDomainName ( pageD )}, ${domainName ( pageD.display.dataDD )}, Context> ( s => '${pageD.name}' ) ( s => s${focus}) (
    ( fullState, state , full, d, mode) => {`,
    `  return (<${layout.name}  details='${layout.details}'>`,
    `     <${componentName ( dataDD )} id='root' state={state}  mode={mode} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom ( params, transformButtons, pageD ) ) ) ),
    `   </${layout.name}>)})}`,
    ''
  ]
}

export function createAllReactComponents<B> ( params: TSParams, transformButtons: MakeButton, pages: PageD<B>[] ): string[] {
  const dataComponents = sortedEntries ( dataDsIn ( pages, false ) ).flatMap ( ( [ name, dataD ] ) => dataD.display ? [] : createReactComponent ( dataD ) )
  const pageComponents = pages.flatMap ( p => createReactPageComponent ( params, transformButtons, p ) )
  const imports = [
    `import { LensProps } from "@focuson/state";`,
    `import { Layout } from "./copied/layout";`,
    `import { RestButton } from "./copied/rest";`,
    `import { ListNextButton, ListPrevButton } from "./copied/listNextPrevButtons";`,
    `import { PageSelectionAndRestCommandsContext } from '@focuson/focuson';`,
    `import {  focusedPage, focusedPageWithExtraState,  ModalButton, ModalCancelButton, ModalCommitButton, fullState,pageState} from "@focuson/pages";`,
    `import { Context, FocusedProps } from "./${params.commonFile}";`,
    `import { Lenses } from '@focuson/lens';`,
    `import { Guard } from "./copied/guard";`
  ]
  let pageDomain = noExtension ( params.pageDomainsFile );
  let domain = noExtension ( params.domainsFile );
  const pageDomainsImports = pages.filter ( p => p.pageType === 'MainPage' ).map ( p => `import {${pageDomainName ( p )}} from "./${pageDomain}";` )
  const domainImports = sortedEntries ( dataDsIn ( pages ) ).map ( ( [ name, dataD ] ) => `import {${domainName ( dataD )}} from "./${domain}"` )
  return [ ...imports, ...makeComponentImports ( pages ), ...pageDomainsImports, ...domainImports, ...pageComponents, ...dataComponents ]
}


export function makeComponentImports<B> ( ps: PageD<B>[] ): string[] {
  let allItemsWithDisplay: DisplayCompD[] = sortedEntries ( dataDsIn ( ps ) ).flatMap ( ( [ d, n ] ) => sortedEntries ( n.structure ).map ( a => a[ 1 ].dataDD ) ).filter ( d => d.display ).map ( d => d.display );
  return unique ( allItemsWithDisplay, d => `${d.import}/${d.name}` ).map ( d => `import { ${d.name} } from '${d.import}';` )
}