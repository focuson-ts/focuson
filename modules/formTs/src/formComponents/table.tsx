import { CommonStateProps } from "./common";
import { decamelize, NameAnd, safeArray } from "@focuson/utils";
import { LensProps, LensState, reasonFor } from "@focuson/state";
import { Lenses, Transform } from "@focuson/lens";
import { PageMode } from "@focuson/pages";


export interface TableProps<S, T, Context> extends CommonStateProps<S, T[], Context> {
  order: (keyof T)[];
  /** If set then the selected index will be copied here as the table items are selected. */
  copySelectedIndexTo?: LensState<S, number, Context>
  /** If set then the selected index will be copied here as the table items are selected */
  copySelectedItemTo?: LensState<S, T, Context>
}

export function Table<S, T, Context> ( { id, order, state, copySelectedIndexTo, copySelectedItemTo }: TableProps<S, T, Context> ) {
  const orderJsx = order.map ( o => <th key={o.toString ()} id={`header-${0})}`}>{decamelize ( o.toString (), ' ' )}</th> )
  const json: T[] = safeArray ( state.optJson () )
  const onClick = ( row: number ) => ( e: any ) => {
    console.log ( 'clicked row ', row )
    const indexTx: Transform<S, number>[] = copySelectedIndexTo ? [ [ copySelectedIndexTo.optional, () => row ] ] : []
    const itemTx: Transform<S, T>[] = copySelectedItemTo ? [ [ copySelectedItemTo.optional, () => json[ row ] ] ] : []
    state.massTransform ( reasonFor ( 'Table', 'onClick', id, `selected row ${row}` ) ) ( ...[ ...indexTx, ...itemTx ] )
  };
  return <table id={id}>
    <thead>
    <tr>{orderJsx}</tr>
    </thead>
    <tbody>{json.map ( ( row, i ) =>
        <tr key={i} onClick={onClick ( i )}>{order.map ( o => <td key={o.toString ()}>{row[ o ]}</td> )}</tr> )}</tbody>
  </table>
}

export interface SelectedItemProps<FS, S, T, Context> extends LensProps<S, T[], Context> {
  index: number;//LensState<FS, number, Context>;
  mode: PageMode;
  id: string;
  label?: string;
  buttons: NameAnd<JSX.Element>
  display: ( { state, mode, id, buttons }: { state: LensState<S, T, Context>, mode: PageMode, id: string, buttons: NameAnd<JSX.Element> } ) => JSX.Element
}
export function SelectedItem<FS, S, T, Context> ( { index, state, display, mode, id, buttons }: SelectedItemProps<FS, S, T, Context> ) {
  let newState = state.chainLens ( Lenses.nth ( index ) );
  console.log ( "SelectedItem", index, newState.optional.description, newState.optJson () )
  return display ( { state: newState, mode, id, buttons } )
}