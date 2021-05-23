import {identityOptics, Lens} from "../../optics";
import {Fetcher} from "./fetchers";

export interface FetcherTree<State> {
    fetcher: Fetcher<State>,
    children: FetcherChildLink<State, any>[]
}

export interface FetcherChildLink<State, Child> {
    lens: Lens<State, Child>,
    child: FetcherTree<Child>
}

export function loadIfNeeded<State>(f: Fetcher<State>) {
    return (ns: State | undefined): Promise<State> => {
        if (f.shouldLoad(ns)) return f.load(ns)
        if (ns) return Promise.resolve(ns)
        throw new Error('Cannt handle undefined')
    }
}


const loadGraphChildLink = <State, Child>(ps: Promise<State>, g: FetcherChildLink<State, Child>): Promise<State> =>
    ps.then(ns => loadGraph(g.child, g.lens.get(ns)).then(nc => g.lens.set(ns, nc)));


function loadGraph<State>(fg: FetcherTree<State>, ns: State | undefined): Promise<State> {
    let initialValue: Promise<State> = loadIfNeeded(fg.fetcher)(ns);
    return fg.children.reduce(loadGraphChildLink, initialValue)
}

export function graphAsFetcher<State>(fg: FetcherTree<State>): Fetcher<State> {
    return ({
        shouldLoad: () => true,//we will always execute load
        load: (ns): Promise<State> => {
            let result = loadGraph<State>(fg, ns)
            return result.then(r => {
                if (r) return r
                if (ns) return ns
                throw new Error("Cannot fetch and state is undefined")
            })
        },
        description: "graphAsFetcher"
    })
}

export function fetherTree<State>(fetcher: Fetcher<State>, ...children: FetcherChildLink<State, any>[]): FetcherTree<State> {
    return ({fetcher, children})
}

export function child<State>(fetcher: Fetcher<State>, ...children: FetcherChildLink<State, any>[]): FetcherChildLink<State, State> {
    return ({lens: identityOptics(), child: {fetcher, children}})
}

export function lensAndChild<State, Child>(lens: Lens<State, Child>, fetcher: Fetcher<Child>, ...children: FetcherChildLink<Child, any>[]): FetcherChildLink<State, Child> {
    return ({lens, child: {fetcher, children}})
}
