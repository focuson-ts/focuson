/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
import {DirtyPrism, firstIn2, Optional} from "@focuson/lens";
import {FetcherDebug} from "./setjson";
import {partialFnUsageError} from "./errorhandling";

/** This is a wrapper for the javascript fetch function. The input parameters are the same as for fetch. The output is the statuscode and a T, where T is the expected json type
 *
 * T is probably not meaningful if the status code is not a 2xx
 * */
export interface FetchFn {
    (re: RequestInfo, init?: RequestInit): Promise<[number, any]>
}

/** Normally we would use the defaultFetchFn or the loggingFetchFn */
export const defaultFetchFn = <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]> => {
    if (re === "") throw Error('calling defaultFetchFn with empty string as url')
    return fetch(re, init).then(r => r.json().then(json => [r.status, json]));
}

/** Normally we would use the defaultFetchFn or the loggingFetchFn */
export function loggingFetchFn<T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]> {
    console.log("fetching from", re, init)
    return defaultFetchFn(re, init)
}

/** One of our design principles is that we separate 'what we do' from 'doing it'. This eases testing enormously.
 *
 * The mutate function is 'what I will do when I have loaded the data'.*/
export interface MutateFn<State, T> {
    (s: State): (status: number, json: T) => State
}


/**  This is an area that could be refactored...
 *
 * The requestInfo/requestInit tell us what to load, the mutate tells us what to do with the information we have loaded.
 * BUT the useThisInsteadOfLoad overwrites that behavior. If set, we don't load.
 *
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

/** This works out what is to be loaded from the state. A loadFn is typically part of a single fetcher */
export interface LoadFn<State, T> {
    (state: State): LoadInfo<State, T>
}

/** Given a state, what are the parameters I should pass to the fetchFn. If the result is undefined the answer is 'nothing' */
export interface ReqFn<State> {
    (state: State): [RequestInfo, RequestInit | undefined] | undefined
}


/** The fetcher is responsible for modifying state. It is effectively a PartialFunction. If 'shouldLoad' returns false, the behavior of 'load' is undefined */
export interface Fetcher<State, T> {
    /** This works out if we need to load. Typically is a strategy */
    shouldLoad: (state: State) => boolean,
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

/** This will 'do the work of fetching' for a single fetcher. */
export const applyFetcher = <State, T>(fetcher: Fetcher<State, T>, s: State, fetchFn: FetchFn, debug?: FetcherDebug): Promise<State | undefined> => {
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
            // @ts-ignore
            let result = mutate(s)(status, json);
            if (fetcherDebug) console.log("applyFetcher - result", result)
            return result
        })
    } else if (fetcherDebug) console.log("didn't load", fetcher.description)
    return Promise.resolve(s)
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
