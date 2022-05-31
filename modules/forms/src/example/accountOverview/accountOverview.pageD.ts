import { ExampleMainPage, ExampleModalPage } from "../common";
// import { accountAllFlagsDataDD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessHistoryLineDataD, accountOverviewExcessInfoDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";
// import { accountFlagsRestDD, accountOverviewExcessHistoryRestD, accountOverviewExcessInfoRestD, accountOverviewReasonRestD, accountOverviewRestD, arrearsDetailsCurrentRestD, arrearsDetailsPreviousRestD } from "./accountOverview.restD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";

// import { ExampleMainPage, ExampleModalPage } from "../common";
import { accountAllFlagsDataDD, accountOverviewAgreementTypeDataD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessHistoryLineDataD, accountOverviewExcessInfoDataD, accountOverviewOptOutDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";
import { accountFlagsRestDD, accountOverviewAgreementTypeRestDD, accountOverviewExcessHistoryRestD, accountOverviewExcessInfoRestD, accountOverviewOptOutRestDD, accountOverviewReasonRestD, accountOverviewRestD, arrearsDetailsRestD } from "./accountOverview.restD";
// import { HideButtonsCD } from "@focuson/forms/dist/src/buttons/hideButtonsCD";

export const ArrearsDetailsModalPage: ExampleModalPage = {
  name: "ArrearsDetails",
  pageType: "ModalPage",
  display: { dataDD: arrearsDetailsDataD, target: '~/', importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' }
  },
}

export const ExcessHistoryModalPage: ExampleModalPage = {
  name: "ExcessHistory",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewExcessHistoryDataD, target: '~/', importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' },
    details: { control: 'ModalButton', modal: ArrearsDetailsModalPage, focusOn: '~/arrearsDetails', mode: 'view' }
  },
}

export const ExcessInfoModalPage: ExampleModalPage = {
  name: "ExcessInfoSearch",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewExcessInfoDataD, target: '~/', importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}
export const ReasonModalPage: ExampleModalPage = {
  name: "Reason",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewReasonDataD, target: '~/', importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}
export const AccountFlagsModalPage: ExampleModalPage = {
  name: "AccountFlags",
  pageType: "ModalPage",
  display: { dataDD: accountAllFlagsDataDD, target: '~/', importFrom: 'AccountOverview' },
  modes: [ 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}

export const OptOutModalPage: ExampleModalPage = {
  name: "OptOut",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewOptOutDataD, target: '~/', importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}

export const AgreementTypeModalPage: ExampleModalPage = {
  name: "AgreementType",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewAgreementTypeDataD, target: '~/', importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}

export const AccountOverviewMainPage: ExampleMainPage = {
  name: "AccountOverview",
  pageType: "MainPage",
  display: { dataDD: accountOverviewDataD, target: '~/main' },
  domain: {
    main: { dataDD: accountOverviewDataD },
    excessInfo: { dataDD: accountOverviewExcessInfoDataD },
    reason: { dataDD: accountOverviewReasonDataD },
    excessHistory: { dataDD: accountOverviewExcessHistoryDataD },
    currentSelectedExcessHistory: { dataDD: accountOverviewExcessHistoryLineDataD },
    arrearsDetails: { dataDD: arrearsDetailsDataD },
    accountFlags: { dataDD: accountAllFlagsDataDD }, //the rest code gets the account flags and puts it here
    editingAccountFlags: { dataDD: accountAllFlagsDataDD }, //when we open the modal window we copy it here
    optOut: { dataDD: accountOverviewOptOutDataD },
    agreementType: { dataDD: accountOverviewAgreementTypeDataD },
  },
  initialValue: {},
  modals: [ { modal: ExcessInfoModalPage },
    { modal: ReasonModalPage },
    { modal: ExcessHistoryModalPage},
    { modal: ArrearsDetailsModalPage },
    { modal: AccountFlagsModalPage },
    { modal: OptOutModalPage },
    { modal: AgreementTypeModalPage }
  ],
  modes: [ 'view' ],
  rest: {
    main: { rest: accountOverviewRestD, targetFromPath: '~/main', fetcher: true },
    excessInfo: { rest: accountOverviewExcessInfoRestD, targetFromPath: '~/excessInfo', fetcher: true },
    reason: { rest: accountOverviewReasonRestD, targetFromPath: '~/reason', fetcher: true },
    excessHistory: { rest: accountOverviewExcessHistoryRestD, targetFromPath: '~/excessHistory', fetcher: true },
    arrearsDetails: { rest: arrearsDetailsRestD, targetFromPath: '~/arrearsDetails', fetcher: true },
    accountFlags: { rest: accountFlagsRestDD, targetFromPath: '~/accountFlags', fetcher: true },
    optOut: { rest: accountOverviewOptOutRestDD, targetFromPath: '~/optOut', fetcher: true },
    agreementType: { rest: accountOverviewAgreementTypeRestDD, targetFromPath: '~/agreementType', fetcher: true },
  },
  layout: {component: HideButtonsCD, displayParams: {hide: ['reason', 'arrearsDetails',  'excessHistory']}},
  buttons: {
    excessInfo: {
      control: 'ModalButton', modal: ExcessInfoModalPage, mode: 'view',
      focusOn: '~/excessInfo', buttonType: "secondary"
    },
    reason: {
      control: 'ModalButton', modal: ReasonModalPage, mode: 'view',
      focusOn: '~/reason', buttonType: "secondary"
    },
    excessHistory: {
      control: 'ModalButton', modal: ExcessHistoryModalPage, mode: 'view',
      focusOn:  '~/excessHistory', buttonType: "secondary"
    },
    arrearsDetails: {
      control: 'ModalButton', modal: ArrearsDetailsModalPage, mode: 'view',
      focusOn: '~/arrearsDetails', buttonType: "secondary"
    },
    flags: {
      control: 'ModalButton', modal: AccountFlagsModalPage, mode: 'edit',
      copy: { from: '~/accountFlags' },
      copyOnClose: { to: '~/accountFlags' },
      // restOnCommit: {rest: accountFlagsRestDD, action: 'update', result: 'refresh'},
      focusOn: '~/editingAccountFlags', buttonType: "secondary"
    },
    optOut: {
      control: 'ModalButton', modal: OptOutModalPage, mode: 'view',
      focusOn: '~/optOut', buttonType: "secondary"
    },
    agreementType: {
      control: 'ModalButton', modal: AgreementTypeModalPage, mode: 'view',
      focusOn: '~/agreementType', buttonType: "secondary"
    },
  }
}