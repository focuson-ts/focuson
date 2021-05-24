/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
import {DirtyPrism, firstIn2, Lens, Optional} from "@focuson/optics";

export interface FetchFn {
    <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]>
}

export const defaultFetchFn = <T>(re: RequestInfo, init?: RequestInit): Promise<[number, T]> =>
    fetch(re, init).then(r => r.json().then(json => [r.status, json]));

export interface MutateFn<State, T> {
    (s: State | undefined): (status: number, json: T) => State
}

export interface LoadFn<State, T> {
    (newState: State | undefined): [RequestInfo, RequestInit | undefined, MutateFn<State, T>]
}

export interface ReqFn<State> {
    (newState: State | undefined): [RequestInfo, RequestInit | undefined] | undefined
}

/** The fetcher is responsible for modifying state. It is effectively a PartialFunction */
export interface Fetcher<State, T> {
    /** This works out if we need to load. Typically is a strategy */
    shouldLoad: (newState: State | undefined) => boolean,
    /** This provides the info that we need to load. The first two parameters can be passed to fetch, and the third is how we process the result. Note that it is hard to guarantee that the json is a T, so you might want to check it!*/
    load: LoadFn<State, T>,
    /** For debugging and testing. It's idiomatically normal to make this the variable name of your fetcher, or some other description that makes sense to you */
    description: string
}


export function fetcher<State, T>(shouldLoad: (ns: State | undefined) => boolean,
                                  load: LoadFn<State, T>,
                                  description: string): Fetcher<State, T> {
    return ({shouldLoad, load, description})
}

export const applyFetcher = <State, T>(fetcher: Fetcher<State, T>, s: State | undefined, fetchFn: (re: RequestInfo, init?: RequestInit) => Promise<[number, T]>): Promise<State | undefined> => {
    if (fetcher.shouldLoad(s)) {
        const [req, info, mutate] = fetcher.load(s)
        return fetchFn(req, info).then(([status, json]) => mutate(s)(status, json))
    }
    return Promise.resolve(s)
}

export function partialFnUsageError<State, T>(f: Fetcher<State, T>) {
    return Error(`Load called for ${f.description}. The shouldLoad should have returned false. This is a programming error`)
}


export function lensFetcher<State, Child, T>(lens: Optional<State, Child>, fetcher: Fetcher<Child, T>, description?: string): Fetcher<State, T> {
    let result: Fetcher<State, T> = ({
        shouldLoad: (ns) => {
            if (!ns) return false
            let nc = lens.getOption(ns);
            return fetcher.shouldLoad(nc)
        },
        load(ns) {
            if (ns == undefined) throw partialFnUsageError(result)
            const cs = lens.getOption(ns)
            const [req, info, mutate] = fetcher.load(cs)
            const mutateFn: MutateFn<State, T> = s => (status, json) => lens.set(ns, mutate(lens.getOption(ns))(status, json))
            return [req, info, mutateFn]
        },
        description: description ? description : "lensFetcher(" + lens + "," + fetcher.description + ")"
    })
    return result

}

export function loadIfUndefined<State, Selection>(lens: Optional<State, Selection>) {
    return (ns: State) => lens.getOption(ns) == undefined
}

export function fetcherWhenUndefined<State, Child>(lens: Optional<State, Child>,
                                                   reqFn: ReqFn<State>,
                                                   description?: string): Fetcher<State, Child> {
    let result: Fetcher<State, Child> = ({
        shouldLoad: (ns) => {
            if (!ns) return false
            let nc = lens.getOption(ns);
            let req = reqFn(ns)
            return req != undefined && nc == undefined
        },
        load(s) {
            if (s === undefined) throw partialFnUsageError(result)
            let req = reqFn(s);
            if (req === undefined) throw partialFnUsageError(result)
            const [url, init] = req;
            const x: State = s
            let mutate: MutateFn<State, Child> = s => (status, json) => lens.set(x, json);
            return [url, init, mutate]
        },
        description: description ? description : "fetcherWhenUndefined(" + lens + ")"
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

export const selStateFetcher = <State, SelState, Holder, T>(sel: Lens<State, SelState>,
                                                            holderPrism: DirtyPrism<Holder, [string [], T]>) =>
    (tagFn: (s: SelState) => (string | undefined)[],
     target: Optional<State, Holder>,
     reqFn: ReqFn<State>,
     description?: string): Fetcher<State, T> => {
        let currentTagFn = target.chain(holderPrism).chain(firstIn2()).getOption
        let result: Fetcher<State, T> = {
            shouldLoad: (s: State | undefined): boolean => {
                const desiredTags = s ? tagFn(sel.get(s)) : [];
                const allTagsDefined = areAllDefined(desiredTags)
                const req = reqFn((s))
                return (s != undefined) && (req != undefined) && allTagsDefined && !arraysEqual(currentTagFn(s), desiredTags);
            },
            load: (s: State | undefined) => {
                if (s == undefined) throw partialFnUsageError(result)
                const desiredTags = tagFn(sel.get(s))
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
            description: description ? description : "selStateFetcher(sel=" + sel + ",holder=" + holderPrism + ",target=" + target + ")"
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