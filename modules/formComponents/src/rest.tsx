import { addLoaderCommandsIfNeeded, RestChangeCommands, RestCommand, RestLoadWindowWithoutRestProps } from "@focuson/rest";
import { LensState, reasonFor } from "@focuson/state";
import { DateFn, RestAction, RestResult, SimpleMessage, toArray } from "@focuson/utils";
import { CommonStateProps, CustomButtonType, getButtonClassName } from "./common";
import { closeOnePageTxs, confirmIt, ConfirmWindow, getRefForValidateLogicToButton, hasValidationErrorAndReport, isConfirmWindow, ModalContext, openConfirmWindow, openRestLoadWindowTxs, RestLoadWindowProps, wrapWithErrors } from "@focuson/pages";
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
  onComplete?: RestChangeCommands[];
  dateFn?: DateFn
  loader?: RestLoadWindowWithoutRestProps
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


export function RestButton<S, C extends ModalContext<S>> ( props: RestButtonProps<S, C, SimpleMessage> ) {
  const { id, rest, action, result, state, text, confirm, validate, dateFn, onSuccess, enabledBy, name, buttonType, on404, onComplete, loader } = props
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
    const restCommand: RestCommand = { restAction: action, name: rest, changeOnSuccess: onSuccess, on404, changeOnCompletion: onComplete };
    const realRestCommand: RestCommand = addLoaderCommandsIfNeeded ( loader, restCommand )
    if ( isConfirmWindow ( confirm ) )
      openConfirmWindow ( confirm, 'justclose', [], state, 'RestButton', id, 'onClick', realRestCommand )
    else if ( confirmIt ( state, confirm ) ) {
      const loadWindowTxs = loader ? openRestLoadWindowTxs ( { ...loader, rest, action }, state.context.pageSelectionL, state.context.dateFn ) : []
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
