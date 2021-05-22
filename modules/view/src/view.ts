import {lensState, LensState} from "../../state"; //changed from @focuson/state;
import {Lens, transformTwoValues} from "../../lens"; //changed from @focuson/lens;


export interface ViewStore<State, Element> {
    log: (...msg: any) => void,
    desiredView: Lens<State, string>,
    currentView: Lens<State, string | undefined>,
    views: { [tag: string]: View<State, Element, any, any> }
}

/** The information on how handle a view
 *  State is a json object holding selection state and the mainItem. Often it is the main state in the application
 *  Element is the view component. In react this will typically be a Jsx.Element, but that's defined here, so this will work with any version of React or other libraries
 *  Selection is the data needed to load the item from the back end. It is passed to the load method. Often it is called `SelectionState`
 *  T is the main item. FOor example `Book` or `Profile` or `Cart`
 * */
export interface View<State, Element, Props, T> {
    /** The lens from the State object to the 'mainItem' */
    main: Lens<State, T | undefined>,

    /** We use this to work out if we have to load data or can carry on displaying the current. Typically returns the list of ids (often one) used to load the main id*/
    keys: (s: State) => any[],

    /** When the view changes can we keep using the loaded main item*/
    canReUseView: (currentView: undefined | string, desiredView: string) => boolean,

    props: (state: LensState<State, State>) => Props,
    /** The display component to show the main item*/
    display: (props: Props) => Element,

    displayWhenNotDefined: (state: State) => Element,

    stateWhenError: (state: State, error: any) => State,

    parentView?: string,

    /** This is the state that will be 'display' while loading'. Very often it just returns the parameter, but this is a place a 'loading' screen can be injected */
    whenLoading(state: State): State,

    /** Loads a main item */
    load(state: State): Promise<T | undefined>
}

function arraysEqual<T>(a: T[], b: T[]) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

interface CanKeepDetails {
    canKeepMainItem: boolean,
    needToLoad: boolean
}

/** Works out if we can keep the current displayed main item, and whether we need to load it
 * The main item can continue to be displayed if the 'store' hasn't changed. This reduces flicker (only one change of display not too)
 * Need to load is true if the store has changed, or the keys have changed
 */
const canKeepDetails = <State, Element>(store: ViewStore<State, Element>) => (oldState: State | undefined, newState: State, desiredView: string): CanKeepDetails => {
    store.log('canKeepDetails -oldState', oldState)
    store.log('canKeepDetails -newState', newState)
    let currentView = store.currentView.get(newState)
    store.log('desiredView', desiredView, "currentView", currentView)
    let viewDetails = store.views[desiredView]
    store.log('viewDetails', viewDetails)

    let canKeepMainItem = viewDetails.canReUseView(currentView, desiredView)
    console.log("canReUseView", canKeepMainItem)
    let oldKeys = oldState && viewDetails.keys(oldState)
    let keys = viewDetails.keys(newState)
    console.log("oldKeys", oldKeys, "keys", keys)
    let needToLoad = !canKeepMainItem || oldKeys == undefined || !arraysEqual(oldKeys, keys)
    return ({canKeepMainItem, needToLoad})
};

export interface WhatToLoadAndDisplay<State> {
    displayNow: State,
    displayWhenFinished?: Promise<State>
}

/** Allthough the state has a 'desired tag' in it, we have to walk through the parent views as well.
 *
 * Given 'oldState'... the state being display, and given the current state, this code will load anything needed for the specified view*/
