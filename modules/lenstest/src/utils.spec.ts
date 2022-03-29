import { beforeAfterSeparator } from "@focuson/utils";
import { insertBefore } from "../../utils/src/utils";


describe ( "beforeAfterSeparator", () => {
  it ( "should split the string in two", () => {
    expect ( beforeAfterSeparator ( "?", "/a/b?a=1" ) ).toEqual ( [ '/a/b', 'a=1' ] )
    expect ( beforeAfterSeparator ( "?", "/a/b?" ) ).toEqual ( [ '/a/b', '' ] )
    expect ( beforeAfterSeparator ( "?", "/a/b" ) ).toEqual ( [ '/a/b', '' ] )
  } )
} )
describe ( "insertAfter", () => {
  it ( "should insert a string before the separator", () => {
    expect ( insertBefore ( "?", "here", "/a/b?a=1" ) ).toEqual ( '/a/bhere?a=1' )
    expect ( insertBefore ( "?", "here", "/a/b?" ) ).toEqual ( '/a/bhere?' )
    expect ( insertBefore ( "?", "here", "/a/b" ) ).toEqual ( '/a/bhere?' )
  } )
} )