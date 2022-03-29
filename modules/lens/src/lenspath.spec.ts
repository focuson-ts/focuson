import { lensBuilder, parsePath, PathBuilder, prefixNameAndLens, stateCodeBuilder, stateCodeInitials, tokenisePath } from "./path";
import { Lenses, Optional } from "./optics";
import { expand } from "@focuson/template";


describe ( 'tokenisepath', () => {
  it ( "should extract the prefix as a token, replacing 'no prefix with '' ", () => {
    expect ( tokenisePath ( 'a' ) ).toEqual ( [ 'a' ] )
    expect ( tokenisePath ( 'a/b' ) ).toEqual ( [ 'a', '/', 'b' ] )
    expect ( tokenisePath ( 'one/two/three' ) ).toEqual ( [ 'one', '/', 'two', '/', 'three' ] )
    expect ( tokenisePath ( '/one/two/three' ) ).toEqual ( [ '/', 'one', '/', 'two', '/', 'three' ] )
    expect ( tokenisePath ( '~one/two/three' ) ).toEqual ( [ '~', 'one', '/', 'two', '/', 'three' ] )
    expect ( tokenisePath ( '' ) ).toEqual ( [] )
    expect ( tokenisePath ( '/' ) ).toEqual ( [ '/' ] )
    expect ( tokenisePath ( '~' ) ).toEqual ( [ '~' ] )
  } )

  it ( "should tokenise [ ... ] with simple content", () => {
    expect ( tokenisePath ( '/one[a]/two[b]/three[c]' ) ).toEqual ( [
      "/", "one", "[", "a", "]", "/", "two", "[", "b", "]", "/", "three", "[", "c", "]"
    ] )
  } )
  it ( "should tokenise [ ... ] with numbers", () => {
    expect ( tokenisePath ( '/one[1]/two[2]/three[3]' ) ).toEqual ( [
      "/", "one", "$1", "/", "two", "$2", "/", "three", "$3" ] )
  } )
  it ( "should tokenise [ ... ] with $tokens", () => {
    expect ( tokenisePath ( '/a[$one]/bb[$two]/ccc[$three]' ) ).toEqual ( [
      "/", "a", "$one", "/", "bb", "$two", "/", "ccc", "$three"
    ] )
  } )

  it ( "should tokenise [ ... ] with path in the []", () => {
    expect ( tokenisePath ( '/one[a/b]/two[/bbb/ccc]/three[~/ccc]' ) ).toEqual ( [
      "/", "one", "[", "a", "/", "b", "]", "/", "two", "[", "/", "bbb", "/", "ccc", "]", "/", "three", "[", "~", "/", "ccc", "]" ] )
  } )
  it ( "should tokenise [ ... ] with path in the [] and a $ or two", () => {
    expect ( tokenisePath ( '/one[$next]/two[bbb/ccc]/three[~/ccc][$next]' ) ).toEqual ( [
      "/", "one", "$next", "/", "two", "[", "bbb", "/", "ccc", "]", "/", "three", "[", "~", "/", "ccc", "]", "$next"
    ] )
  } )

  it ( "should tokenise |", () => {
    expect ( tokenisePath ( '/one|two[three|four|five]' ) ).toEqual ( [
      "/", "one", "|", "two", "[", "three", "|", "four", "|", "five", "]"
    ] )

  } )
} )

const stringBuilder: PathBuilder<string> = {
  foldChoices ( acc: string, choices: string[] ): string {return acc + `.CHOICES<${choices}>`;},
  zero ( initial: string ): string { return `#${initial}#`; },
  foldAppend ( acc: string ): string {return acc + '.APPEND' },
  foldLast ( acc: string ): string {return acc + '.LAST' },
  foldNth ( acc: string, n: number ): string {return acc + `.[${n}]` },
  foldBracketsPath ( acc: string, path: string ): any { return acc + '.OPEN[' + path + ']CLOSE' },
  foldKey ( acc: string, key: string ): string { return acc + '.' + key }

}

