import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { makeOptionals } from "../codegen/makeOptionals";
import { paramsForTest } from "./makeJavaResolvers.spec";

describe ( 'makeOptionals', () => {
  it ( "should take the data out of the pageD and make a composite of the optionals from all the pages", () => {
    expect ( makeOptionals ( paramsForTest, [ OccupationAndIncomeSummaryPD ] ) ).toEqual ( [
      "import {FState, identityL } from './common';",
      "import { Lenses, NameAndLens, Optional } from '@focuson/lens'",
      "",
      "const optionals: NameAndLens<FState> = {",
      "  currentOccupation: identityL.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' ),",
      "  selected: identityL.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' )",
      "}"
    ] )
  } )
} )