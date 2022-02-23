import { LensProps, lensState } from "@focuson/state";
import { identityOptics } from "@focuson/lens";
import { focusedPage, FocusedProps, HasPageSelection, HasSelectedPageDebug, HasSimpleMessages, Loading, MultiPageDetails, PageConfig, PageMode, PageSelectionContext, pageSelectionlens, SelectedPageDebug, SimpleMessage, simpleMessagesPageConfig } from "@focuson/pages";


export interface PageSpecState extends HasPageSelection, HasSimpleMessages {
  someData?: string,
  modalData?: string
}

export const emptyState: PageSpecState = {
  pageSelection: [], messages: []
}
export const rootState: PageSpecState = { ...emptyState, messages: [], pageSelection: [], someData: 'x', modalData: 'y' };
export function stateWith ( ...nameAndModes: [ string, PageMode ][] ): PageSpecState {
  return { ...rootState, pageSelection: nameAndModes.map ( ( [ pageName, pageMode ] ) => ({ pageName, pageMode }) ) }
}
export function lensStateWith ( setMain: ( s: PageSpecState ) => void, ...nameAndModes: [ string, PageMode ][] ) {
  return lensState<PageSpecState, ContextForTest> ( stateWith ( ...nameAndModes ), setMain, 'displayMain / focusedPage', context )
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
  firstPage: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState ( 'firstPage' ) },
  secondPage: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState ( 'secondPage' ), clearAtStart: true },
  modalData: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState ( 'modalData' ), initialValue: "someValue" },
  error: { config: pageSpecStateConfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState ( 'error' ), clearAtStart: true, initialValue: "someValue" },
}
export type PageDetails = typeof pageDetails

export const context: ContextForTest = {
  pages: pageDetails,
  combine: pages => <div id='combine'>{pages.map ( ( p, i ) => <div key={i}>{p}</div> )}</div>,
  pageSelectionL: pageSelectionlens ()
}
