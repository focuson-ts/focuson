import { isSameDay } from "@focuson/utils";

function quickParser ( s: string ) {return new Date ( Date.parse ( s ) )}
describe ( "isSameDate", () => {
  function check ( s1: string, s2: string ) {
    return isSameDay ( quickParser ( s1 ), quickParser ( s2 ) )
  }
  it ( "should return true if the same date", () => {
    expect ( check ( '2002-01-02', '2002-01-02' ) ).toEqual ( true )
  } )
  it ( "should return false if not", () => {
    expect ( check ( '2002-01-02', '2003-01-02' ) ).toEqual ( false )
    expect ( check ( '2002-01-02', '2002-05-02' ) ).toEqual ( false )
    expect ( check ( '2002-01-02', '2002-01-06' ) ).toEqual ( false )
  } )
} )

