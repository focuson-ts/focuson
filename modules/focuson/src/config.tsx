import { focusPageClassName, fromPathFromRaw, fromPathGivenState, HasPageSelection, HasPathToLens, HasSimpleMessageL, mainPage, mainPageFrom, MultiPageDetails, PageDetailsForCombine, PageSelection, PageSelectionContext, pageSelectionlens, preMutateForPages, simpleMessagesL } from "@focuson/pages";
import { HasPostCommand, HasPostCommandLens } from "@focuson/poster";
import { FetcherTree, loadTree } from "@focuson/fetcher";
import { lensState, LensState } from "@focuson/state";
import { identityOptics, Lenses, massTransform, NameAndLens, Optional, Transform } from "@focuson/lens";
import { DateFn, defaultDateFn, errorMonad, FetchFn, HasDateFn, HasSimpleMessages, RestAction, safeArray, safeString, SimpleMessage, SimpleMessageLevel, stringToSimpleMsg } from "@focuson/utils";
import { HasMessagesPostProcessor, HasRestCommandL, HasRestCommands, ModalProcessorsConfig, rest, RestCommand, RestCommandAndTxs, RestDetails, restL, RestToTransformProps, restToTransforms } from "@focuson/rest";
import { HasTagHolder, TagHolder } from "@focuson/template";
import { AllFetcherUsingRestConfig, restCommandsFromFetchers } from "./tagFetcherUsingRest";
import { FocusOnDebug } from "./debug";


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

export interface HasFetchersAndRest<S, MSGs> {
  newFetchers: AllFetcherUsingRestConfig;
  /** The list of all registered posters that can send data to the back end   */
  restDetails: RestDetails<S, MSGs>,

  /** The lens to the list of PostCommands*/
  restL: Optional<S, RestCommand[]>,

  /** The optional that points to where the tags for the fetchers are stored */
  tagHolderL: Optional<S, TagHolder>;
}
export interface HasGetCurrentMain<S> {
  currentState<D, C> ( state: LensState<S, any, C> ): LensState<S, D, C>
}

export interface HasMockJwt {
  mockJwt: boolean
}
export interface FocusOnContext<S> extends PageSelectionContext<S>, HasRestCommandL<S>, HasSimpleMessageL<S>, HasPathToLens<S>,
  HasFetchersAndRest<S, SimpleMessage>, HasDateFn, HasGetCurrentMain<S>, HasMessagesPostProcessor<SimpleMessage>, HasMockJwt {
  commonIds: NameAndLens<S>;
}
export function defaultPageSelectionAndRestCommandsContext<S extends HasPageSelection & HasRestCommands & HasSimpleMessages & HasTagHolder>
( pageDetails: MultiPageDetails<S, FocusOnContext<S>>, commonIds: NameAndLens<S>,
  newFetchers: AllFetcherUsingRestConfig,
  restDetails: RestDetails<S, SimpleMessage>, dateFn: DateFn, mockJwt: boolean ): FocusOnContext<S> {
  const pathToLens: ( s: S ) => ( path: string ) => Optional<S, any> =
          fromPathFromRaw ( pageSelectionlens<S> (), pageDetails )
  // const{restL, tagHolderL, newFetchers} =
  return {
    ...defaultPageSelectionContext<S, FocusOnContext<S>> ( pageDetails ),
    simpleMessagesL: simpleMessagesL (),
    commonIds,
    pathToLens,
    dateFn,
    restL: restL<S> (),
    tagHolderL: Lenses.identity<S> ().focusQuery ( 'tags' ),
    newFetchers,
    restDetails,
    currentState<D, C> ( state: LensState<S, D, C> ) {return state}, // default that may replaced by the redux code in store.ts,
    messagePostProcessor: {},
    mockJwt
  }
}


export interface FocusOnConfig<S, Context, MSGs> extends HasFetchersAndRest<S, MSGs> {
  /** How data is sent to/fetched from apis */
  fetchFn: FetchFn,
  /** A hook that is called before anything else.  */
  preMutate: ( s: S ) => S,
  /** A hook that is called after everything else.  */
  postMutate: ( s: S ) => Promise<S>,
  /** A last ditch error handler  */
  onError: ( s: S, e: any ) => S,
  stringToMsg: ( msg: string, level?: SimpleMessageLevel ) => MSGs,

  /** The lens to the current selected page */
  pageL: Optional<S, PageSelection[]>,
  /** The list of all registered pages that can be displayed with SelectedPage  */
  pages: MultiPageDetails<S, Context>,
  messageL: Optional<S, MSGs[]>;
  /** @deprecated The collection of all registered fetchers that will get data from the back end.Replaced by newFetchers */
  fetchers?: FetcherTree<S>,


