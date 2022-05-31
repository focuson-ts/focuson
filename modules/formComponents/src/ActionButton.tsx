import { LensState } from "@focuson/state";

export interface ActionButtonProps<S, C> {
  id: string;
  state: LensState<S, any, C>;
  action: ( s: LensState<S, any, C> , id: string) => void;
  text: string;
  enabledBy?: boolean;
}

export function ActionButton<S, C> ( { id, state, action, text, enabledBy }: ActionButtonProps<S, C> ) {
  return <button id={id} onClick={() => action ( state , id)} disabled={enabledBy === false}>{text}</button>
}