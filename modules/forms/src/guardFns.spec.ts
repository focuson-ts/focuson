import { HasDateFn } from "@focuson/utils";
import { lensState } from "@focuson/state";
import { isDifferentDayOrIsBeforeFull } from "./guardFns";

function quickParser ( s: string ) {return new Date ( Date.parse ( s ) )}
describe ( "is after on same day", () => {
  function check ( now: string, date: string ) {
    const data = { date }
    const context: HasDateFn = { dateFn: () => now }
    const state = lensState ( data, () => {throw Error ()}, '', context ).focusOn ( 'date' )
    return isDifferentDayOrIsBeforeFull ( quickParser, quickParser ) ( 15, 10 ) ( state )

  }
  it ( "should return true if day is before", () => {
    expect ( check ( '2002-10-02T10:00:00', '2002-10-01T10:00:00' ) ).toEqual ( true )
  } )
  it ( "should return true if day is after", () => {
    expect ( check ( '2002-10-02T10:00:00', '2002-10-03T10:00:00' ) ).toEqual ( true )
  } )
  it ( "should return true if day is same, but time is before", () => {
    expect ( check ( '2002-10-02T10:00:00', '2002-10-02T10:00:00' ) ).toEqual ( true )
    expect ( check ( '2002-10-02T10:00:00', '2002-10-02T20:00:00' ) ).toEqual ( true )
  } )
  it ( "should return false if day is same, but time is after", () => {
    expect ( check ( '2002-10-02T16:00:00', '2002-10-02T10:00:00' ) ).toEqual ( false )
    expect ( check ( '2002-10-02T16:00:00', '2002-10-02T20:00:00' ) ).toEqual ( false )
  } )

} )