import { HasRestCommandL, RestChangeCommands } from "@focuson/rest";
import { reasonFor } from "@focuson/state";
import { DateFn, RestAction, RestResult, SimpleMessage } from "@focuson/utils";
import { CommonStateProps, CustomButtonType, getButtonClassName } from "./common";
import { confirmIt, ConfirmProps, ConfirmWindow, getRefForValidateLogicToButton, HasSimpleMessageL, hasValidationErrorAndReport, isConfirmWindow, ModalContext, openConfirmWindow, page, PageSelection, PageSelectionContext } from "@focuson/pages";
import { useRef } from "react";
import { wrapWithErrors } from "@focuson/pages";

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
}


export function RestButton<S, C extends ModalContext<S>> ( props: RestButtonProps<S, C, SimpleMessage> ) {
  const { id, rest, action, result, state, text, confirm, validate, dateFn, onSuccess, enabledBy, name, buttonType, on404 } = props
  const debug = false//just to stop spamming: should already have all the validations visible if debugging is on
  const debounceRef = useRef<Date> ( null )


  function onClick () {
    const now = new Date ()
    const lastClick = debounceRef.current
    console.log ( "debounce logic - lastClick", lastClick )
    console.log ( "debounce logic - now", now )
    console.log ( "debounce logic - now - lastClick ", lastClick !== null && (now.getTime () - lastClick.getTime ()) )
    if ( lastClick !== null && (now.getTime () - lastClick.getTime ()) < 1000 ) {
      console.log ( "stopped bounce" )
      return
    }
    // @ts-ignore
    debounceRef.current = now
    const realvalidate = validate === undefined ? true : validate
    if ( realvalidate && hasValidationErrorAndReport ( id, state, dateFn ) ) return
    const restCommand = { restAction: action, name: rest, changeOnSuccess: onSuccess, on404 };
    if ( isConfirmWindow ( confirm ) )
      openConfirmWindow ( confirm, 'justclose', [], state, 'RestButton', id, 'onClick' ,restCommand)
    else if ( confirmIt ( state, confirm ) )
      state.copyWithLens ( state.context.restL ).transform ( old => [ ...old, restCommand ], reasonFor ( 'RestButton', 'onClick', id ) )
  }

  return wrapWithErrors ( id, enabledBy, [], ( errorProps, error, errorRef, errors ) =>
    <button ref={getRefForValidateLogicToButton ( state ) ( id, debug, validate, errors, errorRef )}
            {...errorProps} onClick={onClick}
            className={getButtonClassName ( buttonType )}
            disabled={error}>{text ? text : name}</button> )
}
