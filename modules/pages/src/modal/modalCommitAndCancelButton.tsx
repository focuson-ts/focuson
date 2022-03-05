import { currentPageSelectionTail, mainPage, PageSelection, PageSelectionContext, popPage } from "../pageSelection";
import { LensProps } from "@focuson/state";
import { safeArray } from "@focuson/utils";
import { GetNameFn, Lenses, Transform } from "@focuson/lens";
import { HasRestCommandL, RestCommand } from "@focuson/rest";


interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context> {
  id: string
}

export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  return <button onClick={() => state.massTransform ( popPage ( state ) )}>Cancel</button>
}

export function ModalCommitButton<S, Context extends PageSelectionContext<S> & HasRestCommandL<S>> ( { state }: ModalCommitCancelButtonProps<S, Context> ) {
  function onClick () {
    const firstPage: PageSelection = mainPage ( state )
    const lastPage = currentPageSelectionTail ( state )
    const rest = lastPage?.rest;
    const copyOnClose = lastPage?.copyOnClose
    const ref: GetNameFn<S, any> = name => Lenses.fromPath ( [ firstPage.pageName, name ] )

    const pageTransformer: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ]
    const restTransformers: Transform<S, any>[] = rest ? [ [ state.context.restL, ( ps: RestCommand[] ) => [ ...safeArray ( ps ), rest ] ] ] : []
    const copyOnCloseTransforms: Transform<S, any>[] = copyOnClose ? [ [ Lenses.fromPathWith<S, any> ( ref ) ( [ firstPage.pageName, ...copyOnClose ] ), ( old: any ) => {
      const fromLens = Lenses.fromPath ( [ firstPage.pageName, ...safeArray ( lastPage.focusOn ) ] )
      console.log ( 'copyOnCLose', fromLens.description, '===>', copyOnClose )
      return fromLens.getOption ( state.main )
    } ] ] : []
    if ( lastPage ) {
      state.massTransform ( pageTransformer, ...restTransformers, ...copyOnCloseTransforms )
    } else
      console.error ( 'ModalCommit button called and bad state.', lastPage )
  }


  return <button onClick={onClick}>Commit</button>
}