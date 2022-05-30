import { DataD, DateDD, IntegerDD, OneLineStringDD, RepeatingDataD } from "../../common/dataD";
import { LayoutCd, TableCD } from "../../common/componentsD";
import { AllGuards } from "../../buttons/guardButton";


export const ChequeCreditbooksHistoryLineDD: DataD<AllGuards> = {
  name: "ChequeCreditbooksHistoryLine",
  description: "The create plan data (actually just put in one place to allow a test for a structure)",
  layout: { component: LayoutCd, displayParams: { details: '[[3]]', defaultProps: `{"valueWidth": 50}`}},
  structure: {
    serialNumber: { dataDD: { ...IntegerDD, sample: [ 937453 ] }, },
    howOrdered: { dataDD: OneLineStringDD, sample: [ 'Manually' ] },
    dateOrder: { dataDD: DateDD, sample: [ '2022-10-01' ] }
  }
}
export const ChequeCreditbooksHistoryDD: RepeatingDataD<AllGuards> = {
  name: "ChequeCreditbooksHistory",
  paged: false,
  description: "The history of how cheque and credit books have been ordered",
  dataDD: ChequeCreditbooksHistoryLineDD,
  display: TableCD,
  displayParams: { order: [ 'serialNumber', 'howOrdered', 'dateOrder' ], copySelectedIndexTo: ['selectedBook'] }
}
export const ChequeCreditbooksDD: DataD<AllGuards> = {
  name: "ChequeCreditbooks",
  description: "This is the main object for the Cheque and Credit books form",  
  structure: {
    history: { dataDD: ChequeCreditbooksHistoryDD }
  }
}
