import { OccupationAndIncomeSummaryPD } from "../example/occupationAndIncome/occupationAndIncome.pageD";
import { makeVariables } from "../codegen/makeVariables";
import { paramsForTest } from "./paramsForTest";
import { ListOfPaymentsPagePD } from "../example/ListOfPayments/listOfPayements.pageD";

describe ( 'makeOptionals', () => {
  it ( "should take the data out of the pageD and make a composite of the optionals from all the pages", () => {
    expect ( makeVariables ( paramsForTest,  OccupationAndIncomeSummaryPD  ) ).toEqual ( [
      "import {FState, identityL } from '../common';",
      "import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'",
      "",
      "export const OccupationAndIncomeSummaryOptionals: NameAndLensFn<FState> = {",
      "  selected: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'selectedItem' ),",
      "  currentOccupation: id => id.focusQuery ( 'OccupationAndIncomeSummary' ).focusQuery ( 'fromApi' ).focusQuery ( 'customerOccupationIncomeDetails' )",
      "}"
    ])
  } )

  it ('should allow variables to reference variables', () =>{
    expect ( makeVariables ( paramsForTest,  ListOfPaymentsPagePD  ) ).toEqual ( [
      "import {FState, identityL } from '../common';",
      "import { Lenses, NameAndLensFn, Optional } from '@focuson/lens'",
      "",
      "export const ListOfPaymentsPageOptionals: NameAndLensFn<FState> = {",
      "  selectedItem: id => id.focusQuery('ListOfPaymentsPage').focusQuery('display').chainNthFromPath(id.focusQuery('ListOfPaymentsPage').focusQuery('selected')),",
      "  currentListOfPayments: id => ListOfPaymentsPageOptionals.selectedItem(identityL).focusQuery('listOfPayments')",
      "}"
    ])
  })
} )