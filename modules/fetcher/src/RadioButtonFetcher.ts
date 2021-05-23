import {Fetcher} from "./fetchers";
import {Optional} from "../../optics";


export function fetchRadioButton<State>(
    desiredTagFn: (s: State) => (string | undefined),//The desired tag.
    actualTag: Optional<State, string>, // this is the tag that names the currently actually selected radio button
    whichFetcher: (tag: string) => Fetcher<State>,
    description?: string
): Fetcher<State> {
    return {
        shouldLoad: ns => {
            if (!ns) return false
            const [desiredTag, f] = desiredFetcher(ns, desiredTagFn, whichFetcher)
            const tag = actualTag.getOption(ns)
            if (tag != desiredTag) return true//because when the radio button changes...we need to load
            return f ? f.shouldLoad(ns) : false
        },
        load: ns => {
            if (!ns) throw Error('Should not happen')
            const [tag, f] = desiredFetcher(ns, desiredTagFn, whichFetcher)
            return f && tag ? f.load(ns).then(s => actualTag.set(s, tag)) : Promise.resolve(ns)
        },
        description: description ? description : "fetchRadioButton(" + actualTag + ")"
    }
}


export function desiredFetcher<State, T>(s: State | undefined, tagFn: (s: State) => string | undefined, whichFetcher: (tag: string) => Fetcher<State>): [string | undefined, Fetcher<State> | undefined] {
    if (!s) return [undefined, undefined]
    const tag = tagFn(s)
    return tag ? [tag, whichFetcher(tag)] : [undefined, undefined]
}

export interface TaggedFetcher<State> {
    [tag: string]: Fetcher<State>
}

export function fromTaggedFetcher<State>(t: TaggedFetcher<State>): (tag: string) => Fetcher<State> {
    return tag => t[tag]
}
