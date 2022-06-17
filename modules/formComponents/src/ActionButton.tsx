import { LensState } from "@focuson/state";

export interface ActionButtonProps<S, C> {
  id: string;
  state: LensState<S, any, C>;
  path2?: LensState<S, any, C>;
  path3?: LensState<S, any, C>;
  action: ( s: LensState<S, any, C>, id: string, path2?: LensState<S, any, C>, path3?: LensState<S, any, C> ) => void;
  text: string;
  enabledBy?: boolean;
}

export function ActionButton<S, C> ( { id, state, action, text, enabledBy, path2, path3 }: ActionButtonProps<S, C> ) {
  return <button id={id} onClick={() => action ( state, id, path2, path3 )} disabled={enabledBy === false}>{text}</button>
}