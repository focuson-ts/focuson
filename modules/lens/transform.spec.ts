import { Lenses, massTransform, Transform } from "./index";


interface TransformSpecState {
  a?: { b?: { c?: number } }
  d?: { e?: { f?: number } }
}

const empty: TransformSpecState = {}
const full: TransformSpecState = { a: { b: { c: 3 } }, d: { e: { f: 6 } } }
const id = Lenses.identity<TransformSpecState> ()
const trcplus3: Transform<TransformSpecState, number> = [ id.focusQuery ( 'a' ).focusQuery ( 'b' ).focusQuery ( 'c' ), x => x + 3 ]
const trfplus3: Transform<TransformSpecState, number> = [ id.focusQuery ( 'd' ).focusQuery ( 'e' ).focusQuery ( 'f' ), x => x + 3 ]


describe ( "massTransform ", () => {
  it ( "should transform happy path", () => {
    expect ( massTransform ( full, trcplus3, trfplus3 ) ).toEqual ( { "a": { "b": { "c": 6 } }, "d": { "e": { "f": 9 } } } )
  } )
  it ( "should report issues", () => {
    expect ( () =>massTransform ( empty, trcplus3, trfplus3 ) ).toThrow ('Cannot transform I.focus?(a).focus?(b).focus?(c)' )
  } )
} )


