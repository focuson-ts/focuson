import { lensState } from "@focuson/state";
import { mount } from "enzyme";
import { HasSelectedModalPage, selectionModalPageL } from "@focuson/pages";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { ModalButton } from "@focuson/pages";


enzymeSetup ()
interface StateForModalButtonTest extends HasSelectedModalPage {

}
type Context = 'context'
const context = 'context'


describe ( "modal button", () => {
  it ( "should render with an id and title", () => {
    const state = lensState<StateForModalButtonTest, Context> ( {}, ( s: StateForModalButtonTest ) => {}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} modal={'someModal'} modalL={selectionModalPageL ()}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: StateForModalButtonTest = {}
    const state = lensState<StateForModalButtonTest, Context> ( {}, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} modal={'someModal'} modalL={selectionModalPageL ()}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( { "currentSelectedModalPage": "someModal" } )
  } )
} )