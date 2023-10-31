
import { SelectedItem, SelectedItemDisplayProps } from "@focuson/form_components";
import { PageMode } from "@focuson/utils";
import { LensState, lensState } from "@focuson/state";
import { Lenses } from "@focuson/lens";
import { render } from "@testing-library/react";



interface StateForSelectedItem {
  data?: string[]
}

interface SelectedItemThings {
  index: number;
  mode: PageMode;
  header?: string;
  showNofM?: boolean;
  headerIfEmpty?: string;
}
function displaySelectedItem ( s: StateForSelectedItem, selectedItemThings: SelectedItemThings, setMain: ( s: StateForSelectedItem ) => void ) {
  function display ( { state, mode, id }: SelectedItemDisplayProps<StateForSelectedItem, string, {}> ) {
    const optJson = state.optJson ();
    return <span id={id}>{mode}/{optJson}</span>
  }
  const state: LensState<StateForSelectedItem, StateForSelectedItem, {}> = lensState ( s, setMain, 'desc', {} );
  return render ( <SelectedItem {...selectedItemThings} id='someId' display={display} state={state.focusOn ( 'data' )} allButtons={{}}/> ).container.innerHTML
}

describe ( "selectedItem", () => {
  it ( "should display the selected item", () => {
    const x = Lenses.identity<StateForSelectedItem> ().focusQuery ( 'data' ).chain ( Lenses.nth ( 1 ) ).getOption ( { data: [ '1', '2', '3' ] } )
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 1, mode: 'view' }, () => {} ) ).toEqual ( '<span id="someId">view/b</span>' )
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 999, mode: 'view' }, () => {} ) ).toEqual ( '<span id="someId">view/</span>' )
    expect ( displaySelectedItem ( { data: [] }, { index: 999, mode: 'view' }, () => {} ) ).toEqual ( '<span id="someId">view/</span>' )
  } )
  it ( "should display the selected item with a header", () => {
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 1, mode: 'view', header: 'someTitle' }, () => {} ) ).toEqual ( '<div><h2>someTitle</h2><span id="someId">view/b</span></div>' )
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 999, mode: 'view', header: 'someTitle' }, () => {} ) ).toEqual ( '<div><h2>someTitle</h2><span id="someId">view/</span></div>' )
    expect ( displaySelectedItem ( { data: [] }, { index: 999, mode: 'view', header: 'someTitle' }, () => {} ) ).toEqual ( '<div><h2>someTitle</h2><span id="someId">view/</span></div>' )
  } )
  it ( "should display the selected item with a  n of m", () => {
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 1, mode: 'view', showNofM: true }, () => {} ) ).toEqual ( '<div><h2><span id="someId.nOfM"> 2 / 2</span></h2><span id="someId">view/b</span></div>' )
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 999, mode: 'view', showNofM: true }, () => {} ) ).toEqual ( '<div><h2><span id="someId.nOfM"> 1000 / 2</span></h2><span id="someId">view/</span></div>' )
    expect ( displaySelectedItem ( { data: [] }, { index: 999, mode: 'view', showNofM: true }, () => {} ) ).toEqual ( '<div><h2><span id="someId.nOfM"> 1000 / 0</span></h2><span id="someId">view/</span></div>' )
  } )
  it ( "should display the selected item with a header and n of m", () => {
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 1, mode: 'view', header: 'someTitle', showNofM: true }, () => {} ) ).toEqual ( '<div><h2>someTitle<span id="someId.nOfM"> 2 / 2</span></h2><span id="someId">view/b</span></div>' )
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 999, mode: 'view', header: 'someTitle', showNofM: true }, () => {} ) ).toEqual ( '<div><h2>someTitle<span id="someId.nOfM"> 1000 / 2</span></h2><span id="someId">view/</span></div>' )
    expect ( displaySelectedItem ( { data: [] }, { index: 999, mode: 'view', header: 'someTitle', showNofM: true }, () => {} ) ).toEqual ( '<div><h2>someTitle<span id="someId.nOfM"> 1000 / 0</span></h2><span id="someId">view/</span></div>' )
  } )
  it ( "should display the selected item  headerIfEmpty and data empty", () => {
    expect ( displaySelectedItem ( { data: [] }, { index: 1, mode: 'view', headerIfEmpty: 'emptyHeader' }, () => {} ) ).toEqual ( '<div><h2><span id="someId.emptyHeader">emptyHeader</span></h2><span id="someId">view/</span></div>' )
    expect ( displaySelectedItem ( { data: [] }, { index: 1, mode: 'view', header: 'theHeader', headerIfEmpty: 'emptyHeader' }, () => {} ) ).toEqual ( '<div><h2>theHeader<span id="someId.emptyHeader">emptyHeader</span></h2><span id="someId">view/</span></div>' )
    expect ( displaySelectedItem ( { data: [] }, { index: 1, mode: 'view', header: 'theHeader', headerIfEmpty: 'emptyHeader', showNofM: true }, () => {} ) ).toEqual ( '<div><h2>theHeader<span id="someId.emptyHeader">emptyHeader</span></h2><span id="someId">view/</span></div>' )
  } )
  it ( "should display the selected item  headerIfEmpty and data not empty", () => {
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 1, mode: 'view', headerIfEmpty: 'emptyHeader' }, () => {} ) ).toEqual ( '<div><h2></h2><span id="someId">view/b</span></div>' )
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 1, mode: 'view', header: 'theHeader', headerIfEmpty: 'emptyHeader' }, () => {} ) ).toEqual ( '<div><h2>theHeader</h2><span id="someId">view/b</span></div>' )
    expect ( displaySelectedItem ( { data: [ 'a', 'b' ] }, { index: 1, mode: 'view', header: 'theHeader', headerIfEmpty: 'emptyHeader', showNofM: true }, () => {} ) ).toEqual ( '<div><h2>theHeader<span id="someId.nOfM"> 2 / 2</span></h2><span id="someId">view/b</span></div>' )
  } )
} )