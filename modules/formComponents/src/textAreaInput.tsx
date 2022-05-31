import { reasonFor } from '@focuson/state';
import React from 'react';

import { CommonStateProps, LabelAlignment } from "./common";

export interface TextareaProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment {
  maxLength?: number;
  label?: string
  defaultValue?: string
  value?: string | number
}

export function TextAreaInput<S, T, Context> ({ id, label, maxLength, state, defaultValue, value, labelPosition }: TextareaProps<S, string, Context> ) {
  const onChange = ( s?: string ) => { if ( s ) state.setJson ( s, reasonFor ( 'TextAreaInput', 'onChange', id ) ); };
  return (
    <div className={`${labelPosition == 'Horizontal'? 'd-flex-inline' : ''}`}>
      {label && <label>{label}: </label>}
      <textarea
        id={id}
        maxLength={maxLength}
        onChange={( e ) => onChange ( e.target?.value )}
        defaultValue={defaultValue}
        value={value}
      />
    </div>
  );
}
