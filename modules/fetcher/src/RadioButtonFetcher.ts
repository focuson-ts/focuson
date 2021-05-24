import {Fetcher, MutateFn, partialFnUsageError} from "./fetchers";
import {Optional} from "@focuson/optics";


export function fetchRadioButton<State, T>(
    desiredTagFn: (s: State) => (string | undefined),//The desired tag.
    actualTag: Optional<State, string>, // this is the tag that names the currently actually selected radio button
    whichFetcher: (tag: string) => Fetcher<State, any>,
    description?: string
): Fetcher<State, T> {
    let result: Fetcher<State,T > = {
        shouldLoad: ns => {
            if (!ns) return false
            const [desiredTag, f] = desiredFetcher(ns, desiredTagFn, whichFetcher)
            if (!f) return false
            const tag = actualTag.getOption(ns)
            if (tag != desiredTag) return true//because when the radio button changes...we need to load
            return f ? f.shouldLoad(ns) : false
        },
        load: ns => {
            if (!ns) throw partialFnUsageError(result)
            const [tag, f] = desiredFetcher(ns, desiredTagFn, whichFetcher)
            if (!f) throw partialFnUsageError(result)
            if (!tag) throw partialFnUsageError(result)
            const [req, init, mutate] = f.load(ns)
            const mutateThatUpdatesTag: MutateFn<State, any> = s => (status,json) => actualTag.set(mutate(s)(status,json), tag)
            return [req, init, mutateThatUpdatesTag]
        },
        description: description ? description : "fetchRadioButton(" + actualTag + ")"
    };
    return result
}


export function desiredFetcher<State, T>(s: State | undefined, tagFn: (s: State) => string | undefined, whichFetcher: (tag: string) => Fetcher<State, any>): [string | undefined, Fetcher<State, any> | undefined] {
    if (!s) return [undefined, undefined]
    const tag = tagFn(s)
    return tag ? [tag, whichFetcher(tag)] : [undefined, undefined]
}

export interface TaggedFetcher<State> {
    [tag: string]: Fetcher<State, any>
}

export function fromTaggedFetcher<State>(t: TaggedFetcher<State>): (tag: string) => Fetcher<State, any> {
    return tag => t[tag]
}
