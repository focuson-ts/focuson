import React from 'react';
import { ariaRoleForMessageLevel, SimpleMessage, SimpleMessageLevel, unique } from "@focuson/utils";
import { LensProps, reasonFor } from "@focuson/state";

export interface MessagesProps<S, T, Context> extends LensProps<S, T, Context> {
  pageDisplayTime: string
  nextPageDisplayTime: string | undefined
}
const canDisplayInThisWindow = ( pageTime: number, nextPageTime: number | undefined ) => ( message: SimpleMessage ): boolean => {
  const time = new Date ( message.time ).getTime ();
  if ( time >= pageTime )
    if ( nextPageTime === undefined || time < nextPageTime )
      return true
  return false
};

const getMessage = ( message: string ) => {
  const size = 300;
  return message.length > size ? message.slice ( 0, size ) + " ..." : message
}
const OneMessage = ( removeMessage: ( i: number ) => void, cssClasses: ( messageType: SimpleMessageLevel ) => (undefined | string) ) =>
  ( message: SimpleMessage, index: number ): JSX.Element =>
    <div key={index} className={cssClasses ( message.level )}>
      <span id={`messages[${index}].msg`} role={ariaRoleForMessageLevel ( message.level )} title={message.msg}> {getMessage ( message.msg )} </span>
      <a id={`messages[${index}].close`} className="close-button" onClick={() => removeMessage ( index )}>&times;</a>
    </div>;


const OneNewMessage = ( removeMessage: ( i: number ) => void, cssClasses: ( messageType: SimpleMessageLevel ) => (undefined | string) ) =>
  ( message: SimpleMessage, index: number ): JSX.Element =>
    <div key={index} role="alert">
      <div className={`page-notification-wrapper ${message.level}`} role={ariaRoleForMessageLevel ( message.level )} title={message.msg}>
        <div className="notification-icon"></div>
        <div className="">
          <div className="notification-msg-noheader">{message.msg}</div>
        </div>
        <a id={`messages[${index}].close`} className="close-button" onClick={() => removeMessage ( index )}>&times;</a>
      </div>
    </div>

// <div key={index} className={cssClasses ( message.level )}>
//   <span id={`messages[${index}].msg`} role={ariaRoleForMessageLevel ( message.level )} title={message.msg}> {getMessage ( message.msg )} </span>
//   <a id={`messages[${index}].close`} className="close-button" onClick={() => removeMessage ( index )}>&times;</a>
// </div>;


export function Messages<S, T, Context> ( { state, pageDisplayTime, nextPageDisplayTime }: MessagesProps<S, SimpleMessage[], Context> ) {
  const pageTime = new Date ( pageDisplayTime ).getTime ()
  const nextPageTime = nextPageDisplayTime ? new Date ( nextPageDisplayTime ).getTime () : undefined
  const simpleMessages = state.optJsonOr ( [] );
  const actualMessages = unique(simpleMessages.filter ( canDisplayInThisWindow ( pageTime, nextPageTime ) ), sm => `${sm.level}-${sm.msg}`);
  if ( actualMessages.length === 0 ) return <></>

  const removeMessage = ( index: number ) => {
    const messagesArray = [ ...simpleMessages ]
    messagesArray.splice ( index, 1 )
    state.setJson ( messagesArray, reasonFor ( 'Messages', 'onClick', `messages[${index}].close`, 'Remove message' ) )
  }

  const cssClasses: ( messageType: SimpleMessageLevel ) => (undefined | string) = ( messageType: SimpleMessageLevel ) => {
    if ( !messageType ) return;
    const classes = [ 'alert-dismissable' ];
    const alertTypeClass = {
      success: 'alert alert-success',
      error: 'alert alert-danger',
      info: 'alert alert-info',
      warning: 'alert alert-warning'
    }
    classes.push ( alertTypeClass[ messageType ] );
    return classes.join ( ' ' );
  }

  // TO DO parse message

  if ( !simpleMessages.length ) return null;
  return (<div className="m-3 messages">{actualMessages.map ( OneNewMessage ( removeMessage, cssClasses ) )}</div>);
}
