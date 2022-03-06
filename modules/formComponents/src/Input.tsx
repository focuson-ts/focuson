import { CommonStateProps } from "./common";
import { LensState, reasonFor } from "@focuson/state";
import React from "react";
import { TransformerProps } from "./LabelAndInput";
import { BooleanTransformer, NumberTransformer, StringTransformer } from "./transformers";
import { NameAnd } from "@focuson/utils";

export interface InputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  defaultValue?: string | number
  value?: string | number
  enums?: NameAnd<string>
}


export const Input = <T extends any> ( tProps: TransformerProps<T> ) => {
  const { transformer, type } = tProps
  return <S, Context> ( { state, mode, id, name, ariaLabel, defaultValue, value }: InputProps<S, T, Context> ) => {
    function onChange ( transformer: ( s: string ) => T, e: React.ChangeEvent<HTMLInputElement> ) {
      state.setJson ( transformer ( e.target.value ), reasonFor ( 'Input', 'onChange', id ) )
    }
    return <input type={type}
                  id={id}
                  readOnly={mode === 'view'}
                  name={name}
                  value={value}
                  aria-label={ariaLabel}
                  defaultValue={defaultValue}
                  onChange={( e ) => onChange ( transformer, e )}
    />
  }
}

const InputString = Input<string> ( StringTransformer )
const InputNumber = Input<number> ( NumberTransformer )
const InputBoolean = Input<boolean> ( BooleanTransformer )

export function StringInput<S, Context> ( { mode, state, ariaLabel, id, name, defaultValue }: InputProps<S, string, Context> ) {
  return <InputString value={state.optJson ()} name={name} id={id} state={state} mode={mode} ariaLabel={ariaLabel} defaultValue={defaultValue}/>
}
export function NumberInput<S, Context> ( { mode, state, ariaLabel, id, name, defaultValue }: InputProps<S, number, Context> ) {
  return <InputNumber value={state.optJson ()} name={name} id={id} state={state} mode={mode} ariaLabel={ariaLabel} defaultValue={defaultValue}/>
}
export function CheckboxInput<S, Context> ( { mode, state, ariaLabel, id, name }: InputProps<S, boolean, Context> ) {
  return <InputBoolean name={name} id={id} state={state} mode={mode} ariaLabel={ariaLabel}/>
}
