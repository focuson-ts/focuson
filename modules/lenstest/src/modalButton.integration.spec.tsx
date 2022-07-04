import { fromPathFromRaw, HasPageSelection, ModalButton, ModalCommitButton, MultiPageDetails, PageDetailsForCombine, pageSelectionlens, simpleMessagesL } from "@focuson/pages";
import { HasRestCommands, restL } from "@focuson/rest";
import { lensState, LensState } from "@focuson/state";
import { shallow } from "enzyme";
import { FocusOnContext } from "@focuson/focuson";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { SimpleMessage, testDateFn } from "@focuson/utils";
import { identityOptics, Lenses } from "@focuson/lens";
import { HasTagHolder, TagHolder } from "@focuson/template";

enzymeSetup ()


interface ModalChildData {
  data: string
}
interface PageData {
  child?: ModalChildData;
  list?: ModalChildData[];
  temp?: ModalChildData;
  tempAr?: ModalChildData[];
  index?: number
  nested?: {
    child?: ModalChildData,
    list?: ModalChildData[]
  }
}

export interface ModalButtonStateForTest extends HasPageSelection, HasRestCommands, HasTagHolder {
  messages: SimpleMessage[],
  mainPage: PageData
}
const emptyS: ModalButtonStateForTest = {
  messages: [],
  tags:{},
  pageSelection: [ { "pageName": "mainPage", "pageMode": "view", time: 'now' } ],
  restCommands: [],
  mainPage: {}
}
const emptyNestedS: ModalButtonStateForTest = {
  ...emptyS,
  mainPage: { nested: {} }
}
const dataS: ModalButtonStateForTest = {
  ...emptyS,
  mainPage: { child: { data: 'a' } }
}
const nestedS: ModalButtonStateForTest = {
  ...emptyS,
  mainPage: { nested: { child: { data: 'a' } } }
}
const listS: ModalButtonStateForTest = {
  ...emptyS,
  mainPage: {
    index: 1,
    list: [ { data: '0' }, { data: '1' }, { data: '2' } ]
  }
}
type Context = FocusOnContext<ModalButtonStateForTest>
const pageDetails: MultiPageDetails<ModalButtonStateForTest, Context> = { mainPage: { lens: identityOptics<ModalButtonStateForTest> ().focusQuery ( 'mainPage' ), pageType: 'MainPage', pageFunction: () => <span/>, config: {}, pageMode: 'edit' } }
const context: Context = {
  restL: restL<ModalButtonStateForTest> (),
  combine: ( state, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( p => p.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  simpleMessagesL: simpleMessagesL (),
  pathToLens: fromPathFromRaw ( pageSelectionlens (), pageDetails ),
  pages: pageDetails,
  commonIds: {},
  newFetchers: {},
  restDetails: {},
  tagHolderL: Lenses.identity<ModalButtonStateForTest> ().focusQuery ( 'tags' ),
}

function displayAndGetButton ( s: ModalButtonStateForTest, setMain: ( s: ModalButtonStateForTest ) => void, fn: ( s: LensState<ModalButtonStateForTest, PageData, Context> ) => JSX.Element ) {
  const comp = shallow ( fn ( lensState<ModalButtonStateForTest, Context> ( s, setMain, 'ModalButton', context ).focusOn ( 'mainPage' ) ) )
  return comp.find ( "button" )

}

describe ( "modal buttons", () => {
  describe ( "with single child", () => {
    it ( "should copy", () => {
      var remembered: any = {}
      const button = displayAndGetButton ( dataS, s => remembered = s, state =>
        <ModalButton text='someTitle' id='someId' state={state} copy={[ { from: '~/child' } ]} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
      button.simulate ( 'click' )
      expect ( remembered ).toEqual ( {
        messages: [],
        "tags": {},
        mainPage: {
          "child": { "data": "a" },
          "temp": { "data": "a" }
        },
        "restCommands": [],
        "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now", }, { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest", } ],
      } )
    } )
    it ( "should create empty", () => {
      var remembered: any = {}
      const button = displayAndGetButton ( emptyS, s => remembered = s, state =>
        <ModalButton text='someTitle' id='someId' state={state} createEmpty={{ data: 'data' }} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
      button.simulate ( 'click' )
      expect ( remembered ).toEqual ( {
        messages: [],
        "tags": {},
        "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now", }, { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest", } ],
        "restCommands": [],
        mainPage: { "temp": { "data": "data" } }
      } )
    } )
    it ( "should copyJustString", () => {
      var remembered: any = {}
      const state = { ...emptyS, a: { x: 'somedata', y: 'other' } }
      const button = displayAndGetButton ( state, s => remembered = s, state =>
        <ModalButton text='someTitle' id='someId' state={state} copyJustString={[ { from: '/a', to: '/b', joiner: '*' } ]} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
      button.simulate ( 'click' )
      expect ( remembered ).toEqual ( {
        ...state,
        "b": "somedata*other",
        "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now", }, { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest", } ]
      } )
    } )
    it ( "should handle copyJustString when target is not there", () => {
      var remembered: any = {}
      const button = displayAndGetButton ( emptyS, s => remembered = s, state =>
        <ModalButton text='someTitle' id='someId' state={state} copyJustString={[ { from: '/a', to: '/b', joiner: '*' } ]} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
      button.simulate ( 'click' )
      expect ( remembered ).toEqual ( {
        ...emptyS,
        "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now", }, { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest", } ]
      } )
    } )

    it ( "should create empty, then copy back", () => {
      var remembered: any = {}
      displayAndGetButton ( emptyS, s => remembered = s, state =>
        <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp'
                     createEmpty={{ data: 'data' }}
                     modal={'someModal'}
                     copyOnClose={[ { to: '~/data' } ]}
                     pageMode='view' dateFn={testDateFn}/> )
        .simulate ( 'click' )
      expect ( remembered ).toEqual ( {
        messages: [],
        "tags": {},
        "pageSelection": [
          { "pageName": "mainPage", "pageMode": "view", "time": "now", },
          {
            "focusOn": '~/temp', "firstTime": true, "pageMode": "view", "pageName": "someModal",
            copyOnClose: [ { to: "~/data" } ], "time": "timeForTest",
          } ],
        "restCommands": [],
        mainPage: { "temp": { "data": "data" } }
      } )

      var remembered1: any = {}
      displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> ).simulate ( 'click' )
      console.log ( JSON.stringify ( remembered1, null, 2 ) )
      expect ( remembered1 ).toEqual ( {
        messages: [],
        "tags": {},
        "mainPage": { "temp": { "data": "data" }, "data": { "data": "data" } },
        "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now", } ],
        "restCommands": []
      } )
    } )
    it ( "should create empty, then copy back with a rest command", () => {
      var remembered: any = {}
      displayAndGetButton ( emptyS, s => remembered = s, state =>
        <ModalButton text='someTitle' id='someId' state={state}
                     focusOn='~/temp' createEmpty={{ data: 'data' }}
                     rest={{ name: 'restName', restAction: 'update' }} modal={'someModal'}
                     copyOnClose={[ { to: '~/data' } ]} pageMode='view' dateFn={testDateFn}/> )
        .simulate ( 'click' )
      expect ( remembered ).toEqual ( {
        "mainPage": { "temp": { "data": "data" } },
        "messages": [],
        "tags": {},
        "pageSelection": [
          { "pageMode": "view", "pageName": "mainPage", "time": "now", },
          {
            "copyOnClose": [ { "to": "~/data" } ],
            "firstTime": true, "focusOn": "~/temp", "pageMode": "view", "pageName": "someModal",
            "rest": { "name": "restName", "restAction": "update" }, "time": "timeForTest",
          }
        ],
        "restCommands": []
      } )

      var remembered1: any = {}
      displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> ).simulate ( 'click' )
      expect ( remembered1 ).toEqual ( {
        messages: [],
        "tags": {},
        "mainPage": { "temp": { "data": "data" }, "data": { "data": "data" } },
        "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now", } ],
        "restCommands": [ { "name": "restName", "restAction": "update" } ]
      } )
    } )
  } )
} )


