import { GetOptioner, Lenses } from "@focuson/lens";
import { applyToTemplate, expand, expandFor, findTags, findTagsFor, getUrl, getUrlFor, makeAEqualsB, nameLensFn, queryParamsFor, tagOps } from "@focuson/template";


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

describe ( "expandFor ", () => {
  it ( "check happy path", () => {
    expect ( expandFor ( identity ) ( "/{a}/{b}/{c}", 'a', 'b', 'c' ) ( state ) ).toEqual ( '/1/2/3' )
  } )
} )

describe ( "queryParamsFor ", () => {
  it ( "should work on blocks", () => {
    expect ( queryParamsFor ( identity, {} ) ( 'a', "b" ) ( state ) ).toEqual ( 'a=1&b=2' )
  } )
} )
describe ( "makeAEqualsB ", () => {
  it ( "should return an a equals b ", () => {
    expect ( makeAEqualsB ( nameLensFn ( identity ), {} ) ( 'a', 'b', 'c', 'd' ) ( state ).replace ( /"/g, "'" ) ).//
      toEqual ( "a=1&b=2&c=3&d={'e':'5','f':'6'}" )
    expect ( makeAEqualsB ( nameLensFn ( identity ), { separator: "*" } ) ( 'a', 'b', 'c', 'd' ) ( state ).replace ( /"/g, "'" ) ).//
      toEqual ( "a=1*b=2*c=3*d={'e':'5','f':'6'}" )
    expect ( makeAEqualsB ( nameLensFn ( identity ), { encoder: s => '<' + s + '>' } ) ( 'a', 'b', 'c', 'd' ) ( state ).replace ( /"/g, "'" ) ).//
      toEqual ( "a=<1>&b=<2>&c=<3>&d=<[object Object]>" )
  } )
  it ( "should handle not found ", () => {
    expect ( () => makeAEqualsB ( nameLensFn ( identity ), {} ) ( 'a', 'not in', 'c', 'd' ) ( state ) ).//
      toThrow ( "Could not find [not in] in makeAEqualsB. All names are a.not in.c.d" )
    expect ( makeAEqualsB ( nameLensFn ( identity ), { failSilently: true } ) ( 'a', 'not in', 'c', 'd' ) ( state ).replace ( /"/g, "'" ) ).//
      toEqual ( "a=1&not in=&c=3&d={'e':'5','f':'6'}" )
  } )

} )

describe ( "findTags", () => {
  it ( 'should find tags', () => {
    expect ( findTags ( nameLensFn ( identity ) ) ( 'a', 'b', 'c' ) ( state ) ).toEqual ( [ "1", "2", 3 ] )
    expect ( findTags ( nameLensFn ( identity ) ) ( 'a', 'b', 'c' ) ( stateNoC ) ).toEqual ( [ "1", "2", undefined ] )
    expect ( findTagsFor<TemplateTestState, TemplateTestState> ( identity ) ( 'a', 'b', 'c' ) ( stateNoC ) ).toEqual ( [ "1", "2", undefined ] )

  } )
} )

describe ( "tagOps", () => {
  it ( "smoke test", () => {
    expect ( tagOps ( identity, {} ).tags ( 'a', 'b' ) ( state ) ).toEqual ( [ "1", "2" ] )
    expect ( tagOps ( identity, {} ).queryParam ( 'a', 'b' ) ( state ) ).toEqual ( 'a=1&b=2' )
  } )
} )

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

describe ( "getUrl", () => {
  it ( "it should replace {placeholders} and {query}", () => {
    expect ( getUrl ( nLFn ) ( "/some/{a}?{query}", 'a', 'b' ) ( state ) ).toEqual ( '/some/1?a=1&b=2' )
  } )
} )

describe ( "getUrlFor", () => {
  it ( "it should replace {placeholders} and {query}", () => {
    expect ( getUrlFor ( identity ) ( "/some/{a}?{query}", 'a', 'b' ) ( state ) ).toEqual ( '/some/1?a=1&b=2' )
  } )
} )