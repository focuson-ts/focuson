import { ExampleMainPage, ExampleModalPage } from "../common";
import { CollectionItemDD, linkedAccountDetailsDD, MandateDD, MandateSearchDD } from "./linkedAccountDetails.dataD";
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
export const LinkedAccountDetailsPD: ExampleMainPage = {
  name: "LinkedAccountDetails",
  display: { target: '~/display', dataDD: linkedAccountDetailsDD },
  domain: {
    display: { dataDD: linkedAccountDetailsDD },
    selectMandateSearch: { dataDD: MandateSearchDD },
    tempMandate: { dataDD: MandateDD },
    selectIndex: { dataDD: NatNumDd },
    selectedCollectionIndex: { dataDD: NatNumDd },
    selectedCollectionItem: { dataDD: CollectionItemDD }
  },
  initialValue: undefined,
  modals: [ { modal: SelectMandateMP } ],
  modes: [ 'view' ],
  pageType: "MainPage",
  rest: {
    // singleMandate: { rest: singleMandateRD, targetFromPath: '~/display/mandate', fetcher: true },
    collectionSummary: { rest: collectionSummaryRD, targetFromPath: '~/display/collectionSummary', fetcher: true },
    collectionHistoryList: { rest: collectionHistoryListRD, targetFromPath: '~/display/collectionHistory', fetcher: true },
    searchMandate: { rest: allMandatesForClientRD, targetFromPath: '~/selectMandateSearch/searchResults', fetcher: true },
    payments: { rest: singleCollectionPaymentRD, targetFromPath: '~/selectedCollectionItem' }
  },
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
    cancelPayment: {
      control: "RestButton",
      restName: 'payments',
      action: { state: 'cancel' },deleteOnSuccess:''

    }
  },
}