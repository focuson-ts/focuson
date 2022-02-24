import { currentPageSelectionTail, PageSelection, PageSelectionContext, popPage } from "../pageSelection";

import { HasPostCommandLens, PostCommand } from "@focuson/poster";
import { LensProps } from "@focuson/state";
import { safeArray } from "@focuson/utils";
import { Transform } from "@focuson/lens";


interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context> {
  id: string
}

export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  return <button onClick={() => state.massTransform(popPage ( state ))}>Cancel</button>
}

export function ModalCommitButton<S, Context extends PageSelectionContext<S> & HasPostCommandLens<S, any>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  function onClick () {
    const lastPage = currentPageSelectionTail ( state )
    let rest = lastPage?.rest;
    if ( lastPage && rest ) {
      const r: { rest: string; action: string } = rest
      const transformers: Transform<S, any>[] = [
        [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ],
        [ state.context.postCommandsL, ( ps: PostCommand<S, any, any>[] ) => [ ...safeArray ( ps ), { poster: r.rest, args: r.action } ] ]
      ]
      state.massTransform ( ...transformers )
    } else
      console.error ( 'ModalCommit button called and bad state.', lastPage )
  }
  return <button onClick={onClick}>Commit</button>
}