import { NameAnd } from "@focuson/utils";
import { reasonFor } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { CommonStateProps } from "./common";
import { Label } from "./label";
import { makeButtons } from "./labelAndInput";
import { cleanInputProps } from "./input";


export interface LabelAndDateProps<S, Context> extends CommonStateProps<S, string, Context> {
  label: string;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[]
}

export function LabelAndDateInput<S, T, Context extends FocusOnContext<S>> ( props: LabelAndDateProps<S, Context> ) {
  const { state, ariaLabel, id, mode, label, name, buttons, readonly } = props
  const onChange = ( e: any ) => state.setJson ( e.target.value, reasonFor ( 'LabelAndDate', 'onChange', id ) );
  return (<div className='labelAndDate'>
      <Label state={state} htmlFor={name} label={label}/>
      <input {...cleanInputProps ( props )} type='date' readOnly={mode === 'view' || readonly} onChange={onChange} value={state.optJsonOr ( '' )}/>
      {makeButtons ( props.allButtons, props.buttons )}
    </div>
  )
}