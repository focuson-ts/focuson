import { FocusOnContext } from '@focuson/focuson';
import { reasonFor } from '@focuson/state';
import { NameAnd } from '@focuson/utils';

import { CommonStateProps, InputEnabledProps, InputOnChangeProps, LabelAlignment } from "./common";
import { Label } from './label';
import { makeButtons, makeInputChangeTxs } from './labelAndInput';

export interface TextareaProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment, InputOnChangeProps<S, Context> {
  maxLength?: number
  readonly?: boolean
  defaultValue?: string
  value?: string
  buttons?: string[]
  scrollAfter?: string;
  noLabel?: boolean;
}

export const cleanTextareaProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result = { ...p }

  delete result.label
  delete result.allButtons
  delete result.state
  delete result.readOnly
  delete result.enabledBy
  delete result.parentState
  delete result.scrollAfter
  delete result.noLabel
  return result
};

export function TextAreaInput<S, T, Context extends FocusOnContext<S>> ( props: TextareaProps<S, string, Context> ) {
  const { id, state, mode, readonly, scrollAfter, parentState, onChange } = props

  return (
    <textarea
      style={scrollAfter ? { height: scrollAfter, overflow: 'auto' } : undefined}
      {...cleanTextareaProps ( props )}
      onChange={( e ) => {
        state.massTransform ( reasonFor ( 'TextAreaInput', 'onChange', id ) ) ( [ state.optional, () => e.target.value ], ...makeInputChangeTxs ( id, parentState, onChange ) );
      }}
      readOnly={mode === 'view' || readonly}
      value={`${state.optJsonOr ( '' )}`}
      className="input"
    />
  );
}

export interface LabelAndTextareaProps<S, T, Context> extends TextareaProps<S, T, Context>, LabelAlignment, InputEnabledProps {
  label: string;
  scrollAfter?: string;
  allButtons: NameAnd<JSX.Element>;
}

export function LabelAndTextarea<S, T, Context extends FocusOnContext<S>> ( props: LabelAndTextareaProps<S, string, Context> ) {
  const { id, label, name, state, labelPosition, buttons, allButtons, noLabel } = props

  return (
    <div className={`labelValueButton ${labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}>
      {noLabel ? '' : <Label state={state} htmlFor={id} label={label}/>}
      <div className={`${buttons && buttons.length > 0 ? 'inputAndButtons' : ''}`}>
        <TextAreaInput  {...props} readonly={props.readonly=== true || props.enabledBy===false}/>{makeButtons ( allButtons, buttons ) }</div>
    </div>
  );
}
