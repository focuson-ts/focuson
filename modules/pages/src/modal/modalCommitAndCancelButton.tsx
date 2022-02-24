import { currentPageSelectionTail, PageSelectionContext, popPage, popPageAndSet } from "../pageSelection";

import { HasPostCommandLens, PostCommand } from "@focuson/poster";
import { LensProps } from "@focuson/state";
import { safeArray } from "@focuson/utils";


interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context> {
  id: string
}

export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  return <button onClick={() => popPage ( state )}>Cancel</button>
}

export function ModalCommitButton<S, Context extends PageSelectionContext<S> & HasPostCommandLens<S, any>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  function onClick () {
    const lastPage = currentPageSelectionTail ( state )
    if ( lastPage && lastPage.rest ) {
      const postCommand: PostCommand<S, any, any> = { poster: lastPage.rest.poster, args: lastPage.rest.args }
      const newPostCommands = [ ...safeArray(state.context.postCommandsL.getOption( state.main )), postCommand ]
      popPageAndSet ( state, state.context.postCommandsL, newPostCommands )
    }
  }
  return <button onClick={onClick}>Commit</button>
}