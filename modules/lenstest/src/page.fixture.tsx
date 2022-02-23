import { LensProps } from "@focuson/state";
import { identityOptics } from "@focuson/lens";
import { FocusedProps, HasPageSelection, HasSelectedModalPage, HasSimpleMessages, Loading, ModalPagesDetails, MultiPageDetails, PageConfig, SelectedPageDebug, SimpleMessage, simpleMessagesPageConfig } from "@focuson/pages";


export interface PageSpecState extends HasPageSelection, HasSimpleMessages, HasSelectedModalPage, SelectedPageDebug {
  someData?: string,
  modalData?: string
}
export type Context = 'context'
export const context = 'context'

export function DisplayPageSpecState ( { state }: LensProps<PageSpecState, string,Context> ) {
  return <p>Main {state.optJson ()}</p>
}

export function ModalPageSpecState ( { state }: FocusedProps<PageSpecState, string,Context> ) {
  return <p>Modal {state.optJson ()}</p>

}
export const modalDetails: ModalPagesDetails<PageSpecState,Context> = {
  'someModalPage': { lens: identityOptics<PageSpecState> ().focusQuery ( 'modalData' ), displayModalFn: ModalPageSpecState, mode: 'view' }
}
export type ModalDetails = typeof modalDetails


export function pageSpecStateconfig<D> (): PageConfig<PageSpecState, D, SimpleMessage[], ModalDetails,Context> {
  // @ts-ignore  There is some crazy thing going on here around SimpleMessage and SimpleMessage[].
  let pageConfig: PageConfig<PageSpecState, D, SimpleMessage[], ModalDetails> = simpleMessagesPageConfig<PageSpecState, D, ModalDetails> ( modalDetails, Loading );
  return pageConfig;
}

export const pageDetails: MultiPageDetails<PageSpecState, ModalDetails,Context> = {
  nothing: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState },
  clearAtStart: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, clearAtStart: true },
  initialValue: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, initialValue: "someValue" },
  error: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, clearAtStart: true, initialValue: "someValue" }
}
export type PageDetails = typeof pageDetails