import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps } from "./common";
import { NameAnd } from "@focuson/utils";
import {Label} from "./label";
import {Radio} from "./radio";

export enum yesNo {
    YES = 'Yes',
    NO  = 'No'
}

export interface OptionalProps<S, T, Context> extends CommonStateProps<S, T, Context> {
    label?: string;
    allButtons: NameAnd<JSX.Element>;
}

export function Optional<S, T, Context extends FocusOnContext<S>> ( { id, state, label, mode, ariaLabel, name }: OptionalProps<S, string, Context> ) {
    return (
        <div>
            <Label state={state} label={label} htmlFor={name}/>
            <div>
                <Radio id={id} state={state} mode={mode} ariaLabel={ariaLabel} enums={yesNo}/>
            </div>
        </div>
    );
}
