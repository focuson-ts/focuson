import { LensProps, LensState, reasonFor } from "@focuson/state";
import { Lenses, Transform } from "@focuson/lens";
import { PageMode } from "@focuson/pages";
import { LabelAndStringInput } from "./labelAndInput";
import { FocusOnContext } from "@focuson/focuson";
import { Layout } from "./layout";
import { decamelize } from "@focuson/utils";


export interface AuthoriseTableData {
  hold?: boolean;
  authorisedBy?: string;
  approvedBy?: string;
  status?: string;
}

export interface AuthoriseTableProps<S, D extends AuthoriseTableData, C> extends LensProps<S, D[], C> {
  id: string;
  order: (keyof D)[];
  mode: PageMode;
  // copySelectedIndexTo: LensState<S, D, C>;
  copySelectedItemTo: LensState<S, D, C>;
  copySelectedIndexTo?: LensState<S, number, C>;
}

const noData = <td>No data</td>;

interface LabelAndFixedNumberProps {
  id: string
  label: string;
  number: string;
}
function LabelAndFixedNumber ( { id, label, number }: LabelAndFixedNumberProps ) {
  return <div className='labelValueButton'><label className='input-label'>{label}</label><input className='input' readOnly type='number' value={number}/></div>
}
export function AuthoriseTable<S, D extends AuthoriseTableData, C extends FocusOnContext<S>> ( props: AuthoriseTableProps<S, D, C> ) {
  const { state, order, id, mode, copySelectedItemTo, copySelectedIndexTo } = props
  const json = state.optJsonOr ( [] );
  function updateSelected ( row: number ): Transform<S, any>[] {
    const indexTx: Transform<S, number>[] = copySelectedIndexTo ? [ [ copySelectedIndexTo.optional, () => row ] ] : []
    const itemTx: Transform<S, D>[] = copySelectedItemTo ? [ [ copySelectedItemTo.optional, () => json[ row ] ] ] : []
    return [ ...indexTx, ...itemTx ]
  }

  const headers = <tr>{order.map ( o => <th key={o.toString ()}>{decamelize ( o.toString (), ' ' )}</th> )}</tr>
  function data ( row: D, o: keyof D, i: number ) {
    if ( o === 'status' && row.hold ) return 'held'
    if ( o === 'hold' ) return haltBox ( row, i )
    return row[ o ];
  }
  function haltBox ( row: D, i: number ) {
    const onChange = () => {
      const txs = updateSelected ( i )
      const thisTx: Transform<S, any> = [ state.optional.chain ( Lenses.nth ( i ) ), row => ({ ...row, hold: !row.hold }) ]
      state.massTransform ( reasonFor ( `AuthoriseTable[${i}]`, 'onChange', id ) ) ( ...txs, thisTx );
    }
    return <input type='checkbox' onChange={onChange} checked={row.hold}/>
  }
  const onClick = ( row: number ) => ( e: any ) => {
    if ( copySelectedIndexTo || copySelectedItemTo ) state.massTransform ( reasonFor ( 'Table', 'onClick', id, `selected row ${row}` ) ) ( ...updateSelected ( row ) )
  }
  const putInTd = ( o: keyof D, i: number ) => ( a: any ) => o.toString () === 'hold' ? <td key={o.toString ()}> {a}</td> : (<td key={o.toString ()} onClick={onClick ( i )}>{a}</td>);
  const selected = copySelectedIndexTo?.optJson ()
  function selectedClass ( i: number ) {return i === selected ? 'grid-selected' : undefined }
  const rows = json && json.length > 1 ? json.map ( ( row, i ) => <tr className={selectedClass ( i )} key={i}>{order.map ( o => putInTd ( o, i ) ( data ( row, o, i ) ) )}</tr> ) : <tr>{noData}</tr>
  function stateFor ( k: keyof D ): LensState<S, any, C> {return copySelectedItemTo.focusOn ( k );}
  return <Layout details='[[1],[1,1],[1,1,1]]'>
    <table className='grid'>
      <tbody className='grid-sub'>
      {headers}
      {rows}
      </tbody>
    </table>
    <LabelAndStringInput id={`${id}.approvedBy`} label='Approved By' state={stateFor ( 'approvedBy' )} mode='view' allButtons={{}}/>
    <LabelAndStringInput id={`${id}.authorisedBy`} label='Authorised By' state={stateFor ( 'authorisedBy' )} mode='view' allButtons={{}}/>
    <LabelAndFixedNumber id={`${id}.totalCredits`} label='Total Credits' number={'0.00'}/>
    <LabelAndFixedNumber id={`${id}.totalDebuts`} label='Total Debits' number={'0.00'}/>
    <LabelAndFixedNumber id={`${id}.waste`} label='Waste' number={'0.00'}/>
  </Layout>

}