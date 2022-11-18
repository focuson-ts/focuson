import { after, isSameDay } from "@focuson/utils";

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

describe('after', () =>{
  it ("should return true if the date is after the hh:mm text string", () =>{
     // expect(after(new Date(Date.parse('04 Nov 2022 00:12:00 GMT')), '10:15' )).toEqual(false)
     // expect(after(new Date(Date.parse('04 Nov 2022 09:14:00 GMT')), '10:15' )).toEqual(false)
    const d = new Date(Date.parse('04 Nov 2022 10:14:00 GMT'));
    expect(after(d, '10:15' )).toEqual(false)
     expect(after(new Date(Date.parse('04 Nov 2022 10:15:00 GMT')), '10:15' )).toEqual(true)
     expect(after(new Date(Date.parse('04 Nov 2022 10:16:00 GMT')), '10:15' )).toEqual(true)
     expect(after(new Date(Date.parse('04 Nov 2022 11:16:00 GMT')), '10:15' )).toEqual(true)
  })
  it ("should return false if the date is garbage", () =>{

  })


})