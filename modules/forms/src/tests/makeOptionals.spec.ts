import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { makeOptionals } from "../codegen/makeOptionals";
import { paramsForTest } from "./makeJavaResolvers.spec";

describe ( 'makeOptionals', () => {
  it ( "should take the data out of the pageD and make a composite of the optionals from all the pages", () => {
    expect ( makeOptionals ( paramsForTest, [ OccupationAndIncomeSummaryPD ] ) ).toEqual ( [
      "import {FState, identityL } from './common';",
      "import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'",
      "",
      "export const namedOptionals: NameAndLensFn<FState> = {",
      "  currentOccupation: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' ),",
      "  selected: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' )",
      "}"
    ])
  } )
} )