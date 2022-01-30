import { displayMain, focusedPage, FocusedPage, focusedPageWithExtraState, loadingPage, loadingPageWithExtraState } from "@focuson/pages";
import { ModalDetails, pageDetails, PageSpecState, pageSpecStateconfig } from "./page.fixture";
import { SimpleMessages } from "@focuson/pages";
import { LensState, lensState } from "@focuson/state";
import { shallow } from "enzyme";
import { enzymeSetup } from "./enzymeAdapterSetup";


enzymeSetup ()

describe ( "displayMain / focusedPage", () => {
  const page: FocusedPage<PageSpecState, string> = focusedPage<PageSpecState, string> ( s => s ? s : "someTitle" ) ( ( state, string ) => <div>{string}</div> )
  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { messages: {}, pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessages, ModalDetails> ( pageSpecStateconfig (), page, state ) )
    expect ( comp.text () ).toEqual ( "x" )
  } )
  it ( "should display  main page, and model, if modal page selected", () => {
    const state = lensState<PageSpecState> ( { messages: {}, pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', currentSelectedModalPage: 'someModalPage' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessages, ModalDetails> ( pageSpecStateconfig (), page, state ) )
    expect ( comp.text () ).toEqual ( "xModal y" )
  } )
} )


describe ( "displayMain / loadingPage (for legacy support) - note that there is no modal page support", () => {
  const page: ( s: LensState<PageSpecState, string> ) => JSX.Element =
          loadingPage<PageSpecState, string> ( s => s ? s : "someTitle" ) ( ( state, string ) => <div>{string}</div> )

  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { messages: {}, pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( page ( state ) )
    expect ( comp.text () ).toEqual ( "x" )
  } )
} )
describe ( "displayMain / focusedPageWithExtraState", () => {
  const page: FocusedPage<PageSpecState, string> = focusedPageWithExtraState<PageSpecState, string, string> ( s => s ? s : "someTitle" ) ( s => s ) ( ( state, string ) => <div>{string}</div> )
  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { messages: {}, pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessages, ModalDetails> ( pageSpecStateconfig (), page, state ) )
    expect ( comp.text () ).toEqual ( "x" )
  } )
  it ( "should display  main page, and model, if modal page selected", () => {
    const state = lensState<PageSpecState> ( { messages: {}, pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', currentSelectedModalPage: 'someModalPage' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessages, ModalDetails> ( pageSpecStateconfig (), page, state ) )
    expect ( comp.text () ).toEqual ( "xModal y" )
  } )
} )
describe ( "displayMain / loadingPageWithExtraState (for legacy support) - note that there is no modal page support", () => {
  const page: ( s: LensState<PageSpecState, string> ) => JSX.Element =
          loadingPageWithExtraState<PageSpecState, string, string> ( s => s ? s : "someTitle" ) ( s => s ) ( ( state, string ) => <div>{string}</div> )

  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { messages: {}, pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( page ( state ) )
    expect ( comp.text () ).toEqual ( "x" )
  } )
} )