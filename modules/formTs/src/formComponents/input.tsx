import { BooleanValidations, CommonStateProps, NumberValidations, StringValidations } from "./common";
import { reasonFor } from "@focuson/state";
import React from "react";
import { TransformerProps } from "./labelAndInput";
import { BooleanTransformer, NumberTransformer, StringTransformer } from "./transformers";
import { NameAnd } from "@focuson/utils";

export interface InputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  defaultValue?: string | number;
  readonly?: boolean;
  enums?: NameAnd<string>;
}

export const cleanInputProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result = { ...p }

  delete result.allButtons
  delete result.state
  delete result.readonly
  delete result.ariaLabel
  return result
};

export const Input = <S, T extends any, P> ( tProps: TransformerProps<T> ) => {
  const { transformer, type } = tProps
  return <Props extends InputProps<S, T, Context> & P, Context> ( props: Props ) => {
    const { state, mode, id, name, ariaLabel, defaultValue, readonly } = props
    const onChange = ( transformer: ( s: string ) => T, e: React.ChangeEvent<HTMLInputElement> ) =>
      state.setJson ( transformer ( e.target.value ), reasonFor ( 'Input', 'onChange', id ) );
    return <input type={type} {...cleanInputProps ( props )} value={`${state.optJsonOr ( tProps.default )}`} readOnly={mode === 'view' || readonly} onChange={( e ) => onChange ( transformer, e )}/>
  }
}

export function StringInput<S, Context> ( props: InputProps<S, string, Context> & StringValidations ): JSX.Element {return Input<S, string, StringValidations> ( StringTransformer ) ( props )}
export function NumberInput<S, Context> ( props: InputProps<S, number, Context> & NumberValidations ): JSX.Element {return Input<S, number, NumberValidations> ( NumberTransformer ) ( props )}
export function BooleanInput<S, Context> ( props: InputProps<S, boolean, Context> & BooleanValidations ): JSX.Element {return Input<S, boolean, BooleanValidations> ( BooleanTransformer ) ( props )}

