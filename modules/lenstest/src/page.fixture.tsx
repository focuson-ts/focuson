import { LensProps } from "@focuson/state";
import { identityOptics } from "@focuson/lens";
import { HasPageSelection, HasSelectedModalPage, HasSimpleMessages, Loading, ModalPagesDetails, MultiPageDetails, PageConfig, SelectedPageDebug, SimpleMessage, simpleMessagesPageConfig } from "@focuson/pages";


export interface PageSpecState extends HasPageSelection, HasSimpleMessages, HasSelectedModalPage, SelectedPageDebug {
  someData?: string,
  modalData?: string
}

export function DisplayPageSpecState ( { state }: LensProps<PageSpecState, string> ) {
  return <p>Main {state.optJson ()}</p>
}

export function ModalPageSpecState ( { state }: LensProps<PageSpecState, string> ) {
  return <p>Modal {state.optJson ()}</p>

}
export const modalDetails: ModalPagesDetails<PageSpecState> = {
  'someModalPage': { lens: identityOptics<PageSpecState> ().focusQuery ( 'modalData' ), displayModalFn: ModalPageSpecState }
}
export type ModalDetails = typeof modalDetails


export function pageSpecStateconfig<D> (): PageConfig<PageSpecState, D, SimpleMessage[], ModalDetails> {
  // @ts-ignore  There is some crazy thing going on here around SimpleMessage and SimpleMessage[].
  let pageConfig: PageConfig<PageSpecState, D, SimpleMessage[], ModalDetails> = simpleMessagesPageConfig<PageSpecState, D, ModalDetails> ( modalDetails, Loading );
  return pageConfig;
}

export const pageDetails: MultiPageDetails<PageSpecState, ModalDetails> = {
  nothing: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState },
  clearAtStart: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, clearAtStart: true },
  initialValue: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, initialValue: "someValue" },
  error: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, clearAtStart: true, initialValue: "someValue" }
}
export type PageDetails = typeof pageDetails