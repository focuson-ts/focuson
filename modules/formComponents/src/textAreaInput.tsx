import { FocusOnContext } from '@focuson/focuson';
import { reasonFor } from '@focuson/state';
import { NameAnd } from '@focuson/utils';

import { CommonStateProps, LabelAlignment } from "./common";
import { Label } from './label';
import { makeButtons } from './labelAndInput';

export interface TextareaProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment {
  maxLength?: number
  readonly?: boolean
  defaultValue?: string
  value?: string
  buttons?: string[]
  noLabel?: boolean;
}

export const cleanTextareaProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result = { ...p }

  delete result.label
  delete result.allButtons
  delete result.state
  delete result.readonly
  delete result.ariaLabel
  delete result.noLabel
  return result
};

export function TextAreaInput<S, T, Context> (props: TextareaProps<S, string, Context> ) {
  const { id, state, mode, readonly } = props
  
  return (
        <textarea
        {...cleanTextareaProps ( props )}
        onChange={( e ) =>
          state.setJson ( e.target?.value, reasonFor ( 'TextAreaInput', 'onChange', id ) )}
        readOnly={mode === 'view' || readonly}
        value={`${state.optJsonOr ('')}`}
        className="input"
      />
  );
}

export interface LabelAndTextareaProps<S, T, Context> extends TextareaProps<S, T, Context>, LabelAlignment {
  label: string;
  allButtons: NameAnd<JSX.Element>;
}

export function LabelAndTextarea<S, T, Context extends FocusOnContext<S>> ( props: LabelAndTextareaProps<S, string, Context> ) {
  const { id, label, name, state, labelPosition, buttons, allButtons, noLabel } = props
  return (
    <div className={`labelValueButton ${labelPosition == 'Horizontal'? 'd-flex-inline' : ''}`}>
      {noLabel ? '' : <Label state={state} htmlFor={name} label={label}/>}
      <div className={`${buttons && buttons.length > 0 ? 'inputAndButtons' : ''}`}>
        <TextAreaInput {...props}/>{makeButtons ( allButtons, buttons )}
      </div>
    </div>
  );
}
