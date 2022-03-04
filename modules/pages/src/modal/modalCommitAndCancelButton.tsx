import { currentPageSelectionTail, PageSelection, PageSelectionContext, popPage } from "../pageSelection";
import { LensProps } from "@focuson/state";
import { safeArray } from "@focuson/utils";
import { Transform } from "@focuson/lens";
import { HasRestCommandL, RestCommand } from "@focuson/rest";


interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context> {
  id: string
}

export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  return <button onClick={() => state.massTransform ( popPage ( state ) )}>Cancel</button>
}

export function ModalCommitButton<S, Context extends PageSelectionContext<S> & HasRestCommandL<S>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  function onClick () {
    const lastPage = currentPageSelectionTail ( state )
    let rest = lastPage?.rest;
    const pageTransformer: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ]
    const restTransformers: Transform<S, any>[] = rest ? [ [ state.context.restL, ( ps: RestCommand[] ) => [ ...safeArray ( ps ), rest ] ] ] : []
    if ( lastPage ) {
      state.massTransform ( pageTransformer, ...restTransformers )
    } else
      console.error ( 'ModalCommit button called and bad state.', lastPage )
  }
  return <button onClick={onClick}>Commit</button>
}