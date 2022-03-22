import { CommonStateProps } from "./common";
import { LensState, reasonFor } from "@focuson/state";
import React from "react";
import { TransformerProps } from "./labelAndInput";
import { BooleanTransformer, NumberTransformer, StringTransformer } from "./transformers";
import { NameAnd } from "@focuson/utils";

export interface InputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  defaultValue?: string | number

  enums?: NameAnd<string>
}


export const Input = <T extends any> ( tProps: TransformerProps<T> ) => {
  const { transformer, type } = tProps
  return <S, P, Props extends InputProps<S, T, Context> & P, Context> ( props: Props ) => {
    const { state, mode, id, name, ariaLabel, defaultValue } = props
    const onChange = ( transformer: ( s: string ) => T, e: React.ChangeEvent<HTMLInputElement> ) =>
      state.setJson ( transformer ( e.target.value ), reasonFor ( 'Input', 'onChange', id ) );
    return <input type={type} {...props} value={`${state.optJsonOr ( tProps.default )}`} readOnly={mode === 'view'} onChange={( e ) => onChange ( transformer, e )}/>
  }
}

export const InputString = Input<string> ( StringTransformer )
export const InputNumber = Input<number> ( NumberTransformer )
export const InputBoolean = Input<boolean> ( BooleanTransformer )

