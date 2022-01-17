@focuson/poster is a project to help with 'post' commands in react applications.

Many react applications can be split up as follows:

* Getting data from an api to display it
* Rendering the data
* Editing the data
* Doing things with the data (checkout / payment )

This project addresses the last goal. It provides a declarative mechanism, that is very easy to test, that controls when
data is sent to the backend. i.e. the 'doing things'.

# Post Commands

The react application communicates with the 'poster' only through state. In the state there is a place that has an array
of post commands. The exact place is configurable using a lens. Typically there will be only one post command.

The post command has the signature

```typescript
interface PostCommand<State, Details extends Posters<State>, K extends keyof Details> {
    poster: K,
    args: any  
}
```

That's complicated until it is realised that K is just a 'legal post name'. The list of legal post names is in the
PostDetails (see below).

An example that represents a single call to 'updateAccountDetails' could be

```json lines
{postCommands: [{poster: "updateAccountDetails", args: {id: 12335, accountDetails: {some: "accountDetails"}}}]}
```

Note how easy it is now to test the react components. The 'event' that would normally do the side effect, instead just
updates the state. This is very easy to test without complex mocks, containers or an acceptance environment

From a mental concept point of view this is very similar to 'dispatching' in redux. The only difference is that instead of
'calling dispatch' (which causes an immediate side effect) this simply writes to the state the parameters that would be sent 
to the dipatcher. 

# Life cycle

* The post method is called
* For each post command 
  * the fetch parameters are calculated
  * fetch is called. this returns a status and body
  * If the status is a 2xx, 
    * the body is 'shaped' (i.e. turned into a format suitable to go into the state)
    * and added at the location defined by the targetLens (typically this will result in a message, but could hold concrete data that is needed)
  * If the status isn't 2xx
    * The errorFn is called and added to the status (typically this will result in an error message)


# PostDetails

```typescript
export interface Posters<State> {
    [name: string]: PostDetails<State, any, any>
}
export interface PostDetails<State, Args, Returned,Result> {
    urlFn: (args: Args) => [RequestInfo, RequestInit | undefined],
    shaper: (r: Returned) => Result,
  errorFn: ErrorFn<State>,
    targetLn: Optional<State, Result>
}
```
* `urlFn` the arguments come from PostCommand (i.e. typically the react component that triggers this)
* `shaper` turns the `Returned` value from the api into `Result`. This is needed because quite often the values returned from the API need to be turned into a message or reshaped
* `errorFn` what to do if there is an error (either a failed promise, or a non 200 status code)
* `targetLn` Where to put the returned result

Example

```typescript
interface UpdateAccountDetails {
    //here we have the type of the data that will be sent to the api
}
interface UpdateAccountResult{
    //This is the type that is returned from the api. It might be empty, or it might has a message like 'succeeded'
}
//This is the actual configuration of the poster for updateAccountDetails
const updateAccountDetails = <MainState>(targetLens: Optional<MainState, UpdateAccountResult>): PostDetails<MainState, String, UpdateAccountDetails, UpdateAccountDetails> => ({
  urlFn: (accountId: string) => [`/someapi/updateAccount/${accountId}`, { method: 'post' }],
  errorFn: addDebugErrorMessage(errorLens),
  shape: s => s,
  targetLens
})
```
In this example the data from the API was directly inserted into the state because of `shape: s => s`. Other options include setting a string such as 'succeeded'


# Posters

This is were we 'tie it all together'. All the posters in the application are added here, giving each action a unique name. The <MainState> is the type of 
the global state

```typescript
const allPosters : Posters<MainState> = {
    updateAccountDetails: updateAccountDetails
}
```
At this point `updateAccountDetails` (the key) can be used in a post command with some arguments

# Using the Poster

Given a state `MainState` with postCommands in it somewhere (`postCommand` points to them) the following updates the state with the results of the post commands

```typescript
const poster = post<MainState, Posters<MainState>>(fetchFn, postDetails, postCommandsL, postDebugL)
```
* `fetchFn` delegates to `fetch`
* `postDetails` is the structure shown above that links the names of post commands to the details of how to implement them
* `postCommandsL` is a lens from the `MainState` to the list of post commands
* `postDebugL` is an optional lens from the `MainState` to a place where the postDebug data structure can be find. This turns on and off console.log messages about the posting



