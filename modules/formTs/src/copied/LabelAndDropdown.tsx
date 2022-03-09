import { NameAnd, sortedEntries } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { CommonStateProps } from "./common";
import { Label } from "./Label";

export interface LabelAndDropdownProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label: string;
  enums: NameAnd<string>;
  defaultValue?: string;
}

export function LabelAndDropdown<S, T, Context> ( { enums, state, defaultValue, ariaLabel, id, mode, label, name }: LabelAndDropdownProps<S, string, Context> ) {
  return (<div>
      <Label htmlFor={name} label={label}/>
      <select disabled={mode === 'view'} id={id} aria-label={ariaLabel} defaultValue={defaultValue} onChange={( e ) =>
        state.setJson ( e.target.value , reasonFor('LabelAndDropdown', 'onChange', id))}>
        {sortedEntries ( enums ).map ( ( [ name, value ], key ) => (
          <option key={key} value={name}>{value}</option>
        ) )}
      </select>
    </div>
  )
}