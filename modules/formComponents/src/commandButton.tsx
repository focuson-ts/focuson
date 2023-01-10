import { LensProps, reasonFor } from "@focuson-nw/state";
import { Transform } from "@focuson-nw/lens";
import { SimpleMessage } from "@focuson-nw/utils";
import { CustomButtonType, getButtonClassName } from "./common";
import { CommandButtonChangeCommands, commandButtonCommandProcessors, InputProcessorsConfig, processChangeCommandProcessor } from "@focuson-nw/rest";
import { FocusOnContext, makeInputProcessorsConfig } from "@focuson-nw/focuson";
import { getRefForValidateLogicToButton, PageSelection, wrapWithErrors } from "@focuson-nw/pages";


export interface CommandButtonProps<S, C> extends LensProps<S, any, C>, CustomButtonType {
  id: string;
  validate?: boolean;
  enabledBy?: string[][];
  label: string;
  commands: CommandButtonChangeCommands[]
}

export function CommandButton<S, C extends FocusOnContext<S>> ( { id, state, label, commands, buttonType, enabledBy, validate }: CommandButtonProps<S, C> ) {
  function onClick () {
    const errorPrefix = `CommandButton ${id}`;
    const s: S = state.optJson ()
    const config: InputProcessorsConfig<S, SimpleMessage,PageSelection,C> = makeInputProcessorsConfig ( state.main, state.context )
    const processor = commandButtonCommandProcessors ( config ) ( state.main );
    const txs: Transform<S, any>[] = processChangeCommandProcessor ( errorPrefix, processor, commands )
    if ( txs.length === 0 ) return
    state.massTransform ( reasonFor ( 'CommandButton', 'onClick', id ) ) ( ...txs )
  }
  return wrapWithErrors ( id, enabledBy, [], ( errorProps, error, errorRef, allErrors ) =>
    <button ref={getRefForValidateLogicToButton ( state ) ( id, false, validate, allErrors, errorRef )}
            id={id} {...errorProps} disabled={error} onClick={onClick} className={getButtonClassName ( buttonType )}>{label}</button> )
}