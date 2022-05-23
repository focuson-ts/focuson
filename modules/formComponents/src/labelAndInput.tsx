import { BooleanValidations, CommonStateProps, NumberValidations, StringValidations } from "./common";
import { BooleanInput, cleanInputProps, Input, } from "./input";
import { Label } from "./label";
import { BooleanTransformer, NumberTransformer, StringTransformer } from "./transformers";
import { NameAnd, safeArray } from "@focuson/utils";
import { ButtonFromPage } from "./buttonFromPage";
import { FocusOnContext } from "@focuson/focuson";

export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string;
  defaultValue?: string | number
  value?: string | number;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[]
  noLabel?: boolean
}

export interface TransformerProps<T> {
  transformer: ( s: string ) => T,
  type: string;
  default: T;
}
export function makeButtons ( allButtons: NameAnd<JSX.Element>, buttons?: string[] ) {
  return safeArray ( buttons ).map ( ( b, i ) =>
    <ButtonFromPage key={b} button={b} buttons={allButtons}/> )
}

const LabelAndTInput = <T extends any, P> ( tProps: TransformerProps<T> ) =>
  <S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, T, Context> & P ) => {
    const label = <Label state={props.state} htmlFor={props.name} label={props.label}/>;
    const input = Input<S, T, P> ( tProps )<LabelAndInputProps<S, T, Context> & P, Context> ( props );
    return <div className='labelValueButton'> {props.noLabel ? '' : label}{input}{makeButtons ( props.allButtons, props.buttons )}</div>
  }

export function LabelAndBooleanInput<S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, boolean, Context> ) {
  const { state, mode, readonly } = props
  const label = <Label state={props.state} htmlFor={props.name} label={props.label}/>;
  const input = <BooleanInput {...props}/>
  return <div className='labelValueButton checkbox-container'> {label}{input}{makeButtons ( props.allButtons, props.buttons )}</div>
}


export const LabelAndStringInput = LabelAndTInput<string, StringValidations> ( StringTransformer )
export const LabelAndNumberInput = LabelAndTInput<number, NumberValidations> ( NumberTransformer )

