import { LensProps, LensState, reasonFor } from "@focuson-nw/state";
import { NameAnd } from "@focuson-nw/utils";


export interface SummaryTableData {
  chargeType: string
  accountNo: string;
  hold?: boolean;
  status?: string;
  type: string;
  amount: string;
}

export interface SummaryTableProps<S, D extends SummaryTableData, C> extends LensProps<S, D[], C> {
  id: string
  accountId: LensState<S, string, C>
  selectedItem: LensState<S, Remembered, C>
}
interface Remembered {
  chargeType: string
  status: string
  accAmount: number
  accountId?: string
}

export function SummaryTable<S, D extends SummaryTableData, C> ( props: SummaryTableProps<S, D, C> ) {
  const { state, accountId, selectedItem, id } = props
  // const AuthTable = rawTable<S, any, C> ( [ ...order, 'Halt' ], defaultOnClick ( props ), defaultOneRowWithGetValue ( getValueForAuthorisedTable ) ( id, order, [], haltBox ( state, id ) ) )


  const data: D[] = state.optJsonOr ( [] )
  console.log ( 'data', data, state.optional.description )
  console.log ( 'state', state )
  // @ts-ignore
  const accId = accountId.optJson ()
  const dataForMyAccountIdThatIsntHeldAndIsACredit = data.filter ( d => d.accountNo === accId && d.hold !== true && d.type === 'CR' )

  const initialValue: NameAnd<number> = {};
  const groups: NameAnd<number> = dataForMyAccountIdThatIsntHeldAndIsACredit.reduce ( ( groups, d ) => { // reducing or folding
    const chargeType = d.chargeType
    const status = d.status
    const key = status + "_" + chargeType
    const existingAmount = groups[ key ]
    const newAmount = Number.parseFloat ( d.amount ) + (existingAmount ? existingAmount : 0)
    groups[ key ] = newAmount
    return groups;
  }, initialValue )
  console.log ( groups )
  const tableLines: Remembered[] = Object.entries ( groups ).map ( ( [ key, accAmount ] ) => {
    const index = key.indexOf ( "_" )
    const status = key.slice ( 0, index ) //might be +/-1 on index
    const chargeType = key.slice ( index + 1 ) //ditto
    return { status, chargeType, accAmount, accountId: accId }
  } )
  const totalWaste = Object.values ( groups ).reduce ( ( acc, v ) => acc + v, 0 )
  const onClick = ( i: number ) => ( e: any ) => {
    selectedItem.setJson ( tableLines[ i ], reasonFor ( 'SummaryDetailsPage', 'onClick', id, `selected row ${i}` ) )
  };
  return <div>
    <table className='grid'>
      {/*headers go here*/}
      <tbody className="grid-sub">{tableLines.map ( ( { status, chargeType, accAmount }, i ) => <tr key={i} onClick={onClick ( i )}>
        <td>{chargeType}</td>
        <td>{status}</td>
        <td>{accAmount}</td>
      </tr> )}</tbody>
    </table>
    <label>Total Waste</label><input type='number' value={totalWaste} readOnly={true}/>
  </div>
}

interface SummaryDetailsProps<S, D extends SummaryTableData, C> extends LensProps<S, D[], C> {
  id: string;
  selectedItem: LensState<S, Remembered, C>
}
export function SummaryDetailsPage<S, D extends SummaryTableData, C> ( { id, state, selectedItem }: SummaryDetailsProps<S, D, C> ) {
  const data: D[] = state.optJsonOr ( [] )
  const item = selectedItem.optJson ();
  const items = data.filter ( d => item && d.hold !== true && d.accountNo === item.accountId && d.status === item.status && d.chargeType === item.chargeType )
  console.log ( 'items', items )

  return <div>
    <table className='grid'>
      {/*headers go here*/}
      <tbody className="grid-sub">{items.map ( ( { status, chargeType, amount }, i ) =>
        <tr key={i}>
          <td>{chargeType}</td>
          <td>{status}</td>
          <td>{amount}</td>
        </tr> )}</tbody>
    </table>
  </div>
}

export function AllSummaryDetails<S, D extends SummaryTableData, C> ( props: SummaryTableProps<S, D, C> ) {
  return <div>
    <SummaryTable {...props} id={`${props.id}.summaryTable`}/>
    <SummaryDetailsPage {...props} id={`${props.id}.summaryDetailsPage`}/>
  </div>
}