import { LensState, reasonFor } from "@focuson/state";
import { disabledFrom, NameAnd, SimpleMessage } from "@focuson/utils";
import { wrapWithErrors } from "@focuson/pages";
import { CommandButtonChangeCommands, commandButtonCommandProcessors, ModalProcessorsConfig, processChangeCommandProcessor } from "@focuson/rest";
import { Transform } from "@focuson/lens";
import { FocusOnContext, makeProcessorsConfig } from "@focuson/focuson";
import { CustomButtonType, getButtonClassName } from "./common";

export interface ActionButtonProps<S, C> extends CustomButtonType{
  id: string;
  state: LensState<S, any, C>;
  paths: NameAnd<( s: LensState<S, any, C> ) => LensState<S, any, C>>
  action: ( s: LensState<S, any, C>, id: string, paths: NameAnd<LensState<S, any, C>> ) => Transform<S, any>[];
  text: string;
  enabledBy?: string[][];
  preCommands: CommandButtonChangeCommands[]
  postCommands: CommandButtonChangeCommands[]
}

export function ActionButton<S, C extends FocusOnContext<S>> ( { id, state, action, text, enabledBy, paths, preCommands, postCommands, buttonType }: ActionButtonProps<S, C> ) {
  const pathsAsLens = Object.fromEntries ( Object.entries ( paths ).map ( ( [ name, fn ] ) => [ name, fn ( state ) ] ) )
  function onClick ( e: any ) {
    const errorPrefix = `Action button ${id}`
    const config: ModalProcessorsConfig<S, SimpleMessage> = makeProcessorsConfig ( state.main, state.context )
    const processor = commandButtonCommandProcessors ( config ) ( state.main )
    const pre: Transform<S, any>[] = processChangeCommandProcessor ( errorPrefix, processor, preCommands )
    const actions: Transform<S, any>[] = action ( state, id, pathsAsLens )
    const post: Transform<S, any>[] = processChangeCommandProcessor ( errorPrefix, processor, postCommands )
    const txs: Transform<S, any>[] = [ ...pre, ...actions, ...post ]
    state.massTransform ( reasonFor ( 'ActionButton', 'onClick', id ) ) ( ...txs )
  }
  return wrapWithErrors ( id, enabledBy, [], ( errorProps, error ) =>
    <button id={id} onClick={onClick} {...errorProps}  className={getButtonClassName ( buttonType )} disabled={error}>{text}</button> )
}