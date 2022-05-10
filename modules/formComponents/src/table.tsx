import { CommonStateProps } from "./common";
import { decamelize, findJoiner, makeIntoString, NameAnd, safeArray } from "@focuson/utils";
import { LensProps, LensState, reasonFor } from "@focuson/state";
import { Lenses, Transform } from "@focuson/lens";
import { PageMode } from "@focuson/pages";


export interface TableProps<S, T, Context> extends CommonStateProps<S, T[], Context> {
  order: (keyof T)[];
  /** If set then the selected index will be copied here as the table items are selected. */
  copySelectedIndexTo?: LensState<S, number, Context>
  /** If set then the selected index will be copied here as the table items are selected */
  copySelectedItemTo?: LensState<S, T, Context>
  joiners?: string | string[];
  prefixFilter?: LensState<S, string, Context>; // column is hard coded. but the prefix is in the state
  prefixColumn?: keyof T;
  maxCount?: string
}

export function getValue<T> ( o: keyof T, row: T, joiners: undefined| string | string[] ): any {
  let result = makeIntoString ( o.toString (), row[ o ], findJoiner ( o.toString (), joiners ) );
  return result;
}
export function Table<S, T, Context> ( { id, order, state, copySelectedIndexTo, copySelectedItemTo, joiners, prefixFilter, prefixColumn, maxCount }: TableProps<S, T, Context> ) {
  const orderJsx = order.map ( ( o, i ) => <th key={o.toString ()} id={`${id}.th[${i}]`}>{decamelize ( o.toString (), ' ' )}</th> )
  const json: T[] = safeArray ( state.optJson () )
  const onClick = ( row: number ) => ( e: any ) => {
    if ( copySelectedIndexTo || copySelectedItemTo ) {
      console.log ( 'clicked row ', row )
      const indexTx: Transform<S, number>[] = copySelectedIndexTo ? [ [ copySelectedIndexTo.optional, () => row ] ] : []
      const itemTx: Transform<S, T>[] = copySelectedItemTo ? [ [ copySelectedItemTo.optional, () => json[ row ] ] ] : []
      state.massTransform ( reasonFor ( 'Table', 'onClick', id, `selected row ${row}` ) ) ( ...[ ...indexTx, ...itemTx ] )
    }
  }
  const selected = copySelectedIndexTo?.optJson ()
  function selectedClass ( i: number ) {return i === selected ? 'bg-primary' : undefined }

  const prefixFilterString = prefixFilter?.optJsonOr ( '' )
  const filtered = prefixColumn && prefixFilter ? json.filter ( t => getValue ( prefixColumn, t, joiners ).toString ().startsWith ( prefixFilterString ) ) : json
  const withMaxCount = maxCount !== undefined ? filtered.slice ( 0,Number.parseInt(maxCount) ) : filtered
  return <table id={id}>
    <thead>
    <tr>{orderJsx}</tr>
    </thead>
    <tbody>{withMaxCount.map ( ( row, i ) =>
      <tr id={`${id}[${i}]`} className={selectedClass ( i )} key={i} onClick={onClick ( i )}>{order.map ( o =>
        <td id={`${id}[${i}].${o}`} key={o.toString ()}>{getValue ( o, row, joiners )}</td> )}</tr> )}</tbody>
  </table>
}

export interface SelectedItemProps<FS, S, T, Context> extends LensProps<S, T[], Context> {
  index: number;//LensState<FS, number, Context>;
  mode: PageMode;
  id: string;
  label?: string;
  allButtons: NameAnd<JSX.Element>
  display: ( { state, mode, id, allButtons }: { state: LensState<S, T, Context>, mode: PageMode, id: string, allButtons: NameAnd<JSX.Element> } ) => JSX.Element
}
export function SelectedItem<FS, S, T, Context> ( { index, state, display, mode, id, allButtons }: SelectedItemProps<FS, S, T, Context> ) {
  let newState = state.chainLens ( Lenses.nth ( index ) );
  // console.log ( "SelectedItem", index, newState.optional.description, newState.optJson () )
  return display ( { state: newState, mode, id, allButtons } )
}