import {
    applyFetcher, fetchAndMutate,
    Fetcher,
    fetcher,
    fetcherWhenUndefined,
    lensFetcher,
    LoadFn,
    ReqFn,
    selStateFetcher
} from "@focuson/fetcher";
import {identityOptics} from "@focuson/optics";
import {dirtyPrism, iso} from "@focuson/optics";
import {fetchRadioButton, fromTaggedFetcher, TaggedFetcher} from "@focuson/fetcher";

const shouldLoadTrue = <T extends any>(t: T): boolean => true;
const shouldLoadFalse = <T extends any>(t: T): boolean => false;
const reqInit: RequestInit = {keepalive: true}
const loadAddsDot: LoadFn<string, string> = (s: string | undefined) =>
    [`load url from ${s}`, reqInit, (state) => (status, json) => "." + state + "/" + status + "/" + json]

interface AB {
    a?: string,
    b?: string,
    ab?: AB
}

let loadTrueF = fetcher<string, string>(shouldLoadTrue, loadAddsDot, "loadTrueF");
let loadFalseF = fetcher<string, string>(shouldLoadFalse, loadAddsDot, "loadFalseF");

describe("fetcher", () => {
    it("should make a fetcher", () => {
        expect(loadTrueF).toEqual({shouldLoad: shouldLoadTrue, load: loadAddsDot, "description": "loadTrueF"})
    })
})

function myfetch(req: RequestInfo, init?: RequestInit): Promise<[number, string]> {
    return Promise.resolve([200, "someString"])
}

describe("apply fetcher", () => {
    it("load when load returns true", async () => {
        expect(await applyFetcher(loadTrueF, "original", myfetch)).toEqual(".original/200/someString")
    })
    it("not load when load returns false", async () => {
        expect(await applyFetcher(loadFalseF, "original", myfetch)).toEqual("original")
    })
})

describe("lens fetcher ", () => {
    const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
    let fTrue: Fetcher<AB, string> = lensFetcher(opticsTo, loadTrueF);
    let fFalse: Fetcher<AB, string> = lensFetcher(opticsTo, loadFalseF, "fFalse");

    it("should have a  description", () => {
        expect(fTrue.description).toEqual("lensFetcher(Optional(I.focus?(ab).focus?(a)),loadTrueF)")
        expect(fFalse.description).toEqual("fFalse")
    })
    it("when state is undefined", () => {
        expect(fTrue.shouldLoad(undefined)).toEqual(false)
        expect(() => fTrue.load(undefined)).toThrow('')
    })
    it("when child condition is false", () => {
        expect(fTrue.shouldLoad(undefined)).toEqual(false)
    })
    it.skip("when child  condition is true BUT the place the child is going to be added to is undefined", () => {
        expect(fTrue.shouldLoad({})).toEqual(false) //there is no ab to put the value loaded into
        const [req, reqInit, mutate] = fTrue.load({ab: {}})
    })
    it("when child  condition is true", () => {
        let state = {ab: {}};
        expect(fTrue.shouldLoad(state)).toEqual(true)
        const [req, reqInit, mutate] = fTrue.load({ab: {}})
        expect(mutate(state)(200, "someValue")).toEqual({"ab": {"a": ".undefined/200/someValue"}})
    })

})
describe("lens fetcher", () => {
    it("when state undefined", () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB, string> = lensFetcher(opticsTo, loadTrueF);
        expect(f.shouldLoad(undefined)).toEqual(false)
    })
    it("when state defined but holder is undefined", () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB, string> = lensFetcher(opticsTo, loadTrueF);
        expect(f.shouldLoad({})).toEqual(true) //would really like this to be false, but don't know how
        const [req, int, mutate] = f.load({})
        expect(req).toEqual("load url from undefined")
        expect(int).toEqual(reqInit)
        expect(mutate({})(200, "someNewA")).toEqual({}) //TODO so annoyingly we went to get it... but didn't put it in here... and didn;t throw an error.
    })
    it("when state defined, holder is defined and condition is false", () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB, string> = lensFetcher(opticsTo, loadFalseF);
        expect(f.shouldLoad({ab: {}})).toEqual(false)
    })
    it("when state defined, holder is defined child is undefined and coniditon is true", () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB, string> = lensFetcher(opticsTo, loadTrueF);
        let state = {ab: {}};
        expect(f.shouldLoad(state)).toEqual(true)
        const [url, init, mutate] = f.load(state)
        expect(url).toEqual("load url from undefined")
        expect(mutate(state)(200, "newValue")).toEqual({"ab": {"a": ".undefined/200/newValue"}})
    })
    it("when state defined, holder is defined child is defined and coniditon is true", () => {
        const opticsTo = identityOptics<AB>().focusQuery('ab').focusQuery('a')
        let f: Fetcher<AB, string> = lensFetcher(opticsTo, loadTrueF);
        let state = {ab: {a: "a"}};
        expect(f.shouldLoad(state)).toEqual(true)
        const [url, init, mutate] = f.load(state)
        expect(url).toEqual("load url from a")
        expect(mutate(state)(200, "newValue")).toEqual({"ab": {"a": ".a/200/newValue"}})
    })
})

