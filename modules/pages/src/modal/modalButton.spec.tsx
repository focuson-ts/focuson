import { LensState, lensState } from "@focuson/state";
import { mount } from "enzyme";
import { enzymeSetup } from "../enzymeAdapterSetup";

import { ModalButton } from "./modalButton";
import { HasPageSelection, PageSelectionContext, pageSelectionlens } from "../pageSelection";
import { PageDetailsForCombine } from "../selectedPage";
import { Lenses } from "@focuson/lens";
import { testDateFn } from "@focuson/utils";

enzymeSetup ()
interface StateForModalButtonTest extends HasPageSelection {
  data?: string,
  a?: number
}

const context: PageSelectionContext<StateForModalButtonTest> = {
  combine: ( state, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( c => c.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  pages: { a: { lens: Lenses.identity<StateForModalButtonTest> ().focusQuery ( 'a' ), pageFunction: () => <span/>, config: {}, pageType: 'MainPage', pageMode: "edit" } }

}

let startState: StateForModalButtonTest = { pageSelection: [ { pageName: 'a', pageMode: 'view', time: 'now' } ] };
describe ( "modal button", () => {
  it ( "should render with an id and title", () => {
    const state: LensState<StateForModalButtonTest, HasPageSelection, PageSelectionContext<StateForModalButtonTest>> =
            lensState<StateForModalButtonTest, PageSelectionContext<StateForModalButtonTest>> (
              startState, ( s: StateForModalButtonTest ) => {}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} modal={'someModal'} focusOn='' pageMode='view' dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )
  it ( "should change the state to have a model when clicked", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, HasPageSelection, PageSelectionContext<StateForModalButtonTest>> =
            lensState<StateForModalButtonTest, PageSelectionContext<StateForModalButtonTest>> (
              startState, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} modal={'someModal'} focusOn='~/' pageMode='edit' dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "focusOn": "~/", "pageMode": "edit", "pageName": "someModal", "time": "timeForTest" }
      ]
    } )
  } )

  it ( "should create an empty if needed when clicked", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, PageSelectionContext<StateForModalButtonTest>> =
            lensState<StateForModalButtonTest, PageSelectionContext<StateForModalButtonTest>> (
              startState, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state.focusOn ( 'data' )} modal={'someModal'} focusOn='~/' pageMode='edit' createEmpty='someData' dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "a": "someData",
      "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "focusOn": "~/", "pageMode": "edit", "pageName": "someModal", "time": "timeForTest" }
      ]
    } )

  } )
} )