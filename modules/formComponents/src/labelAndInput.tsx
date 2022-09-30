import { CommonStateProps, InputOnChangeProps, LabelAlignment } from "./common";
import { Input, } from "./input";
import { Label } from "./label";
import { BooleanTransformer, BooleanYNTransformer, isCheckboxProps, NumberTransformer, StringTransformer, TransformerProps } from "./transformers";
import { BooleanValidations, defaultDateFn, HasDateFn, NameAnd, NumberValidations, SimpleMessage, stringToSimpleMsg, StringValidations, toArray } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { LensState } from "@focuson/state";
import { Transform } from "@focuson/lens";
import { InputChangeCommands, inputCommandProcessors, InputProcessorsConfig, processChangeCommandProcessor } from "@focuson/rest";
import { makeButtons } from "./makeButtons";
import { HasPathToLens, HasSimpleMessageL } from "@focuson/pages";

export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context>, LabelAlignment, InputOnChangeProps<S, Context> {
  label?: string;
  defaultValue?: string | number
  value?: string | number;
  readonly?: boolean;
  allButtons: NameAnd<JSX.Element>;
  buttons?: string[];
  noLabel?: boolean;
  enabledBy?: string[][];
  placeholder?: string;
  className?: string
  onBlur?: ( e: any ) => void
}

export function makeInputChangeTxs<S, C extends HasSimpleMessageL<S> & HasPathToLens<S>& HasDateFn> ( id: string, parentState: LensState<S, any, C> | undefined, change?: InputChangeCommands | InputChangeCommands[] ): Transform<S, any>[] {
  if ( parentState === undefined ) return []
  const { simpleMessagesL, pathToLens,dateFn } = parentState.context
  const config: InputProcessorsConfig<S, SimpleMessage> = {
    dateFn,
    toPathTolens: pathToLens ( parentState.main, parentState.optional ),
    stringToMsg: stringToSimpleMsg ( defaultDateFn, 'info' ),
    messageL: simpleMessagesL,
    s: parentState.main
  };
  return processChangeCommandProcessor ( `Modal button.${id}`, inputCommandProcessors ( config ) ( parentState.main ), toArray ( change ) );
}

export const LabelAndTInput = <T extends any, P> ( tProps: TransformerProps<T> ) =>
  <S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, T, Context> & P ) => {
    const label = <Label state={props.state} htmlFor={props.id} label={props.label}/>;
    const input = Input<S, T, P> ( tProps )<LabelAndInputProps<S, T, Context> & P, Context> ( props );
    const buttonClasses = props.buttons && props.buttons.length > 0 ? [ 'inputAndButtons' ] : []
    const checkboxClasses = isCheckboxProps ( tProps ) ? [ 'checkbox-container' ] : []
    const classNameFromProps = props.className? [props.className]:[]
    const allClasses = [ ...buttonClasses, ...checkboxClasses , ...classNameFromProps];
    const classes = allClasses.length > 0 ? allClasses.join ( ' ' ) : ''

    return <div className={`labelValueButton ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}> {props.noLabel ? '' : label}
      <div className={`${classes}`}>{input}{makeButtons ( props )}</div>
    </div>
  }


export const LabelAndStringInput: <S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, string, Context> & StringValidations ) => JSX.Element =
               LabelAndTInput<string, StringValidations> ( StringTransformer )
export const LabelAndNumberInput: <S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, number, Context> & NumberValidations ) => JSX.Element =
               LabelAndTInput<number, NumberValidations> ( NumberTransformer )
export const LabelAndBooleanInput: <S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, boolean, Context> & BooleanValidations ) => JSX.Element =
               LabelAndTInput<boolean, BooleanValidations> ( BooleanTransformer )
export const LabelAndYNBooleanInput: <S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, string, Context> & BooleanValidations ) => JSX.Element =
               LabelAndTInput<string, BooleanValidations> ( BooleanYNTransformer )

