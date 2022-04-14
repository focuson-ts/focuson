import { LensProps, reasonFor } from '@focuson/state';
import { replaceTextUsingPath } from "@focuson/focuson";
import { PageSelectionContext } from "@focuson/pages";


export interface ToggleButtonProps<S, T, Context> extends LensProps<S, boolean, Context> {
    id: string;
    buttonText: string;
}

export function ToggleButton<S, T, Context extends PageSelectionContext<S>> ( { id, state, buttonText }: ToggleButtonProps<S, boolean, Context> ) {
    const text = replaceTextUsingPath(state,buttonText)
    return (<button onClick={() => state.setJson ( !state.optJson (), reasonFor ( 'ToggleButton', 'onClick', id ) )}>{text}</button>)
}
