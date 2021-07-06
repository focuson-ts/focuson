/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
import {DirtyPrism, firstIn2, Optional} from "@focuson/lens";
import {FetcherDebug} from "./setjson";

export interface FetchFn {
    <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]>
}

export const defaultFetchFn = <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]> => {
    if (re === "") throw Error('calling defaultFetchFn with empty string as url')
    return fetch(re, init).then(r => r.json().then(json => [r.status, json]));
}

export function loggingFetchFn<T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]> {
    console.log("fetching from", re, init)
    return defaultFetchFn(re, init)
}

export interface MutateFn<State, T> {
    (s: State): (status: number, json: T) => State
}


/** The RequestInfo/RequestInit are enough information to do a fetch. The mutationFn will mutate the state with the results of the fetch, The array of fetchers is 'what we should fetch after loading this'
 * Once it's finished there is an array of other things to load....
 *
 * Why do we have this structure? It's so that we can compose fetchers and make bigger fetchers out of little fetchers in a way that is easy to test and reason about.
 */
export interface LoadInfo<State, T> {
    requestInfo: RequestInfo,
    requestInit?: RequestInit,
    mutate: MutateFn<State, T>,
    useThisInsteadOfLoad?: (s: State) => State
}
export function loadInfo<State, T>(requestInfo: RequestInfo,
                                   requestInit: RequestInit | undefined,
                                   mutate: MutateFn<State, T>,
                                   useThisInsteadOfLoad?: (s: State) => State): LoadInfo<State, T> {
    return {requestInfo, requestInit, mutate, useThisInsteadOfLoad}
}
export function loadDirectly<State>(useThisInsteadOfLoad: (s: State) => State): LoadInfo<State, any> {
    return ({requestInfo: "", mutate: os => (s, j) => os, useThisInsteadOfLoad})
}

/** returns an array of LoadInfo... all the information needed to load something for a fetcher. It is not defined to call the LoadFn, if the fetchers 'shouldLoad' returns false
 * Tis returns an array to allow us to compose fetchers easily
 * */
export interface LoadFn<State, T> {
    (newState: State): LoadInfo<State, T>
}

export interface ReqFn<State> {
    (newState: State): [RequestInfo, RequestInit | undefined] | undefined
}


/** The fetcher is responsible for modifying state. It is effectively a PartialFunction */
export interface Fetcher<State, T> {
    /** This works out if we need to load. Typically is a strategy */
    shouldLoad: (newState: State) => boolean,
    /** This provides the info that we need to load. The first two parameters can be passed to fetch, and the third is how we process the result.
     * Note that it is hard to guarantee that the json is a T, so you might want to check it     * */
    load: LoadFn<State, T>,
    /** For debugging and testing. It's idiomatically normal to make this the variable name of your fetcher, or some other description that makes sense to you */
    description: string
}


export function fetcher<State, T>(shouldLoad: (ns: State) => boolean,
                                  load: LoadFn<State, T>,
                                  description: string): Fetcher<State, T> {
    return ({shouldLoad, load, description})
}


export const applyFetcher = <State, T>(fetcher: Fetcher<State, T>, s: State, fetchFn: (re: RequestInfo, init?: RequestInit) => Promise<[number, T]>, debug?: FetcherDebug): Promise<State | undefined> => {
    const fetcherDebug = debug?.fetcherDebug
    if (fetcherDebug) console.log("applyFetcher", fetcher.description, s)
    if (fetcher.shouldLoad(s)) {
        const {requestInfo, requestInit, mutate, useThisInsteadOfLoad} = fetcher.load(s)
        if (fetcherDebug) console.log("applyFetcher - loading", requestInfo, requestInit, mutate, useThisInsteadOfLoad)
        if (useThisInsteadOfLoad) {
            if (fetcherDebug) console.log("apply fetcher - using useThisInsteadOfLoad", fetcher.description, useThisInsteadOfLoad, s)
            let result = useThisInsteadOfLoad(s);
            if (fetcherDebug) console.log("apply fetcher - result of useThisInsteadOfLoad is", fetcher.description, result)
            return Promise.resolve(result)
        } else {
            if (requestInfo === "") {
                let message = `applyFetcher - have no useThisInsteadOfLoad, but have empty request string for ${fetcher.description}`;
                if (fetcherDebug) console.error(message)
                throw Error(message)
            }
        }
        return fetchFn(requestInfo, requestInit).then(([status, json]) => {
            if (fetcherDebug) console.log("applyFetcher - fetched", requestInfo, requestInit, status, json)
            let result = mutate(s)(status, json);
            if (fetcherDebug) console.log("applyFetcher - result", result)
            return result
        })
    } else if (fetcherDebug) console.log("didn't load", fetcher.description)
    return Promise.resolve(s)
}

