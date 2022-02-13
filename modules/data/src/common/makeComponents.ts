import { AllDataDD, isDataDd, isRepeatingDd, PrimitiveDD } from "./dataD";
import { DisplayCompD, DisplayCompParamD } from "./componentsD";


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

export function listComponentsIn ( path: string[], displayParams: ComponentDisplayParams | undefined, dataDD: AllDataDD ): AllComponentData[] {
  const { display } = dataDD
  if ( isDataDd ( dataDD ) )
    if ( display ) return [ { path, displayParams, dataDD, display } ]
    else if ( dataDD ) return Object.entries ( dataDD.structure ).flatMap ( ( [ name, child ] ) => listComponentsIn ( [ ...path, name.toString () ], child.displayParams, child.dataDD ) )
  if ( isRepeatingDd ( dataDD ) ) return [ { path, dataDD, displayParams, display: dataDD.display } ]
  const p: PrimitiveDD = dataDD
  if ( display ) return [ { path, displayParams, dataDD, display } ]
  else return [ { path, dataDD, error: `Component ${JSON.stringify ( dataDD )} with displayParams [${JSON.stringify ( displayParams )}] does not have a display` } ]
}

function addQuote ( s: string | string[] ) {
  if ( Array.isArray ( s ) ) return "{[" + s.map ( x => "'" + x + "'" ) + "]}"
  return "'" + s + "'"
}
export function createOneReact ( { path, dataDD, display, displayParams }: ComponentData ): string[] {
  const { name, params } = display
  const focusOnString = path.map ( v => `.focusOn('${v}')` ).join ( '' )
  const dataDDParamsA: [ string, string ][] = dataDD.displayParams ? Object.entries ( dataDD.displayParams ).map ( ( [ name, o ] ) => [ name, addQuote ( o.value ) ] ) : []
  const defaultParams: [ string, string ][] = Object.entries ( display.params ).flatMap ( ( [ name, param ] ) => {
    return param.needed === 'defaultToCamelCaseOfName' ? [ [ name, addQuote ( path.slice(-1) + "CC" ) ] ] : []
  } )
  const displayParamsA: [ string, string ][] = displayParams ? Object.entries ( displayParams ).map ( ( [ name, value ] ) => [ name, addQuote ( value ) ] ) : []
  const fullDisplayParams = Object.entries(Object.fromEntries ( [ ...defaultParams, ...dataDDParamsA, ...displayParamsA ] ))
  const displayParamsString = fullDisplayParams.map ( ( [ k, v ] ) => `${k}=${v}` ).join ( " " )
  return [ `<${name} state={state${focusOnString}} ${displayParamsString} />` ]

}
export function createAllReactCalls ( d: AllComponentData[] ): string[] {
  return d.flatMap ( d => isErrorComponentData ( d ) ? [ d.error ] : createOneReact ( d ) )
}
