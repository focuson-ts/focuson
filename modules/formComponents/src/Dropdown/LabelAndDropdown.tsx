import { NameAnd } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { CommonStateProps } from "../common";
import { Label } from "../Label";
import { ButtonFromPage } from "../buttonFromPage";
import { makeButtons } from "../LabelAndInput";


export interface LabelAndDropdownProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label: string;
  enums: NameAnd<string>;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[]
}

export function LabelAndDropdown<S, T, Context> ( props: LabelAndDropdownProps<S, string, Context> ) {
  const { enums, state, ariaLabel, id, mode, label, name, buttons } = props
  console.log ( Object.entries ( enums ) )
  console.log ( enums[ state.json () ] )
  return (<div>
      <Label htmlFor={name} label={label}/>
      <select style={{ height: '32px' }} disabled={mode === 'view'} id={id} aria-label={ariaLabel} onChange={( e ) =>
        state.setJson ( e.target.value, reasonFor ( 'LabelAndDropdown', 'onChange', id ) )}>
        {
          Object.entries ( enums ).map ( ( [ name, value ], key ) => (
            <option selected={value === enums[ state.json () ]} key={key} value={name}>{value}</option>
          ) )}
      </select>{makeButtons ( props.allButtons, props.buttons )}
    </div>
  )
}