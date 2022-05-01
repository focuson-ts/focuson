import { RestAction } from "@focuson/utils";
import { ButtonCreator, makeIdForButton } from "./makeButtons";
import { ModalButtonInPage } from "../buttons/modalButtons";
import { AllLensRestParams } from "../common/restD";
import { parsePath, stateCodeBuilder } from "@focuson/lens";
import { PageD } from "../common/pageD";
import { pageDomainName } from "./names";
import { TSParams } from "./config";
import { stateCodeBuilderWithSlashAndTildaFromIdentity } from "./lens";

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
export const addBrackets = ( strOpen: string, strClose ) => ( ss: string[] ): string[] =>
  addStringToStartOfFirst ( strOpen ) ( addStringToEndOfList ( strClose ) ( ss ) )

export const indent = ( path: string[], s: string ): string => ' '.repeat ( path.length * 2 + 2 ) + s;
export const indentList = ( ss: string[] ): string[] => ss.map ( s => '  ' + s )
export const lensFocusQueryFor = ( path: string ) => parsePath ( path, stateCodeBuilder ( { '': '', '~': '', '/': '' }, 'changeMe' ) ) //TODO This clearly needs sorting out.
export const stateFocusQueryForRepl = ( s: 'state' | 'pageState' | 'fullState', path: string ) => `state: ${s} - ${path}`

export const focusOnFor = ( path: string[] ) => path.map ( p => `.focusOn('${p}')` ).join ( '' )


export function opt ( name: string, p: string | undefined ) {
  return p !== undefined ? [ `${name}='${p}'` ] : []
}

export function optT<T> ( name: string, p: T | undefined ) {
  return p !== undefined ? [ `${name}={${JSON.stringify ( p )}}` ] : []
}
export const makeSimpleButton: <G> ( imp: string ) => ButtonCreator<ModalButtonInPage<G>, G> = imp => ({
  import: imp,
  makeButton: ( { name, button } ) =>
    [ `<${button.control} id=${makeIdForButton ( button.text ? button.text : name )} state={state} />` ]
})
export const filterParamsByRestAction = ( restAction: RestAction ) => ( [ name, param ]: [ string, AllLensRestParams ] ) => restAction === 'list' || restAction === 'create' ? !param.main : true
