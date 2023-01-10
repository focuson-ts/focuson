import { enzymeSetup } from "./enzymeAdapterSetup";
import { DisplayStringWithLookup } from "@focuson-nw/form_components";
import { mount } from "enzyme";
import { HasRestCommands } from "@focuson-nw/rest";
import { HasPageSelection } from "@focuson-nw/pages";
import { HasSimpleMessages } from "@focuson-nw/utils";
import { HasTagHolder } from "@focuson-nw/template";
import { lensState } from "@focuson-nw/state";
import { context } from "./context.fixture";
import { FocusOnContext } from "@focuson-nw/focuson";

enzymeSetup ()

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
  return mount ( <DisplayStringWithLookup lookup={lookup} state={focusedState} className={className} ifUndefined={ifUndefined} id='someId'/> ).html ()
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