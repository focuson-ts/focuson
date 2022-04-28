import { lensState, LensState } from "@focuson/state";
import { shallow } from "enzyme";
import { ModalButtonStateForTest } from "./modalButton.integration.spec";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { Table } from "@focuson/form_components";

enzymeSetup ()

type Context = {}
interface TableContents {
  a: number;
  b: string;
}
interface TableStateForTest {
  contents?: TableContents[];
  selected?: number;
  item?: TableContents
}

function displayAndGetTable ( s: TableStateForTest, setMain: ( s: TableStateForTest ) => void, fn: ( s: LensState<TableStateForTest, TableStateForTest, Context> ) => JSX.Element ) {
  return shallow ( fn ( lensState<TableStateForTest, Context> ( s, setMain, 'ModalButton', {} ) ) )
}

describe ( "Table", () => {
  describe ( "empty table", () => {
    it ( "should render an empty with no selected", () => {
      const table = displayAndGetTable ( {}, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody></tbody></table>" )
    } )
    it ( "should render an empty with  selected", () => {
      const table = displayAndGetTable ( {}, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody></tbody></table>" )
    } )
  } )

  let twoRows = { contents: [ { a: 1, b: 'one' }, { a: 2, b: 'two' } ] };
  let twoRowsS0 = { ...twoRows, selected: 0 };
  let twoRowsS1 = { ...twoRows, selected: 1 };
  describe ( "table without selected", () => {
    it ( "should render order a, b", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'>" +
        "<thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead>" +
        "<tbody><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td></tr>" +
        "<tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )
    it ( "should render order b,a", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should do nothing when selected", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {throw Error ( 'should not be called' )}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      const rows = table.find ( "tr" )
      expect ( rows.length ).toEqual ( 3 )
      rows.at ( 1 ).simulate ( "click" )
    } )
  } )
  describe ( "table with copySelectedIndexTo", () => {
    it ( "should render  nothing selected", () => {
      const table = displayAndGetTable ( twoRows, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'>" +
        "<thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead>" +
        "<tbody><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td></tr>" +
        "<tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )
    it ( "should render 0 selected", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody><tr id='id[0]' class='bg-primary'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should render 1 selected", () => {
      const table = displayAndGetTable ( twoRowsS1, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]' class='bg-primary'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should change the selected when clicked", () => {
      var remembered: any = undefined
      const table = displayAndGetTable ( twoRowsS0, s => remembered = s, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      const rows = table.find ( "tr" )
      expect ( rows.length ).toEqual ( 3 )
      rows.at ( 1 ).simulate ( "click" )
      expect ( remembered ).toEqual ( { "contents": [ { "a": 1, "b": "one" }, { "a": 2, "b": "two" } ], "selected": 0 } )
      rows.at ( 2 ).simulate ( "click" )
      expect ( remembered ).toEqual ( { "contents": [ { "a": 1, "b": "one" }, { "a": 2, "b": "two" } ], "selected": 1 } )
    } )
  } )
  describe ( "table with copySelectedItemTo", () => {
    it ( "should render  nothing selected", () => {
      const table = displayAndGetTable ( twoRows, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedItemTo={s.focusOn ( 'item' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'>" +
        "<thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead>" +
        "<tbody><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td></tr>" +
        "<tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )
    it ( "should render 0 selected", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedItemTo={s.focusOn ( 'item' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should render 1 selected", () => {
      const table = displayAndGetTable ( twoRowsS1, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedItemTo={s.focusOn ( 'item' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should change the item when selected", () => {
      var remembered: any = undefined
      const table = displayAndGetTable ( twoRowsS0, s => remembered = s, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedItemTo={s.focusOn ( 'item' )}/> )
      const rows = table.find ( "tr" )
      expect ( rows.length ).toEqual ( 3 )
      rows.at ( 1 ).simulate ( "click" )
      expect ( remembered ).toEqual ( { "contents": [ { "a": 1, "b": "one" }, { "a": 2, "b": "two" } ], "selected": 0, item: { a: 1, b: 'one' } } )
      rows.at ( 2 ).simulate ( "click" )
      expect ( remembered ).toEqual ( { "contents": [ { "a": 1, "b": "one" }, { "a": 2, "b": "two" } ], "selected": 0, item: { a: 2, b: 'two' } } )
    } )
  } )
  describe ( "table with copySelectedItemTo and copySelectedIndexTo", () => {
    it ( "should change the item and index when selected", () => {
      var remembered: any = undefined
      const table = displayAndGetTable ( twoRowsS0, s => remembered = s, s =>
        <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )} copySelectedItemTo={s.focusOn ( 'item' )}/> )
      const rows = table.find ( "tr" )
      expect ( rows.length ).toEqual ( 3 )
      rows.at ( 1 ).simulate ( "click" )
      expect ( remembered ).toEqual ( { "contents": [ { "a": 1, "b": "one" }, { "a": 2, "b": "two" } ], "selected": 0, item: { a: 1, b: 'one' } } )
      rows.at ( 2 ).simulate ( "click" )
      expect ( remembered ).toEqual ( { "contents": [ { "a": 1, "b": "one" }, { "a": 2, "b": "two" } ], "selected": 1, item: { a: 2, b: 'two' } } )
    } )
  } )
} )