import { AllDataDD, AllDataFlatMap, AllDataFolder, DataD, emptyDataFlatMap, flatMapDD, foldDataDD, isDataDd, isRepeatingDd, OneDataDD, PrimitiveDD, RepeatingDataD } from "../common/dataD";
import { DisplayCompD, DisplayCompParamD } from "../common/componentsD";
import { on } from "cluster";
import { dataDsIn, PageD } from "../common/pageD";
import { EAccountsSummaryDD } from "../example/eAccountsSummary.dataD";

import { sortedEntries } from "@focuson/utils";
import { componentName, domainName, pageComponentName } from "./names";
import { makeButtonsFrom } from "./makeButtons";
import { indentList } from "./codegen";


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
    `function ${componentName ( dataD )}<S>({state}: LensProps<S, ${domainName ( dataD )}>){`,
    "  return(<>",
    ...contents,
    "</>)",
    '}'
  ]
}
export function createReactPageComponent ( pageD: PageD ): string[] {
  const { dataDD, layout, target } = pageD.display
  return [
    `function ${pageComponentName ( pageD )}<S>({state}: LensProps<S, ${domainName ( dataDD )}>){`,
    `  return (<${layout.name}  details='${layout.details}'>`,
    `   <${componentName ( dataDD )} state={state} />`,
    ...indentList ( indentList ( indentList ( makeButtonsFrom ( pageD ) ) ) ),
    `   </${layout.name}>)`,
    "}"
  ]
}

export function createAllReactComponents ( pages: PageD[] ): string[] {
  const dataComponents = sortedEntries ( dataDsIn ( pages, true ) ).flatMap ( ( [ name, dataD ] ) => dataD.display ? [] : createReactComponent ( dataD ) )
  const pageComponents = pages.flatMap ( createReactPageComponent )
  return [ ...pageComponents, ...dataComponents ]
}
