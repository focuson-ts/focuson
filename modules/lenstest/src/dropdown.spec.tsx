import { fireEvent, render, screen } from "@testing-library/react";
import { LabelAndDropdown } from "@focuson/form_components";
import { lensState } from "@focuson/state";
import { context } from "./context.fixture";
import { HasRestCommands } from "@focuson/rest";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";


interface LabelAndDropDownState extends HasRestCommands, HasPageSelection, HasSimpleMessages, HasTagHolder {
  data?: string | null
  otherData?: string
}
function dropDown ( label: string, s: LabelAndDropDownState, setMain: ( s: LabelAndDropDownState ) => void ) {
  return render ( <LabelAndDropdown label={label} enums={{ a: 'A', b: 'B' }} state={lensState ( s, setMain, 'desc', context () ).focusOn ( 'data' )} id='someId' allButtons={{}}/> )
}

const emptyS: LabelAndDropDownState = {
  tags: {},
  restCommands: [],
  messages: [],
  pageSelection: []
}
describe ( "Label and dropdown", () => {
  it ( "should display when the data is undefined", () => {
    expect ( dropDown ( 'someLabel', emptyS, () => {} ).container.innerHTML ).toEqual (
      '<div class="dropdown-container ">' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class="">' +
      '<select class="select  invalid" data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "should display when the data is null", () => {
    expect ( dropDown ( 'someLabel', { ...emptyS, data: null }, () => {} ).container.innerHTML ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select  invalid" data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "should display when the data is set", () => {
    expect ( dropDown ( 'someLabel', { ...emptyS, data: 'a' }, () => {} ).container.innerHTML ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "should display when the data is set to something that isn't in the enum", () => {
    expect ( dropDown ( 'someLabel', { ...emptyS, data: 'someData' }, () => {} ).container.innerHTML ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select  invalid" data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "select items", () => {
    var remembered: any = {}
      = dropDown ( 'someLabel', { ...emptyS, data: 'someData' }, s => remembered = s )
    const select = screen.getByRole ( 'combobox' );
    fireEvent.change ( select, { target: { value: 'a', name: 'A' } } );
    expect ( remembered ).toEqual ( { ...emptyS, "data": "a" } );

    fireEvent.change ( select, { target: { value: 'b', name: 'B' } } );
    expect ( remembered ).toEqual ( { ...emptyS, "data": "b" } );
  } )
  it ( "have a label that displays data using {} ", () => {
    expect ( dropDown ( 'label : {/data}', { ...emptyS, data: 'someData' }, () => {} ).container.innerHTML ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">label : someData</label><div class=""><select class="select  invalid" data-validationmessage="label : {/data}" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
} )
