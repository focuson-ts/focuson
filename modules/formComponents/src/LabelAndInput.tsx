import { BooleanValidations, CommonStateProps, NumberValidations, StringValidations } from "./common";
import { Input, } from "./Input";
import { Label } from "./Label";
import { BooleanTransformer, NumberTransformer, StringTransformer } from "./transformers";
import { NameAnd } from "@focuson/utils";
import { ButtonFromPage } from "./buttonFromPage";

export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string;
  defaultValue?: string | number
  value?: string | number;
  buttons: NameAnd<JSX.Element>;
  button?: string
}

export interface TransformerProps<T> {
  transformer: ( s: string ) => T,
  type: string;
  default: T;
}

const LabelAndTInput = <T extends any, P> ( tProps: TransformerProps<T> ) =>
  <S, Context> ( props: LabelAndInputProps<S, T, Context> & P ) => {
    const label = <Label htmlFor={props.name} label={props.label}/>;
    const input = Input ( tProps )<S, P, LabelAndInputProps<S, T, Context> & P, Context> ( props );
    return < div className='labelValueButton'> {label}{input} <ButtonFromPage button={props.button} buttons={props.buttons}/></div>
  }

export const LabelAndStringInput = LabelAndTInput<string, StringValidations> ( StringTransformer )
export const LabelAndNumberInput = LabelAndTInput<number, NumberValidations> ( NumberTransformer )
export const LabelAndBooleanInput = LabelAndTInput<boolean, BooleanValidations> ( BooleanTransformer )
