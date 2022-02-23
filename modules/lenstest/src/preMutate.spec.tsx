//** This clears up the state if it is the first time something is called */
import { HasPageSelection, HasSimpleMessages, PageMode, pageSelectionlens } from "@focuson/pages";
import { preMutateForPages } from "@focuson/pages";
import { ContextForTest, ModalDetails, pageDetails, PageDetails, PageSpecState } from "./page.fixture";


const preMutate = preMutateForPages<PageSpecState, PageDetails, ModalDetails,ContextForTest> ( pageDetails, pageSelectionlens () )

let viewPageMode: PageMode = "view";
let invalidPageName: HasPageSelection & HasSimpleMessages = { pageSelection: { pageName: 'asd', firstTime: true, pageMode: viewPageMode }, messages: [] };
let nothingStateFirst = { pageSelection: { pageName: 'nothing', firstTime: true, pageMode: viewPageMode }, messages: [] };
let nothingStateNotFirst = { pageSelection: { pageName: 'nothing', "firstTime": false, pageMode: viewPageMode }, messages: [] };

describe ( "preMutateForPages", () => {
  it ( "should throw an error if the page is not valid", () => {
    expect ( () => preMutate ( invalidPageName ) ).toThrow ( 'Could not find details for asd. LegalValues are nothing,clearAtStart,initialValue' )
  } )

  it ( "should return the state if firstTime not true", () => {
    let state = { pageSelection: { pageName: 'clearAtStart', pageMode: viewPageMode }, messages: [], someData: "oldData" };
    expect ( preMutate ( state ) ).toEqual ( state )
  } )

  it ( "should clear the firstTime, if firstTime true, and no 'mutate state' effects are present", () => {
    expect ( preMutate ( { pageSelection: { pageName: 'nothing', firstTime: true, pageMode: viewPageMode }, messages: [], someData: "oldData" } ) )
      .toEqual ( { pageSelection: { pageName: 'nothing', firstTime: false, pageMode: viewPageMode }, messages: [], someData: "oldData" } )
  } )

  it ( "should clear the firstTime, and clear the domain, if firstTime true, and clearAtStart is true", () => {
    expect ( preMutate ( { pageSelection: { pageName: 'clearAtStart', firstTime: true, pageMode: viewPageMode }, messages: [], someData: "oldData" } ) )
      .toEqual ( {
        "messages": [],
        "pageSelection": {
          "firstTime": false,
          "pageMode": "view",
          "pageName": "clearAtStart"
        }
      } )
  } )

  it ( "should clear the firstTime, and set the domain to the initial value, if firstTime true, and initialValue is defined", () => {
    expect ( preMutate ( { pageSelection: { pageName: 'initialValue', firstTime: true, pageMode: viewPageMode }, messages: [] } ) )
      .toEqual ( {
        "pageSelection": { "firstTime": false, "pageName": "initialValue", "pageMode": "view" },
        "messages": [],

        "someData": "someValue"
      } )
  } )


  it ( "should throw an error if first time is true and both clearAtStart and initialValue are set", () => {
    expect ( () => preMutate ( { pageSelection: { pageName: 'error', firstTime: true, pageMode: viewPageMode }, messages: [] } ) ).toThrow ( 'page error has both clear at start and initialValue set' )
  } )

} )