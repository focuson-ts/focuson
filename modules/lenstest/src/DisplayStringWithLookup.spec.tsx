
import { DisplayStringWithLookup } from "@focuson/form_components";
import { HasRestCommands } from "@focuson/rest";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";
import { lensState } from "@focuson/state";
import { context } from "./context.fixture";
import { FocusOnContext } from "@focuson/focuson";
import { render } from "@testing-library/react";

interface DisplayStringWithLookupState extends HasRestCommands, HasPageSelection, HasSimpleMessages, HasTagHolder {
  data?: string
  otherData?: string
}
const empty: DisplayStringWithLookupState = {
  messages: [], pageSelection: [], restCommands: [], tags: {}
}
const lookup = {
  a: 'A',
  b: '<b>Some bold</b>',
}

function displayString ( data: string | undefined, ifUndefined?: string, className?: string ) {
  const state = lensState ( { ...empty, data }, () => {}, '', context () )
  // @ts-ignore
  const focusedState: LensState<DisplayStringWithLookupState, string, FocusOnContext<DisplayStringWithLookupState>> = state.focusOn ( 'data' );
  return render ( <DisplayStringWithLookup lookup={lookup} state={focusedState} className={className} ifUndefined={ifUndefined} id='someId'/> ).container.innerHTML
}
describe ( "DisplayStringWithLookup", () => {
  it ( 'should render with undefined', () => {
    expect ( displayString ( undefined ) ).toEqual ( '<div id="someId"></div>' )
    expect ( displayString ( undefined, 'xxx' ) ).toEqual ( '<div id="someId">xxx</div>' )
    expect ( displayString ( undefined, 'xxx', 'clazz' ) ).toEqual ( '<div id="someId" class="clazz">xxx</div>' )
  } )
  it ( 'should render when value not in lookup', () => {
    expect ( displayString ( 'x' ) ).toEqual ( '<div id="someId"></div>' )
    expect ( displayString ( 'x', 'xxx' ) ).toEqual ( '<div id="someId">xxx</div>' )
    expect ( displayString ( 'x', 'xxx', 'clazz' ) ).toEqual ( '<div id="someId" class="clazz">xxx</div>' )
  } )
  it ( 'should render when valid value', () => {
    expect ( displayString ( 'a' ) ).toEqual ( '<div id="someId">A</div>' )
    expect ( displayString ( 'a', 'xxx' ) ).toEqual ( '<div id="someId">A</div>' )
    expect ( displayString ( 'a', 'xxx', 'clazz' ) ).toEqual ( '<div id="someId" class="clazz">A</div>' )
  } )
  it ( 'should render Html', () => {
    expect ( displayString ( 'b' ) ).toEqual ( '<div id="someId"><b>Some bold</b></div>' )
  } )
} )