import { Layout } from "./layout";
import { FocusOnContext } from "@focuson/focuson";
import { LensState } from "@focuson/state";
import { ConfirmProps, openConfirmWindow } from "@focuson/pages";
import { useEffect, useRef } from "react";


export interface ConfirmChangesToAnyProps<S, D, C> {
  id: string
  state: LensState<S, any, C>;
  layoutDetails: string;
  confirm: ConfirmProps;
  children: JSX.Element | JSX.Element[]
}


export function ConfirmChangesToAny<S, D, C extends FocusOnContext<S>> ( props: ConfirmChangesToAnyProps<S, D, C> ) {
  const { id, state,  confirm, layoutDetails, children } = props
  //@ts-ignore
  const ref: React.MutableRefObject<HTMLDivElement> = useRef<HTMLDivElement> ();
  useEffect ( () => {
    const onBlur = ( e: any ) => {
      if ( !ref.current ) return;
      const allInputs = ref.current.getElementsByTagName ( 'input' )
      const list: string[] = []
      for ( var i = 0; i < allInputs.length; i++ ) {
        const item = allInputs.item ( i );
        if ( !item?.checkValidity () ) return
        list.push ( `<tr><td>${item.getAttribute ( "data-validationmessage" )}</td><td>${item.value}</td></tr>` )
      }
      const realConfirm: ConfirmProps = {
        ...confirm,
        messageText: `<p>${confirm.messageText}</p><table><thead><th>Field</th><th>Value</th></thead><tbody>${list.join ( '' )}</tbody></table>`
      }
      openConfirmWindow ( realConfirm, 'justclose', [], state.context.currentState ( state ), 'ConfirmChangesToAny', id, 'onBlur' );
    };

    const allInputs = ref.current?.getElementsByTagName ( 'input' )
    if ( !allInputs ) return
    for ( var i = 0; i < allInputs.length; i++ ) {
      const item = allInputs.item ( i );
      if ( item ) item.onblur = onBlur
    }
  } )//runs everytime. needs to because of guards making things visible and invisible.
  return <Layout divRef={ref} state={state} details={layoutDetails}>{children}</Layout>
}

