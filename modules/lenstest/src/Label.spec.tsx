import { shallow } from "enzyme";

import { Label } from "@focuson/form_components";
import { Lenses } from "@focuson/lens";
import { lensState } from "@focuson/state";
import { defaultPageSelectionAndRestCommandsContext, FocusOnContext } from "@focuson/focuson";
import { MultiPageDetails, PageSelection } from "@focuson/pages";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { testDateFn } from "@focuson/utils";


enzymeSetup ()

let pageSelection: PageSelection = { pageName: 'a', pageMode: 'view' , time: 'now' };
const x = { g: 1, h: [ 'h0', 'h1' ], i: { j: 2 } }

const textForLabelState = {
  messages: [],
  pageSelection: [ pageSelection ],
  restCommands: [],
  tags:{},
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
  defaultPageSelectionAndRestCommandsContext<TextForLabelState> ( pageDetails, {},{},{},testDateFn, true ) )

// const fromPath: ( path: string[], description?: string ) => Optional<TextForLabelState, any> = fromPathFor ( state )
// let stateabx = state.copyWithLens ( abxL );
// const fromL = ( path: string ) => fromPathGivenState ( stateabx ) ( path )
// const from = ( path: string ) => fromL ( path ).getOption ( state.main )
// const set = ( path: string, value: any ) => fromL ( path ).set ( state.main, value )


describe ( "Label", () => {
  it ( "should display plain text", () => {
    const nav = shallow ( <Label state={state} label='Hello World'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello World</label>' )
  } )

  it ( "should display the text at the end of a path", () => {
    const nav = shallow ( <Label state={state} label='Hello {~/e} World'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello 5 World</label>' )
  } )
  it ( "should display the text at the end of a path with [$last]", () => {
    const nav = shallow ( <Label state={state} label='Hello {~/d[$last]} World'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello five World</label>' )
  } )
  it ( "should display the text at the end of a path with [~/e]", () => {
    const nav = shallow ( <Label state={state} label='Hello {~/d[~/e]} World'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello five World</label>' )
  } )
  it ( "should display the text using lookup from boolean {boolean|if false|if true} - false", () => {
    const nav = shallow ( <Label state={state} label='Hello {~/false|falseHappened|trueHappened} World'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello falseHappened World</label>' )
  } )
  it ( "should display the text using lookup from boolean {boolean|if false|if true} - true", () => {
    const nav = shallow ( <Label state={state} label='Hello {~/true|falseHappened|trueHappened} World'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello trueHappened World</label>' )
  } )

  it ( "should display the text using lookup from number {number|if 0| if 1| if 2} - false", () => {
    const nav = shallow ( <Label state={state} label='Hello {~/e|zero|one|two|three|four|five} World'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello five World</label>' )
  } )
  it ( "should display the text using html", () => {
    const nav = shallow ( <Label state={state} label='Hello <b>world</b>'/> )
    expect ( nav.html () ).toEqual ( '<label class="input-label">Hello <b>world</b></label>' )
  } )

} )