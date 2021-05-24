import {
    fetchAndMutate,
    Fetcher,
    fetcherWhenUndefined,
    LoadFn,
    loadFromUrl,
    MutateFn,
    ReqFn,
    selStateFetcher
} from "./fetchers";
import {child, descriptionOf, FetcherTree, fetcherTree, loadTree, wouldLoad, wouldLoadDescription} from "./fetcherTree";
import {identityOptics, Iso, Optional} from "../../optics";
import {fetchRadioButton, fromTaggedFetcher} from "./RadioButtonFetcher";
import {dirtyPrism, DirtyPrism, iso} from "../../optics/src/optional";

export interface SiteMap {
    [entity: string]: Entity
}

export interface Entity {
    things: { [thingname: string]: Thing, },
    api: { [apiname: string]: Api, }
}

export interface Api {
    name: string,
    _links: {
        self: string,
        status: string,
        description: string,
        source: string
    }

}

export interface Thing {
    name: string,
    href: string
}

function links(s: string) {
    return ({
        self: `/${s}/api`,
        status: `/${s}/status`,
        description: `/${s}/description`,
        source: `/${s}/source`
    })
}


function entity(e: string): Entity {
    return ({
        things: {
            t1: {name: `${e}1`, href: `/t1/thing`},
            t2: {name: `${e}2`, href: `/t2/thing`}
        },
        api: {
            a1: {name: `${e}1`, _links: links(`${e}/a1`)},
            a2: {name: `${e}2`, _links: links(`${e}/a2`)}
        }
    })
}

const exampleSiteMap = {
    "be": entity("be"),
    "uk": entity("uk")
};

function exampleThing(name: string): Thing {
    return ({name, href: `someHrefFor${name}`})
}

function exampleApi(name: string): Api {
    return ({
        name, _links: {
            self: `self for ${name}`, status: `status for ${name}`, description: `description for ${name}`,
            source: `source for ${name}`
        }
    })
}

function siteMapLoader(bookmark: string): Promise<SiteMap> {
    return Promise.resolve(exampleSiteMap)
}

export interface ApiData {
    api: Api,
    tags: string[]
    source?: string[],
    status?: string,
    desc?: string
}

function apiDataHolder(description: string): DirtyPrism<ApiData, [string[], Api]> {
    return dirtyPrism(ad => [ad.tags, ad.api], ([tags, api]) => ({tags: tags, api: api}))
}

export interface SelectionState {
    selectedRadioButton?: string,
    selectedEntity?: string,
    selectedThing?: string,
    selectedApi?: string,
    apiView?: 'desc' | 'src' | 'status'
}

interface Holder<T> {
    t: T,
    tags: string[]
}

export interface State {
    sitemap?: SiteMap,
    entity?: Entity,
    apiData?: ApiData,
    thing?: Holder<Thing>,
    selState: SelectionState,
    radioButton?: string
}


export const stateL = identityOptics<State>()
export const stateToSiteMapL = stateL.focusQuery('sitemap')

function loadFromSiteMap(fn: (siteMap: SiteMap, s: SelectionState) => string | undefined): ReqFn<State> {
    return state => {
        if (state && state.sitemap && state.selState) {
            const url = fn(state.sitemap, state.selState)
            return url ? [url, {}] : undefined
        }
        return undefined
    }
}

function defaultSelectState(s: SiteMap | undefined): SelectionState {
    if (!s) return {}
    const selectedEntity = Object.keys(s)[0]
    const selectedThing = Object.keys(s[selectedEntity].things)[0]
    const selectedApi = Object.keys(s[selectedEntity].api)[0]
    return ({selectedEntity, selectedThing, selectedApi})
}

const loadSiteMapF = fetchAndMutate(fetcherWhenUndefined<State, SiteMap>(
    stateToSiteMapL,
    (s) => ["someSitemapUrl", undefined], "loadSiteMapF"),
    s => ({...s, selState: defaultSelectState(s.sitemap)})
);

