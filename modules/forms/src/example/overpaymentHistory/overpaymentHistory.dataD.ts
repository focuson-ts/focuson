import { ExampleDataD, ExampleRepeatingD } from "../common";
import { DateDD, MoneyDD } from "../../common/dataD";
import { TableCD } from "../../common/componentsD";
import { paymentStatus } from "../linkedAccount/linkedAccountDetails.dataD";

export const OverpaymentHistoryLineDD: ExampleDataD = {
  name: 'OverpaymentHistoryLine',
  description: 'A single overpayment in the past',
  structure: {
    amountReceived: { dataDD: MoneyDD, sample: [ 1234, 3656734 ] },
    date: { dataDD: DateDD, sample: [ '2020/10/1', '2021/9/1' ] },
    status: { dataDD: paymentStatus },
  }
}
export const OverpaymentHistory: ExampleRepeatingD = {
  dataDD: OverpaymentHistoryLineDD,
  description: "All the history ",
  display: TableCD,
  displayParams: { order: [ "amountReceived", 'date', 'status' ] },
  name: "OverpaymentHistory",
  paged: false
}
export const OverpaymentPageDD: ExampleDataD = {
  name: 'OverpaymentPage',
  description: 'A single overpayment in the past',
  structure: {
    history: { dataDD: OverpaymentHistory },
    drawDownDate: { dataDD: DateDD, sample: [ '2020/10/1', '2021/9/1' ] },
    initialBorrowing: { dataDD: MoneyDD, sample: [ 100010, 200020 ] },
  }
}