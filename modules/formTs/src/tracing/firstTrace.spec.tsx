import { mountTheState } from "./traceTests";
import { context, emptyState, FState } from "../common";
import { enzymeSetup } from "./enzymeAdapterSetup";
import { sampleOccupationAndIncomeDetailsDD0 } from "../samples";

enzymeSetup ()
describe ( "Should be able to trace test", () => {
  it ( "should click on 'addEntry", () => {
    //Things we need to do
    // initial page state... using page details obviously
    //fetchers etc
    //But this will work!

    var remembered: any = {}
    let startState: FState = { ...emptyState, OccupationAndIncomeSummary: { selectedItem: 0, fromApi: sampleOccupationAndIncomeDetailsDD0 } };
    const render0 = mountTheState ( context, startState, ( s, reason ) => remembered = s )
    // expect(render0.debug()).toEqual({})
    const buttons = render0.find ( "#addEntry" )
    const button = buttons.at ( 1 ) //this is because Mount remembers the outer as well as the inner
    // expect(buttons.at(1).debug()).toEqual('')
    button.simulate ( 'click' )
    expect ( remembered ).toEqual ( '' ) //WOO HOO Actually worked!!!

  } )

} )