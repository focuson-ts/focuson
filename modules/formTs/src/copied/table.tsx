import { CommonStateProps } from "./common";
import { decamelize, safeArray } from "@focuson/utils";
import { LensProps, LensState } from "@focuson/state";
import { Lenses } from "@focuson/lens";
import { PageMode } from "@focuson/pages";


export interface TableProps<S, T, Context> extends CommonStateProps<S, T[], Context> {
  order: (keyof T)[];
}

export function Table<S, T, Context> ( { id, order, state }: TableProps<S, T, Context> ) {
  const orderJsx = order.map ( o => <th key={o.toString ()} id={`header-${0})}`}>{decamelize ( o.toString (), ' ' )}</th> )
  const json: T[] = safeArray ( state.optJson () )
  return <table id={id}>
    <thead>{orderJsx}</thead>
    <tbody>{json.map ( ( row, i ) =>
      <tr key={i}>{order.map ( o => <td key={o.toString ()}>{row[ o ]}</td> )}</tr> )}</tbody>
  </table>
}

export interface SelectedItemProps<FS, S, T, Context> extends LensProps<S, T[], Context> {
  id: string;
  index: number;//LensState<FS, number, Context>;
  mode: PageMode;
  label?: string;
  display: ( { state, mode }: { state: LensState<S, T, Context>, mode: PageMode, id: string } ) => JSX.Element
}
export function SelectedItem<FS, S, T, Context> ( { id, index, state, display, mode }: SelectedItemProps<FS, S, T, Context> ) {
  let newState = state.chainLens ( Lenses.nth ( index ) );
  console.log ( "SelectedItem", index, newState.optional.description, newState.optJson () )
  const Display = display
  return <Display id={id} state={newState} mode={mode}/>
}