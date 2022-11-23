//** This clears up the state if it is the first time something is called */
import { PageSelection, PageSelectionContext } from "./pageSelection";
import { Lenses, massTransform, Optional, Transform } from "@focuson/lens";
import { safeArray, toArray } from "@focuson/utils";
import { findMainPageDetails, lensForPageDetails } from "./selectedPage";
import { MultiPageDetails } from "./pageConfig";
import { ModalProcessorsConfig, newPageCommandProcessors, processChangeCommandProcessor } from "@focuson/rest";

export var firstTimeHappened: boolean = false
export function resetFirstTimeHappened(){
  firstTimeHappened = false
}

/** if 'first time' is true for a page, this returns a new state mutated with the firstTime false, and the initial state for the domain adjusted if requested by the config.ts
 * This is intended to be use used a 'preMutate' in a 'setJson' structure.
 * It should normally be called before fetchers are checked
 */
export const preMutateForPages = <S, Context extends PageSelectionContext<S>> ( c: Context, config: ModalProcessorsConfig<S, any, PageSelection> ) => ( state: S ): S =>
  safeArray ( c.pageSelectionL.getOption ( state ) ).reduce <S> ( ( acc, pageSelection, i ) => premutateOnePage ( c, config, acc, i ), state )


function premutateOnePage<S, Context extends PageSelectionContext<S>> ( c: Context, config: ModalProcessorsConfig<S, any, PageSelection>, s: S, i: number ): S {
  const pageSelections = c.pageSelectionL.getOption ( s )
  if ( !pageSelections || pageSelections.length === 0 ) throw Error ( `software error: calling premutateOnePage and there is no pageSelection. ${pageSelections}` )
  const pageSelection = pageSelections [ i ]
  if ( !pageSelection ) throw Error ( `software error: Somehow failing to get a page Selection ${i} ${JSON.stringify ( s )}` )
  const { firstTime, pageName, focusOn } = pageSelection
  if ( firstTime ) {
    console.log('scrolling')
    document.getElementById('root').scrollIntoView()
    firstTimeHappened = true
    const pageDetails: MultiPageDetails<S, any> = c.pages;
    const details = pageDetails[ pageName ]
    if ( !details ) throw new Error ( `Could not find details for ${pageName}. LegalValues are ${Object.keys ( pageDetails ).join ( "," )}\nIs this a modal page that you need to add to the main page\n` )
    const lens = c.pageSelectionL.chain ( Lenses.nth ( i ) )
    let mainPageD = findMainPageDetails ( pageSelections, pageDetails );
    // const commands = toArray ( details.onOpen )
    const dataLens: Optional<S, any> = lensForPageDetails ( mainPageD, details, focusOn )
    let firstTimeLens = lens.focusOn ( 'firstTime' );
    if ( details.clearAtStart && details.initialValue ) throw new Error ( `page ${pageName} has both clear at start and initialValue set` )
    if ( details.clearAtStart )
      return firstTimeLens.combine ( dataLens ).set ( s, [ false, undefined ] );
    if ( details.initialValue ) {
      const txs = processChangeCommandProcessor<S> ( ``, newPageCommandProcessors ( config ) ( s ), details.initialValue )
      const resetFirstTimeTx: Transform<S, any> = [ firstTimeLens, () => false ]
      return massTransform<S> ( s, resetFirstTimeTx, ...txs );
    }
    return firstTimeLens.set ( s, false );
  }
  return s;
}