import { enzymeSetup } from "./enzymeAdapterSetup";
import { WithTextLayout } from "@focuson/form_components";
import { mount } from "enzyme";
import { HasRestCommands } from "@focuson/rest";
import { HasPageSelection } from "@focuson/pages";
import { HasSimpleMessages } from "@focuson/utils";
import { HasTagHolder } from "@focuson/template";
import { lensState } from "@focuson/state";
import { context } from "./context.fixture";

enzymeSetup ()

interface WithTextLayoutState extends HasRestCommands, HasPageSelection, HasSimpleMessages, HasTagHolder {
  data?: string
  otherData?: string
}
const empty: WithTextLayoutState = {
  messages: [], pageSelection: [], restCommands: [], tags: {}
}

// text: string;
//   holderClassName?: string
//   textClassName?: string
//   childrenClassName?: string
function withText ( text: string, holderClassName?: string, textClassName?: string, childrenClassName?: string ) {
  const state = lensState ( empty, () => {}, '', context () )
  return mount ( <WithTextLayout text={text} state={state.focusOn ( 'data' )} textClassName={textClassName} holderClassName={holderClassName} childrenClassName={childrenClassName}>
    <p>Children</p>
  </WithTextLayout> ).html ()
}
describe ( "WithTextLayout", () => {
  it ( 'should render ', () => {
    expect ( withText ( 'someText', undefined, undefined, undefined ) ).toEqual ( '<div><div>someText</div><div><p>Children</p></div></div>' )
    expect ( withText ( 'someText', 'holder', 'text', 'children' ) ).toEqual (
      '<div class="holder"><div class="text">someText</div><div class="children"><p>Children</p></div></div>' )
  } )

  it ( "should render html", () => {
    expect ( withText ( 'someText <b>That is bold</b>', undefined, undefined, undefined ) ).toEqual (
      '<div><div>someText <b>That is bold</b></div><div><p>Children</p></div></div>' )

  } )
} )