describe ( "with nested child", () => {
  it ( "should copy", () => {
    var remembered: any = {}
    const button = displayAndGetButton ( nestedS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} copy={[ { from: '~/nested/child' } ]} focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      messages: [],
      "tags": {},
      mainPage: {
        nested: { "child": { "data": "a" } },
        "temp": { "data": "a" }
      },
      "restCommands": [],
      "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now", }, { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest", } ],
    } )
  } )
  it ( "should create empty, then copy back", () => {
    var remembered: any = {}
    displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} modal={'someModal'}
                   copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
      .simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      messages: [],
      "tags": {},
      "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now", }, {
        "firstTime": true, "pageMode": "view", "pageName": "someModal",
        "focusOn": "~/temp",
        copyOnClose: [ { "to": "~/nested/data" } ],
        "time": "timeForTest",
      } ],
      "restCommands": [],
      mainPage: { "temp": { "data": "data" }, nested: {} }
    } )

    var remembered1: any = {}
    displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> ).simulate ( 'click' )
    expect ( remembered1 ).toEqual ( {
      messages: [],
      "tags": {},
      "mainPage": { "temp": { "data": "data" }, nested: { "data": { "data": "data" } } },
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
      "restCommands": []
    } )
  } )

  it ( "should create empty, then copy back with a rest command", () => {
    var remembered: any = {}
    displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} rest={{ name: 'restName', restAction: 'update' }}
                   modal={'someModal'} copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
      .simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      messages: [],
      "tags": {},
      "pageSelection": [
        { "pageName": "mainPage", "pageMode": "view", time: 'now' },
        {
          "focusOn": "~/temp", rest: { name: 'restName', restAction: 'update' }, "firstTime": true, "pageMode": "view", "pageName": "someModal",
          copyOnClose: [ { "to": "~/nested/data" } ], time: 'timeForTest'
        } ],
      "restCommands": [],
      mainPage: { "temp": { "data": "data" }, nested: {} }
    } )

    var remembered1: any = {}
    displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> ).simulate ( 'click' )
    expect ( remembered1 ).toEqual ( {
      messages: [],
      "tags": {},
      "mainPage": { "temp": { "data": "data" }, nested: { "data": { "data": "data" } } },
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now", } ],
      "restCommands": [ { "name": "restName", "restAction": "update" } ]
    } )
  } )
} )


