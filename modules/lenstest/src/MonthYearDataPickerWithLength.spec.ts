import { addDate } from "@focuson/utils";

describe ( "addDate", () => {
  it ( "should return the original date if we have funny values", () => {
    expect ( addDate ( false, undefined, 10, false ) ).toEqual ( undefined )
    expect ( addDate ( false, '', 10, false ) ).toEqual ( '' )
    expect ( addDate ( false, 'xx', 10, false ) ).toEqual ( 'xx' )
    expect ( addDate ( false, '12', 10, false ) ).toEqual ( '12' )
  } )

  it ( 'should add months with /', () => {
    expect ( addDate ( false, '01/2012', 10, false ) ).toEqual ( '11/2012' )
    expect ( addDate ( false, '1/2012', 10, false ) ).toEqual ( '11/2012' )
    expect ( addDate ( false, '12/2012', 10, false ) ).toEqual ( '10/2013' )
  } )
  it ( 'should add months with -', () => {
    expect ( addDate ( false, '01-2012', 10, false ) ).toEqual ( '11/2012' )
    expect ( addDate ( false, '1-2012', 10, false ) ).toEqual ( '11/2012' )
    expect ( addDate ( false, '12-2012', 10, false ) ).toEqual ( '10/2013' )
  } )
} )