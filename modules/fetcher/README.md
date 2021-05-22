# State fetch

A common pattern in GUIs is 'showing the data revealed by an API'. For example we might show the data in shopping site,
or show account data about customers.

When doing this typically there is a navigation area which determines what is being looked at, and then multiple
places that show information about what is being looked at. Each time the state is changed a decision needs to be made
about whether to get more information from the backing API(s).

The core idea is to have all this done as part of the 'flux loop'. So the components communicating by setting parameters in the state
such as 'the selected thing' and possible a 'tag' that explains how to load the data. Thus the components don't 'call actions' or anything


# Key Concepts

## State
This uses the state defined in the project [@focus-on/state](https://www.npmjs.com/package/@focuson/state). The state
is a javascript object with one or more lens focused on different parts of it which allows it to be 'modified' using the
usual 'immutable' meaning of modified (i.e. copied and the copy updated)

## Fetchers
The `state` will have (names all configurable - the following is just the normal names)
* A `view` field that holds a string defining the current view. It is used as a key into the ViewState
* A `mainItem` that is either undefined or the current mainItem the view is focused on
* A `selectionState` that holds information allowing the mainItem to be fetched (e.g. one or more ids)

## Fetchers state

Given the name of a view, the view state defines
* How to display it
* How to fetch it from the back end
* How to work out whether it needs to be fetched

## Parent Views

Some views depend on parents, and the parent data has to be loaded first. For instance if we are displaying an item in a collection there could
be a view for the collection which should be loaded before the item is loaded.

This is handled using `parentView`

## setJsonUsingView

This is the helper method that makes it all work. This controls the rendering.


## Generics in Fetchers

Fetchers store has the signature `ViewStore<State, Element>`. `State` is the javascript object that defines the state the view will be looking at. `Element` will 
usually be a JSX.Element, but is defined as a generic to avoid binding to any specific library. Thus you can use this with any version of react

## Displaying the view

The `@focuson/view-components`  project has the `MainView` component. It is bound to a particular version of react, but you can just copy 
it if you want a different version. 