import { LensProps, reasonFor } from '@focuson/state';
import { FocusOnContext, replaceTextUsingPath } from "@focuson/focuson";


export interface ToggleButtonProps<S, T, Context> extends LensProps<S, boolean, Context> {
    id: string;
    buttonText: string;
}

export function ToggleButton<S, T, Context extends FocusOnContext<S>> ( { id, state, buttonText }: ToggleButtonProps<S, boolean, Context> ) {
    const text = replaceTextUsingPath(state,buttonText)
    return (<button onClick={() => state.setJson ( !state.optJson (), reasonFor ( 'ToggleButton', 'onClick', id ) )}>{text}</button>)
}
