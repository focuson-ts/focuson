import { Lenses } from "@focuson/lens";
import { defaultPageSelectionAndRestCommandsContext, FocusOnContext } from "@focuson/focuson";

import { lensState } from "@focuson/state";
import { applyPageOps, fromPathFromRaw, fromPathGivenState, MultiPageDetails, PageSelection, pageSelectionlens } from "@focuson/pages";


let pageSelection: PageSelection = { pageName: 'a', pageMode: 'view', time: 'now' };
const x = { g: 1, h: [ 'h0', 'h1' ], i: { j: 2 } }

const textForLabelState = {
  messages: [],
  tags: {},
  pageSelection: [ pageSelection ],
  restCommands: [],
  a: {
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
  defaultPageSelectionAndRestCommandsContext<TextForLabelState> ( pageDetails, {}, {}, {} ) )

// const fromPath: ( path: string[], description?: string ) => Optional<TextForLabelState, any> = fromPathFor ( state )
let stateabx = state.copyWithLens ( abxL );
const fromL = ( path: string ) => fromPathGivenState ( stateabx ) ( path )
const from = ( path: string ) => fromL ( path ).getOption ( state.main )
const set = ( path: string, value: any ) => fromL ( path ).set ( state.main, value )

const ps1: PageSelection = { pageName: 'one', pageMode: 'view', time: 'time1' }
const ps2: PageSelection = { pageName: 'two', pageMode: 'view', time: 'time2' }
const ps3: PageSelection = { pageName: 'three', pageMode: 'view', time: 'time3' }
const psNew: PageSelection = { pageName: 'new', pageMode: 'view', time: 'timeNew' }
describe ( "applyPageOps", () => {
  describe ( "should select - replace whatever is there with this page", () => {
    it ( "should select with no current pages", () => {
      expect ( applyPageOps ( 'select', psNew ) ( [] ) ).toEqual ( [ psNew ] )
    } )
    it ( "should select with one or more pages", () => {
      expect ( applyPageOps ( 'select', psNew ) ( [ ps1 ] ) ).toEqual ( [ psNew ] )
      expect ( applyPageOps ( 'select', psNew ) ( [ ps1, ps2, ps3 ] ) ).toEqual ( [ psNew ] )

    } )
  } )
  describe ( "should popup - add this page", () => {
    it ( "should popup with no current pages", () => {
      expect ( applyPageOps ( 'popup', psNew ) ( [] ) ).toEqual ( [ psNew ] )
    } )
    it ( "should popup with no one pages", () => {
      expect ( applyPageOps ( 'popup', psNew ) ( [ ps1 ] ) ).toEqual ( [ ps1, psNew ] )
      expect ( applyPageOps ( 'popup', psNew ) ( [ ps1, ps2 ] ) ).toEqual ( [ ps1, ps2, psNew ] )
      expect ( applyPageOps ( 'popup', psNew ) ( [ ps1, ps2, ps3 ] ) ).toEqual ( [ ps1, ps2, ps3, psNew ] )

    } )
  } )
  describe ( "should replace - replace the top page", () => {
    it ( "should replace with no current pages", () => {
      expect ( applyPageOps ( 'replace', psNew ) ( [] ) ).toEqual ( [ psNew ] )
    } )
    it ( "should replace the top page", () => {
      expect ( applyPageOps ( 'replace', psNew ) ( [ ps1 ] ) ).toEqual ( [ psNew ] )
      expect ( applyPageOps ( 'replace', psNew ) ( [ ps1, ps2 ] ) ).toEqual ( [ ps1, psNew ] )
      expect ( applyPageOps ( 'replace', psNew ) ( [ ps1, ps2, ps3 ] ) ).toEqual ( [ ps1, ps2, psNew ] )

    } )

  } )
} )

describe ( "fromPathStringFor. Page is 'a'. The current lens is a/b/x", () => {
  it ( "should default to a path from 'here'. i.e. a/b/x'", () => {
    expect ( from ( "g" ) ).toEqual ( 1 )
    expect ( set ( "g", 1 ).a.b.x ).toEqual ( { "g": 1, "h": [ "h0", "h1" ], "i": { "j": 2 } } )

    expect ( from ( "i/j" ) ).toEqual ( 2 )
    expect ( set ( "i/j", 5 ).a.b.x.i ).toEqual ( { "j": 5 } )
  } )

  it ( "should allow / as a 'root' marker", () => {
    expect ( from ( "/a/e" ) ).toEqual ( 5 )
    expect ( from ( "/a/b/c" ) ).toEqual ( 'cValue' )
    expect ( set ( "/a/b/c", 'xx' ).a.b ).toEqual ( { "c": "xx", x } )
  } )
  it ( "should allow ~  as a 'home' marker i.e. current main page", () => {
    expect ( from ( "~/e" ) ).toEqual ( 5 )
    expect ( from ( "~/b/c" ) ).toEqual ( 'cValue' )
    expect ( set ( "~/b/c", 'x' ).a ).toEqual ( {
      "b": { "c": "x", "x": { "g": 1, "h": [ "h0", "h1" ], "i": { "j": 2 } } },
      "d": [ "zero", "one", "two", "three", "four", "five" ],
      "e": 5, "f": 6, "holdse": "e", "holdsf": "e", "selecteda": 3
    } )
  } )
  it ( "should allow [ .. ] notation with numbers - default", () => {
    expect ( from ( "h[0]" ) ).toEqual ( 'h0' )
    expect ( set ( "h[0]", 'xx' ).a.b.x.h ).toEqual ( [ "xx", "h1" ] )
    expect ( from ( "h[0][0]" ) ).toEqual ( 'h' )
    expect ( from ( "h[0][1]" ) ).toEqual ( '0' )
  } )
  it ( "should allow [ .. ] notation with numbers - root", () => {
    expect ( from ( "/a/b/c[0]" ) ).toEqual ( 'c' )
    expect ( from ( "/a/b/c[1]" ) ).toEqual ( 'V' )
    expect ( from ( "/a/b/c[2]" ) ).toEqual ( 'a' )
    expect ( from ( "/a/d[2]" ) ).toEqual ( 'two' )
  } )
  it ( "should allow [ .. ] notation with numbers - page", () => {
    expect ( from ( "~/b/c[0]" ) ).toEqual ( 'c' )
    expect ( from ( "~/b/c[1]" ) ).toEqual ( 'V' )
    expect ( from ( "~/b/c[2]" ) ).toEqual ( 'a' )
    expect ( from ( "~/d[2]" ) ).toEqual ( 'two' )
  } )
  it ( "should allow { ... } notation with special marker {last}", () => {
    expect ( from ( "/a/d[$last]" ) ).toEqual ( 'five' )
    expect ( fromL ( "/a/d[$last]" ).set ( textForLabelState, 'x' ).a.d ).toEqual ( [ "zero", "one", "two", "three", "four", "x" ] )
  } )
  it ( "should allow [ ... ] notation with special marker {append}", () => {
    expect ( from ( "/a/d[$append]" ) ).toEqual ( undefined )
    expect ( fromL ( "/a/d[$append]" ).set ( textForLabelState, 'x' ).a.d ).toEqual ( [ "zero", "one", "two", "three", "four", "five", "x" ] )
  } )

  it ( "should allow a path in the [ .. ] notation - default", () => {
    expect ( fromL ( "/a/d[selected]" ).description ).toEqual ( 'I.focus?(a).focus?(d).chainCalc(I.focusOn(a).focus?(b).focus?(x).focus?(selected))' )
    expect ( fromL ( "/a/d[/selected]" ).description ).toEqual ( 'I.focus?(a).focus?(d).chainCalc(I.focus?(selected))' )
  } )
  it ( "should allow a path in the [ .. ] notation - root", () => {
    expect ( from ( "/a/d[/selected][/selected]" ) ).toEqual ( 'o' )
    expect ( from ( "/a/d[/selected]" ) ).toEqual ( 'two' )
    expect ( from ( "/a/d[/a/selecteda]" ) ).toEqual ( 'three' )
    expect ( from ( "/a/d[/selected][1]" ) ).toEqual ( 'w' )
  } )
  it ( "should allow a path in the [ .. ] notation - home", () => {
    expect ( from ( "/a/d[~/e]" ) ).toEqual ( 'five' )
    expect ( from ( "/a/d[~/selecteda]" ) ).toEqual ( 'three' )

  } )
} )

//Note that the raw behaviour is tested about. Here we just check we make suitable lens
describe ( "fromPathFromRaw", () => {
  it ( "should make lens", () => {
    const fromPath = fromPathFromRaw ( pageSelectionlens<TextForLabelState> (), pageDetails ) ( textForLabelState )
    expect ( fromPath ( "~/b/c" ).description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c)' )
    expect ( fromPath ( "/a/b/c" ).description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c)' )
    expect ( () => fromPath ( "b/c" ).description ).toThrow ( "Error parsing 'b/c'. Cannot find initial  ''" )
  } )

} )
// describe ( "fromPathFor", () => {
//   it ( "should return a lens to a path", () => {
//     expect ( fromPath ( [ 'a' ] ).description ).toEqual ( 'I.focus?(a)' )
//     expect ( fromPath ( [ '{basePage}', 'b' ] ).description ).toEqual ( 'I.focus?(a).focus?(b)' )
//   } )
//   it ( "should return a lens to a path with [numbers]", () => {
//     expect ( fromPath ( [ '{basePage}', 'b', 'c', 'd', '[0]' ] ).description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c).focus?(d).chain([0])' )
//     expect ( fromPath ( [ '{basePage}', 'd', '[0]' ] ).getOption ( textForLabelState ) ).toEqual ( 'one' )
//
//   } )
//   it ( "should return a lens to a path with {variables}", () => {
//     expect ( fromPath ( [ '{basePage}', 'd', '{selecteda}' ] ).getOption ( textForLabelState ) ).toEqual ( 'four' )
//   } )
// } )
//
//
