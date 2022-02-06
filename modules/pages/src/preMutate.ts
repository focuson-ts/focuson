//** This clears up the state if it is the first time something is called */
import { PageSelection } from "./pageSelection";
import { Lens } from "@focuson/lens";
import { ModalPagesDetails } from "./modal/modalPages";
import { MultiPageDetails } from "./pageConfig";

/** if 'first time' is true for a page, this returns a new state mutated with the firstTime false, and the initial state for the domain adjusted if requested by the config.ts
 * This is intended to be use used a 'preMutate' in a 'setJson' structure.
 * It should normally be called before fetchers are checked
 */
export const preMutateForPages = <S, PageDetails extends MultiPageDetails<S, MD>, MD extends ModalPagesDetails<S>> ( pageDetails: PageDetails, pageSelectionlens: Lens<S, PageSelection> ) => ( state: S ): S => {
  const { firstTime, pageName } = pageSelectionlens.get ( state )
  const details = pageDetails[ pageName ]
  if ( !details ) throw new Error ( `Could not find details for ${pageName}. LegalValues are ${Object.keys ( pageDetails ).join ( "," )}` )
  if ( firstTime ) {
    let firstTimeLens = pageSelectionlens.focusOn ( 'firstTime' );
    if (details.clearAtStart && details.initialValue) throw new Error( `page ${pageName} has both clear at start and initialValue set`)
    if ( details.clearAtStart )
      return firstTimeLens.combine ( details.lens ).set ( state, [ false, undefined ] );
    if ( details.initialValue )
      return firstTimeLens.combine ( details.lens ).set ( state, [ false, details.initialValue ] );
    return firstTimeLens.set ( state, false );
  } else return state;
};