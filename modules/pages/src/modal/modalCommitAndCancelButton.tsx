import { currentPageSelectionTail, mainPage, PageSelection, PageSelectionContext, popPage, refFromFirstPage } from "../pageSelection";
import { LensProps, reasonFor } from "@focuson/state";
import { safeArray } from "@focuson/utils";
import { GetNameFn, Lenses, Transform } from "@focuson/lens";
import { HasRestCommandL, RestCommand } from "@focuson/rest";
import { findValidityDetails, isValidToCommit } from "../validity";


interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context> {
  id: string
}

export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { id, state }: ModalCommitCancelButtonProps<S, Context> ) {
  return <button onClick={() => state.massTransform ( reasonFor ( 'ModalCancelButton', 'onClick', id ) ) ( popPage ( state ) )}>Cancel</button>
}

const pageHolderClassName = 'focus-page'
export function ModalCommitButton<S, Context extends PageSelectionContext<S> & HasRestCommandL<S>> ( { state, id }: ModalCommitCancelButtonProps<S, Context> ) {
  function onClick () {
    console.log('validationOnCommit', findValidityDetails(pageHolderClassName))
    console.log('isValidToCommit', isValidToCommit(pageHolderClassName))
    if ( !isValidToCommit ( pageHolderClassName ) ) {
      console.error( "Cannot commit\n" + findValidityDetails ( pageHolderClassName ).join ( "\n" ) )
      //probably add these to messages
      return
    }
    const firstPage: PageSelection = mainPage ( state )
    const lastPage = currentPageSelectionTail ( state )
    const rest = lastPage?.rest;
    const copyOnClose = lastPage?.copyOnClose
    const lookup = ( name: string ) => refFromFirstPage ( state.context.pageSelectionL ) ( name ).getOption ( state.main );
    const fromPath = Lenses.fromPathWith<S, any> ( lookup )
    const fromLens = fromPath ( safeArray ( lastPage.focusOn ) )

    const setToLengthOnCloseArrayL = fromPath ( safeArray ( lastPage?.setToLengthOnClose?.array ) )
    const setToLengthOnCloseVariableL = fromPath ( safeArray ( lastPage?.setToLengthOnClose?.variable ) )
    const setToLengthOnCloseTx: Transform<S, any>[] = lastPage?.setToLengthOnClose ?
      [ [ setToLengthOnCloseVariableL, () => {
        let length = setToLengthOnCloseArrayL.getOption ( state.main )?.length;
        console.log ( 'setToLengthOnCloseTx', 'array', setToLengthOnCloseArrayL.description, 'var', setToLengthOnCloseVariableL.description, length )
        return length;
      } ] ] : []

    const pageTransformer: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ]
    const restTransformers: Transform<S, any>[] = rest ? [ [ state.context.restL, ( ps: RestCommand[] ) => [ ...safeArray ( ps ), rest ] ] ] : []

    const copyOnCloseTransforms: Transform<S, any>[] =
            copyOnClose ? [
              [ fromPath ( copyOnClose ),
                ( old: any ) => {
                  console.log ( 'copyOnCLose', fromLens.description, '===>', copyOnClose, fromPath ( copyOnClose ).description )
                  return fromLens.getOption ( state.main )
                } ] ] : []

    if ( lastPage ) {
      state.massTransform ( reasonFor ( 'ModalCommit', 'onClick', id ) ) ( pageTransformer, ...restTransformers, ...copyOnCloseTransforms, ...setToLengthOnCloseTx )
    } else
      console.error ( 'ModalCommit button called and bad state.', lastPage )
  }


  return <button onClick={onClick}>Commit</button>
}