import { addModalPageIfNeeded, allModelPageDetails } from "@focuson/pages";
import { DisplayPageSpecState, ModalDetails, modalDetails, PageSpecState } from "./page.fixture";
import { lensState } from "@focuson/state";
import { shallow } from "enzyme";
import { enzymeSetup } from "./enzymeAdapterSetup";

export type Context = 'context'
export const context = 'context'

enzymeSetup ()
describe ( 'addModalPageIfNeeded', () => {
  const modalPageDetails = allModelPageDetails<PageSpecState, ModalDetails, Context> ( modalDetails );
  it ( "to show only the main page if there is no modal page", () => {
    const state = lensState<PageSpecState, Context> ( { messages: [], pageSelection: { pageName: 'nothing', pageMode: "view" }, someData: 'x', modalData: 'y', }, () => {}, 'addModalPageIfNeeded', context ).focusOn ( 'someData' )
    const comp = shallow ( addModalPageIfNeeded ( modalPageDetails, state, DisplayPageSpecState ( { state } ) ) )
    expect ( comp.text () ).toEqual ( 'Main x' )
  } )

  it ( "to show main page and modal if requested", () => {
    const state = lensState<PageSpecState, Context> ( { messages: [], pageSelection: { pageName: 'nothing', pageMode: "view" }, someData: 'x', modalData: 'y', currentSelectedModalPage: 'someModalPage' }, () => {}, 'addModalPageIfNeeded', context ).focusOn ( 'someData' )
    const comp = shallow ( addModalPageIfNeeded ( modalPageDetails, state, DisplayPageSpecState ( { state } ) ) )
    expect ( comp.text () ).toEqual ( 'Main xModal y' )
  } )

  it ( "to throw error if illegal modal page selected", () => {
    const state = lensState<PageSpecState, Context> ( { messages: [], pageSelection: { pageName: 'nothing', pageMode: "view" }, someData: 'x', modalData: 'y', currentSelectedModalPage: 'illegalName' }, () => {}, 'addModalPageIfNeeded', context ).focusOn ( 'someData' )
    expect ( () => addModalPageIfNeeded ( modalPageDetails, state, DisplayPageSpecState ( { state } ) ) ).toThrow ( 'Illegal modal page illegalName. Legal values are someModalPage' )
  } )

} )