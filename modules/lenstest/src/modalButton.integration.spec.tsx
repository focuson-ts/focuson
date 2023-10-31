import { fromPathFromRaw, HasPageSelection, ModalButton, ModalCommitButton, MultiPageDetails, PageDetailsForCombine, pageSelectionlens, rawCloseOnePageTxs, simpleMessagesL } from "@focuson/pages";
import { HasRestCommands, restL } from "@focuson/rest";
import { lensState, LensState } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { SimpleMessage, testDateFn } from "@focuson/utils";
import { identityOptics, Lenses } from "@focuson/lens";
import { HasTagHolder } from "@focuson/template";
import { cleanup, fireEvent, render, screen } from '@testing-library/react';


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
  tags: {},
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
  combine: ( _, pages: PageDetailsForCombine[] ): JSX.Element => <div>{pages.map ( p => p.element )}</div>,
  pageSelectionL: pageSelectionlens (),
  simpleMessagesL: simpleMessagesL (),
  pathToLens: fromPathFromRaw ( pageSelectionlens (), pageDetails ),
  pages: pageDetails,
  commonIds: {},
  newFetchers: {},
  dateFn: testDateFn,
  restDetails: {},
  closeOnePageTxs: rawCloseOnePageTxs,
  tagHolderL: Lenses.identity<ModalButtonStateForTest> ().focusQuery ( 'tags' ),
  currentState<D, C> ( state: LensState<ModalButtonStateForTest, any, C> ): LensState<ModalButtonStateForTest, D, C> {return state},
  messagePostProcessor: {},
  mockJwt: true
}

function displayAndGetButton ( s: ModalButtonStateForTest, setMain: ( s: ModalButtonStateForTest ) => void, fn: ( s: LensState<ModalButtonStateForTest, PageData, Context> ) => JSX.Element ) {
  cleanup();
  render ( fn ( lensState<ModalButtonStateForTest, Context> ( s, setMain, 'ModalButton', context ).focusOn ( 'mainPage' ) ) );
  return screen.getByRole ( 'button' );
}

describe ( 'modal buttons', () => {
  describe ( 'with single child', () => {
    it ( 'should copy', () => {
      let remembered: any = {};

      const button = displayAndGetButton ( dataS, s => { remembered = s; }, state =>
        <ModalButton text='someTitle' id='someId' state={state} copy={[ { from: '~/child' } ]} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/>
      );

      fireEvent.click ( button );

      expect ( remembered ).toEqual ( {
        messages: [],
        tags: {},
        mainPage: {
          child: { data: "a" },
          temp: { data: "a" }
        },
        restCommands: [],
        pageSelection: [
          { pageName: "mainPage", pageMode: "view", time: "now" },
          { focusOn: "~/temp", firstTime: true, pageMode: "view", pageName: "someModal", time: "timeForTest" },
        ],
      } );
    } );
  } );


  it ( 'should create empty', () => {
    let remembered: any = {};

    const button = displayAndGetButton ( emptyS, s => { remembered = s; }, state =>
      <ModalButton text='someTitle' id='someId' state={state} createEmpty={{ data: 'data' }} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/>
    );

    fireEvent.click ( button );

    expect ( remembered ).toEqual ( {
      messages: [],
      tags: {},
      pageSelection: [
        { pageName: "mainPage", pageMode: "view", time: "now" },
        { focusOn: "~/temp", firstTime: true, pageMode: "view", pageName: "someModal", time: "timeForTest" },
      ],
      restCommands: [],
      mainPage: { "temp": { "data": "data" } }
    } );
  } );
  it ( "should copyJustString", () => {
    let remembered: any = {};
    const state = { ...emptyS, a: { x: 'somedata', y: 'other' } };


    displayAndGetButton ( state, s => { remembered = s; }, state =>
      <ModalButton text='someTitle' id='someId' state={state} copyJustString={[ { from: '/a', to: '/b', joiner: '*' } ]} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/>
    )

    fireEvent.click ( screen.getByText ( 'someTitle' ) );

    expect ( remembered ).toEqual ( {
      ...state,
      "b": "somedata*other",
      "pageSelection": [
        { "pageName": "mainPage", "pageMode": "view", "time": "now" },
        { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest" }
      ]
    } );
  } );
  it ( "should handle copyJustString when target is not there", () => {
    let remembered: any = {};


    displayAndGetButton ( emptyS, s => { remembered = s; }, state =>
      <ModalButton text='someTitle' id='someId' state={state} copyJustString={[ { from: '/a', to: '/b', joiner: '*' } ]} focusOn={'~/temp'} modal={'someModal'} pageMode='view' dateFn={testDateFn}/>
    )

    fireEvent.click ( screen.getByText ( 'someTitle' ) );

    expect ( remembered ).toEqual ( {
      ...emptyS,
      "pageSelection": [
        { "pageName": "mainPage", "pageMode": "view", "time": "now" },
        { "focusOn": "~/temp", "firstTime": true, "pageMode": "view", "pageName": "someModal", "time": "timeForTest" }
      ]
    } );
  } );


  it ( "should create empty, then copy back", () => {
    let remembered: any = {}
    displayAndGetButton ( emptyS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp'
                   createEmpty={{ data: 'data' }}
                   modal={'someModal'}
                   copyOnClose={[ { to: '~/data' } ]}
                   pageMode='view' dateFn={testDateFn}/> );
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
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

    let remembered1: any = {}
    displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> )
    fireEvent.click ( screen.getByRole ( 'button' ) );
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
    let remembered: any = {}
    displayAndGetButton ( emptyS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state}
                   focusOn='~/temp' createEmpty={{ data: 'data' }}
                   rest={{ name: 'restName', restAction: 'update' }} modal={'someModal'}
                   copyOnClose={[ { to: '~/data' } ]} pageMode='view' dateFn={testDateFn}/> )
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
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

    let remembered1: any = {}
    displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> )

    fireEvent.click ( screen.getByRole ( 'button' ) );

    expect ( remembered1 ).toEqual ( {
      messages: [],
      "tags": {},
      "mainPage": { "temp": { "data": "data" }, "data": { "data": "data" } },
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now", } ],
      "restCommands": [ { "name": "restName", "restAction": "update" } ]
    } )
  } )
} )


