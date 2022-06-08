import { HasRestCommandL } from "@focuson/rest";
import { reasonFor } from "@focuson/state";
import { DateFn, RestAction, RestResult } from "@focuson/utils";
import { CommonStateProps, CustomButtonType, getButtonClassName } from "./common";
import { getRefForValidateLogicToButton, HasPageSelectionLens, HasSimpleMessageL, hasValidationErrorAndReport } from "@focuson/pages";

export interface RestButtonProps<S, C> extends CommonStateProps<S, any, C>, CustomButtonType {
  rest: string;
  action: RestAction;
  confirm?: boolean | string;
  result?: RestResult;
  enabledBy?: boolean;
  validate?: boolean;
  text?: string;
  deleteOnSuccess?: string | string[];
  messageOnSuccess?: string;
  dateFn?: DateFn
}

function confirmIt ( c: boolean | string | undefined ) {
  if ( c === undefined || c === false ) return true
  const text = (typeof c === 'string') ? c : 'Are you sure'
  return window.confirm ( text )
}
export function RestButton<S, C extends HasRestCommandL<S> & HasSimpleMessageL<S> & HasPageSelectionLens<S>> ( props: RestButtonProps<S, C> ) {
  const { id, rest, action, result, state, text, confirm, validate, dateFn, deleteOnSuccess, enabledBy, name, messageOnSuccess, buttonType } = props
  const ref = getRefForValidateLogicToButton ( id,validate, enabledBy )
  function onClick () {
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return
    if ( confirmIt ( confirm ) )
      state.copyWithLens ( state.context.restL ).transform ( old => [ ...old, { restAction: action, name: rest, deleteOnSuccess, messageOnSuccess } ], reasonFor ( 'RestButton', 'onClick', id ) )
  }

  return <button ref={ref} onClick={onClick} className={getButtonClassName ( buttonType )}>{text ? text : name}</button>
}
