import { EAccountsSummaryDD } from "../example/example.dataD";
import { createGraphQlType, makeGraphQlTypeFolder } from "../codegen/makeGraphQlTypes";

describe ( "makeGraphQlTypeFolder", () => {
  it ( "should make a type file", () => {
    expect ( createGraphQlType ( EAccountsSummaryDD ) ).toEqual ( [
      "type EAccountsSummaryDD{",
      "  eAccountsTable: [EAccountSummaryDD!]!",
      "  totalMonthlyCost: String",
      "  oneAccountBalance: String",
      "  currentAccountBalance: String",
      "  createPlan: CreatePlanDD!",
      "}",
      "",
      "type EAccountSummaryDD{",
      "  accountId: String",
      "  displayType: String",
      "  description: String",
      "  frequency: String",
      "}",
      "",
      "type CreatePlanDD{",
      "  createPlanStart: String",
      "  createPlanDate: String",
      "  createPlanEnd: String",
      "}",
      ""
    ] )
  } )
} )