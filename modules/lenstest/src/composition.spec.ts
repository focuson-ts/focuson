import { errorMonad, errorPromiseMonad } from "@focuson/utils";

describe ( "error monad", () => {
  it ( "call the functions in order", () => {
    expect ( errorMonad ( "start", false, ( s, e ) => "failed",
      [ 'one', s => s + ".1" ],
      [ 'two', s => s + ".2" ],
      [ 'three', s => s + ".3" ],
    ) ).toEqual ( 'start.1.2.3' )
  } )
  it ( "stop calling functions after an error occurs, return the results of the error handler", () => {
    expect ( errorMonad ( "start", false, ( s, e ) => s + "/" + e + "/failed",
      [ 'one', s => s + ".1" ],
      [ 'two', s => {throw Error ( 'someError' )} ],
      [ 'three', s => s + ".3" ],
    ) ).toEqual ( 'start.1/Error: someError/failed' )
  } )
} )

describe ( "error promise monad", () => {
  it ( "call the functions in order", async () => {
    expect ( await errorPromiseMonad ( ( s, e ) => "failed" ) ( "start", false,
        [ 'one', s => Promise.resolve ( s + ".1" ) ],
        [ 'two', s => Promise.resolve ( s + ".2" ) ],
        [ 'three', s => Promise.resolve ( s + ".3" ) ],
      )
    ).toEqual ( 'start.1.2.3' )
  } )
  it ( "stop calling functions after an error occurs, return the results of the error handler", async () => {
    expect ( await errorPromiseMonad ( ( s, e ) => s + "/" + e + "/failed" ) ( "start", false,
      [ 'one', s => Promise.resolve ( s + ".1" ) ],
      [ 'two', s => {throw Error ( 'someError' )} ],
      [ 'three', s => Promise.resolve ( s + ".3" ) ],
    ) ).toEqual ( 'start.1/Error: someError/failed' )
  } )
} )