  /** If we need to mutate the url dependant on the rest action this does it. */
  restUrlMutator: ( r: RestAction, url: string ) => string;
  /** A count used to say how many times we have been doing 'do a rest/fetcher loop'. Used to stop a poison setup where we constantly retry*/
  restCountL: Optional<S, RestCount>
  maxRestCount: number
}
export interface RestCount {
  loopCount: number;
  times: number
}
export interface HasRestCount {
  restCount?: RestCount
}
export function restCountL<S extends HasRestCount> (): Optional<S, RestCount> {
  return identityOptics<S> ().focusQuery ( 'restCount' )
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
  return ( txs, rests ) => () => {
    const allTxs: Transform<S, any>[] = [ ...txs, ...rests.flatMap ( t => t.txs ) ]
    return massTransform ( store (), ...allTxs )
  };
}
function addTagTxsForFetchers<S> ( tagHolderL: Optional<S, TagHolder>, txs: RestCommandAndTxs<S>[] ): RestCommandAndTxs<S>[] {
  return txs.map ( ( rcAndTx ) => {
    const { restCommand, } = rcAndTx
    if ( restCommand.tagNameAndTags ) {
      let txs: Transform<S, any>[] = [ ...rcAndTx.txs, [ tagHolderL.focusOn ( restCommand.tagNameAndTags.tagName ), () => restCommand.tagNameAndTags.tags ] ];
      return { ...rcAndTx, txs: txs }
    } else
      return rcAndTx
  } )

}
export const processRestsAndFetchers = <S, Context extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, any, any>,
                                                                                      context: Context ) =>
  ( restCommands: RestCommand[] ) => async ( sFn: () => S ): Promise<RestCommandAndTxs<S> []> => {
    const s = sFn ()
    // @ts-ignore
    const debug: any = s.debug?.restDebug;
    const { fetchFn, restDetails, restUrlMutator, messageL, stringToMsg, tagHolderL, newFetchers } = config
    const { pageSelectionL, pathToLens, mockJwt } = context
    const pageSelections = safeArray ( pageSelectionL.getOption ( s ) )
    const pageName = safeString ( mainPageFrom ( pageSelections ).pageName )
    if ( debug ) console.log ( 'processRestsAndFetchers - pageSelections', pageSelections )
    if ( debug ) console.log ( 'processRestsAndFetchers - pageName', pageName )
    const fromFetchers = restCommandsFromFetchers ( tagHolderL, newFetchers, restDetails, pageName,  s )
    const allCommands: RestCommand[] = [ ...restCommands, ...fromFetchers ]
    const restProps: RestToTransformProps<S, MSGs> = { fetchFn, mockJwt, d: restDetails, pathToLens, messageL, stringToMsg, traceL: traceL (), urlMutatorForRest: restUrlMutator }
    const txs = await restToTransforms ( restProps, sFn, allCommands )
    const result = addTagTxsForFetchers ( config.tagHolderL, txs )
    return result
  }

function traceTransform<S> ( trace: any, s: S ): Transform<S, any> [] {
  // @ts-ignore
  const debug: any = s.debug;
  return debug?.recordTrace ? [ [ traceL<S> (), old => [ ...old ? old : [], trace ] ] ] : [];
}


export const dispatchRestAndFetchCommands = <S, Context extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, any, any>,
                                                                                           context: Context,
                                                                                           dispatch: FocusonDispatcher<S> ) => ( restCommands: RestCommand[] ) => async ( sFn: () => S ): Promise<S> => {
  const startS = sFn ()
  // @ts-ignore
  const debug: FocusOnDebug = startS.debug?.restDebug || startS.debug?.reduxDebug || startS.debug?.tagFetcherDebug;
  if ( debug ) console.log ( `dispatchRestAndFetchCommands relooping count is ${JSON.stringify ( config.restCountL.getOption ( startS ) )} RestCommands: ${restCommands.length}`, restCommands, startS )
  const process = processRestsAndFetchers ( config, context );
  const restsAndFetchers: RestCommandAndTxs<S>[] = await process ( restCommands ) ( sFn )
  const sAfterRestAndFetchers = sFn ()
  const sWithCountIncreased = config.restCountL.transform ( restCount => {
    const times = restCount ? restCount.times + 1 : 1
    if ( restsAndFetchers.length === 0 ) {
      if ( debug ) console.log ( "  There are no restOrFetcher so resetting loop count to zero" )
      return { loopCount: 0, times };
    }
    const oldCount = restCount ? restCount.loopCount : 0
    if ( oldCount > config.maxRestCount ) throw Error ( `Seem to be in infinite loop where we get something from backend which trigges another getting something from backend.... MaxRestCount ${config.maxRestCount}, Loopcount = ${oldCount}` );
    let result = { loopCount: oldCount ? oldCount + 1 : 1, times };
    if ( debug ) console.log ( `dispatchRestAndFetchCommands - end relooping count is now ${JSON.stringify ( result )}` )
    return result
  } ) ( sAfterRestAndFetchers )
  return dispatch ( [], restsAndFetchers ) ( sWithCountIncreased )
};


