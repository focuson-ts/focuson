import { AllDataDD, AllDataFlatMap, DataD, emptyDataFlatMap, flatMapDD, isPrimDd, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { DisplayCompD } from "../common/componentsD";
import { dataDsIn, PageD } from "../common/pageD";

import { sortedEntries } from "@focuson/utils";
import { componentName, domainName, pageComponentName, pageDomainName } from "./names";
import { makeButtonsFrom } from "./makeButtons";
import { focusOnFor, indentList, noExtension } from "./codegen";
import { TSParams } from "./config";
import decamelize from 'decamelize';

export type AllComponentData = ComponentData | ErrorComponentData
export interface ComponentData {
  path: string[];
  dataDD: AllDataDD;
  display: DisplayCompD;
  displayParams?: ComponentDisplayParams
}
export interface ErrorComponentData {
  path: string[];
  error: string;
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
    dataDD.display ? [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display } ] : [],

  walkPrim: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: PrimitiveDD ): AllComponentData[] =>
    dataDD.display ?
      [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display } ] :
      [ { path, dataDD, error: `Component ${JSON.stringify ( dataDD )} with displayParams [${JSON.stringify ( oneDataDD?.displayParams )}] does not have a display` } ],

  walkRepStart: ( path: string[], parents: DataD[], oneDataDD: OneDataDD | undefined, dataDD: RepeatingDataD ): AllComponentData[] =>
    [ { path, displayParams: oneDataDD?.displayParams, dataDD, display: dataDD.display } ]
}

export const listComponentsIn = ( dataDD: AllDataDD ): AllComponentData[] => flatMapDD ( dataDD, listComponentsInFolder );

function addQuote ( s: string | string[] ) {
  if ( Array.isArray ( s ) ) return "{[" + s.map ( x => "'" + x + "'" ) + "]}"
  return "'" + s + "'"
}
export function createOneReact ( { path, dataDD, display, displayParams }: ComponentData ): string[] {
  const { name, params, needsEnums } = display
  const focusOnString = path.map ( v => `.focusOn('${v}')` ).join ( '' )
  const dataDDParamsA: [ string, string ][] = dataDD.displayParams ? Object.entries ( dataDD.displayParams ).map ( ( [ name, o ] ) => [ name, addQuote ( o.value ) ] ) : []
  const defaultParams: [ string, string ][] = Object.entries ( display.params ).flatMap ( ( [ name, param ] ) => {
    return param.needed === 'defaultToCamelCaseOfName' ? [ [ name, addQuote ( decamelize ( path.slice ( -1 ) + "", ' ' ) ) ] ] : []
  } )
  const displayParamsA: [ string, string ][] = displayParams ? Object.entries ( displayParams ).map ( ( [ name, value ] ) => [ name, addQuote ( value ) ] ) : []
  const fullDisplayParams = Object.entries ( Object.fromEntries ( [ ...defaultParams, ...dataDDParamsA, ...displayParamsA ] ) )
  const displayParamsString = fullDisplayParams.map ( ( [ k, v ] ) => `${k}=${v}` ).join ( " " )

  const enums = needsEnums && isPrimDd ( dataDD ) && dataDD.enum ? ` enums={${JSON.stringify ( dataDD.enum )}}` : ""

  return [ `<${name} state={state${focusOnString}} ${displayParamsString} mode={mode}${enums} />` ]

}
export function createAllReactCalls ( d: AllComponentData[] ): string[] {
  return d.flatMap ( d => isErrorComponentData ( d ) ? [ d.error ] : createOneReact ( d ) )
}

export function createReactComponent ( dataD: DataD ): string[] {
  const contents = indentList ( indentList ( createAllReactCalls ( listComponentsIn ( dataD ) ) ) )
  return [
    `export function ${componentName ( dataD )}<S,Context>({state,mode}: FocusedProps<S, ${domainName ( dataD )},Context>){`,
    "  return(<>",
    ...contents,
    "</>)",
    '}', ''
  ]
}


export function createReactPageComponent ( pageD: PageD ): string[] {
  if ( pageD.pageType === 'MainPage' ) return createReactMainPageComponent ( pageD )
  if ( pageD.pageType === 'ModalPage' ) return createReactModalPageComponent ( pageD )
  throw new Error ( `Unknown page type ${pageD.pageType} in ${pageD.name}` )
}

export function createReactModalPageComponent ( pageD: PageD ): string[] {
  const { dataDD, layout } = pageD.display
  const focus = focusOnFor ( pageD.display.target );
  return [
    `export function ${pageComponentName ( pageD )}<S,Context>({state, mode}: FocusedProps<S,${domainName ( pageD.display.dataDD )},Context>){`,
    `  return (<${layout.name}  details='${layout.details}'>`,
    `   <${componentName ( dataDD )} state={state}  mode={mode} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom ( pageD ) ) ) ),
    `   </${layout.name}>)}`,
    ''
  ]
}
export function createReactMainPageComponent ( pageD: PageD ): string[] {
  const { dataDD, layout } = pageD.display
  const focus = focusOnFor ( pageD.display.target );
  return [
    `export function ${pageComponentName ( pageD )}<S>(){`,
    `  return focusedPageWithExtraState<S, ${pageDomainName ( pageD )}, ${domainName ( pageD.display.dataDD )}, Context> ( s => '${pageD.name}' ) ( s => s${focus}) (
    ( fullState, state , full, d, mode) => {`,
    `  return (<${layout.name}  details='${layout.details}'>`,
    `   <${componentName ( dataDD )} state={state}  mode={mode} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom ( pageD ) ) ) ),
    `   </${layout.name}>)})}`,
    ''
  ]
}

export function createAllReactComponents ( params: TSParams, pages: PageD[] ): string[] {
  const dataComponents = sortedEntries ( dataDsIn ( pages, true ) ).flatMap ( ( [ name, dataD ] ) => dataD.display ? [] : createReactComponent ( dataD ) )
  const pageComponents = pages.flatMap ( createReactPageComponent )
  const imports = [
    `import { LensProps } from "@focuson/state";`,
    `import { Layout } from "./copied/layout";`,
    `import { ModalButton, ModalCancelButton, ModalCommitButton,ModalAndCopyButton } from "./copied/modal";`,
    `import { RestButton } from "./copied/rest";`,
    `import { LabelAndInput } from "./copied/LabelAndInput";`,
    `import { focusedPageWithExtraState } from "@focuson/pages";`,
    `import { Table } from "./copied/table";`,
    `import { LabelAndRadio, Radio } from "./copied/Radio";`,
    `import { Context, FocusedProps } from "./${params.commonFile}";`
  ]
  let pageDomain = noExtension ( params.pageDomainsFile );
  let domain = noExtension ( params.domainsFile );
  const pageDomainsImports = pages.filter ( p => p.pageType === 'MainPage' ).map ( p => `import {${pageDomainName ( p )}} from "./${pageDomain}";` )
  const domainImports = sortedEntries ( dataDsIn ( pages ) ).map ( ( [ name, d ] ) => `import {${domainName ( d )}} from "./${domain}"` )
  return [ ...imports, ...pageDomainsImports, ...domainImports, ...pageComponents, ...dataComponents ]
}
