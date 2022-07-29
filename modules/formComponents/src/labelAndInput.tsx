import { CommonStateProps, InputOnChangeProps, LabelAlignment } from "./common";
import { BooleanInput, Input, } from "./input";
import { Label } from "./label";
import { NumberTransformer, StringTransformer } from "./transformers";
import { defaultDateFn, NameAnd, NumberValidations, SimpleMessage, stringToSimpleMsg, StringValidations, toArray } from "@focuson/utils";
import { FocusOnContext, HasPathToLens } from "@focuson/focuson";
import { LensState } from "@focuson/state";
import { Optional, Transform } from "@focuson/lens";
import { InputChangeCommands, inputCommandProcessors, InputProcessorsConfig, ModalProcessorsConfig, processChangeCommandProcessor } from "@focuson/rest";
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
}

export interface TransformerProps<T> {
  transformer: ( s: string ) => T,
  type: string;
  default: T;
}
export function makeInputChangeTxs<S, C extends HasSimpleMessageL<S> & HasPathToLens<S>> ( id: string, parentState: LensState<S, any, C> | undefined, change?: InputChangeCommands | InputChangeCommands[] ): Transform<S, any>[] {
  if ( parentState === undefined ) return []
  const { simpleMessagesL, pathToLens } = parentState.context
  const config: InputProcessorsConfig<S, SimpleMessage> = {
    pageNameFn<S> ( s: S ): string {
      return "";
    },
    tagHolderL: parentState.context.ta,
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
    return <div className={`labelValueButton ${props.labelPosition == 'Horizontal' ? 'd-flex-inline' : ''}`}> {props.noLabel ? '' : label}
      <div className={`${props.buttons && props.buttons.length > 0 ? 'inputAndButtons' : ''}`}>{input}{makeButtons ( props )}</div>
    </div>
  }

export function LabelAndBooleanInput<S, Context extends FocusOnContext<S>> ( props: LabelAndInputProps<S, boolean, Context> ) {
  const { state, mode, readonly } = props
  const label = <Label state={props.state} htmlFor={props.id} label={props.label}/>;
  const input = <BooleanInput {...props}/>
  return <div className={`${props.buttons && props.buttons.length > 0 ? 'checkbox-container inputAndButtons' : 'checkbox-container'}`}> {label}{input}{makeButtons ( props )}</div>
}

export const LabelAndStringInput = LabelAndTInput<string, StringValidations> ( StringTransformer )
export const LabelAndNumberInput = LabelAndTInput<number, NumberValidations> ( NumberTransformer )

