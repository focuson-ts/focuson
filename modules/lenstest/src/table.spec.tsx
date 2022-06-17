import { lensState, LensState } from "@focuson/state";
import { shallow } from "enzyme";
import { ModalButtonStateForTest } from "./modalButton.integration.spec";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { getValue, Table } from "@focuson/form_components";
import { findJoiner, safeArray } from "@focuson/utils";

enzymeSetup ()

type Context = {}
interface TableContents {
  a: number;
  b: string;
  c?: { d: number, e: number };
}
interface TableStateForTest {
  contents?: TableContents[];
  selected?: number;
  item?: TableContents
  filter?: string
}
interface SortCode {
  one: number;
  two: number;
  three: number;
}

function displayAndGetTable ( s: TableStateForTest, setMain: ( s: TableStateForTest ) => void, fn: ( s: LensState<TableStateForTest, TableStateForTest, Context> ) => JSX.Element ) {
  return shallow ( fn ( lensState<TableStateForTest, Context> ( s, setMain, 'ModalButton', {} ) ) )
}

describe ( "Table", () => {
  describe ( "'findJoiner'", () => {
    it ( "should find the joiner for a name", () => {
      expect ( findJoiner ( 'c', undefined ) ).toEqual ( ',' )
      expect ( findJoiner ( 'c', 'x' ) ).toEqual ( 'x' )
      expect ( findJoiner ( 'c', [] ) ).toEqual ( ',' )
      expect ( findJoiner ( 'c', [ 'a:1', 'b:2', 'c:3' ] ) ).toEqual ( '3' )
    } )
  } )

  describe ( "getValue", () => {
    it ( "should getValue", () => {
      expect ( getValue<TableContents> ( 'a', safeArray ( twoRows.contents )[ 0 ], '-' ) ).toEqual ( 1 )
      expect ( getValue<TableContents> ( 'b', safeArray ( twoRows.contents )[ 0 ], '-' ) ).toEqual ( "one" )
      expect ( getValue<TableContents> ( 'c', safeArray ( twoRowsWithC.contents )[ 0 ], '-' ) ).toEqual ( "3-4" )
    } )
  } )

  describe ( "empty table", () => {
    it ( "should render an empty with no selected", () => {
      const table = displayAndGetTable ( {}, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'></tbody></table>" )
    } )
    it ( "should render an empty with no selected and a title", () => {
      const table = displayAndGetTable ( {}, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' tableTitle='The title'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<h2>The title</h2><table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'></tbody></table>" )
    } )
    it ( "should render an empty with no selected and an emptyData", () => {
      const table = displayAndGetTable ( {}, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' emptyData='No Data' /> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead>" +
        "<tbody class='grid-sub'><tr id='id[0]'><td colSpan='102'>No Data</td></tr></tbody></table>" )
    } )
    it ( "should render an empty with  selected", () => {
      const table = displayAndGetTable ( {}, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'></tbody></table>" )
    } )
  } )

  let twoRows: TableStateForTest = { contents: [ { a: 1, b: 'one' }, { a: 2, b: 'two' } ] };
  let twoRowsWithC: TableStateForTest = { contents: [ { a: 1, b: 'one', c: { d: 3, e: 4 } }, { a: 2, b: 'two', c: { d: 5, e: 6 } } ] };
  let twoRowsS0 = { ...twoRows, selected: 0 };
  let twoRowsS1 = { ...twoRows, selected: 1 };
  describe ( "table without selected", () => {
    it ( "should render order a, b", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td></tr><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )
    it ( "should render order a, b, c and use the joiner, when joiner is a string", () => {
      const table = displayAndGetTable ( twoRowsWithC, s => {}, s => <Table order={[ 'a', 'b', 'c' ]} joiners='-' state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td><td id='id[0].c'>3-4</td></tr><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td><td id='id[1].c'>5-6</td></tr></tbody></table>" )
    } )

    it ( "should still display when data is 'undefined'", () => {
      let damagedData : any = { contents: [ { a: 1 }, { b: 'two' } ] };
      const table = displayAndGetTable ( damagedData, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'></td></tr><tr id='id[1]'><td id='id[1].a'></td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )
    it ( "should still display when data is  null ", () => {
      let damagedData : any = { contents: [ { a: 1, b: null }, { a: null,b: 'two' } ] };
      const table = displayAndGetTable ( damagedData, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'></td></tr><tr id='id[1]'><td id='id[1].a'></td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )

    it ( "should render order a, b, c and use the joiner, when joiner is a string[]", () => {
      const table = displayAndGetTable ( twoRowsWithC, s => {}, s => <Table order={[ 'a', 'b', 'c' ]} joiners={[ 'c:*' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td><td id='id[0].c'>3*4</td></tr><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td><td id='id[1].c'>5*6</td></tr></tbody></table>" )
    } )



    it ( "should render order b,a", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should do nothing when selected", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {throw Error ( 'should not be called' )}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id'/> )
      const rows = table.find ( "tr" )
      expect ( rows.length ).toEqual ( 3 )
      rows.at ( 1 ).simulate ( "click" )
    } )
  } )


  describe ( "table with filter", () => {
    it ( "should render normally IF there filterPrefix and column are set but no value for the filter in the data", () => {
      const table = displayAndGetTable ( twoRowsWithC, s => {}, s =>
        <Table order={[ 'a', 'b', 'c' ]} joiners='-' prefixColumn='a' prefixFilter={s.focusOn ( 'filter' )} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td><td id='id[0].c'>3-4</td></tr><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td><td id='id[1].c'>5-6</td></tr></tbody></table>" )
    } )
    it ( "should filter by the parameters if the filterPrefix and column are set, when the parameter is a string", () => {
      const table = displayAndGetTable ( { ...twoRowsWithC, filter: 'o' }, s => {}, s =>
        <Table order={[ 'a', 'b', 'c' ]} joiners='-' prefixColumn='b' prefixFilter={s.focusOn ( 'filter' )} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td><td id='id[0].c'>3-4</td></tr></tbody></table>" )

    } )
    it ( "should filter by the parameters if the filterPrefix and column are set, when the parameter is an object", () => {
      const table = displayAndGetTable ( { ...twoRowsWithC, filter: '5-' }, s => {}, s =>
        <Table order={[ 'a', 'b', 'c' ]} joiners='-' prefixColumn='c' prefixFilter={s.focusOn ( 'filter' )} state={s.focusOn ( 'contents' )} id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td><td id='id[1].c'>5-6</td></tr></tbody></table>" )

    } )
  } )

  describe ( "table with maxCount", () => {
    it ( "should obey the maxcount when that is zero", () => {
      const table = displayAndGetTable ( twoRowsWithC, s => {}, s =>
        <Table order={[ 'a', 'b', 'c' ]} joiners='-' state={s.focusOn ( 'contents' )} maxCount='0' id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'></tbody></table>" )

    } )
    it ( "should obey the maxcount when that is one", () => {
      const table = displayAndGetTable ( twoRowsWithC, s => {}, s =>
        <Table order={[ 'a', 'b', 'c' ]} joiners='-' state={s.focusOn ( 'contents' )} maxCount='1' id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td><td id='id[0].c'>3-4</td></tr></tbody></table>" )

    } )
    it ( "should obey the max count when that is more than the data", () => {
      const table = displayAndGetTable ( twoRowsWithC, s => {}, s =>
        <Table order={[ 'a', 'b', 'c' ]} joiners='-' state={s.focusOn ( 'contents' )} maxCount='10' id='id'/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual (
        "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th><th id='id.th[2]'>C</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td><td id='id[0].c'>3-4</td></tr><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td><td id='id[1].c'>5-6</td></tr></tbody></table>" )
    } )
  } )

  describe ( "table with copySelectedIndexTo", () => {
    it ( "should render  nothing selected", () => {
      const table = displayAndGetTable ( twoRows, s => {}, s => <Table order={[ 'a', 'b' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td></tr><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )
    it ( "should render 0 selected", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody class='grid-sub'><tr id='id[0]' class='grid-selected'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should render 1 selected", () => {
      const table = displayAndGetTable ( twoRowsS1, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedIndexTo={s.focusOn ( 'selected' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]' class='grid-selected'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
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
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>A</th><th id='id.th[1]'>B</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].a'>1</td><td id='id[0].b'>one</td></tr><tr id='id[1]'><td id='id[1].a'>2</td><td id='id[1].b'>two</td></tr></tbody></table>" )
    } )
    it ( "should render 0 selected", () => {
      const table = displayAndGetTable ( twoRowsS0, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedItemTo={s.focusOn ( 'item' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
    } )
    it ( "should render 1 selected", () => {
      const table = displayAndGetTable ( twoRowsS1, s => {}, s => <Table order={[ 'b', 'a' ]} state={s.focusOn ( 'contents' )} id='id' copySelectedItemTo={s.focusOn ( 'item' )}/> )
      expect ( table.html ().replace ( /"/g, "'" ) ).toEqual ( "<table id='id' class='grid'><thead><tr><th id='id.th[0]'>B</th><th id='id.th[1]'>A</th></tr></thead><tbody class='grid-sub'><tr id='id[0]'><td id='id[0].b'>one</td><td id='id[0].a'>1</td></tr><tr id='id[1]'><td id='id[1].b'>two</td><td id='id[1].a'>2</td></tr></tbody></table>" )
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