describe ( "with nested child", () => {
  it ( "should copy", () => {
    let remembered: any = {}
    displayAndGetButton ( nestedS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} copy={[ { from: '~/nested/child' } ]} focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
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
    let remembered: any = {}
    displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} modal={'someModal'}
                   copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
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

    let remembered1: any = {}
    displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> )
    fireEvent.click ( screen.getByRole ( 'button' ) );
    expect ( remembered1 ).toEqual ( {
      messages: [],
      "tags": {},
      "mainPage": { "temp": { "data": "data" }, nested: { "data": { "data": "data" } } },
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
      "restCommands": []
    } )
  } )

  it ( "should create empty, then copy back with a rest command", () => {
    let remembered: any = {}
    displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} rest={{ name: 'restName', restAction: 'update' }}
                   modal={'someModal'} copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
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

    let remembered1: any = {}
    displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> )
    fireEvent.click ( screen.getByRole ( 'button' ) );
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
    let remembered: any = {}
    displayAndGetButton ( listS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state} copy={[ { from: '~/list[1]' } ]} focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
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
    let remembered: any = {}
    displayAndGetButton ( listS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state}
                   copy={[ { from: '~/list[$last]' } ]}
                   focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
    expect ( remembered.mainPage.temp ).toEqual ( { data: '2' } )
  } )
  it ( "should copy from [~/index]", () => {
    let remembered: any = {}
    displayAndGetButton ( listS, s => remembered = s, state =>
      <ModalButton text='someTitle' id='someId' state={state}
                   copy={[ { from: '~/list/[~/index]' } ]}
                   focusOn='~/temp' modal={'someModal'} pageMode='view' dateFn={testDateFn}/> )
    fireEvent.click ( screen.getByText ( 'someTitle' ) );
    expect ( remembered.mainPage.temp ).toEqual ( { data: '1' } )
  } )

} )


it ( "should create empty, then copy back", () => {
  let remembered: any = {}
  displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
    <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} modal={'someModal'}
                 copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
  fireEvent.click ( screen.getByText ( 'someTitle' ) );
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

  let remembered1: any = {}
  displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> )
  fireEvent.click ( screen.getByRole ( 'button' ));
  expect ( remembered1 ).toEqual ( {
    messages: [],
    "tags": {},
    "mainPage": { "temp": { "data": "data" }, nested: { "data": { "data": "data" } } },
    "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
    "restCommands": []
  } )
} )

it ( "should create empty, then copy back with a rest command", () => {
  let remembered: any = {}
  displayAndGetButton ( emptyNestedS, s => remembered = s, state =>
    <ModalButton text='someTitle' id='someId' state={state} focusOn='~/temp' createEmpty={{ data: 'data' }} rest={{ name: 'restName', restAction: 'update' }}
                 modal={'someModal'} copyOnClose={[ { to: '~/nested/data' } ]} pageMode='view' dateFn={testDateFn}/> )
  fireEvent.click ( screen.getByText ( 'someTitle' ) );
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

  let remembered1: any = {}
  displayAndGetButton ( remembered, s => remembered1 = s, state => <ModalCommitButton id='id' state={state}/> )
  fireEvent.click ( screen.getByRole ( 'button' ) );
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