describe ( "with lists of data", () => {
  it ( "should copy from [1]", () => {
    var remembered: any = {}
    const button = displayAndGetButton ( listS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} copy={[ { from: '~/list[1]' } ]} focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( {
      messages: [],
      "tags": {},
      mainPage: {
        "index": 1,
        list: [ { data: '0' }, { data: '1' }, { data: '2' } ],
        temp: { "data": "1" }
      },
      "restCommands": [],
      "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now", }, { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest", } ],
    } )
  } )
  it ( "should copy from [last]", () => {
    var remembered: any = {}
    const button = displayAndGetButton ( listS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state}
                   copy={[ { from: '~/list[$last]' } ]}
                   focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    button.simulate ( 'click' )
    expect ( remembered.mainPage.temp ).toEqual ( { data: '2' } )
  } )
  it ( "should copy from [~/index]", () => {
    var remembered: any = {}
    const button = displayAndGetButton ( listS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state}
                   copy={[ { from: '~/list/[~/index]' } ]}
                   focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    button.simulate ( 'click' )
    expect ( remembered.mainPage.temp ).toEqual ( { data: '1' } )
  } )

} )


it ( "should create empty, then copy back", () => {
  var remembered: any = {}
  displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
    <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} modal={'someModal'}
                 copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
    .simulate ( 'click' )
  expect ( remembered ).toEqual ( {
    messages: [],
    "tags": {},
    "pageSelection": [ { "pageName": "mainPage", "pageMode": "view", "time": "now" },
      {
        "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal",
        copyOnClose: [ { "to": "~/nested/data" } ], "time": "timeForTest",
      } ],
    "restCommands": [],
    mainPage: { "temp": { "data": "data" }, nested: {} }
  } )

  var remembered1: any = {}
  displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> ).simulate ( 'click' )
  expect ( remembered1 ).toEqual ( {
    messages: [],
    "tags": {},
    "mainPage": { "temp": { "data": "data" }, nested: { "data": { "data": "data" } } },
    "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
    "restCommands": []
  } )
} )

it ( "should create empty, then copy back with a rest command", () => {
  var remembered: any = {}
  displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
    <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} rest={{ name: 'restName', restAction: 'update' }}
                 modal={'someModal'} copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
    .simulate ( 'click' )
  expect ( remembered ).toEqual ( {
    messages: [],
    "tags": {},
    "pageSelection": [
      { "pageName": "mainPage", "pageMode": "view", "time": "now", },
      {
        "focusOn": "~/temp", rest: { name: 'restName', restAction: 'update' }, "firstTime": true, "pageMode": "view", "pageName": "someModal",
        copyOnClose: [ { "to": "~/nested/data" } ], "time": "timeForTest",
      } ],
    "restCommands": [],
    mainPage: { "temp": { "data": "data" }, nested: {} }
  } )

  var remembered1: any = {}
  displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> ).simulate ( 'click' )
  expect ( remembered1 ).toEqual ( {
    messages: [],
    "tags": {},
    "mainPage": { "temp": { "data": "data" }, nested: { "data": { "data": "data" } } },
    "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
    "restCommands": [ { "name": "restName", "restAction": "update", } ]
  } )
} )
// describe ( "with nested lists of data", () => {
// } )
