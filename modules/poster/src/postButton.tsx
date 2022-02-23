import { LensProps } from "@focuson/state";
import { Optional } from "@focuson/lens";
import { PostCommand } from "./posters";
import { safeArray } from "@focuson/utils";


type PostCommandLens<S> = Optional<S, PostCommand<S, any, any> []>
export interface PostButtonProps<S, D, Context, Args> extends LensProps<S, D, Context> {
  id?: string,
  text: string,
  poster: string,
  postCommandL: PostCommandLens<S>
  args?: Args
}

/**
 * This will add a post command to the state, which should be processed later.
 * @param state Where the state is pointing to doesn't actually matter. It does need to be a valid LensState
 * @param id optional id for the button
 * @param text what is displayed on the button
 * @param poster the name of the poster
 * @param args arguments that will be sent to the poster
 * @param postCommandL a lens that points to the postcommand array. This will often be provided from a context. It must be provided if the onClick is to work.
 */
export const PostButton = <S, D, Context, Args> ( { id, state, text, poster, args, postCommandL }: PostButtonProps<S, D, Context, Args> ) =>
  <button id={id} onClick={() => {
    if ( postCommandL ) state.dangerouslySetMain ( postCommandL.transform ( existing => [ ...safeArray ( existing ), { poster, args } ] ) ( state.main ) )
    else throw Error ( `Trying to click a post button ${id} ${test} ${poster} without a postCommandL` )
  }}>{text}</button>



