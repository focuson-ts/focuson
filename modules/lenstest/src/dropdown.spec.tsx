import { enzymeSetup } from "./enzymeAdapterSetup";
import { mount } from "enzyme";
import { LabelAndDropdown } from "@focuson-nw/form_components";
import { lensState } from "@focuson-nw/state";
import { context } from "./context.fixture";
import { HasRestCommands } from "@focuson-nw/rest";
import { HasPageSelection } from "@focuson-nw/pages";
import { HasSimpleMessages } from "@focuson-nw/utils";
import { HasTagHolder } from "@focuson-nw/template";

enzymeSetup ()

interface LabelAndDropDownState extends HasRestCommands, HasPageSelection, HasSimpleMessages, HasTagHolder {
  data?: string | null
  otherData?: string
}
function dropDown ( label: string, s: LabelAndDropDownState, setMain: ( s: LabelAndDropDownState ) => void ) {
  return mount ( <LabelAndDropdown label={label} enums={{ a: 'A', b: 'B' }} state={lensState ( s, setMain, 'desc', context () ).focusOn ( 'data' )} id='someId' allButtons={{}}/> )
}

const emptyS: LabelAndDropDownState = {
  tags: {},
  restCommands: [],
  messages: [],
  pageSelection: []
}
describe ( "Label and dropdown", () => {
  it ( "should display when the data is undefined", () => {
    expect ( dropDown ( 'someLabel', emptyS, () => {} ).html () ).toEqual (
      '<div class="dropdown-container ">' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class="">' +
      '<select class="select  invalid" data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "should display when the data is null", () => {
    expect ( dropDown ( 'someLabel', { ...emptyS, data: null }, () => {} ).html () ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select  invalid" data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "should display when the data is set", () => {
    expect ( dropDown ( 'someLabel', { ...emptyS, data: 'a' }, () => {} ).html () ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select " data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "should display when the data is set to something that isn't in the enum", () => {
    expect ( dropDown ( 'someLabel', { ...emptyS, data: 'someData' }, () => {} ).html () ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">someLabel</label><div class=""><select class="select  invalid" data-validationmessage="someLabel" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
  it ( "select items", () => {
    var remembered: any = {}
    const dd = dropDown ( 'someLabel', { ...emptyS, data: 'someData' }, s => remembered = s )
    dd.find ( 'select' ).at ( 0 ).simulate ( 'change', { target: { value: 'a', name: 'A' } } );
    expect ( remembered ).toEqual ( { ...emptyS, "data": "a" } )
    dd.find ( 'select' ).at ( 0 ).simulate ( 'change', { target: { value: 'b', name: 'B' } } );
    expect ( remembered ).toEqual ( { ...emptyS, "data": "b" } )
  } )
  it ( "have a label that displays data using {} ", () => {
    expect ( dropDown ( 'label : {/data}', { ...emptyS, data: 'someData' }, () => {} ).html () ).toEqual (
      '<div class="dropdown-container "><label for="someId" class="input-label">label : someData</label><div class=""><select class="select  invalid" data-validationmessage="label : {/data}" id="someId"><option value="a">A</option><option value="b">B</option></select></div></div>' )
  } )
} )
