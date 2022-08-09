import { LensProps, LensState } from "@focuson/state";
import { PageMode } from "@focuson/pages";
import { NameAnd } from "@focuson/utils";
import { Lenses } from "@focuson/lens";
import { HasButtons } from "./makeButtons";

export interface SelectedItemDisplayProps<S, T, Context> {
  state: LensState<S, T, Context>,
  mode: PageMode,
  id: string,
  allButtons: NameAnd<JSX.Element>
}

export interface SelectedItemProps<FS, S, T, Context> extends LensProps<S, T[], Context>, HasButtons {
  id: string;
  index: number | undefined;//LensState<FS, number, Context>;
  mode: PageMode;
  header?: string;
  showNofM?: boolean;
  headerIfEmpty?: string;
  display: ( props: SelectedItemDisplayProps<S, T, Context> ) => JSX.Element
}

export function SelectedItem<FS, S, T, Context> ( { index, state, display, mode, id, allButtons, header, showNofM, headerIfEmpty }: SelectedItemProps<FS, S, T, Context> ) {
  // console.log ( "SelectedItem", index, newState.optional.description, newState.optJson () )
const realIndex = index? index:0
  const newProps = { state: state.chainLens ( Lenses.nth ( realIndex) ), mode, id, allButtons };
  if ( header || showNofM || headerIfEmpty ) {
    const array = state.optJsonOr ( [] )
    const nm = showNofM && (headerIfEmpty === undefined || array.length > 0) ?
      <span id={`${id}.nOfM`}> {realIndex + 1} / {array.length}</span> :
      <></>
    const emptyHeader = headerIfEmpty && array.length === 0 ? <span id={`${id}.emptyHeader`}>headerIfEmpty</span> : <></>
    return <div><h2>{header}{nm}{emptyHeader}</h2>{display ( newProps )}</div>
  } else
    return display ( newProps )
}