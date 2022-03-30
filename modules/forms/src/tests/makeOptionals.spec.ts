import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { makeOptionals } from "../codegen/makeOptionals";
import { paramsForTest } from "./makeJavaResolvers.spec";

describe ( 'makeOptionals', () => {
  it ( "should take the data out of the pageD and make valid typescript", () => {
    expect ( makeOptionals ( paramsForTest, OccupationAndIncomeSummaryPD ) ).toEqual ( [
      "import { Lenses } from @focuson/lens",
      "const currentOccupation: Optional<FState, OccupationDetails> = Lenses.identity<FState>...copy;",
      "const selected: Optional<FState, number> = Lenses.identity<FState>...copy;"
    ] )

  } )
} )