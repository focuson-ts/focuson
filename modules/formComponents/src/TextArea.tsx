import React from 'react';
import { LensProps } from '@focuson/state';
import {TextareaInput} from "./TextAreaInput";
import {CommonStateProps} from "./common";

export interface TextAreaProps<S, T, Context> extends CommonStateProps<S, T, Context> {
    maxLength?: number;
    label?: string;
    text?: string
}

export function TextArea<S, Context>({ maxLength, state, ariaLabel, label, id, mode, name }: TextAreaProps<S, string, Context>) {
    return (<TextareaInput name={name} mode={mode} ariaLabel={ariaLabel} label={label} id={id} maxLength={maxLength} state={state} />);
}
