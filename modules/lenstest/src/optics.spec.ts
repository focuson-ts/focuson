import { State } from "./fetcher.fixture";
import { identityOptics, Iso, Lens, Lenses, Optional } from "@focuson/lens";


export let state: State = {}

interface Holder {
  ab: AB,
  c: string
}

interface AB {
  a?: string,
  b?: string
  ab?: AB
}

let ab = { a: "a", b: "b" };
let holder = { ab, c: "c" }

describe ( "identityOptics ", () => {
    it ( "should implement 'identity' for the four methods", () => {
      expect ( identityOptics ().set ( 1, 2 ) ).toBe ( 2 )
      expect ( identityOptics ().get ( 1 ) ).toBe ( 1 )
      expect ( identityOptics ().getOption ( 1 ) ).toBe ( 1 )
      expect ( identityOptics ().reverseGet ( 1 ) ).toBe ( 1 )
    } )
  }
)


describe ( "iso", () => {
  let iso = new Iso<AB, [ string | undefined, string | undefined ]> ( i => [ i.a, i.b ], ab => ({
    a: ab[ 0 ],
    b: ab[ 1 ]
  }), "desc" )
  it ( "should have a description", () => {
    expect ( iso.toString () ).toEqual ( "Iso(desc)" )
    expect ( identityOptics ().toString () ).toEqual ( "Iso(I)" )
    expect ( identityOptics ( "desc" ).toString () ).toEqual ( "Iso(desc)" )
  } )
  it ( "should flip between the two representations", () => {
    expect ( iso.get ( ab ) ).toEqual ( [ "a", "b" ] )
    expect ( iso.getOption ( ab ) ).toEqual ( [ "a", "b" ] )
    expect ( iso.set ( { "a": "not", "b": "used" }, [ "a", "b" ] ) ).toEqual ( ab )
    expect ( iso.reverseGet ( [ "a", "b" ] ) ).toEqual ( { "a": "a", "b": "b" } )
  } )
  it ( "should have be focusable, and return a lens", () => {
    let toA: Lens<AB, string | undefined> = identityOptics<AB> ().focusOn ( 'a' )
    expect ( toA.set ( ab, "newA" ) ).toEqual ( { a: "newA", b: "b" } )
    expect ( toA.get ( ab ) ).toBe ( "a" )
    expect ( toA.getOption ( ab ) ).toEqual ( "a" )
    expect ( toA.toString () ).toEqual ( "Lens(I.focusOn(a))" )
  } )
  it ( "should have be focusQuery and return an optional", () => {
    let toA: Optional<AB, string> = identityOptics<AB> ().focusQuery ( 'a' )
    expect ( toA.set ( ab, "newA" ) ).toEqual ( { a: "newA", b: "b" } )
    expect ( toA.getOption ( ab ) ).toEqual ( "a" )
    expect ( toA.getOption ( {} ) ).toEqual ( undefined )
    expect ( toA.toString () ).toEqual ( "Optional(I.focus?(a))" )
  } )
  it ( "should return a lens if chained with a lens", () => {
    let toA: Lens<AB, string | undefined> = identityOptics<AB> ().chainLens ( identityOptics<AB> ().focusOn ( 'a' ) )
    expect ( toA.set ( ab, "newA" ) ).toEqual ( { a: "newA", b: "b" } )

    expect ( toA.getOption ( ab ) ).toEqual ( "a" )
    expect ( toA.toString () ).toEqual ( "Lens(I.chain(I.focusOn(a)))" )
  } )
} )

