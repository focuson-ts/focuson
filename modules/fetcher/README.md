# State fetch

A common pattern in GUIs is 'showing the data revealed by an API'. For example we might show the data in shopping site,
or show account data about customers.

When doing this typically there is a navigation area which determines what is being looked at, and then multiple places
that show information about what is being looked at. Each time the state is changed a decision needs to be made about
whether to get more information from the backing API(s).

The core idea is to have all this done as part of the 'flux loop'. So the components communicating by setting parameters
in the state such as 'the selected thing' and possible a 'tag' that explains how to load the data. Thus the components
don't 'call actions' or anything

This is currently under heavy development: fetchers are being added, signatures being changed, in order to make the
library 'more polished'

# Key Concepts

## State

The state is just a blob of Json. It can come from anywhere. It could easily be the state of the '@focuson/state'
project, but can also be 'just a javascript object'.

In the state we record 'what we want to be loaded' and 'what we have loaded'. The job of this project is to make that '
declarative'. So we just 'change what we want to be loaded' and the correct things are loaded.

## Fetchers

A Fetcher is responsible for describing what will be fetched from the back end. It doesn't actually fetch it, but the
method applyFetchers(...)
will go and do the fetching. This separation makes it really easy to test what is going to happen.

```typescript
/** The fetcher is responsible for modifying state. It is effectively a PartialFunction */
export interface Fetcher<State, T> {
    /** This works out if we need to load. Typically is a strategy */
    shouldLoad: (newState: State | undefined) => boolean,
    /** This provides the info that we need to load. The first two parameters can be passed to fetch, and the third is how we process the result. Note that it is hard to guarantee that the json is a T, so you might want to check it!*/
    load: LoadFn<State, T>,
    /** For debugging and testing. It's idiomatically normal to make this the variable name of your fetcher, or some other description that makes sense to you */
    description: string
}

export interface LoadFn<State, T> {(newState: State | undefined): LoadInfo<State, T>}
export type LoadInfo<State, T> = [RequestInfo, RequestInit | undefined, MutateFn<State, T>]
export interface MutateFn<State, T> {(s: State | undefined): (status: number, json: T) => State}
```

A PartialFunction is a function that might not be callable. You need to call the 'shouldLoad' method first to see if the
load function is safe or sensible to load.

* shouldLoad. Given a state will determine whether this fetcher should say 'load it'
* load. Returns a function that has three results. The first two can be passed as in to 'fetch' and the last one is 'how
  do I update the state with the results of the loaded data'

# Fetchers

## How to use fetchers

Typically if you are using react you have a 'start react place' where you define what is renderered. You include in this
a fetcherTree which is effectively a collection of fetchers, and this method ochestrates things. So mostly you don't '
use' fetchers. You 'set them up to describe how to load stuff' and then have some selection state that you 'set' in your
components. The infrastructure works out what to be loaded in the same way that the react infrastructure is given a
description of what to display and works out what to actually change

# How to test fetchers

## Low level 'what would load tests'

For many fetchers we will have a test that says 'given this state the fetcher would load this', and other tests that
say 'given this state the fetcher doesn't load. Often these tests are one line long.

## Mid level 'what would load tests' on the fetcher graph

Again typically we have fetcher graph. We write tests that 'set up a state' and then ask the question 'what would be
loaded'. These are our 'unit tests' which are cheap to write, quick to execute and read good. They allow us to check all
the permutations we are interested in. These test things like
'do we load from the correct url', 'are we only loading things when we need to load them', 'is the thing we are loading
being added to the correct place.'

## Contract tests

