import { CommonStateProps, InputEnabledProps, InputOnChangeProps, NumberValidations, StringValidations } from "./common";
import { reasonFor } from "@focuson/state";
import React from "react";
import { makeInputChangeTxs, TransformerProps } from "./labelAndInput";
import { NumberTransformer, StringTransformer } from "./transformers";
import { NameAnd } from "@focuson/utils";

import { FocusOnContext } from "@focuson/focuson";

export interface InputProps<S, T, Context> extends CommonStateProps<S, T, Context>, InputOnChangeProps<S, Context>, InputEnabledProps {
  defaultValue?: string | number;
  readonly?: boolean;
  enums?: NameAnd<string>;
}

export const cleanInputProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result = { ...p }

  delete result.allButtons
  delete result.state
  delete result.parentState
  delete result.readonly
  delete result.ariaLabel
  delete result.noLabel
  delete result.scrollAfter
  delete result.enabledBy
  return result
};

export const Input = <S, T extends any, P> ( tProps: TransformerProps<T> ) => {
  const { transformer, type } = tProps
  return <Props extends InputProps<S, T, Context> & P, Context extends FocusOnContext<S>> ( props: Props ) => {
    const { state, mode, id, parentState, onChange, readonly, enabledBy } = props
    const onChangeEventHandler = ( transformer: ( s: string ) => T, e: React.ChangeEvent<HTMLInputElement> ) => {
      if ( type === 'checkbox' ) throw Error ( 'Input processing checkbox' )
      state.massTransform ( reasonFor ( 'Input', 'onChange', id ) ) ( [ state.optional, () => e.target.value ], ...makeInputChangeTxs ( id, parentState, onChange ) );
    };

    return <input className="input" type={type} {...cleanInputProps ( props )}
                  disabled={enabledBy === false}
                  value={`${state.optJsonOr ( tProps.default )}`}
                  readOnly={mode === 'view' || readonly} onChange={( e ) => onChangeEventHandler ( transformer, e )}/>
  }
}

export function BooleanInput<S, Context extends FocusOnContext<S>> ( props: InputProps<S, boolean, Context> ) {
  const { state, mode, id, parentState, onChange, readonly, enabledBy } = props
  const onChangeEventHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => state.massTransform ( reasonFor ( 'BooleanInput', 'onChange', id ) ) ( [ state.optional, () => e.target.checked ], ...makeInputChangeTxs ( id, parentState, onChange ) );
  return <><input type='checkbox' {...cleanInputProps ( props )}
                  checked={state.optJsonOr ( false )}
                  disabled={mode === 'view' || readonly}
                  onChange={( e ) => onChangeEventHandler ( e )}/>
    <span className="checkmark"></span>
  </>

}

export function StringInput<S, Context extends FocusOnContext<S>> ( props: InputProps<S, string, Context> & StringValidations ): JSX.Element {return Input<S, string, StringValidations> ( StringTransformer ) ( props )}
export function NumberInput<S, Context extends FocusOnContext<S>> ( props: InputProps<S, number, Context> & NumberValidations ): JSX.Element {return Input<S, number, NumberValidations> ( NumberTransformer ) ( props )}

