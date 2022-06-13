//** This clears up the state if it is the first time something is called */
import { PageSelection, PageSelectionContext } from "./pageSelection";
import { Lenses, Optional } from "@focuson/lens";
import { safeArray } from "@focuson/utils";
import { findMainPageDetails, lensForPageDetails } from "./selectedPage";
import { MultiPageDetails } from "./pageConfig";

/** if 'first time' is true for a page, this returns a new state mutated with the firstTime false, and the initial state for the domain adjusted if requested by the config.ts
 * This is intended to be use used a 'preMutate' in a 'setJson' structure.
 * It should normally be called before fetchers are checked
 */
export const preMutateForPages = <S, Context extends PageSelectionContext<S>> ( c: Context ) => ( state: S ): S =>
  safeArray ( c.pageSelectionL.getOption ( state ) ).reduce <S> ( ( acc, pageSelection, i ) => premutateOnePage ( c, acc, i ), state )


function premutateOnePage<S, Context extends PageSelectionContext<S>> ( c: Context, s: S, i: number ): S {
  const pageSelections = c.pageSelectionL.getOption ( s )
  if ( !pageSelections || pageSelections.length === 0 ) throw Error ( `software error: calling premutateOnePage and there is no pageSelection. ${pageSelections}` )
  const pageSelection = pageSelections [ i ]
  if ( !pageSelection ) throw Error ( `software error: Somehow failing to get a page Selection ${i} ${JSON.stringify ( s )}` )
  const { firstTime, pageName, focusOn } = pageSelection
  if ( firstTime ) {
    const pageDetails: MultiPageDetails<S, any> = c.pages;
    const details = pageDetails[ pageName ]
    if ( !details ) throw new Error ( `Could not find details for ${pageName}. LegalValues are ${Object.keys ( pageDetails ).join ( "," )}` )
    const lens = c.pageSelectionL.chain ( Lenses.nth ( i ) )
    let mainPageD = findMainPageDetails ( pageSelections, pageDetails );
    const dataLens: Optional<S, any> = lensForPageDetails ( mainPageD, details, focusOn )
    let firstTimeLens = lens.focusOn ( 'firstTime' );
    if ( details.clearAtStart && details.initialValue ) throw new Error ( `page ${pageName} has both clear at start and initialValue set` )
    if ( details.clearAtStart )
      return firstTimeLens.combine ( dataLens ).set ( s, [ false, undefined ] );
    if ( details.initialValue )
      return firstTimeLens.combine ( dataLens ).set ( s, [ false, details.initialValue ] );
    return firstTimeLens.set ( s, false );
  }
  return s;
}