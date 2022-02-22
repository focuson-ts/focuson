import { LensProps, LensState } from "@focuson/state";
import { PageConfig } from "./pageConfig";
import { addModalPageIfNeeded, ModalPagesDetails } from "./modal/modalPages";
import { Loading } from "./loading";
import { DefaultTemplate, PageTemplateProps } from "./PageTemplate";
import { PageMode } from "./pageSelection";

export interface FocusedProps<S, D> extends LensProps<S, D> {
  mode: PageMode
}

export interface FocusedPage<S extends any, D extends any> {
  /** This is used for debugging, for putting a header in place, and anything else it's felt a title might be good for */
  title: ( s: LensState<S, D> ) => string,
  displayLoading: ( s: LensState<S, D> ) => boolean,
  /** this will only be called if display loading is not showing */
  display: ( s: LensState<S, D>, mode: PageMode ) => JSX.Element
}

/** Given a config.ts, a focused page data structure and a lens state (focused on anything...doesn't matter) this will display the main page (and perhaps a modal page on top) */
export function displayMain<S extends any, D extends any, Msgs, MD extends ModalPagesDetails<S>> (
  config: PageConfig<S, D, Msgs, MD>,
  focusedPage: FocusedPage<S, D>,
  s: LensState<S, D>, pageMode: PageMode ): JSX.Element {
  // @ts-ignore
  const debug = s.main?.debug?.selectedPageDebug  //basically if S extends SelectedPageDebug..
  let t = config.template
  const template: ( p: PageTemplateProps<S, D> ) => JSX.Element = t ? t : DefaultTemplate
  if ( debug ) console.log ( "displayMain.template 1", template )
  const loading = config.loading ? config.loading : Loading
  if ( debug ) console.log ( "displayMain.loading 2", loading )
  const main = template ( { state: s, focusedPage, loading, pageMode } )
  if ( debug ) {
    console.log ( "displayMain.main 3", main );
    // console.log ( "displayMain.main-json 4", JSON.stringify ( main ) )
  }
  let result = addModalPageIfNeeded ( config.modalPageDetails, s, main );
  if ( debug ) console.log ( "SelectedPage.displayMain - exit", result )
  return result
}


/** Returns the `FocusedPage` data structure configured for a Focused Page where typically the data comes from a single API call or similar.
 * The pageFn will be executed if the data exists, and if not some 'loading page' will be displayed
 * @param title
 */
export const focusedPage = <S extends any, D extends any> ( title: ( d?: D ) => string ) =>
  ( pageFn: ( state: LensState<S, D>, d: D, mode: PageMode ) => JSX.Element ): FocusedPage<S, D> => ({
    title: s => title ( s.optJson () ),
    displayLoading: s => !s.optJson (),
    display: ( s, mode ) => pageFn ( s, s.json (), mode )
  })

/** The legacy way of creating a focused Page. It is deprecated and should be replaced with focusedPage
 * The big difference for users is that to display a focusedPage (in stories or tests) you need to wrap a focusedPage in a displayFocused
 * The big differencein 'value to the users', is that the focusedPage allows access to the title for such things as setting the title of the browser,
 * debugging or reporting
 */
export const loadingPage = <S extends any, D extends any> ( title: ( d?: D ) => string ) =>
  ( pageFn: ( state: LensState<S, D>, d: D ) => JSX.Element ): ( s: LensState<S, D>, pageMode: PageMode ) => JSX.Element =>
    ( s, pageMode ) => focusedPage<S, D> ( title ) ( pageFn ).display ( s, pageMode )

/** Returns the `FocusedPage` data structure configured for a Focused Page where typically SOME of the data comes from an api, and other is 'local state'
 *
 * A good example would be a search page where the `full  domain would include a search query AND the data from the api. In this example D would be the data from the search
 *
 * The loading page will be shown if the 'D' is undefined. So in the search example it would be sensible to start with the searchQuery being the empty string and the data from the api being an empty search result
 *
 * pageFn will only be called if the `D` is defined.
 */

export const focusedPageWithExtraState = <S extends any, Full extends any, D extends any> ( title: ( d?: Full ) => string ) =>
  ( lensFn: ( lens: LensState<S, Full> ) => LensState<S, D>, displayLoading?: ( s: LensState<S, Full> ) => boolean ) => ( pageFn: ( fullState: LensState<S, Full>, state: LensState<S, D>, f: Full, d: D, mode: PageMode ) => JSX.Element ): FocusedPage<S, Full> => {
    const realDisplayLoading = displayLoading ? displayLoading : ( s: LensState<S, Full> ) => lensFn ( s ).optJson () === undefined
    return ({
      title: s => title ( s.optJson () ),
      displayLoading: realDisplayLoading,
      display: ( s, pageMode ) => {
        console.log ( "focusedPageWithExtraState - enter", s )
        let lensState: LensState<S, D> = lensFn ( s );
        let domain = lensState?.json ();
        if ( domain === undefined ) throw Error ( 'something went wrong: The domain is undefined in focusedPageWithExtraState' )
        const result = pageFn ( s, lensState, s.json (), domain, pageMode )
        console.log ( "focusedPageWithExtraState -exit", result )
        return result
      }
    })
  }

export const loadingPageWithExtraState = <S extends any, Full extends any, D extends any> ( title: ( d?: Full ) => string ) =>
  ( lensFn: ( lens: LensState<S, Full> ) => LensState<S, D> ) => ( pageFn: ( fullState: LensState<S, Full>, state: LensState<S, D>, f: Full, d: D, pageMode: PageMode ) => JSX.Element ): ( s: LensState<S, Full>, pageMode: PageMode ) => JSX.Element =>
    ( s, pageMode ) => focusedPageWithExtraState<S, Full, D> ( title ) ( lensFn ) ( pageFn ).display ( s, pageMode )


