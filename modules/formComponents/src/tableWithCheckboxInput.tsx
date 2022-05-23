import { CommonStateProps } from "./common";
import { decamelize, safeArray } from "@focuson/utils";
import { LensState, reasonFor } from "@focuson/state";
import { Transform } from "@focuson/lens";

export interface TableWithCheckboxInputProps<S, T, Context> extends CommonStateProps<S, T[], Context> {
  order: (keyof T)[];
  /** If set then the selected index will be copied here as the table items are selected. */
  copySelectedIndexTo?: LensState<S, number, Context>
  /** If set then the selected index will be copied here as the table items are selected */
  copySelectedItemTo?: LensState<S, T, Context>
}

export function TableWithCheckboxInput<S, T, Context> ( { id, order, state, copySelectedIndexTo, copySelectedItemTo }: TableWithCheckboxInputProps<S, T, Context> ) {
  const orderJsx = order.map ( o => <th key={o.toString ()} id={`header-${0})}`}>{decamelize ( o.toString (), ' ' )}</th> )
  const json: T[] = safeArray ( state.optJson () )
  const onClick = ( row: number ) => ( e: any ) => {
    const indexTx: Transform<S, number>[] = copySelectedIndexTo ? [ [ copySelectedIndexTo.optional, () => row ] ] : []
    const itemTx: Transform<S, T>[] = copySelectedItemTo ? [ [ copySelectedItemTo.optional, () => json[ row ] ] ] : []
    state.massTransform ( reasonFor ( 'Table', 'onClick', id, `selected row ${row}` ) ) ( ...[ ...indexTx, ...itemTx ] )
  };
  return <table id={id}>
    <thead>
    <tr>{orderJsx}</tr>
    </thead>
    <tbody>{json.map ( ( row, i ) =>
        <tr key={i} onClick={onClick ( i )}>{order.map ( (o, colIndex) => {
          return colIndex%2 == 0 
            ? <td key={o.toString ()}>{row[o]}</td> 
            : <td key={o.toString ()}>
              <div className="checkbox-container">
                <input type="checkbox" value={row[o]+""} checked={!!row[o] === true}/>
                <span className="checkmark"></span>
              </div></td>
        }
      )}</tr>
    )}</tbody>
  </table>
}
