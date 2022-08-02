import { LensProps, reasonFor } from "@focuson/state";
import { displayTransformsInState, Transform } from "@focuson/lens";
import { SimpleMessage } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "./common";
import { CommandButtonChangeCommands, commandButtonCommandProcessors, modalCommandProcessors, ModalProcessorsConfig, processChangeCommandProcessor } from "@focuson/rest";
import { FocusOnContext, makeProcessorsConfig } from "@focuson/focuson";


export interface CommandButtonProps<S, C> extends LensProps<S, any, C>, CustomButtonType {
  id: string;
  enabledBy?: boolean;
  label: string;
  commands: CommandButtonChangeCommands[]
}

export function CommandButton<S, C extends FocusOnContext<S>> ( { id, state, label, commands, buttonType, enabledBy }: CommandButtonProps<S, C> ) {
  function onClick () {
    const errorPrefix = `CommandButton ${id}`;
    const s: S = state.optJson ()
    const config: ModalProcessorsConfig<S, SimpleMessage> = makeProcessorsConfig ( state.main, state.context )
    const txs: Transform<S, any>[] = processChangeCommandProcessor ( errorPrefix, commandButtonCommandProcessors ( config ) ( state.main ), commands )
    const txsa: any = txs
    const display = displayTransformsInState<S> ( state.main, txsa );
    console.log ( errorPrefix, display )
    if ( txs.length === 0 ) return
    state.massTransform ( reasonFor ( 'CommandButton', 'onClick', id ) ) ( ...txs )
  }
  return <button id={id} disabled={enabledBy === false} onClick={onClick} className={getButtonClassName ( buttonType )}>{label}</button>
}