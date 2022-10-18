//Copyright (c)2020-2022 Philip Rice. <br />Permission is hereby granted, free of charge, to any person obtaining a copyof this software and associated documentation files (the Software), to dealin the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:  <br />The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. THE SOFTWARE IS PROVIDED AS
import { identityOptics, Lens, Lenses, Optional, transformTwoValues } from "@focuson/lens";
import { a1b2ca3, dragon, Dragon, dragon2, letnstoca, list123, Stomach } from "./LensFixture";
import { areAllDefined, arraysEqual, NameAnd } from "@focuson/utils";


describe ( "Lens", () => {
  describe ( "identity", () => {
    let lens: Lens<any, any> = Lenses.identity ()
    it ( "should return the same", () => {
      expect ( lens.get ( a1b2ca3 ) ).toBe ( a1b2ca3 )
    } )
    it ( "should create the new value", () => {
      expect ( lens.set ( a1b2ca3, "newValue" ) ).toBe ( "newValue" )
    } )
    it ( "should have a description = identity", () => {
      expect ( lens.description ).toEqual ( 'I' )
    } )
  } )
  describe ( "nth", () => {
    it ( "should allow access to nth item", () => {
      expect ( Lenses.nth ( 0 ).getOption ( list123 ) ).toBe ( 1 )
      expect ( Lenses.nth ( 1 ).getOption ( list123 ) ).toBe ( 2 )
      expect ( Lenses.nth ( 2 ).getOption ( list123 ) ).toBe ( 3 )
    } )

    it ( "should set the nth item", () => {
      expect ( Lenses.nth ( 0 ).set ( list123, 4 ) ).toEqual ( [ 4, 2, 3 ] )
      expect ( Lenses.nth ( 1 ).set ( list123, 4 ) ).toEqual ( [ 1, 4, 3 ] )
      expect ( Lenses.nth ( 2 ).set ( list123, 4 ) ).toEqual ( [ 1, 2, 4 ] )
    } )
  } )


  describe ( "lens composition", () => {
    expect ( letnstoca.getOption ( a1b2ca3 ) ).toEqual ( 3 )
    expect ( letnstoca.set ( a1b2ca3, 9 ) ).toEqual ( { a: 1, b: 2, c: { a: 9 } } )
    expect ( letnstoca.transform ( old => {
      expect ( old ).toEqual ( 3 );
      return 9
    } ) ( a1b2ca3 ) ).toEqual ( { a: 1, b: 2, c: { a: 9 } } )
    expect ( letnstoca.description ).toEqual ( 'toC.chain(toa)' )
  } )
  describe ( "'then' should use the field names", () => {
    let dragonStomachL: Lens<Dragon, Stomach> = Lenses.build<Dragon> ( 'dragon' ).focusOn ( 'body' ).focusOn ( 'chest' ).focusOn ( 'stomach' )
    let contentL = dragonStomachL.focusOn ( 'contents' )
    it ( "allow chained focusOn", () => {
      expect ( dragonStomachL.get ( dragon ) ).toEqual ( ({ contents: [ 'the adventurer' ] }) )
      expect ( contentL.transform ( old => [ ...old, 'moreGoodness' ] ) ( dragon ) ).toEqual ( dragon2 )
      //and nothing should have changed
      expect ( dragonStomachL.get ( dragon ) ).toEqual ( ({ contents: [ 'the adventurer' ] }) )

    } )
    it ( 'should have a nice description', () => {
      expect ( dragonStomachL.description ).toEqual ( "dragon.focusOn(body).focusOn(chest).focusOn(stomach)" )
    } )
  } )
  describe ( "lens.last", () => {
    let abc = [ 'a', 'b', 'c' ];
    it ( "should access the last item", () => {
      expect ( Lenses.last ().getOption ( abc ) ).toEqual ( 'c' )
      expect ( Lenses.last ().setOption ( abc, 'd' ) ).toEqual ( [ 'a', 'b', 'd' ] )
    } )
  } )
  describe ( "lens.append", () => {
    let abc = [ 'a', 'b', 'c' ];
    it ( "should access the last item", () => {
      expect ( Lenses.append ().getOption ( abc ) ).toEqual ( undefined )
      expect ( Lenses.append ().setOption ( abc, 'd' ) ).toEqual ( [ 'a', 'b', 'c', 'd' ] )
    } )
  } )
  describe ( "lens.nth", () => {
    let abc = [ 'a', 'b', 'c' ];
    it ( "should throw exception with negative length", () => {
      expect ( () => Lenses.nth<string> ( -1 ) ).toThrow ( 'Cannot give Lens.nth a negative n [-1]' )
    } )
    it ( "should have a description", () => {
      expect ( Lenses.nth ( 0 ).description ).toEqual ( '[0]' )
      expect ( Lenses.nth ( 5 ).description ).toEqual ( '[5]' )
    } )
    describe ( "getOption", () => {
      it ( "should  getOption", () => {
        expect ( Lenses.nth<string> ( 0 ).getOption ( abc ) ).toEqual ( 'a' )
        expect ( Lenses.nth<string> ( 1 ).getOption ( abc ) ).toEqual ( 'b' )
        expect ( Lenses.nth<string> ( 2 ).getOption ( abc ) ).toEqual ( 'c' )
      } )
      it ( "should  return undefined if out of range", () => {
        expect ( Lenses.nth<string> ( 4 ).getOption ( abc ) ).toEqual ( undefined )
      } )
    } )
    describe ( "set", () => {
      it ( "should create new with data inserted", () => {
        expect ( Lenses.nth<string> ( 1 ).set ( abc, 'd' ) ).toEqual ( [ "a", "d", "c" ] )
        expect ( abc ).toEqual ( [ 'a', 'b', 'c' ] )
      } )
      it ( "should set if n is too big", () => {
        expect ( Lenses.nth<string> ( 4 ).set ( abc, 'd' ) ).toEqual (
          [ "a", "b", "c", undefined, "d" ] )
      } )
    } )

  } )

  describe ( "map", () => {
    it ( "should pass existing value to a fn and use the result", () => {
      expect ( letnstoca.map ( a1b2ca3, old => old + 1 ) ).toEqual ( { "a": 1, "b": 2, "c": { "a": 4 } } )
    } )
    it ( "should work even if the original was undefined", () => {
        expect ( letnstoca.map ( { ...a1b2ca3, c: undefined }, old => 4 ) ).toEqual ( { "a": 1, "b": 2, "c": { "a": 4 } } )
      }
    )

  } )

  describe ( "lookUp", () => {
    it ( "should make a lens that maps from id to value, when id and value are object of {[name: string]: value}", () => {
      type State = { lookup: NameAnd<number>, date: string }
      const state: State = {
        lookup: { 'one': 1, 'two': 2 },
        date: 'one'
      }
      const dataL = Lenses.identity<State> ().focusQuery ( 'date' )
      const lookupL: Optional<State, NameAnd<number>> = Lenses.identity<State> ().focusQuery ( 'lookup' )
      const l: Optional<State, number> = Lenses.chainLookup ( dataL, lookupL )
      expect ( l.getOption ( state ) ).toEqual ( 1 )
      expect ( l.setOption ( state, 2 ) ).toEqual ( { lookup: { 'one': 1, 'two': 2 }, date: 'two' } )
    } )
  } )

  describe ( "lookUpTable", () => {
    it ( "should make a lens that maps from id to value, when id and value are object of {[name: string]: value}", () => {
      type IdValue = { id: string, value: number }
      type State = { lookup: IdValue[], date: string }
      const state: State = {
        lookup: [ { id: 'one', value: 1 }, { id: 'two', value: 2 } ],
        date: 'one'
      }
      const dataL = Lenses.identity<State> ().focusQuery ( 'date' )
      const lookupL: Optional<State, IdValue[]> = Lenses.identity<State> ().focusQuery ( 'lookup' )
      const l: Optional<State, number> = Lenses.chainLookupTable ( dataL, lookupL, 'id', 'value' )
      expect ( l.getOption ( state ) ).toEqual ( 1 )
      expect ( l.setOption ( state, 2 ) ).toEqual ( { lookup:  [ { id: 'one', value: 1 }, { id: 'two', value: 2 } ], date: 'two' } )
    } )
  } )

  describe ( "trasnformTwoValues", () => {
    let start: TestItem2 = { item1: "one", selected: { item2: "two" } }
    let lens1 = identityOptics<TestItem2> ().focusQuery ( 'item1' )
    let lens2 = identityOptics<TestItem2> ().focusQuery ( 'selected' ).focusQuery ( 'item2' )
    const add = ( infix: string ) => ( a: string, b: string ) => a + infix + b
    let tx = transformTwoValues ( lens1, lens2 ) ( add ( "+" ), add ( "-" ) )

    it ( "should transform when both can be set", () => {
      expect ( tx ( { item1: "one", selected: { item2: "two2" } } ) ).toEqual ( { "item1": "one+two2", "selected": { "item2": "one-two2" } } )
    } )

  } )
} )