describe ( "parsePath", () => {
  it ( "should fold the tokens", () => {
    expect ( parsePath ( '/one[$last]/two[bbb/ccc]/three[~/ccc][1][$append]/[/x]', stringBuilder ) ).toEqual (
      '#/#.one.LAST.two.OPEN[##.bbb.ccc]CLOSE.three.OPEN[#~#.ccc]CLOSE.[1].APPEND.OPEN[#/#.x]CLOSE' )
  } )
  it ( "should allow choices at the end", () => {
    expect ( parsePath ( "/one[two|1|2]|a|b|c", stringBuilder ) ).toEqual ( '#/#.one.OPEN[##.two.CHOICES<1,2>]CLOSE.CHOICES<a,b,c>' )
  } )
  it ( "should report errors if are in 'choices' and have unexpected tokens", () => {
    function error ( p: string, msg: string ) { expect ( () => parsePath ( p, stringBuilder ) ).toThrow ( msg )}
    error ( '/p|[', "Error parsing '/p|['. Unexpected '[" )
    error ( '/p|', "Error parsing '/p|'. Ran out of tokens!" )
    error ( '/p|/', "Error parsing '/p|/'. Unexpected '/" )
    error ( '/p|~', "Error parsing '/p|~'. Unexpected '~" )
    error ( '/p|]', "Error parsing '/p|]'. Unexpected ']" )
  } )

} )

const someData = {
  a: {
    b: {
      c: 'cValue', d: 'dValue',
    },
    e: [ 'zero', 'one' ],
    v0: 0,
    v1: 1,
    vc: 'c',
    vd: 'd',
    vfalse: false,
    vtrue: true
  }
}
const id = Lenses.identity<typeof someData> ()
function makeAbL ( path: Optional<any, any> ) {
  return id.focusQuery ( 'a' ).focusQuery ( 'b' ).chainCalc ( path )
}
function makeAEL ( path: Optional<any, any> ) {
  return id.focusQuery ( 'a' ).focusQuery ( 'e' ).chainCalc ( path )
}
describe ( "calculateNth", () => {
  it ( "should use the data at the end of  pathL as an index into first - string", () => {
    expect ( makeAbL ( id.focusQuery ( 'a' ).focusQuery ( 'vc' ) ).getOption ( someData ) ).toEqual ( 'cValue' )
    expect ( makeAbL ( id.focusQuery ( 'a' ).focusQuery ( 'vd' ) ).getOption ( someData ) ).toEqual ( 'dValue' )
  } )
  it ( "should use the data at the end of  pathL as an index into first - numbers", () => {
    expect ( makeAEL ( id.focusQuery ( 'a' ).focusQuery ( 'v0' ) ).getOption ( someData ) ).toEqual ( 'zero' )
    expect ( makeAEL ( id.focusQuery ( 'a' ).focusQuery ( 'v1' ) ).getOption ( someData ) ).toEqual ( 'one' )
  } )
  it ( "should use the data at the end of  pathL as an index into first - boolean", () => {
    expect ( makeAEL ( id.focusQuery ( 'a' ).focusQuery ( 'vfalse' ) ).getOption ( someData ) ).toEqual ( 'zero' )
    expect ( makeAEL ( id.focusQuery ( 'a' ).focusQuery ( 'vtrue' ) ).getOption ( someData ) ).toEqual ( 'one' )
  } )
} )
describe ( "chainIntoArray", () => {
  function makeLens ( fn: ( o: Optional<any, any> ) => Optional<any, any> ) {return fn ( id.focusQuery ( 'a' ) ).chainIntoArray ( [ 'x', 'y', 'z' ] )}
  const data = { a: { v0: 0, v1: 1, vt: true, vf: false }, b: 'stuff' }
  it ( "should make an optional that uses the value focused on to select an element of an array", () => {
    expect ( makeLens ( s => s.focusQuery ( 'v0' ) ).getOption ( data ) ).toEqual ( 'x' )
    expect ( makeLens ( s => s.focusQuery ( 'v0' ) ).setOption ( data, 'y' ) ).toEqual ( { "a": { "v0": 1, "v1": 1, "vf": false, "vt": true }, "b": "stuff" } )
    expect ( makeLens ( s => s.focusQuery ( 'v1' ) ).getOption ( data ) ).toEqual ( 'y' )
    expect ( makeLens ( s => s.focusQuery ( 'v1' ) ).setOption ( data, 'z' ) ).toEqual ( { "a": { "v0": 0, "v1": 2, "vf": false, "vt": true }, "b": "stuff" } )
    expect ( makeLens ( s => s.focusQuery ( 'vt' ) ).getOption ( data ) ).toEqual ( 'y' )
    expect ( makeLens ( s => s.focusQuery ( 'vt' ) ).setOption ( data, 'x' ) ).toEqual ( { "a": { "v0": 0, "v1": 1, "vf": false, "vt": 0 }, "b": "stuff" } )
    expect ( makeLens ( s => s.focusQuery ( 'vf' ) ).getOption ( data ) ).toEqual ( 'x' )
    expect ( makeLens ( s => s.focusQuery ( 'vf' ) ).setOption ( data, 'y' ) ).toEqual ( { "a": { "v0": 0, "v1": 1, "vf": 1, "vt": true }, "b": "stuff" } )
    expect ( makeLens ( s => s.focusQuery ( 'vf' ) ).description ).toEqual ( "chainIntoArray(x,y,z)" )
  } )
} )

