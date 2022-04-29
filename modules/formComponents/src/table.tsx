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
  joiners?: string | string[]
}
export function findJoiner ( name: string, joiners: undefined| string | string[] ) {
  if ( joiners === undefined ) return ','
  if ( typeof joiners === 'string' ) return joiners
  const j = joiners.find ( n => n.startsWith ( `${name}:` ) )
  if ( j === undefined ) return ','
  return j.substr ( name.length+1 )
}
export function value ( name: string, raw: any, joiners: undefined | string | string[] ): any {
  const t = typeof raw
  if ( t === 'string' || t === 'boolean' || t === 'number' ) return raw
  const joiner = findJoiner ( name, joiners )
  if ( t === 'object' ) return Object.values ( raw ).map ( v => value ( name, v, joiners ) ).join ( joiner )
  if ( Array.isArray ( raw ) ) return raw.map ( v => value ( name, v, joiners ) ).join ( joiner )
  throw new Error ( `Cannot find value for ${name} in ${JSON.stringify ( raw )}` )
}

export function Table<S, T, Context> ( { id, order, state, copySelectedIndexTo, copySelectedItemTo, joiners }: TableProps<S, T, Context> ) {
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
  return <table id={id}>
    <thead>
    <tr>{orderJsx}</tr>
    </thead>
    <tbody>{json.map ( ( row, i ) =>
      <tr id={`${id}[${i}]`} className={selectedClass ( i )} key={i} onClick={onClick ( i )}>{order.map ( o =>
        <td id={`${id}[${i}].${o}`} key={o.toString ()}>{value ( o.toString (), row[ o ], joiners )}</td> )}</tr> )}</tbody>
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
  // console.log ( "SelectedItem", index, newState.optional.description, newState.optJson () )
  return display ( { state: newState, mode, id, buttons } )
}