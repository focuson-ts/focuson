import { FocusOnContext } from '@focuson/focuson';
import { reasonFor } from '@focuson/state';
import { NameAnd } from '@focuson/utils';
import React from 'react';

import { CommonStateProps, LabelAlignment } from "./common";
import { cleanInputProps } from './input';
import { Label } from './label';
import { makeButtons } from './labelAndInput';

export interface TextareaProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment {
  maxLength?: number;
  readonly?: boolean
  label?: string
  defaultValue?: string
  value?: string
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  noLabel?: boolean;
}

export const cleanTextareaProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result = { ...p }

  delete result.allButtons
  delete result.state
  delete result.readonly
  delete result.ariaLabel
  delete result.noLabel
  return result
};

export function TextAreaInput<S, T, Context> (props: TextareaProps<S, string, Context> ) {
  const { id, label, maxLength, state, defaultValue, value, labelPosition,buttons, allButtons, mode, required, ariaLabel, readonly } = props
  const onChange = ( s?: string ) => { if ( s ) state.setJson ( s, reasonFor ( 'TextAreaInput', 'onChange', id ) ); };
  return (
    <div className={`labelValueButton ${labelPosition == 'Horizontal'? 'd-flex-inline' : ''}`}>
      {label && <label>{label} </label>}
      <div className={`${buttons && buttons.length > 0 ? 'inputAndButtons' : ''}`}>
        <textarea
        {...cleanTextareaProps ( props )}
        onChange={( e ) =>
          state.setJson ( e.target.value, reasonFor ( 'TextAreaInput', 'onChange', id ) )}
        // onChange={( e ) => onChange ( e.target?.value )}
        readOnly={mode === 'view' || readonly}
        value={`${state.optJsonOr ('')}`}
        className="input"
      />
      </div>
    </div>
  );
}
