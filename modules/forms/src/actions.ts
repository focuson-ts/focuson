import { LensState, reasonFor } from "@focuson/state";
import { AuthoriseTableData } from "@focuson/form_components";
import { Lenses, Transform } from "@focuson/lens";
import { safeArray } from "@focuson/utils";
import { ModalContext, openConfirmWindow } from "@focuson/pages";

function sum<D extends AuthoriseTableData> ( ds: D[], crOrDr: 'CR' | 'DR' ): number {
  return safeArray ( ds ).reduce ( ( acc, v ) => v.type == crOrDr ? acc + Number.parseFloat ( v.amount ) : acc, 0 )
}

function updateTable<S, D extends AuthoriseTableData, C extends ModalContext<S>> ( s: LensState<S, D[], C>, id: string, update: keyof D, fromValue: string, toValue: string ) {
  // @ts-ignore
  const operatorName = s.main?.CommonIds?.operatorName;
  const rows = s.optJsonOr ( [] )
  const lens = s.optional
  const credits = sum ( rows, 'CR' )
  const debits = sum ( rows, 'DR' )
  const balance = credits - debits
  console.log ( 'updateTable', 'credits', credits, 'debits', debits, 'balanace', balance )
  if ( balance !== 0 ) {
    openConfirmWindow ( { title: `The balance is ${balance} which is not zero`, messageText: update.toString() }, 'justclose', [], s, 'AuthoriseButton', id, 'onClick' )
    return
  }
  const txs: Transform<S, any>[] = rows.flatMap ( ( row, i ) =>
    row.hold !== true && row.status === fromValue ? [
      [ lens.chain ( Lenses.nth ( i ) ),
        old => {
          let newValue = { ...old, status: toValue };
          newValue[ update ] = operatorName
          return newValue;
        } ]
    ] : [] )
  s.massTransform ( reasonFor ( 'ActionButton', 'onClick', id ) ) ( ...txs )
}

export function approvePendingFees<S, D extends AuthoriseTableData, C extends ModalContext<S>> ( s: LensState<S, D[], C>, id: string ) {
  updateTable ( s, id, 'approvedBy', 'PENDING', 'APPROVED' )
}
export function authoriseApprovedFees<S, D extends AuthoriseTableData, C extends ModalContext<S>> ( s: LensState<S, D[], C>, id: string ) {
  updateTable ( s, id, 'authorisedBy', 'APPROVED', 'AUTHORISED' )

}