import { ExampleMainPage, ExampleModalPage } from "../common";
import { CollectionItemDD, CreatePaymentDD, linkedAccountDetailsDD, MandateDD, MandateSearchDD, paymentReasonDD } from "./linkedAccountDetails.dataD";
import { allMandatesForClientRD, collectionHistoryListRD, collectionSummaryRD, singleCollectionPaymentRD } from "./linkedAccountDetails.restD";
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

export const CreatePaymentMP: ExampleModalPage = {
  name: "CreatePayment",
  guards: {
    reasonHasBeenSelected: { condition: 'notEquals', path: '~/createPayment/reason', value: '' }
  },
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton', enabledBy: 'reasonHasBeenSelected' }
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
    createPayment: { dataDD: CreatePaymentDD }
  },
  initialValue: undefined,
  modals: [ { modal: SelectMandateMP }, { modal: CreatePaymentMP } ],
  modes: [ 'view' ],
  pageType: "MainPage",
  rest: {
    // singleMandate: { rest: singleMandateRD, targetFromPath: '~/display/mandate', fetcher: true },
    collectionSummary: { rest: collectionSummaryRD, targetFromPath: '~/display/collectionSummary', fetcher: true },
    collectionHistoryList: { rest: collectionHistoryListRD, targetFromPath: '~/display/collectionHistory', fetcher: true },
    searchMandate: { rest: allMandatesForClientRD, targetFromPath: '~/selectMandateSearch/searchResults', fetcher: true },
    payments: { rest: singleCollectionPaymentRD, targetFromPath: '~/selectedCollectionItem' }
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
      createEmpty: CreatePaymentDD,
      copy: [
        { from: '~/display/collectionSummary/allowance', to: '~/createPayment/allowance' },
        { from: '~/display/collectionSummary/period', to: '~/createPayment/period' } ],
      modal: CreatePaymentMP, mode: 'create', focusOn: '~/createPayment'
    },
    cancelPayment: {
      control: "RestButton",
      restName: 'payments',
      confirm: 'Really?',
      enabledBy: 'haveLegalSelectedPayment',
      action: { state: 'cancel' }, deleteOnSuccess: [ '~/display/collectionSummary', '~/display/collectionHistory' ]
    },
    refreshMandate: {
      control: 'DeleteStateButton', path: [ '~/display/collectionSummary', '~/display/collectionHistory' ], label: "Refresh Mandate",
    }
  },
}