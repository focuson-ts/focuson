import { LensProps } from "@focuson/state";
import { identityOptics } from "@focuson/lens";
import { HasPageSelection } from "@focuson/pages/dist/src/pageSelection";
import { HasSimpleMessages } from "@focuson/pages/dist/src/simpleMessages";
import { HasSelectedModalPage, ModalPagesDetails, MultiPageDetails, SelectedPageDebug, simpleMessagesPageConfig } from "@focuson/pages";
import { Loading } from "@focuson/pages/dist/src/loading";


export interface PageSpecState extends HasPageSelection<ModalDetails>, HasSimpleMessages, HasSelectedModalPage ,SelectedPageDebug{
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


export function pageSpecStateconfig<D> () {
  return simpleMessagesPageConfig<PageSpecState, D, ModalDetails> ( modalDetails, Loading );
}

export const pageDetails: MultiPageDetails<PageSpecState, ModalDetails> = {
  nothing: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState },
  clearAtStart: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, clearAtStart: true },
  initialValue: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, initialValue: "someValue" },
  error: { config: pageSpecStateconfig (), lens: identityOptics<PageSpecState> ().focusQuery ( 'someData' ), pageFunction: DisplayPageSpecState, clearAtStart: true, initialValue: "someValue" }
}
export type PageDetails = typeof pageDetails