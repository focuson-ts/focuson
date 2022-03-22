import { BooleanDD, IntegerDD, MainPageD, ModalPageD, PageD } from "@focuson/forms";
import { AllButtonsInPage } from "@focuson/forms/dist";
import {
  dropdownsDD, listOccupationsDD,
  occupationAndIncomeFullDomainDD,
  oneOccupationIncomeDetailsDD
} from "./occupationAndIncome.dataD";
import {
  additionalInfoRD,
  businessDetailsRD,
  dropdownsRD,
  occupationAndIncomeRD,
  otherIncomeRD
} from "./occupationAndIncome.restD";
import { additionalInformationDD } from "./additionalInformation/additionalInformation.dataD";
import { otherIncomeResponseDD } from "./otherSourcesOfIncome/otherSourcesOfIncome.dataD";
import { businessDetailsMainDD } from "./businessDetails/businessDetails.dataD";
import { ExampleMainPage, ExampleModalPage } from "../common";
import { PostCodeModalPage } from "../addressSearch/addressSearch.pageD";
import { postcodeRestD } from "../addressSearch/addressSearch.restD";
import { HideButtonsCD } from "@focuson/forms/dist/src/buttons/hideButtonsCD";

export const listOccupationsModalPD: ExampleModalPage = {
  name: 'ListOccupationsModal',
  pageType: 'ModalPopup',
  modes: [ 'edit' ],
  display: { target: [], dataDD: listOccupationsDD, importFrom: 'OccupationAndIncomeSummary' },
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}

