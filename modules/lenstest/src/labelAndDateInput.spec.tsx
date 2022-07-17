import { parseDate } from "@focuson/form_components";


const firstMay2020 = new Date ( '2020/05/01' )

describe ( "parseDate", () => {
  it ( "should parse yyyy/MM/dd", () => {
    expect ( parseDate ('prefix', 'yyyy/MM/dd' ) ( '2020/05/01' ) ).toEqual ( firstMay2020 )
    expect ( parseDate ( 'prefix','yyyy/MM/dd' ) ( '2020-05-01' ) ).toEqual ( firstMay2020 )
  } )
  it ( "should parse yyyy-MM-dd", () => {
    expect ( parseDate ( 'prefix','yyyy-MM-dd' ) ( '2020-05-01' ) ).toEqual ( firstMay2020 )
    expect ( parseDate ( 'prefix','yyyy-MM-dd' ) ( '2020-05-01' ) ).toEqual ( firstMay2020 )
  } )
  it ( "should parse dd/yyyy/MM", () => {
    expect ( parseDate ( 'prefix','dd/yyyy-MM' ) ( '01-2020-05' ) ).toEqual ( firstMay2020 )
    expect ( parseDate ( 'prefix','dd/yyyy-MM' ) ( '01/2020/05' ) ).toEqual ( firstMay2020 )
  } )
  it ( "should parse dd-yyyy-MM", () => {
    expect ( parseDate ( 'prefix','dd-yyyy-MM' ) ( '01-2020-05' ) ).toEqual ( firstMay2020 )
    expect ( parseDate ( 'prefix','dd-yyyy-MM' ) ( '01-2020-05' ) ).toEqual ( firstMay2020 )
  } )
  it ( "should parse dd/MM/yyyy", () => {
    expect ( parseDate ( 'prefix','dd-MM-yyyy' ) ( '01-05-2020' ) ).toEqual ( firstMay2020 )
    expect ( parseDate ( 'prefix','dd-MM-yyyy' ) ( '01/05/2020' ) ).toEqual ( firstMay2020 )
  } )
} )