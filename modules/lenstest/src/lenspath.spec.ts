import { tokenisePath } from "@focuson/lens";


describe ( 'tokenisepath', () => {
  it ( "should extract the prefix as a token, replacing 'no prefix with '' ", () => {
    expect ( tokenisePath ( 'a' ) ).toEqual ( [ '', 'a' ] )
    expect ( tokenisePath ( 'a/b' ) ).toEqual ( [ '', 'a', 'b' ] )
    expect ( tokenisePath ( 'one/two/three' ) ).toEqual ( [ '', 'one', 'two', 'three' ] )
    expect ( tokenisePath ( '/one/two/three' ) ).toEqual ( [ '/', 'one', 'two', 'three' ] )
    expect ( tokenisePath ( '~one/two/three' ) ).toEqual ( [ '~', 'one', 'two', 'three' ] )
    expect ( tokenisePath ( '@@one/two/three' ) ).toEqual ( [ '@@', 'one', 'two', 'three' ] )
    expect ( tokenisePath ( '' ) ).toEqual ( [ '' ] )
    expect ( tokenisePath ( '/' ) ).toEqual ( [ '/' ] )
    expect ( tokenisePath ( '~' ) ).toEqual ( [ '~' ] )
    expect ( tokenisePath ( '@@' ) ).toEqual ( [ '@@' ] )
  } )

  it ( "should tokenise [ ... ] with simple content", () => {
    expect ( tokenisePath ( '/one[a]/two[b]/three[c]' ) ).toEqual ( [ '/', 'one', '[a]', 'two', '[b]', 'three', '[c]' ] )

  } )
  it ( "should tokenise [ ... ] with path in the []", () => {
    expect ( tokenisePath ( '/one[a/b]/two[bbb/ccc]/three[~/ccc]' ) ).toEqual ( [ "/", "one", "[a/b]", "two", "[bbb/ccc]", "three", "[~/ccc]" ] )
  } )
  it ( "should tokenise [ ... ] with path in the [] and a $ or two", () => {
    expect ( tokenisePath ( '/one[$next]/two[bbb/ccc]/three[~/ccc][$next]' ) ).toEqual (
      [ "/", "one", "[$next]", "two", "[bbb/ccc]", "three", "[~/ccc]", "[$next]" ] )
  } )

} )