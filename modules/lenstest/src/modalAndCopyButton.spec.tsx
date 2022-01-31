import { enzymeSetup } from "./enzymeAdapterSetup";
import { HasSelectedModalPage, ModalAndCopyButton, selectionModalPageL } from "@focuson/pages";
import { lensState } from "@focuson/state";
import { mount } from "enzyme";


enzymeSetup ()
export interface StateForModalAndCopyButtonTest extends HasSelectedModalPage {
  full?: FullDomainForModalAndCopyButtonTest

}
export interface FullDomainForModalAndCopyButtonTest {
  tempSomeData?: string | undefined,
  fromApi?: { someData: string }
}


describe ( "modal and copy button", () => {
  it ( "should render with an id and title", () => {
    const state = lensState<StateForModalAndCopyButtonTest> ( {}, ( s: StateForModalAndCopyButtonTest ) => {}, 'ModalAndCopyButton' )
    let fullState = state.focusOn ( 'full' );
    const comp = mount ( <ModalAndCopyButton text='someTitle' id='someId'
                                             modalL={selectionModalPageL ()}
                                             modal={'someModal'}
                                             from={fullState.focusOn ( 'fromApi' ).focusOn ( 'someData' )}
                                             to={fullState.focusOn ( 'tempSomeData' )}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: StateForModalAndCopyButtonTest = {}
    const state = lensState<StateForModalAndCopyButtonTest> ( { full: { fromApi: { someData: 'someData' } } }, ( s: StateForModalAndCopyButtonTest ) => {remembered = s}, 'ModalAndCopyButton' )
    let fullState = state.focusOn ( 'full' );
    const comp = mount ( <ModalAndCopyButton text='someTitle' id='someId'
                                             modalL={selectionModalPageL ()}
                                             modal={'someModal'}
                                             from={fullState.focusOn ( 'fromApi' ).focusOn ( 'someData' )}
                                             to={fullState.focusOn ( 'tempSomeData' )}/> )

    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "currentSelectedModalPage": "someModal",
      "full": {
        "fromApi": { "someData": "someData" },
        "tempSomeData": "someData"
      }
    } )
  } )
} )