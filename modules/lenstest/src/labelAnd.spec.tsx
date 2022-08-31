import { enzymeSetup } from "./enzymeAdapterSetup";
import { HasRestCommands } from "@focuson/rest";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";
import { lensState } from "@focuson/state";
import { context } from "./context.fixture";
import { FocusOnContext } from "@focuson/focuson";
import { mount } from "enzyme";
import { LabelAndBooleanInput, LabelAndNumberInput, LabelAndStringInput, LabelAndYNBooleanInput } from "@focuson/form_components";

enzymeSetup ()

interface LabelAndState extends HasRestCommands, HasPageSelection, HasSimpleMessages, HasTagHolder {
  string?: string
  number?: number
  boolean?: boolean
  yn?: string
}
const empty: LabelAndState = {
  messages: [], pageSelection: [], restCommands: [], tags: {}
}
function labelAndString ( label: string | undefined, string: string ) {
  const state = lensState ( { ...empty, string }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, string, FocusOnContext<LabelAndState>> = state.focusOn ( 'string' );
  return mount ( <LabelAndStringInput id='someId' state={focusedState} label={label} allButtons={{}}/> )
}
function labelAndNumber ( label: string | undefined, number: number ) {
  const state = lensState ( { ...empty, number }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, string, FocusOnContext<LabelAndState>> = state.focusOn ( 'number' );
  return mount ( <LabelAndNumberInput id='someId' state={focusedState} label={label} allButtons={{}}/> )
}
function labelAndBoolean ( label: string | undefined, boolean: boolean ) {
  const state = lensState ( { ...empty, boolean }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, boolean, FocusOnContext<LabelAndState>> = state.focusOn ( 'boolean' );
  return mount ( <LabelAndBooleanInput id='someId' state={focusedState} label={label} allButtons={{}}/> )
}
function labelAndYNBoolean ( label: string | undefined, yn: string ) {
  const state = lensState ( { ...empty, yn }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, boolean, FocusOnContext<LabelAndState>> = state.focusOn ( 'yn' );
  return mount ( <LabelAndYNBooleanInput id='someId' state={focusedState} label={label} allButtons={{}}/> )
}

describe ( 'LabelAndString', () => {
  it ( 'should render with data', () => {
    expect ( labelAndString ( 'someLabel', 'someString' ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="someLabel" value="someString"></div></div>' )
  } )
  it ( 'should render with html label', () => {
    expect ( labelAndString ( 'some <b>bold</b> Label', 'someString' ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">some <b>bold</b> Label</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="some <b>bold</b> Label" value="someString"></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const string: string = undefined;
    expect ( labelAndString ( 'someLabel', string ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="someLabel" value=""></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const string: string = null;
    expect ( labelAndString ( 'someLabel', string ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="someLabel" value=""></div></div>' )
  } )
} );
describe ( 'LabelAndNumber', () => {
  it ( 'should render with data', () => {
    expect ( labelAndNumber ( 'someLabel', 123 ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="someLabel" value="123"></div></div>' )
  } )
  it ( 'should render with html label', () => {
    expect ( labelAndNumber ( 'some <b>bold</b> Label', 123 ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">some <b>bold</b> Label</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="some <b>bold</b> Label" value="123"></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const number: number = undefined;
    expect ( labelAndNumber ( 'someLabel', number ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="someLabel" value=""></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const number: number = null;
    expect ( labelAndNumber ( 'someLabel', number ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="someLabel" value=""></div></div>' )
  } )
} );

describe ( 'LabelAndBoolean', () => {
  it ( 'should render with data - true', () => {
    expect ( labelAndBoolean ( 'someLabel', true ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel" checked=""><span class="checkmark"></span></div></div>' )
  } )
  it ( 'should render with data - false', () => {
    expect ( labelAndBoolean ( 'someLabel', false ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel"><span class="checkmark"></span></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const number: boolean = undefined;
    expect ( labelAndBoolean ( 'someLabel', number ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel"><span class="checkmark"></span></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const number: boolean = null;
    expect ( labelAndBoolean ( 'someLabel', number ).html () ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel"><span class="checkmark"></span></div></div>' )
  } )
} );