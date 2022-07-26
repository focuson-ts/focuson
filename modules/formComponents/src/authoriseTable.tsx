import { LensProps, LensState, reasonFor } from "@focuson/state";
import { Lenses, Transform } from "@focuson/lens";
import { PageMode } from "@focuson/pages";
import { LabelAndStringInput } from "./labelAndInput";
import { FocusOnContext } from "@focuson/focuson";
import { Layout } from "./layout";
import { defaultOnClick, defaultOneRowWithGetValue, getValueForTable, rawTable, TableProps } from "./table";
import { LabelAndFixedNumber } from "./labelAndFixedNumber";


export interface AuthoriseTableData {
  hold?: boolean;
  authorisedBy?: string;
  approvedBy?: string;
  status?: string;
  type: string;
  amount: string;
}

export interface AuthoriseTableProps<S, D extends AuthoriseTableData, C> extends TableProps<S, D, C> {
}

const getValueForAuthorisedTable = <T extends AuthoriseTableData> ( o: keyof T, row: T, joiners: undefined | string | string[] ) => {
  return o === 'status' && row[ 'hold' ] ? 'HELD' : getValueForTable ( o, row, joiners );
}

const haltBox = <S, D extends AuthoriseTableData, C> ( state: LensState<S, D[], C>, id: string ) => ( i: number, row: D ) => {
  const onChange = () => {
    let newRow = { ...row, hold: !row.hold };
    const thisTx: Transform<S, any> = [ state.optional.chain ( Lenses.nth ( i ) ), row => newRow ]
    state.massTransform ( reasonFor ( `AuthoriseTable[${i}]`, 'onChange', id ) ) ( thisTx );
  }
  return <input type='checkbox' aria-label={`Halt for row ${i}`} onChange={onChange} checked={row.hold}/>
};

function sum<D extends AuthoriseTableData> ( ds: D[], crOrDr: 'CR' | 'DR' ): string {
  return "" + ds.reduce ( ( acc, v ) => v.type == crOrDr ? acc + Number.parseFloat ( v.amount ) : acc, 0 )
}

export function AuthoriseTable<S, D extends AuthoriseTableData, C extends FocusOnContext<S>> ( props: AuthoriseTableProps<S, D, C> ) {
  const { state, order, id, mode, copySelectedItemTo } = props
  const AuthTable = rawTable<S, any, C> ( [ ...order, 'Halt' ], defaultOnClick ( props ), defaultOneRowWithGetValue ( getValueForAuthorisedTable ) ( id, order, [], haltBox ( state, id ) ) )
  const data = state.optJsonOr ( [] )
  const credits = sum ( data, 'CR' )
  const debits = sum ( data, 'DR' )
  // @ts-ignore
  const approvedByS: LensState<S, string, C> = copySelectedItemTo.focusOn ( 'approvedBy' );
  // @ts-ignore
  const authorisedByS: LensState<S, string, C> = copySelectedItemTo.focusOn ( 'authorisedBy' );

  return <Layout details='[[1],[1,1],[1,1,1]]'>
    <AuthTable{...props} />
    <LabelAndStringInput id={`${id}.approvedBy`} label='Approved By' state={approvedByS} mode='view' allButtons={{}}/>
    <LabelAndStringInput id={`${id}.authorisedBy`} label='Authorised By' state={authorisedByS} mode='view' allButtons={{}}/>
    <LabelAndFixedNumber id={`${id}.totalCredits`} label='Total Credits' number={credits}/>
    <LabelAndFixedNumber id={`${id}.totalDebuts`} label='Total Debits' number={debits}/>
    <LabelAndFixedNumber id={`${id}.waste`} label='Waste' number={'0.00'}/>
  </Layout>

}