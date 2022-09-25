import { AuthoriseTableData } from "@focuson/form_components";
import { lensState, LensState } from "@focuson/state";
import { approvePendingFees, authoriseApprovedFees } from "../../forms/src/actions";
import { displayTransformsInState } from "@focuson/lens";

const pending: AuthoriseTableData = { status: 'PENDING', type: 'CR', amount: '1.00' }
const pendingHeld: AuthoriseTableData = { status: 'PENDING', hold: true, type: 'CR', amount: '1.00' }
const approved: AuthoriseTableData = { status: 'APPROVED', type: 'CR', amount: '1.00' }
const approvedHeld: AuthoriseTableData = { status: 'APPROVED', hold: true, type: 'CR', amount: '1.00' }
const authorised: AuthoriseTableData = { status: 'AUTHORISED', type: 'CR', amount: '1.00' }
const authorisedHeld: AuthoriseTableData = { status: 'AUTHORISED', hold: true, type: 'CR', amount: '1.00' }

interface Holder {
  CommonIds: { operatorName: string }
  data: AuthoriseTableData[];
}
const state = ( setMain: ( h: any ) => void ) => ( ...data: AuthoriseTableData[] ): LensState<Holder, AuthoriseTableData[], any> =>
  lensState ( { data, CommonIds: { operatorName: 'Phil' } }, setMain, '', {} ).focusOn ( 'data' );

describe ( "actions", () => {

  it ( "approvePending should update pendings if they are not held", () => {
    var remembered: any = {}
    const start: LensState<Holder, AuthoriseTableData[], any> = state ( m => remembered = m ) ( pending, pending, pendingHeld, pendingHeld, approved, approvedHeld, authorised, authorisedHeld );
    expect ( displayTransformsInState ( start.main, approvePendingFees ( start, 'someId' ) ) ).toEqual ( [
      {
        "opt": ".focus?(data).chain([0])",
        "value": { "amount": "1.00", "approvedBy": "Phil", "status": "APPROVED", "type": "CR" }
      },
      {
        "opt": ".focus?(data).chain([1])",
        "value": { "amount": "1.00", "approvedBy": "Phil", "status": "APPROVED", "type": "CR" }
      }
    ] )
    expect ( remembered ).toEqual ( {} )
  } )

  it ( "authoriseApprovedFees should update approved if they are not held", () => {
    var remembered: any = {}
    const start = state ( m => remembered = m ) ( pending, pending, pendingHeld, pendingHeld, approved, approvedHeld, authorised, authorisedHeld );
    expect ( displayTransformsInState ( start.main, authoriseApprovedFees ( start, 'someId' ) ) ).toEqual ( [
      {
        "opt": ".focus?(data).chain([4])",
        "value": { "amount": "1.00", "authorisedBy": "Phil", "status": "AUTHORISED", "type": "CR" }
      }
    ] )
    expect ( remembered ).toEqual ( {} )
  } )
} )