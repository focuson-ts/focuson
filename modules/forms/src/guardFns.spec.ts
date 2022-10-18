import { lensState } from "@focuson/state";
import { HasDateFn } from "@focuson/utils";
import { isDifferentDayOrIsBeforeFull, isSameDay } from "./guardFns";

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