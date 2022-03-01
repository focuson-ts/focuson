import { CommonStateProps } from "./common";
import { PageMode } from "@focuson/pages";
import { CheckboxInput, NumberInput, StringInput } from "./Input";
import { LensState } from "@focuson/state";


export interface LabelAndInputProps<S, T, Context> extends CommonStateProps<S, T, Context> {
  label?: string;
}

export function LabelAndStringInput<S, Context> ( { label, state, mode }: LabelAndInputProps<S, string, Context> ) {
  return <div><label>{label}</label><StringInput state={state} mode={mode}/></div>
}
export function LabelAndNumberInput<S, Context> ( { label, state, mode }: LabelAndInputProps<S, number, Context> ) {
  return <div><label>{label}</label><NumberInput state={state} mode={mode}/></div>
}
export function LabelAndCheckboxInput<S, Context> ( { label, state, mode }: LabelAndInputProps<S, boolean, Context> ) {
  return <div><label>{label}</label><CheckboxInput state={state} mode={mode}/></div>
}

//
// function onClick<S, Context, T> ( state: LensState<S, string, Context>, transformer: ( s: string ) => T ) {
//   return ( e: MouseEvent ) => state.setJson ( transformer ( e.target.value ) )
// }
//
// const InputPrim = <T extends any> ( tProps: TransformerProps<T> ) => {
//   const { transformer, type } = tProps
//   return <S, Context> ( { state, mode }: LabelAndInputProps<S, string, Context> ) =>
//     <input type={type} onClick={( e ) => onClick ( state, transformer )}/>
// }
//
//
// const LabelAndTInputPrim2 = <T extends any> ( tProps: TransformerProps<T> ) =>
//   <S, Context> ( props: LabelAndInputProps<S, string, Context> ) =>
//     <div><label>{props.label}</label>{InputPrim ( tProps ) ( props )}</div>;
//
// export interface TransformerProps<T> {
//   transformer: ( s: string ) => T,
//   type: string
// }
//
// const StringTransformer: TransformerProps<string> = { transformer: s => s, type: 'text' }
// const IntTransformer: TransformerProps<number> = { transformer: s => Number ( s ), type: 'text' }
// const BooleanTransformer: TransformerProps<boolean> = { transformer: s => s === 'true', type: 'text' }
//
// const LabelAndString = LabelAndTInputPrim2<string> ( StringTransformer )
// const LabelAndNumber = LabelAndTInputPrim2<number> ( IntTransformer )
// const LabelAndBoolean = LabelAndTInputPrim2<boolean> ( BooleanTransformer )
//
// const InputString = InputPrim<string> ( StringTransformer )
// const InputNumber = InputPrim<number> ( IntTransformer )
// const InputBoolean = InputPrim<boolean> ( BooleanTransformer )
//
//
//
//
//
//
//
//





