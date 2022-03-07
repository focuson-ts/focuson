import { HasRestCommandL } from "@focuson/rest";
import { reasonFor } from "@focuson/state";
import { RestAction, RestResult } from "@focuson/utils";
import { CommonStateProps } from "./common";

export interface RestButtonProps<S, C> extends CommonStateProps<S, any, C> {
  rest: string;
  action: RestAction;
  confirm?: boolean;
  path: string[]
  result?: RestResult;
}

export function RestButton<S, C extends HasRestCommandL<S>> ( props: RestButtonProps<S, C> ) {
  const { id, rest, action, confirm, result, state, name, path } = props
  function onClick () {state.copyWithLens ( state.context.restL ).transform ( old => [ ...old, { restAction: action, path, name: rest } ], reasonFor ( 'RestButton', 'onClick', id ) )}
  return <button {...props} onClick={onClick}>{name}</button>
}