I test to have a contract test for each 'url pattern' that I use that checks it actually loads what we want. (i.e. 'load
this resource', 'list this resource').

## Smoke tests

I'll have a very small number of smoke tests that run against 'the real world' which can either be an acceptance
environment, or against the current production systems (that's a policy decision that the project makes. Which ever
choice they make they typically regard the other choice with horror). In a payment application they might log in, move
one euro from an account to another... but no permutations or unhappy paths. These are just checking that the
connectivity and the most critical paths work. The permutations and contracts are validated by much lower level, faster,
cheaper and better tests.

# Predefined fetchers

## Fetcher when undefined

```typescript
export function fetcherWhenUndefined<State, Child>(optional: Optional<State, Child>,
                                                   reqFn: ReqFn<State>,
                                                   description?: string): Fetcher<State, Child> { /* */
}

export interface ReqFn<State> {
    (newState: State | undefined): [RequestInfo, RequestInit | undefined] | undefined
}
```

This is a simple fetcher that uses the parameter 'lens' to focus in on a child and if that child is not present will
load it. This is a great fetcher to use when you just 'need some data at the start' such as 'reference data'. The
parameter 'optional' points at the item that is to be loaded. The RegFn returns the url and any other 'stuff' (such as
method or headers) needed to load the data. As every the description is for debugging and tests.

### Example

```typescript
interface State {
    initialData?: Data
}

const loadInitialData = fetcherWhenUndefined<State, Data>(identityOptics<State>().focusQuery('initialData'), s => ["http://the/url", {}])
```

Often applications I work with have a 'sitemap' end point that details how to find things. To use it

```typescript
const loadSiteMapF = fetcherWhenUndefined<State, SiteMap>(
    stateToSiteMapL,
    (s) => ["someSitemapUrl", undefined], "loadSiteMapF");
```

## fetchAndMutate

This is a 'composed fetcher'. You give it a fetcher and a function, and it first does whatever the raw fetcher would do,
and if the fetcher goes to get data, it is mutated by the function.

Examples of where you might want to use this

* You want to load something but it is in the wrong format, so the mutate function puts it in the right state
* You want to load a thing that can be navigated (a sitemap, a list of products...) and then want to set up the
  selection state so that the first thing is the selected thing
* Every time you load a new user you clear down the state. This is great with 'login' logic.

## loadSelectedFetcher

```typescript

export const loadSelectedFetcher = <State, Holder, T>(tagFn: (s: State) => (string | undefined)[],
                                                      holderPrism: DirtyPrism<Holder, [string [], T]>,
                                                      target: Optional<State, Holder>,
                                                      reqFn: ReqFn<State>,
                                                      description?: string): Fetcher<State, T>
{}
```

Imagine we have a shopping application. We have things like 'the selected department - books/washing machines/...',
and 'the selected product'. In this world we want to have a selection state that details these things, and a place in
the state that is our selected item (the target). This fetcher is responsible for loading the target when the selection
state varies.

### Generics

* `State` is the type of the full state. This fetcher know nothing about it, other than 'there is one'
* `Holder` When we load the thing, we need to store things about it (such as the current value of the tags). This is
  stored in a Holder. There is a 'default holder' called `Holder<T>` but you can use your own to make the names nicer
* `T` The type that will be fetched.

### Parameters

* `holderPrism: DirtyPrism<Holder, [string [], T]>`. DirtyPrisms 'Look scary' but this is actually just a
  constructor/destructor. Given a `Holder` it know how to rip it apart into the list of tags and a T, and given a list
  of tags and a T it knows how to make the holder.
* `tagFn: (s: State) => (string | undefined)[]` given a State, this rips out the bits of data that we care about. If
  they change then the `loadSelectedFetcher` will fetch something. In the example we are discussing this would
  return `['selectedDepartmentId', 'selectedProductId'`. Note that it returns the current values of these, not their
  names
* `target: Optional<State, Holder>` where to put the loaded target
* `reqFn: ReqFn<State>` how to load the target
* `description` for tests and debugging

### Example

```typescript
const loadApiF: Fetcher<State, Api> = loadSelectedFetcher<State, ApiData, Api>
((s: State) => [s.selState?.selectedEntity, s.selState?.selectedApi],
    stateL.focusQuery('apiData'),
    apiDataHolder('H/ApiData'),
    s => [`http//someDomain/api/${s.selState.selectedEntity}/api/${s.selState.selectedApi}`],
    "loadApiF")

