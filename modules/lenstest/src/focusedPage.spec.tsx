import { LensState, lensState } from "@focuson/state";
import { shallow } from "enzyme";
import { displayMain, focusedPage, FocusedPage, focusedPageWithExtraState, loadingPage, loadingPageWithExtraState, PageMode } from "@focuson/pages";
import { ModalDetails, PageSpecState, pageSpecStateconfig } from "./page.fixture";
import { SimpleMessage } from "@focuson/pages";
import { enzymeSetup } from "./enzymeAdapterSetup";


enzymeSetup ()
let view: PageMode = 'view';
const rootState = ({ messages: [], pageSelection: { pageName: 'nothing', pageMode: view } })
describe ( "displayMain / focusedPage", () => {
  const page: FocusedPage<PageSpecState, string> = focusedPage<PageSpecState, string> ( s => s ? `*${s}*` : "someTitle" ) ( ( state, string ) => <div>!{string}!</div> )

  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { ...rootState, someData: 'x', modalData: 'y' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessage[], ModalDetails> ( pageSpecStateconfig (), page, state, view ) )
    // expect ( comp.html () ).toEqual ( '' )
    expect ( comp.text () ).toEqual ( "*x*!x!" )
  } )
  it ( "should display  main page, and model, if modal page selected", () => {
    const state = lensState<PageSpecState> ( { ...rootState, someData: 'x', modalData: 'y', currentSelectedModalPage: 'someModalPage' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessage[], ModalDetails> ( pageSpecStateconfig (), page, state, view ) )
    expect ( comp.text () ).toEqual ( "*x*!x!Modal y" )
  } )
  it ( "should display loading if no full state", () => {
    const state = lensState<PageSpecState> ( { ...rootState, modalData: 'y' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessage[], ModalDetails> ( pageSpecStateconfig (), page, state, view ) )
    // expect ( comp.html () ).toEqual ( '' )
    expect ( comp.text () ).toEqual ( "someTitleLoading" )
  } )


} )


describe ( "displayMain / loadingPage (for legacy support) - note that there is no modal page support", () => {
  const page: ( s: LensState<PageSpecState, string>, pageMode: PageMode ) => JSX.Element =
          loadingPage<PageSpecState, string> ( s => s ? `*${s}*` : "someTitle" ) ( ( state, string ) => <div>!{string}!</div> )

  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { ...rootState, someData: 'x', modalData: 'y' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( page ( state, view ) )
    expect ( comp.text () ).toEqual ( "!x!" )
  } )
} )
describe ( "displayMain / focusedPageWithExtraState", () => {
  const page: FocusedPage<PageSpecState, string> = focusedPageWithExtraState<PageSpecState, string, string> ( s => s ? `*${s}*` : "someTitle" ) ( s => s ) (
    ( fullState, state, string ) => <div>!{string}!</div> )
  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { ...rootState, someData: 'x', modalData: 'y' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessage[], ModalDetails> ( pageSpecStateconfig (), page, state, view ) )
    expect ( comp.text () ).toEqual ( "*x*!x!" )
  } )
  it ( "should display  main page, and model, if modal page selected", () => {
    const state = lensState<PageSpecState> ( { ...rootState, someData: 'x', modalData: 'y', currentSelectedModalPage: 'someModalPage' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( displayMain<PageSpecState, string, SimpleMessage[], ModalDetails> ( pageSpecStateconfig (), page, state, view ) )
    expect ( comp.text () ).toEqual ( "*x*!x!Modal y" )
  } )
} )
describe ( "displayMain / loadingPageWithExtraState (for legacy support) - note that there is no modal page support", () => {
  const page: ( s: LensState<PageSpecState, string>, pageMode: PageMode ) => JSX.Element =
          loadingPageWithExtraState<PageSpecState, string, string> ( s => s ? s : "someTitle" ) ( s => s ) ( ( fullState, state, string ) => <div>{string}</div> )

  it ( "should display just the main page, if no modal page", () => {
    const state = lensState<PageSpecState> ( { ...rootState, someData: 'x', modalData: 'y' }, () => {}, 'displayMain / focusedPage' ).focusOn ( 'someData' )
    const comp = shallow ( page ( state, view ) )
    expect ( comp.text () ).toEqual ( "x" )
  } )
} )