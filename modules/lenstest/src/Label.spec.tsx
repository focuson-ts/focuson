import { Label } from "@focuson/form_components";
import { Lenses } from "@focuson/lens";
import { lensState } from "@focuson/state";
import { defaultPageSelectionAndRestCommandsContext, FocusOnContext } from "@focuson/focuson";
import { MultiPageDetails, PageSelection } from "@focuson/pages";
import '@testing-library/jest-dom/extend-expect';
import { testDateFn } from "@focuson/utils";
import { render } from "@testing-library/react";

let pageSelection: PageSelection = { pageName: 'a', pageMode: 'view', time: 'now' };
const x = { g: 1, h: [ 'h0', 'h1' ], i: { j: 2 } }

const textForLabelState = {
  messages: [],
  pageSelection: [ pageSelection ],
  restCommands: [],
  tags: {},
  a: {
    'false': false,
    'true': true,
    b: { c: 'cValue', x },
    d: [ 'zero', 'one', 'two', 'three', 'four', 'five' ],
    selecteda: 3,
    e: 5,
    f: 6,
    holdse: 'e',
    holdsf: 'e',

  },
  selected: 2,
  holdseinroot: 'e'
}
type TextForLabelState = typeof textForLabelState

const identity = Lenses.identity<TextForLabelState> ()
const aL = identity.focusQuery ( 'a' )
const abL = identity.focusOn ( 'a' ).focusQuery ( 'b' )
const abxL = identity.focusOn ( 'a' ).focusQuery ( 'b' ).focusQuery ( 'x' )
const pageDetails: MultiPageDetails<TextForLabelState, FocusOnContext<TextForLabelState>> = {
  a: { config: {}, pageType: 'MainPage', pageFunction: () => <span/>, lens: aL, pageMode: 'edit' }
}
const state = lensState ( textForLabelState, s => {}, '',
  defaultPageSelectionAndRestCommandsContext<TextForLabelState> ( pageDetails, {}, {}, {}, testDateFn, true ) )

describe ( "Label", () => {
  it ( "should display plain text", () => {
    const { container } = render ( <Label state={state} label='Hello World'/> );
    // eslint-disable-next-line testing-library/no-container,testing-library/no-node-access
    expect ( container.querySelector ( ".input-label" ) ).toHaveTextContent ( "Hello World" );
  } );

  it ( "should display the text at the end of a path", () => {
    const { container } = render ( <Label state={state} label='Hello {~/e} World'/> )
    expect ( container.innerHTML ).toEqual ( '<label class="input-label">Hello 5 World</label>' )
  } )
  it ( "should display the text at the end of a path with [$last]", () => {
    const { container } = render ( <Label state={state} label='Hello {~/d[$last]} World'/> )
    expect ( container.innerHTML ).toEqual ( '<label class="input-label">Hello five World</label>' )
  } )
  it ( "should display the text at the end of a path with [~/e]", () => {
    const { container } = render ( <Label state={state} label='Hello {~/d[~/e]} World'/> )
    expect ( container.innerHTML ).toEqual ( '<label class="input-label">Hello five World</label>' )
  } )
  it ( "should display the text using lookup from boolean {boolean|if false|if true} - false", () => {
    const { container } = render ( <Label state={state} label='Hello {~/false|falseHappened|trueHappened} World'/> )
    expect ( container.innerHTML ).toEqual ( '<label class="input-label">Hello falseHappened World</label>' )
  } )
  it ( "should display the text using lookup from boolean {boolean|if false|if true} - true", () => {
    const { container } = render ( <Label state={state} label='Hello {~/true|falseHappened|trueHappened} World'/> )
    expect ( container.innerHTML ).toEqual ( '<label class="input-label">Hello trueHappened World</label>' )
  } )

  it ( "should display the text using lookup from number {number|if 0| if 1| if 2} - false", () => {
    const { container } = render ( <Label state={state} label='Hello {~/e|zero|one|two|three|four|five} World'/> )
    expect ( container.innerHTML ).toEqual ( '<label class="input-label">Hello five World</label>' )
  } )
  it ( "should display the text using html", () => {
    const { container } = render ( <Label state={state} label='Hello <b>world</b>'/> )
    expect ( container.innerHTML ).toEqual ( '<label class="input-label">Hello <b>world</b></label>' )
  } )

} )