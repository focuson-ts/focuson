import { LensState, reasonFor } from "@focuson/state";
import { CopyDetails, fromPathGivenState, page, PageMode, PageParams, PageSelectionContext, SetToLengthOnClose } from "../pageSelection";
import { Transform } from "@focuson/lens";
import { RestCommand } from "@focuson/rest";
import { anyIntoPrimitive, DateFn, safeArray } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "../common";

export interface CopyStringDetails {
  from: string;
  to: string;
  joiner?: string
}
export interface ModalButtonProps<S, Context> extends CustomButtonType {
  state: LensState<S, any, Context>
  id?: string,
  text: string,
  dateFn: DateFn,
  enabledBy?: boolean,
  modal: string,
  focusOn: string,
  pageMode: PageMode,
  pageParams?: PageParams;
  rest?: RestCommand,
  createEmpty?: any
  copy?: CopyDetails[],
  copyJustString?: CopyStringDetails[],
  copyOnClose?: CopyDetails[],
  setToLengthOnClose?: SetToLengthOnClose,
  createEmptyIfUndefined?: any
}


export function ModalButton<S extends any, Context extends PageSelectionContext<S>> ( props: ModalButtonProps<S, Context> ): JSX.Element {
  const { id, text, enabledBy, state, copy, copyJustString, modal, pageMode, rest, focusOn, copyOnClose, createEmpty, setToLengthOnClose, createEmptyIfUndefined, pageParams, buttonType,dateFn } = props
  const onClick = () => {
    // const fromPath = fromPathFor ( state );
    const fromPage = fromPathGivenState ( state );
    const focusOnL = fromPage ( focusOn );
    const copyTxs: Transform<S, any>[] = safeArray ( copy ).map ( ( { from, to } ) =>
      [ to ? fromPage ( to ) : focusOnL, () => (from ? fromPage ( from ) : focusOnL).getOption ( state.main ) ] )
    const copyJustStrings: Transform<S, any>[] = safeArray ( copyJustString ).map (
      ( { from, to, joiner } ) => {
        let f = fromPage ( from ).getOption ( state.main );
        return [ fromPage ( to ), () => f ? anyIntoPrimitive ( f, joiner ) : f ];
      } )
    const emptyTx: Transform<S, any>[] = createEmpty ? [ [ focusOnL, ignore => createEmpty ] ] : [];
    const emptyifUndefinedTx: Transform<S, any>[] = createEmptyIfUndefined ? [ [ focusOnL, existing => {
      console.log ( "emptyifUndefinedTx - existing", existing )
      console.log ( "emptyifUndefinedTx - emptyifUndefinedTx", emptyifUndefinedTx )
      return existing ? existing : createEmptyIfUndefined;
    } ] ] : [];
    state.massTransform ( reasonFor ( 'ModalButton', 'onClick', id ) ) (
      page<S, Context> ( state.context, 'popup', { pageName: modal, firstTime: true, pageMode, rest, focusOn, copyOnClose, setToLengthOnClose, pageParams, time: dateFn() } ),
      ...emptyTx,
      ...emptyifUndefinedTx,
      ...copyTxs,
      ...copyJustStrings );
  };
  const disabled = enabledBy === false
  return <button className={getButtonClassName(buttonType)} id={id} disabled={disabled} onClick={onClick}>{text}</button>
}