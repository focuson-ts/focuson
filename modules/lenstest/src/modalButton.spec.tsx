import { mount } from "enzyme";
import { ModalButton, ModalCommitButton } from "@focuson/pages";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { lensStateWith, rootState, stateWith } from "./page.fixture";
import { ModalCancelButton } from "../../pages/src/modal/modalCommitAndCancelButton";


enzymeSetup ()


describe ( "modal button", () => {
  it ( "should render with an id and title", () => {
    const state = lensStateWith ( rootState, () => {}, [ 'firstPage', 'view', undefined ] )
    const comp = mount ( <ModalButton text='someTitle' id='someId' to={state.focusOn ( 'firstPage' )} base={[ 'firstPage' ]} modal={'someModal'} pageMode='view'/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )

  it ( "should change the state to have a model when clicked", () => {
    var remembered: any = {}
    const state = lensStateWith ( rootState, ( s ) => {remembered = s}, [ 'firstPage', 'view', undefined ] )
    const comp = mount ( <ModalButton text='someTitle' id='someId' to={state} modal={'someModal'} pageMode='view' base={[ 'firstPage' ]}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "messages": [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "firstPage" },
        { "firstTime": true, "pageMode": "view", "pageName": "someModal", base: [ "firstPage" ] }
      ],
      "restCommands": [],
      "tags": {},
      "tempData": "x"
    } )
  } )
} )

describe ( "modalCommit", () => {
  it ( "should render with a title", () => {
    const state = lensStateWith ( rootState, () => {}, [ 'firstPage', 'view', undefined ] )
    const comp = mount ( <ModalCommitButton id='someId' state={state}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'Commit' )

  } )
  it ( "should process any rest commands", () => {
    var remembered: any = {}
    const state = lensStateWith ( rootState, ( s ) => {remembered = s},
      [ 'firstPage', 'view', undefined ],
      [ 'secondPage', 'view', { name: 'someRest', restAction: 'update', path: [] } ],
    )

    const comp = mount ( <ModalCommitButton id='someId' state={state}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "messages": [],
      "pageSelection": [ { "pageMode": "view", "pageName": "firstPage" } ],
      "restCommands": [ { "name": "someRest", "path": [], "restAction": "update" } ],
      "tags": {},
      "tempData": "x"
    } )

  } )
} )


describe ( "modalCanel", () => {
  it ( "should render with a title", () => {
    const state = lensStateWith ( rootState, () => {}, [ 'firstPage', 'view', undefined ] )
    const comp = mount ( <ModalCancelButton id='someId' state={state}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'Cancel' )

  } )
  it ( "should process any rest commands", () => {
    var remembered: any = {}
    const state = lensStateWith ( rootState, ( s ) => {remembered = s},
      [ 'firstPage', 'view', undefined ],
      [ 'secondPage', 'view', { name: 'someRest', restAction: 'update', path: [] } ],
    )

    const comp = mount ( <ModalCancelButton id='someId' state={state}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "messages": [],
      "pageSelection": [ { "pageMode": "view", "pageName": "firstPage" } ],
      "restCommands": [],
      "tags": {},
      "tempData": "x"
    } )

  } )
} )