import {identityOptics, Lens} from "@focuson/lens";
import {applyFetcher, defaultFetchFn, Fetcher, FetchFn, MutateFn} from "./fetchers";

export interface FetcherTree<State> {
    fetcher: Fetcher<State, any>,
    children: FetcherChildLink<State, any>[]
}
export interface FetcherChildLink<State, Child> {
    lens: Lens<State, Child>,
    child: FetcherTree<Child>
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


export function foldFetchers<Result>(ft: FetcherTree<any>, foldFn: (acc: Result, v: Fetcher<any, any>, i?: number, depth?: number) => Result, start: Result, i?: number, depth?: number): Result {
    const num = i ? i : 0
    const d = depth ? depth : 0
    return ft.children.reduce<Result>((acc, fcl, i) => foldFetchers(fcl.child, foldFn, acc, d, i), foldFn(start, ft.fetcher, num, d + 1))
}


export interface WouldLoad {
    fetcher: Fetcher<any, any>,
    load: boolean,
    reqData?: [RequestInfo, RequestInit | undefined]
}

export function wouldLoad<T>(ft: FetcherTree<T>, state: T | undefined, depth?: number): WouldLoad[] {
    return foldFetchers<WouldLoad[]>(ft, (acc, fetcher) =>
        [...acc, fetcher.shouldLoad(state) ? {
            fetcher,
            load: true,
            reqData: [fetcher.load(state)[0], fetcher.load(state)[1]]
        } : {fetcher, load: false}], [])
}





const loadGraphChildLink = (fetchFn: FetchFn) => <State, Child>(ps: Promise<State | undefined>, g: FetcherChildLink<State, Child>): Promise<State | undefined> =>
    ps.then(ns => ns ? loadTree(g.child, g.lens.get(ns), fetchFn).then(nc => nc ? g.lens.set(ns, nc) : undefined) : undefined);


export async function loadTree<State>(fg: FetcherTree<State>, ns: State | undefined, fetchFn?: FetchFn): Promise<State | undefined> {
    const realFetch = fetchFn ? fetchFn : defaultFetchFn
    const initialValue: State | undefined = await applyFetcher(fg.fetcher, ns, realFetch)

    return fg.children.reduce<Promise<State | undefined>>(loadGraphChildLink(realFetch), Promise.resolve(initialValue))

}


export function fetcherTree<State>(fetcher: Fetcher<State, any>, ...children: FetcherChildLink<State, any>[]): FetcherTree<State> {
    return ({fetcher, children})
}

export function child<State>(fetcher: Fetcher<State, any>, ...children: FetcherChildLink<State, any>[]): FetcherChildLink<State, State> {
    return ({lens: identityOptics(), child: {fetcher, children}})
}

export function lensAndChild<State, Child>(lens: Lens<State, Child>, fetcher: Fetcher<Child, any>, ...children: FetcherChildLink<Child, any>[]): FetcherChildLink<State, Child> {
    return ({lens, child: {fetcher, children}})
}
