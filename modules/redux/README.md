# Embedding into redux applications

When we embed ourselves into redux applications

* Redux
  * Initialisation
  * We need a selector to extract our state
  * We need a dispatcher to send state changes to
  * We need a reducer that updates the state
* Page management
  * We need to be able to display our pages
  * We need other people to be able to select our page
  * We need to select other people's pages
  
## Initialisation

We need our starting state to be initiated. Things like messages/etc. Debug state... 

## Selector

* We need to get our 'common ids' out of the redux state
    * These are information such as 'customer id', 'account id', 'application id'... etc
    * They could change at any time. We need a local copy in our state
    * So... we need some optioneering here
      * Do we point our common lens at redux. We just use names for them, so we can centralise this
      * Do we copy into our state every time? This is quite simple and the default
      * Whatever we do we should 'information hide' it... check the design of the common lens...
* Messages
  * Probably we are just using simple messages. Check if there is an existing message structure

## Dispatcher

* We just send 'our new state' which gets embedded back into the main.
  * Note that at this point we will put things like common ids in the global state. This should be fine and allows performance optimisation in the selector

## Reducer

* Pretty much just a lens... takes our new state, stuffs it in the global

## Display  pages

* Our 'SelectedPage' is almost what we need
  * Might need a ReduxPage

##Select our page

* We need a React component to select our pages (one per team probably)

## Select other people's page

* We will need to find out how to do this, and then make a Depedency injection point for it.

# Multiple teams
* We will have multiple teams making our components. We need to make sure we know how we can work with multiple teams stuff...
* We could merge code bases (easy but dangerous)
* We could have a separate <SelectedPage> for each ... this feels the best... Because javascript is quite good at name spaces..
* Experimentation will be needed

# Observations

So the only awkward bit is 




