import {iso, Iso} from "@focuson/lens";
import {Tags} from "./fetchers";

export interface Holder<T> {
    t: T,
    tags: Tags
}
export function holderIso<T>(description: string): Iso<Holder<T>, [Tags, T]> {
    return iso(
        holder => [holder.tags, holder.t],
        arr => ({t: arr[1], tags: arr[0]}),
        description
    )
}

