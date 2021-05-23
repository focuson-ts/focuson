import {Fetcher, fetcherWhenUndefined, loadFromUrl, selStateFetcher} from "./fetchers";
import {child, descriptionOf, FetcherTree, fetcherTree, wouldLoad, wouldLoadDescription} from "./fetcherTree";
import {identityOptics, Iso, Optional} from "../../optics";
import {fetchRadioButton, fromTaggedFetcher} from "./RadioButtonFetcher";
import {iso} from "../../optics/src/optional";

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

function siteMapLoader(bookmark: string): Promise<SiteMap> {
    return Promise.resolve(exampleSiteMap)
}

export interface ApiData {
    api?: Api,
    source?: string[],
    status?: string,
    desc?: string
}

export interface SelectionState {
    tag?: string,
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
    apiData?: Holder<ApiData>,
    thing?: Holder<Thing>,
    selState: SelectionState,
    radioButton?: string
}


export const stateL = identityOptics<State>()
export const stateToSiteMapL = stateL.focusQuery('sitemap')

function loadFromSiteMap<T>(fn: (siteMap: SiteMap, s: SelectionState) => string | undefined) {
    return (ns: State): Promise<T | undefined> => {
        const siteMap = ns.sitemap
        if (siteMap == undefined) throw new Error('Trying to loadFromSiteMap when the site map is not defined')
        const sel = ns.selState
        if (sel == undefined) throw new Error('Trying to loadFromSiteMap when the selectionState is not defined')
        const url = fn(siteMap, sel)
        return url ? fetch(url).then(r => r.json()) : Promise.resolve(undefined)
    }
}

const loadSiteMapF = fetcherWhenUndefined<State, SiteMap>(
    stateToSiteMapL,
    () => loadFromUrl<SiteMap>()("someUrl"), "loadSiteMapF")

function holderIso<T>(description: string): Iso<Holder<T>, [string[], T]> {
    return iso(
        holder => [holder.tags, holder.t],
        arr => ({t: arr[1], tags: arr[0]}),
        description
    )
}

const loadApiF: Fetcher<State> = selStateFetcher(stateL.focusOn('selState'), holderIso<ApiData>('H/ApiData'))
(sel => [sel?.selectedEntity, sel?.selectedApi],
    stateL.focusQuery('apiData'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.self), "loadApiF")


const loadThingF: Fetcher<State> = selStateFetcher<State, SelectionState, Holder<Thing>, Thing>(
    stateL.focusOn('selState'),
    holderIso<Thing>('H/Thing'))(
    s => [s.selectedEntity, s.selectedThing],
    stateL.focusQuery('thing'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedThing && siteMap[sel.selectedEntity].things[sel.selectedThing].href), 'LoadThingF')

let apiDataL: Optional<State, ApiData> = stateL.focusQuery('apiData').focusQuery('t')

const loadApiDescF: Fetcher<State> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('desc'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.description),
    "loadApiDescF")

const loadApiStatus: Fetcher<State> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('status'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.status),
    "loadApiStatus")

const loadApiSrc: Fetcher<State> = fetcherWhenUndefined<State, string[]>(
    apiDataL.focusQuery("source"),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.source),
    "loadApiSrc")


const loadApiChild = fetchRadioButton<State>(
    s => s.selState?.tag,
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
            "  loadSiteMapF",
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
                [loadSiteMapF, false],
                [loadThingF, false],
                [loadApiF, false],
                [loadApiChild, false],
            ]
        )
    })
    it("for empty", () => {
        expect(wouldLoad(demoTree, {selState: {}})).toEqual([
                [loadSiteMapF, true],
                [loadThingF, false],
                [loadApiF, false],
                [loadApiChild, false],
            ]
        )
    })
    it("when sitemap loaded and no thing desired or actual", () => {
        expect(wouldLoad(demoTree, {sitemap: exampleSiteMap, selState: {}})).toEqual([
                [loadSiteMapF, false],
                [loadThingF, false],
                [loadApiF, false],
                [loadApiChild, false],
            ]
        )
    })
    it("when sitemap loaded and thing desired but no actual", () => {
        expect(wouldLoad(demoTree, {
            sitemap: exampleSiteMap,
            selState: {selectedEntity: "be", selectedThing: "t1"}
        })).toEqual([
                [loadSiteMapF, false],
                [loadThingF, true],
                [loadApiF, false],
                [loadApiChild, false],
            ]
        )
    })
})
describe("wouldLoadDescription should report what a fetchTree would do for the current state. ", () => {
    it("for undefined", () => {
        expect(wouldLoadDescription<State>(demoTree, undefined)).toEqual([
            "loadSiteMapF false",
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
            "loadSiteMapF true",
            "  Iso(I)",
            "    LoadThingF false",
            "  Iso(I)",
            "    loadApiF false",
            "      Iso(I)",
            "        loadApiChild false"
        ])
    })
})