function holderIso<T>(description: string): Iso<Holder<T>, [string[], T]> {
    return iso(
        holder => [holder.tags, holder.t],
        arr => ({t: arr[1], tags: arr[0]}),
        description
    )
}

const loadApiF: Fetcher<State, Api> = selStateFetcher(stateL.focusOn('selState'), apiDataHolder('H/ApiData'))
(sel => [sel?.selectedEntity, sel?.selectedApi],
    stateL.focusQuery('apiData'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.self),
    "loadApiF")


const loadThingF: Fetcher<State, Thing> = selStateFetcher<State, SelectionState, Holder<Thing>, Thing>(
    stateL.focusOn('selState'),
    holderIso<Thing>('H/Thing'))(
    s => [s.selectedEntity, s.selectedThing],
    stateL.focusQuery('thing'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedThing && siteMap[sel.selectedEntity].things[sel.selectedThing].href),
    'LoadThingF')

let apiDataL: Optional<State, ApiData> = stateL.focusQuery('apiData')

const loadApiDescF: Fetcher<State, string> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('desc'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.description),
    "loadApiDescF")

const loadApiStatus: Fetcher<State, string> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('status'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.status),
    "loadApiStatus")

const loadApiSrc: Fetcher<State, string[]> = fetcherWhenUndefined<State, string[]>(
    apiDataL.focusQuery("source"),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.source),
    "loadApiSrc")


const loadApiChild = fetchRadioButton<State, ApiData>(
    s => s.selState?.selectedRadioButton,
    identityOptics<State>().focusQuery('radioButton'),
    fromTaggedFetcher({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}),
    "loadApiChild")


const demoTree: FetcherTree<State> = fetcherTree(
    loadSiteMapF,
    child(loadThingF),
    child(loadApiF,
        child(loadApiChild)))


