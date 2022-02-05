import { Fetcher, loadDirectly } from "./fetchers";

export function ifErrorFetcher<State, T>(fetcher: Fetcher<State, T>, onError: (e: any) => (s: State) => State, description?: string): Fetcher<State, T> {
    return ({
        shouldLoad: fetcher.shouldLoad,
        load(s) {
            try {
                return fetcher.load(s)
            } catch (e) {
                return loadDirectly(onError(e))
            }
        },
        description: description ? description : `ifErrorFetcher(${fetcher.description})`
    })
}

export function not200MeansError<State, Holder>(req: [RequestInfo, RequestInit | undefined], tags: (string | undefined)[], s: State, status: number): Holder {
    throw Error(`req ${req[0]} ${req[1]} caused status code ${status}`)
}

export function partialFnUsageError<State, T>(f: Fetcher<State, T>) {
    return Error(`Load called for ${f.description}. The shouldLoad should have returned false. This is a programming error`)
}