describe("fetcherWhenUndefined", () => {
    let opticToA = identityOptics<AB>().focusQuery('a');
    const fOKToLoad = fetcherWhenUndefined<AB, string>(opticToA,
        s => ["someUrl", reqInit])
    const fErrorIfLoad = fetcherWhenUndefined(opticToA, () => {
        throw Error('')
    }, "fErrorIfLoad")

    it("should have a description", () => {
        expect(fOKToLoad.description).toEqual("fetcherWhenUndefined(Optional(I.focus?(a)))")
        expect(fErrorIfLoad.description).toEqual("fErrorIfLoad")

    })
    it('doesnt load when the main state is undefined', () => {
        expect(fErrorIfLoad.shouldLoad(undefined)).toEqual(false)
    })
    it('doesnt loads when the focused on thing is defined', async () => {
        expect(fOKToLoad.shouldLoad({a: "someValue"})).toEqual(false)
    })
    it('loads when the focused on thing is undefined', async () => {
        expect(fOKToLoad.shouldLoad({})).toEqual(true)
        const [url, init, mutate] = fOKToLoad.load({})
        expect(url).toEqual("someUrl")
        expect(init).toEqual(reqInit)
        expect(mutate({})(200, "someString")).toEqual({
            "a": "someString"
        })
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

type Radio = Radio1 | Radio2 | Radio3

interface TState {
    ab?: AB,
    selState: SelState,
    entityAndName?: EntityAndName,
    profile?: Profile,
    radioTag?: string,
    radio?: Radio
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

let entityAndNameI = dirtyPrism<EntityAndName, [string[], Entity]>(en => [en.tags, en.entity], arr => ({
    tags: arr[0],
    entity: arr[1]
}))

describe("fetchAndMutate", () => {
    const fMutateTrue = fetchAndMutate(loadTrueF, s => s + "_mut")
    const fMutateFalse = fetchAndMutate(loadFalseF, s => s + "_mut", "someDesc")
    it("should have a description", () => {
        expect(fMutateTrue.description).toEqual("loadTrueF.withMutate")
        expect(fMutateFalse.description).toEqual("someDesc")
    })
    it("shouldLoad if the original shouldLoad", () => {
        expect(fMutateTrue.shouldLoad).toBe(loadTrueF.shouldLoad)
        expect(fMutateFalse.shouldLoad).toBe(loadFalseF.shouldLoad)
    })
    it("should load and then mutate", () => {
        const [url, init, mutate] = fMutateTrue.load("someString")
        expect(url).toEqual("load url from someString")
        expect(init).toEqual(reqInit)
        expect(mutate("startState")(200, "loaded")).toEqual(".startState/200/loaded_mut")
    })
})

describe("selStateFetcher", () => {

    const fetchMaker = selStateFetcher(identityOptics<TState>().focusOn('selState'), entityAndNameI)
    const reqFn: ReqFn<TState> = (s: TState | undefined) => ["someUrl", reqInit];
    const f = fetchMaker(sel => [sel.selProfile, sel.selEntity], identityOptics<TState>().focusQuery('entityAndName'), reqFn)


    it("should have a description", () => {
        expect(f.description).toEqual("selStateFetcher(sel=Lens(I.focusOn(selState)),holder=DirtyPrism(prism),target=Optional(I.focus?(entityAndName)))")
        const f2 = fetchMaker(sel => [sel.selProfile, sel.selEntity], identityOptics<TState>().focusQuery('entityAndName'), reqFn, "someDescription")
        expect(f2.description).toEqual("someDescription")
    })

    it("should not load if any of the tags are undefined", () => {
        expect(f.shouldLoad({selState: {}})).toEqual(false)
        expect(f.shouldLoad({selState: {selEntity: 'someEntity'}})).toEqual(false)
        expect(f.shouldLoad({selState: {selProfile: 'someProfile'}})).toEqual(false)
    })

    it("should load if the tags are  defined, and the target is undefined", () => {
        let startState = {selState: {selEntity: 'someEntity', selProfile: 'someProfile'}};
        expect(f.shouldLoad(startState)).toEqual(true)
        const [req, init, mutate] = f.load(startState)
        expect(req).toEqual("someUrl")
        expect(init).toEqual(reqInit)
        expect(mutate(startState)(200, {"desc": "loaded"})).toEqual({
            "entityAndName": {
                "entity": {"desc": "loaded"},
                "tags": ["someProfile", "someEntity"]
            },
            "selState": {"selEntity": "someEntity", "selProfile": "someProfile"}
        })
    })
    it("should not load if the tags are  defined, and the tags are identical", () => {
        let s: TState = {
            "entityAndName": {
                "entity": {"desc": "oldDataSoShouldntChange"},
                "tags": ["someProfile", "someEntity"]
            },
            "selState": {"selEntity": "someEntity", "selProfile": "someProfile"}
        }
        expect(f.shouldLoad(s)).toEqual(false)
    })
    it("should load if the tags are  defined, and the tags are not identical", async () => {
        let s: TState = {
            "entityAndName": {
                "entity": {"desc": "oldDataWillChange"},
                "tags": ["someProfile", "someEntity"]
            },
            "selState": {"selEntity": "someNewEntity", "selProfile": "someProfile"}
        }
        expect(f.shouldLoad(s)).toEqual(true)
        const [req, init, mutate] = f.load(s)
        expect(req).toEqual("someUrl")
        expect(init).toEqual(reqInit)
        expect(mutate(s)(200, {"desc": "loaded"})).toEqual({
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

function loaderForRadio(radio: string): ReqFn<TState> {
    return s => [`url for ${radio}`, reqInit]
}

const r1Fetcher = fetcherWhenUndefined(radioL, loaderForRadio("1"))
const r2Fetcher = fetcherWhenUndefined(radioL, loaderForRadio("2"))
const r3Fetcher = fetcherWhenUndefined(radioL, loaderForRadio("3"))
let radioGroup: TaggedFetcher<TState> = ({
    tag1: r1Fetcher,
    tag2: r2Fetcher,
    tag3: r3Fetcher,
})
describe("fetchRadioButton", () => {
    let f: Fetcher<TState, Radio> = fetchRadioButton<TState, Radio>(s => s.selState.selRadioTag, radioTagL, fromTaggedFetcher(radioGroup))
    it("should have a description", () => {
        expect(f.description).toEqual("fetchRadioButton(Optional(I.focus?(radioTag)))")
    })
    it("should not fetch if tag  is undefined", async () => {
        expect(f.shouldLoad({selState: {}})).toEqual(false)
    })
    it("should  fetch if tag  is defined and legal and the target is undefined. It should set 'actual tag'", async () => {
        expect(f.shouldLoad({selState: {selRadioTag: "doesntexist"}})).toEqual(false)
        let tag1State = {selState: {selRadioTag: "tag1"}};
        expect(f.shouldLoad(tag1State)).toEqual(true)
        const [url, init, mutate] = f.load(tag1State)
        expect(url).toEqual("url for 1")
        expect(init).toEqual(reqInit)
        expect(mutate(tag1State)(200, {r1: "r1value"})).toEqual({
            "radio": {"r1": "r1value"},
            "radioTag": "tag1",
            "selState": {"selRadioTag": "tag1"}
        })
    })

    it("should fetch if the tag is defined, but a different value. It should set 'actualTag'", async () => {
        let state = {selState: {selRadioTag: "tag2"}, radioTag: "tag1", radio: {"r1": "r1value"}};
        expect(f.shouldLoad(state)).toEqual(true)
        const [url, init, mutate] = f.load(state)
        expect(url).toEqual("url for 2")
        expect(init).toEqual(reqInit)
        expect(mutate(state)(200, {r2: "r2value"})).toEqual({
            "radio": {"r2": "r2value"},
            "radioTag": "tag2",
            "selState": {"selRadioTag": "tag2"}
        })
    })
    it("should fetch if the tag is defined, but a different value. Even if the target is empty It should set 'actualTag'", async () => {
        let state = {selState: {selRadioTag: "tag2"}, radioTag: "tag1"};
        expect(f.shouldLoad(state)).toEqual(true)
        const [url, init, mutate] = f.load(state)
        expect(url).toEqual("url for 2")
        expect(init).toEqual(reqInit)
        expect(mutate(state)(200, {r2: "r2value"})).toEqual({
            "radio": {"r2": "r2value"},
            "radioTag": "tag2",
            "selState": {"selRadioTag": "tag2"}
        })
    })
})

