import { LensState } from "@focuson/state";
import { disabledFrom, NameAnd } from "@focuson/utils";
import { wrapWithErrors } from "@focuson/pages";

export interface ActionButtonProps<S, C> {
  id: string;
  state: LensState<S, any, C>;
  paths: NameAnd<( s: LensState<S, any, C> ) => LensState<S, any, C>>
  action: ( s: LensState<S, any, C>, id: string, paths: NameAnd<LensState<S, any, C>> ) => void;
  text: string;
  enabledBy?: string[][];
}

export function ActionButton<S, C> ( { id, state, action, text, enabledBy, paths }: ActionButtonProps<S, C> ) {
  const pathsAsLens = Object.fromEntries ( Object.entries ( paths ).map ( ( [ name, fn ] ) => [ name, fn ( state ) ] ) )
  return  wrapWithErrors ( id, enabledBy, [],( errorProps, error ) =>
    <button id={id} onClick={() => action ( state, id, pathsAsLens )} {...errorProps} disabled={error}>{text}</button>)
}