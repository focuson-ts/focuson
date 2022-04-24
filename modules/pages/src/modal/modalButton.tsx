import { LensState, reasonFor } from "@focuson/state";
import { CopyDetails, fromPathGivenState, page, PageMode, PageParams, PageSelectionContext, SetToLengthOnClose } from "../pageSelection";
import { Transform } from "@focuson/lens";
import { RestCommand } from "@focuson/rest";
import { safeArray } from "@focuson/utils";


export interface ModalButtonProps<S, Context> {
  state: LensState<S, any, Context>
  id?: string,
  text: string,
  enabledBy?: boolean,
  modal: string,
  focusOn: string,
  pageMode: PageMode,
  pageParams?: PageParams;
  rest?: RestCommand,
  createEmpty?: any
  copy?: CopyDetails[],
  copyOnClose?: CopyDetails[],
  setToLengthOnClose?: SetToLengthOnClose
}


export function ModalButton<S extends any, Context extends PageSelectionContext<S>> ( props: ModalButtonProps<S, Context> ): JSX.Element {
  const { id, text, enabledBy } = props
  const { state, copy, modal, pageMode, rest, focusOn, copyOnClose, createEmpty, setToLengthOnClose, pageParams } = props
  let onClick = () => {
    // const fromPath = fromPathFor ( state );
    const fromPage = fromPathGivenState ( state );
    const focusOnL = fromPage ( focusOn );
    const copyTxs: Transform<S, any>[] = safeArray ( copy ).map ( ( { from, to } ) =>
      [ to ? fromPage ( to ) : focusOnL, () => (from ? fromPage ( from ) : focusOnL).getOption ( state.main ) ] )
    const emptyTx: Transform<S, any>[] = createEmpty ? [ [ focusOnL, ignore => createEmpty ] ] : [];
    state.massTransform ( reasonFor ( 'ModalButton', 'onClick', id ) ) (
      page<S, Context> ( state.context, 'popup', { pageName: modal, firstTime: true, pageMode, rest, focusOn, copyOnClose, setToLengthOnClose, pageParams } ),
      ...emptyTx,
      ...copyTxs );
  };
  const disabled = enabledBy === false
  return <button id={id} disabled={disabled} onClick={onClick}>{text}</button>
}