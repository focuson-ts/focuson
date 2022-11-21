import { after, DateInfo, getHoursAndMinutes, isSameDay, millisecondsBetweenServerAndBrowser, setLength, setStartDate, timeOnServerinGMT } from "@focuson/utils";
import { calculateLength, setEndDate } from "@focuson/utils/src/dateutils";

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
        today: '01-07-2022',
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
        today: '01-07-2022',
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
    return millisecondsBetweenServerAndBrowser ( { now, dates: { today: '01-07-2022', serverNow, serversHoursOffsetFromGMT: 0 } } )
  }
  it ( 'should be the number of milliseconds between the now and the dates/serverNow in the dateinfo', () => {
    expect ( check ( '2022-07-01T05:25:32.077Z', '2022-07-01T05:25:32.077Z' ) ).toEqual ( 0 )
    expect ( check ( '2022-07-01T05:25:32.077Z', '2022-07-01T06:25:32.077Z' ) ).toEqual ( -3600000 )
    expect ( check ( '2022-07-02T05:25:32.077Z', '2022-07-01T05:25:32.077Z' ) ).toEqual ( 24 * 3600000 )
  } )

} )

describe ( 'timeOnServer', () => {
  const dateInfo: DateInfo = { now: '2022-07-01T05:25:32.077Z', dates: { today: '01-07-2022', serverNow: '2022-07-01T06:25:32.077Z', serversHoursOffsetFromGMT: 0 } }
  it ( 'should turn the browser time into server time', () => {
    expect ( timeOnServerinGMT ( '2022-07-01T05:25:32.077Z', dateInfo ) ).toEqual ( 'Fri, 01 Jul 2022 06:25:32 GMT' )
    expect ( timeOnServerinGMT ( '2022-07-01T06:20:32.077Z', dateInfo ) ).toEqual ( 'Fri, 01 Jul 2022 07:20:32 GMT' )
  } )
} )

describe ( 'getHoursAndMinutes', () => {
  it ( 'should return the hours and minutes from a utcString', () => {
    expect ( getHoursAndMinutes ( 'Fri, 01 Jul 2022 07:20:32 GMT' ) ).toEqual ( [ 7, 20 ] )
  } )
} )