export function partialFnUsageError<State, T>(f: Fetcher<State, T>) {
    return Error(`Load called for ${f.description}. The shouldLoad should have returned false. This is a programming error`)
}

export function loadIfMarkerChangesFetcher<State, T>(actualMarker: Optional<State, string>, selectedMarker: Optional<State, string>, target: Optional<State, T>, reqFn: ReqFn<State>, description?: string): Fetcher<State, T> {
    let shouldLoad = (ns: State): boolean => {
        const actual = actualMarker.getOption(ns)
        const selected = selectedMarker.getOption(ns)
        return selected != undefined && actual != selected
    }


    let result: Fetcher<State, T> = {
        shouldLoad,
        load: (ns: State): LoadInfo<State, T> => {
            const req = reqFn((ns))
            if (!req) throw partialFnUsageError(result)
            const [reqInfo, reqInit] = req
            let mutate: MutateFn<State, T> = s => (status, json) => {
                if (!s) throw partialFnUsageError(result)
                let selected = selectedMarker.getOption(s);
                if (!selected) throw partialFnUsageError(result)
                let withActual = actualMarker.setOption(s, selected)
                if (!withActual) throw partialFnUsageError(result)
                return target.set(withActual, json)
            }
            return loadInfo(reqInfo, reqInit, mutate)
        },
        description: description ? description : `loadIfMarkerChangesFetcher(actualMarker=${actualMarker.description}, selectedMarker=${selectedMarker},target=${target.description})`
    }
    return result
}

export function ifErrorFetcher<State, T>(fetcher: Fetcher<State, T>, onError: (e: any) => (s: State) => State, description?: string): Fetcher<State, T> {
    return ({
        shouldLoad: fetcher.shouldLoad,
        load(s) {
            try {
                return fetcher.load(s)
            } catch (e) {
                return loadDirectly(onError(e))
            }
        },
        description: description ? description : `ifErrorFetcher(${fetcher.description})`
    })
}

export function lensFetcher<State, Child, T>(lens: Optional<State, Child>, fetcher: Fetcher<Child, T>, description?: string): Fetcher<State, T> {
    let result: Fetcher<State, T> = ({
        shouldLoad: (ns) => {
            if (!ns) return false
            let nc = lens.getOption(ns);
            return fetcher.shouldLoad(nc)
        },
        load(ns) {
            const cs: Child | undefined = lens.getOption(ns)
            const {requestInfo, requestInit, mutate, useThisInsteadOfLoad} = fetcher.load(cs)
            const mutateFn: MutateFn<State, T> = s => (status, json) => lens.set(s, mutate(lens.getOption(s))(status, json))
            return loadInfo(requestInfo, requestInit, mutateFn)
        },
        description: description ? description : "lensFetcher(" + lens + "," + fetcher.description + ")"
    })
    return result
}


export function ifEEqualsFetcher<State>(condition: (s: State) => boolean, fetcher: Fetcher<State, any>, description?: string): Fetcher<State, any> {
    return ({
        shouldLoad: (ns: State) => condition(ns) && fetcher.shouldLoad(ns),
        load: (ns: State) => fetcher.load(ns),
        description: description ? description : `ifEqualsFetcher(${fetcher.description})`
    });
}


export function fetcherWhenUndefined<State, Child>(optional: Optional<State, Child>,
                                                   reqFn: ReqFn<State>,
                                                   description?: string): Fetcher<State, Child> {
    let result: Fetcher<State, Child> = ({
        shouldLoad: (ns) => {
            let nc = optional.getOption(ns);
            try {
                let req = reqFn(ns)
                return req != undefined && nc == undefined
            } catch (e) {
                return false
            }
        },
        load(s) {
            const req = reqFn(s);
            if (req === undefined) throw partialFnUsageError(result)
            const [url, init] = req;
            let mutate: MutateFn<State, Child> = s => (status, json) => optional.set(s, json)
            return loadInfo(url, init, mutate)
        },
        description: description ? description : "fetcherWhenUndefined(" + optional + ")"
    })
    return result
}

