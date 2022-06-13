import { focusPageClassName, fromPathFromRaw, HasPageSelection, HasSimpleMessageL, MultiPageDetails, PageDetailsForCombine, PageSelection, PageSelectionContext, pageSelectionlens, preMutateForPages, simpleMessagesL } from "@focuson/pages";
import { HasPostCommand, HasPostCommandLens } from "@focuson/poster";
import { FetcherTree, loadTree } from "@focuson/fetcher";
import { lensState, LensState } from "@focuson/state";
import { Lens, Lenses, massTransform, NameAndLens, Optional, Transform } from "@focuson/lens";
import { errorMonad, errorPromiseMonad, FetchFn, HasSimpleMessages, RestAction, safeArray, safeString } from "@focuson/utils";
import { HasRestCommandL, HasRestCommands, rest, RestCommand, RestCommandAndTxs, RestDetails, restToTransforms } from "@focuson/rest";
import { TagHolder } from "@focuson/template";
import { AllFetcherUsingRestConfig, restCommandsFromFetchers } from "./tagFetcherUsingRest";


export function defaultCombine<S> ( state: LensState<S, any, any>, pages: PageDetailsForCombine[] ) {
  return <div className='combine'>{pages.map ( ( p, i ) => <div className={focusPageClassName} key={i}>{p.element}</div> )}</div>
}
export function defaultPageSelectionContext<S extends HasPageSelection, Context extends PageSelectionContext<S>> ( pageDetails: MultiPageDetails<S, Context> ): PageSelectionContext<S> {
  return {
    pages: pageDetails,
    combine: defaultCombine,
    pageSelectionL: pageSelectionlens<S> ()
  }
}

export interface PageSelectionAndPostCommandsContext<S> extends PageSelectionContext<S>, HasPostCommandLens<S, any> {
}
export function defaultPageSelectionAndPostCommandsContext<S extends HasPageSelection & HasPostCommand<S, any>> ( pageDetails: MultiPageDetails<S, PageSelectionAndPostCommandsContext<S>> ): PageSelectionAndPostCommandsContext<S> {
  return {
    ...defaultPageSelectionContext<S, PageSelectionAndPostCommandsContext<S>> ( pageDetails ),
    postCommandsL: Lenses.identity<S> ().focusQuery ( 'postCommands' )
  }
}
export interface HasPathToLens<S> {
  pathToLens: ( s: S ) => ( path: string ) => Optional<S, any>
}

export interface FocusOnContext<S> extends PageSelectionContext<S>, HasRestCommandL<S>, HasSimpleMessageL<S>, HasPathToLens<S> {
  commonIds: NameAndLens<S>;
  pathToLens: ( s: S, currentLens?: Optional<S, any> ) => ( path: string ) => Optional<S, any>
}
export function defaultPageSelectionAndRestCommandsContext<S extends HasPageSelection & HasRestCommands & HasSimpleMessages> ( pageDetails: MultiPageDetails<S, FocusOnContext<S>>, commonIds: NameAndLens<S> ):
  FocusOnContext<S> {
  const pathToLens: ( s: S ) => ( path: string ) => Optional<S, any> =
          fromPathFromRaw ( pageSelectionlens<S> (), pageDetails )
  return {
    ...defaultPageSelectionContext<S, FocusOnContext<S>> ( pageDetails ),
    restL: Lenses.identity<S> ().focusQuery ( 'restCommands' ),
    simpleMessagesL: simpleMessagesL (),
    commonIds,
    pathToLens
  }
}


export interface FocusOnConfig<S, Context, MSGs> {
  /** How data is sent to/fetched from apis */
  fetchFn: FetchFn,
  /** A hook that is called before anything else.  */
  preMutate: ( s: S ) => S,
  /** A hook that is called after everything else.  */
  postMutate: ( s: S ) => Promise<S>,
  /** A last ditch error handler  */
  onError: ( s: S, e: any ) => S,
  stringToMsg: ( msg: string ) => MSGs,

  /** The lens to the current selected page */
  pageL: Lens<S, PageSelection[]>,
  /** The list of all registered pages that can be displayed with SelectedPage  */
  pages: MultiPageDetails<S, Context>,

  messageL: Optional<S, MSGs[]>;


  /** The lens to the list of PostCommands*/
  restL: Optional<S, RestCommand[]>,
  /** The list of all registered posters that can send data to the back end   */
  restDetails: RestDetails<S, MSGs>,

  /** The optional that points to where the tags for the fetchers are stored */
  tagHolderL: Optional<S, TagHolder>;

  /** The collection of all registered fetchers that will get data from the back end */
  fetchers: FetcherTree<S>,

  newFetchers: AllFetcherUsingRestConfig;
  /** If we need to mutate the url dependant on the rest action this does it. */
  restUrlMutator: ( r: RestAction, url: string ) => string;
}

export function traceL<S> (): Optional<S, any> {
  // @ts-ignore
  return Lenses.identity<S> ().focusQuery ( 'trace' )
}

export interface TracingDebug {
  recordTrace?: boolean;
  showTracing?: boolean
}

export interface AccordionsInDebug {
  accordions?: string[]
}

type FocusonDispatcher<S> = ( preTxs: Transform<S, any>[], rests: RestCommandAndTxs<S>[] ) => ( originalS: S ) => S


