import React from 'react';
import { ariaRoleForMessageLevel, SimpleMessage, SimpleMessageLevel } from "@focuson/utils";
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

export function Messages<S, T, Context> ( { state, pageDisplayTime, nextPageDisplayTime }: MessagesProps<S, SimpleMessage[], Context> ) {
  const pageTime = new Date ( pageDisplayTime ).getTime ()
  const nextPageTime = nextPageDisplayTime ? new Date ( nextPageDisplayTime ).getTime () : undefined
  const simpleMessages = state.optJsonOr ( [] );
  const actualMessages = simpleMessages.filter ( canDisplayInThisWindow ( pageTime, nextPageTime ) );
  if ( actualMessages.length === 0 ) return <></>
  const removeMessage = ( index: number ) => {
    const messagesArray = [ ...simpleMessages ]
    messagesArray.splice ( index, 1 )
    state.setJson ( messagesArray, reasonFor ( 'Messages', 'onClick', `messages[${index}].close`, 'Remove message' ) )
  }


  const cssClasses = ( messageType: SimpleMessageLevel ) => {
    if ( !messageType ) return;

    const classes = [ 'alert-dismissable' ];

    const alertTypeClass = {
      error: 'alert alert-danger',
      info: 'alert alert-info',
      warning: 'alert alert-warning'
    }

    classes.push ( alertTypeClass[ messageType ] );
    return classes.join ( ' ' );
  }

  // TO DO parse message
  const getMessage = ( message: string ) => {
    const size = 300;
    return message.length > size ? message.slice ( 0, size ) + " ..." : message
  }

  if ( !simpleMessages.length ) return null;


  return (
    <div className="m-3 messages">
      {
        actualMessages.map ( ( message, index ) => {
            return <div key={index} className={cssClasses ( message.level )}>
              <span id={`messages[${index}].msg`} role={ariaRoleForMessageLevel ( message.level )} title={message.msg}> {getMessage ( message.msg )} </span>
              <a id={`messages[${index}].close`} className="close-button" onClick={() => removeMessage ( index )}>&times;</a>
            </div>
          }
        )}
    </div>
  );
}