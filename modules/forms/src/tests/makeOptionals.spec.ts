import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { makeOptionals } from "../codegen/makeOptionals";
import { paramsForTest } from "./makeJavaResolvers.spec";
import { ETransferPageD } from "../example/eTransfers/eTransfers.pageD";

describe ( 'makeOptionals', () => {
  it ( "should take the data out of the pageD and make valid typescript", () => {
    expect ( makeOptionals ( paramsForTest, OccupationAndIncomeSummaryPD ) ).toEqual ( [
      "import {FState, identityL } from '../common';",
      "import { Lenses, Optional } from '@focuson/lens'",
      "",
      "const currentOccupation: Optional<FState, number> = identityL.focusOn('something');",
      "const selected: Optional<FState, number> = Lenses.identity<FState>...copy;"
    ] )
  } )

  it ( "should return empy if there are no optionals", () => {
    expect ( makeOptionals ( paramsForTest, ETransferPageD ) ).toEqual ( [] )

  } )
} )