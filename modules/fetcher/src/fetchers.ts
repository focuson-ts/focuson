/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
import {Optional} from "../../optics";


export interface View<State, Props, Element> {
    props: (s: State) => Props,
    comp: (p: Props) => Element
}

/** The fetcher is responsible for modifying state */
export interface Fetcher<State> {
    /** This works out if we need to load. Typically is a strategy */
    shouldLoad: (newState: State) => boolean,

    /** This changes the state by loading something */
    load: (newState: State) => Promise<State>,
}


export type TaggedFetchers<State> = (tag: string) => Fetcher<State> | undefined

interface TaggerFetcher<State> {
    [tag: string]: Fetcher<State>
}

export function from<State>(t: TaggerFetcher<State>): TaggedFetchers<State> {
    return tag => t[tag]
}

export function fetcher<State>(shouldLoad: (ns: State) => boolean,
                               load: (ns: State) => Promise<State>): Fetcher<State> {
    return ({shouldLoad, load})
}


export function currentFetcher<State, Child>(s: State, tagFn: (s: State) => string | undefined, f: TaggedFetchers<State>): Fetcher<State> | undefined {
    const tag = tagFn(s)
    return tag ? f(tag) : undefined
}

function getIf<Main, Child>(opt: Optional<Main, Child>, m: Main | undefined): Child | undefined {
    return m ? opt.getOption(m) : undefined
}

export function lensFetch<State, Child>(lens: Optional<State, Child>, fetcher: Fetcher<Child>): Fetcher<State> {
    return ({
        shouldLoad: (ns) => {
            let nc = lens.getOption(ns);
            return !!nc && fetcher.shouldLoad(nc);
        },
        load: (ns) => {
            let nc = lens.getOption(ns);
            return (nc) ? fetcher.load(nc).then(nc => lens.set(ns, nc)) : Promise.resolve(ns);
        }
    })

}

export function lensFetcher<State, Child>(lens: Optional<State, Child>,
                                          shouldLoad: (ns: State) => boolean,
                                          load: (ns: State) => Promise<Child>): Fetcher<State> {
    return ({
        shouldLoad,
        load: (ns) => load(ns).then(c => lens.set(ns, c))
    })
}

export function fetcherWhenUndefined<State, Child>(lens: Optional<State, Child>,
                                                   load: (ns: State) => Promise<Child>): Fetcher<State> {
    return ({
        shouldLoad: loadIfUndefined(lens),
        load: (ns) => load(ns).then(c => lens.set(ns, c))
    })
}

/** This handles the case when we have a tag that describes what wants to be fetched.
 * @param lens is the lens to the tag
 * @param taggedFetchers is mapping from tag to metchers*/
export function taggedFetcher<State>(tagFn: (s: State) => string | undefined, taggedFetchers: TaggedFetchers<State>): Fetcher<State> {
    function getFrom<X>(s: State, fn: (f: Fetcher<State>) => X, def: X): X {
        const f = currentFetcher(s, tagFn, taggedFetchers)
        return f ? fn(f) : def
    }

    return ({
        shouldLoad: (ns) => !!currentFetcher(ns, tagFn, taggedFetchers)?.shouldLoad( ns),
        load: (ns) => getFrom(ns, f => f.load( ns), Promise.resolve(ns))
    })
}

/** A strategy for 'shouldLoad'  on a Fetcher. If the tags are different,or the old state is undefined then the state will be loaded */
export const tags = <SelState>(current: (s: SelState | undefined) => string[], desired: (s: SelState | undefined) => string[]) => (ns: SelState) => arraysEqual(current(ns), desired(ns));

export function loadIfUndefined<State, Selection>(lens: Optional<State, Selection>) {
    return (ns: State) => lens.getOption(ns) == undefined
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