export function loadAndDisplayForNamedView<State, Element>(viewStore: ViewStore<State, Element>) {
    let canKeep = canKeepDetails(viewStore)
    return (oldState: State | undefined, newState: State, desiredView: string): WhatToLoadAndDisplay<State> => {
        console.log('loadAndDisplayForNamedView -desiredView', desiredView)
        console.log('loadAndDisplayForNamedView -oldState', oldState)
        console.log('loadAndDisplayForNamedView -newState', newState)
        let {canKeepMainItem, needToLoad}: CanKeepDetails = canKeep(oldState, newState, desiredView)
        console.log('keep is', canKeepMainItem, needToLoad)
        let details = viewStore.views[desiredView];

        function useDetails<Element, Props, T>(view: View<State, Element, Props, T>): WhatToLoadAndDisplay<State> {
            if (needToLoad) {
                let start: State = transformTwoValues(view.main, viewStore.currentView)(old => canKeepMainItem ? old : undefined, () => desiredView)(newState)
                try {
                    let displayNow = view.whenLoading(start)
                    let displayWhenFinished: Promise<State> = view.load(start).then(t => {
                        viewStore.log('loaded', desiredView, t)
                        let result = view.main.set(start, t);
                        viewStore.log('newState', result)
                        return result
                    }, error => view.stateWhenError(start, error))
                    return ({displayNow, displayWhenFinished})
                } catch (e) {
                    return ({displayNow: view.stateWhenError(start, e)})
                }
            } else
                return {displayNow: viewStore.currentView.set(newState, desiredView)}
        }

        return useDetails(details)
    }
}

export function load<State, Element>(viewStore: ViewStore<State, Element>) {
    let canKeep = canKeepDetails(viewStore)
    return (oldState: State | undefined, newState: State, desiredView: string): Promise<[State, State]> => {
        let details = viewStore.views[desiredView];
        let {canKeepMainItem}: CanKeepDetails = canKeep(oldState, newState, desiredView)

        function useDetails<Element, Props, T>(view: View<State, Element, Props, T>): Promise<[State, State]> {
            let start: State = transformTwoValues(view.main, viewStore.currentView)(old => canKeepMainItem ? old : undefined, () => desiredView)(newState)
            return view.load(start).then(t => {
                viewStore.log('loaded', desiredView, t)
                let result = view.main.set(start, t);
                viewStore.log('newState', result)
                return [newState, result]
            })
        }

        return useDetails(details)
    }
}

function listOfViewsToLoad<State, Element>(viewStore: ViewStore<State, Element>, viewName: string): string[] {
    let view = viewStore.views[viewName]
    let parent = view.parentView
    return parent ? [ ...listOfViewsToLoad(viewStore, parent), viewName] : [viewName]
}

export function loadAndDisplay<State, Element>(viewStore: ViewStore<State, Element>) {
    let canKeep = canKeepDetails(viewStore)
    return (oldState: State | undefined, newState: State): WhatToLoadAndDisplay<State> => {
        viewStore.log('loadAndDisplay.oldState', oldState)
        viewStore.log('loadAndDisplay.newState', newState)
        let desiredView = viewStore.desiredView.get(newState);
        let finaView = viewStore.views[desiredView]
        let {needToLoad}: CanKeepDetails = canKeep(oldState, newState, desiredView)
        viewStore.log('loadAndDisplay.desiredView', desiredView, "needToLoad", needToLoad)

        if (needToLoad) {

            let displayNow = finaView.whenLoading(newState)
            let listToLoad = listOfViewsToLoad(viewStore, desiredView)
            viewStore.log('loadAndDisplay.listToLoad', listToLoad, "displayNow", displayNow)
            let promiseOfLoad: Promise<[(State | undefined), State]> =
                listToLoad.reduce <Promise<[State | undefined, State]>>((acc, v) =>
                    acc.then(([oldS, newS]) => load(viewStore)(oldS, newS, v)), Promise.resolve([oldState, newState]))
            let displayWhenFinished = promiseOfLoad.then(([s1, s2]) => s2)
            return {displayNow, displayWhenFinished}
        } else
            return {displayNow: viewStore.currentView.set(newState, desiredView)}
    }
}

export function setJsonForView<State, Element>(viewStore: ViewStore<State, Element>, description: string, fn: (lc: LensState<State, State>) => void): (oldM: undefined | State, m: State) => void {
    let whatToLoad = loadAndDisplay(viewStore)
    return (oldM: undefined | State, main: State) => {
        let newStateFn = (fs: State) => {
            viewStore.log("newStateFn", fs)
            fn(lensState(fs, state => setJsonForView(viewStore, description, fn)(main, state), description))
        }
        let {displayNow, displayWhenFinished} = whatToLoad(oldM, main)
        newStateFn(displayNow)
        if (displayWhenFinished) displayWhenFinished.then(newStateFn)
    }
}