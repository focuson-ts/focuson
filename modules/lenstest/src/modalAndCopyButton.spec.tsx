import { enzymeSetup } from "./enzymeAdapterSetup";
import { ModalAndCopyButton } from "@focuson/pages";
import { LensState } from "@focuson/state";
import { mount } from "enzyme";
import { ContextForTest, dataDefinedState, lensStateWith, PageSpecState, rootState } from "./page.fixture";

enzymeSetup ()


type Context = 'context'
const context = 'context'

describe ( "modal and copy button", () => {
  it ( "should render with a title", () => {
    const state = lensStateWith ( rootState, () => {}, [ 'firstPage', 'view' ] )
    const comp = mount ( <ModalAndCopyButton id='theId' text='someTitle'
                                             modal={'someModal'}
                                             pageMode='view'
                                             from={state.focusOn ( 'firstPage' )}
                                             to={state.focusOn ( 'tempData' )}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: any = {}
    const state: LensState<PageSpecState, PageSpecState, ContextForTest> = lensStateWith ( dataDefinedState, s => {remembered = s}, [ 'firstPage', 'view' ] );
    const comp = mount ( <ModalAndCopyButton id='someId' text='someTitle'
                                             modal={'someModal'}
                                             pageMode='view'
                                             from={state.focusOn ( 'firstPage' )}
                                             to={state.focusOn ( 'tempData' )}/> )

    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "messages": [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "firstPage" },
        { "firstTime": true, "pageMode": "view", "pageName": "someModal" } ],
      "firstPage": "one",
      "secondPage": { "fromApi": "two" },
      "tags": {},
      "tempData": "one"
    } )
  } )
} )