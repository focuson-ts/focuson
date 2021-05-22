import {Lens, Lenses} from "../../lens";
import {Fetcher} from "./fetchers";

export interface FetcherGraph<State> {
    fetcher: Fetcher<State>,
    children: FetcherChildLink<State, any>[]
}

export interface FetcherChildLink<State, Child> {
    lens: Lens<State, Child>,
    child: FetcherGraph<Child>
}

export function loadIfNeeded<State>(f: Fetcher<State>) {
    return (os: State, ns: State) => (f.shouldLoad(os, ns) ? f.load(os, ns) : Promise.resolve(ns)).catch(e => f.onError(ns, e))

}


const loadGraphChildLink = <State>(os: State) => <Child>(ps: Promise<State>, g: FetcherChildLink<State, Child>): Promise<State> =>
    ps.then(ns => loadGraph(g.child, g.lens.get(os), g.lens.get(ns)).then(nc => g.lens.set(ns, nc)));


function loadGraph<State>(fg: FetcherGraph<State>, os: State, ns: State): Promise<State> {
    return loadIfNeeded(fg.fetcher)(os, ns).then(ns => fg.children.reduce(loadGraphChildLink(os), loadIfNeeded(fg.fetcher)(os, ns)))

}

export function graphAsFetcher<State>(fg: FetcherGraph<State>): Fetcher<State> {
    return ({
        shouldLoad: () => true,//we will always execute load
        load: (os, ns) => loadGraph(fg, os, ns),
        onError: (s, e) => fg.fetcher.onError(s, e)
    })
}

export function fetcherGraph<State>(fetcher: Fetcher<State>, ...children: FetcherChildLink<State, any>[]): FetcherGraph<State> {
    return ({fetcher, children})
}

export function child<State>(fetcher: Fetcher<State>, ...children: FetcherChildLink<State, any>[]): FetcherChildLink<State, State> {
    return ({lens: Lenses.identity(), child: {fetcher, children}})
}

export function lensAndChild<State, Child>(lens: Lens<State, Child>, fetcher: Fetcher<Child>, ...children: FetcherChildLink<Child, any>[]): FetcherChildLink<State, Child> {
    return ({lens, child: {fetcher, children}})
}
