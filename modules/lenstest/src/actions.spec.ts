import { AuthoriseTableData } from "@focuson/form_components";
import { lensState, LensState } from "@focuson/state";
import { approvePendingFees, authoriseApprovedFees } from "../../forms/src/actions";

const pending: AuthoriseTableData = { status: 'PENDING', type: 'CR', amount: '1.00' }
const pendingHeld: AuthoriseTableData = { status: 'PENDING', hold: true, type: 'CR', amount: '1.00' }
const approved: AuthoriseTableData = { status: 'APPROVED', type: 'CR', amount: '1.00' }
const approvedHeld: AuthoriseTableData = { status: 'APPROVED', hold: true, type: 'CR', amount: '1.00' }
const authorised: AuthoriseTableData = { status: 'AUTHORISED', type: 'CR', amount: '1.00' }
const authorisedHeld: AuthoriseTableData = { status: 'AUTHORISED', hold: true, type: 'CR', amount: '1.00' }

interface Holder {
  data: AuthoriseTableData[];
}
const state = ( setMain: ( h: any ) => void ) => ( ...data: AuthoriseTableData[] ): LensState<Holder, AuthoriseTableData[], any> =>
  lensState ( { data }, setMain, '', {} ).focusOn ( 'data' );

describe ( "actions", () => {

  it ( "approvePending should update pendings if they are not held", () => {
    var remembered: any = {}
    approvePendingFees ( state ( m => remembered = m ) ( pending, pending, pendingHeld, pendingHeld, approved, approvedHeld, authorised, authorisedHeld ), 'someId' )
    expect ( remembered.data ).toEqual ( [
      { "approvedBy": "you just now", "status": "APPROVED", type: 'CR', amount: '1.00' },
      { "approvedBy": "you just now", "status": "APPROVED", type: 'CR', amount: '1.00' },
      pendingHeld, pendingHeld,
      approved, approvedHeld, authorised, authorisedHeld
    ] )
  } )

  it ( "authoriseApprovedFees should update approved if they are not held", () => {
    var remembered: any = {}
    authoriseApprovedFees ( state ( m => remembered = m ) ( pending, pending, pendingHeld, pendingHeld, approved, approvedHeld, authorised, authorisedHeld ), 'someId' )
    expect ( remembered.data ).toEqual ( [
      pending, pending, pendingHeld, pendingHeld, { "authorisedBy": "you just now", status: 'AUTHORISED', type: 'CR', amount: '1.00' }, approvedHeld, authorised, authorisedHeld
    ] )
  } )
} )