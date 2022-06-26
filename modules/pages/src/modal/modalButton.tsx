import { LensState, reasonFor } from "@focuson/state";
import { fromPathGivenState, page, PageMode, PageParams, PageSelectionContext, SetToLengthOnClose } from "../pageSelection";
import { Optional, Transform } from "@focuson/lens";
import { CopyCommand, DeleteCommand, ModalChangeCommands, modalCommandProcessors, ModalProcessorsConfig, processChangeCommandProcessor, RestCommand, SetChangeCommand } from "@focuson/rest";
import { anyIntoPrimitive, CopyDetails, DateFn, safeArray, SimpleMessage, stringToSimpleMsg, toArray } from "@focuson/utils";
import { CustomButtonType, getButtonClassName } from "../common";
import { isMainPageDetails, MultiPageDetails } from "../pageConfig";
import { HasSimpleMessageL } from "../simpleMessage";

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
  change?: ModalChangeCommands | ModalChangeCommands[]
  copy?: CopyDetails[],
  copyJustString?: CopyStringDetails[],

  deleteOnOpen?: string[],
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

function buttonToChangeCommands<S, Context extends PageSelectionContext<S> & HasSimpleMessageL<S>> ( props: ModalButtonProps<S, Context> ): ModalChangeCommands[] {
  const { copy, createEmpty, change, deleteOnOpen } = props
  const emptyPath = isModal ( props ) ? props.focusOn : '~'
  const copyCommands: CopyCommand[] = toArray ( copy ).map ( copy => ({ ...copy, command: 'copy' }) )
  const emptyTxs: SetChangeCommand[] = createEmpty ? [ { command: 'set', path: emptyPath, value: createEmpty } ] : []
  const deleteTxs: DeleteCommand[] = toArray ( deleteOnOpen ).map ( path => ({ command: 'delete', path }) )
  const result: ModalChangeCommands[] = [ ...emptyTxs, ...copyCommands, ...deleteTxs, ...toArray ( change ) ]
  return result
}

function makeContext<S, Context extends PageSelectionContext<S> & HasSimpleMessageL<S>> ( errorPrefix: string, state: LensState<S, any, Context>, newPageSelection: { firstTime: boolean; rest: RestCommand | undefined; pageMode: "view" | "create" | "edit"; focusOn: string | undefined; copyOnClose: CopyDetails[] | undefined; pageParams: PageParams | undefined; setToLengthOnClose: SetToLengthOnClose | undefined; time: string; pageName: string }, props: JustModalButtonProps<S, Context> | MainModalButtonProps<S, Context>, dateFn: () => string ) {
  const fromPathTolens = fromPathGivenState ( state );
  const toPathTolens = fromPathGivenState ( state, ps => [ ...ps, newPageSelection ] );
  const focusOnL = findFocusLFromCurrentState ( errorPrefix, props, fromPathTolens, state.context.pages )

  const config: ModalProcessorsConfig<S, SimpleMessage> = { stringToMsg: stringToSimpleMsg ( dateFn, 'info' ), fromPathTolens, toPathTolens, defaultL: focusOnL, messageL: state.context.simpleMessagesL };
  return config;
}
export function ModalButton<S extends any, Context extends PageSelectionContext<S> & HasSimpleMessageL<S>> ( props: ModalButtonProps<S, Context> ): JSX.Element {
  const { id, text, enabledBy, state, copy, copyJustString, pageMode, rest, copyOnClose, createEmpty, change, setToLengthOnClose, createEmptyIfUndefined, pageParams, buttonType, dateFn, deleteOnOpen } = props
  const onClick = () => {
    // const fromPath = fromPathFor ( state );
    const errorPrefix = `Modal button ${id}`;
    const focusOn = isModal ( props ) ? props.focusOn : undefined
    const pageName = isModal ( props ) ? props.modal : props.main.toString ()
    const newPageSelection = { pageName, firstTime: true, pageMode, rest, focusOn, copyOnClose, setToLengthOnClose, pageParams, time: dateFn () };
    const config = makeContext ( errorPrefix, state, newPageSelection, props, dateFn );

    const copyJustStrings: Transform<S, any>[] = safeArray ( copyJustString ).map (
      ( { from, to, joiner } ) => {
        let f = config.fromPathTolens ( from ).getOption ( state.main );
        return [ config.toPathTolens ( to ), () => f ? anyIntoPrimitive ( f, joiner ? joiner : '' ) : f ];
      } )

    const emptyifUndefinedTx: Transform<S, any>[] = createEmptyIfUndefined ? [ [ config.defaultL, existing => existing ? existing : createEmptyIfUndefined ] ] : [];
    const changeCommands = buttonToChangeCommands ( props )

    const changeTxs = processChangeCommandProcessor ( errorPrefix, modalCommandProcessors ( config ) ( state.main ), changeCommands )

    state.massTransform ( reasonFor ( 'ModalButton', 'onClick', id ) ) (
      page<S, Context> ( state.context, 'popup', newPageSelection ),
      ...emptyifUndefinedTx,
      ...copyJustStrings,
      ...changeTxs );
  };
  const disabled = enabledBy === false
  return <button className={getButtonClassName ( buttonType )} id={id} disabled={disabled} onClick={onClick}>{text}</button>
}