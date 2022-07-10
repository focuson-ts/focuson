import { maxTuplesFor } from "../makeFiles/generate";
import { JointAccountPageD } from "../example/jointAccount/jointAccount.pageD";
import { PaymentsPageD } from "../example/payments/payments.pageD";
import { PostCodeMainPage } from "../example/postCodeDemo/addressSearch.pageD";
import { OverpaymentMainPage } from "../example/overpaymentHistory/overpaymentHistory.pageD";


describe ( "maxTuplesFor", () => {
  it ( "should include the calculation for guards", () => {
    expect ( maxTuplesFor ( [ PaymentsPageD ] ) ).toEqual ( 15 )
  } )
  it ( "should not crash with no params", () => {
    expect ( maxTuplesFor ( [ JointAccountPageD ] ) ).toEqual ( 0 )
  } )
  it ( "should calculate from the params", () => {
    expect ( maxTuplesFor ( [ OverpaymentMainPage ] ) ).toEqual ( 1 )
  } )
} )