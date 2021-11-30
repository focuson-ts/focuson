import {DirtyPrism, firstIn2, iso, Iso, Optional} from "@focuson/lens";
import {Fetcher, loadDirectly, loadInfo, MutateFn, ReqFn} from "./fetchers";
import {not200MeansError, partialFnUsageError} from "./errorhandling";

export type Tags = (string | undefined)[]

/** This is one of the more used fetchers: it allows us to have a set of tags (which are usually part of the selection state). In a shopping cart
 * we might have 'department', 'shelf', 'aisle'. If the tags change then the data is loaded by the fetcher. The tags must all be defiend for the fetcher to load
 *
 * Often this will be guarded by an 'ifEquals' fetcher to only do the fetching when a component is visible
 *
 * Types: State
 *
 * @type State This is the generic name for the 'big object' that the fetcher will be manipulating
 * @type Holder often this the type Holder. It can be anything though: it is where we store the loaded data and the tags
 * @type T the data that we are loading
 *
 * @param tagFn  Given a state find me the actual tags: the ones that the user is indicating they want loaded
 * @param holderPrism Given a tags/T this makes a Holder. Given a Holder this finds Tags and T. Note that the Holder is a generic. Often it is actually a Holder
 * @param target Where do we want to put the loaded data. The loaded data is wrapped in a Holder and put here
 * @param reqFn What do we want to laod?
 * @param not200 If we get a non 200 response we do this
 * @param onError If we get an error we do this
 * @param description Usually the variable name of the fetcher
 */
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
                return loadInfo(url, info, mutateForHolder);
            } catch (e) {
                return loadDirectly(onError(e))
            }
        },
        description: description ? description : "selStateFetcher(holder=" + holderPrism + ",target=" + target + ",onError=" + (onError != undefined) + ")"
    };
    return result
};


/** This holds the current value of the marker, and the current value of the loaded thing. The marker is used by 'loadSelectedFetcher (when it is Tags) or markerChangedFetcher */
export interface Holder<Tags,T> {
    tags: Tags,
    t: T
}

/** This is an iso morphism between a Holder and it's components. If we had higher order types we wouldn't need this...
 * The loadSelectedFetcher doesn't 'know' that we are using a Holder... and in fact we might (and do) have something else. So this allows
 * the loadSelectedFetcher to create the suitable holder from tags and T, and to get the tags from the holder
 * */
export function holderIso<Marker,T>(description: string): Iso<Holder<Marker,T>, [Marker, T]> {
    return iso(
        holder => [holder.tags, holder.t],
        arr => ({t: arr[1], tags: arr[0]}),
        description
    )
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


function areAllDefined<T>(arr: (T | undefined)[]): arr is T[] {
    return arr.reduce<boolean>((acc, t) => (t != undefined) && acc, true)
}


