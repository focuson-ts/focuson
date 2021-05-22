import {State} from "./fetcher.fixture";
import {identityOptics, Iso, Lens, Optional} from "./optional";


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

let ab = {a: "a", b: "b"};
let holder = {ab, c: "c"}

describe("identityOptics ", () => {
        it("should implement 'identity' for the four methods", () => {
            expect(identityOptics().set(1, 2)).toBe(2)
            expect(identityOptics().get(1)).toBe(1)
            expect(identityOptics().getOption(1)).toBe(1)
            expect(identityOptics().reverseGet(1)).toBe(1)
        })
    }
)


describe("iso", () => {
    let iso = new Iso<AB, [string | undefined, string | undefined]>(i => [i.a, i.b], ab => ({a: ab[0], b: ab[1]}))
    it("should flip between the two representations", () => {
        expect(iso.get(ab)).toEqual(["a", "b"])
        expect(iso.getOption(ab)).toEqual(["a", "b"])
        expect(iso.set({"a": "not", "b": "used"}, ["a", "b"])).toEqual(ab)
        expect(iso.reverseGet(["a", "b"])).toEqual({"a": "a", "b": "b"})
    })
    it("should have be focusable, and return a lens", () => {
        let toA: Lens<AB, string | undefined> = identityOptics<AB>().focusOn('a')
        expect(toA.set(ab, "newA")).toEqual({a: "newA", b: "b"})
        expect(toA.get(ab)).toBe("a")
        expect(toA.getOption(ab)).toEqual("a")
    })
    it("should return a lens if chained with a lens", () => {
        let toA: Lens<AB, string | undefined> = identityOptics<AB>().chainWithLens(identityOptics<AB>().focusOn('a'))
        expect(toA.set(ab, "newA")).toEqual({a: "newA", b: "b"})
        expect(toA.get(ab)).toBe("a")
        expect(toA.getOption(ab)).toEqual("a")
    })
})

let lensToAWithDefault: Lens<Holder, string> = identityOptics<Holder>().focusOn('ab').focusWithDefault('a', "defaultA")
describe("lens", () => {
    it("should be focusable and return a lens", () => {
        let lensToa: Lens<Holder, string | undefined> = identityOptics<Holder>().focusOn('ab').focusOn('a')
        expect(lensToa.set(holder, "newA")).toEqual({ab: {a: "newA", b: "b"}, c: "c"})
    })
    it("should allow chained lens", () => {
        let lensToa: Lens<Holder, string | undefined> = identityOptics<Holder>().chainWithLens(identityOptics<Holder>().focusOn('ab')).chainWithLens(identityOptics<AB>().focusOn('a'))
        expect(lensToa.set(holder, "newA")).toEqual({ab: {a: "newA", b: "b"}, c: "c"})
    })
    it("should allow focusWithDefault creating a lens with a default value ", () => {
        expect(lensToAWithDefault.get({ab: {}, c: "c"})).toEqual("defaultA")
        expect(lensToAWithDefault.getOption({ab: {}, c: "c"})).toEqual("defaultA")
        expect(lensToAWithDefault.set({ab: {}, c: "c"}, "someA")).toEqual({ab: {a: "someA"}, c: "c"})
    })
    it("should have a focusQuery creating an optional", () => {
        let lensToqueryA: Optional<Holder, string> = identityOptics<Holder>().focusOn('ab').focusQuery('a')
        expect(lensToqueryA.getOption({ab: {}, c: "c"})).toEqual(undefined)
        expect(lensToqueryA.getOption({ab: {a: "a"}, c: "c"})).toEqual("a")
        expect(lensToqueryA.set({ab: {}, c: "c"}, "a")).toEqual({ab: {a: "a"}, c: "c"})
    })
    it("should have a focusQuery that keeps on nesting: depth 2", () => {
        let lensToqueryA: Optional<Holder, string> = identityOptics<Holder>().focusOn('ab').focusQuery('ab').focusQuery('ab').focusQuery('a')
        expect(lensToqueryA.getOption({ab: {}, c: "c"})).toEqual(undefined)
        expect(lensToqueryA.getOption({ab: {ab: {}}, c: "c"})).toEqual(undefined)
        expect(lensToqueryA.getOption({ab: {ab: {ab: {}}}, c: "c"})).toEqual(undefined)
        expect(lensToqueryA.getOption({ab: {ab: {ab: {a: "a"}}}, c: "c"})).toEqual("a")

        expect(lensToqueryA.set({ab: {}, c: "c"}, "a")).toEqual({ab: {}, c: "c"})
        expect(lensToqueryA.set({ab: {ab: {}}, c: "c"}, "a")).toEqual({ab: {ab: {}}, c: "c"})
        expect(lensToqueryA.set({ab: {ab: {ab: {}}}, c: "c"}, "a")).toEqual({ab: {ab: {ab: {a: "a"}}}, c: "c"})
        expect(lensToqueryA.set({ab: {ab: {ab: {a: "oldA"}}}, c: "c"}, "a")).toEqual({ab: {ab: {ab: {a: "a"}}}, c: "c"})
    })

    it("should have a combineWith creating a lens focused on both", () => {
        let abL = identityOptics<Holder>().focusOn('ab')
        let aL = abL.focusOn('a')
        let bL = abL.focusOn('b')
        let aCombinedBL: Lens<Holder, [string | undefined, string | undefined]> = aL.combineWithLens(bL)
        expect(aCombinedBL.get(holder)).toEqual(["a", "b"])
        expect(aCombinedBL.getOption(holder)).toEqual(["a", "b"])
        expect(aCombinedBL.set(holder, ["newA", "newB"])).toEqual({ab: {a: "newA", b: "newB"}, c: "c"})
    })
})

describe("optional", () => {
    it("should allow access to ", () => {
    })

})

