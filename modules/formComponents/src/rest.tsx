import { HasRestCommandL } from "@focuson/rest";
import { LensState, reasonFor } from "@focuson/state";
import { DateFn, RestAction, RestResult } from "@focuson/utils";
import { CommonStateProps, CustomButtonType, getButtonClassName } from "./common";
import { HasPageSelectionLens, HasSimpleMessageL, hasValidationErrorAndReport, replaceBasePath } from "@focuson/pages";
// import {CustomButtonType} from '@focuson/forms'

// export interface CustomButtonType {
//   buttonType?: 'primary' | 'secondary' | 'default'
// }

export interface RestButtonProps<S, C> extends CommonStateProps<S, any, C>, CustomButtonType {
  rest: string;
  action: RestAction;
  confirm?: boolean | string;
  result?: RestResult;
  enabledBy?: boolean;
  validate?: boolean;
  deleteOnSuccess?: string | string[];
  dateFn?: DateFn
}

function confirmIt ( c: boolean | string | undefined ) {
  if ( c === undefined || c === false ) return true
  const text = (typeof c === 'string') ? c : 'Are you sure'
  return window.confirm ( text )
}
export function RestButton<S, C extends HasRestCommandL<S> & HasSimpleMessageL<S> & HasPageSelectionLens<S>> ( props: RestButtonProps<S, C> ) {
  const { id, rest, action, result, state, name, confirm, validate, dateFn, deleteOnSuccess, enabledBy, buttonType } = props
  
  function onClick () {
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return
    if ( confirmIt ( confirm ) )
      state.copyWithLens ( state.context.restL ).transform ( old => [ ...old, { restAction: action, name: rest, deleteOnSuccess } ], reasonFor ( 'RestButton', 'onClick', id ) )
  }

  return <button disabled={enabledBy === false} onClick={onClick} className={getButtonClassName(buttonType)}>{name}</button>
}
