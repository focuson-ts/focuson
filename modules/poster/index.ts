import { Optional } from "../lens";
import { FetchFn } from "../fetcher";

export const x = 1


export interface PostDetails<State, Args, Result> {
    urlFn: (args: Args) => [RequestInfo, RequestInit|undefined],
    targetLn: Optional<State, Result>
}

export interface Posters<State> {
    [name: string]: PostDetails<State, any, any>
}


export interface PostCommand<State, Details extends Posters<State>, K extends keyof Details> {
    poster: K,
    args: any  // really want to tie this args... don't know how
}

export const post = <State, Details extends Posters<State>>(fetchFn: FetchFn, d: Details, postL: Optional<State, PostCommand<State, Details, any>[]>, errorFn: (s: State, status: number, resp: any) => State) => (s: State): Promise<State> => {
    const postCommands = postL.getOption(s)
    if (!postCommands || postCommands.length == 0) return Promise.resolve(s);
    const statusAndBody = Promise.all(postCommands.map(({ poster, args }) => {
        const { urlFn, targetLn }: PostDetails<State, any, any> = d[poster]
        const [reqInfo, reqInit] = urlFn(args)
        return fetchFn(reqInfo, reqInit).then(([status, body]) => [targetLn, status, body])
    }))
    return statusAndBody.then(list => list.reduce(
        (acc, [targetLn, status, body]) => {
            if (status / 100 == 2) return targetLn(acc, body); else return errorFn(s, status, body)
        }, s
    ))
};
