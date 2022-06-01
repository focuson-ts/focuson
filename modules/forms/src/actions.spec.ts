import { AuthoriseTableData } from "exampleapp/src/formComponents/authoriseTable";
import { approvePendingFees, authoriseApprovedFees } from "./actions";
import { lensState, LensState } from "@focuson/state";

const pending: AuthoriseTableData = { status: 'PENDING' }
const pendingHeld: AuthoriseTableData = { status: 'PENDING', hold: true }
const approved: AuthoriseTableData = { status: 'APPROVED' }
const approvedHeld: AuthoriseTableData = { status: 'APPROVED', hold: true }
const authorised: AuthoriseTableData = { status: 'AUTHORISED' }
const authorisedHeld: AuthoriseTableData = { status: 'AUTHORISED', hold: true }

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
      { "approvedBy": "you just now", "status": "APPROVED" },
      { "approvedBy": "you just now", "status": "APPROVED" },
      pendingHeld, pendingHeld,
      approved, approvedHeld, authorised, authorisedHeld
    ] )
  } )
  it ( "authoriseApprovedFees should update approved if they are not held", () => {
    var remembered: any = {}
    authoriseApprovedFees ( state ( m => remembered = m ) ( pending, pending, pendingHeld, pendingHeld, approved, approvedHeld, authorised, authorisedHeld ), 'someId' )
    expect ( remembered.data ).toEqual ( [
      pending, pending, pendingHeld, pendingHeld, { "authorisedBy": "you just now", status: 'AUTHORISED' }, approvedHeld, authorised, authorisedHeld
    ] )
  } )
} )