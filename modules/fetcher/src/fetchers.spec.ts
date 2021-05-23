import {applyFetcher, Fetcher, fetcher, fetcherWhenUndefined, lensFetcher, selStateFetcher} from "./fetchers";
import {load} from "../../view/src/view";
import {identityOptics} from "../../optics";
import {iso} from "../../optics/src/optional";
import {fetchRadioButton, fromTaggedFetcher, TaggedFetcher} from "./RadioButtonFetcher";

const shouldLoadTrue = <T extends any>(t: T): boolean => true;
const shouldLoadFalse = <T extends any>(t: T): boolean => false;
const loadAddsDot = (s: String | undefined) => Promise.resolve(s ? s + "." : ".")

interface AB {
    a?: string,
    b?: string,
    ab?: AB
}

let loadTrueF = fetcher(shouldLoadTrue, loadAddsDot);
let loadFalseF = fetcher(shouldLoadFalse, loadAddsDot);

describe("fetcher", () => {
    it("should make a fetcher", () => {
        expect(loadTrueF).toEqual({shouldLoad: shouldLoadTrue, load: loadAddsDot})
    })
})
describe("apply fetcher", () => {
    it("load when load returns true", async () => {
        expect(await applyFetcher(loadTrueF, "someString")).toEqual("someString.")
    })
    it("not load when load returns false", async () => {
        expect(await applyFetcher(loadFalseF, "someString")).toEqual("someString")
    })

    it(" throw an error if it is not set up to handle undefined", async () => {
        try {
            await applyFetcher(loadFalseF, undefined)
            fail()
        } catch (e) {
            expect(e.message).toEqual("The fetcher doesn't know how to handle 'undefined' [object Object]")
        }
    })
})

describe("lens fetcher", () => {
    it("should apply the condition to the focused on item, and load if condition is true, and the item is defined", async () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB> = lensFetcher(opticsTo, loadTrueF);
        expect(await applyFetcher(f, {ab: {a: "a"}})).toEqual({ab: {a: "a."}})
    })
    it("should apply the condition to the focused on item, and load if condition is true, and the item is not defined", async () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB> = lensFetcher(opticsTo, loadTrueF);
        expect(f.shouldLoad({ab: {}})).toEqual(true)
        expect(await applyFetcher(f, {ab: {}})).toEqual({ab: {a: "."}})
    })
    it("should apply the condition to the focused on item, and load if condition is false, and the item is not defined", async () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB> = lensFetcher(opticsTo, loadTrueF);
        expect(f.shouldLoad({ab: {}})).toEqual(true)
        expect(await applyFetcher(f, {ab: {}})).toEqual({ab: {a: "."}})
    })

})

describe("fetcherWhenUndefined", () => {
    let opticToA = identityOptics<AB>().focusQuery('a');
    const fOKToLoad = fetcherWhenUndefined<AB, string>(opticToA, () => Promise.resolve("loadedA"))
    const fErrorIfLoad = fetcherWhenUndefined(opticToA, () => {
        throw Error('')
    })
    it('doesnt load when the main state is undefined', () => {
        expect(fErrorIfLoad.shouldLoad(undefined)).toEqual(false)
    })
    it('loads when the focused on thing is undefined', async () => {
        expect(await applyFetcher(fOKToLoad, {})).toEqual({"a": "loadedA"})
    })
    it('doesnt loads when the focused on thing is defined', async () => {
        expect(await applyFetcher(fOKToLoad, {a: "a"})).toEqual({"a": "a"})
    })
})

interface SelState {
    selEntity?: string,
    selProfile?: string,
    selRadioTag?: string
}

interface Entity {
    desc: string,
}

interface Profile {
    pic: string
}

interface TState {
    ab?: AB,
    selState: SelState,
    entityAndName?: EntityAndName,
    profile?: Profile,
    radioTag?: string,
    radio?: Radio1 | Radio2 | Radio3
}

interface Radio1 {
    r1: string
}

interface Radio2 {
    r2: string
}

interface Radio3 {
    r3: string
}

interface EntityAndName {
    tags: string[],
    entity: Entity
}

let entityAndNameI = iso<EntityAndName, [string[], Entity]>(en => [en.tags, en.entity], arr => ({
    tags: arr[0],
    entity: arr[1]
}))

