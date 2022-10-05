import { CommonStateProps, InputEnabledProps, InputOnChangeProps } from "./common";

import { BooleanTransformer, BooleanYNTransformer, CheckboxProps, isCheckboxProps, NumberTransformer, StringProps, StringTransformer, TransformerProps } from "./transformers";
import { BooleanValidations, disabledFrom, NameAnd, NumberValidations, StringValidations } from "@focuson/utils";

import { FocusOnContext } from "@focuson/focuson";
import { setEdited } from "./CustomError";


export interface InputProps<S, T, Context> extends CommonStateProps<S, T, Context>, InputOnChangeProps<S, Context>, InputEnabledProps {
  defaultValue?: string | number;
  placeholder?: string;
  readonly?: boolean;
  enums?: NameAnd<string>;
  onBlur?: ( e: any ) => void;
  errorMessage?: string
}

export const cleanInputProps = <T extends NameAnd<any>> ( p: T ): T => {
  const result = { ...p, 'data-validationmessage': p.label }

  delete result.allButtons
  delete result.errorMessage
  delete result.state
  delete result.label
  delete result.parentState
  delete result.readonly
  delete result.ariaLabel
  delete result.noLabel
  delete result.scrollAfter
  delete result.enabledBy
  delete result.regexForChange
  return result
};


export const Input = <S, T extends any, P> ( tProps: TransformerProps<T> ) => isCheckboxProps ( tProps ) ? CheckboxInput<S, T, P> ( tProps ) : NonCheckboxInput<S, T, P> ( tProps )

export const CheckboxInput = <S, T extends any, P> ( tProps: CheckboxProps<T> ) => {
  const { transformer, checkbox, selectFn } = tProps
  return <Props extends InputProps<S, T, Context> & P, Context extends FocusOnContext<S>> ( props: Props ) => {
    const { state, mode, id, parentState, onChange, readonly, enabledBy, onBlur, errorMessage } = props
    const onChangeEventHandler = ( e: React.ChangeEvent<HTMLInputElement> ) => {
      setEdited(e?.target)
      selectFn<S, T, Context> ( state, id, transformer ( e?.target?.checked ), parentState, onChange, true )
    }
    return <><input type='checkbox' {...cleanInputProps ( props )}
                    checked={checkbox ( state.optJson () )}
                    disabled={disabledFrom ( enabledBy ) || mode === 'view' || readonly}
                    data-errormessage={errorMessage}
                    onBlur={onBlur}
                    onChange={( e ) => onChangeEventHandler ( e )}/>
      <span className="checkmark"></span>
    </>
  }
}

export const NonCheckboxInput = <S, T extends any, P> ( tProps: StringProps<T> ) => {
  const { transformer, type, selectFn } = tProps
  if ( typeof selectFn !== 'function' ) {
    console.error ( 'selectFn', selectFn )
    throw new Error ( `selectFn must be a function it is ${selectFn}` )
  }
  return <Props extends InputProps<S, T, Context> & P, Context extends FocusOnContext<S>> ( props: Props ) => {
    const { state, mode, id, parentState, onChange, readonly, enabledBy, onBlur, regexForChange, errorMessage } = props
    const onChangeEventHandler = ( transformer: ( s: string ) => T, e: React.ChangeEvent<HTMLInputElement> ) => {
      const value = e?.target?.value;
      setEdited(e?.target)
      return selectFn<S, T, Context> ( state, id, transformer ( value ), parentState, onChange, regexForChange === undefined || value.match ( regexForChange ) !== null );
    }
    const value: T | undefined = tProps.default === undefined ? state.optJson () : state.optJsonOr ( tProps.default );
    return <input className="input" type={type} {...cleanInputProps ( props )}
                  disabled={disabledFrom ( enabledBy )}
                  onBlur={onBlur}
                  data-errormessage={errorMessage}
                  value={value === undefined || value === null ? '' : `${value}`}
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

