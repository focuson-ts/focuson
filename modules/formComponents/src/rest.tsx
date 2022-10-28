import { ModalChangeCommands, RestChangeCommands, RestCommand } from "@focuson/rest";
import { LensState, reasonFor, SetJsonReasonEvent } from "@focuson/state";
import { DateFn, RestAction, RestResult, SimpleMessage, toArray } from "@focuson/utils";
import { CommonStateProps, CustomButtonType, getButtonClassName } from "./common";
import { applyPageOps, closeOnePageTxs, confirmIt, ConfirmWindow, getRefForValidateLogicToButton, hasValidationErrorAndReport, isConfirmWindow, ModalContext, openConfirmWindow, PageSelection, wrapWithErrors } from "@focuson/pages";
import { useRef } from "react";
import { Transform } from "@focuson/lens";

export interface RestButtonProps<S, C, MSGs> extends CommonStateProps<S, any, C>, CustomButtonType {
  rest: string;
  action: RestAction;
  confirm?: boolean | string | ConfirmWindow;
  result?: RestResult;
  enabledBy?: string[][];
  validate?: boolean;
  text?: string;
  onSuccess?: RestChangeCommands[];
  on404?: RestChangeCommands[];
  dateFn?: DateFn
  loader?: RestLoadWindowWithoutRestProps
}

export interface RestLoadWindowWithoutRestProps {
  msg?: string
  button?: string
  className?: string
  onClose?: ModalChangeCommands | ModalChangeCommands[]

}
export interface RestLoadWindowProps extends RestLoadWindowWithoutRestProps {
  rest: string
  action: RestAction
}
export function RestLoadWindow<S, C extends ModalContext<S>> ( state: LensState<S, any, C>, { msg, button, rest, action, onClose, className }: RestLoadWindowProps ): JSX.Element {
  const id = 'rest.load.window'
  function onClick ( e: any ) {
    const txs = closeOnePageTxs ( 'RestLoadWindow', state, toArray ( onClose ) )
    state.massTransform ( reasonFor ( 'RestLoadWindow', "onChange", id, JSON.stringify ( { rest, action } ) ) ) ( ...txs )
  }
  return <div className={className ? className : 'dialog confirm-window'}>
    {msg && <p>{msg}</p>}
    <button onClick={onClick}>{button ? button : 'close'}</button>
  </div>
}

export function openRestLoadWindowTxs<S, Context extends ModalContext<S>> ( props: RestLoadWindowProps, state: LensState<S, any, Context> ): Transform<S, any>[] {
  const realPageName = 'restLoader'
  const ps: PageSelection = { pageName: 'restLoader', focusOn: '~', arbitraryParams: props, time: state.context.dateFn (), pageMode: 'view' }
  const openTx: Transform<S, any> = [ state.context.pageSelectionL, applyPageOps ( 'popup', ps ) ]
  return [ openTx ]
}
export function RestButton<S, C extends ModalContext<S>> ( props: RestButtonProps<S, C, SimpleMessage> ) {
  const { id, rest, action, result, state, text, confirm, validate, dateFn, onSuccess, enabledBy, name, buttonType, on404, loader } = props
  const debug = false//just to stop spamming: should already have all the validations visible if debugging is on
  const debounceRef = useRef<Date> ( null )


  function onClick () {
    const now = new Date ()
    const lastClick = debounceRef.current
    if ( lastClick !== null && (now.getTime () - lastClick.getTime ()) < 1000 ) {
      console.log ( "stopped bounce" )
      return
    }
    // @ts-ignore
    debounceRef.current = now
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return
    const restCommand: RestCommand = { restAction: action, name: rest, changeOnSuccess: onSuccess, on404 };
    const realRestCommand: RestCommand = loader ? { ...restCommand, changeOnSuccess: [ ...toArray ( restCommand.changeOnSuccess ), { command: 'deleteRestWindow', rest: restCommand.name, action: restCommand.restAction } ] } : restCommand
    if ( isConfirmWindow ( confirm ) )
      openConfirmWindow ( confirm, 'justclose', [], state, 'RestButton', id, 'onClick', realRestCommand )
    else if ( confirmIt ( state, confirm ) ) {
      const loadWindowTxs = loader ? openRestLoadWindowTxs ( { ...loader, rest, action }, state ) : []
      const restTx: Transform<S, any> = [ state.context.restL, old => [ ...old, realRestCommand ] ];
      state.massTransform ( reasonFor ( 'RestButton', 'onClick', id ) ) ( restTx, ...loadWindowTxs )
    }
  }

  return wrapWithErrors ( id, enabledBy, [], ( errorProps, error, errorRef, errors ) =>
    <button ref={getRefForValidateLogicToButton ( state ) ( id, debug, validate, errors, errorRef )}
            {...errorProps} onClick={onClick}
            className={getButtonClassName ( buttonType )}
            disabled={error}>{text ? text : name}</button> )
}
