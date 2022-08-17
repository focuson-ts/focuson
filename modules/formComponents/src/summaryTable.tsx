import { LensProps, LensState, reasonFor } from "@focuson/state";
import { Lenses, Transform } from "@focuson/lens";
import { PageMode } from "@focuson/pages";
import { LabelAndStringInput } from "./labelAndInput";
import { FocusOnContext } from "@focuson/focuson";
import { Layout } from "./layout";
import { defaultOnClick, defaultOneRowWithGetValue, getValueForTable, rawTable, TableProps } from "./table";
import { LabelAndFixedNumber } from "./labelAndFixedNumber";
import { NameAnd, safeArray } from "@focuson/utils";


export interface SummaryTableData {
  chargeType: string
  accNo: string;
  hold?: boolean;
  status?: string;
  type: string;
  amount: string;
}

export interface SummaryTableProps<S, D extends SummaryTableData, C> extends TableProps<S, D, C> {
}


//Step 1: make a dataD for this data. It is identical in structure to authoriseTable (and please don't cut and paste)
//Step 2: when we press the summary button:
//     copy the data in the authorised table to this place in the domain.
//     open up the modal window pointing here

export function SummaryTable<S, D extends SummaryTableData, C extends FocusOnContext<S>> ( props: SummaryTableProps<S, D, C> ) {
  const { state, order, id, mode, copySelectedItemTo } = props
  // const AuthTable = rawTable<S, any, C> ( [ ...order, 'Halt' ], defaultOnClick ( props ), defaultOneRowWithGetValue ( getValueForAuthorisedTable ) ( id, order, [], haltBox ( state, id ) ) )

  const data: D[] = state.optJsonOr ( [] )
  // @ts-ignore
  const accountId = state.main.walk.the.path.to.the.account
  const dataForMyAccountIdThatIsntHeldAndIsACredit = data.filter ( d => d.accNo === accountId && d.hold !== true && d.type === 'CR' )

  const initialValue :NameAnd<number>= {};
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
  //   status_chargeType : 3948754897, status_chargeType: 23094
  const tableLines = Object.entries ( groups ).map ( ( [ key, accAmount ] ) => {
    const index = key.indexOf ( "_" )
    const status = key.slice ( 0, index ) //might be +/-1 on index
    const chargeType = key.slice ( index ) //ditto
    return { status, chargeType, accAmount }
  } )
  const totalWaste = Object.values(groups).reduce((acc, v) => acc + v)
  return <div> <table>
    {/*headers go here*/}
    <tbody>{tableLines.map ( ( { status, chargeType, accAmount } ) => <tr>
      <td>{chargeType}</td>
      <td>{status}</td>
      <td>{accAmount}</td>
    </tr> )}</tbody>
  </table>
    <label>Total Waste</label><input type='number'>{totalWaste}</input>
  </div>


}