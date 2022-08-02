import { ExampleMainPage, ExampleModalPage } from "../common";
import { CollectionItemDD, CreatePaymentDD, linkedAccountDetailsDD, MandateDD, MandateSearchDD } from "./linkedAccountDetails.dataD";
import { allMandatesForClientRD, collectionHistoryListRD, collectionSummaryRD, createPaymentRD, singleCollectionPaymentRD } from "./linkedAccountDetails.restD";
import { NatNumDd } from "../../common/dataD";
import { OverpaymentMainPage } from "../overpaymentHistory/overpaymentHistory.pageD";

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

  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton', confirm: "Do you really want to create this payment?" },
    overpaymentHistory: {
      control: 'ModalButton',
      mode: 'view',
      main: OverpaymentMainPage,
      copy: { from: '~/rememberedForTest', to: '~/selectedIndex' },
      copyOnClose: { from: '~/selectedIndex', to: '~/rememberedForTest' },
    }
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
    rememberedForTest: { dataDD: NatNumDd },
  },
  initialValue: [ 'empty', { command: 'message', msg: 'started' }, { command: "deletePageTags" } ],
  modals: [ { modal: SelectMandateMP }, { modal: CreatePaymentMP }, { main: OverpaymentMainPage } ],
  modes: [ 'view' ],
  pageType: "MainPage",
  rest: {
    // singleMandate: { rest: singleMandateRD, targetFromPath: '~/display/mandate', fetcher: true },
    collectionSummary: { rest: collectionSummaryRD, targetFromPath: '~/display/collectionSummary', fetcher: true },
    collectionHistoryList: { rest: collectionHistoryListRD, targetFromPath: '~/display/collectionHistory', fetcher: true },
    searchMandate: { rest: allMandatesForClientRD, targetFromPath: '~/selectMandateSearch/searchResults', fetcher: true },
    payments: { rest: singleCollectionPaymentRD, targetFromPath: '~/selectedCollectionItem' },
    createPayment: { rest: createPaymentRD, targetFromPath: '~/createPayment' },
  },
  guards: { haveLegalSelectedPayment: { condition: 'isDefined', path: '~/selectedCollectionItem/paymentId' } },
  buttons: {
    selectMandate: {
      control: 'ModalButton',
      modal: SelectMandateMP, mode: 'edit',
      focusOn: '~/selectMandateSearch',
      copy: [
        { from: '~/display/mandate', to: '~/tempMandate' },
      ],
      deleteOnOpen: '~/selectIndex',
      copyJustString: [
        { from: '~/display/mandate/sortCode', to: '~/selectMandateSearch/sortCode', joiner: '-' },
      ],
      copyOnClose: { from: '~/tempMandate', to: '~/display/mandate' }
    },
    createPayment: {
      control: 'ModalButton',
      mode: 'create',
      focusOn: '~/createPayment',
      modal: CreatePaymentMP,
      createEmpty: CreatePaymentDD,
      copy: [
        { from: '~/display/collectionSummary/allowance', to: '~/createPayment/allowance' },
        { from: '~/display/collectionSummary/period', to: '~/createPayment/period' } ],
      changeOnClose: { command: 'message', msg: 'sending payment request' },
      restOnCommit: {
        restName: 'createPayment', action: 'create',
        pathToDelete: [ '~/display/collectionSummary', '~/display/collectionHistory' ],
        changeOnSuccess: { command: 'message', msg: 'made payment {/CommonIds/accountId}' },
        on404: { command: 'message', msg: '404 happened' },
        result: 'refresh'
      }
    },
    cancelPayment: {
      control: "RestButton",
      restName: 'payments',
      confirm: 'Really?',
      enabledBy: 'haveLegalSelectedPayment',
      validate: false,
      action: { state: 'cancel' },
      deleteOnSuccess: [ '~/display/collectionSummary', '~/display/collectionHistory', '~/selectedCollectionIndex' ]
    },
    refreshMandate: {
      control: 'DeleteStateButton', path: [ '~/display/collectionSummary', '~/display/collectionHistory' ], label: "Refresh Mandate",
    }
  },
}