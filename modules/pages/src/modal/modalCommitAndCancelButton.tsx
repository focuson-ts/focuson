import { currentPageSelectionTail, fromPathGivenState, mainPage, PageSelection, PageSelectionContext, popPage } from "../pageSelection";
import { LensProps, reasonFor } from "@focuson/state";
import { DateFn, safeArray } from "@focuson/utils";
import { Transform } from "@focuson/lens";
import { HasRestCommandL, RestCommand } from "@focuson/rest";
import { hasValidationErrorAndReport } from "../validity";
import { HasSimpleMessageL } from "../simpleMessage";


interface ModalCommitCancelButtonProps<S, Context> extends LensProps<S, any, Context> {
  id: string;
  enabledBy?: boolean;
  dateFn?: DateFn
}
interface ModalCommitButtonProps<S, C> extends ModalCommitCancelButtonProps<S, C> {
  validate?: boolean
}
export function ModalCancelButton<S, Context extends PageSelectionContext<S>> ( { id, state }: ModalCommitCancelButtonProps<S, Context> ) {
  return <button id={id} onClick={() => state.massTransform ( reasonFor ( 'ModalCancelButton', 'onClick', id ) ) ( popPage ( state ) )}>Cancel</button>
}


export function ModalCommitButton<S, Context extends PageSelectionContext<S> & HasRestCommandL<S> & HasSimpleMessageL<S>> ( { state, id, dateFn, validate, enabledBy }: ModalCommitButtonProps<S, Context> ) {
  function onClick () {
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return
    const firstPage: PageSelection = mainPage ( state )
    const lastPage = currentPageSelectionTail ( state )
    const rest = lastPage?.rest;
    const copyOnClose = lastPage?.copyOnClose
    const fromPath = fromPathGivenState ( state );
    const focusLens = fromPath ( lastPage.focusOn )
    function findSetLengthOnClose () {
      let toLengthOnClose = lastPage?.setToLengthOnClose;
      if ( toLengthOnClose === undefined ) return []
      const setToLengthOnCloseArrayL = fromPath ( toLengthOnClose?.array )
      const setToLengthOnCloseVariableL = fromPath ( toLengthOnClose?.variable )
      const setToLengthOnCloseTx: Transform<S, any>[] = [ [ setToLengthOnCloseVariableL, () => {
        let length = setToLengthOnCloseArrayL.getOption ( state.main )?.length;
        console.log ( 'setToLengthOnCloseTx', 'array', setToLengthOnCloseArrayL.description, 'var', setToLengthOnCloseVariableL.description, length )
        return length;
      } ] ]
      return setToLengthOnCloseTx;
    }
    const setToLengthOnCloseTx = findSetLengthOnClose ();

    const pageTransformer: Transform<S, any> = [ state.context.pageSelectionL, ( ps: PageSelection[] ) => ps.slice ( 0, -1 ) ]
    const restTransformers: Transform<S, any>[] = rest ? [ [ state.context.restL, ( ps: RestCommand[] ) => [ ...safeArray ( ps ), rest ] ] ] : []

    const copyOnCloseTxs: Transform<S, any>[] = safeArray ( copyOnClose ).map ( ( { from, to } ) =>
      [ to ? fromPath ( to ) : focusLens, () => (from ? fromPath ( from ) : focusLens).getOption ( state.main ) ] )
    if ( lastPage ) {
      state.massTransform ( reasonFor ( 'ModalCommit', 'onClick', id ) ) ( pageTransformer, ...restTransformers, ...copyOnCloseTxs, ...setToLengthOnCloseTx )
    } else
      console.error ( 'ModalCommit button called and bad state.', lastPage )
  }

  return <button id={id} disabled={enabledBy === false} onClick={onClick}>Commit</button>
}