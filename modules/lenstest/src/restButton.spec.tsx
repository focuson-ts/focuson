import { lensState, LensState } from "@focuson/state";
import { shallow } from "enzyme";

import { enzymeSetup } from "./enzymeAdapterSetup";
import { fromPathFromRaw, HasPageSelection, MultiPageDetails, PageDetailsForCombine, pageSelectionlens, simpleMessagesL } from "@focuson/pages";
import { HasRestCommands, restL } from "@focuson/rest";
import { SimpleMessage } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { identityOptics, Lenses } from "@focuson/lens";
import { RestButton } from "@focuson/form_components";
import { HasTagHolder } from "@focuson/template";

enzymeSetup ()

interface PageData {
  a?: string;
  b?: string;
}

export interface RestButtonStateForTest extends HasPageSelection, HasRestCommands , HasTagHolder{
  messages: SimpleMessage[],
  mainPage?: PageData
}

const emptyS: RestButtonStateForTest = {
  messages: [],
  tags:{},
  pageSelection: [ { "pageName": "mainPage", "pageMode": "view", time: 'now' } ],
  restCommands: [],
  mainPage: {}
}
let pageDetails: MultiPageDetails<RestButtonStateForTest, Context> = { mainPage: { lens: identityOptics<RestButtonStateForTest> ().focusQuery ( 'mainPage' ), pageType: 'MainPage', pageFunction: () => <span/>, config: {}, pageMode: 'edit' } };
const context: Context = {
  restL: restL<RestButtonStateForTest> (),
  combine: ( state, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( p => p.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  simpleMessagesL: simpleMessagesL (),
  pathToLens: fromPathFromRaw ( pageSelectionlens (), pageDetails ),
  pages: pageDetails,
  commonIds: {},
  newFetchers: {},
  restDetails: {},
  tagHolderL: Lenses.identity<RestButtonStateForTest> ().focusQuery ( 'tags' ),
}


type Context = FocusOnContext<RestButtonStateForTest>

function displayAndGetButton ( s: RestButtonStateForTest, setMain: ( s: RestButtonStateForTest ) => void, fn: ( s: LensState<RestButtonStateForTest, PageData, Context> ) => JSX.Element ) {
  const comp = shallow ( fn ( lensState<RestButtonStateForTest, Context> ( s, setMain, 'ModalButton', context ).focusOn ( 'mainPage' ) ) )
  return comp.find ( "button" )

}
describe ( "RestButton", () => {
  it ( "should render as a button", () => {
    const button = displayAndGetButton ( emptyS, () => {}, s => <RestButton rest='someRestName' action={'get'} state={s} id='someId' name='someButtonName'/> )
    expect ( button.html () ).toEqual ( '<button class="button">someButtonName</button>' )
  } )
  it ( "should place a rest command in the state - simple RestAction", () => {
    var remembered: any = undefined
    const button = displayAndGetButton ( emptyS, s => remembered = s, s => <RestButton rest='someRestName' action={'get'} state={s} id='someId'/> )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "mainPage": {},
      "messages": [],
      "tags": {},
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
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
      "tags": {},
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
      "restCommands": [ { "name": "someRestName", "restAction": { "state": "newState" } } ]
    } )
  } )
  it ( "should place a rest command in the state - copyOnSuccessAndDeleteOnSuccess", () => {
    var remembered: any = undefined
    const button = displayAndGetButton ( emptyS, s => remembered = s, s =>
      <RestButton rest='someRestName' action={{ state: 'newState' }} state={s} id='someId'
                  onSuccess={[
                    { command: 'copyResult', from: 'from', to: 'to' },
                    { command: 'delete', path: 'del1' },
                    { command: 'delete', path: 'del2' } ]}/> )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "mainPage": {},
      "tags": {},
      "messages": [],
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
      "restCommands": [ {
        "name": "someRestName",
        "restAction": { "state": "newState" },
        "changeOnSuccess": [
          { "command": "copyResult", "from": "from", "to": "to" },
          { "command": "delete", "path": "del1" },
          { "command": "delete", "path": "del2" }
        ],
      } ]
    } )
  } )
} )