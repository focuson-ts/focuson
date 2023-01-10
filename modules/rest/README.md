# @focuson-nw/rest

Higher level libraries in @focuson need to communicate with the backend. This provides the mechanisms to get 'restful' 
access to them. Specifically the low level code to process `RestCommands`


## RestCommand

To assist debugging, logging and testing (and simplify code) we separate end point access into 'what do I want to do' 
(restCommands) from 'how do I want to do it'. This allows us to process the rest commands in many ways

## State and RestCommands

If in the state we place a list of rest of commands then the `rest()` function will process those commands. 