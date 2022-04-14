import { CommonStateProps } from "./common";
import { reasonFor } from "@focuson/state";


export interface DropdownProps<S, T, Context> extends CommonStateProps<S, T, Context> {
    values: string[],
    defaultValue?: string
}

export function Dropdown<S, T, Context>({ values, state, defaultValue, ariaLabel, id, mode }: DropdownProps<S, string, Context>) {
    return ( <div>
            <select disabled={mode === 'view'} id={id} aria-label={ariaLabel} defaultValue={defaultValue} onChange={(e) =>
              state.setJson(e.target.value, reasonFor('Dropdown', 'onChange', id))}>
                {values.map((value: string, key)=> (
                    <option key={key} value={value}>{value}</option>
                ))}
            </select>
        </div>
    )
}