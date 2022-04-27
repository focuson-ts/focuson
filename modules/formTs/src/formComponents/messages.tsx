import React from 'react';
import {SimpleMessage, SimpleMessageLevel} from "@focuson/utils";
import {LensProps, reasonFor} from "@focuson/state";

export interface MessagesProps <S, T, Context> extends LensProps<S, T, Context> {
}
export function Messages<S, T, Context>( { state }: MessagesProps<S, SimpleMessage[], Context>)  {

    const removeMessage = (index: number) => {
        const messagesArray = [...state.json()]
        messagesArray.splice(index, 1)
        state.setJson(messagesArray, reasonFor ( 'Messages', 'onClick', undefined, 'Remove message'))
        console.log('State after remove one message ======>',state.optJson())
    }

    const cssClasses = (messageType: SimpleMessageLevel) => {
        if (!messageType) return;

        const classes = [ 'alert-dismissable'];

        const alertTypeClass = {
            error: 'alert alert-danger',
            info: 'alert alert-info',
            warning: 'alert alert-warning'
        }

        classes.push(alertTypeClass[messageType]);
        return classes.join(' ');
    }

    // TO DO parse message
    const getMessage = (message: string) => {
        return message.slice(0, 300)
    }

    if (!state.json().length) return null;

        return (
            <div className="m-3">
                {
                    state.json().map((message, index) => {
                        return  <div key={index} className={cssClasses(message.level)}>
                            <span title={message.msg}> {getMessage(message.msg)} </span>
                            <a id={`messages[${index}].close`} className="close-button" onClick={() => removeMessage(index)}>&times;</a>
                        </div>
                    }

                )}
            </div>
        );
}