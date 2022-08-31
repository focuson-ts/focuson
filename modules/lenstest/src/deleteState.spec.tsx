import { lensState, LensState } from "@focuson/state";
import { shallow } from "enzyme";
import { ModalButtonStateForTest } from "./modalButton.integration.spec";
import { DeleteStateButton } from "@focuson/form_components";
import { enzymeSetup } from "./enzymeAdapterSetup";

enzymeSetup ()

interface DeleteStateForTest {
  a?: number;
  b?: number;
  c?: number;
}
type Context = {}

function displayAndGetButton<T> ( s: DeleteStateForTest, setMain: ( s: DeleteStateForTest ) => void, fn: ( s: LensState<DeleteStateForTest, DeleteStateForTest, Context> ) => JSX.Element ) {
  const comp = shallow ( fn ( lensState<DeleteStateForTest, Context> ( s, setMain, 'DeleteState', {} ) ) )
  return comp.find ( "button" )

}
describe ( "delete state button", () => {
  it ( "should render", () => {
    const comp = displayAndGetButton ( {}, s => {}, s => <DeleteStateButton id={'someId'} label='someLabel' states={[ s.focusOn ( "a" ), s.focusOn ( "b" ) ]}/> )
    expect ( comp.html () ).toEqual ( "<button id=\"someId\" aria-errormessage=\"someId.error\" aria-invalid=\"false\" class=\"button\">someLabel</button>" )
  } )

  it ( "shouldnot do anything when 0 deletes and clicked", () => {
    let remembered: any = undefined
    const comp = displayAndGetButton ( { a: 1, b: 2, c: 3 }, s => remembered = s, s => <DeleteStateButton id={'someId'} label='someLabel' states={[]}/> )
    comp.simulate ( 'click' )
    expect ( remembered ).toEqual ( undefined )
  } )
  it ( "should delete the state when clicked - 1 deletes", () => {
    let remembered: any = {}
    const comp = displayAndGetButton ( { a: 1, b: 2, c: 3 }, s => remembered = s, s => <DeleteStateButton id={'someId'} label='someLabel' states={[ s.focusOn ( "a" ) ]}/> )
    comp.simulate ( 'click' )
    expect ( remembered ).toEqual ( { b: 2, c: 3 } )
  } )
  it ( "should delete the state when clicked - 2 deletes", () => {
    let remembered: any = {}
    const comp = displayAndGetButton ( { a: 1, b: 2, c: 3 }, s => remembered = s, s => <DeleteStateButton id={'someId'} label='someLabel' states={[ s.focusOn ( "a" ), s.focusOn ( "b" ) ]}/> )
    comp.simulate ( 'click' )
    expect ( remembered ).toEqual ( { c: 3 } )
  } )
} )