describe ( "lens utils", () => {
  it ( "should have a arrays equal that returns true if the two parameters are both defined and equal", () => {
    expect ( arraysEqual ( undefined, undefined ) ).toEqual ( false )
    expect ( arraysEqual ( [], undefined ) ).toEqual ( false )
    expect ( arraysEqual ( [ "a" ], undefined ) ).toEqual ( false )
    expect ( arraysEqual ( undefined, undefined ) ).toEqual ( false )
    expect ( arraysEqual ( undefined, [] ) ).toEqual ( false )
    expect ( arraysEqual ( undefined, [ "a" ] ) ).toEqual ( false )
    expect ( arraysEqual ( [], [ "a" ] ) ).toEqual ( false )
    expect ( arraysEqual ( [ "b" ], [ "a" ] ) ).toEqual ( false )
    expect ( arraysEqual ( [ "b" ], [] ) ).toEqual ( false )
    expect ( arraysEqual ( [], [] ) ).toEqual ( true )
    expect ( arraysEqual ( [ "a" ], [ "a" ] ) ).toEqual ( true )
    expect ( arraysEqual ( [ "a", "b" ], [ "a", "b" ] ) ).toEqual ( true )
  } )

  it ( "should have a areAllDefined that returns true only if the array and its contents are all defined", () => {
      expect ( areAllDefined ( undefined ) ).toEqual ( false )
      expect ( areAllDefined ( [ undefined ] ) ).toEqual ( false )
      expect ( areAllDefined ( [ undefined, "a" ] ) ).toEqual ( false )
      expect ( areAllDefined ( [ "b", undefined, "a" ] ) ).toEqual ( false )
      expect ( areAllDefined ( [ "b", "a" ] ) ).toEqual ( true )
    }
  )

} )

interface TestItem2 {
  item1?: string,
  selected?: {
    item2?: string
  }
}