import { HasRestCommandL } from "@focuson/rest";
import { reasonFor } from "@focuson/state";
import { DateFn, RestAction, RestResult } from "@focuson/utils";
import { CommonStateProps } from "./common";
import { HasPageSelectionLens, HasSimpleMessageL, hasValidationErrorAndReport, replaceBasePath } from "@focuson/pages";

export interface RestButtonProps<S, C> extends CommonStateProps<S, any, C> {
  rest: string;
  action: RestAction;
  confirm?: boolean | string;
  result?: RestResult;
  validate?: boolean;
  dateFn?: DateFn
}

function confirmIt ( c: boolean | string | undefined ) {
  if ( c === undefined || c === false ) return true
  const text = (typeof c === 'string') ? c : 'Are you sure'
  return window.confirm ( text )
}
export function RestButton<S, C extends HasRestCommandL<S> & HasSimpleMessageL<S> & HasPageSelectionLens<S>> ( props: RestButtonProps<S, C> ) {
  const { id, rest, action, result, state, name, confirm, validate, dateFn } = props
  function onClick () {
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return
    if ( confirmIt ( confirm ) )
      state.copyWithLens ( state.context.restL ).transform ( old => [ ...old, { restAction: action, name: rest } ], reasonFor ( 'RestButton', 'onClick', id ) )
  }

  return <button onClick={onClick}>{name}</button>
}