describe ( "parsePathMakingLens", () => {
  it ( "should make an optional", () => {
    expect ( parsePath ( '/', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I' )
    expect ( parsePath ( '/a/v0', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).focus?(v0)' )
    expect ( parsePath ( '/a/$last', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chain([last])' )
    expect ( parsePath ( '/a/$append', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chain([append])' )
    expect ( parsePath ( '/a/[1]', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chain([1])' )
    expect ( parsePath ( '/a/[/a/b]', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chainCalc(I.focus?(a).focus?(b))' )
    expect ( parsePath ( '/a/[b]', lensBuilder ( prefixNameAndLens ( [ '', id.focusQuery ( 'a' ) ] ) ) ).description ).toEqual ( 'I.focus?(a).chainCalc(I.focus?(a).focus?(b))' )
    // expect ( parsePath ( '', lensBuilder ( prefixNameAndLens () ) ) ).toEqual ( undefined )
  } )
  it ( "should throw error if the initial  isn't defined", () => {
    expect ( () => parsePath ( 'a/b', lensBuilder ( prefixNameAndLens () ) ) ).toThrow ( "Error parsing 'a/b'. Cannot find initial  ''" )
  } )
  it ( "should make an lens using  [path|0|] language", () => {
    let zero = parsePath ( "/a/b[v0|c|d]", lensBuilder ( prefixNameAndLens ( [ '', id.focusQuery ( 'a' ) ] ) ) );
    let one = parsePath ( "/a/b[v1|c|d]", lensBuilder ( prefixNameAndLens ( [ '', id.focusQuery ( 'a' ) ] ) ) );
    expect ( zero.description ).toEqual ( '' )
    expect ( zero.getOption ( someData ) ).toEqual ( '' )
    expect ( zero.setOption ( someData, 'newV' ).a ).toEqual ( '' )
    expect ( one.description ).toEqual ( '' )
    expect ( one.getOption ( someData ) ).toEqual ( '' )
    expect ( one.setOption ( someData, 'newV' ).a ).toEqual ( '' )
  } )

} )

describe ( "parseMakingCode", () => {
  const initials = stateCodeInitials ( 'FState' )
  it ( "should make code", () => {
    expect ( parsePath ( '/a/v0', stateCodeBuilder ( initials ) ) ).toEqual ( "state.copyWithIdentity().focusQuery('a').focusQuery('v0')" )
    expect ( parsePath ( '~/a/$last', stateCodeBuilder ( initials ) ) ).toEqual ( "fullState.focusQuery('a').chain(Lenses.last())" )
    expect ( parsePath ( 'a/$append', stateCodeBuilder ( initials ) ) ).toEqual ( "state.focusQuery('a').chain(Lenses.append())" )
    expect ( parsePath ( 'a/[1]', stateCodeBuilder ( initials ) ) ).toEqual ( "state.focusQuery('a').chain(Lenses.nth(1))" )
    expect ( parsePath ( '/a/[/a/b]', stateCodeBuilder ( initials ) ) ).toEqual ( "state.copyWithIdentity().focusQuery('a').chainNthFromPath(state.copyWithIdentity().focusQuery('a').focusQuery('b'))" )
    expect ( parsePath ( '/a/[b]', stateCodeBuilder ( initials ) ) ).toEqual ( "state.copyWithIdentity().focusQuery('a').chainNthFromPath(state.focusQuery('b'))" )
  } )
} )