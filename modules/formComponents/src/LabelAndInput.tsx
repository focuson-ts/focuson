import { BooleanValidations, CommonStateProps, NumberValidations, StringValidations } from "./common";
import { Input, } from "./Input";
import { Label } from "./Label";
import React from "react";
import { BooleanTransformer, NumberTransformer, StringTransformer } from "./transformers";

export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string;
  defaultValue?: string | number
  value?: string | number
}

export interface TransformerProps<T> {
  transformer: ( s: string ) => T,
  type: string;
  default: T;
}

const LabelAndTInput = <T extends any, P> ( tProps: TransformerProps<T> ) =>
  <S, Context> ( props: LabelAndInputProps<S, T, Context> & P ) =>
    <div><Label htmlFor={props.name} label={props.label}/>{Input ( tProps )<S, P, LabelAndInputProps<S, T, Context> & P, Context> ( props )}</div>;

export const LabelAndStringInput = LabelAndTInput<string, StringValidations> ( StringTransformer )
export const LabelAndNumberInput = LabelAndTInput<number, NumberValidations> ( NumberTransformer )
export const LabelAndBooleanInput = LabelAndTInput<boolean, BooleanValidations> ( BooleanTransformer )
