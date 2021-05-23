/** Mixed into Fetcher when we want to have a component that normally displays the state (which might well be the most common case
 * An example would be 'go get profile' as a fetcher and then have a <Profile... > component that shows it.
 */
import {Iso, Lens, Optional} from "../../optics";
import {firstIn2} from "../../optics/src/optional";


/** The fetcher is responsible for modifying state. It is effectively a PartialFunction */
export interface Fetcher<State> {
    /** This works out if we need to load. Typically is a strategy */
    shouldLoad: (newState: State | undefined) => boolean,
    /** This changes the state by loading something */
    load: (newState: State | undefined) => Promise<State | undefined>,
    description: string
}


export function fetcher<State>(shouldLoad: (ns: State | undefined) => boolean,
                               load: (ns: State | undefined) => Promise<State | undefined>,
                               description: string): Fetcher<State> {
    return ({shouldLoad, load, description})
}

export const applyFetcher = <State>(fetcher: Fetcher<State>, s: State | undefined): Promise<State | undefined> =>
    fetcher.shouldLoad(s) ? fetcher.load(s) : Promise.resolve(s)

export function lensFetcher<State, Child>(lens: Optional<State, Child>, fetcher: Fetcher<Child>): Fetcher<State> {
    return ({
        shouldLoad: (ns) => {
            if (!ns) return false
            let nc = lens.getOption(ns);
            return fetcher.shouldLoad(nc)
        },
        load: async (ns) => {
            if (ns == undefined) return Promise.resolve(undefined)
            const child = await applyFetcher(fetcher, lens.getOption(ns))
            return child ? lens.set(ns, child) : ns
        },
        description: "lensFetcher(" + lens + "," + fetcher.description + ")"
    })

}

export function loadIfUndefined<State, Selection>(lens: Optional<State, Selection>) {
    return (ns: State) => lens.getOption(ns) == undefined
}

export function fetcherWhenUndefined<State, Child>(lens: Optional<State, Child>,
                                                   load: (s: State) => Promise<Child|undefined>, description?: string): Fetcher<State> {
    return ({
        shouldLoad: ns => !!ns && loadIfUndefined(lens)(ns),
        load: (ns) => ns ? load(ns).then(c => c ? lens.set(ns, c) : ns) : Promise.resolve(undefined),
        description: description ? description : "fetcherWhenUndefined(" + lens + ")"

    })
}

function areAllDefined<T>(arr: (T | undefined)[]): arr is T[] {
    return arr.reduce<boolean>((acc, t) => (t != undefined) && acc, true)
}

export const selStateFetcher = <State, SelState, Holder, T>(sel: Lens<State, SelState>,
                                                            holderMaker: Iso<Holder, [string [], T]>) =>
    (tagFn: (s: SelState) => (string | undefined)[],
     target: Optional<State, Holder>,
     loadT: (s: State) => Promise<T | undefined>,
     description?: string): Fetcher<State> => {
        const shouldLoad = (s: State | undefined): boolean => {
            let desiredTags = s ? tagFn(sel.get(s)) : [];
            let allTagsDefined = areAllDefined(desiredTags)
            return !!s && allTagsDefined && !arraysEqual(target.chain(holderMaker).chain(firstIn2()).getOption(s), desiredTags);
        }
        const load = (s: State | undefined): Promise<State | undefined> => {
            if (s == undefined) throw new Error('software error this should not be possible')
            const desiredTags = tagFn(sel.get(s))
            if (areAllDefined(desiredTags))
                return loadT(s).then(t => t && target.set(s, holderMaker.reverseGet([desiredTags, t])));
            throw Error(`software error Have an undefined tag ${desiredTags}`)
        }
        return ({
            shouldLoad,
            load,
            description: description ? description : "selStateFetcher(sel=" + sel + ",holder=" + holderMaker + ",target=" + target + ")"
        })
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