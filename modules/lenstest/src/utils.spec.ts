import { beforeAfterSeparator, checkDates } from "@focuson-nw/utils";
import { DateCheck, insertBefore } from "../../utils/src/utils";


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

describe ( "check date", () => {
  const d1 = '2020/1/1'
  const d2 = '2020/2/2'
  const d3 = '2020/3/3'
  const d1Minuses = '2020-1-1'
  const d2Minuses = '2020-2-2'
  const d3Minuses = '2020-3-3'

  function check ( d1: any, d2: any, expectedLt: boolean, expectedLtEquals: boolean, expectedGtEquals: boolean, expectedGt: boolean ) {
    expect ( checkDates ( d1, d2, '<' ) ).toEqual ( expectedLt )
    expect ( checkDates ( d1, d2, '<=' ) ).toEqual ( expectedLtEquals )
    expect ( checkDates ( d1, d2, '>=' ) ).toEqual ( expectedGtEquals )
    expect ( checkDates ( d1, d2, '>' ) ).toEqual ( expectedGt )
  }
  it ( 'should check basic everything ok', () => {
    check ( d1, d1, false, true, true, false )
    check ( d1, d2, true, true, false, false )
    check ( d2, d1, false, false, true, true )
  } )
  it ( 'should check basic everything ok with minuses', () => {
    check ( d1Minuses, d1Minuses, false, true, true, false )
    check ( d1Minuses, d2Minuses, true, true, false, false )
    check ( d2Minuses, d1Minuses, false, false, true, true )
  } )
  it ( 'should return false with undefines', () => {
    check ( d1, undefined, false, false, false, false )
    check ( undefined, d1, false, false, false, false )
    check ( undefined, undefined, false, false, false, false )
  } )

  it ( 'should return false with null', () => {
    check ( d1, null, false, false, false, false )
    check ( null, d1, false, false, false, false )
    check ( null, null, false, false, false, false )
  } )
  it ( 'should return false with bad dates ... not enough parts', () => {
    check ( d1, 'junk', false, false, false, false )
    check ( 'junk', d1, false, false, false, false )
  } )
  it ( 'should return false with bad dates ... a part not a number', () => {
    check ( d1, 'asd/1/2', false, false, false, false )
    check ( d1, '1/asd/2', false, false, false, false )
    check ( d1, '1/1/asd', false, false, false, false )
  } )
} )
