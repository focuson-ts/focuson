import { acceptDate, DateInfo, errorsAnd, Holidays, parseDate, validateDateInfo } from "./LabelAndDateInput2";

interface StateForLabelAndStateInput2 {
  dateInfo?: DateInfo;
  theDate?: string
}
const okDateInfo: DateInfo = {
  holidays: [
    { date: '12/11/2022', jurisdiction: 'GB' },
    { date: '12/11/2022', jurisdiction: 'I' },
    { date: '15/11/2022', jurisdiction: 'GB' },
    { date: '17/11/2022', jurisdiction: 'I' },
  ],
  today: '7/11/2022',
}
const badDateInfo: DateInfo = {
  holidays: [
    { date: 'bad1', jurisdiction: 'GB' },
    { date: 'bad2', jurisdiction: 'I' },
  ],
  today: '7/11/2022',
}
const dateFormat = 'dd/MM/yyyy'
const nov7 = new Date ( '2022/11/7' ).toISOString () // need this so that the tests can run in different places
const nov12 = new Date ( '2022/11/12' ).toISOString ()
const nov15 = new Date ( '2022/11/15' ).toISOString ()
const nov17 = new Date ( '2022/11/17' ).toISOString ()

function date ( d: Date | string[] ) {
  if ( Array.isArray ( d ) ) throw Error ()
  return d
}
describe ( "parseDate", () => {
  it ( "should parse dates", () => {
    expect ( date ( parseDate ( 'somePrefix', 'dd/MM/yyyy' ) ( '7/11/2022' ) ).toISOString () ).toEqual ( nov7 )
    expect ( date ( parseDate ( 'somePrefix', 'yyyy/MM/dd' ) ( '2022/11/7' ) ).toISOString () ).toEqual ( nov7 )
  } )
  it ( "should handle non dates", () => {
    expect ( parseDate ( 'somePrefix', 'yyyy/MM/dd' ) ( 'someJunk' ) ).toEqual ( [ 'somePrefix Invalid date [someJunk]. Use yyyy/MM/dd' ] )
    expect ( parseDate ( 'somePrefix', 'dd/MM/yyyy' ) ( 'someJunk' ) ).toEqual ( [ 'somePrefix Invalid date [someJunk]. Use dd/MM/yyyy' ] )
  } )
} )

describe ( "validateDateInfo", () => {
  it ( "should turn strings into dates", () => {
    const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( dateFormat, okDateInfo ) ] )
    expect ( errors ).toHaveLength ( 0 )
    const { holidays, today } = dateInfo
    expect ( today.toISOString () ).toEqual ( nov7 )
    expect ( holidays.map ( ( { date, jurisdiction } ) => `${jurisdiction}:${date.toISOString ()}` ) ).toEqual ( [
      `GB:${nov12}`,
      `I:${nov12}`,
      `GB:${nov15}`,
      `I:${nov17}`
    ] )
  } )
  describe ( "should return issues", () => {
    it ( "should report issues with today", () => {
      const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( dateFormat, { ...okDateInfo, today: 'junk' } ) ] )
      expect ( errors ).toEqual ( [ "today Invalid date [junk]. Use dd/MM/yyyy" ] )
    } )
    it ( "should report issues with holidayDates", () => {
      const [ errors, [ dateInfo ] ] = errorsAnd ( [ validateDateInfo ( dateFormat, badDateInfo ) ] )
      expect ( errors ).toEqual ( [
        "holidays[0] Invalid date [bad1]. Use dd/MM/yyyy",
        "holidays[1] Invalid date [bad2]. Use dd/MM/yyyy"
      ] )
    } )
  } )
} )
//
// describe ( "acceptDate", () => {
//   describe ( "futureOk", () => {
//     it ( "should return empty errors if the date is in the future", () => {
//       const accept = acceptDate ( dateFormat, 'GB', okDateInfo ) ( { type: 'future', dateFormat } );
//       expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [] )
//       expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [ "is before first valid date" ] )
//       fail()
//       //add today
//     } )
//   } )
//   describe ( "pastOk", () => {
//     it ( "should return empty errors if the date is in the past", () => {
//       const accept = acceptDate ( dateFormat, 'GB', okDateInfo ) ( { type: 'past', dateFormat } );
//       expect ( accept ( new Date ( "2022/12/1" ) ) ).toEqual ( [ 'is in the future' ] )
//       expect ( accept ( new Date ( "2022/10/3" ) ) ).toEqual ( [] )
//       fail()
//       //add today
//     } )
//   } )
//   describe ( "weekendsOK", () => {
//     it ( "should return empty errors  no matter the date if 'allowsWeekends' is true", () => {
//       const accept = acceptDate ( dateFormat, 'GB', okDateInfo ) ( { type: 'future', dateFormat, allowsWeekends: true } );
//       expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
//       expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
//     } )
//     it ( "should return  errors  if a weekend if 'allowsWeekends' is false ", () => {
//       const accept = acceptDate ( dateFormat, 'GB', okDateInfo ) ( { type: 'future', dateFormat, allowsWeekends: false } );
//       expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
//       expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
//     } )
//     it ( "should default to allowsWeekends true", () => {
//       const accept = acceptDate ( dateFormat, 'GB', okDateInfo ) ( { type: 'future', dateFormat, allowsWeekends: undefined } );
//       expect ( accept ( new Date ( "2022/11/12" ) ) ).toEqual ( [] )
//       expect ( accept ( new Date ( "2022/11/8" ) ) ).toEqual ( [] )
//     } )
//   } )
// } )