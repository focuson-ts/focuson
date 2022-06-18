import { isRestStateChange, RestAction, RestStateChange, safeObject, sortedEntries } from "@focuson/utils";
import { ButtonCreator, makeIdForButton } from "./makeButtons";
import { ModalOrMainButtonInPage } from "../buttons/modalButtons";
import { AllLensRestParams, RestD, RestParams, RestStateDetails } from "../common/restD";
import { parsePath, stateCodeBuilder } from "@focuson/lens";
import { getRestTypeDetails } from "@focuson/rest";

export const importsDot = ( ...names: string[] ): string[] => names.map ( name => {
  const s = noExtension ( name )
  return `import * as ${s} from './${s}';`
} );
export const importsDotDot = ( ...names: string[] ): string[] => names.map ( name => {
  const s = noExtension ( name )
  return `import * as ${s} from '../${s}';`
} );

export function noExtension ( name: string ) {
  const int = name.lastIndexOf ( '.' )
  if ( int < 0 ) return name;
  return name.substr ( 0, int )
}

export const addStringToEndOfAllButLast = ( ch: string ) => ( ss: string[] ): string[] =>
  ss.map ( ( s, i ) => i < ss.length - 1 ? s + ch : s );
export const addStringToStartOfFirst = ( str: string ) => ( ss: string[] ): string[] =>
  ss.length === 0 ? [ str ] : ss.map ( ( s, i ) => i === 0 ? str + s : s );
export const addStringToEndOfList = ( str: string ) => ( ss: string[] ): string[] =>
  ss.map ( ( s, i ) => i === ss.length - 1 ? s + str : s );
export const addBrackets = ( strOpen: string, strClose: string ) => ( ss: string[] ): string[] =>
  addStringToStartOfFirst ( strOpen ) ( addStringToEndOfList ( strClose ) ( ss ) )

export const indent = ( path: string[], s: string ): string => ' '.repeat ( path.length * 2 + 2 ) + s;
export const indentList = ( ss: string[] ): string[] => ss.map ( s => '  ' + s )
export const lensFocusQueryFor = ( path: string ) => parsePath ( path, stateCodeBuilder ( { '~': 'pageIdL', '/': 'identityL' }, 'pageId' ) )
export const stateFocusQueryForRepl = ( s: 'state' | 'pageState' | 'fullState', path: string ) => `state: ${s} - ${path}`

export const focusOnFor = ( path: string[] ) => path.map ( p => `.focusOn('${p}')` ).join ( '' )


export function opt ( name: string, p: string | undefined ) {
  return p !== undefined ? [ `${name}='${p}'` ] : []
}

export function optT<T> ( name: string, p: T | undefined ) {
  return p !== undefined ? [ `${name}={${JSON.stringify ( p )}}` ] : []
}
export function optObj<T> ( name: string, p: string | undefined ) {
  return p !== undefined ? [ `${name}={${p}}` ] : []
}
export const makeSimpleButton: <G> ( imp: string ) => ButtonCreator<ModalOrMainButtonInPage<G>, G> = imp => ({
  import: imp,
  makeButton: ( { name, button } ) =>
    [ [ `<${button.control} id=${makeIdForButton ( button.text ? button.text : name )} state={state}`,
      ...opt ( 'text', button.text ),
      ...opt ( 'buttonType', button.buttonType ? button.buttonType : 'secondary' ),
      '/>' ].join ( ' ' ) ]
})

function stateParams ( errorPrefix: string, rest: RestD<any>, restAction: RestStateChange ): RestParams {
  const stateDetails: RestStateDetails | undefined = safeObject ( rest.states )[ restAction.state ]
  if ( stateDetails === undefined ) throw Error ( `${errorPrefix} Cannot find state ${restAction.state} Legal values are ${Object.keys ( safeObject ( rest.states ) )}` )
  if ( Array.isArray ( stateDetails.params ) ) throw Error ( `${errorPrefix} Breaking change introduced in v1.16. state params are no longer an array of strings, but instead just like normal params` )
  return stateDetails.params

}

const filterParamsByRestAction = ( errorPrefix: string, rest: RestD<any>, restAction: RestAction ) => ( [ name, param ]: [ string, AllLensRestParams<any> ] ): boolean => {
  return isRestStateChange ( restAction ) ? true : getRestTypeDetails ( restAction ).params.needsId ? true : !param.main;
}
export function paramsForRestAction ( errorPrefix: string, rest: RestD<any>, restAction: RestAction ) {
  const params: RestParams = isRestStateChange ( restAction ) ? stateParams ( errorPrefix, rest, restAction ) : rest.params
  return sortedEntries ( params ).filter ( filterParamsByRestAction ( errorPrefix, rest, restAction ) )
}