export const otherSourcesOfIncomeModalPD: ExampleModalPage = {
  name: 'OtherSourcesOfIncomeModal',
  pageType: 'ModalPopup',
  /** This page can only view data */
  modes: [ 'edit' ],
  /** How we display the page.*/
  display: { target: [], dataDD: otherIncomeResponseDD, importFrom: 'OccupationAndIncomeSummary' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}

export const occupationIncomeModalPD: ExampleModalPage = {
  name: 'OccupationIncomeModal',
  pageType: 'ModalPage',
  modes: [ 'view', 'create', 'edit' ],
  /** How we display the page.*/
  display: { target: [], dataDD: oneOccupationIncomeDetailsDD, importFrom: 'OccupationAndIncomeSummary' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' },
    list: {
      control: 'ModalButton', modal: listOccupationsModalPD, mode: 'edit',
      focusOn: [ 'searchList' ],
      copy: { from: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}', 'occupation' ] },
      copyOnClose: { to: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}', 'occupation' ] }
    },
    otherSourcesOfIncome: {
      control: 'ModalButton', modal: otherSourcesOfIncomeModalPD, mode: 'edit',
      focusOn: [ 'otherSourcesOfIncome' ]
    },
  }
}

export const additionalInformationModalPD: ExampleModalPage = {
  name: 'AdditionalInformationModal',
  pageType: 'ModalPage',
  modes: [ 'edit' ],
  /** How we display the page.*/
  display: { target: [], dataDD: additionalInformationDD, importFrom: 'OccupationAndIncomeSummary' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}

export const businessDetailsModalPD: ExampleModalPage = {
  name: 'BusinessDetailsModal',
  pageType: 'ModalPage',
  /** This page can only view data */
  modes: [ 'edit' ],
  /** How we display the page.*/
  display: { target: [], dataDD: businessDetailsMainDD, importFrom: 'OccupationAndIncomeSummary' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },

}

/** This is the 'bringing it all together */
export const OccupationAndIncomeSummaryPD: ExampleMainPage = {
  name: 'OccupationAndIncomeSummary',
  pageType: 'MainPage',
  /** This page can only view data */
  modes: [ 'view', 'edit', 'create' ],
  /** How we display the page.*/
  modals: [
    { modal: occupationIncomeModalPD, path: [] },
    { modal: additionalInformationModalPD, path: [] },
    { modal: businessDetailsModalPD, path: [] },
    { modal: otherSourcesOfIncomeModalPD, path: [] },
    { modal: listOccupationsModalPD, path: [] },
  ],
  display: { target: [ 'fromApi' ], dataDD: occupationAndIncomeFullDomainDD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {
    selectedItem: 0,
    occupation: {
      search: '',
      selectedOccupationName: '',
      searchResults: [],
    },
    mainOrJoint: false
  },

  /** This defines the domain data structures in react*/
  domain: {
    selectedItem: { dataDD: IntegerDD },
    fromApi: { dataDD: occupationAndIncomeFullDomainDD },
    temp: { dataDD: oneOccupationIncomeDetailsDD },
    additionalInformation: { dataDD: additionalInformationDD },
    businessDetails: { dataDD: businessDetailsMainDD },
    otherSourcesOfIncome: { dataDD: otherIncomeResponseDD },
    dropdowns: { dataDD: dropdownsDD },
    searchList: { dataDD: listOccupationsDD },
    mainOrJoint: { dataDD: BooleanDD }
  }
  ,

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    occupationAndIncomeRD: { rest: occupationAndIncomeRD, targetFromPath: [ 'fromApi' ], fetcher: true },
    dropdownsRD: { rest: dropdownsRD, targetFromPath: [ 'dropdowns' ], fetcher: true },
    additionalInformationRD: { rest: additionalInfoRD, targetFromPath: [ 'additionalInformation' ], fetcher: true },
    businessDetailsRD: { rest: businessDetailsRD, targetFromPath: [ 'businessDetails' ], fetcher: true },
    otherSourcesOfIncomeRD: { rest: otherIncomeRD, targetFromPath: [ 'otherSourcesOfIncome' ], fetcher: true }
  },
  layout: { component: HideButtonsCD, displayParams: { hide: [ 'additionalInfo', 'businessDetails', 'otherSourcesOfIncome', 'list' ] } },
  buttons: {
    mainOrJoint: { control: "ToggleButton", value: [ 'mainOrJoint' ], buttonText: 'Showing {~/mainOrJoint|Main|Joint}' },
    nextOccupation: { control: 'ListNextButton', value: [ 'selectedItem' ], list: [ 'fromApi', 'customerOccupationIncomeDetails' ] },
    prevOccupation: { control: 'ListPrevButton', value: [ 'selectedItem' ], list: [ 'fromApi', 'customerOccupationIncomeDetails' ] },
    addEntry: {
      control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'create',
      focusOn: [ 'temp' ],
      // restOnCommit: { rest: occupationAndIncomeRD, target: ['OccupationAndIncomeSummary'], result: 'refresh', action: 'update' },
      createEmpty: oneOccupationIncomeDetailsDD,
      setToLengthOnClose: { variable: [ 'selectedItem' ], array: [ 'fromApi', 'customerOccupationIncomeDetails' ] },
      copyOnClose: { to: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '[append]' ] }
      // restOnCommit: { rest: occupationAndIncomeRD, action: 'update', result: 'refresh', target: [ '' ] }
    },
    edit: {
      control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'edit',
      focusOn: [ 'temp' ],
      copy: { from: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}' ] },
      copyOnClose: { to: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}' ] }
    },
    additionalInfo: {
      control: 'ModalButton', modal: additionalInformationModalPD, mode: 'edit',
      focusOn: [ 'additionalInformation' ],
    },
    businessDetails: {
      control: 'ModalButton', modal: businessDetailsModalPD, mode: 'edit',
      focusOn: [ 'businessDetails' ]
    },
    otherSourcesOfIncome: {
      control: 'ModalButton', modal: otherSourcesOfIncomeModalPD, mode: 'edit',
      focusOn: [ 'otherSourcesOfIncome' ]
    },
    list: {
      control: 'ModalButton', modal: listOccupationsModalPD, mode: 'edit',
      focusOn: [ 'occupation' ],
      copy: [
        { from: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}', 'occupation' ], to: [ '{basePage}', 'occupation', 'search' ] },
        { from: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}', 'occupation' ], to: [ '{basePage}', 'occupation', 'selectedOccupationName' ] },
        // TODO FROM HAS TO BE AN ARRAY
        // { from: ['{basePage}', 'dropdowns', 'occupationDescriptionResponse' ], to: ['{basePage}', 'occupation', 'searchResults'] },
      ],
      copyOnClose: [
        { from: [ '{basePage}', 'occupation', 'selectedOccupationName' ], to: [ '{basePage}', 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}', 'occupation' ] },
      ]
    },
  }
}