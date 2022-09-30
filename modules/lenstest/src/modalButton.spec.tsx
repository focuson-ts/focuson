import { LensState, lensState } from "@focuson/state";
import { mount } from "enzyme";

import { HasPageSelection, ModalButton, ModalCommitButton, ModalContext, PageDetailsForCombine, pageSelectionlens, simpleMessagesL } from "@focuson/pages";
import { Lenses, Optional } from "@focuson/lens";
import { SimpleMessage, testDateFn } from "@focuson/utils";

import { HasRestCommands, RestCommand, restL } from "@focuson/rest";
import { TagHolder } from "@focuson/template";
import { enzymeSetup } from "./enzymeAdapterSetup";

enzymeSetup ()
interface StateForModalButtonTest extends HasPageSelection, HasRestCommands {
  messages: SimpleMessage[],
  data?: string,
  a?: number
  b?: number
  tags?: TagHolder
}
type Context = ModalContext<StateForModalButtonTest>

const context: Context = {
  simpleMessagesL: simpleMessagesL<StateForModalButtonTest> (),
  combine: ( state, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( c => c.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  pages: {
    a: { lens: Lenses.identity<StateForModalButtonTest> ().focusQuery ( 'a' ), pageFunction: () => <span/>, config: {}, pageType: 'MainPage', pageMode: "edit" },
    b: { lens: Lenses.identity<StateForModalButtonTest> ().focusQuery ( 'b' ), pageFunction: () => <span/>, config: {}, pageType: 'MainPage', pageMode: "edit" },
  },
  restL: restL (),
  dateFn: testDateFn,
  tagHolderL: Lenses.identity<StateForModalButtonTest> ().focusQuery ( 'tags' ),
  pathToLens: function ( s: StateForModalButtonTest, currentLens?: Optional<StateForModalButtonTest, any> | undefined ): ( path: string ) => Optional<StateForModalButtonTest, any> {
    throw new Error ( "Function not implemented." );
  }
}

let startState: StateForModalButtonTest = { pageSelection: [ { pageName: 'a', pageMode: 'view', time: 'now' } ], messages: [], restCommands: [] };

describe ( "modal button", () => {
  it ( "should render with an id and title", () => {
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              startState, ( s: StateForModalButtonTest ) => {}, 'ModalButton', context )

    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} modal={'someModal'} focusOn='' pageMode='view' dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    expect ( button.text () ).toEqual ( 'someTitle' )

  } )
  it ( "should change the state to have a model when clicked", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              startState, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} modal={'someModal'} focusOn='~/' pageMode='edit' dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      messages: [], "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "focusOn": "~/", "pageMode": "edit", "pageName": "someModal", "time": "timeForTest" }
      ],
      "restCommands": []
    } )
  } )


  it ( "should create an empty if needed when clicked", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              startState, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state.focusOn ( 'data' )} modal={'someModal'} focusOn='~/' pageMode='edit' createEmpty='someData' dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "a": "someData",
      messages: [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "focusOn": "~/", "pageMode": "edit", "pageName": "someModal", "time": "timeForTest" }
      ],
      "restCommands": []
    } )
  } )

  it ( "should delete on open", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              startState, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state.focusOn ( 'data' )} modal={'someModal'} focusOn='~/' pageMode='edit' deleteOnOpen={[ '~' ]} dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      messages: [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "focusOn": "~/", "pageMode": "edit", "pageName": "someModal", "time": "timeForTest" }
      ],
      "restCommands": []
    } )
  } )
} )


describe ( "modal button adding a main page", () => {
  it ( "should change the state to have a main when clicked", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              startState, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} main={'b'} pageMode='edit' dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "restCommands": [], messages: [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "pageMode": "edit", "pageName": "b", "time": "timeForTest" }
      ]
    } )
  } )

  it ( "should support copy in with paths  using the original page for copy from and the new page for copy to", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              { ...startState, a: 123 }, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} main={'b'} pageMode='edit' dateFn={testDateFn}
                                      copy={[ { from: '~', to: '~' } ]}
                                      copyOnClose={[ { from: '~' } ]}
    /> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "a": 123,
      "b": 123, // copied from page a
      "restCommands": [], messages: [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "pageMode": "edit", "pageName": "b", "time": "timeForTest", "copyOnClose": [ { "from": "~" } ] }
      ]
    } )

  } )
  it ( "should support copy on close with defaults using the new page for copy from and the original page for copy to", () => {
    var remembered: any = {}
    const start: StateForModalButtonTest = {
      "a": undefined,
      "b": 123,
      "restCommands": [], messages: [],
      "pageSelection": [
        { "pageMode": "view", "pageName": "a", "time": "now" },
        { "firstTime": true, "pageMode": "edit", "pageName": "b", "time": "timeForTest", "copyOnClose": [ { "from": "~", to: '~' } ] }
      ]
    }
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              start, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const comp = mount ( <ModalCommitButton text='someTitle' id='someId' state={state}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      "a": 123,
      "b": 123,
      "messages": [],
      "pageSelection": [ { "pageMode": "view", "pageName": "a", "time": "now" } ],
      "restCommands": []
    } )
  } )


} )

describe ( "restOnOpen", () => {
  it ( "should create restCommands when clicked", () => {
    var remembered: any = {}
    const state: LensState<StateForModalButtonTest, StateForModalButtonTest, Context> =
            lensState<StateForModalButtonTest, Context> (
              startState, ( s: StateForModalButtonTest ) => {remembered = s}, 'ModalButton', context )
    const restOnOpen: RestCommand = { name: 'someRestName', restAction: 'get' };
    const comp = mount ( <ModalButton text='someTitle' id='someId' state={state} main={'b'}
                                      pageMode='edit'
                                      restOnOpen={restOnOpen}
                                      dateFn={testDateFn}/> )
    const button = comp.find ( "button" )
    button.simulate ( 'click' )
    expect ( remembered.restCommands ).toEqual ( [ restOnOpen ] )
  } )
} )