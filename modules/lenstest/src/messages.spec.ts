import { removeOldMessages, simpleMessagesL } from "@focuson/pages";
import { DateFn, HasSimpleMessages, SimpleMessage } from "@focuson/utils";

const msg0: SimpleMessage = { "level": "info", "msg": "the info message", "time": "2022-09-19T16:55:41.018Z" };
const msg1: SimpleMessage = { "level": "error", "msg": "the error message {/CommonIds/accountId}", "time": "2022-09-19T16:54:41.018Z" };
const msg2: SimpleMessage = { "level": "warning", "msg": "the warning message", "time": "2022-09-19T16:53:41.018Z" };
const msg3: SimpleMessage = { "level": "info", "msg": "loading the authorised charges", "time": "2022-09-19T16:52:41.018Z" };

const dateFn: DateFn = () => '2022-09-19T16:55:41.018Z'


function addToState ( ...messages: SimpleMessage[] ): HasSimpleMessages {
  return ({ messages })
}
const someMessages = addToState ( msg0, msg1, msg2, msg3 )

describe ( "", () => {
  it ( "Should not remove anything if the delayBeforeMessagesRemoved are undefined", () => {
    expect ( removeOldMessages<HasSimpleMessages> ( dateFn,  simpleMessagesL (), undefined )(someMessages) ).toEqual ( someMessages )
  } )

  it ( "Should not remove messages older than the delayBeforeMessagesRemoved in milliseconds ", () => {
    expect ( removeOldMessages ( dateFn,  simpleMessagesL (), 100 ) (someMessages)).toEqual ( addToState ( msg0 ) )
    expect ( removeOldMessages ( dateFn,  simpleMessagesL (), 60100 )(someMessages) ).toEqual ( addToState ( msg0, msg1 ) )
    expect ( removeOldMessages ( dateFn,  simpleMessagesL (), 120100 )(someMessages) ).toEqual ( addToState ( msg0, msg1, msg2 ) )
    expect ( removeOldMessages ( dateFn,  simpleMessagesL (), 180100 )(someMessages) ).toEqual ( addToState ( msg0, msg1, msg2, msg3 ) )

  } )
} )