import { LensProps, LensState } from "@focuson/state";
import { PageMode } from "@focuson/pages";
import { NameAnd } from "@focuson/utils";
import { Lenses } from "@focuson/lens";
import { HasButtons } from "./makeButtons";

export interface SelectedItemProps<FS, S, T, Context> extends LensProps<S, T[], Context>, HasButtons {
  index: number;//LensState<FS, number, Context>;
  mode: PageMode;
  id: string;
  header?: string;
  showNofM?: boolean;
  display: ( { state, mode, id, allButtons }: { state: LensState<S, T, Context>, mode: PageMode, id: string, allButtons: NameAnd<JSX.Element> } ) => JSX.Element
}

export function SelectedItem<FS, S, T, Context> ( { index, state, display, mode, id, allButtons, header, showNofM }: SelectedItemProps<FS, S, T, Context> ) {
  let newState = state.chainLens ( Lenses.nth ( index ) );
  // console.log ( "SelectedItem", index, newState.optional.description, newState.optJson () )
  if ( header || showNofM ) {
    const array = state.optJsonOr ( [] )
    const nm = showNofM ? <span id={`${id}.nOfM`}> {index + 1} / {array.length}</span> : <></>
    return <div><h2>{header}{nm}</h2>{display ( { state: newState, mode, id, allButtons } )}</div>
  } else return display ( { state: newState, mode, id, allButtons } )
}