export function fromStoreFocusonDispatcher<S> ( store: () => S ): FocusonDispatcher<S> {
  return ( txs, rests ) => ( originalS ) => {
    const allTxs: Transform<S, any>[] = [ ...txs, ...rests.flatMap ( t => t.txs ) ]
    return massTransform ( store (), ...allTxs )
  };
}
export const processRestsAndFetchers = <S, Context extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, any, any>,
                                                                                      context: Context ) =>
  ( restCommands: RestCommand[] ) => async ( s: S ): Promise<RestCommandAndTxs<S> []> => {
    const { fetchFn, restDetails, restUrlMutator, messageL, stringToMsg, tagHolderL, newFetchers } = config
    const { pageSelectionL, pathToLens } = context
    const pageSelections = safeArray ( pageSelectionL.getOption ( s ) )
    const pageName = safeString ( pageSelections?.[ 0 ]?.pageName )
    const fromFetchers = restCommandsFromFetchers ( tagHolderL, newFetchers, restDetails, pageName, s )
    const allCommands = [ ...restCommands, ...fromFetchers ]
    const txs = await restToTransforms ( fetchFn, restDetails, restUrlMutator, pathToLens, messageL, stringToMsg, s, allCommands )
    return txs
  }

function traceTransform<S> ( trace: any, s: S ): Transform<S, any> [] {
  // @ts-ignore
  const debug: any = s.debug;
  return debug?.recordTrace ? [ [ traceL<S> (), old => [ ...old ? old : [], trace ] ] ] : [];
}


const dispatchRestAndFetchCommands = <S, Context extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, any, any>,
                                                                                    context: Context,
                                                                                    dispatch: FocusonDispatcher<S> ) => ( restCommands: RestCommand[] ) => async ( s: S ): Promise<S> => {
  const process = processRestsAndFetchers ( config, context );
  const restsAndFetchers = await process ( restCommands ) ( s )
  return dispatch ( [], restsAndFetchers ) ( s )
};


export function setJsonWithDispatcherSettingTrace<S, Context extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, any, any>,
                                                                                                context: Context,
                                                                                                dispatch: FocusonDispatcher<S> ): ( s: S, reason: any ) => Promise<S> {

  const deleteRestCommands: Transform<S, any> = [ config.restL, () => [] ];
  const { preMutate, postMutate, onError } = config
  const doit = async ( s, reason ) => {
    const debug = s.debug?.restDebug
    const restCommands = safeArray ( config.restL.getOption ( s ) )
    let start = errorMonad ( s, debug, onError,
      [ 'preMutateForPages', preMutateForPages<S, Context> ( context ) ],
      [ 'preMutate', preMutate ],
      [ 'dispatch pre rests', dispatch ( [ ...traceTransform ( reason, s ), deleteRestCommands ], [] ) ]//This updates the gui 'now' pre rest/fetcher goodness. We need to kill the rest commands to stop them being sent twice
    );
    const result = await errorPromiseMonad ( onError ) (
            start, debug,
            [ 'dispatchRestAndFetchCommands', dispatchRestAndFetchCommands ( config, context, dispatch ) ( restCommands ) ],
            [ 'postMutate', postMutate ]
          )
    ;
    return result
  };
  return doit
}
export function setJsonUsingNewFetchersUsingFlux<S, Context extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, any, any>,
                                                                                               context: Context,
                                                                                               publish: ( lensState: LensState<S, S, Context> ) => void ): ( s: S, reason: any ) => void {

  const simpleFocusonDispatcher = ( txs: Transform<S, any>[], rests: RestCommandAndTxs<S>[] ) => ( originalS: S ): S => {
    const allTxs: Transform<S, any>[] = [ ...txs, ...rests.flatMap ( t => t.txs ) ]
    const newState = massTransform ( originalS, ...allTxs );
    publish ( lensState ( newState, setJsonUsingNewFetchersUsingFlux ( config, context, publish ), 'state', context ) )
    return newState
  };
  return setJsonWithDispatcherSettingTrace ( config, context, simpleFocusonDispatcher )
}


export function setJsonForFocusOn<S, Context extends PageSelectionContext<S>, MSGs> ( config: FocusOnConfig<S, Context, MSGs>, context: Context, pathToLens: ( s: S ) => ( path: string ) => Optional<S, any>, publish: ( lc: LensState<S, S, Context> ) => void ): ( s: S, reason: any ) => Promise<S> {
  return async ( main: S, trace: any ): Promise<S> => {
    console.log ( 'setJsonForFocusOn', trace )
    // @ts-ignore
    const debug: any = main.debug;
    const withDebug = debug?.recordTrace ? traceL<S> ().transform ( old => [ ...old ? old : [], trace ] ) ( main ) : main
    const { fetchFn, preMutate, postMutate, onError, pages, restDetails, fetchers, restL, pageL, messageL, stringToMsg } = config
    const newStateFn = ( fs: S ) => publish ( lensState ( fs, setJsonForFocusOn ( config, context, pathToLens, publish ), 'setJson', context ) )
    try {
      const withPreMutate = preMutate ( withDebug )
      const firstPageProcesses: S = preMutateForPages<S, Context> ( context ) ( withPreMutate )
      const afterRest = await rest ( fetchFn, restDetails, config.restUrlMutator, pathToLens, messageL, stringToMsg, restL, traceL (), firstPageProcesses )
      if ( afterRest ) newStateFn ( afterRest )
      let newMain = await loadTree ( fetchers, afterRest, fetchFn, debug )
        .then ( s => s ? s : onError ( s, Error ( 'could not load tree' ) ) )
        .catch ( e => onError ( afterRest, e ) )
      let finalState = await postMutate ( newMain )
      newStateFn ( finalState )
      return finalState
    } catch ( e ) {
      console.error ( "An unexpected error occured. Rolling back the state", e )
      let newMain = onError ( main, e );
      newStateFn ( newMain )
      return newMain
    }
  }
}



