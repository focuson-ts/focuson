import { CommonStateProps } from "./common";
import {
  Input,
} from "./Input";
import {Label} from "./Label";
import React from "react";
import {BooleanTransformer, NumberTransformer, StringTransformer} from "./transformers";

export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string;
  defaultValue?: string | number
  value?: string | number
}

export interface TransformerProps<T> {
  transformer: ( s: string ) => T,
  type: string
}

const LabelAndTInput = <T extends any> ( tProps: TransformerProps<T> ) =>
    <S, Context> ( props: LabelAndInputProps<S, T, Context> ) =>
        <div><Label htmlFor={props.name} label={props.label}/>{Input ( tProps ) ( props )}</div>;

const LabelAndInputString = LabelAndTInput<string> ( StringTransformer )
const LabelAndInputNumber = LabelAndTInput<number> ( NumberTransformer )
const LabelAndInputBoolean = LabelAndTInput<boolean> ( BooleanTransformer )

export function LabelAndStringInput<S, Context> ( { mode, state, ariaLabel, id, label, name}: LabelAndInputProps<S, string, Context> ) {
  return <LabelAndInputString name={name} value={state.optJson()} id={id} state={state} mode={mode} ariaLabel={ariaLabel} label={label}/>
}
export function LabelAndNumberInput<S, Context> ( { mode, state, ariaLabel, id, label, name}: LabelAndInputProps<S, number, Context> ) {
  return <LabelAndInputNumber name={name} defaultValue={state.optJson()} id={id} state={state} mode={mode} ariaLabel={ariaLabel} label={label}/>
}
export function LabelAndBooleanInput<S, Context> ( { mode, state, ariaLabel, id, label, name}: LabelAndInputProps<S, boolean, Context> ) {
  return <LabelAndInputBoolean name={name} id={id} state={state} mode={mode} ariaLabel={ariaLabel} label={label}/>
}