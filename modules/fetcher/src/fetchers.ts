/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
import {DirtyPrism, firstIn2, Optional} from "@focuson/lens";

export interface FetchFn {
    <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]>
}

export const defaultFetchFn = <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]> =>
    fetch(re, init).then(r => r.json().then(json => [r.status, json]));

export interface MutateFn<State, T> {
    (s: State): (status: number, json: T) => State
}


/** The RequestInfo/RequestInit are enough information to do a fetch. The mutationFn will mutate the state with the results of the fetch, The array of fetchers is 'what we should fetch after loading this'
 * Once it's finished there is an array of other things to load....
 *
 * Why do we have this structure? It's so that we can compose fetchers and make bigger fetchers out of little fetchers in a way that is easy to test and reason about.
 */
export type LoadInfo<State, T> = [RequestInfo, RequestInit | undefined, MutateFn<State, T>]


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

export const applyFetcher = <State, T>(fetcher: Fetcher<State, T>, s: State, fetchFn: (re: RequestInfo, init?: RequestInit) => Promise<[number, T]>): Promise<State | undefined> => {
    if (fetcher.shouldLoad(s)) {
        const [req, info, mutate] = fetcher.load(s)
        return fetchFn(req, info).then(([status, json]) => mutate(s)(status, json))
    }
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
            return [reqInfo, reqInit, mutate]
        },
        description: description ? description : `loadIfMarkerChangesFetcher(actualMarker=${actualMarker.description}, selectedMarker=${selectedMarker},target=${target.description})`
    }
    return result
}

export function ifErrorFetcher<State, T>(fetcher: Fetcher<State, T>, onMutateError: (s: State, status: number, json: string, err: any) => State, description?: string): Fetcher<State, T> {
    return ({
        shouldLoad: fetcher.shouldLoad,
        load(s) {
            const [reqInit, reqInfo, mutate] = fetcher.load(s)
            let mutateHandlingErrors = s => (status, json) => {
                try {
                    return mutate(s)(status, json)
                } catch (e) {
                    return onMutateError(s, status, json, e)
                }
            }
            return [reqInit, reqInfo, mutateHandlingErrors]
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
            const [req, info, mutate] = fetcher.load(cs)
            const mutateFn: MutateFn<State, T> = s => (status, json) => lens.set(s, mutate(lens.getOption(s))(status, json))
            return [req, info, mutateFn]
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
            return [url, init, mutate]
        },
        description: description ? description : "fetcherWhenUndefined(" + optional + ")"
    })
    return result
}

export function fetchAndMutate<State, T>(f: Fetcher<State, T>, fn: (s: State) => State, description?: string): Fetcher<State, T> {
    let result: Fetcher<State, T> = {
        shouldLoad: f.shouldLoad,
        load: s => {
            const [req, init, mutate] = f.load(s)
            const newMutate: MutateFn<State, T> = s => (status, json) => fn(mutate(s)(status, json))
            return [req, init, newMutate]
        },
        description: description ? description : f.description + ".withMutate"
    }
    return result
}

function areAllDefined<T>(arr: (T | undefined)[]): arr is T[] {
    return arr.reduce<boolean>((acc, t) => (t != undefined) && acc, true)
}

export const loadSelectedFetcher = <State, Holder, T>(tagFn: (s: State) => (string | undefined)[],
                                                      holderPrism: DirtyPrism<Holder, [string [], T]>,
                                                      target: Optional<State, Holder>,
                                                      reqFn: ReqFn<State>,
                                                      ignoreShouldLoadError?: boolean,
                                                      description?: string): Fetcher<State, T> => {
    let currentTagFn = target.chain(holderPrism).chain(firstIn2()).getOption
    let result: Fetcher<State, T> = {
        shouldLoad: (s: State): boolean => {
            try {
                const desiredTags = s ? tagFn(s) : [];
                const allTagsDefined = areAllDefined(desiredTags)
                const req = s && reqFn(s)
                return (s != undefined) && (req != undefined) && allTagsDefined && !arraysEqual(currentTagFn(s), desiredTags);
            } catch (e) {
                if (ignoreShouldLoadError) return false
                throw e
            }
        },
        load: (s: State) => {
            const desiredTags = tagFn(s)
            if (!areAllDefined(desiredTags)) throw partialFnUsageError(result)
            const req = reqFn(s);
            if (!req) throw partialFnUsageError(result)
            const [url, info] = req
            const mutateForHolder: MutateFn<State, T> = state => (status, json) => {
                if (!state) throw partialFnUsageError(result)
                let newHolder: Holder = holderPrism.reverseGet([desiredTags, json])
                return target.set(state, newHolder)
            }
            return [url, info, mutateForHolder];
        },
        description: description ? description : "selStateFetcher(holder=" + holderPrism + ",target=" + target + ",ignoreError=" + ignoreShouldLoadError + ")"
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


// export function setJsonForView<State, Element>(fetcher: Fetcher<State>, description: string, onError: (os: State, e: any) => State, fn: (lc: LensState<State, State>) => void): (oldM: undefined | State, m: State) => void {
//     return (oldM: undefined | State, main: State) => {
//         let newStateFn = (fs: State) => fn(lensState(fs, state => setJsonForView(fetcher, description, onError, fn)(main, state), description))
//         try {
//             newStateFn(main)
//             if (fetcher.shouldLoad(oldM, main)) fetcher.load(oldM, main).then(newStateFn).catch(e => onError(main, e))
//         } catch (e) {
//             newStateFn(onError(main, e))
//         }
//     }
// }