let lensToAWithDefault: Lens<Holder, string> = identityOptics<Holder> ().focusOn ( 'ab' ).focusWithDefault ( 'a', "defaultA" )
describe ( "lens", () => {
  it ( "should be focusable and return a lens", () => {
    let lensToa: Lens<Holder, string | undefined> = identityOptics<Holder> ().focusOn ( 'ab' ).focusOn ( 'a' )
    expect ( lensToa.set ( holder, "newA" ) ).toEqual ( { ab: { a: "newA", b: "b" }, c: "c" } )
    expect ( lensToa.setOption ( holder, "newA" ) ).toEqual ( { ab: { a: "newA", b: "b" }, c: "c" } )
    expect ( lensToa.get ( holder ) ).toEqual ( "a" )
    expect ( lensToa.getOption ( holder ) ).toEqual ( "a" )
    expect ( lensToa.toString () ).toEqual ( "Lens(I.focusOn(ab).focusOn(a))" )
  } )
  it ( "should allow chained lens", () => {
    let lensToa: Lens<Holder, string | undefined> = identityOptics<Holder> ().chainLens ( identityOptics<Holder> ().focusOn ( 'ab' ) ).chainLens ( identityOptics<AB> ().focusOn ( 'a' ) )
    expect ( lensToa.set ( holder, "newA" ) ).toEqual ( { ab: { a: "newA", b: "b" }, c: "c" } )
    expect ( lensToa.setOption ( holder, "newA" ) ).toEqual ( { ab: { a: "newA", b: "b" }, c: "c" } )
    expect ( lensToa.get ( holder ) ).toEqual ( "a" )
    expect ( lensToa.getOption ( holder ) ).toEqual ( "a" )
    expect ( lensToa.toString () ).toEqual ( "Lens(I.chain(I.focusOn(ab)).chain(I.focusOn(a)))" )
  } )
  it ( "should allow focusWithDefault creating a lens with a default value ", () => {
    expect ( lensToAWithDefault.get ( { ab: {}, c: "c" } ) ).toEqual ( "defaultA" )
    expect ( lensToAWithDefault.getOption ( { ab: {}, c: "c" } ) ).toEqual ( "defaultA" )
    expect ( lensToAWithDefault.set ( { ab: {}, c: "c" }, "someA" ) ).toEqual ( { ab: { a: "someA" }, c: "c" } )
    expect ( lensToAWithDefault.setOption ( { ab: {}, c: "c" }, "someA" ) ).toEqual ( { ab: { a: "someA" }, c: "c" } )
    expect ( lensToAWithDefault.toString () ).toEqual ( "Lens(I.focusOn(ab).focusWithDefault(a))" )
  } )
  it ( "should have a focusQuery creating an optional", () => {
    let optToQueryA: Optional<Holder, string> = identityOptics<Holder> ().focusOn ( 'ab' ).focusQuery ( 'a' )
    expect ( optToQueryA.getOption ( { ab: {}, c: "c" } ) ).toEqual ( undefined )
    expect ( optToQueryA.getOption ( { ab: { a: "a" }, c: "c" } ) ).toEqual ( "a" )

    expect ( optToQueryA.set ( { ab: {}, c: "c" }, "newA" ) ).toEqual ( { ab: { a: "newA" }, c: "c" } )
    expect ( optToQueryA.set ( { ab: { a: "a" }, c: "c" }, "newA" ) ).toEqual ( { ab: { a: "newA" }, c: "c" } )

    expect ( optToQueryA.setOption ( { ab: {}, c: "c" }, "newA" ) ).toEqual ( { ab: { a: "newA" }, c: "c" } )
    expect ( optToQueryA.setOption ( { ab: { a: "a" }, c: "c" }, "newA" ) ).toEqual ( { ab: { a: "newA" }, c: "c" } )
    expect ( optToQueryA.toString () ).toEqual ( "Optional(I.focusOn(ab).focus?(a))" )
  } )
  it ( "should have a focusQuery that keeps on nesting: depth 2, and the getOption returns undefined if nothing there", () => {
    let optToQueryA: Optional<Holder, string> = identityOptics<Holder> ().focusOn ( 'ab' ).focusQuery ( 'ab' ).focusQuery ( 'ab' ).focusQuery ( 'a' )
    expect ( optToQueryA.getOption ( { ab: {}, c: "c" } ) ).toEqual ( undefined )
    expect ( optToQueryA.getOption ( { ab: { ab: {} }, c: "c" } ) ).toEqual ( undefined )
    expect ( optToQueryA.getOption ( { ab: { ab: { ab: {} } }, c: "c" } ) ).toEqual ( undefined )
    expect ( optToQueryA.getOption ( { ab: { ab: { ab: { a: "a" } } }, c: "c" } ) ).toEqual ( "a" )
    expect ( optToQueryA.toString () ).toEqual ( "Optional(I.focusOn(ab).focus?(ab).focus?(ab).focus?(a))" )
  } )
  it ( "should have a focusQuery that keeps on nesting: depth 2, and the setOption put it's there anyway", () => {
    let lensToqueryA: Optional<Holder, string> = identityOptics<Holder> ().focusOn ( 'ab' ).focusQuery ( 'ab' ).focusQuery ( 'ab' ).focusQuery ( 'a' )

    expect ( lensToqueryA.setOption ( { ab: {}, c: "c" }, "a" ) ).toEqual ( {
      "ab": { "ab": { "ab": { "a": "a" } } },
      "c": "c"
    } )
    expect ( lensToqueryA.setOption ( { ab: { ab: {} }, c: "c" }, "a" ) ).toEqual ( {
      "ab": { "ab": { "ab": { "a": "a" } } },
      "c": "c"
    } )
    expect ( lensToqueryA.setOption ( { ab: { ab: { ab: {} } }, c: "c" }, "a" ) ).toEqual ( {
      "ab": { "ab": { "ab": { "a": "a" } } },
      "c": "c"
    } )
    expect ( lensToqueryA.setOption ( { ab: { ab: { ab: { a: "oldA" } } }, c: "c" }, "a" ) ).toEqual ( {
      ab: { ab: { ab: { a: "a" } } },
      c: "c"
    } )
    expect ( lensToqueryA.toString () ).toEqual ( "Optional(I.focusOn(ab).focus?(ab).focus?(ab).focus?(a))" )
  } )

  it ( "should have a focusQuery that keeps on nesting: depth 2, ", () => {
    let lensToqueryA: Optional<Holder, string> = identityOptics<Holder> ().focusOn ( 'ab' ).focusQuery ( 'ab' ).focusQuery ( 'ab' ).focusQuery ( 'a' )

    expect ( lensToqueryA.set ( { ab: {}, c: "c" }, "a" ) ).toEqual ( { "ab": { "ab": { "ab": { "a": "a" } } }, "c": "c" } )
    expect ( lensToqueryA.set ( { ab: { ab: {} }, c: "c" }, "a" ) ).toEqual ( { "ab": { "ab": { "ab": { "a": "a" } } }, "c": "c" } )
    expect ( lensToqueryA.set ( { ab: { ab: { ab: {} } }, c: "c" }, "a" ) ).toEqual ( { ab: { ab: { ab: { a: "a" } } }, c: "c" } )
    expect ( lensToqueryA.set ( { ab: { ab: { ab: { a: "oldA" } } }, c: "c" }, "a" ) ).toEqual ( { ab: { ab: { ab: { a: "a" } } }, c: "c" } )
    expect ( lensToqueryA.toString () ).toEqual ( "Optional(I.focusOn(ab).focus?(ab).focus?(ab).focus?(a))" )
  } )

  it ( "should have a combineWith creating a lens focused on both", () => {
    let abL = identityOptics<Holder> ().focusOn ( 'ab' )
    let aL = abL.focusOn ( 'a' )
    let bL = abL.focusOn ( 'b' )
    let aCombinedBL: Lens<Holder, [ string | undefined, string | undefined ]> = aL.combineLens ( bL )
    expect ( aCombinedBL.get ( holder ) ).toEqual ( [ "a", "b" ] )
    expect ( aCombinedBL.getOption ( holder ) ).toEqual ( [ "a", "b" ] )
    expect ( aCombinedBL.set ( holder, [ "newA", "newB" ] ) ).toEqual ( { ab: { a: "newA", b: "newB" }, c: "c" } )
    expect ( aCombinedBL.toString () ).toEqual ( "Lens(combine(I.focusOn(ab).focusOn(a),I.focusOn(ab).focusOn(b)))" )
  } )
} )


