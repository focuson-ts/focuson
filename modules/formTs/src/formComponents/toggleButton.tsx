import { LensProps, reasonFor } from '@focuson/state';
import { replaceTextUsingPath } from "@focuson/focuson";
import { PageSelectionContext } from "@focuson/pages";



export interface ToggleButtonProps<S, T, Context> extends LensProps<S, boolean, Context> {
    id: string;
    buttonText: string;
}

export function ToggleButton<S, T, Context extends PageSelectionContext<S>> ( props: ToggleButtonProps<S, boolean, Context> ) {
    const { id, state, buttonText }=props
    const text = replaceTextUsingPath(state,buttonText)
    return (<button id={id} onClick={() => state.setJson ( !state.optJson (), reasonFor ( 'ToggleButton', 'onClick', id ) )}>{text}</button>)
}
