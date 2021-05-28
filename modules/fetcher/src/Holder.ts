import {iso, Iso} from "@focuson/lens";

export interface Holder<T> {
    t: T,
    tags: string[]
}
export function holderIso<T>(description: string): Iso<Holder<T>, [string[], T]> {
    return iso(
        holder => [holder.tags, holder.t],
        arr => ({t: arr[1], tags: arr[0]}),
        description
    )
}
