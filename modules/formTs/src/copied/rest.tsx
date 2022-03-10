import { HasRestCommandL } from "@focuson/rest";
import { reasonFor } from "@focuson/state";
import { DateFn, RestAction, RestResult } from "@focuson/utils";
import { CommonStateProps } from "./common";
import { HasSimpleMessageL, hasValidationErrorAndReport } from "@focuson/pages";

export interface RestButtonProps<S, C> extends CommonStateProps<S, any, C> {
  rest: string;
  action: RestAction;
  confirm?: boolean;
  path: string[]
  result?: RestResult;
  validate?: boolean;
  dateFn?: DateFn
}

export function RestButton<S, C extends HasRestCommandL<S> & HasSimpleMessageL<S>> ( props: RestButtonProps<S, C> ) {
  const { id, rest, action, confirm, result, state, name, path, validate, dateFn } = props
  function onClick () {
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return

    state.copyWithLens ( state.context.restL ).transform ( old => [ ...old, { restAction: action, path, name: rest } ], reasonFor ( 'RestButton', 'onClick', id ) )
  }
  return <button {...props} onClick={onClick}>{name}</button>
}
