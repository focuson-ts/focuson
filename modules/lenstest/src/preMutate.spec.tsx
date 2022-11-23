//** This clears up the state if it is the first time something is called */
import { preMutateForPages } from "@focuson/pages";
import { context, ContextForTest, emptyState, firstPageSelectedState, invalidPageState, PageSpecState, rootState, stateWith, stateWithFirstTimes } from "./page.fixture";
import { makeProcessorsConfig } from "@focuson/focuson";
import { PageMode } from "@focuson/utils";


const config = makeProcessorsConfig ( firstPageSelectedState, context )
const preMutate = preMutateForPages<PageSpecState, ContextForTest> ( context, config )

let viewPageMode: PageMode = "view";

describe ( "preMutateForPages", () => {
  it ( "should throw an error if the page is not valid", () => {
    expect ( () =>
      preMutate ( invalidPageState ) ).toThrow ( 'Could not find details for unknownpage. LegalValues are firstPage,clearAtStart,init,secondPage,modalData,error' )
  } )

  it ( "should return the state if firstTime not true", () => {
    expect ( preMutate ( firstPageSelectedState ) ).toEqual ( firstPageSelectedState )
  } )

  it ( "should not clear the state if first time is false", () => {
    expect ( preMutate ( { ...stateWith ( rootState, [ 'clearAtStart', 'view', undefined ] ), firstPage: 'data' } ) ).toEqual ( {
      "messages": [],
      "pageSelection": [ { "pageMode": "view", "pageName": "clearAtStart", "time": "now", } ],
      "tags": {},
      restCommands: [],
      firstPage: 'data',
      "tempData": "x"
    } )
  } )

  it ( "should clear the firstTime, and clear the domain, if firstTime true, and clearAtStart is true", () => {
    expect ( preMutate ( stateWithFirstTimes ( rootState, [ 'clearAtStart', 'view', undefined ] ) ) )
      .toEqual ( {
        "messages": [],
        firstPage: undefined,
        restCommands: [],
        "pageSelection": [ { "firstTime": false, "pageMode": "view", "pageName": "clearAtStart", "time": "now", } ],
        "tags": {},
        "tempData": "x"
      } )
  } )

  it ( "should clear the firstTime, and set the domain to the initial value, if firstTime true, and initialValue is defined", () => {
    expect ( preMutate ( { ...stateWithFirstTimes ( rootState, [ 'init', 'view', undefined ] ), firstPage: "some Data" } ) )
      .toEqual ( {
        "firstPage": "Initial Value",
        "messages": [],
        restCommands: [],
        "pageSelection": [ { "firstTime": false, "pageMode": "view", "pageName": "init", "time": "now", } ],
        "tags": {},
        "tempData": "x"
      } )
  } )
  it ( "should not set the domain to the initial value, if firstTime is false, and initialValue is defined", () => {
    expect ( preMutate ( { ...stateWith ( rootState, [ 'init', 'view', undefined ] ), firstPage: "some Data" } ) )
      .toEqual ( {
        "firstPage": "some Data",
        "messages": [],
        restCommands: [],
        "pageSelection": [ { "pageMode": "view", "pageName": "init", "time": "now", } ],
        "tags": {},
        "tempData": "x"
      } )
  } )


  it ( "should throw an error if first time is true and both clearAtStart and initialValue are set", () => {
    expect ( () => preMutate ( stateWithFirstTimes ( rootState, [ 'error', 'view', undefined ] ) ) ).toThrow ( 'page error has both clear at start and initialValue set' )
  } )

} )
