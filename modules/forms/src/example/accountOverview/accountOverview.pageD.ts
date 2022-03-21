import { ExampleMainPage, ExampleModalPage } from "../common";
import { accountAllFlagsDataDD, accountOverviewDataD, accountOverviewExcessHistoryDataD, accountOverviewExcessHistoryLineDataD, accountOverviewExcessInfoDataD, accountOverviewReasonDataD, arrearsDetailsDataD } from "./accountOverview.dataD";
import { accountFlagsRestDD, accountOverviewExcessHistoryRestD, accountOverviewExcessInfoRestD, accountOverviewReasonRestD, accountOverviewRestD, arrearsDetailsCurrentRestD, arrearsDetailsPreviousRestD } from "./accountOverview.restD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";

export const ArrearsDetailsModalPage: ExampleModalPage = {
  name: "ArrearsDetails",
  pageType: "ModalPage",
  display: { dataDD: arrearsDetailsDataD, target: [], importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' }
  },
}

export const ExcessHistoryModalPage: ExampleModalPage = {
  name: "ExcessHistory",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewExcessHistoryDataD, target: [], importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' },
    details: { control: 'ModalButton', modal: ArrearsDetailsModalPage, focusOn: [ 'arrearsDetails' ], mode: 'view' }
  },
}

export const ExcessInfoModalPage: ExampleModalPage = {
  name: "ExcessInfoSearch",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewExcessInfoDataD, target: [], importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}
export const ReasonModalPage: ExampleModalPage = {
  name: "Reason",
  pageType: "ModalPage",
  display: { dataDD: accountOverviewReasonDataD, target: [], importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}
export const AccountFlagsModalPage: ExampleModalPage = {
  name: "AccountFlags",
  pageType: "ModalPage",
  display: { dataDD: accountAllFlagsDataDD, target: [], importFrom: 'AccountOverview' },
  modes: [ 'view' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}

export const AccountOverviewMainPage: ExampleMainPage = {
  name: "AccountOverview",
  pageType: "MainPage",
  display: { dataDD: accountOverviewDataD, target: [ 'main' ] },
  domain: {
    main: { dataDD: accountOverviewDataD },
    excessInfo: { dataDD: accountOverviewExcessInfoDataD },
    reason: { dataDD: accountOverviewReasonDataD },
    excessHistory: { dataDD: accountOverviewExcessHistoryDataD },
    currentSelectedExcessHistory: { dataDD: accountOverviewExcessHistoryLineDataD },
    arrearsDetailsCurrent: { dataDD: arrearsDetailsDataD },
    arrearsDetailsPrevious: { dataDD: arrearsDetailsDataD },
    accountFlags: { dataDD: accountAllFlagsDataDD }, //the rest code gets the account flags and puts it here
    editingAccountFlags: { dataDD: accountAllFlagsDataDD } //when we open the modal window we copy it here
  },
  initialValue: {},
  modals: [ { modal: ExcessInfoModalPage, path: [ 'excessInfo' ] },
    { modal: ReasonModalPage, path: [ 'reason' ] },
    { modal: ExcessHistoryModalPage, path: [ 'excessHistory' ] },
    { modal: ArrearsDetailsModalPage, path: [ 'arrearsDetails' ] },
    { modal: AccountFlagsModalPage, path: [ 'editingAccountFlags' ] }
  ],
  modes: [ 'view' ],
  rest: {
    main: { rest: accountOverviewRestD, targetFromPath: [ 'main' ], fetcher: true },
    excessInfo: { rest: accountOverviewExcessInfoRestD, targetFromPath: [ 'excessInfo' ], fetcher: true },
    reason: { rest: accountOverviewReasonRestD, targetFromPath: [ 'reason' ], fetcher: true },
    excessHistory: { rest: accountOverviewExcessHistoryRestD, targetFromPath: [ 'excessHistory' ], fetcher: true },
    arrearsDetailsCurrent: { rest: arrearsDetailsCurrentRestD, targetFromPath: [ 'arrearsDetailsCurrent' ], fetcher: true },
    arrearsDetailsPrevious: { rest: arrearsDetailsPreviousRestD, targetFromPath: [ 'arrearsDetailsPrevious' ], fetcher: true },
    accountFlags: { rest: accountFlagsRestDD, targetFromPath: [ 'accountFlags' ], fetcher: true }
  },
  layout: { component: HideButtonsCD, displayParams: { hide: [ 'excessHistory', 'reason' ] } },
  buttons: {
    excessInfo: {
      control: 'ModalButton', modal: ExcessInfoModalPage, mode: 'view',
      focusOn: [ 'excessInfo' ]
    },
    reason: {
      control: 'ModalButton', modal: ReasonModalPage, mode: 'view',
      focusOn: [ 'reason' ]
    },
    excessHistory: {
      control: 'ModalButton', modal: ExcessHistoryModalPage, mode: 'view',
      focusOn: [ 'excessHistory' ]
    },
    flags: {
      control: 'ModalButton', modal: AccountFlagsModalPage, mode: 'edit',
      copy: { from: [ '{basePage}', 'accountFlags' ] },
      copyOnClose: { to: [ '{basePage}', 'accountFlags' ] },
      // restOnCommit: {rest: accountFlagsRestDD, action: 'update', result: 'refresh'},
      focusOn: [ 'editingAccountFlags' ]
    },
  }
}