export function makeProcessorsConfig<S, Context extends FocusOnContext<S>> ( startS: S, context: Context ) {
  const pathToLens = fromPathGivenState ( lensState ( startS, () => {throw Error ()}, '', context ) )
  const processorsConfig: ModalProcessorsConfig<S, SimpleMessage> = {
    pageNameFn: ( s: S ) => mainPage<S, Context> ( lensState ( s, () => {throw Error ()}, '', context ) ).pageName,
    tagHolderL: context.tagHolderL,
    messageL: context.simpleMessagesL,
    defaultL: Lenses.identity (),
    dateFn: context.dateFn,
    stringToMsg: stringToSimpleMsg ( defaultDateFn, 'info' ),
    s: startS,
    fromPathTolens: pathToLens,
    toPathTolens: pathToLens
  }
  return processorsConfig;
}
export function setJsonWithDispatcherSettingTrace<S, Context extends FocusOnContext<S>> ( config: FocusOnConfig<S, any, SimpleMessage>,
                                                                                          context: Context,
                                                                                          dispatch: FocusonDispatcher<S> ): ( sFn: () => S, reason: any ) => Promise<S> {

  const deleteRestCommands: Transform<S, any> = [ config.restL, () => [] ];
  const { preMutate, postMutate, onError } = config
  return async ( sFn: () => S, reason: any ) => {
    const startS = sFn ();
    // @ts-ignore
    const debug = startS.debug?.restDebug
    const restCommands = safeArray ( config.restL.getOption ( startS ) )
    const processorsConfig = makeProcessorsConfig ( startS, context );
    let start = errorMonad ( startS, debug, onError,
      [ 'preMutateForPages', preMutateForPages<S, Context> ( context, processorsConfig ) ],
      [ 'preMutate', preMutate ],
      [ 'dispatch pre rests', dispatch ( [ ...traceTransform ( reason, startS ), deleteRestCommands ], [] ) ]//This updates the gui 'now' pre rest/fetcher goodness. We need to kill the rest commands to stop them being sent twice
    );
    await dispatchRestAndFetchCommands ( config, context, dispatch ) ( restCommands ) ( sFn )
    const postRestAndFetchS = sFn ()
    return postRestAndFetchS
  };
}
export function setJsonUsingNewFetchersUsingFlux<S, Context extends FocusOnContext<S>, MSGs> ( config: FocusOnConfig<S, any, any>,
                                                                                               context: Context,
                                                                                               publish: ( lensState: LensState<S, S, Context> ) => void ): ( originalS, reason: any ) => void {

  const simpleFocusonDispatcher = ( txs: Transform<S, any>[], rests: RestCommandAndTxs<S>[] ) => ( originalS: S ): S => {
    const allTxs: Transform<S, any>[] = [ ...txs, ...rests.flatMap ( t => t.txs ) ]
    const newState = massTransform ( originalS, ...allTxs );
    publish ( lensState ( newState, ( s, reason ) => setJsonUsingNewFetchersUsingFlux ( config, context, publish ) ( s, reason ), 'state', context ) )
    return newState
  };
  return setJsonWithDispatcherSettingTrace ( config, context, simpleFocusonDispatcher )
}


/** @deprecated Uses old fetchers, doesn't use redux and has issues with slow fetchers/rest actions */
export function setJsonForFocusOn<S, Context extends FocusOnContext<S>> ( config: FocusOnConfig<S, Context, SimpleMessage>, context: Context, pathToLens: ( s: S ) => ( path: string ) => Optional<S, any>, publish: ( lc: LensState<S, S, Context> ) => void ): ( s: S, reason: any ) => Promise<S> {
  return async ( main: S, trace: any ): Promise<S> => {
    console.log ( 'setJsonForFocusOn', trace )
    // @ts-ignore
    const debug: any = main.debug;
    const withDebug = debug?.recordTrace ? traceL<S> ().transform ( old => [ ...old ? old : [], trace ] ) ( main ) : main
    const { fetchFn, preMutate, postMutate, onError, fetchers, restDetails, restL, messageL, stringToMsg } = config
    if ( !fetchers ) throw new Error ( `setJsonForFocusOn needs the old style fetchers in the config ` )
    const newStateFn = ( fs: S ) => publish ( lensState ( fs, setJsonForFocusOn ( config, context, pathToLens, publish ), 'setJson', context ) )
    try {
      const withPreMutate = preMutate ( withDebug )
      const processorsConfig = makeProcessorsConfig ( main, context );
      const firstPageProcesses: S = preMutateForPages<S, Context> ( context, processorsConfig ) ( withPreMutate )
      const restProps: RestToTransformProps<S, SimpleMessage> = { fetchFn, mockJwt: context.mockJwt, d: restDetails, pathToLens, messageL, stringToMsg, traceL: traceL (), urlMutatorForRest: config.restUrlMutator }
      const afterRest = await rest ( restProps, restL, () => firstPageProcesses )
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