export interface State {
    selState: SelectionState
    apiData?: ApiData,
}

export interface SelectionState {
    selectedEntity?: string,
    selectedThing?: string,
    selectedApi?: string
}

export interface ApiData {
    tags: string[]
    api: Api, //the item being loaded
    source?: string[], //other data we might want to load in the future that is about the api
    status?: string,
    desc?: string
}

function apiDataHolder(description: string): DirtyPrism<ApiData, [string[], Api]> {
    return dirtyPrism(ad => [ad.tags, ad.api], ([tags, api]) => ({tags: tags, api: api}))
}
```

To use this you just need to set the selection state, and the infrastructure does the rest. If the
tags (`selectedEntity` & `selectedApi`) change then in the main state the `apiData` will be reloaded. Note the pattern
than dependant data about the api (metadata that will be loaded by other fetchers if needed)
is part of the ApiData so that it is always cleared if a new api is loaded.


## ifEEqualsFetcher

We often only want data fetched if we are displaying it. Examples of this include 'status data', 'the selected item', 'the user history'. For
this kind of scenario we have the 'ifEqualsFetcher'.

```typescript
export function ifEEqualsFetcher<State>(condition: (s: State) => boolean, fetcher: Fetcher<State, any>, description?: string): Fetcher<State, any> {}
```
The fetcher is only invoked if the condition is true. Often the condition will be something like 'is the selected radio button equal to someValue'.


## radioButtonFetcher
@Deprecated

We will probably delete this as the ifEqualsFetcher seems to do this job better and simple

```typescript
function radioButtonFetcher<State>(
    desiredRadioButton: (s: State) => (string | undefined),//The desired tag.
    actualRadioButton: Optional<State, string>, // this is the tag that names the currently actually selected radio button
    whichFetcher: (tag: string) => Fetcher<State, any>,
    description?: string
): Fetcher<State, T>
```

Often our gui wants to load different aspects of a thing. For example when looking at a user we might want to go get
their profile, their order history, their favourite list. In this scenario only one is being shown at once so we have
a `radioButtonFetcher` that works out what to show based on the desiredTag.

The react code that displays the component would be using the 'actual radio button' to select which view to show

### generics

* `State` The `main state`. The fetcher knows nothing about this, other than that it exists

### Parameters

* `desiredRadioButton: (s: State) => (string | undefined)` A function that given a state tells the fetcher what radio
  button the user wants
* `actualRadioButton: Optional<State, string>` This is the radio button that is 'currently loaded'. It is compared with
  the desiredRadioButton
* `whichFetcher: (radioButton: string) => Fetcher<State, any>` Given a radio button
* `description?: string`

### Example

```typescript
const loadApiChild = radioButtonFetcher<State>(
    s => s.selState?.selectedRadioButton,
    identityOptics<State>().focusQuery('radioButton'),
    fromTaggedFetcher({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}),
    "loadApiChild")

export interface State {
    apiData?: ApiData,
    selState: SelectionState,
    radioButton?: 'desc' | 'src' | 'status'
}

export interface SelectionState {
    selectedRadioButton?: string,
}
```

In this example when the code sets the `s.selState?.selectedRadioButton` this is compared with the `s.radioButton` and
if it varies the appropriate
`fromTaggedFetcher({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}),` is fetched.

# FetcherTree

```typescript
interface FetcherTree<State> {
    fetcher: Fetcher<State, any>,
    children: FetcherChildLink<State, any>[]
}

