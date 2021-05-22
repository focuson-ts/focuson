import {
    Fetcher,
    fetcher,
    from,
    lensFetcher,
    lensFetcherWhenUndefined,
    loadFromUrl,
    loadIfUndefined,
    taggedFetcher,
    tags
} from "./fetchers";
import {Lens, Lenses} from "../../lens";
import {child, FetcherGraph, fetcherGraph} from "./fetcherGraph";

export interface SiteMap {
    [entity: string]: Entity
}

export interface Entity {
    things: { [thingname: string]: Thing, },
    api: { [apiname: string]: Api, }
}

export interface Api {
    name: string,
    description: string
}

export interface Thing {
    name: string,
    description: string
}

function entity(e: string): Entity {
    return ({
        things: {
            t1: {name: `${e}1`, description: `${e}d1`},
            t2: {name: `${e}2`, description: `${e}d2`}
        },
        api: {
            a1: {name: `${e}1`, description: `${e}d1`},
            a2: {name: `${e}2`, description: `${e}d2`}
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

export interface State {
    sitemap?: SiteMap,
    entity: Entity | undefined,
    apiData: ApiData,
    thing: Thing | undefined,
    selectionState: {
        tag: string,
        selectedEntity: string,
        selectedThing: string,
        selectedApi: string,
        apiView: 'desc' | 'src' | 'status'
    }
}

export const stateL = Lenses.build<State>('state')
export const stateToSiteMapL = stateL.focusOn('sitemap')

const loadSiteMapF = lensFetcherWhenUndefined<State, SiteMap>(
    stateToSiteMapL,
    () => loadFromUrl<SiteMap>()("someUrl"))

const loadApiF: Fetcher<State> = lensFetcher<State, ApiData>(
    stateL.focusOn('apiData'),
    tags(s => [s.selectionState.selectedEntity, s.selectionState.selectedApi]),
    () => loadFromUrl<Api>()("someApiUrl").then(api => ({api})))

const loadThingF: Fetcher<State> = lensFetcherWhenUndefined<State, Thing>(
    stateL.focusOn('thing'),
    () => loadFromUrl<Thing>()("someUrl"))

const loadApiDescF: Fetcher<State> = lensFetcherWhenUndefined<State, string>(
    stateL.focusOn('apiData').focusOn('desc'),
    () => loadFromUrl<string>()("someUrl"))

const loadApiStatus: Fetcher<State> = lensFetcherWhenUndefined<State, string>(
    stateL.focusOn('apiData').focusOn('status'),
    () => loadFromUrl<string>()("someUrl"))

const loadApiSrc: Fetcher<State> = lensFetcherWhenUndefined<State, string[]>(
    stateL.focusOn('apiData').focusOn("source"),
    () => loadFromUrl<string[]>()("someUrl"))

const loadApiChild = taggedFetcher(stateL.focusOn('selectionState').focusOn('tag'),
    from({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}))

const fetchGraph: FetcherGraph<State> = fetcherGraph(
    loadSiteMapF,
    child(loadThingF),
    child(loadApiF,
        child(loadApiChild)))



