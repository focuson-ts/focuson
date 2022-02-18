import { makeQueryForRest } from "../codegen/makeGraphQlQuery";
import { eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";


describe ( "Making GraphQl from RestD", () => {
  it ( "should be possible to make a query ", () => {
    expect ( makeQueryForRest ( eAccountsSummaryRestD ) ).toEqual ( [
      "query{",
      "  EAccountsSummaryDD{",
      "    EAccountSummaryDD{",
      "      accountId",
      "      displayType",
      "      description",
      "      virtualBankSeq",
      "      total",
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
