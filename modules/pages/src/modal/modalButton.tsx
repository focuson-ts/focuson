import { LensState, reasonFor } from "@focuson/state";
import { CopyDetails, fromPathGivenState, page, PageMode, PageParams, PageSelectionContext, SetToLengthOnClose } from "../pageSelection";
import { Optional, Transform } from "@focuson/lens";
import { RestCommand } from "@focuson/rest";
import { anyIntoPrimitive, DateFn, safeArray, toArray } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "../common";
import { isMainPageDetails, MultiPageDetails } from "../pageConfig";
import { canCommitOrCancel } from "./modalCommitAndCancelButton";

export interface CopyStringDetails {
  from: string;
  to: string;
  joiner?: string
}
export interface CommonModalButtonProps<S, Context> extends CustomButtonType {
  state: LensState<S, any, Context>
  id?: string,
  text: string,
  dateFn: DateFn,
  enabledBy?: boolean,
  pageMode: PageMode,
  pageParams?: PageParams;
  rest?: RestCommand,
  createEmpty?: any
  copy?: CopyDetails[],
  deleteOnOpen?: string[],
  copyJustString?: CopyStringDetails[],
  copyOnClose?: CopyDetails[],
  setToLengthOnClose?: SetToLengthOnClose,
  createEmptyIfUndefined?: any
}
interface JustModalButtonProps<S, Context> extends CommonModalButtonProps<S, Context> {
  modal: string,
  focusOn: string,
}
function isModal<S, Context> ( m: ModalButtonProps<S, Context> ): m is JustModalButtonProps<S, Context> {
  const a: any = m
  return a.modal
}
interface MainModalButtonProps<S, Context> extends CommonModalButtonProps<S, Context> {
  main: string
}

export type ModalButtonProps<S, Context> = JustModalButtonProps<S, Context> | MainModalButtonProps<S, Context>

export function findFocusLFromCurrentState<S, Context> ( errorPrefix: string, props: ModalButtonProps<S, Context>, fromPage: ( path: string ) => Optional<S, any>, pages: MultiPageDetails<S, Context> ) {
  if ( isModal ( props ) ) return fromPage ( props.focusOn )
  const main = props.main
  const onePage = pages[ main ]
  if ( onePage === undefined ) throw Error ( `${errorPrefix} cannot find details for main page '${main}'. Legal names are [${Object.keys ( pages )}]` )
  if ( !isMainPageDetails ( onePage ) ) throw new Error ( `${errorPrefix} page ${main} should be a MainPage but is a ${onePage.pageType}` )
  return onePage.lens
}
export function ModalButton<S extends any, Context extends PageSelectionContext<S>> ( props: ModalButtonProps<S, Context> ): JSX.Element {
  const { id, text, enabledBy, state, copy, copyJustString, pageMode, rest, copyOnClose, createEmpty, setToLengthOnClose, createEmptyIfUndefined, pageParams, buttonType, dateFn, deleteOnOpen } = props
  const onClick = () => {
    // const fromPath = fromPathFor ( state );
    const focusOn = isModal ( props ) ? props.focusOn : undefined
    const pageName = isModal ( props ) ? props.modal : props.main.toString ()
    let newPageSelection = { pageName, firstTime: true, pageMode, rest, focusOn, copyOnClose, setToLengthOnClose, pageParams, time: dateFn () };
    const fromPageFromFrom = fromPathGivenState ( state );
    const fromPageForTo = fromPathGivenState ( state, ps => [ ...ps, newPageSelection ] );
    let errorPrefix = `Modal button ${id}`;
    const focusOnL = findFocusLFromCurrentState ( errorPrefix, props, fromPageFromFrom, state.context.pages )
    const copyTxs: Transform<S, any>[] = safeArray ( copy ).map ( ( { from, to } ) =>
      [ to ? fromPageForTo ( to ) : focusOnL, () => (from ? fromPageFromFrom ( from ) : focusOnL).getOption ( state.main ) ] )
    const copyJustStrings: Transform<S, any>[] = safeArray ( copyJustString ).map (
      ( { from, to, joiner } ) => {
        let f = fromPageFromFrom ( from ).getOption ( state.main );
        return [ fromPageForTo ( to ), () => f ? anyIntoPrimitive ( f, joiner ? joiner : '' ) : f ];
      } )
    const emptyTx: Transform<S, any>[] = createEmpty ? [ [ focusOnL, ignore => createEmpty ] ] : [];
    const emptyifUndefinedTx: Transform<S, any>[] = createEmptyIfUndefined ? [ [ focusOnL, existing => {
      console.log ( "emptyifUndefinedTx - existing", existing )
      console.log ( "emptyifUndefinedTx - emptyifUndefinedTx", emptyifUndefinedTx )
      return existing ? existing : createEmptyIfUndefined;
    } ] ] : [];
    const deleteOnOpenTxs: Transform<S, any>[] = toArray ( deleteOnOpen ).map ( d => [ fromPageForTo ( d ), () => undefined ] );
    state.massTransform ( reasonFor ( 'ModalButton', 'onClick', id ) ) (
      page<S, Context> ( state.context, 'popup', newPageSelection ),
      ...deleteOnOpenTxs,
      ...emptyTx,
      ...emptyifUndefinedTx,
      ...copyTxs,
      ...copyJustStrings );
  };
  const disabled = enabledBy === false
  return <button className={getButtonClassName ( buttonType )} id={id} disabled={disabled} onClick={onClick}>{text}</button>
}