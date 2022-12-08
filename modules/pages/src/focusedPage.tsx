import { LensProps, LensState } from "@focuson/state";
import { PageMode } from "@focuson/utils";

export interface FocusedProps<S, D, Context> extends LensProps<S, D, Context> {
  mode: PageMode
}


export interface TitleDetails {
  title: string;
  className?: string
}
export interface HasTitle {
  title?: string | TitleDetails
}
export function mapTitleDetails ( hasTitle: HasTitle, defaultTitle: string, fn: ( rawTitle: string ) => string ): TitleDetails {
  const title = hasTitle.title
  if ( title === undefined ) return { title: defaultTitle }
  if ( typeof title === 'string' ) return { title: fn ( title ) }
  return { title: fn ( title.title ), className: title.className }
}


export interface FocusedPage<S extends any, D extends any, Context> {
  /** This is used for debugging, for putting a header in place, and anything else it's felt a title might be good for */
  title: ( s: LensState<S, D, Context> ) => TitleDetails,
  haveTopRightCrossToCancel: boolean,
  displayLoading: ( s: LensState<S, D, Context> ) => boolean,
  /** this will only be called if display loading is not showing */
  display: ( s: LensState<S, D, Context>, mode: PageMode, index: number ) => JSX.Element
}


/** Returns the `FocusedPage` data structure configured for a Focused Page where typically the data comes from a single API call or similar.
 * The pageFn will be executed if the data exists, and if not some 'loading page' will be displayed
 * @param title
 */
export const focusedPage = <S extends any, D extends any, Context> ( title: ( s: LensState<S, D, Context> ) => TitleDetails, haveTopRightCrossToCancel: boolean ) =>
  ( pageFn: ( state: LensState<S, D, Context>, d: D, mode: PageMode, index: number ) => JSX.Element ): FocusedPage<S, D, Context> => ({
    title: s => title ( s ),
    haveTopRightCrossToCancel: haveTopRightCrossToCancel ? undefined : false,
    displayLoading: s => !s.optJson (),
    display: ( s, mode, index: number ) => pageFn ( s, s.json (), mode, index )
  })

/** The legacy way of creating a focused Page. It is deprecated and should be replaced with focusedPage
 * The big difference for users is that to display a focusedPage (in stories or tests) you need to wrap a focusedPage in a displayFocused
 * The big differencein 'value to the users', is that the focusedPage allows access to the title for such things as setting the title of the browser,
 * debugging or reporting
 */
export const loadingPage = <S extends any, D extends any, Context> ( title: ( s: LensState<S, D, Context> ) => TitleDetails, haveTopRightCrossToCancel: boolean ) =>
  ( pageFn: ( state: LensState<S, D, Context>, d: D ) => JSX.Element ): ( s: LensState<S, D, Context>, pageMode: PageMode, index: number ) => JSX.Element =>
    ( s, pageMode, index ) => focusedPage<S, D, Context> ( title, haveTopRightCrossToCancel ) ( pageFn ).display ( s, pageMode, index )

/** Returns the `FocusedPage` data structure configured for a Focused Page where typically SOME of the data comes from an api, and other is 'local state'
 *
 * A good example would be a search page where the `full  domain would include a search query AND the data from the api. In this example D would be the data from the search
 *
 * The loading page will be shown if the 'D' is undefined. So in the search example it would be sensible to start with the searchQuery being the empty string and the data from the api being an empty search result
 *
 * pageFn will only be called if the `D` is defined.
 */

export const focusedPageWithExtraState = <S extends any, Full extends any, D extends any, Context> ( title: ( d: LensState<S, Full, Context> ) => TitleDetails, haveTopRightCrossToCancel: boolean ) =>
  ( lensFn: ( state: LensState<S, Full, Context> ) => LensState<S, D, Context>, displayLoading?: ( s: LensState<S, Full, Context> ) => boolean ) =>
    ( pageFn: ( fullState: LensState<S, Full, Context>, state: LensState<S, D, Context>, f: Full, d: D, mode: PageMode, index: number ) => JSX.Element ): FocusedPage<S, Full, Context> => {
      const realDisplayLoading = displayLoading ? displayLoading : ( s: LensState<S, Full, Context> ) => lensFn ( s ).optJson () === undefined
      return ({
        title: s => title ( s ),
        haveTopRightCrossToCancel,
        displayLoading: realDisplayLoading,
        display: ( s, pageMode, index: number ) => {
          let lensState: LensState<S, D, Context> = lensFn ( s );
          let domain = lensState?.json ();
          if ( domain === undefined ) throw Error ( 'something went wrong: The domain is undefined in focusedPageWithExtraState' )
          const result = pageFn ( s, lensState, s.json (), domain, pageMode, index )
          return result
        }
      })
    }

export const loadingPageWithExtraState = <S extends any, Full extends any, D extends any, Context> ( titleFn: ( state: LensState<S, Full, Context> ) => TitleDetails, haveTopRightCrossToCancel: false ) =>
  ( lensFn: ( lens: LensState<S, Full, Context> ) => LensState<S, D, Context> ) => ( pageFn: ( fullState: LensState<S, Full, Context>, state: LensState<S, D, Context>, f: Full, d: D, pageMode: PageMode ) => JSX.Element ): ( s: LensState<S, Full, Context>, pageMode: PageMode, index: number ) => JSX.Element =>
    ( s, pageMode, index ) =>
      focusedPageWithExtraState<S, Full, D, Context> ( titleFn, haveTopRightCrossToCancel ) ( lensFn ) ( pageFn ).display ( s, pageMode, index )


