import { LensProps, reasonFor } from "@focuson/state";
import { displayTransformsInState, Transform } from "@focuson/lens";
import { SimpleMessage } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "./common";
import { CommandButtonChangeCommands, commandButtonCommandProcessors, ModalProcessorsConfig, processChangeCommandProcessor } from "@focuson/rest";
import { FocusOnContext, makeProcessorsConfig } from "@focuson/focuson";
import { getRefForValidateLogicToButton, PageSelection, wrapWithErrors } from "@focuson/pages";


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
    const config: ModalProcessorsConfig<S, SimpleMessage,PageSelection> = makeProcessorsConfig ( state.main, state.context )
    const txs: Transform<S, any>[] = processChangeCommandProcessor ( errorPrefix, commandButtonCommandProcessors ( config ) ( state.main ), commands )
    const txsa: any = txs
    const display = displayTransformsInState<S> ( state.main, txsa );
    console.log ( errorPrefix, display )
    if ( txs.length === 0 ) return
    state.massTransform ( reasonFor ( 'CommandButton', 'onClick', id ) ) ( ...txs )
  }
  return wrapWithErrors ( id, enabledBy, [], ( errorProps, error, errorRef, allErrors ) =>
    <button ref={getRefForValidateLogicToButton ( state ) ( id, false, validate, allErrors, errorRef )}
            id={id} {...errorProps} disabled={error} onClick={onClick} className={getButtonClassName ( buttonType )}>{label}</button> )
}