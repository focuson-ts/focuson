import { lensState } from "@focuson/state";
import { identityOptics } from "@focuson/lens";
import { focusedPage, HasPageSelection, Loading, MultiPageDetails, PageConfig, PageMode, PageSelectionContext, simpleMessagesPageConfig } from "@focuson/pages";
import { HasSimpleMessages, SimpleMessage } from "@focuson/utils";
import { defaultPageSelectionContext } from "@focuson/focuson";
import { HasTagHolder } from "@focuson/template";


export interface PageSpecState extends HasPageSelection, HasSimpleMessages, HasTagHolder {
  tag1?: string,
  tag2?: string,
  tempData?: string,

  firstPage?: string,
  secondPage?: SecondPageDomain
}
export interface SecondPageDomain {
  fromApi?: string
}

export const emptyState: PageSpecState = {
  pageSelection: [], messages: [], tags: {}
}
export const rootState: PageSpecState = { ...emptyState, messages: [], pageSelection: [], tempData: 'x' };
export const dataDefinedState: PageSpecState = { ...emptyState, firstPage: 'one', secondPage: { fromApi: 'two' }, messages: [], pageSelection: [], tempData: 'x' };
export const firstPageSelectedState = stateWith ( rootState, [ 'firstPage', 'view' ] )
export const firstPageWithFirstTime: PageSpecState = stateWithFirstTimes ( rootState, [ 'firstPage', 'view' ] )
export const secondPageSelectedState = stateWith ( rootState, [ 'secondPage', 'view' ] )
export const invalidPageState = stateWith ( rootState, [ 'unknownpage', 'view' ] )

export function stateWith ( main: PageSpecState, ...nameAndModes: [ string, PageMode ][] ): PageSpecState {
  return { ...main, pageSelection: nameAndModes.map ( ( [ pageName, pageMode ] ) => ({ pageName, pageMode }) ) }
}
export function stateWithFirstTimes ( main: PageSpecState, ...nameAndModes: [ string, PageMode ][] ): PageSpecState {
  return { ...main, pageSelection: nameAndModes.map ( ( [ pageName, pageMode ] ) => ({ pageName, pageMode , firstTime: true}) ) }
}
export function lensStateWith ( main: PageSpecState, setMain: ( s: PageSpecState ) => void, ...nameAndModes: [ string, PageMode ][] ) {
  return lensState<PageSpecState, ContextForTest> ( stateWith ( main, ...nameAndModes ), setMain, 'displayMain / focusedPage', context )
}

export interface ContextForTest extends PageSelectionContext<PageSpecState> {

}


const DisplayPageSpecState = ( prefix: string ) =>
  focusedPage<PageSpecState, string, ContextForTest> ( () => `[${prefix}Title]:` ) ( ( s, d, mode ) => (<p>{prefix}[{d}]/{mode}</p>) );

export function pageSpecStateConfig<D> (): PageConfig<PageSpecState, D, SimpleMessage[], ContextForTest> {
  // @ts-ignore  There is some crazy thing going on here around SimpleMessage and SimpleMessage[].
  let pageConfig: PageConfig<PageSpecState, D, SimpleMessage[], ModalDetails> = simpleMessagesPageConfig<PageSpecState, D, ModalDetails> ( Loading );
  return pageConfig;
}

export const pageDetails: MultiPageDetails<PageSpecState, ContextForTest> = {
  firstPage: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'firstPage' ), pageFunction: DisplayPageSpecState ( 'firstPage' ) },
  clearAtStart: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'firstPage' ), pageFunction: DisplayPageSpecState ( 'firstPage' ), clearAtStart: true },
  init: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'firstPage' ), pageFunction: DisplayPageSpecState ( 'firstPage' ), initialValue: "Initial Value" },
  secondPage: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'secondPage' ).focusQuery ( 'fromApi' ), pageFunction: DisplayPageSpecState ( 'secondPage' ), clearAtStart: true },
  modalData: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'tempData' ), pageFunction: DisplayPageSpecState ( 'modalData' ), initialValue: "someValue" },
  error: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'tempData' ), pageFunction: DisplayPageSpecState ( 'error' ), clearAtStart: true, initialValue: "someValue" },
}
export type PageDetails = typeof pageDetails

export const context: ContextForTest = defaultPageSelectionContext(pageDetails)
