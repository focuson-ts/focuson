import { mount, shallow } from "enzyme";
import { SelectedPage } from "@focuson-nw/pages";
import { dataDefinedState, emptyState, lensStateWith, PageSpecState, rootState } from "./page.fixture";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { PageMode } from "@focuson-nw/utils";


enzymeSetup ()

let view: PageMode = 'view';

const nothingDisplayed: PageSpecState = { ...emptyState, messages: [], pageSelection: [ { pageName: 'nothing', pageMode: view, time: 'now' } ] };

describe ( "selectedPage", () => {
  // it ( "should display zero pages", () => {
  //   const state = lensState<PageSpecState, ContextForTest> ( rootState, () => {}, 'displayMain / focusedPage', context )
  //   const comp = shallow ( <SelectedPage state={state}/> )
  //   // expect ( comp.html () ).toEqual ( '' )
  //   expect ( comp.text () ).toEqual ( "" )
  // } )

  it ( "should display one page", () => {
    const state = lensStateWith ( dataDefinedState, () => {}, [ 'firstPage', 'edit', undefined ] )
    const comp = mount ( <SelectedPage state={state}/> )
    expect ( comp.html () ).toEqual ( "<div class=\"combine\"><div class=\"focus-page\"><div id=\"default_template\">" +
      "<h1>[firstPageTitle]:</h1>" +
      "<p>firstPage[one]/edit</p>" +
      "</div></div></div>" )
  } )

  it ( "should display two pages", () => {
    const state = lensStateWith ( dataDefinedState, () => {}, [ 'firstPage', 'edit', undefined ], [ 'secondPage', 'view', undefined ] )
    const comp = shallow ( <SelectedPage state={state}/> )
    // expect ( comp.html () ).toEqual ( '' )
    expect ( comp.html () ).toEqual ( '<div class="combine"><div class="focus-page"><div id="default_template">' +
      '<h1>[firstPageTitle]:</h1>' +
      '<p>firstPage[one]/edit</p></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[secondPageTitle]:</h1>' +
      '<p>secondPage[two]/view</p></div></div></div>' )
  } )

  it ( "should display three pages", () => {
    const state = lensStateWith ( dataDefinedState, () => {}, [ 'firstPage', 'edit', undefined ], [ 'secondPage', 'view', undefined ], [ 'modalData', 'edit', undefined ] )
    const comp = shallow ( <SelectedPage state={state}/> )
    // expect ( comp.html () ).toEqual ( '' )
    expect ( comp.html () ).toEqual (
      '<div class="combine"><div class="focus-page"><div id="default_template">' +
      '<h1>[firstPageTitle]:</h1>' +
      '<p>firstPage[one]/edit</p></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[secondPageTitle]:</h1>' +
      '<p>secondPage[two]/view</p></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[modalDataTitle]:</h1>' +
      '<p>modalData[x]/edit</p></div></div></div>' )
  } )

  it ( "shouldbe using the combine for multiple pages", () => {
    const state = lensStateWith ( dataDefinedState, () => {}, [ 'firstPage', 'edit', undefined ], [ 'secondPage', 'view', undefined ], [ 'modalData', 'edit', undefined ] )
    const comp = shallow ( <SelectedPage state={state}/> )
    expect ( comp.find ( '.combine' ).length ).toEqual ( 1 )

  } )
  it ( "display loading when no data", () => {
    const state = lensStateWith ( rootState, () => {}, [ 'firstPage', 'edit', undefined ], [ 'secondPage', 'view', undefined ], [ 'modalData', 'edit', undefined ] )
    const comp = shallow ( <SelectedPage state={state}/> )
    expect ( comp.html () ).toEqual ( '<div class="combine">' +
      '<div class="focus-page"><div id="default_template"><h1>[firstPageTitle]:</h1>' +
      '<div><p>Loading</p><span class="tooltip-wrap">' +
      '<button class="button" id="loading.cancel" aria-errormessage="loading.cancel.error" aria-invalid="false">Cancel </button>' +
      '<ul hidden="" class="errormessage tooltip" id="loading.cancel.error"></ul></span></div></div></div><div class="focus-page">' +
      '<div id="default_template"><h1>[secondPageTitle]:</h1><div><p>Loading</p>' +
      '<span class="tooltip-wrap"><button class="button" id="loading.cancel" aria-errormessage="loading.cancel.error" aria-invalid="false">Cancel </button>' +
      '<ul hidden="" class="errormessage tooltip" id="loading.cancel.error"></ul></span></div></div></div>' +
      '<div class="focus-page"><div id="default_template">' +
      '<h1>[modalDataTitle]:</h1><p>modalData[x]/edit</p></div></div></div>' )

  } )
} )

