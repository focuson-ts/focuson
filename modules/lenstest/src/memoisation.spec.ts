import { memoise } from "@focuson/utils"

describe ( "memoisation", () => {
  it ( "should return the value if already in and generate it if it isn't in", () => {
    expect ( memoise ( "type1", "key1" ) ( () => 'one_one' ) ).toEqual ( "one_one" )
    expect ( memoise ( "type1", "key2" ) ( () => 'one_two' ) ).toEqual ( "one_two" )

    expect ( memoise ( "type1", "key1" ) ( () => {throw new Error ()} ) ).toEqual ( "one_one" )
    expect ( memoise ( "type1", "key2" ) ( () => {throw new Error ()} ) ).toEqual ( "one_two" )
  } )

} )