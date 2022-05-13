import { NatNumDd } from "../commonEnums";
import { AccountDetailsDD, CurrentPaymentCountsDD, printRecordDD, PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { accountAndAddressDetailsRD, CurrentPaymentCountsRD, PrintRecordHistoryRD } from "./listOfPayements.restD";
import { ExampleMainPage, ExampleModalPage } from "../common";

export const EditlistOfPaymentsPagePD: ExampleModalPage = {
  pageType: 'ModalPage',
  name: 'EditListOfPayments',
  display: { target: '~/tempListOfPayments', dataDD: printRecordDD },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton', text: 'back' },
    commit: { control: 'ModalCommitButton', text: 'save' }
  }
}
export const ListOfPaymentsPagePD: ExampleMainPage = {
  pageType: "MainPage",
  name: "ListOfPaymentsPage",
  display: { target: '~/display', dataDD: PrintRecordHistoryDD },
  domain: {
    display: { dataDD: PrintRecordHistoryDD },
    tempListOfPayments: { dataDD: printRecordDD },
    selected: { dataDD: NatNumDd },
    currentPayments: { dataDD: CurrentPaymentCountsDD },
    accountDetails: { dataDD: AccountDetailsDD },
  },
  modals: [ { modal: EditlistOfPaymentsPagePD } ],
  modes: [ 'edit' ],
  initialValue: { selected: 0 },
  rest: {
    paymentHistory: { rest: PrintRecordHistoryRD, fetcher: true, targetFromPath: '~/display' },
    currentPayments: { rest: CurrentPaymentCountsRD, fetcher: true, targetFromPath: '~/currentPayments' },
    accountDetails: { rest: accountAndAddressDetailsRD, fetcher: true, targetFromPath: '~/accountDetails' },

  },
  guards: {
    canPrint: { condition: 'equals', value: false, path: '~/display[~/selected]/alreadyPrinted' },
    hasStandingOrders: { condition: '>0', path: '~/display[~/selected]/listOfPayments/standingOrders/numberOfItems' },
    hasOpenBankingStandingOrders: { condition: '>0', path: '~/display[~/selected]/listOfPayments/openBankingStandingOrders/numberOfItems' },
    hasDirectDebits: { condition: '>0', path: '~/display[~/selected]/listOfPayments/directDebits/numberOfItems' },
    hasBillPayments: { condition: '>0', path: '~/display[~/selected]/listOfPayments/billPayments/numberOfItems' },
    hasOpenBanking: { condition: '>0', path: '~/display[~/selected]/listOfPayments/openBanking/numberOfItems' },
    hasSomethingToPrint: { condition: 'or', conditions: [ 'hasStandingOrders', 'hasOpenBankingStandingOrders', 'hasDirectDebits', 'hasBillPayments', 'hasOpenBanking' ] }
  },
  buttons: {
    prev: { control: 'ListPrevButton', list: '~/display', value: '~/selected' },
    next: { control: 'ListNextButton', list: '~/display', value: '~/selected' },
    print: {
      control: 'RestButton', action: { state: 'print' }, restName: 'paymentHistory',
      enabledBy: [ 'canPrint', 'hasSomethingToPrint' ],
      confirm: 'Really?',
      deleteOnSuccess: '~/display'
    },
    add: {
      control: 'ModalButton', modal: EditlistOfPaymentsPagePD, mode: 'create',
      focusOn: '~/tempListOfPayments',
      createEmpty: printRecordDD,
      copy: [
        { from: '~/currentPayments/standingOrders', to: '~/tempListOfPayments/listOfPayments/standingOrders/numberOfItems' },
        { from: '~/currentPayments/openBankingStandingOrders', to: '~/tempListOfPayments/listOfPayments/openBankingStandingOrders/numberOfItems' },
        { from: '~/currentPayments/directDebits', to: '~/tempListOfPayments/listOfPayments/directDebits/numberOfItems' },
        { from: '~/currentPayments/billPayments', to: '~/tempListOfPayments/listOfPayments/billPayments/numberOfItems' },
        { from: '~/currentPayments/openBanking', to: '~/tempListOfPayments/listOfPayments/openBanking/numberOfItems' },
      ],
      setToLengthOnClose: { variable: '~/selected', array: '~/display' },
      copyOnClose: { to: '~/display[$append]' }
    }
  },
}