describe("fetchTree", () => {
    it("should have a description", () => {
        expect(descriptionOf(demoTree)).toEqual([
            "FetcherTree(",
            "  loadSiteMapF.withMutate",
            "   Iso(I)",
            "      FetcherTree(",
            "        LoadThingF",
            "   Iso(I)",
            "      FetcherTree(",
            "        loadApiF",
            "         Iso(I)",
            "            FetcherTree(",
            "              loadApiChild"
        ])
    })
})
describe("wouldLoad should provide test friendly means of showing what a fetchTree will do for the current state. Doesn't take into account any intermedite loads", () => {
    it("for undefined", () => {
        expect(wouldLoad(demoTree, undefined)).toEqual([
            {fetcher: loadSiteMapF, load: false},
            {fetcher: loadThingF, load: false},
            {fetcher: loadApiF, load: false},
            {fetcher: loadApiChild, load: false}])
    })
    it("for empty", () => {
        expect(wouldLoad(demoTree, {selState: {}})).toEqual([
                {fetcher: loadSiteMapF, load: true, reqData: ["someSitemapUrl", undefined]},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: false}
            ]
        )
    })
    it("when sitemap not loaded and thing desired but no actual", () => {
        expect(wouldLoad(demoTree, {
            selState: {selectedEntity: "be", selectedThing: "t1"}
        })).toEqual([
                {fetcher: loadSiteMapF, load: true, reqData: ["someSitemapUrl", undefined]},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: false}
            ]
        )
    })
    it("when sitemap loaded and no thing desired or actual", () => {
        expect(wouldLoad(demoTree, {sitemap: exampleSiteMap, selState: {}})).toEqual([
                {fetcher: loadSiteMapF, load: false},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: false}
            ]
        )
    })
    it("when sitemap loaded and thing desired but no actual", () => {
        expect(wouldLoad(demoTree, {
            sitemap: exampleSiteMap,
            selState: {selectedEntity: "be", selectedThing: "t1"}
        })).toEqual([
                {fetcher: loadSiteMapF, load: false},
                {fetcher: loadThingF, load: true, reqData: ["/t1/thing", {}]},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: false}
            ]
        )
    })


    it("when sitemap loaded and api not loaded but radio selected", () => {
        expect(wouldLoad(demoTree, {
            sitemap: exampleSiteMap,
            selState: {selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src"}
        })).toEqual([
                {fetcher: loadSiteMapF, load: false},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: true, reqData: ["/be/a1/api", {}]},
                {fetcher: loadApiChild, load: true, reqData: ["/be/a1/source", {}]}
            ]
        )
    })

    it("when sitemap loaded and api loaded and radio selected", () => {
        expect(wouldLoad(demoTree, {
            sitemap: exampleSiteMap,
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"]},
            selState: {selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src"}
        })).toEqual([
                {fetcher: loadSiteMapF, load: false},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: true, reqData: ["/be/a1/source", {}]}
            ]
        )
    })
    it("when sitemap loaded and api loaded and radio selected , the tag matches the selected, but the data isn't loaded", () => {
        expect(wouldLoad(demoTree, {
            sitemap: exampleSiteMap,
            radioButton: "src",
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"]},
            selState: {selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src"}
        })).toEqual([
                {fetcher: loadSiteMapF, load: false},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: true, reqData: ["/be/a1/source", {}]}
            ]
        )
    })
    it("should load nothing when sitemap loaded and api loaded and target of radio button loaded", () => {
        let state = {
            sitemap: exampleSiteMap,
            radioButton: "src",
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"], source: ["somelines", "of source"]},
            selState: {selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src"}
        };
        expect(loadApiSrc.shouldLoad(state)).toEqual(false)
        expect(loadApiChild.shouldLoad(state)).toEqual(false)
        expect(wouldLoad(demoTree, state)).toEqual([
                {fetcher: loadSiteMapF, load: false},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: false}
            ]
        )
    })
    it("should load when sitemap loaded and api loaded and selected radio button isn't the current, even if the target is there ", () => {
        let state = {
            sitemap: exampleSiteMap,
            radioButton: "notsrc",
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"], source: ["somelines", "of source"]},
            selState: {selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src"}
        };
        expect(loadApiSrc.shouldLoad(state)).toEqual(false)
        expect(loadApiChild.shouldLoad(state)).toEqual(true)
        expect(wouldLoad(demoTree, state)).toEqual([
                {fetcher: loadSiteMapF, load: false},
                {fetcher: loadThingF, load: false},
                {fetcher: loadApiF, load: false},
                {fetcher: loadApiChild, load: true, reqData: ["/be/a1/source", {}]}
            ]
        )
    })
})
describe("wouldLoadDescription should report what a fetchTree would do for the current state. ", () => {
    it("for undefined", () => {
        expect(wouldLoadDescription<State>(demoTree, undefined)).toEqual([
            "loadSiteMapF.withMutate false",
            "  Iso(I)",
            "    LoadThingF false",
            "  Iso(I)",
            "    loadApiF false",
            "      Iso(I)",
            "        loadApiChild false"
        ])
    })
    it("for empty", () => {
        expect(wouldLoadDescription<State>(demoTree, {selState: {}})).toEqual([
            "loadSiteMapF.withMutate true",
            "  Iso(I)",
            "    LoadThingF false",
            "  Iso(I)",
            "    loadApiF false",
            "      Iso(I)",
            "        loadApiChild false"
        ])
    })
})

