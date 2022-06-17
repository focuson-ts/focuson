import { CommonStateProps } from "./common";
import { decamelize, findJoiner, makeIntoString, safeArray } from "@focuson/utils";
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
const rawTable = <S, T, Context> ( oneRow: ( row: T, i: number, selectedClass: string, onClick: ( row: number ) => ( e: any ) => void ) => JSX.Element, ) =>
  ( { id, order, state, copySelectedIndexTo, copySelectedItemTo, joiners, prefixFilter, prefixColumn, maxCount, emptyData }: TableProps<S, T, Context> ) => {
    const orderJsx = order.map ( ( o, i ) => <th key={o.toString ()} id={`${id}.th[${i}]`}>{decamelize ( o.toString (), ' ' )}</th> )
    const json: T[] = safeArray ( state.optJson () )
    const onClick = ( row: number ) => ( e: any ) => {
      if ( copySelectedIndexTo || copySelectedItemTo ) {
        const indexTx: Transform<S, number>[] = copySelectedIndexTo ? [ [ copySelectedIndexTo.optional, () => row ] ] : []
        const itemTx: Transform<S, T>[] = copySelectedItemTo ? [ [ copySelectedItemTo.optional, () => json[ row ] ] ] : []
        state.massTransform ( reasonFor ( 'Table', 'onClick', id, `selected row ${row}` ) ) ( ...[ ...indexTx, ...itemTx ] )
      }
    }
    const selected = copySelectedIndexTo?.optJson ()
    function selectedClass ( i: number ) {return i === selected ? 'grid-selected' : undefined }

    const prefixFilterString = prefixFilter?.optJsonOr ( '' )
    const filter = ( t: T ) => prefixColumn && prefixFilter ? getValue ( prefixColumn, t, joiners ).toString ().startsWith ( prefixFilterString ) : true;
    let maxCountInt = maxCount ? Number.parseInt ( maxCount ) : 0;
    let count = 0;
    let tableBody = json.length === 0 && emptyData ?
      <tr id={`${id}[0]`}>
        <td colSpan={order.length}>{emptyData}</td>
      </tr> :
      json.map ( ( row, i ) => filter ( row ) && (maxCount === undefined || count++ < maxCountInt) ? oneRow ( row, i, selectedClass ( i ), onClick ) : null );

    return <table id={id} className="grid">
      <thead>
      <tr>{orderJsx}</tr>
      </thead>
      <tbody className="grid-sub">{tableBody}</tbody>
    </table>
  };

export function Table<S, T, Context> ( props: TableProps<S, T, Context> ) {
  const { id, order, joiners } = props
  const oneRow = ( row: T, i: number, clazz: string, onClick: ( row: number ) => ( e: any ) => void ) =>
    (<tr id={`${id}[${i}]`} className={clazz} key={i} onClick={onClick ( i )}>{order.map ( o =>
      <td id={`${id}[${i}].${o.toString ()}`} key={o.toString ()}>{getValue ( o, row, joiners )}</td> )}</tr>);
  return rawTable ( oneRow ) ( props )
}
