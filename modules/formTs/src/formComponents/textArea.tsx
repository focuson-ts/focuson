import React from 'react';
import { LensProps } from '@focuson/state';
import {TextAreaInput} from "./textAreaInput";
import {CommonStateProps} from "./common";

export interface TextAreaProps<S, T, Context> extends CommonStateProps<S, T, Context> {
    maxLength?: number;
    label?: string;
    text?: string
}

export function TextArea<S, Context>({ maxLength, state, ariaLabel, label, id, mode, name }: TextAreaProps<S, string, Context>) {
    return (<TextAreaInput name={name} mode={mode} ariaLabel={ariaLabel} label={label} id={id} maxLength={maxLength} state={state} />);
}