export function fetchAndMutate<State, T>(f: Fetcher<State, T>, fn: (s: State) => State, description?: string): Fetcher<State, T> {
    let result: Fetcher<State, T> = {
        shouldLoad: f.shouldLoad,
        load: s => {
            const {requestInfo, requestInit, mutate, useThisInsteadOfLoad} = f.load(s)
            const newMutate: MutateFn<State, T> = s => (status, json) => fn(mutate(s)(status, json))
            return loadInfo(requestInfo, requestInit, newMutate, useThisInsteadOfLoad)
        },
        description: description ? description : f.description + ".withMutate"
    }
    return result
}

function areAllDefined<T>(arr: (T | undefined)[]): arr is T[] {
    return arr.reduce<boolean>((acc, t) => (t != undefined) && acc, true)
}

export function not200MeansError<State, Holder>(req: [RequestInfo, RequestInit | undefined], tags: (string | undefined)[], s: State, status: number): Holder {
    throw Error(`req ${req[0]} ${req[1]} caused status code ${status}`)
}

export type Tags = (string | undefined)[]
export const loadSelectedFetcher = <State, Holder, T>(tagFn: (s: State) => Tags,
                                                      holderPrism: DirtyPrism<Holder, [Tags, T]>,
                                                      target: Optional<State, Holder>,
                                                      reqFn: ReqFn<State>,
                                                      not200?: (req: [RequestInfo, RequestInit | undefined], tags: Tags, s: State, status: number) => Holder,
                                                      onError?: (e: any) => (s: State) => State,
                                                      description?: string): Fetcher<State, T> => {
    let actualOnNotFound: (req: [RequestInfo, RequestInit | undefined], tags: Tags, s: State, status: number) => Holder
        = not200 ? not200 : not200MeansError
    let currentTagFn = target.chain(holderPrism).chain(firstIn2()).getOption
    let result: Fetcher<State, T> = {
        shouldLoad: (s: State): boolean => {
            try {
                const desiredTags = s ? tagFn(s) : [];
                const allTagsDefined = areAllDefined(desiredTags)
                const req = s && reqFn(s)
                return (s != undefined) && (req != undefined) && allTagsDefined && !arraysEqual(currentTagFn(s), desiredTags);
            } catch (e) {
                if (!onError) throw e
                return true

            }
        },
        load: (s: State) => {
            try {
                const desiredTags: Tags = tagFn(s)
                if (!areAllDefined(desiredTags)) throw partialFnUsageError(result)
                const req = reqFn(s);
                if (!req) throw partialFnUsageError(result)
                const [url, info] = req
                const mutateForHolder: MutateFn<State, T> = state => (status, json) => {
                    if (!state) throw partialFnUsageError(result)
                    return target.set(state, (status < 300) ? holderPrism.reverseGet([desiredTags, json]) : actualOnNotFound(req, desiredTags, state, status))
                }
                return loadInfo(url, info, mutateForHolder)
            } catch (e) {
                return loadDirectly(onError(e))
            }
        },
        description: description ? description : "selStateFetcher(holder=" + holderPrism + ",target=" + target + ",onError=" + (onError != undefined) + ")"
    };
    return result
};


export const loadFromUrl = <T>(fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>) =>
    (url: RequestInfo, init?: RequestInit): Promise<T> => {
        const f = fetchFn ? fetchFn : fetch
        return f(url, init).then(r => r.json());
    }


export function arraysEqual<T>(a: T[] | undefined, b: T[] | undefined) {
    if (a === b) return true;
    if (!(a && b)) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

export function fetcherWithHolder<State, Holder, T>(target: Optional<State, Holder>, holder: DirtyPrism<Holder, T>, fetcher: Fetcher<T | undefined, T>, description?: string): Fetcher<State, T> {
    const targetThenOptional = target.chain(holder)
    return {
        shouldLoad: (ns) => fetcher.shouldLoad(targetThenOptional.getOption(ns)),
        load(ns) {
            const originalTarget: T | undefined = targetThenOptional.getOption(ns)
            const {requestInfo, requestInit, mutate, useThisInsteadOfLoad} = fetcher.load(originalTarget)
            let newMutate = (s: State) => (status: number, t: T) => {
                let x = mutate(targetThenOptional.getOption(s))(status, t)
                return target.set(s, holder.reverseGet(x))
            };
            return {requestInfo, requestInit, mutate: newMutate} //TODO what should we do if 'useThisInsteadOfLoad' is defined
        },
        description: description ? description : `fetcherWithHolder(${target},${holder}, ${fetcher})`
    }

}

