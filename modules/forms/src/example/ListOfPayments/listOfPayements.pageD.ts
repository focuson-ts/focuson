import { AccountDetailsDD, addressSearchDD, CurrentPaymentCountsDD, postCodeDataForListOfPaymentsLineD, printRecordDD, PrintRecordHistoryDD } from "./listOfPayements.dataD";
import { accountAndAddressDetailsRD, CurrentPaymentCountsRD, postcodeRestD, PrintRecordHistoryRD, PrintRecordRD, sortCodeLookupDD, sortcodeLookUpRD } from "./listOfPayements.restD";
import { ExampleMainPage, ExampleModalPage } from "../common";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";
import { RawButtons } from "../../buttons/allButtons";
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
    canPrint: { condition: 'equals', value: false, path: '~/tempListOfPayments/alreadyPrinted', message: 'Already been printed' },
    sortCodeValid: { condition: 'regex', regex: /^[0-9]{2}[-][0-9]{2}[-][0-9]{2}$/, path: '~/tempListOfPayments/newBankDetails/sortCode' }
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
    },
    search: {
      control: 'RestButton', restName: 'sortCodeLookup', action: 'get', validate: false,
      enabledBy: 'sortCodeValid',
      copyOnSuccess: { from: 'bankName', to: '~/tempListOfPayments/newBankDetails/bank' },
    }
  },
}

const addOrEditButton: RawButtons<AllGuards> = {
  control: 'ModalButton', modal: EditlistOfPaymentsPagePD,
  mode: 'edit',
  focusOn: '~/tempListOfPayments',
  createEmpty: printRecordDD,
  copyOnClose: { to: '~/display[~/selected]' }
}

const addButton: RawButtons<AllGuards> = {
  ...addOrEditButton,
  mode: "create",
  copyOnClose: { to: '~/display[$append]' },
  setToLengthOnClose: { variable: '~/selected', array: '~/display' },
  restOnCommit: { restName: 'onePayment', action: 'createWithoutFetch', result: "refresh", pathToDelete: [ '~/display' ] }
}

const editButton: RawButtons<AllGuards> = {
  ...addOrEditButton,
  enabledBy: 'canPrint',
  mode: "edit",
  copyOnClose: { to: '~/display[~/selected]' },
  copy: [ { from: '~/display[~/selected]' }, ...toArray ( addOrEditButton.copy ) ],
  restOnCommit: { restName: 'onePayment', action: 'updateWithoutFetch', result: "refresh", pathToDelete: [ '~/display' ] }
}

export const ListOfPaymentsPagePD: ExampleMainPage = {
  pageType: "MainPage",
  name: "ListOfPaymentsPage",
  title: "The List Of Payments",
  display: { target: '~/display', dataDD: PrintRecordHistoryDD },
  domain: {
    display: { dataDD: PrintRecordHistoryDD },
    tempListOfPayments: { dataDD: printRecordDD },
    selected: { dataDD: NatNumDd },
    currentPayments: { dataDD: CurrentPaymentCountsDD },
    accountDetails: { dataDD: AccountDetailsDD },
    addressSearch: { dataDD: addressSearchDD },
    selectedPostCodeIndex: { dataDD: OneLineStringDD },
    selectedPostCodeAddress: { dataDD: postCodeDataForListOfPaymentsLineD },
    sortCodeLookup: { dataDD: sortCodeLookupDD }
  },
  modals: [ { modal: EditlistOfPaymentsPagePD }, { modal: AddressModalPage } ],
  modes: [ 'view' ],
  initialValue: { command: 'set', path: '~/selected', value: 0 },
  rest: {
    paymentHistory: { rest: PrintRecordHistoryRD, fetcher: true, targetFromPath: '~/display' },
    onePayment: { rest: PrintRecordRD, fetcher: false, targetFromPath: '~/display[~/selected]' },
    currentPayments: { rest: CurrentPaymentCountsRD, fetcher: true, targetFromPath: '~/currentPayments' },
    accountDetails: { rest: accountAndAddressDetailsRD, fetcher: true, targetFromPath: '~/accountDetails' },
    postcode: { rest: postcodeRestD, targetFromPath: '~/addressSearch/searchResult' },
    sortCodeLookup: { rest: sortcodeLookUpRD, targetFromPath: '~/sortCodeLookup' },
  },
  variables: {
    selectedItem: { constructedBy: 'path', path: '~/display[~/selected]' },
    currentListOfPayments: { constructedBy: 'path', path: '#selectedItem/listOfPayments' }
  },
  guards: {
    canPrint: { condition: 'equals', value: false, path: '~/display[~/selected]/alreadyPrinted', message: 'This record has already been printed' },

    needsStandingOrders: { condition: '>0 and true', number: '~/currentPayments/standingOrders', boolean: '#currentListOfPayments/standingOrders' },
    needsOpenBankingStandingOrders: { condition: '>0 and true', number: '~/currentPayments/openBankingStandingOrders', boolean: '#currentListOfPayments/openBankingStandingOrders' },
    needsDirectDirects: { condition: '>0 and true', number: '~/currentPayments/directDebits', boolean: '#currentListOfPayments/directDebits' },
    needBillPayments: { condition: '>0 and true', number: '~/currentPayments/billPayments', boolean: '#currentListOfPayments/billPayments' },
    needsOpenBanking: { condition: '>0 and true', number: '~/currentPayments/openBanking', boolean: '#currentListOfPayments/billPayments' },
    needsSomething: { condition: 'or', conditions: [ 'needsStandingOrders', 'needsOpenBankingStandingOrders', 'needsDirectDirects', 'needBillPayments', 'needsOpenBanking' ] },

    authorisedByUser: { condition: 'equals', value: '"y"', path: '~/display[~/selected]/authorisedByCustomer' },
    sendingToUser: { condition: 'contains', values: [ 'M', 'J' ], path: '~/display[~/selected]/requestedBy' },
    authorisedToSend: { condition: 'or', conditions: [ 'sendingToUser', 'authorisedByUser' ] }
  },
  buttons: {
    prev: { control: 'ListPrevButton', list: '~/display', value: '~/selected' },
    next: { control: 'ListNextButton', list: '~/display', value: '~/selected' },
    add: addButton,
    edit: editButton,
    print: {
      control: 'RestButton', action: { state: 'print' }, restName: 'onePayment',
      enabledBy: [ 'authorisedToSend', 'needsSomething', 'canPrint' ],
      confirm: 'Really?',
      validate: false,
      deleteOnSuccess: '~/display',
    },
  },
}