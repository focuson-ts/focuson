
import { addModalPageIfNeeded, allModelPageDetails } from "@focuson/pages";
import { DisplayPageSpecState, ModalDetails, modalDetails, PageSpecState } from "./page.fixture";
import { lensState } from "@focuson/state";
import { shallow } from "enzyme";
import { enzymeSetup } from "./enzymeAdapterSetup";

enzymeSetup ()
describe ( 'addModalPageIfNeeded', () => {
  const modalPageDetails = allModelPageDetails<PageSpecState, ModalDetails> ( modalDetails );
  it ( "to show only the main page if there is no modal page", () => {
    const state = lensState<PageSpecState> ( { messages: [], pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', }, () => {}, 'addModalPageIfNeeded' ).focusOn ( 'someData' )
    const comp = shallow ( addModalPageIfNeeded ( modalPageDetails, state, DisplayPageSpecState ( { state } ) ) )
    expect ( comp.text () ).toEqual ( 'Main x' )
  } )

  it ( "to show main page and modal if requested", () => {
    const state = lensState<PageSpecState> ( { messages: [], pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', currentSelectedModalPage: 'someModalPage' }, () => {}, 'addModalPageIfNeeded' ).focusOn ( 'someData' )
    const comp = shallow ( addModalPageIfNeeded ( modalPageDetails, state, DisplayPageSpecState ( { state } ) ) )
    expect ( comp.text () ).toEqual ( 'Main xModal y' )
  } )

  it ( "to throw error if illegal modal page selected", () => {
    const state = lensState<PageSpecState> ( { messages: [], pageSelection: { pageName: 'nothing' }, someData: 'x', modalData: 'y', currentSelectedModalPage: 'illegalName' }, () => {}, 'addModalPageIfNeeded' ).focusOn ( 'someData' )
    expect ( () => addModalPageIfNeeded ( modalPageDetails, state, DisplayPageSpecState ( { state } ) ) ).toThrow ( 'Illegal modal page illegalName. Legal values are someModalPage' )
  } )

} )