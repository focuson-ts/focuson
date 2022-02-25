import { mount } from "enzyme";
import { ModalButton } from "@focuson/pages";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { lensStateWith, rootState } from "./page.fixture";


enzymeSetup ()


describe ( "modal button", () => {
  it ( "should render with an id and title", () => {
    const state = lensStateWith ( rootState, () => {}, [ 'firstPage', 'view' ] )
    const comp = mount ( <ModalButton text='someTitle' id='someId' to={state.focusOn ( 'firstPage' )} base={[ 'firstPage' ]} modal={'someModal'} pageMode='view'/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: any = {}
    const state = lensStateWith ( rootState, ( s ) => {remembered = s}, [ 'firstPage', 'view' ] )
    const comp = mount ( <ModalButton text='someTitle' id='someId' to={state} modal={'someModal'} pageMode='view' base={[ 'firstPage' ]}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "messages": [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "firstPage" },
        { "firstTime": true, "pageMode": "view", "pageName": "someModal", base: [ "firstPage" ] }
      ],
      "tags": {},
      "tempData": "x"
    } )
  } )
} )