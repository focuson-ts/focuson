import { CheckboxProps, makeInputChangeTxs, StringProps } from "./labelAndInput";
import { FocusOnContext } from "@focuson/focuson";
import { LensState, reasonFor } from "@focuson/state";
import { InputChangeCommands } from "@focuson/rest";

export type InputSelectFn = <S, T, Context extends FocusOnContext<S>> ( state: LensState<S, T, Context>, id: string, value: T, parentState: LensState<S, any, Context>, onChange: undefined | InputChangeCommands | InputChangeCommands[] ) => void

export const defaultInputSelectFn: InputSelectFn = <S, T, Context extends FocusOnContext<S>> ( state, id, value, parentState, onChange ) =>
  state.massTransform ( reasonFor ( 'Input', 'onChange', id ) ) ( [ state.optional, () => value ], ...makeInputChangeTxs ( id, parentState, onChange ) );


export const StringTransformer: StringProps<string> = { transformer: s => s, type: 'text', default: '', selectFn: defaultInputSelectFn }
export const NumberTransformer: StringProps<number> = { transformer: s => Number ( s ), type: 'number', default: undefined, selectFn: defaultInputSelectFn }
export const BooleanTransformer: CheckboxProps<boolean> = { transformer: s => s === true, default: false, checkbox: b => !!b, selectFn: defaultInputSelectFn }
export const BooleanYNTransformer: CheckboxProps<string> = { transformer: s => s ? 'Y' : 'N', default: 'N', checkbox: b => b === 'Y', selectFn: defaultInputSelectFn }
