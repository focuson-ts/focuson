import { EAccountsSummaryDD, EAccountSummaryDD } from "../example/example.dataD";
import { makeGraphQlForDD, makeGraphQlForView } from "../makeGraphQl";
import { AccountIdDD } from "../common/dataD";
import { EAccountsSummaryFetchD, OneEAccountSummaryFetchD } from "../example/example.fetchD";


export const x = 1

describe ( "Making GraphQl from DataD", () => {
  it ( "should be possible to query for a simple PrimitiveDD)", () => {
    expect ( makeGraphQlForDD ( "someRoot", AccountIdDD ) ).toEqual ( [
      "someRoot"
    ] )
  } )

  it ( "should be possible to query for a simple item (eAccountSummary)", () => {
    expect ( makeGraphQlForDD ( 'eAccountSummary', EAccountSummaryDD ) ).toEqual (
      [
        "eAccountSummary{",
        "  accountId",
        "  displayType",
        "  description",
        "  frequency",
        "}"
      ] )
  } )

  it ( "should be possible to query for a more complex item (EAccountsSummaryDD)", () => {
    expect ( makeGraphQlForDD ( 'eAccountSummary', EAccountsSummaryDD ) ).toEqual ( [
      "eAccountSummary{",
      "    eAccountsTable{",
      "      accountId",
      "      displayType",
      "      description",
      "      frequency",
      "    }",
      "  totalMonthlyCost",
      "  oneAccountBalance",
      "  currentAccountBalance",
      "  createPlan{",
      "    createPlanStart",
      "    createPlanDate",
      "    createPlanEnd",
      "  }",
      "}"
    ] )
  } )
} )

describe ( "makGraphQlForView", () => {
  it ( "make a view with params", () => {
    expect ( makeGraphQlForView ( 'eAccountSummary', OneEAccountSummaryFetchD, { customerId: "123" } ) ).toEqual ( [
      'eAccountSummary(customerId: "123"){',
      "  accountId",
      "  displayType",
      "  description",
      "  frequency",
      "}"
    ] )
  } )

  it ( "mkae a view without params", () => {
    expect ( makeGraphQlForView ( 'eAccountsSummary', EAccountsSummaryFetchD, {} ) ).toEqual ( [
      "eAccountsSummary{",
      "    eAccountsTable{",
      "      accountId",
      "      displayType",
      "      description",
      "      frequency",
      "    }",
      "  totalMonthlyCost",
      "  oneAccountBalance",
      "  currentAccountBalance",
      "  createPlan{",
      "    createPlanStart",
      "    createPlanDate",
      "    createPlanEnd",
      "  }",
      "}"
    ])
  } )
} )