import { CommonStateProps } from "./common";
import { decamelize, findJoiner, makeIntoString, safeArray, toArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { Transform } from "@focuson/lens";


export interface TableProps<S, T, Context> extends CommonStateProps<S, T[], Context> {
  order: (keyof T)[];
  /** If set then the selected index will be copied here as the table items are selected. */
  copySelectedIndexTo?: LensState<S, number, Context>
  /** If set then the selected index will be copied here as the table items are selected */
  copySelectedItemTo?: LensState<S, T, Context>
  joiners?: string | string[];
  prefixFilter?: LensState<S, string, Context>; // column is hard coded. but the prefix is in the state
  prefixColumn?: keyof T;
  maxCount?: string;
  emptyData?: string;
}

export function getValue<T> ( o: keyof T, row: T, joiners: undefined | string | string[] ): any {
  let result = makeIntoString ( o.toString (), row[ o ], findJoiner ( o.toString (), joiners ) );
  return result;
}

export const transformsForUpdateSelected = <S, T, C> ( copySelectedIndexTo?: LensState<S, number, C>, copySelectedItemTo?: LensState<S, T, C> ) => ( i: number, row: T ): Transform<S, any>[] => {
  const indexTx: Transform<S, number>[] = copySelectedIndexTo ? [ [ copySelectedIndexTo.optional, () => i ] ] : []
  const itemTx: Transform<S, T>[] = copySelectedItemTo ? [ [ copySelectedItemTo.optional, () => row ] ] : []
  return [ ...indexTx, ...itemTx ]
};

export function defaultOnClick<S, Context, T> ( props: TableProps<S, T, Context> ) {
  const { id, state, copySelectedIndexTo, copySelectedItemTo } = props
  const onClick = ( i: number, row: T ) => ( e: any ) => {
    if ( copySelectedIndexTo || copySelectedItemTo ) {
      const txs = transformsForUpdateSelected ( copySelectedIndexTo, copySelectedItemTo ) ( i, row )
      state.massTransform ( reasonFor ( 'Table', 'onClick', id, `selected row ${i}` ) ) ( ...txs )
    }
  }
  return onClick;
}
export const rawTable = <S, T, Context> (
  onClick?: ( i: number, row: T ) => ( e: any ) => void,
  oneRow?: ( row: T, i: number, selectedClass: string, onClick: ( i: number, row: T ) => ( e: any ) => void ) => JSX.Element ) =>
  ( props: TableProps<S, T, Context> ) => {
    const { id, order, state, copySelectedIndexTo, copySelectedItemTo, joiners, prefixFilter, prefixColumn, maxCount, emptyData } = props
    const actualOneRow = oneRow ? oneRow : defaultOneRow ( id, order, joiners )
    const actualOnClick = onClick ? onClick : defaultOnClick ( props )
    const orderJsx = order.map ( ( o, i ) => <th key={o.toString ()} id={`${id}.th[${i}]`}>{decamelize ( o.toString (), ' ' )}</th> )
    const json: T[] = safeArray ( state.optJson () )
    const selected = copySelectedIndexTo?.optJson ()
    function selectedClass ( i: number ) {return i === selected ? 'grid-selected' : undefined }

    const prefixFilterString = prefixFilter?.optJsonOr ( '' )
    const filter = ( t: T ) => prefixColumn && prefixFilter ? getValue ( prefixColumn, t, joiners ).toString ().startsWith ( prefixFilterString ) : true;
    let maxCountInt = maxCount ? Number.parseInt ( maxCount ) : 0;
    let count = 0;
    let tableBody = json.length === 0 && emptyData ?
      <tr id={`${id}[0]`}>
        <td colSpan={order.length + 100}>{emptyData}</td>
      </tr> :
      json.map ( ( row, i ) => filter ( row ) && (maxCount === undefined || count++ < maxCountInt) ? actualOneRow ( row, i, selectedClass ( i ), actualOnClick ) : null );

    return <table id={id} className="grid">
      <thead>
      <tr>{orderJsx}</tr>
      </thead>
      <tbody className="grid-sub">{tableBody}</tbody>
    </table>
  };

export const defaultOneRow = <T extends any> ( id: string, order: (keyof T)[], joiners: string | string[], ...extraTds: (( i: number, row: T ) => JSX.Element)[] ) =>
  ( row: T, i: number, clazz: string, onClick: ( i: number, row: T ) => ( e: any ) => void ) =>
    (<tr id={`${id}[${i}]`} className={clazz} key={i} onClick={onClick ( i, row )}>{order.map ( o =>
      <td id={`${id}[${i}].${o.toString ()}`} key={o.toString ()}>{getValue ( o, row, joiners )}</td> )}{extraTds.map ( e => <td>{e ( i, row )}</td> )}</tr>);

export function Table<S, T, Context> ( props: TableProps<S, T, Context> ) {
  const { id, order, joiners } = props
  return rawTable ( defaultOnClick ( props ), defaultOneRow ( id, order, joiners ) ) ( props )
}


export interface StructureTable<S, T, Context> extends CommonStateProps<S, T[], Context> {
  paths: string[];
  /** If set then the selected index will be copied here as the table items are selected. */
  copySelectedIndexTo?: LensState<S, number, Context>
  /** If set then the selected index will be copied here as the table items are selected */
  copySelectedItemTo?: LensState<S, T, Context>
  joiners?: string | string[];
  prefixFilter?: LensState<S, string, Context>; // column is hard coded. but the prefix is in the state
  prefixColumn?: keyof T;
  maxCount?: string;
  emptyData?: string;
}
export function StructureTable<S, T, Context> ( props: TableProps<S, T, Context> ) {
  const { id, order, joiners } = props
  return rawTable ( defaultOnClick ( props ), defaultOneRow ( id, order, joiners ) ) ( props )
}