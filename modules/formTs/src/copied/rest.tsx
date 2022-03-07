import { RestAction, RestResult } from "@focuson/utils";
import { CommonStateProps } from "./common";

export interface RestButtonProps<S, C> extends CommonStateProps<S, any, C> {
  rest: string;
  action: RestAction;
  confirm?: boolean;
  result?: RestResult;
}

export function RestButton<S, C> ( props: RestButtonProps<S, C> ) {
  const { id, rest, action, confirm, result, state, name } = props
  return <button {...props}>{name}</button>
}