interface FetcherChildLink<State, Child> {
    lens: Lens<State, Child>,
    child: FetcherTree<Child>
}
```

One fetcher on its own is usually not very useful. Typically we have to get all sorts of things from the back end. To
handle this we put fetchers into a fetcherTree. This is just a collection of fetchers with the nice feature that it
controls the order the fetchers are checked. Things higher up the tree are checked (and therefore loaded) before things
lower down the tree. The lens in the `FetcherChildLink` is just a way to compose and reuse fetchers: usually it is the '
identity lens' as often all fetchers are based of 'State'.

In simple applications we probably have a single fetcher tree. In complex ones we will often make subtrees and stich
them together. This allows the tests for the subtrees to be independent of the rest of the world.

## Example

```typescript


const loadApiF: Fetcher<State, Api> = loadSelectedFetcher<State, SelectionState, ApiData, Api>(
    stateL.focusOn('selState'), apiDataHolder('H/ApiData'))((sel: SelectionState) => [sel?.selectedEntity, sel?.selectedApi],
    stateL.focusQuery('apiData'),
    loadFromSiteMap((siteMap, sel) =>
        sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.self),
    "loadApiF")


const loadThingF: Fetcher<State, Thing> = loadSelectedFetcher<State, SelectionState, Holder<Thing>, Thing>(
    stateL.focusOn('selState'), holderIso<Thing>('H/Thing'))(s => [s.selectedEntity, s.selectedThing],
    stateL.focusQuery('thing'),
    loadFromSiteMap((siteMap, sel) => sel.selectedEntity && sel.selectedThing && siteMap[sel.selectedEntity].things[sel.selectedThing].href),
    'LoadThingF')

let apiDataL: Optional<State, ApiData> = stateL.focusQuery('apiData')

const loadApiDescF: Fetcher<State, string> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('desc'),
    loadFromSiteMap((siteMap, sel) => sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.description),
    "loadApiDescF")

const loadApiStatus: Fetcher<State, string> = fetcherWhenUndefined<State, string>(
    apiDataL.focusQuery('status'),
    loadFromSiteMap((siteMap, sel) => sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.status),
    "loadApiStatus")

const loadApiSrc: Fetcher<State, string[]> = fetcherWhenUndefined<State, string[]>(
    apiDataL.focusQuery("source"),
    loadFromSiteMap((siteMap, sel) => sel.selectedEntity && sel.selectedApi && siteMap[sel.selectedEntity].api[sel.selectedApi]._links.source),
    "loadApiSrc")


const loadApiChild = radioButtonFetcher<State, ApiData>(
    s => s.selState?.selectedRadioButton,
    identityOptics<State>().focusQuery('radioButton'),
    fromTaggedFetcher({'desc': loadApiDescF, 'src': loadApiSrc, 'status': loadApiStatus}),
    "loadApiChild")


const demoTree: FetcherTree<State> = fetcherTree(
    loadSiteMapF,
    child(loadThingF),
    child(loadApiF,
        child(loadApiChild)))
```

### Testing

The key to testing is the `wouldLoad` function

```typescript
function wouldLoad<T>(ft: FetcherTree<T>, state: T | undefined, depth?: number): WouldLoad[] 
```

This is fantastic in tests

```typescript
    it("when sitemap loaded and api not loaded but radio selected", () => {
    expect(wouldLoad(demoTree, {
        sitemap: exampleSiteMap,
        selState: {selectedEntity: "be", selectedApi: "a1", selectedRadioButton: "src"}
    })).toEqual([
            {fetcher: loadSiteMapF, load: false},
            {fetcher: loadThingF, load: false},
            {fetcher: loadApiF, load: true, reqData: ["/be/a1/api", {}]},
            {fetcher: loadApiChild, load: true, reqData: ["/be/a1/source", {}]}
        ]
    )
})
```

Here we have our `fetcherTree` called `demoTree`. We give it a state and `wouldLoad` tells us what it would load.

`WouldLoad` allows us to worry about 'what should happen'. If we have tested the individual fetchers, we can now test
the orchestration of those fetchers assuming that they work. This allows us to write lots of permutations covering lots
of possibility cheaply and quickly without worry about test data management.

Note that when you use this recommended style of testing, you do need to test the fetchers as well
