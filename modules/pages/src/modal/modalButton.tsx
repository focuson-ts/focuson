import { LensState, reasonFor } from "@focuson/state";
import { CopyDetails, fromPathGivenState, page, PageMode, PageParams, PageSelectionContext, SetToLengthOnClose } from "../pageSelection";
import { Optional, Transform } from "@focuson/lens";
import { RestCommand } from "@focuson/rest";
import { anyIntoPrimitive, DateFn, safeArray } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "../common";
import { fullState, pageState } from "../selectedPage";
import { MultiPageDetails } from "../pageConfig";
import { context } from "@focuson/example_state_cpq/dist/context";

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

function findFocusL<S, Context> ( errorPrefix: string, props: ModalButtonProps<S, Context>, fromPage: ( path: string ) => Optional<S, any>, pages: MultiPageDetails<S, Context> ) {
  if ( isModal ( props ) ) return fromPage ( props.focusOn )
  const main = props.main
  const onePage = pages[ main ]
  if ( onePage === undefined ) throw Error ( `${errorPrefix} cannot find details for main page '${main}'. Legal names are [${Object.keys ( page )}]` )
  if ( onePage.pageType !== 'MainPage' ) throw new Error ( `${errorPrefix} page ${main} should be a MainPage but is a ${onePage.pageType}` )
  return onePage.lens
}
export function ModalButton<S extends any, Context extends PageSelectionContext<S>> ( props: ModalButtonProps<S, Context> ): JSX.Element {
  const { id, text, enabledBy, state, copy, copyJustString, pageMode, rest, copyOnClose, createEmpty, setToLengthOnClose, createEmptyIfUndefined, pageParams, buttonType, dateFn } = props
  const onClick = () => {
    // const fromPath = fromPathFor ( state );
    const fromPage = fromPathGivenState ( state );
    const focusOnL = findFocusL<S, Context> ( `Modal button ${id}`, props, fromPage, state.context.pages );
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
    const focusOn = isModal ( props ) ? props.focusOn : undefined
    const pageName = isModal ( props ) ? props.modal : props.main.toString ()
    state.massTransform ( reasonFor ( 'ModalButton', 'onClick', id ) ) (
      page<S, Context> ( state.context, 'popup', { pageName, firstTime: true, pageMode, rest, focusOn, copyOnClose, setToLengthOnClose, pageParams, time: dateFn () } ),
      ...emptyTx,
      ...emptyifUndefinedTx,
      ...copyTxs,
      ...copyJustStrings );
  };
  const disabled = enabledBy === false
  return <button className={getButtonClassName ( buttonType )} id={id} disabled={disabled} onClick={onClick}>{text}</button>
}