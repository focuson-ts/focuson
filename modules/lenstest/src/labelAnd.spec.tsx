import { enzymeSetup } from "./enzymeAdapterSetup";
import { HasRestCommands } from "@focuson/rest";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";
import { lensState } from "@focuson/state";
import { context } from "./context.fixture";
import { FocusOnContext } from "@focuson/focuson";
import { mount } from "enzyme";
import { LabelAndNumberInput, LabelAndStringInput } from "@focuson/form_components";

enzymeSetup ()

interface LabelAndState extends HasRestCommands, HasPageSelection, HasSimpleMessages, HasTagHolder {
  string?: string
  number?: number
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

describe ( 'LabelAndString', () => {
  it ( 'should render with data', () => {
    expect ( labelAndString ( 'someLabel', 'someString' ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class=""><input class="input" type="text" id="someId" value="someString"></div></div>' )
  } )
  it ( 'should render with html label', () => {
    expect ( labelAndString ( 'some <b>bold</b> Label', 'someString' ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">some <b>bold</b> Label</label>' +
      '<div class=""><input class="input" type="text" id="someId" value="someString"></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const string: string = undefined;
    expect ( labelAndString ( 'someLabel', string ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class=""><input class="input" type="text" id="someId" value=""></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const string: string = null;
    expect ( labelAndString ( 'someLabel', string ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class=""><input class="input" type="text" id="someId" value=""></div></div>' )
  } )
} );
describe ( 'LabelAndNumber', () => {
  it ( 'should render with data', () => {
    expect ( labelAndNumber ( 'someLabel', 123 ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class=""><input class="input" type="number" id="someId" value="123"></div></div>' )
  } )
  it ( 'should render with html label', () => {
    expect ( labelAndNumber ( 'some <b>bold</b> Label', 123 ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">some <b>bold</b> Label</label>' +
      '<div class=""><input class="input" type="number" id="someId" value="123"></div></div>' )
  } )
  it ( 'should render with undefined', () => {
    // @ts-ignore
    const number: number = undefined;
    expect ( labelAndNumber ( 'someLabel', number ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class=""><input class="input" type="number" id="someId" value="0"></div></div>' )

  } )
  it ( 'should render with null', () => {
    // @ts-ignore
    const number: number = null;
    expect ( labelAndNumber ( 'someLabel', number ).html () ).toEqual (
      '<div class="labelValueButton "> ' +
      '<label for="someId" class="input-label">someLabel</label>' +
      '<div class=""><input class="input" type="number" id="someId" value="0"></div></div>' )
  } )
} );