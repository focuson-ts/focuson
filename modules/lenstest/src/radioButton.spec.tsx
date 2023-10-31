import { LabelAndRadio } from "@focuson/form_components";
import { LensState, lensState } from "@focuson/state";
import { FocusOnContext } from "@focuson/focuson";
import { render, screen, fireEvent} from "@testing-library/react";

interface RadioButtonStateForText {
  a?: string
}
type EnumForTest = typeof enumForTest
const enumForTest = {
  a: "A",
  b: "B"
}
function renderComponent ( state: RadioButtonStateForText, setMain: ( m: RadioButtonStateForText ) => void ) {
  // @ts-ignore - because we aren't using any of the focus on context stuff
  let lensState1: LensState<RadioButtonStateForText, RadioButtonStateForText, FocusOnContext<RadioButtonStateForText>> = lensState ( state, setMain, '', {} );
  return render ( <LabelAndRadio label='someLabel' allButtons={{}} enums={enumForTest} state={lensState1.focusOn ( 'a' )} id='someId'/> )
}
describe ( "LabelAndRadio", () => {
  it ( "should render", () => {
    let component = renderComponent ( { a: undefined }, () => {} ).container.innerHTML.replace ( /"/g, "'" );
    expect ( component ).toEqual (
      "<div class='labelRadioButton'><label class='input-label'>someLabel</label>" +
      "<div class='radio-group-container ' id='someId'><div class='radio-container   '>" +
      "<input id='someIdA' type='radio' name='someId' value=''><span class='checkmark'></span>" +
      "<label for='someIdA' class='input-label'>A</label></div><div class='radio-container   '>" +
      "<input id='someIdB' type='radio' name='someId' value=''>" +
      "<span class='checkmark'></span><label for='someIdB' class='input-label'>B</label></div></div></div>" )
  } )
  it ( "should render for value a", () => {
    let html = renderComponent ( { a: 'a' }, () => {} ).container.innerHTML.replace ( /"/g, "'" );
    expect ( html ).toContain (
      "<div class='radio-container  checked '><input id='someIdA' type='radio' name='someId' value='a' checked=''>" )
    expect ( html ).not.toContain (
      "<div class='radio-container  checked '><input id='someIdB'" )
  } )
  it ( "should render for invalid value", () => {
    let html = renderComponent ( { a: 'A' }, () => {} ).container.innerHTML.replace ( /"/g, "'" );
    expect ( html ).toContain (
      "<div class='radio-container   '><input id='someIdA' type='radio' name='someId' value='A'>" )
    expect ( html ).toContain (
      "<div class='radio-container   '><input id='someIdB' type='radio' name='someId' value='A'>" )
    expect ( html ).not.toContain ( "checked" )
  } )
  it("should click and change value", () => {
    let remembered: any = undefined;

    renderComponent({ a: 'A' }, x => remembered = x);

    const radios = screen.getAllByRole('radio'); // Fetch all radio inputs using screen
    expect(radios).toHaveLength(2);

    fireEvent.click(radios[0]);
    expect(remembered).toEqual({ "a": "a" });

    fireEvent.click(radios[1]);
    expect(remembered).toEqual({ "a": "b" });
  });


} )