describe("integration test for fetcherDemo", () => {

    const fetchFn = (count: [number]) => <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]> => {
        count[0] = count[0] + 1
        // @ts-ignore
        if (re == "someSitemapUrl") return Promise.resolve([200, exampleSiteMap])
        // @ts-ignore
        if (re == "/t1/thing") return Promise.resolve([200, exampleThing("t1")])
        // @ts-ignore
        if (re == "/be/a1/api") return Promise.resolve([200, exampleApi("a1")])
        // @ts-ignore
        if (re == "/be/a1/source") return Promise.resolve([200, ["some", "lines"]])
        // @ts-ignore
        if (re == "/be/a1/description") return Promise.resolve([200, "someDesc"])
        throw Error(`unknown request ${re}`)

    };

    it("should load the sitemap when the state is empty", async () => {
        const count: [number] = [0]
        expect(await loadTree(demoTree, {selState: {}}, fetchFn(count))).toEqual({
            sitemap: exampleSiteMap, "selState": {
                "selectedApi": "a1",
                "selectedEntity": "be",
                "selectedThing": "t1"
            },
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"]},
            thing: {"t": exampleThing("t1"), "tags": ["be", "t1"]}
        })
        expect(count[0]).toEqual(3)
    })
    it("should load nothing when the raw data is good", async () => {
        const count: [number] = [0]
        let state: State = {
            sitemap: exampleSiteMap, "selState": {
                "selectedApi": "a1",
                "selectedEntity": "be",
                "selectedThing": "t1"
            },
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"]},
            thing: {"t": exampleThing("t1"), "tags": ["be", "t1"]}
        };
        expect(await loadTree(demoTree, state, fetchFn(count))).toEqual(state)
        expect(count[0]).toEqual(0)
    })
    it("should load radio buttons when they are selected", async () => {
        const count: [number] = [0]
        let state: State = {
            sitemap: exampleSiteMap, "selState": {
                "selectedApi": "a1",
                "selectedEntity": "be",
                "selectedThing": "t1",
                selectedRadioButton: "src"
            },
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"]},
            thing: {"t": exampleThing("t1"), "tags": ["be", "t1"]}
        };
        expect(await loadTree(demoTree, state, fetchFn(count))).toEqual(
            {
                sitemap: exampleSiteMap, "selState": {
                    "selectedApi": "a1",
                    "selectedEntity": "be",
                    "selectedThing": "t1",
                    selectedRadioButton: "src"
                },
                radioButton: "src",
                apiData: {api: exampleApi("a1"), tags: ["be", "a1"], source: ["some", "lines"]},
                thing: {"t": exampleThing("t1"), "tags": ["be", "t1"]}
            })
        expect(count[0]).toEqual(1)
    })
    it("should not do anything when radio buttons are correctly loaded", async () => {
        const count: [number] = [0]
        let state: State = {
            sitemap: exampleSiteMap, "selState": {
                "selectedApi": "a1",
                "selectedEntity": "be",
                "selectedThing": "t1",
                selectedRadioButton: "src"
            },
            radioButton: "src",
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"], source: ["some", "lines"]},
            thing: {"t": exampleThing("t1"), "tags": ["be", "t1"]}
        };
        expect(await loadTree(demoTree, state, fetchFn(count))).toEqual(state)
        expect(count[0]).toEqual(0)
    })
    it("should load when radio button changed", async () => {
        const count: [number] = [0]
        let state: State = {
            sitemap: exampleSiteMap, "selState": {
                "selectedApi": "a1",
                "selectedEntity": "be",
                "selectedThing": "t1",
                selectedRadioButton: "desc"
            },
            radioButton: "src",
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"], source: ["some", "lines"]},
            thing: {"t": exampleThing("t1"), "tags": ["be", "t1"]}
        };
        expect(await loadTree(demoTree, state, fetchFn(count))).toEqual({
            sitemap: exampleSiteMap, "selState": {
                "selectedApi": "a1",
                "selectedEntity": "be",
                "selectedThing": "t1",
                selectedRadioButton: "desc"
            },
            radioButton: "desc",
            apiData: {api: exampleApi("a1"), tags: ["be", "a1"], source: ["some", "lines"], desc: "someDesc"},
            thing: {"t": exampleThing("t1"), "tags": ["be", "t1"]}
        })
        expect(count[0]).toEqual(1)
    })
})