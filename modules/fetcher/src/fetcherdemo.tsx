import {Fetcher, fetcherWhenUndefined, loadFromUrl, selStateFetcher} from "./fetchers";
import {child, FetcherTree, fetherTree} from "./fetcherTree";
import {identityOptics, Iso, Optional} from "../../optics";
import {fetchRadioButton, fromTaggedFetcher} from "./RadioButtonFetcher";

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

interface Holder<T> {
    t: T,
    tags: string[]
}

export interface State {
    sitemap?: SiteMap,
    entity?: Entity,
    apiData?: Holder<ApiData>,
    thing?: Thing,
    selState: SelectionState,
    radioButton: string
}

export const stateL = identityOptics<State>()
export const stateToSiteMapL = stateL.focusQuery('sitemap')

function loadFromSiteMap<T>(fn: (siteMap: SiteMap, s: SelectionState) => string) {
    return (ns: State): Promise<T> => {
        const siteMap = ns.sitemap
        if (siteMap == undefined) throw new Error('Trying to load from siteMap when the site map is not defined')
        const sel = ns.selState
        const url = fn(siteMap, sel)
        return fetch(url).then(r => r.json())
    }
}

const loadSiteMapF = fetcherWhenUndefined<State, SiteMap>(
    stateToSiteMapL,
    () => loadFromUrl<SiteMap>()("someUrl"))

function holderIso<T>(): Iso<Holder<T>, [string[], T]> {
    return new Iso<Holder<T>, [string[], T]>(
        holder => [holder.tags, holder.t],
        arr => ({t: arr[1], tags: arr[0]}))
}

const loadApiF: Fetcher<State> = selStateFetcher(stateL.focusOn('selState'), holderIso<ApiData>())
(sel => [sel.selectedEntity, sel.selectedApi],
    stateL.focusQuery('apiData'),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.self))


const loadThingF: Fetcher<State> = fetcherWhenUndefined<State, Thing>(
    stateL.focusQuery('thing'),
    () => loadFromUrl<Thing>()("someUrl"))

let apiDataL: Optional<State, ApiData> = stateL.focusQuery('apiData').focusQuery('t')

const loadApiDescF: Fetcher<State> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('desc'),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.description))

const loadApiStatus: Fetcher<State> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('status'),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.status))

const loadApiSrc: Fetcher<State> = fetcherWhenUndefined<State, string[]>(
    apiDataL.focusQuery("source"),
    loadFromSiteMap((siteMap, sel) => siteMap[sel.selectedEntity].api[sel.selectedApi]._links.source))


const loadApiChild = fetchRadioButton<State>(
    s => s.selState.tag,
    identityOptics<State>().focusOn('radioButton'),
    fromTaggedFetcher({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}))

const fetchGraph: FetcherTree<State> = fetherTree(
    loadSiteMapF,
    child(loadThingF),
    child(loadApiF,
        child(loadApiChild)))



