import { after, DateInfo, getHoursAndMinutes, isSameDay, millisecondsBetweenServerAndBrowser, timeOnServerinGMT } from "@focuson/utils";

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

describe ( 'after', () => {

  it ( "should return true if the date is after the hh:mm text string when NOT Daylight saving time", () => {
    const dateInfo: DateInfo = {
      now: '2022-07-01T05:25:32.077Z',
      dates: {
        serverNow: '2022-07-01T06:25:32.077Z',
        serversHoursOffsetFromGMT: 0
      }
    }
    //9:14 on the browser is 10:14 on the server which is before 10:15
    expect ( after ( '04 Nov 2022 09:14:00 GMT', '10:15', dateInfo ) ).toEqual ( false )
    //9:16 on the browser is 10:16 on the server which is after 10:15
    expect ( after ( '04 Nov 2022 09:16:00 GMT', '10:15', dateInfo ) ).toEqual ( true )
    //10:14 on the browser is 11:14 on the server which is after 10:15
    expect ( after ( '04 Nov 2022 10:14:00 GMT', '10:15', dateInfo ) ).toEqual ( true )
  } )
  it ( "should return true if the date is after the hh:mm text string when  Daylight saving time", () => {
    const dateInfo: DateInfo = {
      now: '2022-07-01T05:25:32.077Z',
      dates: {
        serverNow: '2022-07-01T06:25:32.077Z',
        serversHoursOffsetFromGMT: 1
      }
    }
    //8:14 on the browser is 9:14 on the server GMT with is 9:14 GMT which is 10:14 BST  which is before 10:15
    expect ( after ( '04 Nov 2022 08:14:00 GMT', '10:15', dateInfo ) ).toEqual ( false )
    //8:14 on the browser is 9:14 on the server GMT with is 10:14 GMT which is 11:14 BST  which is before 10:15
    expect ( after ( '04 Nov 2022 09:14:00 GMT', '10:15', dateInfo ) ).toEqual ( true )
    expect ( after ( '04 Nov 2022 09:14:00 GMT', '10:15', dateInfo ) ).toEqual ( true )
  } )
  // it ( "should return false if the date is garbage", () => {
  //   fail ()
  //
  // } )
} )

describe ( 'millisecondsBetweenServerAndBrowser', () => {
  function check ( now: string, serverNow: string ): number {
    return millisecondsBetweenServerAndBrowser ( { now, dates: { serverNow, serversHoursOffsetFromGMT: 0 } } )
  }
  it ( 'should be the number of milliseconds between the now and the dates/serverNow in the dateinfo', () => {
    expect ( check ( '2022-07-01T05:25:32.077Z', '2022-07-01T05:25:32.077Z' ) ).toEqual ( 0 )
    expect ( check ( '2022-07-01T05:25:32.077Z', '2022-07-01T06:25:32.077Z' ) ).toEqual ( -3600000 )
    expect ( check ( '2022-07-02T05:25:32.077Z', '2022-07-01T05:25:32.077Z' ) ).toEqual ( 24 * 3600000 )
  } )

} )

describe ( 'timeOnServer', () => {
  const dateInfo: DateInfo = { now: '2022-07-01T05:25:32.077Z', dates: { serverNow: '2022-07-01T06:25:32.077Z', serversHoursOffsetFromGMT: 0 } }
  it ( 'should turn the browser time into server time', () => {
    expect ( timeOnServerinGMT ( '2022-07-01T05:25:32.077Z', dateInfo ) ).toEqual ( 'Fri, 01 Jul 2022 06:25:32 GMT' )
    expect ( timeOnServerinGMT ( '2022-07-01T06:20:32.077Z', dateInfo ) ).toEqual ( 'Fri, 01 Jul 2022 07:20:32 GMT' )

  } )

} )

describe('getHoursAndMinutes', () =>{
  it ('should return the hours and minutes from a utcString', () => {
    expect ( getHoursAndMinutes ( 'Fri, 01 Jul 2022 07:20:32 GMT' ) ).toEqual ( [ 7, 20 ] )
  })

})