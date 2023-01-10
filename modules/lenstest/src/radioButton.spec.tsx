import { enzymeSetup } from "./enzymeAdapterSetup";
import { mount } from "enzyme";
import { LabelAndRadio } from "@focuson-nw/form_components";
import { LensState, lensState } from "@focuson-nw/state";
import { FocusOnContext } from "@focuson-nw/focuson";
import exp from "constants";

enzymeSetup ()

interface RadioButtonStateForText {
  a?: string
}
type EnumForTest = typeof enumForTest
const enumForTest = {
  a: "A",
  b: "B"
}
function makeComponent ( state: RadioButtonStateForText, setMain: ( m: RadioButtonStateForText ) => void ) {
  // @ts-ignore - because we aren't using any of the focus on context stuff
  let lensState1: LensState<RadioButtonStateForText, RadioButtonStateForText, FocusOnContext<RadioButtonStateForText>> = lensState ( state, setMain, '', {} );
  return mount ( <LabelAndRadio label='someLabel' allButtons={{}} enums={enumForTest} state={lensState1.focusOn ( 'a' )} id='someId'/> )
}
describe ( "LabelAndRadio", () => {
  it ( "should render", () => {
    expect ( makeComponent ( { a: undefined }, () => {} ).html ().replace ( /"/g, "'" ) ).toEqual (
      "<div class='labelRadioButton'><label class='input-label'>someLabel</label>" +
      "<div class='radio-group-container ' id='someId'><div class='radio-container   '>" +
      "<input id='someIdA' type='radio' name='someId' value=''><span class='checkmark'></span>" +
      "<label for='someIdA' class='input-label'>A</label></div><div class='radio-container   '>" +
      "<input id='someIdB' type='radio' name='someId' value=''>" +
      "<span class='checkmark'></span><label for='someIdB' class='input-label'>B</label></div></div></div>" )
  } )
  it ( "should render for value a", () => {
    let html = makeComponent ( { a: 'a' }, () => {} ).html ().replace ( /"/g, "'" );
    expect ( html ).toContain (
      "<div class='radio-container  checked '><input id='someIdA' type='radio' name='someId' value='a' checked=''>" )
    expect ( html ).not.toContain (
      "<div class='radio-container  checked '><input id='someIdB'" )
  } )
  it ( "should render for invalid value", () => {
    let html = makeComponent ( { a: 'A' }, () => {} ).html ().replace ( /"/g, "'" );
    expect ( html ).toContain (
      "<div class='radio-container   '><input id='someIdA' type='radio' name='someId' value='A'>" )
    expect ( html ).toContain (
      "<div class='radio-container   '><input id='someIdB' type='radio' name='someId' value='A'>" )
    expect ( html ).not.toContain ( "checked" )
  } )
  it ( "should click and change value", () => {
    var remembered: any = undefined
    const component = makeComponent ( { a: 'A' }, x => remembered = x );
    const radios = component.find ( '.radio-container' )
    expect ( radios ).toHaveLength ( 2 )
    radios.at ( 0 ).simulate ( 'click' )
    expect ( remembered ).toEqual ( { "a": "a" } )
    radios.at ( 1 ).simulate ( 'click' )
    expect ( remembered ).toEqual ( { "a": "b" } )
  } )
} )