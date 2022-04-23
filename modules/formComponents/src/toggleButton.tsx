import { LensProps, reasonFor } from '@focuson/state';
import { replaceTextUsingPath } from "@focuson/focuson";
import { PageSelectionContext } from "@focuson/pages";
import {Lenses} from "@focuson/lens";


export interface ToggleButtonProps<S, T, Context> extends LensProps<S, boolean, Context> {
    id: string;
    buttonText: string;
}

export function ToggleButton<S, T, Context extends PageSelectionContext<S>> ( props: ToggleButtonProps<S, boolean, Context> ) {
    const { id, state, buttonText }=props
    const text = replaceTextUsingPath(state,buttonText)
    return (<button {...props} onClick={() => state.setJson ( !state.optJson (), reasonFor ( 'ToggleButton', 'onClick', id ) )}>{text !== 'undefined' ? text : "+"}</button>)
}

export interface ToggleJsonButtonProps<S, T, Context> extends ToggleButtonProps<S, boolean, Context> {
    count: number;
}

export function ToggleJsonButton<S, T, Context extends PageSelectionContext<S>> ( { id, state, buttonText, count }: ToggleJsonButtonProps<S, boolean, Context> ) {
    const debugState = state.copyWithLens ( Lenses.identity<any> ().focusQuery ( 'debug' ) )
    return (<>
        <ToggleButton id={id} buttonText={`{/debug/${id}|+|-}`} state={debugState.focusOn ( id )}/>
        <span className="json-key">
            <span>{'"'}{id}{'":'}</span>
            <span className="extra-info">{count} items</span>
          </span>
    </>)
}