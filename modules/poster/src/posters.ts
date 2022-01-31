import { Lenses, Optional } from "@focuson/lens";
import { FetchFn } from "@focuson/utils";

export interface PostDebug {
    postDebug?: boolean
}

export interface PostDetails<State, Args, Returned, Result> {
    urlFn: ( args: Args ) => [ RequestInfo, RequestInit | undefined ],
    targetLn?: Optional<State, Result>, // if undefined then the result is not added anywhere
    errorFn: ErrorFn<State>,
    shape?: ( r: Returned ) => Result // if undefined then them `Returned`== `Result` and the result is directly used
}

export interface Posters<State> {
    [ name: string ]: PostDetails<State, any, any, any>
}
export const postCommandsL = <S extends HasPostCommand<S, any>> () => Lenses.identity<S> ().focusQuery ( 'postCommands' );
export interface HasPostCommand<State, Details extends Posters<State>> {
    postCommands: PostCommand<State, Details, any>[]
}

export interface PostCommand<State, Details extends Posters<State>, K extends keyof Details> {
    poster: K,
    args: any  // really want to tie this args... don't know how
}
const debugAnd = ( debug?: boolean ) => <T> ( msg: string, value: T ) => {
    if ( debug ) console.log ( msg, JSON.stringify ( value ) )
    return value
};

type ErrorFn<State> = ( s: State, detail: string, args: any, status: number | undefined, resp: any ) => State
export function addDebugErrorMessage<State> ( errorMessageL: Optional<State, string[]> ): ErrorFn<State> {
    return ( s: State, detail: string, args: any, status: number | undefined, resp: any ) =>
      errorMessageL.map ( s, oldErrors => [ ...oldErrors, `${detail} ${JSON.stringify ( args )} Status(${status}) Resp: ${resp})` ] )

}
export const post = <State, Details extends Posters<State>> (
  fetchFn: FetchFn,
  d: Details,
  postL: Optional<State, PostCommand<State, Details, any>[]>,
  debugL?: Optional<State, PostDebug> ) => ( s: State ): Promise<State> => {
    const postDebug = debugAnd ( debugL?.getOption ( s )?.postDebug )
    const postCommands = postL.getOption ( s )
    if ( !postCommands || postCommands.length == 0 ) return postDebug ( "No post commands", Promise.resolve ( s ) );

    const statusAndBody = Promise.all ( postCommands.map ( ( { poster, args } ) => {
        const { urlFn, targetLn, shape }: PostDetails<State, any, any, any> = postDebug ( `poster details for ${poster} with args ${JSON.stringify ( args )}`, d[ poster ] )
        const [ reqInfo, reqInit ] = postDebug ( "url details for", urlFn ( args ) )
        const actualShape = shape ? shape : ( x: any ) => x
        return fetchFn ( reqInfo, reqInit ).then (
          ( [ status, body ] ) => postDebug ( `results for ${poster}`, [ targetLn, poster, args, status, body, actualShape ( body ) ] ),
          error => postDebug ( `errorExecuting ${poster}`, [ targetLn, poster, args, undefined, error, undefined ] ),
        )
    } ) )
    return statusAndBody.then ( list => postL.set ( list.reduce (
      ( acc, [ targetLn, poster, args, status, body, result ] ) => {
          if ( status && status / 100 == 2 ) return targetLn ? targetLn.set ( acc, result ) : acc;
          else {
              console.log ( "bad status code", status, result )
              let detail = d[ poster ];
              console.log ( "bad details", detail )
              return detail.errorFn ( acc, poster, args, status, body )
          }
      }, s ), []
    ) )
};
