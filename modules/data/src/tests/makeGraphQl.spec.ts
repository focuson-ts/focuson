import { makeQueryForRest } from "../codegen/makeGraphQlQuery";
import { exportAccountsSummaryRestD } from "../example/example.restD";


describe ( "Making GraphQl from RestD", () => {
  it ( "should be possible to make a query ", () => {
    expect ( makeQueryForRest ( exportAccountsSummaryRestD ) ).toEqual ( [
      "query{",
      "  EAccountsSummaryDD{",
      "    EAccountSummaryDD{",
      "      accountId",
      "      displayType",
      "      description",
      "      frequency",
      "    }",
      "    totalMonthlyCost",
      "    oneAccountBalance",
      "    currentAccountBalance",
      "    CreatePlanDD{",
      "      createPlanStart",
      "      createPlanDate",
      "      createPlanEnd",
      "    }",
      "  }",
      "}"
    ] )
  } )
} )