describe("selStateFetcher", () => {

    const fetchMaker = selStateFetcher(identityOptics<TState>().focusOn('selState'), entityAndNameI)
    const load = (s: TState): Promise<Entity> => Promise.resolve({desc: "loaded"});
    const f = fetchMaker(sel => [sel.selProfile, sel.selEntity], identityOptics<TState>().focusQuery('entityAndName'), load)

    it("should not load if any of the tags are undefined", async () => {
        expect(await applyFetcher(f, {selState: {}})).toEqual({selState: {}})
        expect(await applyFetcher(f, {selState: {selEntity: 'someEntity'}})).toEqual({selState: {selEntity: 'someEntity'}})
        expect(await applyFetcher(f, {selState: {selProfile: 'someProfile'}})).toEqual({selState: {selProfile: 'someProfile'}})
    })

    it("should load if the tags are  defined, and the target is undefined", async () => {
        expect(await applyFetcher(f, {selState: {selEntity: 'someEntity', selProfile: 'someProfile'}})).toEqual({
            "entityAndName": {
                "entity": {"desc": "loaded"},
                "tags": ["someProfile", "someEntity"]
            },
            "selState": {"selEntity": "someEntity", "selProfile": "someProfile"}
        })
    })
    it("should not load if the tags are  defined, and the tags are identical", async () => {
        let s: TState = {
            "entityAndName": {
                "entity": {"desc": "oldDataSoShouldntChange"},
                "tags": ["someProfile", "someEntity"]
            },
            "selState": {"selEntity": "someEntity", "selProfile": "someProfile"}
        }
        expect(await applyFetcher(f, s)).toEqual(s)
    })
    it("should load if the tags are  defined, and the tags are not identical", async () => {
        let s: TState = {
            "entityAndName": {
                "entity": {"desc": "oldDataWillChange"},
                "tags": ["someProfile", "someEntity"]
            },
            "selState": {"selEntity": "someNewEntity", "selProfile": "someProfile"}
        }
        expect(await applyFetcher(f, s)).toEqual({
            "entityAndName": {
                "entity": {"desc": "loaded"},
                "tags": ["someProfile", "someNewEntity"]
            },
            "selState": {"selEntity": "someNewEntity", "selProfile": "someProfile"}
        })
    })
})


const radioL = identityOptics<TState>().focusQuery('radio')
const radioTagL = identityOptics<TState>().focusQuery('radioTag')
const r1Fetcher = fetcherWhenUndefined(radioL, s => Promise.resolve({r1: "loaded"}))
const r2Fetcher = fetcherWhenUndefined(radioL, s => Promise.resolve({r2: "loaded"}))
const r3Fetcher = fetcherWhenUndefined(radioL, s => Promise.resolve({r3: "loaded"}))
let radioGroup: TaggedFetcher<TState> = ({
    tag1: r1Fetcher,
    tag2: r2Fetcher,
    tag3: r3Fetcher,
})
describe("fetchRadioButton", () => {
    let f: Fetcher<TState> = fetchRadioButton<TState>(s => s.selState.selRadioTag, radioTagL, fromTaggedFetcher(radioGroup))
    it("should not fetch if tag  is undefined", async () => {
        expect(await applyFetcher(f, {selState: {}})).toEqual({"selState": {}})
    })
    it("should  fetch if tag  is defined and the target is undefined. It should set 'actual tag'", async () => {
        expect(await applyFetcher(f, {selState: {selRadioTag: "tag1"}})).toEqual({
            "radio": {"r1": "loaded"},
            "radioTag": "tag1",
            "selState": {"selRadioTag": "tag1"}
        })
        expect(await applyFetcher(f, {selState: {selRadioTag: "tag2"}})).toEqual({
            "radio": {"r2": "loaded"},
            "radioTag": "tag2",
            "selState": {"selRadioTag": "tag2"}
        })
        expect(await applyFetcher(f, {selState: {selRadioTag: "tag3"}})).toEqual({
            "radio": {"r3": "loaded"},
            "radioTag": "tag3",
            "selState": {"selRadioTag": "tag3"}
        })
    })
    it("should fetch if the tag is defined, but a different value. It should set 'actualTag'", async() => {
        expect(await applyFetcher(f, {
            "radio": {"r1": "loaded - this should be changed by the load"},
            "radioTag": "tag1",
            "selState": {"selRadioTag": "tag2"}
        })).toEqual({
            "radio": {"r2": "loaded"},
            "radioTag": "tag2",
            "selState": {"selRadioTag": "tag2"}
        })
    })

})