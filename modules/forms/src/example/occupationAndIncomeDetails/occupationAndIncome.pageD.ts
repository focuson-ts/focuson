import { listOccupationsDD, occupationAndIncomeDetailsDD, occupationIncomeDetailsDD, otherIncomeResponseDD } from "./occupationAndIncome.dataD";

import { occupationAndIncomeRD, otherIncomeRD } from "./occupationAndIncome.restD";
import { BooleanDD, IntegerDD } from "../../common/dataD";
import { ExampleMainPage, ExampleModalPage } from "../common";

export const occupationIncomeModalPD: ExampleModalPage = {
  name: 'OccupationIncomeModalPD',
  pageType: 'ModalPage',
  /** This page can only view data */
  modes: [ 'view', 'create', 'edit' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[3]' }, target: [], dataDD: occupationIncomeDetailsDD, importFrom: 'OccupationAndIncomeSummary' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton', validate: true },
    validate: { control: 'ValidationButton' }
  },

}
export const otherSourcesOfIncomeModalPD: ExampleModalPage = {
  name: 'OtherSourcesOfIncomeModalPD',
  pageType: 'ModalPage',

  modes: [ 'edit' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[3]' }, target: [], dataDD: otherIncomeResponseDD, importFrom: 'OccupationAndIncomeSummary' },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  },
}
export const listOccupationsModalPD: ExampleModalPage = {
  name: 'ListOccupationsModal',
  pageType: 'ModalPage',
  modes: [ 'edit' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[3]' }, target: [], dataDD: listOccupationsDD, importFrom: 'OccupationAndIncomeSummary' },
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
    { modal: listOccupationsModalPD, path: [] } ], // TODO square brackets
  display: { layout: { name: 'Layout', details: '[1][3,3][5]' }, target: [ 'fromApi' ], dataDD: occupationAndIncomeDetailsDD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {
    selectedItem: 0
  },

  /** This defines the domain data structures in react*/
  domain: {
    selectedItem: { dataDD: IntegerDD },
    validationDebug: { dataDD: BooleanDD },
    fromApi: { dataDD: occupationAndIncomeDetailsDD },
    temp: { dataDD: occupationIncomeDetailsDD },
    other: { dataDD: otherIncomeResponseDD },
    searchList: { dataDD: listOccupationsDD }
  },

  /** Binds the rest to 'where it takes place'. S we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    occupationAndIncomeRD: { rest: occupationAndIncomeRD, targetFromPath: [ 'fromApi' ], fetcher: true },
    otherIncomeRD: { rest: otherIncomeRD, targetFromPath: [ 'other' ] }
  },

  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  // lists: {}//?
  buttons: {                                                                      //interestingly these will be type checked in the target system...
    nextOccupation: {
      by: { condition: '<arrayEnd', arrayPath: [ 'fromApi', 'customerOccupationIncomeDetails' ], varPath: [ 'selectedItem' ] },
      guard: { control: 'ListNextButton', value: [ 'selectedItem' ], list: [ 'fromApi', 'customerOccupationIncomeDetails' ] }
    },
    prevOccupation: {
      guard: { control: 'ListPrevButton', value: [ 'selectedItem' ], list: [ 'fromApi', 'customerOccupationIncomeDetails' ] },
      by: { condition: '>0', path: [ 'selectedItem' ] }
    },
    //questions: how do we know which is the existing plan... is there a list? are we an entry in the list? do we need to navigate to it?
    addEntry: {
      guard: {
        guard: {
          control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'create',
          focusOn: [ 'temp' ],
          createEmpty: occupationIncomeDetailsDD,
          setToLengthOnClose: { variable: [ 'selectedItem' ], array: [ 'fromApi', 'customerOccupationIncomeDetails' ] },
          copyOnClose: [ 'fromApi', 'customerOccupationIncomeDetails', '[append]' ]
        },
        by: { condition: '>0', path: [ 'selectedItem' ] },
      },
      by: { condition: '>0', path: [ 'selectedItem' ] },
    },
    edit: {
      control: 'ModalButton', modal: occupationIncomeModalPD, mode: 'edit',
      focusOn: [ 'temp' ],
      copyFrom: [ 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}' ],
      copyOnClose: [ 'fromApi', 'customerOccupationIncomeDetails', '{selectedItem}' ]
    },

  }
}