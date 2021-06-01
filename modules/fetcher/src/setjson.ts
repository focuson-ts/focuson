import {FetchFn} from "./fetchers";
import {FetcherTree, loadTree, wouldLoad} from "./fetcherTree";
import {LensState, lensState} from "@focuson/state";
import {Optional} from "@focuson/lens";

export interface FetcherDebug {
    fetcherDebug?: boolean,
    whatLoad?: boolean
}
export function setJsonForFetchers<State, Element>(fetchFn: FetchFn,
                                                   tree: FetcherTree<State>,
                                                   description: string,
                                                   onError: (os: State, e: any) => State,
                                                   fn: (lc: LensState<State, State>) => void,
                                                   mutate: (s: State)=> Promise<State>,
                                                   debugOptional?: Optional<State, FetcherDebug>): (s: State) => Promise<State> {
    return async (main: State): Promise<State> => {
        const debug = debugOptional?.getOption(main)
        let newStateFn = (fs: State) => fn(lensState(fs, state => setJsonForFetchers(fetchFn, tree, description, onError, fn, mutate, debugOptional)(state), description))
        try {
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - start', main)
            if (main) newStateFn(main)
            if (debug?.whatLoad) console.log("wouldLoad", wouldLoad(tree, main))
            let newMain = await loadTree(tree, main, fetchFn,debug).//
                then(s => s ? s : onError(s, Error('could not load tree'))).//
                catch(e => onError(main, e))
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - after load', newMain)
            let finalState = await mutate(newMain)
            if (debug?.fetcherDebug) console.log('setJsonForFetchers - final', finalState)
            newStateFn(finalState)
            return finalState
        } catch (e) {
            let newMain = onError(main, e);
            newStateFn(newMain)
            return newMain
        }
    }
}
