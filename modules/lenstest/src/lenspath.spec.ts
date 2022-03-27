import { lensBuilder, parsePath, PathBuilder, prefixNameAndLens, stateCodeBuilder, stateCodeInitials, tokenisePath } from "@focuson/lens/dist/src/path";
import { Lenses, Optional } from "@focuson/lens";


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

} )

const stringBuilder: PathBuilder<string> = {
  zero ( initial: string ): string { return `#${initial}#`; },
  foldAppend ( acc: string ): string {return acc + '.APPEND' },
  foldLast ( acc: string ): string {return acc + '.LAST' },
  foldNth ( acc: string, n: number ): string {return acc + `.[${n}]` },
  foldBracketsPath ( acc: string, path: string ): any { return acc + '.OPEN[' + path + ']CLOSE' },
  foldKey ( acc: string, key: string ): string { return acc + '.' + key }
}

describe ( "parsePath", () => {
  it ( "should turn the path into ", () => {
    expect ( parsePath ( '/one[$last]/two[bbb/ccc]/three[~/ccc][1][$append]/[/x]', stringBuilder ) ).toEqual (
      '#/#.one.LAST.two.OPEN[##.bbb.ccc]CLOSE.three.OPEN[#~#.ccc]CLOSE.[1].APPEND.OPEN[#/#.x]CLOSE' )
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
  return id.focusQuery ( 'a' ).focusQuery ( 'b' ).chainBasedOnPath ( path )
}
function makeAEL ( path: Optional<any, any> ) {
  return id.focusQuery ( 'a' ).focusQuery ( 'e' ).chainBasedOnPath ( path )
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

describe ( "parsePathMakingLens", () => {
  it ( "should make an optional", () => {
    expect ( parsePath ( '/', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I' )
    expect ( parsePath ( '/a/v0', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).focus?(v0)' )
    expect ( parsePath ( '/a/$last', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chain([last])' )
    expect ( parsePath ( '/a/$append', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chain([append])' )
    expect ( parsePath ( '/a/[1]', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chain([1])' )
    expect ( parsePath ( '/a/[/a/b]', lensBuilder ( prefixNameAndLens () ) ).description ).toEqual ( 'I.focus?(a).chainCalc(I.focus?(a).focus?(b))' )
    expect ( parsePath ( '/a/[b]', lensBuilder ( prefixNameAndLens ( [ '', id.focusQuery ( 'a' ) ] ) ) ).description ).toEqual ( 'I.focus?(a).chainCalc(I.focus?(a).focus?(b))' )
  } )
  it ( "should make undefined if the initial  isn't defined", () => {
    expect ( parsePath ( '', lensBuilder ( prefixNameAndLens () ) ) ).toEqual ( undefined )
    expect ( parsePath ( 'a/b', lensBuilder ( prefixNameAndLens () ) ) ).toEqual ( undefined )
  } )
} )

describe ( "parseMakingCode", () => {
  const initials = stateCodeInitials ( 'FState' )
  it ( "should make code", () => {
    expect ( parsePath ( '/a/v0', stateCodeBuilder ( initials ) ) ).toEqual ( 'state.copyWithIdentity().focusQuery(a).focusQuery(v0)' )
    expect ( parsePath ( '~/a/$last', stateCodeBuilder ( initials ) ) ).toEqual ( 'fullState.focusQuery(a).chain(Lenses.last())' )
    expect ( parsePath ( 'a/$append', stateCodeBuilder ( initials ) ) ).toEqual ( 'state.focusQuery(a).chain(Lenses.append())' )
    expect ( parsePath ( 'a/[1]', stateCodeBuilder ( initials ) ) ).toEqual ( 'state.focusQuery(a).chain(Lenses.nth(1))' )
    expect ( parsePath ( '/a/[/a/b]', stateCodeBuilder ( initials ) ) ).toEqual ( 'state.copyWithIdentity().focusQuery(a).chainNthFromPath(state.copyWithIdentity().focusQuery(a).focusQuery(b))' )
    expect ( parsePath ( '/a/[b]', stateCodeBuilder ( initials ) ) ).toEqual ( 'state.copyWithIdentity().focusQuery(a).chainNthFromPath(state.focusQuery(b))' )
  } )
} )