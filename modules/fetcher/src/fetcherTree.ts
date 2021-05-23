import {identityOptics, Lens} from "../../optics";
import {Fetcher} from "./fetchers";

export interface FetcherTree<State> {
    fetcher: Fetcher<State>,
    children: FetcherChildLink<State, any>[]
}

const blanks = "                                                       "

export function descriptionOf<T>(ft: FetcherTree<T>, depth?: number): string[] {
    const d = depth ? depth : 0
    const i = blanks.substr(0, d * 2)
    return [
        `${i}FetcherTree(`,
        `${i}  ${ft.fetcher.description}`,
        ...ft.children.flatMap(fcl => [`${i}   ${fcl.lens}`, ...descriptionOf(fcl.child, d + 3)])]
}

export function wouldLoadDescription<T>(ft: FetcherTree<T>, state: T | undefined, depth?: number): string[] {
    const d = depth ? depth : 0
    const i = blanks.substr(0, d * 2)
    return [
        `${i}${ft.fetcher.description} ${ft.fetcher.shouldLoad(state)}`,
        ...ft.children.flatMap(fcl => [`${i}  ${fcl.lens}`, ...wouldLoadDescription(fcl.child, state, d + 2)])]
}

export function foldFetchers<Result>(ft: FetcherTree<any>, foldFn: (acc: Result, v: Fetcher<any>, i?: number, depth?: number) => Result, start: Result, i?: number, depth?: number): Result {
    const num = i ? i : 0
    const d = depth ? depth : 0
    return ft.children.reduce<Result>((acc, fcl, i) => foldFetchers(fcl.child, foldFn, acc, d, i), foldFn(start, ft.fetcher, num, d + 1))
}

export function wouldLoad<T>(ft: FetcherTree<T>, state: T | undefined, depth?: number): [Fetcher<any>, boolean][] {
    return foldFetchers<[Fetcher<any>, boolean][]>(ft, (acc, f) => [...acc, [f, f.shouldLoad(state)]], [])
}

export interface FetcherChildLink<State, Child> {
    lens: Lens<State, Child>,
    child: FetcherTree<Child>
}

export const loadIfNeeded = <State>(f: Fetcher<State>) =>
    (ns: State | undefined): Promise<State | undefined> => f.shouldLoad(ns) ? f.load(ns) : Promise.resolve(ns);


const loadGraphChildLink = <State, Child>(ps: Promise<State>, g: FetcherChildLink<State, Child>): Promise<State | undefined> =>
    ps.then(ns => loadGraph(g.child, g.lens.get(ns)).then(nc => nc ? g.lens.set(ns, nc) : undefined));


async function loadGraph<State>(fg: FetcherTree<State>, ns: State | undefined): Promise<State | undefined> {
    let initialValue = await loadIfNeeded(fg.fetcher)(ns);
    return initialValue ? fg.children.reduce(loadGraphChildLink, Promise.resolve(initialValue)) : undefined
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

export function fetcherTree<State>(fetcher: Fetcher<State>, ...children: FetcherChildLink<State, any>[]): FetcherTree<State> {
    return ({fetcher, children})
}

export function child<State>(fetcher: Fetcher<State>, ...children: FetcherChildLink<State, any>[]): FetcherChildLink<State, State> {
    return ({lens: identityOptics(), child: {fetcher, children}})
}

export function lensAndChild<State, Child>(lens: Lens<State, Child>, fetcher: Fetcher<Child>, ...children: FetcherChildLink<Child, any>[]): FetcherChildLink<State, Child> {
    return ({lens, child: {fetcher, children}})
}
