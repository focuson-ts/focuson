import { LensProps, LensState, reasonFor } from "@focuson/state";
import { Lenses, Transform } from "@focuson/lens";
import { PageMode } from "@focuson/pages";
import { LabelAndStringInput } from "./labelAndInput";
import { FocusOnContext } from "@focuson/focuson";
import { Layout } from "./layout";
import { defaultOnClick, defaultOneRowWithGetValue, getValueForTable, rawTable } from "./table";
import { LabelAndFixedNumber } from "./labelAndFixedNumber";


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


const getValueForAuthorisedTable = <T extends any> ( o: keyof T, row: T, joiners: undefined | string | string[] ) => {
  const a: any  = row
  return o === 'status' && a[ 'hold' ] ? 'HELD' : getValueForTable ( o, row, joiners );
}

export function AuthoriseTable<S, D extends AuthoriseTableData, C extends FocusOnContext<S>> ( props: AuthoriseTableProps<S, D, C> ) {
  const { state, order, id, mode, copySelectedItemTo, copySelectedIndexTo } = props
  function haltBox ( i: number, row: D ) {
    const onChange = () => {
      let newRow = { ...row, hold: !row.hold };
      // const txs = transformsForUpdateSelected ( copySelectedIndexTo, copySelectedItemTo ) ( i, row )
      const thisTx: Transform<S, any> = [ state.optional.chain ( Lenses.nth ( i ) ), row => newRow ]
      state.massTransform ( reasonFor ( `AuthoriseTable[${i}]`, 'onChange', id ) ) ( thisTx );
    }
    return <input type='checkbox' aria-label={`Halt for row ${i}`} onChange={onChange} checked={row.hold}/>
  }

  function stateFor ( k: keyof D ): LensState<S, any, C> {return copySelectedItemTo.focusOn ( k );}

  const AuthTable = rawTable<S, any, C> ( [ ...order, 'Halt' ], defaultOnClick ( props ), defaultOneRowWithGetValue ( getValueForAuthorisedTable ) ( id, order, [], haltBox ) )
  return <Layout details='[[1],[1,1],[1,1,1]]'>
    <AuthTable{...props} />
    <LabelAndStringInput id={`${id}.approvedBy`} label='Approved By' state={stateFor ( 'approvedBy' )} mode='view' allButtons={{}}/>
    <LabelAndStringInput id={`${id}.authorisedBy`} label='Authorised By' state={stateFor ( 'authorisedBy' )} mode='view' allButtons={{}}/>
    <LabelAndFixedNumber id={`${id}.totalCredits`} label='Total Credits' number={'0.00'}/>
    <LabelAndFixedNumber id={`${id}.totalDebuts`} label='Total Debits' number={'0.00'}/>
    <LabelAndFixedNumber id={`${id}.waste`} label='Waste' number={'0.00'}/>
  </Layout>

}