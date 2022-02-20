import { AllDataDD, AllDataFlatMap, AllDataFolder, DataD, emptyDataFlatMap, flatMapDD, foldDataDD, isDataDd, isRepeatingDd, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { DisplayCompD, DisplayCompParamD } from "../common/componentsD";
import { on } from "cluster";
import { dataDsIn, PageD } from "../common/pageD";
import { EAccountsSummaryDD } from "../example/eAccountsSummary.dataD";

import { sortedEntries } from "@focuson/utils";
import { componentName, pageDomainName, domainName, pageComponentName } from "./names";
import { makeButtonsFrom } from "./makeButtons";
import { indentList, noExtension } from "./codegen";
import { TSParams } from "./config";


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
  const { name, params } = display
  const focusOnString = path.map ( v => `.focusOn('${v}')` ).join ( '' )
  const dataDDParamsA: [ string, string ][] = dataDD.displayParams ? Object.entries ( dataDD.displayParams ).map ( ( [ name, o ] ) => [ name, addQuote ( o.value ) ] ) : []
  const defaultParams: [ string, string ][] = Object.entries ( display.params ).flatMap ( ( [ name, param ] ) => {
    return param.needed === 'defaultToCamelCaseOfName' ? [ [ name, addQuote ( path.slice ( -1 ) + "CC" ) ] ] : []
  } )
  const displayParamsA: [ string, string ][] = displayParams ? Object.entries ( displayParams ).map ( ( [ name, value ] ) => [ name, addQuote ( value ) ] ) : []
  const fullDisplayParams = Object.entries ( Object.fromEntries ( [ ...defaultParams, ...dataDDParamsA, ...displayParamsA ] ) )
  const displayParamsString = fullDisplayParams.map ( ( [ k, v ] ) => `${k}=${v}` ).join ( " " )
  return [ `<${name} state={state${focusOnString}} ${displayParamsString} />` ]

}
export function createAllReactCalls ( d: AllComponentData[] ): string[] {
  return d.flatMap ( d => isErrorComponentData ( d ) ? [ d.error ] : createOneReact ( d ) )
}

export function createReactComponent ( dataD: DataD ): string[] {
  const contents = indentList ( indentList ( createAllReactCalls ( listComponentsIn ( dataD ) ) ) )
  return [
    `export function ${componentName ( dataD )}<S>({state}: LensProps<S, ${domainName ( dataD )}>){`,
    "  return(<>",
    ...contents,
    "</>)",
    '}'
  ]
}


export function createReactPageComponent ( pageD: PageD ): string[] {
  if ( pageD.pageType === 'ModalPage' ) return [ `// Not creating modal page for ${pageD.name} yet` ]
  if ( pageD.pageType === 'MainPage' ) return createReactMainPageComponent ( pageD )
  throw new Error ( `Unknown page type ${pageD.pageType} in ${pageD.name}` )
}

export function createReactMainPageComponent ( pageD: PageD ): string[] {
  const { dataDD, layout } = pageD.display
  let target = `${pageD.display.target.join ( '.' )}`;
  return [
    `export function ${pageComponentName ( pageD )}<S>(){`,
    `  return focusedPageWithExtraState<S, ${pageDomainName ( pageD )}, ${domainName ( pageD.display.dataDD )}> ( s => '${target}' ) ( s => s.focusOn ( '${target}' ) ) (
    ( fullState, state ) => {`,
    `  return (<${layout.name}  details='${layout.details}'>`,
    `   <${componentName ( dataDD )} state={state} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom ( pageD ) ) ) ),
    `   </${layout.name}>)})}`
  ]
}

export function createAllReactComponents ( params: TSParams, pages: PageD[] ): string[] {
  const dataComponents = sortedEntries ( dataDsIn ( pages, true ) ).flatMap ( ( [ name, dataD ] ) => dataD.display ? [] : createReactComponent ( dataD ) )
  const pageComponents = pages.flatMap ( createReactPageComponent )
  const imports = [
    `import { LensProps } from "@focuson/state";`,
    `import { Layout } from "./copied/layout";`,
    `import { ModalButton, ModalCancelButton, ModalCommitButton } from "./copied/modal";`,
    `import { RestButton } from "./copied/rest";`,
    `import { LabelAndInput } from "./copied/LabelAndInput";`,
    `import { focusedPageWithExtraState } from "@focuson/pages";`,
    `import { Table } from "./copied/table";`,
  ]
  let pageDomain = noExtension ( params.pageDomainsFile );
  let domain = noExtension ( params.domainsFile );
  const pageDomainsImports = pages.filter ( p => p.pageType === 'MainPage' ).map ( p => `import {${pageDomainName ( p )}} from "./${pageDomain}";` )
  const domainImports = sortedEntries ( dataDsIn ( pages ) ).map ( ( [ name, d ] ) => `import {${domainName ( d )}} from "./${domain}"` )
  return [ ...imports, ...pageDomainsImports, ...domainImports, ...pageComponents, ...dataComponents ]
}
