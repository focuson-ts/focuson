import { FocusOnContext } from '@focuson/focuson';
import { reasonFor } from '@focuson/state';
import { disabledFrom, NameAnd } from '@focuson/utils';

import { CommonStateProps, InputEnabledProps, InputOnChangeProps, LabelAlignment } from "./common";
import { Label } from './label';
import { makeInputChangeTxs } from './labelAndInput';
import { makeButtons } from "./makeButtons";
import { CustomError, setEdited } from "./CustomError";

export interface TextareaProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment, InputOnChangeProps<S, Context> {
  maxlength?: number
  readonly?: boolean
  defaultValue?: string
  value?: string
  buttons?: string[]
  errorMessage?: string
  scrollAfter?: string;
  noLabel?: boolean;
  enabledBy?: string[][]
}

export const cleanTextareaProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result: any = { ...p }

  delete result.label
  delete result.allButtons
  delete result.state
  delete result.errorMessage
  delete result.readOnly
  delete result.enabledBy
  delete result.parentState
  delete result.scrollAfter
  delete result.noLabel
  result[ 'maxlength' ] = result[ 'maxlength' ]
  delete result.maxLength
  return result
};

export function TextAreaInput<S, T, Context extends FocusOnContext<S>> ( props: TextareaProps<S, string, Context> ) {
  const { id, state, mode, readonly, scrollAfter, parentState, onChange, enabledBy, errorMessage } = props

  return (
    <textarea
      style={scrollAfter ? { height: scrollAfter, overflow: 'auto' } : undefined}
      {...cleanTextareaProps ( props )}
      data-errormessage={errorMessage}
      onChange={( e ) => {
        setEdited ( e?.target )
        state.massTransform ( reasonFor ( 'TextAreaInput', 'onChange', id ) ) ( [ state.optional, () => e.target.value ], ...makeInputChangeTxs ( id, parentState, onChange ) );
      }}
      readOnly={mode === 'view' || readonly || disabledFrom ( enabledBy )}
      value={`${state.optJsonOr ( '' )}`}
      className="input"
    />
  );
}

export interface LabelAndTextareaProps<S, T, Context> extends TextareaProps<S, T, Context>, LabelAlignment, InputEnabledProps {
  label: string;
  scrollAfter?: string;
  allButtons: NameAnd<JSX.Element>;
  maxlength?: number,
  placeholder?: string
}

export function LabelAndTextarea<S, T, Context extends FocusOnContext<S>> ( props: LabelAndTextareaProps<S, string, Context> ) {
  const { id, label, name, state, labelPosition, buttons, noLabel, errorMessage } = props

  return (
    <div className={`labelValueButton ${labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}>
      {noLabel ? '' : <Label state={state} htmlFor={id} label={label}/>}
      <div className={`${buttons && buttons.length > 0 ? 'inputAndButtons' : ''}`}>
        <TextAreaInput  {...props} />{makeButtons ( props )}  </div>
      <CustomError id={props.id} validationMessage={errorMessage}/>
    </div>
  );
}
