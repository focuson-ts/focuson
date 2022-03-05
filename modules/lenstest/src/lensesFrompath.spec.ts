import { Lenses } from "@focuson/lens";

interface StateForLensPath {
  a: {
    n?: number;
    b: {
      c: number[]
    }
  }
}
// const lookup: NameAnd<Optional<StateForLensPath, number>> = { n: Lenses.identity<StateForLensPath> ().focusOn ( 'a' ).focusQuery ( 'n' ) }
const zero: StateForLensPath = { a: { n: 0, b: { c: [ 1, 2, 3, 4, 5, ] } } }
const other: StateForLensPath = { a: { n: 10, b: { c: [ 11, 12, 13, 14, 15, ] } } }
const abcL = Lenses.identity<StateForLensPath> ().focusOn ( 'a' ).focusQuery ( 'b' ).focusQuery ( 'c' )

function lookup ( name: string ) {
  expect ( name ).toEqual ( 'n' )
  return 3
}
describe ( "lenses.fromPathFor", () => {
  it ( "should return a lens interpreting {n} as 'find the look up for n and get the value from there", () => {
    const lens = Lenses.fromPathWith <StateForLensPath, number> ( lookup ) ( [ 'a', 'b', 'c', '{n}' ] )
    expect ( lens.getOption ( zero ) ).toEqual ( 4 )
    expect ( lens.setOption ( zero, 9 ) ).toEqual ( { a: { n: 0, b: { c: [ 1, 2, 3, 9, 5 ] } } } )

    expect ( lens.getOption ( other ) ).toEqual ( 14 )
    expect ( lens.setOption ( other, 9 ) ).toEqual ( { a: { n: 10, b: { c: [ 11, 12, 13, 9, 15 ] } } } )

    expect ( lens.description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c).{n}' )
  } )
  it ( "should return a lens interpreting [2] as 'find the nth item", () => {
    const lens = Lenses.fromPathWith <StateForLensPath, number> ( lookup ) ( [ 'a', 'b', 'c', '[2]' ] )
    expect ( lens.getOption ( zero ) ).toEqual ( 3 )
    expect ( lens.setOption ( zero, 9 ) ).toEqual ( { a: { n: 0, b: { c: [ 1, 2, 9, 4, 5 ] } } } )
    expect ( lens.description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c).chain([2])' )
  } )
  it ( "should return a lens interpreting [last] as 'find the last", () => {
    const lens = Lenses.fromPathWith <StateForLensPath, number> ( lookup ) ( [ 'a', 'b', 'c', '[last]' ] )
    expect ( lens.getOption ( zero ) ).toEqual ( 5 )
    expect ( lens.setOption ( zero, 9 ) ).toEqual ( { a: { n: 0, b: { c: [ 1, 2, 3, 4, 9 ] } } } )
    expect ( lens.description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c).chain([last])' )
  } )
  it ( "should return a lens interpreting [append] as 'find the next item in the array", () => {
    const lens = Lenses.fromPathWith <StateForLensPath, number> ( lookup ) ( [ 'a', 'b', 'c', '[append]' ] )
    expect ( lens.getOption ( zero ) ).toEqual ( undefined )
    expect ( lens.setOption ( zero, 9 ) ).toEqual ( { a: { n: 0, b: { c: [ 1, 2, 3, 4, 5, 9 ] } } } )
    expect ( lens.description ).toEqual ( 'I.focus?(a).focus?(b).focus?(c).chain([append])' )
  } )
} )

describe ( "nthRef", () => {
  it ( "should return a lens into the nth item of an array, where where the nth comes from some function", () => {
    const lens = Lenses.chainNthRef ( abcL, lookup, 'n' )
    expect ( lens.getOption ( other ) ).toEqual ( 14 )
    expect ( lens.setOption ( other, 9 ) ).toEqual ( { a: { n: 10, b: { c: [ 11, 12, 13, 9, 15 ] } } } )
    expect ( lens.description ).toEqual ( 'I.focusOn(a).focus?(b).focus?(c).{n}' )
  } )
} )