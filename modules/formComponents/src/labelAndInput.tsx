import { CommonStateProps, InputOnChangeProps, LabelAlignment } from "./common";
import { BooleanInput, Input, } from "./input";
import { Label } from "./label";
import { BooleanTransformer, BooleanYNTransformer, NumberTransformer, StringTransformer } from "./transformers";
import { BooleanValidations, defaultDateFn, NameAnd, NumberValidations, SimpleMessage, stringToSimpleMsg, StringValidations, toArray } from "@focuson/utils";
import { FocusOnContext, HasPathToLens } from "@focuson/focuson";
import { LensState } from "@focuson/state";
import { Transform } from "@focuson/lens";
import { InputChangeCommands, inputCommandProcessors, InputProcessorsConfig, processChangeCommandProcessor } from "@focuson/rest";
import { makeButtons } from "./makeButtons";
import { HasSimpleMessageL } from "@focuson/pages";

export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment, InputOnChangeProps<S, Context> {
  label?: string;
  defaultValue?: string | number
  value?: string | number;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  noLabel?: boolean;
  enabledBy?: boolean;
  placeholder?: string;
}

export interface StringProps<T> { // T is the type that we are displaying/editing. V is the value expected by the target. boolean if a checkbox, but otherwise a string
  transformer: ( s: string ) => T,
  type: string;
  default: T | undefined;
}
export function isStringProps<T> ( p: TransformerProps<T> ): p is StringProps<T> {
  const a: any = p
  return a.type
}
export interface CheckboxProps<T> { // T is the type that we are displaying/editing. V is the value expected by the target. boolean if a checkbox, but otherwise a string
  transformer: ( b: boolean ) => T,
  checkbox: ( t: T | undefined ) => boolean
  default: T | undefined;
}
export function isCheckboxProps<T> ( p: TransformerProps<T> ): p is CheckboxProps<T> {
  const a: any = p
  return a.checkbox
}

export type TransformerProps<T> = StringProps<T> | CheckboxProps<T>

export function makeInputChangeTxs<S, C extends HasSimpleMessageL<S> & HasPathToLens<S>> ( id: string, parentState: LensState<S, any, C> | undefined, change?: InputChangeCommands | InputChangeCommands[] ): Transform<S, any>[] {
  if ( parentState === undefined ) return []
  const { simpleMessagesL, pathToLens } = parentState.context
  const config: InputProcessorsConfig<S, SimpleMessage> = {
    toPathTolens: pathToLens ( parentState.main, parentState.optional ),
    stringToMsg: stringToSimpleMsg ( defaultDateFn, 'info' ),
    messageL: simpleMessagesL,
    s: parentState.main
  };
  return processChangeCommandProcessor ( `Modal button.${id}`, inputCommandProcessors ( config ) ( parentState.main ), toArray ( change ) );
}

const LabelAndTInput = <T extends any, P> ( tProps: TransformerProps<T> ) =>
  <S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, T, Context> & P ) => {
    const label = <Label state={props.state} htmlFor={props.id} label={props.label}/>;
    const input = Input<S, T, P> ( tProps )<LabelAndInputProps<S, T, Context> & P, Context> ( props );
    const buttonClasses = props.buttons && props.buttons.length > 0 ? [ 'inputAndButtons' ] : []
    const checkboxClasses = isCheckboxProps ( tProps ) ? [ 'checkbox-container' ] : []
    const allClasses = [ ...buttonClasses, ...checkboxClasses ];
    const classes = allClasses.length > 0 ? allClasses.join ( ' ' ) : ''

    return <div className={`labelValueButton ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}> {props.noLabel ? '' : label}
      <div className={`${classes}`}>{input}{makeButtons ( props )}</div>
    </div>
  }

export const LabelAndStringInput = LabelAndTInput<string, StringValidations> ( StringTransformer )
export const LabelAndNumberInput = LabelAndTInput<number, NumberValidations> ( NumberTransformer )
export const LabelAndBooleanInput = LabelAndTInput<boolean, BooleanValidations> ( BooleanTransformer )
export const LabelAndYNBooleanInput = LabelAndTInput<string, BooleanValidations> ( BooleanYNTransformer )

