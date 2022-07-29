import { ExampleMainPage, ExampleModalPage } from "../common";
import { RepeatingLineDataD, RepeatingWholeDataD } from "./repeating.dataD";
import { repeatingRestRD } from "./repeating.restD";
import { IntegerDD } from "../../common/dataD";

export const RepeatingLinePageD: ExampleModalPage = {
  name: "RepeatingLine",
  pageType: "ModalPage",
  display: { target: '~/temp', dataDD: RepeatingLineDataD },
  modes: [ 'create', 'edit' ],
  buttons: {
    cancel: { control: 'ModalCancelButton' },
    commit: { control: 'ModalCommitButton' }
  }
}
export const selectedItemPath = '~/selectedItem'
export const fromApiPath = '~/fromApi'
/** This is the 'bringing it all together */
export const RepeatingPageD: ExampleMainPage = {
  name: 'Repeating',
  pageType: 'MainPage',  // this really feels like a modal button

  /** This page can only view data */
  modes: [ 'view' ],
  /** How we display the page.*/
  display: { target: fromApiPath, dataDD: RepeatingWholeDataD },
  /** When the page is selected for the first time this is the initial state */
  initialValue: { command: 'set', path: '~/selectedItem', value: 0 },
  /** This defines the domain data structures in react*/
  domain: {
    temp: { dataDD: RepeatingLineDataD },
    fromApi: { dataDD: RepeatingWholeDataD },
    selectedItem: { dataDD: IntegerDD }
  },
  modals: [ { modal: RepeatingLinePageD } ],

  /** Binds the rest to 'where it takes place'. So we have these rest actions, and the gui data is at the location defined by 'targetFromPath'. Fetcher 'true' means set up a fetcher to go get the data when the page is selected */
  rest: {
    repeating: { rest: repeatingRestRD, targetFromPath: fromApiPath, fetcher: true }
  },
  /** As well as displaying/editing the data we have these buttons. These are passed to layout */
  buttons: {
    addEntry: {
      control: 'ModalButton', modal: RepeatingLinePageD, mode: 'create',
      focusOn: '~/temp',
      createEmpty: RepeatingLineDataD,
      setToLengthOnClose: { variable: selectedItemPath, array: fromApiPath },
      copyOnClose: { to: '~/fromApi[$append]' }
    },
    edit: {
      control: 'ModalButton', modal: RepeatingLinePageD, mode: 'edit',
      focusOn: '~/temp',
      copy: [ { from: '~/fromApi[~/selectedItem]' } ],
      copyOnClose: { to: '~/fromApi/[~/selectedItem]' }
    },
    prevOccupation: {
      by: { condition: '>0', path: selectedItemPath },
      guard: { control: 'ListPrevButton', value: selectedItemPath, list: fromApiPath }
    },
    nextOccupation: {
      by: { condition: '<arrayEnd', arrayPath: fromApiPath, varPath: selectedItemPath },
      guard: { control: 'ListNextButton', value: selectedItemPath, list: fromApiPath }
    },
  }
}
