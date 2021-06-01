import {identityOptics, Lens, Optional} from "@focuson/lens";
import {applyFetcher, defaultFetchFn, Fetcher, FetchFn} from "./fetchers";
import {FetcherDebug} from "./setjson";

export interface FetcherTree<State> {
    fetchers: Fetcher<State, any>[],
    children: FetcherChildLink<State, any>[]
}
export interface FetcherChildLink<State, Child> {
    optional: Optional<State, Child>,
    children: FetcherTree<Child>
}
const blanks = "                                                       "

export function descriptionOf<T>(ft: FetcherTree<T>, depth?: number): string[] {
    const d = depth ? depth : 0
    const i = blanks.substr(0, d * 2)
    return [
        `${i}FetcherTree(`,
        ...ft.fetchers.map(f => `${i}  ${f.description}`),
        ...ft.children.flatMap(fcl => [`${i}   ${fcl.optional}`, ...descriptionOf(fcl.children, d + 3)])]
}

export interface WouldLoad {
    fetcher: Fetcher<any, any>,
    load: boolean,
    reqData?: [RequestInfo, RequestInit | undefined]
}

export function foldFetchers<Result>(ft: FetcherTree<any>, stateOptional: Optional<any, any>, foldFn: (acc: Result, v: Fetcher<any, any>, stateOptional: Optional<any, any>, i?: number, depth?: number) => Result, start: Result, i?: number, depth?: number): Result {
    const d = depth ? depth : 0
    let withTheseFetchers = ft.fetchers.reduce((acc, f, i) => foldFn(acc, f, stateOptional, i, d), start)
    let result = ft.children.reduce<Result>((acc, fcl, i) => foldFetchers(fcl.children, stateOptional.chain(fcl.optional), foldFn, acc, i, d + 1), withTheseFetchers);
    return result
}

export function wouldLoad<State>(ft: FetcherTree<State>, state: State): WouldLoad[] {
    return foldFetchers<WouldLoad[]>(ft, identityOptics(), (acc, fetcher, stateOpt, i, depth) => {
        const localState = stateOpt.getOption(state)
        let shouldLoad = localState !== undefined && fetcher.shouldLoad(localState);
        return [...acc,
            shouldLoad ?
                {fetcher, load: true, reqData: [fetcher.load(localState)[0], fetcher.load(localState)[1]]} :
                {fetcher, load: false}]
    }, [])
}

const loadGraphChildLink = (fetchFn: FetchFn, debug?: FetcherDebug) => <State, Child>(ps: Promise<State>, g: FetcherChildLink<State, Child>): Promise<State> =>
    ps.then(ns => {
        const cs = g.optional.getOption(ns)
        return cs ? loadTree(g.children, cs, fetchFn, debug).then(nc => nc ? g.optional.set(ns, nc) : undefined) : ns
    });

export async function loadTree<State>(fg: FetcherTree<State>, ns: State, fetchFn?: FetchFn, debug?: FetcherDebug): Promise<State> {
    const realFetch = fetchFn ? fetchFn : defaultFetchFn
    const initialValue: State = await fg.fetchers.reduce((acc, pf) => acc.then(s => applyFetcher(pf, s, fetchFn, debug)), Promise.resolve(ns))
    return fg.children.reduce<Promise<State | undefined>>(loadGraphChildLink(realFetch), Promise.resolve(initialValue))
}


export function fetcherTree<State>(fetcher: Fetcher<State, any>, ...children: FetcherChildLink<State, any>[]): FetcherTree<State> {
    return ({fetchers: [fetcher], children})
}

export function child<State>(fetcher: Fetcher<State, any>, ...children: FetcherChildLink<State, any>[]): FetcherChildLink<State, State> {
    return ({optional: identityOptics(), children: {fetchers: [fetcher], children}})
}
export function children<State>(fetcher: Fetcher<State, any>[], ...children: FetcherChildLink<State, any>[]): FetcherChildLink<State, State> {
    return ({optional: identityOptics(), children: {fetchers: fetcher, children}})
}
export function lensAndChildren<State, Child>(optional: Optional<State, Child>, fetchers: Fetcher<Child, any>[], ...children: FetcherChildLink<Child, any>[]): FetcherChildLink<State, Child> {
    return ({optional, children: {fetchers, children}})
}
export function lensAndChild<State, Child>(optional: Optional<State, Child>, fetcher: Fetcher<Child, any>, ...children: FetcherChildLink<Child, any>[]): FetcherChildLink<State, Child> {
    return ({optional, children: {fetchers: [fetcher], children}})
}
