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
    entity?: Entity,
    apiData?: ApiData,
    thing?: Thing,
    selectionState?: {
        tag: string,
        selectedEntity: string,
        selectedThing: string,
        selectedApi: string,
        apiView: 'desc' | 'src' | 'status'
    }
}
