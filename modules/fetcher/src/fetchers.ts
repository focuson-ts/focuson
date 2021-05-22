import {lensState, LensState} from "../../state"; //changed from @focuson/state;
import {Lens} from "../../lens"; //changed from @focuson/lens;


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

    /** If the loading goes wrong this modifies the state to reflect that. Perhaps by adding a global message or similar */
    onError: (s: State, e: any) => State,

}

export type TaggedFetchers<State> = (tag: string) => Fetcher<State> | undefined

interface TaggerFetcher<State> {
    [tag: string]: Fetcher<State>
}

export function from<State>(t: TaggerFetcher<State>): TaggedFetchers<State> {
    return tag => t[tag]
}

export function fetcher<State>(shouldLoad: (os: State, ns: State) => boolean,
                               load: (s: State) => Promise<State>,
                               onError?: (s: State, e: any) => State): Fetcher<State> {
    return ({shouldLoad, load, onError: onError ? onError : (s, e) => s})
}


export function currentFetcher<State>(s: State, lens: Lens<State, string | undefined>, f: TaggedFetchers<State>): Fetcher<State> | undefined {
    const tag = lens.get(s)
    return tag && f(tag)
}

/** This handles the case when we have a tag that describes what wants to be fetched.
 *
 * @param lens is the lens to the tag
 * @param taggedFetchers is mapping from tag to metchers*/
export function taggedFetcher<State>(lens: Lens<State, string | undefined>, taggedFetchers: TaggedFetchers<State>): Fetcher<State> {
    function getFrom<X>(s: State, fn: (f: Fetcher<State>) => X, def: X): X {
        const f = currentFetcher(s, lens, taggedFetchers)
        return f ? fn(f) : def
    }

    return ({
        shouldLoad: (os, ns) => !!currentFetcher(ns, lens, taggedFetchers)?.shouldLoad(os, ns),
        load: (os, ns) => getFrom(ns, f => f.load(os, ns), Promise.resolve(ns)),
        onError: (s, e) => getFrom(s, f => f.onError(s, e), s)
    })
}

/** A strategy for 'shouldLoad'  on a Fetcher. If the tags are different,or the old state is undefined then the state will be loaded */
export const tags = <State>(fn: (s: State | undefined) => string[]) => (os: State, ns: State) => !(os && arraysEqual(fn(os), fn(ns)));

export function loadIfUndefined<State, Selection>(lens: Lens<State, Selection | undefined>) {
    return (os: State | undefined, ns: State) => lens.get(ns) == undefined
}


export const loadFromUrl = <State, T>(lens: Lens<State, T>, fetchFn?: (input: RequestInfo, init?: RequestInit) => Promise<Response>) =>
    (url: RequestInfo, init?: RequestInit) => (s: State) => {
        const f = fetchFn ? fetchFn : fetch
        return f(url, init).then(r => r.json()).then(t => lens.set(s, t));
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


export function setJsonForView<State, Element>(fetcher: Fetcher<State>, description: string, fn: (lc: LensState<State, State>) => void): (oldM: undefined | State, m: State) => void {
    return (oldM: undefined | State, main: State) => {
        let newStateFn = (fs: State) => fn(lensState(fs, state => setJsonForView(fetcher, description, fn)(main, state), description))
        newStateFn(main)
        if (fetcher.shouldLoad(oldM, main)) fetcher.load(oldM, main).then(newStateFn).catch(e => fetcher.onError(main, e))
    }
}