import { ExampleMainPage, ExampleModalPage } from "../common";
import { RepeatingLineDataD, RepeatingWholeDataD } from "./repeating.dataD";
import { repeatingRestRD } from "./repeating.restD";
import { IntegerDD } from "../../common/dataD";
import { occupationIncomeModalPD } from "../occupationAndIncomeDetails/occupationAndIncome.pageD";

export const RepeatingLinePageD: ExampleModalPage = {
  name: "RepeatingLine",
  pageType: "ModalPage",
  display: { layout: { name: 'Layout', details: '[2][2]' }, target: [ 'temp' ], dataDD: RepeatingLineDataD, importFrom: 'Repeating' },
  modes: [ 'create', 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  }
}
export const selectedItemPath = [ 'selectedItem' ]
export const fromApiPath = [ 'fromApi' ]
/** This is the 'bringing it all together */
export const RepeatingPageD: ExampleMainPage = {
  name: 'Repeating',
  pageType: 'MainPage',  // this really feels like a modal button

  /** This page can only view data */
  modes: [ 'view' ],
  /** How we display the page.*/
  display: { layout: { name: 'Layout', details: '[1][3]' }, target: fromApiPath, dataDD: RepeatingWholeDataD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: {},
  /** This defines the domain data structures in react*/
  domain: {
    temp: { dataDD: RepeatingLineDataD },
    fromApi: { dataDD: RepeatingWholeDataD },
    selectedItem: { dataDD: IntegerDD }
  },
  modals: [ { modal: RepeatingLinePageD, path: [] } ], // TODO square brackets

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    repeating: { rest: repeatingRestRD, targetFromPath: fromApiPath, fetcher: true }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    addEntry: {
      control: 'ModalButton', modal: RepeatingLinePageD, mode: 'create',
      focusOn: [ 'temp' ],
      createEmpty: RepeatingLineDataD,
      setToLengthOnClose: { variable: selectedItemPath, array: fromApiPath },
      copyOnClose: [ ...fromApiPath, '[append]' ]
    },
    edit: {
      control: 'ModalButton', modal: RepeatingLinePageD, mode: 'edit',
      focusOn: [ 'temp' ],
      copyFrom: [ ...fromApiPath, '{selectedItem}' ],
      copyOnClose: [ ...fromApiPath, '{selectedItem}' ]
    },
    nextOccupation: {
      by: { condition: '<arrayEnd', arrayPath: fromApiPath, varPath: selectedItemPath },
      guard: { control: 'ListNextButton', value: selectedItemPath, list: fromApiPath }
    },
    prevOccupation: {
      by: { condition: '>0', path: selectedItemPath },
      guard: { control: 'ListPrevButton', value: selectedItemPath, list: fromApiPath }
    },
  }
}
