import { lensState, LensState } from "@focuson/state";
import { fromPathFromRaw, HasPageSelection, MultiPageDetails, PageDetailsForCombine, pageSelectionlens, rawCloseOnePageTxs, simpleMessagesL } from "@focuson/pages";
import { HasRestCommands, restL } from "@focuson/rest";
import { SimpleMessage, testDateFn } from "@focuson/utils";
import { FocusOnContext } from "@focuson/focuson";
import { identityOptics, Lenses } from "@focuson/lens";
import { RestButton } from "@focuson/form_components";
import { HasTagHolder } from "@focuson/template";
import { fireEvent, render, screen } from "@testing-library/react";
import '@testing-library/jest-dom/extend-expect';


interface PageData {
  a?: string;
  b?: string;
}

export interface RestButtonStateForTest extends HasPageSelection, HasRestCommands, HasTagHolder {
  messages: SimpleMessage[],
  mainPage?: PageData
}

const emptyS: RestButtonStateForTest = {
  messages: [],
  tags: {},
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
  dateFn: testDateFn,
  newFetchers: {},
  restDetails: {},
  closeOnePageTxs: rawCloseOnePageTxs,
  tagHolderL: Lenses.identity<RestButtonStateForTest> ().focusQuery ( 'tags' ),
  currentState<D, C> ( state: LensState<RestButtonStateForTest, any, C> ): LensState<RestButtonStateForTest, D, C> {return state},
  messagePostProcessor: {},
  mockJwt: true
}


type Context = FocusOnContext<RestButtonStateForTest>
function displayAndGetButton (
  s: RestButtonStateForTest,
  setMain: ( s: RestButtonStateForTest ) => void,
  fn: ( s: LensState<RestButtonStateForTest, PageData, Context> ) => JSX.Element
) {
  render ( fn ( lensState<RestButtonStateForTest, Context> ( s, setMain, 'ModalButton', context ).focusOn ( 'mainPage' ) ) );

  return screen.getByRole ( "button" );
}

// function displayAndGetButton ( s: RestButtonStateForTest, setMain: ( s: RestButtonStateForTest ) => void, fn: ( s: LensState<RestButtonStateForTest, PageData, Context> ) => JSX.Element ) {
//   const comp = shallow ( fn ( lensState<RestButtonStateForTest, Context> ( s, setMain, 'ModalButton', context ).focusOn ( 'mainPage' ) ) )
//   return comp.find ( "button" )
//
// }
describe ( "RestButton", () => {


  it ( "should render as a button", () => {
    const button = displayAndGetButton ( emptyS, () => {}, s => <RestButton rest='someRestName' action={'get'} state={s} id='someId' name='someButtonName'/> );

    expect ( button ).toHaveAttribute ( "aria-errormessage", "someId.error" );
    expect ( button ).toHaveAttribute ( "aria-invalid", "false" );
    expect ( button ).toHaveClass ( "button" );
    expect ( button.textContent ).toBe ( "someButtonName" );
  } );



  it ( "should place a rest command in the state - simple RestAction", () => {
    let remembered: any = undefined;

    const button = displayAndGetButton (
      emptyS,
      s => remembered = s,
      s => <RestButton rest='someRestName' action={'get'} state={s} id='someId'/>
    );

    fireEvent.click ( button );

    expect ( remembered ).toEqual ( {
      "mainPage": {},
      "messages": [],
      "tags": {},
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
      "restCommands": [ { "name": "someRestName", "restAction": "get" } ]
    } );
  } );

  it ( "should place a rest command in the state - stateChange RestAction", () => {
    let remembered: any = undefined;

    const button = displayAndGetButton (
      emptyS,
      s => remembered = s,
      s => <RestButton rest='someRestName' action={{ state: 'newState' }} state={s} id='someId'/>
    );

    fireEvent.click ( button );

    expect ( remembered ).toEqual ( {
      "mainPage": {},
      "messages": [],
      "tags": {},
      "pageSelection": [ { "pageMode": "view", "pageName": "mainPage", "time": "now" } ],
      "restCommands": [ { "name": "someRestName", "restAction": { "state": "newState" } } ]
    } );
  } );


  it ( "should place a rest command in the state - copyOnSuccessAndDeleteOnSuccess", () => {
    let remembered: any = undefined;

    const button = displayAndGetButton (
      emptyS,
      s => remembered = s,
      s => (
        <RestButton
          rest='someRestName'
          action={{ state: 'newState' }}
          state={s}
          id='someId'
          onSuccess={[
            { command: 'copyResult', from: 'from', to: 'to' },
            { command: 'delete', path: 'del1' },
            { command: 'delete', path: 'del2' }
          ]}
        />
      )
    );

    fireEvent.click ( button );

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
    } );
  } );

} )