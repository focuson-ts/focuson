import { ExampleMainPage, ExampleModalPage } from "../common";
import { CollectionItemDD, CreatePaymentDD, linkedAccountDetailsDD, MandateDD, MandateSearchDD, OverpaymentPageDD, paymentReasonDD } from "./linkedAccountDetails.dataD";
import { allMandatesForClientRD, collectionHistoryListRD, collectionSummaryRD, createPaymentRD, overpaymentHistoryRD, singleCollectionPaymentRD } from "./linkedAccountDetails.restD";
import { NatNumDd } from "../commonEnums";

export const SelectMandateMP: ExampleModalPage = {
  name: "SelectMandate",
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton', validate: false }
  },
  pageType: 'ModalPopup',
  display: { dataDD: MandateSearchDD, target: '~/selectMandateSearch' },
  modes: [ 'view', 'edit' ],
}


export const OverpaymentMP: ExampleModalPage = {
  name: "OverpaymentModalPage",
  buttons: {
    cancel: { control: 'ModalCancelButton' },
  },
  pageType: 'ModalPopup',
  display: { dataDD: OverpaymentPageDD, target: '~/overpayment' },
  modes: [ 'view' ],
}

export const CreatePaymentMP: ExampleModalPage = {
  name: "CreatePayment",
  guards: {
    reasonHasBeenSelected: { condition: 'notEquals', path: '~/createPayment/reason', value: '' }
  },
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton', enabledBy: 'reasonHasBeenSelected' },
    overpaymentHistory: {
      control: 'ModalButton',
      mode: 'view', focusOn: '~/overpayment',
      modal: OverpaymentMP
    },
  },
  pageType: 'ModalPopup',
  display: { dataDD: CreatePaymentDD, target: '~/createPayment' },
  modes: [ 'view', 'edit' ],
}

export const LinkedAccountDetailsPD: ExampleMainPage = {
  name: "LinkedAccountDetails",
  display: { target: '~/display', dataDD: linkedAccountDetailsDD },
  domain: {
    display: { dataDD: linkedAccountDetailsDD },
    selectMandateSearch: { dataDD: MandateSearchDD },
    tempMandate: { dataDD: MandateDD },
    selectIndex: { dataDD: NatNumDd },
    selectedCollectionIndex: { dataDD: NatNumDd },
    selectedCollectionItem: { dataDD: CollectionItemDD },
    createPayment: { dataDD: CreatePaymentDD },
    overpayment: { dataDD: OverpaymentPageDD }
  },
  initialValue: undefined,
  modals: [ { modal: SelectMandateMP }, { modal: CreatePaymentMP }, { modal: OverpaymentMP } ],
  modes: [ 'view' ],
  pageType: "MainPage",
  rest: {
    // singleMandate: { rest: singleMandateRD, targetFromPath: '~/display/mandate', fetcher: true },
    collectionSummary: { rest: collectionSummaryRD, targetFromPath: '~/display/collectionSummary', fetcher: true },
    collectionHistoryList: { rest: collectionHistoryListRD, targetFromPath: '~/display/collectionHistory', fetcher: true },
    searchMandate: { rest: allMandatesForClientRD, targetFromPath: '~/selectMandateSearch/searchResults', fetcher: true },
    payments: { rest: singleCollectionPaymentRD, targetFromPath: '~/selectedCollectionItem' },
    createPayment: { rest: createPaymentRD, targetFromPath: '~/createPayment' },
    overpaymentHistory: { rest: overpaymentHistoryRD, targetFromPath: '~/overpayment', fetcher: true },

  },
  guards: { haveLegalSelectedPayment: { condition: 'isDefined', path: '~/selectedCollectionItem/paymentId' } },
  buttons: {
    selectMandate: {
      control: 'ModalButton',
      modal: SelectMandateMP, mode: 'edit', focusOn: '~/selectMandateSearch',
      copy: [
        { from: '~/display/mandate/sortCode', to: '~/selectMandateSearch/sortCode' },
        { from: '~/display/mandate', to: '~/tempMandate' },
      ],
      copyOnClose: { from: '~/tempMandate', to: '~/display/mandate' }
    },
    createPayment: {
      control: 'ModalButton',
      mode: 'create', focusOn: '~/createPayment',
      modal: CreatePaymentMP,
      createEmpty: CreatePaymentDD,
      copy: [
        { from: '~/display/collectionSummary/allowance', to: '~/createPayment/allowance' },
        { from: '~/display/collectionSummary/period', to: '~/createPayment/period' } ],
      restOnCommit: { restName: 'createPayment', action: 'create', pathToDelete: [ '~/display/collectionSummary', '~/display/collectionHistory' ], result: 'refresh' }
    },

    cancelPayment: {
      control: "RestButton",
      restName: 'payments',
      confirm: 'Really?',
      enabledBy: 'haveLegalSelectedPayment',
      action: { state: 'cancel' },
      deleteOnSuccess: [ '~/display/collectionSummary', '~/display/collectionHistory', '~/selectedCollectionIndex' ]
    },
    refreshMandate: {
      control: 'DeleteStateButton', path: [ '~/display/collectionSummary', '~/display/collectionHistory' ], label: "Refresh Mandate",
    }
  },
}