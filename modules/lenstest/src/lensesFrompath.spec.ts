import { NameAnd } from "@focuson/utils";
import { Lenses, Optional } from "@focuson/lens";

interface StateForLensPath {
  a: {
    n?: number;
    b: {
      c: number[]
    }
  }
}
const lookup: NameAnd<Optional<StateForLensPath, number>> = { n: Lenses.identity<StateForLensPath> ().focusOn ( 'a' ).focusQuery ( 'n' ) }
const zero: StateForLensPath = { a: { n: 0, b: { c: [ 1, 2, 3, 4, 5, ] } } }
const two: StateForLensPath = { a: { n: 2, b: { c: [ 1, 2, 3, 4, 5, ] } } }
const four: StateForLensPath = { a: { n: 4, b: { c: [ 1, 2, 3, 4, 5, ] } } }
const ten: StateForLensPath = { a: { n: 10, b: { c: [ 1, 2, 3, 4, 5, ] } } }
const minus1: StateForLensPath = { a: { n: -1, b: { c: [ 1, 2, 3, 4, 5, ] } } }
const abcL = Lenses.identity<StateForLensPath> ().focusOn ( 'a' ).focusQuery ( 'b' ).focusQuery ( 'c' )

describe ( "lenses.fromPathFor", () => {
  it ( "should return a lens interpreting {n} as 'find the look up for n and get the value from there", () => {
    const lens = Lenses.fromPathWith <StateForLensPath, number> ( lookup ) ( [ 'a', 'b', 'c', '{n}' ] )
    expect ( lens.description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c).{n}' )
    expect ( lens.getOption ( zero ) ).toEqual ( 1 )
    expect ( lens.getOption ( two ) ).toEqual ( 3 )
    expect ( lens.getOption ( four ) ).toEqual ( 5 )
    expect ( lens.getOption ( ten ) ).toEqual ( undefined )

    expect ( lens.setOption ( zero, 9 ) ).toEqual ( { a: { n: 0, b: { c: [ 9, 2, 3, 4, 5 ] } } } )
    expect ( lens.setOption ( two, 9 ) ).toEqual ( { a: { n: 2, b: { c: [ 1, 2, 9, 4, 5 ] } } } )
    expect ( lens.setOption ( four, 9 ) ).toEqual ( { a: { n: 4, b: { c: [ 1, 2, 3, 4, 9 ] } } } )
    expect ( lens.setOption ( ten, 9 ) ).toEqual ( { a: { n: 10, b: { c: [ 1, 2, 3, 4, 5, undefined, undefined, undefined, undefined, undefined, 9 ] } } } )

  } )
  it ( "should return a lens interpreting [2] as 'find the nth item", () => {
    const lens = Lenses.fromPathWith <StateForLensPath, number> ( lookup ) ( [ 'a', 'b', 'c', '[2]' ] )
    expect ( lens.description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c).chain([2])' )
    expect ( lens.getOption ( zero ) ).toEqual ( 3 )

    expect ( lens.setOption ( zero, 9 ) ).toEqual ( { a: { n: 0, b: { c: [ 1, 2, 9, 4, 5 ] } } } )
  } )
} )

describe ( "nthRef", () => {
  it ( "hwould return a lens into the nth item of an array, where N is controlled by data", () => {
    const lens = Lenses.chainNthRef ( abcL, lookup, 'n' )
    expect ( lens.getOption ( zero ) ).toEqual ( 1 )
    expect ( lens.getOption ( two ) ).toEqual ( 3 )
    expect ( lens.getOption ( four ) ).toEqual ( 5 )
    expect ( lens.getOption ( ten ) ).toEqual ( undefined )

    expect ( lens.setOption ( zero, 9 ) ).toEqual ( { a: { n: 0, b: { c: [ 9, 2, 3, 4, 5 ] } } } )
    expect ( lens.setOption ( two, 9 ) ).toEqual ( { a: { n: 2, b: { c: [ 1, 2, 9, 4, 5 ] } } } )
    expect ( lens.setOption ( four, 9 ) ).toEqual ( { a: { n: 4, b: { c: [ 1, 2, 3, 4, 9 ] } } } )
    expect ( lens.setOption ( ten, 9 ) ).toEqual ( { a: { n: 10, b: { c: [ 1, 2, 3, 4, 5, undefined, undefined, undefined, undefined, undefined, 9 ] } } } )

    expect ( lens.description ).toEqual ( 'I.focusOn(a).focus?(b).focus?(c).[n]' )
  } )
} )