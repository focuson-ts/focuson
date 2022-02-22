import { identityOptics, Optional } from '@focuson/lens';
import { LensProps, LensState } from '@focuson/state';
import { Loading } from "../loading";
import { PageMode } from "../pageSelection";


export interface HasSelectedModalPage {
  currentSelectedModalPage?: string | undefined
}
/** Helper method. If the state has a field `currentSelectedModalPage` then this can be the lens to it */
export function selectionModalPageL<S extends HasSelectedModalPage> (): Optional<S, string | undefined> {
  return identityOptics<S> ().focusQuery ( 'currentSelectedModalPage' )
}

/** The configuration of the modal pages:
 * @lens a lens to the name of the modal page. This is probably (but not mandatory) the `currentSelectedModalPage`
 * @currentSelectedModalPage an object. The names of the fields are the names of the allowed modal pages, the values of which explain how to display the page
 * @modelPageFn How to superimpose the modal page over the main page
 */
export interface AllModalPageDetails<S, MD extends ModalPagesDetails<S>> {
  lens: Optional<S, string | undefined>,
  modalPageDetails: MD,
  modelPageFn: ( props: DisplayMainAndModalPageProps<S> ) => JSX.Element,
}

/**  The names of the fields are the names of the allowed modal pages, the values of which explain how to display the page */
export interface ModalPagesDetails<S> {
  [ name: string ]: OneModalPageDetails<S, any>
}

/** How to display a modal page. The lens focuses on the data needed to display the page, the displayModelFn is 'how to display the modal page' */
export interface OneModalPageDetails<S, ModalPageState> {
  lens: Optional<S, ModalPageState>,
  displayModalFn: ( props: { state: LensState<S, ModalPageState>, mode: PageMode } ) => JSX.Element,
  mode: PageMode
}
interface DisplayMainAndModalPageProps<S> extends LensProps<S, any> {
  main: JSX.Element,
  modal: JSX.Element
}
export function DisplayMainAndModelPage<S> ( { state, main, modal }: DisplayMainAndModalPageProps<S> ) {
  return <div>{main}
    <hr/>
    {modal}</div>
}

/** Helper method for AllModalPageDetails: provides defaults value for the lens and how to superimpose data */
export function allModelPageDetails<S extends HasSelectedModalPage, ModalDetails extends ModalPagesDetails<S>> ( modalPageDetails: ModalDetails ): AllModalPageDetails<S, ModalDetails> {
  return ({
    modalPageDetails,
    lens: selectionModalPageL<S> (),
    modelPageFn: DisplayMainAndModelPage
  })
}

/** Given a config.ts, a state and a main page, this will work out if a modal page is needed, and if so add it
 * It returns either the main page, or the main page with modal on top of it*/
export function addModalPageIfNeeded<S, MD extends ModalPagesDetails<S>> ( allModalPageDetails: AllModalPageDetails<S, MD> | undefined, state: LensState<S, any>, main: JSX.Element ) {
  // @ts-ignore
  const debug = state.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  if ( debug ) console.log ( 'addModalPageIfNeeded' )
  if ( allModalPageDetails ) {
    const { modalPageDetails, modelPageFn, lens } = allModalPageDetails
    const selectedModalPage = lens.getOption ( state.main )
    if ( selectedModalPage ) {
      const oneModalPageDetails = modalPageDetails?.[ selectedModalPage ]
      if ( debug ) console.log ( 'addModalPageIfNeeded -oneModalPageDetails', oneModalPageDetails )
      if ( oneModalPageDetails ) {
        const modalState: LensState<S, any> = state.copyWithLens ( oneModalPageDetails.lens )
        if ( debug ) console.log ( 'addModalPageIfNeeded -modalState', modalState )
        const empty = modalState.optJson ()
        if ( debug ) console.log ( 'addModalPageIfNeeded -empty', empty )
        const modal: JSX.Element = empty ? oneModalPageDetails.displayModalFn ( { state: modalState, mode: oneModalPageDetails.mode } ) : <Loading/>
        if ( debug ) console.log ( 'addModalPageIfNeeded -modal', modal )
        let result = modelPageFn ( { state, main, modal } );
        if ( debug ) console.log ( 'addModalPageIfNeeded -result', result )
        return result
      } else throw new Error ( `Illegal modal page ${selectedModalPage}. Legal values are ${Object.keys ( modalPageDetails ).sort ().join ( "," )}` )
    }
  }
  return main
}



