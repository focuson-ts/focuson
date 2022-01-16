import { Optional } from "../lens";
import { FetchFn } from "../fetcher";

export const x = 1

export interface PostDebug {
    postDebug?: boolean
}

export interface PostDetails<State, Args, Result> {
    urlFn: (args: Args) => [RequestInfo, RequestInit | undefined],
    targetLn: Optional<State, Result>
}

export interface Posters<State> {
    [name: string]: PostDetails<State, any, any>
}


export interface PostCommand<State, Details extends Posters<State>, K extends keyof Details> {
    poster: K,
    args: any  // really want to tie this args... don't know how
}
const debugAnd = (debug?: boolean) => <T>(msg: string, value: T) => {
    if (debug) console.log(msg, JSON.stringify(value))
    return value
};

export const post = <State, Details extends Posters<State>>(
    fetchFn: FetchFn,
    d: Details,
    postL: Optional<State, PostCommand<State, Details, any>[]>,
    errorFn: (s: State, detail: string, args: any, status: number | undefined, resp: any) => State,
    debugL?: Optional<State, PostDebug>) => (s: State): Promise<State> => {
    const postDebug = debugAnd(debugL?.getOption(s)?.postDebug)
    const postCommands = postL.getOption(s)
    if (!postCommands || postCommands.length == 0) return postDebug("No post commands", Promise.resolve(s));

    const statusAndBody = Promise.all(postCommands.map(({ poster, args }) => {
        const { urlFn, targetLn }: PostDetails<State, any, any> = postDebug(`poster details for ${poster} with args ${JSON.stringify(args)}`, d[poster])
        const [reqInfo, reqInit] = postDebug("url details for", urlFn(args))
        return fetchFn(reqInfo, reqInit).then(
            ([status, body]) => postDebug(`results for ${poster}`, [targetLn, poster, args, status, body]),
            error => postDebug(`errorExecuting ${poster}`, [targetLn, poster, args, undefined, error]),
        )
    }))
    return statusAndBody.then(list => postL.set(list.reduce(
        (acc, [targetLn, poster, args, status, body]) => {
            if (status && status / 100 == 2)
                return targetLn.set(acc, body);
            else return errorFn(acc, poster, args, status, body)
        }, s), []
    ))
};
