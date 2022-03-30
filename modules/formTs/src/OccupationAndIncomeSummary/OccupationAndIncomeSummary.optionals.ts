import { Optional } from "@focuson/lens";
import { Lenses } from "@focuson/lens"
import { FState } from "../common";

function fkjgkdfjg()
export const currentOccupation: Optional<FState, any> = Lenses.identity<FState>().focusQuery('OccupationAndIncomeSummary')
  .focusQuery('fromApi').focusQuery('customerOccupationIncomeDetails');


// const selected: Optional<FState, number> = Lenses.identity<FState>...copy;