describe ( "startEndDateAndLength", () => {

  describe ( "calculateLength", () => {
    it ( "should calculate the months between the dates with mm/yyyy", () => {
      expect ( calculateLength ( "10-2022", "10-2022",0 ) ).toEqual ( 0 )
      expect ( calculateLength ( "10-2022", "10-2022",1) ).toEqual ( 1)
      expect ( calculateLength ( "09-2022", "10-2022",0 ) ).toEqual ( 1 )
      expect ( calculateLength ( "09-2020", "10-2022" ,0) ).toEqual ( 25 )
      expect ( calculateLength ( "09-2020", "10-2022" ,10) ).toEqual ( 35 )
      expect ( calculateLength ( "10-2022", "09-2020",0 ) ).toEqual ( -25 )
    } )
    it ( "should calculate the months between the dates with mm-yyyy", () => {
      expect ( calculateLength ( "09/2022", "10/2022",0 ) ).toEqual ( 1 )
      expect ( calculateLength ( "09/2020", "10/2022",0 ) ).toEqual ( 25 )
      expect ( calculateLength ( "10/2022", "09/2020",0 ) ).toEqual ( -25 )
    } )


  } )

  describe ( "setStartDate", () => {
    it ( "should set the date when everything is undefined", () => {
      expect ( setStartDate ( {}, "08-2022" ) ).toEqual ( { startDate: '08-2022' } )
    } )
    it ( "should set the date when date is already defined", () => {
      expect ( setStartDate ( { startDate: '07-2022' }, "08-2022" ) ).toEqual ( { startDate: '08-2022' } )
    } )
    it ( "should set the date when length is zero, and end date is not defined", () => {
      expect ( setStartDate ( { startDate: '07-2022', length: 0 }, "08-2022" ) ).toEqual ( { startDate: '08-2022', length: 0, endDate: '7/2022' } )
    } )
    it ( "should set the date when length is one, and end date is not defined", () => {
      expect ( setStartDate ( { startDate: '07-2022', length: 1 }, "08-2022" ) ).toEqual ( { startDate: '08-2022', length: 1, endDate: '8/2022' } )
    } )
    it ( "should set the date when length is two, and end date is not defined", () => {
      expect ( setStartDate ( { startDate: '07-2022', length: 2 }, "08-2022" ) ).toEqual ( { startDate: '08-2022', length: 2, endDate: '9/2022' } )
    } )
    it ( "should set the date when length is undefined, and end date is defined", () => {
      expect ( setStartDate ( { startDate: '07-2022', endDate: '09-2022' }, "08-2022" ) ).toEqual ( { startDate: '08-2022', length:0 , endDate: '09-2022' } )
      expect ( setStartDate ( { startDate: '07-2022', endDate: '09-2022' }, "06-2022" ) ).toEqual ( { startDate: '06-2022', length:2 , endDate: '09-2022' } )
    } )
    it ( "should set the date when length is defined, and end date is defined", () => {
      expect ( setStartDate ( { startDate: '07-2022', length:2, endDate: '08-2022' }, "08-2022" ) ).toEqual ( { startDate: '08-2022', length: 2, endDate: '9/2022' } )
    } )
  } )
  describe ( "setEndDate", () => {
    it ( "should set the date when everything is undefined", () => {
      expect ( setEndDate ( {}, "09-2022" ) ).toEqual ( { endDate: '09-2022' } )
    } )
    it ( "should set the date when date is already defined", () => {
      expect ( setEndDate ( { endDate: '07-2022' }, "09-2022" ) ).toEqual ( { endDate: '09-2022' } )
    } )
    it ( "should set the date when length is zero, and start date is not defined", () => {
      expect ( setEndDate ( { endDate: '07-2022', length: 0 }, "09-2022" ) ).toEqual ( { startDate: '10/2022', length: 0, endDate: '09-2022' } )
    } )
    it ( "should set the date when length is one, and start date is not defined", () => {
      expect ( setEndDate ( { endDate: '07-2022', length: 1 }, "09-2022" ) ).toEqual ( { startDate: '9/2022', length: 1, endDate: '09-2022' } )
    } )
    it ( "should set the date when length is two, and start date is not defined", () => {
      expect ( setEndDate ( { endDate: '07-2022', length: 2 }, "09-2022" ) ).toEqual ( { startDate: '8/2022', length: 2, endDate: '09-2022' } )
    } )
    it ( "should set the date when length is undefined, and start date is defined", () => {
      expect ( setEndDate ( { startDate: '08-2022', endDate: '07-2022' }, "09-2022" ) ).toEqual ( { startDate: '08-2022', length: 2, endDate: '09-2022' } )
    } )
    it ( "should set the date when length is defined, and start date is defined", () => {
      expect ( setEndDate ( { startDate: '07-2022', length: 2, endDate: '08-2022' }, "10-2022" ) ).toEqual ( { startDate: '9/2022', length: 2, endDate: '10-2022' } )
    } )
  } )
  describe ( "setLength", () => {
    it ( "should set the length when everything is undefined", () => {
      expect ( setLength ( {}, 0 ) ).toEqual ( { length: 0 } )
    } )
    it ( "should set the length when length is already defined", () => {
      expect ( setLength ( { length: 12 }, 2 ) ).toEqual ( { length: 2 } )
    } )
    it ( "should set the length when start date is defined ", () => {
      expect ( setLength ( { startDate: '08-2022' }, 0 ) ).toEqual ( { startDate: '08-2022', length: 0, endDate: '7/2022' } )
    } )
    it ( "should set the length when length is one, and end date is not defined", () => {
      expect ( setLength ( { startDate: '08-2022' }, 1 ) ).toEqual ( { startDate: '08-2022', length: 1, endDate: '8/2022' } )
    } )
    it ( "should set the length when length is two, and start date is not defined", () => {
      expect ( setLength ( { startDate: '08-2022' }, 2 ) ).toEqual ( { startDate: '08-2022', length: 2, endDate: '9/2022' } )
    } )
    it ( "should set the length when the start date is undefined and the end date is defined", () => {
      expect ( setLength ( { endDate: '09-2022' }, 0 ) ).toEqual ( { startDate: '8/2022', length: 0, endDate: '09-2022' } )
    } )
    it ( "should set the length when the start date is defined and the end date is defined", () => {
      expect ( setLength ( { startDate: '08-2022', length: 2, endDate: '11-2022' }, 1 ) ).toEqual ( { startDate: '08-2022', length: 1, endDate: '8/2022' } )
      expect ( setLength ( { startDate: '08-2022', length: 2, endDate: '11-2022' }, 2 ) ).toEqual ( { startDate: '08-2022', length: 2, endDate: '9/2022' } )
    } )
  } )
} )