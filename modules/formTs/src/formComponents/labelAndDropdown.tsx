import { NameAnd } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import {CommonStateProps} from "./common";
import {Label} from "./label";
import {makeButtons} from "./labelAndInput";


export interface LabelAndDropdownProps<S, T, Context> extends CommonStateProps<S, T, Context> {
    label: string;
    enums: NameAnd<string>;
    allButtons: NameAnd<JSX.Element>;
    buttons?: string[]
}

export function LabelAndDropdown<S, T, Context  extends FocusOnContext<S>> ( props: LabelAndDropdownProps<S, string, Context> ) {
    const { enums, state, ariaLabel, id, mode, label, name, buttons } = props
    const selectedName = Object.entries(enums).filter(([value, name]) => name === enums[ state.json () ] )
    return (<div>
            <Label state={state} htmlFor={name} label={label}/>
            <select value={selectedName[0][0]} style={{ height: '32px' }} disabled={mode === 'view'} id={id} aria-label={ariaLabel} onChange={( e ) =>
                state.setJson ( e.target.value, reasonFor ( 'LabelAndDropdown', 'onChange', id ) )}>
                {
                    Object.entries ( enums ).map ( ( [ value, name ], key ) => (
                        <option key={key} value={value}>{name}</option>
                    ) )}
            </select>{makeButtons ( props.allButtons, props.buttons )}
        </div>
    )
}