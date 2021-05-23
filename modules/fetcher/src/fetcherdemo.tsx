import {Fetcher, fetcherWhenUndefined, from, lensFetcher, loadFromUrl, taggedFetcher, tags} from "./fetchers";
import {child, FetcherTree, fetherTree} from "./fetcherTree";
import {identityOptics} from "../../optics";

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

function siteMapLoader(bookmark: string): Promise<SiteMap> {
    return Promise.resolve({
        "be": entity("be"),
        "uk": entity("uk")
    })
}

export interface ApiData {
    api?: Api,
    source?: string[],
    status?: string,
    desc?: string
}

export interface SelectionState {
    tag: string,
    selectedEntity: string,
    selectedThing: string,
    selectedApi: string,
    apiView: 'desc' | 'src' | 'status'
}

export interface State {
    sitemap?: SiteMap,
    entity?: Entity,
    apiData?: ApiData,
    thing?: Thing,
    desiredSelection: SelectionState,
    currentSelection?: SelectionState,
}

export const stateL = identityOptics<State>()
export const stateToSiteMapL = stateL.focusQuery('sitemap')

function loadFromSiteMap<T>(fn: (siteMap: SiteMap, s: SelectionState) => string) {
    return (ns: State): Promise<T> => {
        const siteMap = ns.sitemap
        const sel = ns.desiredSelection
        const url = fn(siteMap, sel)
        return fetch(url).then(r => r.json())
    }
}

const loadSiteMapF = fetcherWhenUndefined<State, SiteMap>(
    stateToSiteMapL,
    () => loadFromUrl<SiteMap>()("someUrl"))

const loadApiF: Fetcher<State> = lensFetcher<State, ApiData>(
    stateL.focusQuery('apiData'),
    tags(s => [s.currentSelection.selectedEntity, s.currentSelection.selectedApi], s => [s.desiredSelection.selectedEntity, s.desiredSelection.selectedApi]),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.self))

const loadThingF: Fetcher<State> = fetcherWhenUndefined<State, Thing>(
    stateL.focusQuery('thing'),
    () => loadFromUrl<Thing>()("someUrl"))

let apiDataL = stateL.focusQuery('apiData')

const loadApiDescF: Fetcher<State> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('desc'),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.description))

const loadApiStatus: Fetcher<State> = fetcherWhenUndefined<State, string>(
    apiDataL.focusOn('status'),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.status))

const loadApiSrc: Fetcher<State> = fetcherWhenUndefined<State, string[]>(
    apiDataL.focusOn("source"),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.source))

const loadApiChild = taggedFetcher<State>(
    s => s.desiredSelection.tag,
    from({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}))

const fetchGraph: FetcherTree<State> = fetherTree(
    loadSiteMapF,
    child(loadThingF),
    child(loadApiF,
        child(loadApiChild)))



