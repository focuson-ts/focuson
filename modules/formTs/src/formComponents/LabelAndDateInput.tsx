import { NameAnd } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps } from "./common";
import { Label } from "./label";
import { makeButtons } from "./labelAndInput";


export interface LabelAndDateProps<S, Context> extends CommonStateProps<S, string, Context> {
  label: string;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[]
}

export function LabelAndDateInput<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDateProps<S, Context> ) {
  const { state, ariaLabel, id, mode, label, name, buttons } = props
  const onChange = ( e: any ) => state.setJson ( e.target.value, reasonFor ( 'LabelAndDate', 'onChange', id ) );
  return (<div className='labelAndDate'>
      <Label state={state} htmlFor={name} label={label}/>
      <input {...props} type='date' onChange={onChange} value={state.json () }/>
      {makeButtons ( props.allButtons, props.buttons )}
    </div>
  )
}