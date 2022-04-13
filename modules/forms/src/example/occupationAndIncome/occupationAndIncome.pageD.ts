import { dropdownsDD, listOccupationsDD, occupationAndIncomeFullDomainDD, oneOccupationIncomeDetailsDD } from "./occupationAndIncome.dataD";
import { additionalInfoRD, businessDetailsRD, dropdownsRD, occupationAndIncomeRD, otherIncomeRD } from "./occupationAndIncome.restD";
import { additionalInformationDD } from "./additionalInformation/additionalInformation.dataD";
import { otherIncomeResponseDD } from "./otherSourcesOfIncome/otherSourcesOfIncome.dataD";
import { businessDetailsMainDD } from "./businessDetails/businessDetails.dataD";
import { ExampleMainPage, ExampleModalPage } from "../common";
import { BooleanDD, IntegerDD } from "../../common/dataD";
import { HideButtonsCD } from "../../buttons/hideButtonsCD";
import { IntParam } from "../../common/restD";

export const listOccupationsModalPD: ExampleModalPage = {
  name: 'ListOccupationsModal',
  pageType: 'ModalPopup',
  modes: [ 'edit' ],
  display: { target: '', dataDD: listOccupationsDD},
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
  display: { target: '', dataDD: otherIncomeResponseDD },
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
  display: { target: '', dataDD: oneOccupationIncomeDetailsDD },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' },
    list: {
      control: 'ModalButton', modal: listOccupationsModalPD, mode: 'edit',
      focusOn: '~/searchList',
      copy: { from: '~/fromApi/customerOccupationIncomeDetails[~/selectedItem]/occupation' },
      copyOnClose: { to: '~/fromApi/customerOccupationIncomeDetails[~/selectedItem]/occupation' }
    },
    otherSourcesOfIncome: {
      control: 'ModalButton', modal: otherSourcesOfIncomeModalPD, mode: 'edit',
      focusOn: '~/otherSourcesOfIncome'
    },
  }
}

export const additionalInformationModalPD: ExampleModalPage = {
  name: 'AdditionalInformationModal',
  pageType: 'ModalPage',
  modes: [ 'edit' ],
  /** How we display the page.*/
  display: { target: '', dataDD: additionalInformationDD },
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
  display: { target: '', dataDD: businessDetailsMainDD },
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
  commonParams: { role: { ...IntParam, commonLens: 'usersRole', testValue: 'user' } },
  /** This page can only view data */
  modes: [ 'view', 'edit', 'create' ],
  /** How we display the page.*/
  modals: [
    { modal: occupationIncomeModalPD },
    { modal: additionalInformationModalPD },
    { modal: businessDetailsModalPD },
    { modal: otherSourcesOfIncomeModalPD },
    { modal: listOccupationsModalPD },
  ],
  display: { target: '~/fromApi', dataDD: occupationAndIncomeFullDomainDD },
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
  },
  variables: {
    selected: {
      constructedBy: 'code',
      code: "id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' )"
    },
    currentOccupation: {
      constructedBy: 'code',
      code: `id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' )`
    },
  },

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    occupationAndIncomeRD: { rest: occupationAndIncomeRD, targetFromPath: '~/fromApi', fetcher: true },
    dropdownsRD: { rest: dropdownsRD, targetFromPath: '~/dropdowns', fetcher: true },
    additionalInformationRD: { rest: additionalInfoRD, targetFromPath: '~/additionalInformation', fetcher: true },
    businessDetailsRD: { rest: businessDetailsRD, targetFromPath: '~/businessDetails', fetcher: true },
    otherSourcesOfIncomeRD: { rest: otherIncomeRD, targetFromPath: '~/otherSourcesOfIncome', fetcher: true }
  },
  layout: { component: HideButtonsCD, displayParams: { hide: [ 'additionalInfo', 'businessDetails', 'otherSourcesOfIncome', 'list' ] } },
  buttons: {
    mainOrJoint: { control: "ToggleButton", value: '~/mainOrJoint', buttonText: 'Showing {~/mainOrJoint|Main|Joint}' },
    nextOccupation: { control: 'ListNextButton', value: '#selected', list: '#currentOccupation' },
    prevOccupation: { control: 'ListPrevButton', value: '#selected', list: '#currentOccupation' },

    addEntry: {
      control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'create',
      focusOn: '~/temp',
      createEmpty: oneOccupationIncomeDetailsDD,
      setToLengthOnClose: { variable: '#selected', array: '#currentOccupation' },
      copyOnClose: { to: '#currentOccupation/[$append]' }
    },
    edit: {
      control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'edit',
      focusOn: '~/temp',
      copy: { from: '#currentOccupation[#selected]' },
      copyOnClose: { to: '#currentOccupation[#selected]' }
    },
    additionalInfo: {
      control: 'ModalButton', modal: additionalInformationModalPD, mode: 'edit',
      focusOn: '~/additionalInformation',
    },
    businessDetails: {
      control: 'ModalButton', modal: businessDetailsModalPD, mode: 'edit',
      focusOn: '~/businessDetails'
    },
    otherSourcesOfIncome: {
      control: 'ModalButton', modal: otherSourcesOfIncomeModalPD, mode: 'edit',
      focusOn: '~/otherSourcesOfIncome'
    },
    list: {
      control: 'ModalButton', modal: listOccupationsModalPD, mode: 'edit',
      focusOn: '~/occupation',
      copy: [
        { from: '#currentOccupation[#selected]/occupation', to: '~/occupation/search' },
        { from: '#currentOccupation[#selected]/occupation', to: '~/occupation/selectedOccupationName' },
        // TODO FROM HAS TO BE AN ARRAY
        // { from: ['{basePage}', 'dropdowns', 'occupationDescriptionResponse' ], to: ['{basePage}', 'occupation', 'searchResults'] },
      ],
      copyOnClose: [
        { from: '~/occupation/selectedOccupationName', to: '#currentOccupation[#selected]/occupation' },
      ]
    },
  }
}