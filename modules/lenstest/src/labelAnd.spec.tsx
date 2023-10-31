
import { HasRestCommands } from "@focuson/rest";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";
import { lensState } from "@focuson/state";
import { context } from "./context.fixture";
import { FocusOnContext } from "@focuson/focuson";
import { LabelAndBooleanInput, LabelAndNumberInput, LabelAndStringInput, LabelAndYNBooleanInput } from "@focuson/form_components";
import { render } from "@testing-library/react";


interface LabelAndState extends HasRestCommands, HasPageSelection, HasSimpleMessages, HasTagHolder {
  string?: string
  number?: number
  boolean?: boolean
  yn?: string
}
const empty: LabelAndState = {
  messages: [], pageSelection: [], restCommands: [], tags: {}
}
function labelAndString ( label: string | undefined, string: string, className?: string ) {
  const state = lensState ( { ...empty, string }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, string, FocusOnContext<LabelAndState>> = state.focusOn ( 'string' );
  return render ( <LabelAndStringInput id='someId' state={focusedState} label={label} allButtons={{}} className={className}/> ).container.innerHTML
}
function labelAndNumber ( label: string | undefined, number: number, className?: string ) {
  const state = lensState ( { ...empty, number }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, string, FocusOnContext<LabelAndState>> = state.focusOn ( 'number' );
  return render ( <LabelAndNumberInput id='someId' state={focusedState} label={label} allButtons={{}} className={className}/> ).container.innerHTML
}
function labelAndBoolean ( label: string | undefined, boolean: boolean, className?: string ) {
  const state = lensState ( { ...empty, boolean }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, boolean, FocusOnContext<LabelAndState>> = state.focusOn ( 'boolean' );
  return render ( <LabelAndBooleanInput id='someId' state={focusedState} label={label} allButtons={{}} className={className}/> ).container.innerHTML
}
function labelAndYNBoolean ( label: string | undefined, yn: string, className?: string ) {
  const state = lensState ( { ...empty, yn }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<LabelAndState, boolean, FocusOnContext<LabelAndState>> = state.focusOn ( 'yn' );
  return render ( <LabelAndYNBooleanInput id='someId' state={focusedState} label={label} allButtons={{}} className={className}/> ).container.innerHTML
}

describe ( 'LabelAndString', () => {
  it ( 'should render with data', () => {
    expect ( labelAndString ( 'someLabel', 'someString' ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="someLabel" value="someString"></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should render with html label', () => {
    expect ( labelAndString ( 'some <b>bold</b> Label', 'someString' ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">some <b>bold</b> Label</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="some <b>bold</b> Label" value="someString"></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const string: string = undefined;
    expect ( labelAndString ( 'someLabel', string ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="someLabel" value=""></div><div id="someId.error" hidden="" class=""></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const string: string = null;
    expect ( labelAndString ( 'someLabel', string ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="text" id="someId" data-validationmessage="someLabel" value=""></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should include a className if specified', () => {
    // @ts-ignore
    const number: string = 'someString';
    expect ( labelAndString ( 'someLabel', number, 'theClass' ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="theClass"><input class="input" type="text" id="someId" data-validationmessage="someLabel" value="someString"></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )

} );
describe ( 'LabelAndNumber', () => {
  it ( 'should render with data', () => {
    expect ( labelAndNumber ( 'someLabel', 123 ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="someLabel" value="123"></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should render with html label', () => {
    expect ( labelAndNumber ( 'some <b>bold</b> Label', 123 ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">some <b>bold</b> Label</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="some <b>bold</b> Label" value="123"></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const number: number = undefined;
    expect ( labelAndNumber ( 'someLabel', number ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="someLabel" value=""></div><div id="someId.error" hidden="" class=""></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const number: number = null;
    expect ( labelAndNumber ( 'someLabel', number ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class=""><input class="input" type="number" id="someId" data-validationmessage="someLabel" value=""></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should include a className if specified', () => {
    // @ts-ignore
    const number: number = 123;
    expect ( labelAndNumber ( 'someLabel', number, 'theClass' ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="theClass"><input class="input" type="number" id="someId" data-validationmessage="someLabel" value="123"></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
} );

describe ( 'LabelAndBoolean', () => {
  it ( 'should render with data - true', () => {
    expect ( labelAndBoolean ( 'someLabel', true ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel" class="input" checked=""><span class="checkmark"></span></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should render with data - false', () => {
    expect ( labelAndBoolean ( 'someLabel', false ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel" class="input"><span class="checkmark"></span></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const number: boolean = undefined;
    expect ( labelAndBoolean ( 'someLabel', number ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel" class="input"><span class="checkmark"></span></div><div id="someId.error" hidden="" class=""></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const number: boolean = null;
    expect ( labelAndBoolean ( 'someLabel', number ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container"><input type="checkbox" id="someId" data-validationmessage="someLabel" class="input"><span class="checkmark"></span></div><div id="someId.error" hidden="" class=""></div></div>' )
  } )
  it ( 'should include a className if specified', () => {
    // @ts-ignore
    const number: boolean = true;
    expect ( labelAndBoolean ( 'someLabel', number, 'theClass' ) ).toEqual (
      '<div class="labelValueButton "> <label for="someId" class="input-label">someLabel</label><div class="checkbox-container theClass"><input type="checkbox" id="someId" data-validationmessage="someLabel" class="input" checked=""><span class="checkmark"></span></div><div id="someId.error" hidden="" class=""></div></div>' )

  } )

} );