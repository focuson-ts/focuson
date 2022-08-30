import { CommonStateProps, InputEnabledProps, InputOnChangeProps } from "./common";
import { reasonFor } from "@focuson/state";
import React from "react";
import { CheckboxProps, isCheckboxProps, makeInputChangeTxs, StringProps, TransformerProps } from "./labelAndInput";
import { BooleanTransformer, BooleanYNTransformer, NumberTransformer, StringTransformer } from "./transformers";
import { BooleanValidations, disabledFrom, NameAnd, NumberValidations, StringValidations } from "@focuson/utils";

import { FocusOnContext } from "@focuson/focuson";

export interface InputProps<S, T, Context> extends CommonStateProps<S, T, Context>, InputOnChangeProps<S, Context>, InputEnabledProps {
  defaultValue?: string | number;
  placeholder?: string;
  readonly?: boolean;
  enums?: NameAnd<string>;
}

export const cleanInputProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result = { ...p }

  delete result.allButtons
  delete result.state
  delete result.label
  delete result.parentState
  delete result.readonly
  delete result.ariaLabel
  delete result.noLabel
  delete result.scrollAfter
  delete result.enabledBy
  return result
};


export const Input = <S, T extends any, P> ( tProps: TransformerProps<T> ) => isCheckboxProps ( tProps ) ? CheckboxInput<S, T, P> ( tProps ) : NonCheckboxInput<S, T, P> ( tProps )

export const CheckboxInput = <S, T extends any, P> ( tProps: CheckboxProps<T> ) => {
  const { transformer, checkbox } = tProps
  return <Props extends InputProps<S, T, Context> & P, Context extends FocusOnContext<S>> ( props: Props ) => {
    const { state, mode, id, parentState, onChange, readonly, enabledBy } = props
    const onChangeEventHandler = ( e: React.ChangeEvent<HTMLInputElement> ) =>
      state.massTransform ( reasonFor ( 'BooleanInput', 'onChange', id ) ) ( [ state.optional, () => transformer ( e.target.checked ) ], ...makeInputChangeTxs ( id, parentState, onChange ) );
    return <><input type='checkbox' {...cleanInputProps ( props )}
                    checked={checkbox ( state.optJson () )}
                    disabled={disabledFrom(enabledBy) || mode === 'view' || readonly}
                    onChange={( e ) => onChangeEventHandler ( e )}/>
      <span className="checkmark"></span>
    </>
  }
}
export const NonCheckboxInput = <S, T extends any, P> ( tProps: StringProps<T> ) => {
  const { transformer, type } = tProps
  return <Props extends InputProps<S, T, Context> & P, Context extends FocusOnContext<S>> ( props: Props ) => {
    const { state, mode, id, parentState, onChange, readonly, enabledBy } = props
    const onChangeEventHandler = ( transformer: ( s: string ) => T, e: React.ChangeEvent<HTMLInputElement> ) =>
      state.massTransform ( reasonFor ( 'Input', 'onChange', id ) ) ( [ state.optional, () => transformer ( e.target.value ) ], ...makeInputChangeTxs ( id, parentState, onChange ) );
    const value: T | undefined = tProps.default === undefined ? state.optJson () : state.optJsonOr ( tProps.default );
    return <input className="input" type={type} {...cleanInputProps ( props )}
                  disabled={disabledFrom(enabledBy)}
                  value={value === undefined || value === null ? undefined : `${value}`}
                  readOnly={mode === 'view' || readonly} onChange={( e ) => onChangeEventHandler ( transformer, e )}/>
  }
}


export const StringInput = <S, Context extends FocusOnContext<S>> ( props: InputProps<S, string, Context> & StringValidations ): JSX.Element =>
  Input<S, string, StringValidations> ( StringTransformer ) ( props );

export const NumberInput = <S, Context extends FocusOnContext<S>> ( props: InputProps<S, number, Context> & NumberValidations ): JSX.Element =>
  Input<S, number, NumberValidations> ( NumberTransformer ) ( props );

export const BooleanInput = <S, Context extends FocusOnContext<S>> ( props: InputProps<S, boolean, Context> & BooleanValidations ): JSX.Element =>
  Input<S, boolean, BooleanValidations> ( BooleanTransformer ) ( props );

export const BooleanYNInput = <S, Context extends FocusOnContext<S>> ( props: InputProps<S, string, Context> & BooleanValidations ): JSX.Element =>
  Input<S, string, BooleanValidations> ( BooleanYNTransformer ) ( props );

