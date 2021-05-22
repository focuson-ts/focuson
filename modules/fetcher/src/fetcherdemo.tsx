import {Fetcher, fetcher, from, loadFromUrl, loadIfUndefined, taggedFetcher, tags} from "./fetchers";
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

export interface State {
    sitemap?: SiteMap,
    entity: Entity | undefined,
    api: Api | undefined
    apiSource: string[],
    apiStatus: string
    apiDesc: string
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

const loadSiteMapF = fetcher<State>(loadIfUndefined(stateToSiteMapL), loadFromUrl(stateToSiteMapL)("someUrl"))

const loadApiF: Fetcher<State> = fetcher<State>(
    tags(s => [s.selectionState.selectedEntity, s.selectionState.selectedApi]),
    loadFromUrl(stateL.focusOn('api'))("someUrl"))

const loadThingF: Fetcher<State> = fetcher<State>(
    tags(s => [s.selectionState.selectedEntity, s.selectionState.selectedThing]),
    loadFromUrl(stateL.focusOn('api'))("someUrl"))

const loadApiDescF: Fetcher<State> = fetcher<State>(
    tags(s => [s.selectionState.selectedEntity, s.selectionState.selectedApi]),
    loadFromUrl(stateL.focusOn('apiDesc'))("someUrl"))

const loadApiStatus: Fetcher<State> = fetcher<State>(
    tags(s => [s.selectionState.selectedEntity, s.selectionState.selectedApi]),
    loadFromUrl(stateL.focusOn('apiStatus'))("someUrl"))

const loadApiSrc: Fetcher<State> = fetcher<State>(
    tags(s => [s.selectionState.selectedEntity, s.selectionState.selectedApi]),
    loadFromUrl(stateL.focusOn('apiSource'))("someUrl"))

const loadApiChild = taggedFetcher(stateL.focusOn('selectionState').focusOn('tag'),
    from({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}))

const fetchGraph: FetcherGraph<State> = fetcherGraph(
    loadSiteMapF,
    child(loadThingF),
    child(loadApiF,
        child(loadApiChild)))



