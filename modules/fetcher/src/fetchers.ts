import {lensState, LensState} from "@focuson/state";
import {Lens} from "@focuson/lens";


/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
export interface View<State, Props, Element> {
    props: (s: State) => Props,
    comp: (p: Props) => Element
}

/** The fetcher is responsible for modifying state */
export interface Fetcher<State> {
    /** This works out if we need to load. Typically is a strategy */
    shouldLoad: (oldState: State, newState: State) => boolean,

    /** This changes the state by loading something */
    load: (oldState: State, newState: State) => Promise<State>,
}


export type TaggedFetchers<State> = (tag: string) => Fetcher<State> | undefined

interface TaggerFetcher<State> {
    [tag: string]: Fetcher<State>
}

export function from<State>(t: TaggerFetcher<State>): TaggedFetchers<State> {
    return tag => t[tag]
}

export function fetcher<State>(shouldLoad: (os: State, ns: State) => boolean,
                               load: (os: State, ns: State) => Promise<State>): Fetcher<State> {
    return ({shouldLoad, load})
}


export function currentFetcher<State>(s: State, lens: Lens<State, string | undefined>, f: TaggedFetchers<State>): Fetcher<State> | undefined {
    const tag = lens.get(s)
    return tag && f(tag)
}

export function lensFetcher<State, Child>(lens: Lens<State, Child>,
                                          shouldLoad: (os: State, ns: State) => boolean,
                                          load: (os: State, ns: State) => Promise<Child>): Fetcher<State> {
    return ({
        shouldLoad,
        load: (os, ns) => load(os, ns).then(c => lens.set(ns, c))
    })
}

export function lensFetcherWhenUndefined<State, Child>(lens: Lens<State, Child>,
                                                       load: (os: State, ns: State) => Promise<Child>): Fetcher<State> {
    return ({
        shouldLoad: loadIfUndefined(lens),
        load: (os, ns) => load(os, ns).then(c => lens.set(ns, c))
    })
}

/** This handles the case when we have a tag that describes what wants to be fetched.
 * @param lens is the lens to the tag
 * @param taggedFetchers is mapping from tag to metchers*/
export function taggedFetcher<State>(lens: Lens<State, string | undefined>, taggedFetchers: TaggedFetchers<State>): Fetcher<State> {
    function getFrom<X>(s: State, fn: (f: Fetcher<State>) => X, def: X): X {
        const f = currentFetcher(s, lens, taggedFetchers)
        return f ? fn(f) : def
    }

    return ({
        shouldLoad: (os, ns) => !!currentFetcher(ns, lens, taggedFetchers)?.shouldLoad(os, ns),
        load: (os, ns) => getFrom(ns, f => f.load(os, ns), Promise.resolve(ns))
    })
}

/** A strategy for 'shouldLoad'  on a Fetcher. If the tags are different,or the old state is undefined then the state will be loaded */
export const tags = <State>(fn: (s: State | undefined) => string[]) => (os: State, ns: State) => !(os && arraysEqual(fn(os), fn(ns)));

export function loadIfUndefined<State, Selection>(lens: Lens<State, Selection | undefined>) {
    return (os: State | undefined, ns: State) => lens.get(ns) == undefined
}


export const loadFromUrl = <T>(fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>) =>
    (url: RequestInfo, init?: RequestInit): Promise<T> => {
        const f = fetchFn ? fetchFn : fetch
        return f(url, init).then(r => r.json());
    }


function arraysEqual<T>(a: T[], b: T[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}


export function setJsonForView<State, Element>(fetcher: Fetcher<State>, description: string, onError: (os: State, e: any) => State, fn: (lc: LensState<State, State>) => void): (oldM: undefined | State, m: State) => void {
    return (oldM: undefined | State, main: State) => {
        let newStateFn = (fs: State) => fn(lensState(fs, state => setJsonForView(fetcher, description, onError, fn)(main, state), description))
        try {
            newStateFn(main)
            if (fetcher.shouldLoad(oldM, main)) fetcher.load(oldM, main).then(newStateFn).catch(e => onError(main, e))
        } catch (e) {
            newStateFn(onError(main, e))
        }
    }
}