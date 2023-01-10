import { CommonStateProps } from "./common";
import { LabelAndBooleanInput } from "./labelAndInput";
import { FocusOnContext } from "@focuson-nw/focuson";
import { LensState } from "@focuson-nw/state";


export interface CheckboxAndNumberProps<S, Context> extends CommonStateProps<S, boolean, Context> {
  number: LensState<S, number, Context>
  label: string;
  allButtons?: {}
}

export function CheckboxAndNumber<S, Context extends FocusOnContext<S>> ( props: CheckboxAndNumberProps<S, Context> ) {
  return <span><LabelAndBooleanInput {...props} allButtons={{}}/><input className='input' type='number' value={props.number.optJsonOr(0)} readOnly={true}/></span>
}