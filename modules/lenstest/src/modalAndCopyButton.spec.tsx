import { enzymeSetup } from "./enzymeAdapterSetup";
import { ModalAndCopyButton } from "@focuson/pages";
import { lensState } from "@focuson/state";
import { mount } from "enzyme";
import { PageSpecState } from "./page.fixture";

enzymeSetup ()

export interface FullDomainForModalAndCopyButtonTest {
  tempSomeData?: string | undefined,
  fromApi?: { someData: string }
}

type Context = 'context'
const context = 'context'

describe ( "modal and copy button", () => {
  it ( "should render with an id and title", () => {
    const state = lensState<PageSpecState, Context> ( {}, ( s: PageSpecState ) => {}, 'ModalAndCopyButton', context )
    let fullState = state.focusOn ( 'full' );
    const comp = mount ( <ModalAndCopyButton text='someTitle' id='someId'
                                             modal={'someModal'}
                                             from={fullState.focusOn ( 'fromApi' ).focusOn ( 'someData' )}
                                             to={fullState.focusOn ( 'tempSomeData' )}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: PageSpecState = {}
    const state = lensState<PageSpecState, Context> ( { full: { fromApi: { someData: 'someData' } } }, ( s: PageSpecState ) => {remembered = s}, 'ModalAndCopyButton', context )
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