describe ( "optional.setOption", () => {
  interface BaseForTest {
    a?: { b?: ChildForTest },
    tags?: { tag?: { thetag?: string } }
  }
  interface ChildForTest {
    c: string
  }
  const lensToB: Optional<BaseForTest, string> = Lenses.identity<BaseForTest> ().focusQuery ( "a" ).focusQuery ( 'b' ).focusQuery ( 'c' )
  const lensToTheTag: Optional<BaseForTest, string> = Lenses.identity<BaseForTest> ().focusQuery ( "tags" ).focusQuery ( 'tag' ).focusQuery ( 'thetag' )
  const targetAndTagL: Optional<BaseForTest, [ string, string ]> = lensToB.combine ( lensToTheTag )
  let expected = {
    "a": { "b": { "c": "newTarget" } },
    "tags": { "tag": { "thetag": "newTag" } }
  };

  it ( "should allow a nested focuses lens to create parents - depth 2", () => {
    expect ( lensToTheTag.setOption ( {}, 'newTarget' ) ).toEqual ( { "tags": { "tag": { "thetag": "newTarget" } } } )
  } )

  it ( "should allow a nested focuses lens to create parents - depth 3", () => {
    expect ( lensToB.setOption ( {}, 'newTag' ) ).toEqual ( { "a": { "b": { "c": "newTag" } } } )
  } )

  it ( "should allowed a combined 'tags' plus 'value' optional to work when neither parent is there", () => {
    expect ( targetAndTagL.setOption ( {}, [ 'newTarget', 'newTag' ] ) ).toEqual ( expected )
  } )
  it ( "should allowed a combined 'tags' plus 'value' optional to work when only tags parent present", () => {
    expect ( targetAndTagL.setOption ( { tags: { tag: {} } }, [ 'newTarget', 'newTag' ] ) ).toEqual ( expected )
    expect ( targetAndTagL.setOption ( { tags: {} }, [ 'newTarget', 'newTag' ] ) ).toEqual ( expected )
  } )
  it ( "should allowed a combined 'tags' plus 'value' optional to work when only target parent present", () => {
    expect ( targetAndTagL.setOption ( { a: { b: { c: '' } } }, [ 'newTarget', 'newTag' ] ) ).toEqual ( expected )
  } )
} )


