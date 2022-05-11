import { ExampleMainPage, ExampleModalPage } from "../common";
import { NatNumDd } from "../commonEnums";
import { printRecordDD, PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { PrintRecordHistoryRD } from "./listOfPayements.restD";

export const EditlistOfPaymentsPagePD: ExampleModalPage = {
  pageType: 'ModalPage',
  name: 'EditListOfPayments',
  display: { target: '~/tempListOfPayments', dataDD: printRecordDD },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  }
}
export const ListOfPaymentsPagePD: ExampleMainPage = {
  pageType: "MainPage",
  name: "ListOfPaymentsPage",
  display: { target: '~/display', dataDD: PrintRecordHistoryDD },
  domain: {
    display: { dataDD: PrintRecordHistoryDD },
    tempListOfPayments: { dataDD: printRecordDD },
    selected: { dataDD: NatNumDd }
  },
  modals: [ { modal: EditlistOfPaymentsPagePD } ],
  modes: [ 'edit' ],
  initialValue: { selected: 0 },
  rest: {
    paymentHistory: { rest: PrintRecordHistoryRD, fetcher: true, targetFromPath: '~/display' }
  },
  buttons: {
    prev: { control: 'ListPrevButton', list: '~/display', value: '~/selected' },
    next: { control: 'ListNextButton', list: '~/display', value: '~/selected' },
    add: {
      control: 'ModalButton', modal: EditlistOfPaymentsPagePD, mode: 'create',
      // createEmpty: PrintRecordHistoryDD,
      focusOn: '~/tempListOfPayments',
      copy: { from: '~/display[~/selected]' },
      // setToLengthOnClose: { variable: '~/selected', array: '~/display' },
      copyOnClose: { to: '~/display[$append]' }
    }
  },
}