import { lensState, LensState } from "@focuson/state";
import { shallow } from "enzyme";

import { enzymeSetup } from "./enzymeAdapterSetup";
import { HasPageSelection, PageDetailsForCombine, pageSelectionlens, simpleMessagesL } from "@focuson/pages";
import { HasRestCommands, restL } from "@focuson/rest";
import { SimpleMessage } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { ModalButtonStateForTest } from "./modalButton.integration.spec";
import { identityOptics } from "@focuson/lens";
import { RestButton } from "@focuson/form_components";

enzymeSetup ()

interface PageData {
  a?: string;
  b?: string;
}

export interface RestButtonStateForTest extends HasPageSelection, HasRestCommands {
  messages: SimpleMessage[],
  mainPage?: PageData
}

const emptyS: RestButtonStateForTest = {
  messages: [],
  pageSelection: [ { "pageName": "mainPage", "pageMode": "view" } ],
  restCommands: [],
  mainPage: {}
}
const context: Context = {
  restL: restL<RestButtonStateForTest> (),
  combine: ( state, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( p => p.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  simpleMessagesL: simpleMessagesL (),
  pages: { mainPage: { lens: identityOptics<RestButtonStateForTest> ().focusQuery ( 'mainPage' ), pageType: 'MainPage', pageFunction: () => <span/>, config: {}, pageMode: 'edit' } },
  commonIds: {}
}


type Context = FocusOnContext<RestButtonStateForTest>

function displayAndGetButton ( s: RestButtonStateForTest, setMain: ( s: RestButtonStateForTest ) => void, fn: ( s: LensState<RestButtonStateForTest, PageData, Context> ) => JSX.Element ) {
  const comp = shallow ( fn ( lensState<RestButtonStateForTest, Context> ( s, setMain, 'ModalButton', context ).focusOn ( 'mainPage' ) ) )
  return comp.find ( "button" )

}
describe ( "RestButton", () => {
  it ( "should render as a button", () => {
    const button = displayAndGetButton ( emptyS, () => {}, s => <RestButton rest='someRestName' action={'get'} state={s} id='someId'/> )
    expect ( button.html () ).toEqual ( '<button rest="someRestName" action="get" state="[object Object]" id="someId"></button>' )
  } )
  it ( "should place a rest command in the state - simple RestAction", () => {
    var remembered: any = undefined
    const button = displayAndGetButton ( emptyS, s => remembered = s, s => <RestButton rest='someRestName' action={'get'} state={s} id='someId'/> )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "mainPage": {},
      "messages": [],
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage" } ],
      "restCommands": [ { "name": "someRestName", "restAction": "get" } ]
    } )
  } )

  it ( "should place a rest command in the state - stateChange RestAction", () => {
    var remembered: any = undefined
    const button = displayAndGetButton ( emptyS, s => remembered = s, s => <RestButton rest='someRestName' action={{ state: 'newState' }} state={s} id='someId'/> )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "mainPage": {},
      "messages": [],
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage" } ],
      "restCommands": [ { "name": "someRestName", "restAction": { "state": "newState" } } ]
    } )
  } )

} )