interface DataForCond {
  cond: string;
  true?: { a: number },
  false?: { b: number },
}
const dataA: DataForCond = {
  cond: 'a',
  true: { a: 1 }
}
const dataB: DataForCond = {
  cond: 'b',
  false: { b: 2 }
}
describe ( "conditional lens", () => {
  const id = Lenses.identity<DataForCond> ()
  const condL = id.focusOn ( 'cond' )
  const trueL = id.focusQuery ( 'true' ).focusOn ( 'a' )
  const falseL = id.focusQuery ( 'false' ).focusOn ( 'b' )
  const lens = Lenses.condition ( condL, c => c === 'a', trueL, falseL );

  it ( "should be able to get data", () => {
    expect ( lens.getOption ( dataA ) ).toEqual ( 1 )
    expect ( lens.getOption ( dataB ) ).toEqual ( 2 )
  } )
  it ( "should be able to set data", () => {
    expect ( lens.setOption ( dataA, 3 ) ).toEqual ( { "cond": "a", "true": { "a": 3 } } )
    expect ( lens.setOption ( dataB, 3 ) ).toEqual ( { "cond": "b", "false": { "b": 3 } } )
  } )

  it ( "should have a description", () => {
    expect ( lens.description ).toEqual ( 'If(I.focusOn(cond)) then I.focus?(true).focusOn(a) else I.focus?(false).focusOn(b)' )
  } )

} )

interface CalcNthForTest {
  n: number;
  ts: string[]
}
describe ( "calculatedNth", () => {
  const id = Lenses.identity<CalcNthForTest> ()
  const l = Lenses.calculatedNth<CalcNthForTest, string> ( id.focusQuery ( 'n' ), id.focusQuery ( 'ts' ) )
  it ( 'should get the nth item', () => {
    expect ( l.getOption ( { n: 1, ts: [ 'zero', 'one', 'two' ] } ) ).toEqual ( 'one' )
  } )
  it ( 'should set the nth item', () => {
    expect ( l.setOption ( { n: 1, ts: [ 'zero', 'one', 'two' ] }, 'x' ) ).toEqual ( { "n": 1, "ts": [ "zero", "x", "two" ] } )

  } )
} )