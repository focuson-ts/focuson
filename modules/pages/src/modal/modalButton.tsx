import { LensState, reasonFor } from "@focuson/state";
import { CopyDetails, fromPathFor, HasPageSelectionLens, page, PageMode, refFromFirstPage, SetToLengthOnClose } from "../pageSelection";
import { Lenses, Optional, Transform } from "@focuson/lens";
import { RestCommand } from "@focuson/rest";
import { safeArray } from "@focuson/utils";


export interface ModalButtonProps<S, Context> {
  id?: string,
  text: string,
  modal: string,
  state: LensState<S, any, Context>
  focusOn: string[],
  pageMode: PageMode,

  rest?: RestCommand,
  createEmpty?: any
  copy?: CopyDetails[],
  copyOnClose?: CopyDetails[],
  setToLengthOnClose?: SetToLengthOnClose
}



export function ModalButton<S extends any, Context extends HasPageSelectionLens<S>> ( props: ModalButtonProps<S, Context> ): JSX.Element {
  const { id, text } = props
  let onClick = () => {
    const { state, copy, modal, pageMode, rest, focusOn, copyOnClose, createEmpty, setToLengthOnClose } = props
    const fromPath = fromPathFor ( state );
    const focusOnL = fromPath ( focusOn );
    const copyTxs: Transform<S, any>[] = safeArray ( copy ).map ( ( { from, to } ) =>
      [ to ? fromPath ( to ) : focusOnL, () => (from ? fromPath ( from ) : focusOnL).getOption ( state.main ) ] )
    const emptyTx: Transform<S, any>[] = createEmpty ? [ [ focusOnL, ignore => createEmpty ] ] : [];
    state.massTransform ( reasonFor ( 'ModalButton', 'onClick', id ) ) (
      page<S, Context> ( state.context, 'popup', { pageName: modal, firstTime: true, pageMode, rest, focusOn: focusOn, copyOnClose, setToLengthOnClose } ),
      ...emptyTx,
      ...copyTxs );
  };
  return <button id={id} onClick={onClick}>{text}</button>
}