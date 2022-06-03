import {} from "../commonEnums";
import { AccountDetailsDD, addressSearchDD, CurrentPaymentCountsDD, postCodeDataForListOfPaymentsLineD, printRecordDD, PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { accountAndAddressDetailsRD, CurrentPaymentCountsRD, postcodeRestD, PrintRecordHistoryRD, PrintRecordRD } from "./listOfPayements.restD";
import { ExampleMainPage, ExampleModalPage } from "../common";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";
import { ButtonDefnInPage } from "../../common/pageD";
import { AllButtonsInPage, RawButtons } from "../../buttons/allButtons";
import { AllGuards } from "../../buttons/guardButton";
import { NatNumDd, OneLineStringDD } from "../../common/dataD";
import { toArray } from "@focuson/utils";

export const AddressModalPage: ExampleModalPage = {
  pageType: 'ModalPage',
  name: 'AddressModalPage',
  display: { target: '~/addressSearch', dataDD: addressSearchDD },
  modes: [ 'edit' ],
  guards: { userClickedResult: { condition: 'isDefined', path: '~/selectedPostCodeIndex' } },
  layout: { component: HideButtonsCD, displayParams: { hide: [ 'search' ] } },
  buttons: {
    cancel: { control: 'ModalCancelButton', text: 'back' },
    commit: { control: 'ModalCommitButton', text: 'save', enabledBy: 'userClickedResult' },
    search: {
      control: 'RestButton', action: 'get', restName: 'postcode',
      deleteOnSuccess: '~/selectedPostCodeIndex'
    },
  }
}
export const EditlistOfPaymentsPagePD: ExampleModalPage = {
  pageType: 'ModalPage',
  name: 'EditListOfPayments',
  display: { target: '~/tempListOfPayments', dataDD: printRecordDD },
  modes: [ 'edit' ],
  layout: { component: HideButtonsCD, displayParams: { hide: [ 'address' ] } },
  guards: {
    canPrint: { condition: 'equals', value: false, path: '~/tempListOfPayments/alreadyPrinted' },
  },
  buttons: {
    cancel: { control: 'ModalCancelButton', text: 'back' },
    commit: { control: 'ModalCommitButton', text: 'save' },
    address: {
      control: 'ModalButton', modal: AddressModalPage,
      mode: 'edit',
      createEmpty: addressSearchDD,
      focusOn: '~/addressSearch',
      enabledBy: 'canPrint', copyOnClose: [
        { from: '~/selectedPostCodeAddress/line1', to: '~/tempListOfPayments/newBankDetails/line1' }, //could do simpler, but this is a demo of multiple lines
        { from: '~/selectedPostCodeAddress/line2', to: '~/tempListOfPayments/newBankDetails/line2' },
        { from: '~/selectedPostCodeAddress/line3', to: '~/tempListOfPayments/newBankDetails/line3' },
        { from: '~/selectedPostCodeAddress/line4', to: '~/tempListOfPayments/newBankDetails/line4' },
        { from: '~/selectedPostCodeAddress/postcode', to: '~/tempListOfPayments/newBankDetails/postcode' }
      ]
    }
  },
}

const addOrEditButton: RawButtons<AllGuards> = {
  control: 'ModalButton', modal: EditlistOfPaymentsPagePD,
  mode: 'edit',
  focusOn: '~/tempListOfPayments',
  enabledBy: 'canPrint',
  createEmpty: printRecordDD,
  copy: [

    { from: '~/currentPayments/standingOrders', to: '~/tempListOfPayments/listOfPayments/standingOrders/numberOfItems' },
    { from: '~/currentPayments/openBankingStandingOrders', to: '~/tempListOfPayments/listOfPayments/openBankingStandingOrders/numberOfItems' },
    { from: '~/currentPayments/directDebits', to: '~/tempListOfPayments/listOfPayments/directDebits/numberOfItems' },
    { from: '~/currentPayments/billPayments', to: '~/tempListOfPayments/listOfPayments/billPayments/numberOfItems' },
    { from: '~/currentPayments/openBanking', to: '~/tempListOfPayments/listOfPayments/openBanking/numberOfItems' },
  ],
  copyOnClose: { to: '~/display[~/selected]' }
}

const addButton: RawButtons<AllGuards> = {
  ...addOrEditButton,
  mode: "create",
  copyOnClose: { to: '~/display[$append]' },
  setToLengthOnClose: { variable: '~/selected', array: '~/display' }
}

const editButton: RawButtons<AllGuards> = {
  ...addOrEditButton,
  enabledBy: 'canPrint',
  mode: "edit",
  copyOnClose: { to: '~/display[~/selected]' },
  copy: [ { from: '~/display[~/selected]' }, ...toArray ( addOrEditButton.copy ) ]
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
    addressSearch: { dataDD: addressSearchDD },
    selectedPostCodeIndex: { dataDD: OneLineStringDD },
    selectedPostCodeAddress: { dataDD: postCodeDataForListOfPaymentsLineD }
  },
  modals: [ { modal: EditlistOfPaymentsPagePD }, { modal: AddressModalPage } ],
  modes: [ 'view' ],
  initialValue: { selected: 0 },
  rest: {
    paymentHistory: { rest: PrintRecordHistoryRD, fetcher: true, targetFromPath: '~/display' },
    onePayment: { rest: PrintRecordRD, fetcher: false, targetFromPath: '~/display[~/selected]' },
    currentPayments: { rest: CurrentPaymentCountsRD, fetcher: true, targetFromPath: '~/currentPayments' },
    accountDetails: { rest: accountAndAddressDetailsRD, fetcher: true, targetFromPath: '~/accountDetails' },
    postcode: { rest: postcodeRestD, targetFromPath: '~/addressSearch/searchResult' },
  },
  guards: {
    canPrint: { condition: 'equals', value: false, path: '~/display[~/selected]/alreadyPrinted' },

    hasStandingOrders: { condition: '>0', path: '~/display[~/selected]/listOfPayments/standingOrders/numberOfItems' },
    hasOpenBankingStandingOrders: { condition: '>0', path: '~/display[~/selected]/listOfPayments/openBankingStandingOrders/numberOfItems' },
    hasDirectDebits: { condition: '>0', path: '~/display[~/selected]/listOfPayments/directDebits/numberOfItems' },
    hasBillPayments: { condition: '>0', path: '~/display[~/selected]/listOfPayments/billPayments/numberOfItems' },
    hasOpenBanking: { condition: '>0', path: '~/display[~/selected]/listOfPayments/openBanking/numberOfItems' },
    hasSomethingToPrint: { condition: 'or', conditions: [ 'hasStandingOrders', 'hasOpenBankingStandingOrders', 'hasDirectDebits', 'hasBillPayments', 'hasOpenBanking' ] },

    authorisedByUser: { condition: 'equals', value: '"y"', path: '~/display[~/selected]/authorisedByCustomer' },
    sendingToUser: { condition: 'contains', values: [ 'M', 'J' ], path: '~/display[~/selected]/requestedBy' },
    canClickPrint: { condition: 'or', conditions: [ 'sendingToUser', 'authorisedByUser' ] }
  },
  buttons: {
    prev: { control: 'ListPrevButton', list: '~/display', value: '~/selected' },
    next: { control: 'ListNextButton', list: '~/display', value: '~/selected' },
    add: addButton,
    edit: editButton,
    print: {
      control: 'RestButton', action: { state: 'print' }, restName: 'onePayment',
      enabledBy: [ 'canClickPrint', 'hasSomethingToPrint', 'canPrint' ],
      confirm: 'Really?',
      deleteOnSuccess: '~/display'
    },
  },
}

