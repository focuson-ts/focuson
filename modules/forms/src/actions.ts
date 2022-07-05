import { LensState, reasonFor } from "@focuson/state";
import { AuthoriseTableData } from "@focuson/form_components";
import { Lenses, Transform } from "@focuson/lens";


function updateTable<S, D extends AuthoriseTableData, C> ( s: LensState<S, D[], C>, id: string, update: keyof D, fromValue: string, toValue: string ) {
  const rows = s.optJsonOr ( [] )
  const lens = s.optional
  const txs: Transform<S, any>[] = rows.flatMap ( ( row, i ) =>
    row.hold !== true && row.status === fromValue ? [
      [ lens.chain ( Lenses.nth ( i ) ),
        old => {
          let newValue = { ...old, status: toValue };
          newValue[ update ] = 'you just now'
          return newValue;
        } ]
    ] : [] )
  s.massTransform ( reasonFor ( 'ActionButton', 'onClick', id ) ) ( ...txs )
}

export function approvePendingFees<S, D extends AuthoriseTableData, C> ( s: LensState<S, D[], C>, id: string ) {
  updateTable ( s, id, 'approvedBy', 'PENDING', 'APPROVED' )
}
export function authoriseApprovedFees<S, D extends AuthoriseTableData, C> ( s: LensState<S, D[], C>, id: string ) {
  updateTable ( s, id, 'authorisedBy', 'APPROVED', 'AUTHORISED' )

}