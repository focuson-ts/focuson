import { GetOptioner, Lenses, nameLensFn } from "@focuson-nw/lens";
import { applyToTemplate, applyToTemplateOrUndefinedIfNoParamsPresent, expand } from "@focuson-nw/template";


interface TemplateTestState {
  a: string,
  b: string,
  c?: number,
  d?: { e: string, f: string }
}

const state: TemplateTestState = { a: "1", b: "2", c: 3, d: { e: "5", f: "6" } }
const stateNoC: TemplateTestState = { a: "1", b: "2", d: { e: "5", f: "6" } }
const identity = Lenses.identity<TemplateTestState> ()
const nLFn: ( name: string ) => GetOptioner<TemplateTestState, any> = nameLensFn ( identity )

describe ( "nameLensFn", () => {
  it ( "should return a getOptioner to the correct part of the structure", () => {
    expect ( nLFn ( 'a' ).getOption ( state ) ).toEqual ( '1' )
    expect ( nLFn ( 'c' ).getOption ( state ) ).toEqual ( 3 )
  } )
} )


const urlFn = expand ( nLFn ) ( "/{a}/{b}?c={c}&d={d}" )
const urlIllegalNameFn = expand ( nLFn ) ( "/{notKnown}" )
const urlFailSilentlyIllegalNameFn = expand ( nLFn, true ) ( "/{notKnown}/a" )
const urlFailSilentlyFn = expand ( nLFn, true ) ( "/{a}/{b}?c={c}&d={d}" )

describe ( "expand", () => {
    it ( "should replace the values in the target", () => {
      expect ( urlFn ( state ).replace ( /"/g, "'" ) ).toEqual ( "/1/2?c=3&d={'e':'5','f':'6'}" )
      expect ( urlFailSilentlyFn ( state ).replace ( /"/g, "'" ) ).toEqual ( "/1/2?c=3&d={'e':'5','f':'6'}" )
    } )

    it ( "should handle 'unknown name in template'", () => {
      expect ( () => urlIllegalNameFn ( state ) ).toThrow ( 'Could not find notKnown for /{notKnown}' )
      expect ( urlFailSilentlyIllegalNameFn ( state ).replace ( /"/g, "'" ) ).toEqual ( '//a' )
    } )
    it ( "should handled undefined", () => {
      expect ( () => urlFn ( stateNoC ) ).toThrow ( 'Could not find c for /{a}/{b}?c={c}&d={d}' )
      expect ( urlFailSilentlyFn ( stateNoC ).replace ( /"/g, "'" ) ).toEqual ( "/1/2?c=&d={'e':'5','f':'6'}" )
    } )
  }
)


describe ( "applyToTemplate", () => {
  it ( "should replace a list of strings which is the input strings modified by the parats", () => {
    const params = { a: 1, b: 2 }
    expect ( applyToTemplate ( "a={a}&b={b}", params ) ).toEqual ( [ "a=1&b=2" ] )
    expect ( applyToTemplate ( "a={a}\nb={b}", params ) ).toEqual ( [ "a=1", "b=2" ] )

  } )
  it ( "should replace an object with JSON.stringify", () => {
    const params = { a: 1, b: { c: 1, d: 1 } }
    expect ( applyToTemplate ( "a={a}&b={b}", params ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [ "a=1&b={'c':1,'d':1}" ] )

  } )
  it ( "should replace an array with a nice display", () => {
    const params = { a: 1, b: [ 2, 3 ] }
    expect ( applyToTemplate ( "a={a}&b={b}", params ) ).toEqual ( [ "a=1&b=[2,3]" ] )
  } )
} )

describe ( 'applyToTemplateOrUndefinedIfNoParamsPresent', () => {
  const a1b2 = { a: 1, b: 2 }
  it ( 'should return undefined or the mapped data', () => {
    expect ( applyToTemplateOrUndefinedIfNoParamsPresent ( "a={a}&b={b}", a1b2 ) ).toEqual ( "a=1&b=2" )
    expect ( applyToTemplateOrUndefinedIfNoParamsPresent ( "a={a}&b={b}", {} ) ).toEqual ( undefined )
  } );
  it ( 'should return template if there are no {}', () => {
    expect ( applyToTemplateOrUndefinedIfNoParamsPresent ( "someTemplateWithNoBrackets", a1b2 ) ).toEqual ( 'someTemplateWithNoBrackets' )
    expect ( applyToTemplateOrUndefinedIfNoParamsPresent ( "someTemplateWithNoBrackets", {  } ) ).toEqual ( 'someTemplateWithNoBrackets' )
  } );
} );