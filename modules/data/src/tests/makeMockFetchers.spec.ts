import { makeMockFetchers } from "../codegen/makeMockFetchers";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";


describe ( "makeMockFetchers", () => {
  it ( "to make a java mock fetcher", () => {
    expect ( makeMockFetchers ( [ eAccountsSummaryRestD, createPlanRestD ] ) ).toEqual ( [
      "Parent undefined EAccountsSummaryDD getEAccountsSummaryDD",
      "Parent undefined CreatePlanDD getCreatePlanDD",
      "Parent undefined CreatePlanDD createCreatePlanDD",
      "Parent undefined CreatePlanDD updateCreatePlanDD",
      "Parent undefined CreatePlanDD deleteCreatePlanDD",
      "Parent undefined CreatePlanDD listCreatePlanDD",
      "Parent EAccountSummaryDD OneLineStringDD getAccountSummaryDescription",
      "Parent EAccountsSummaryDD IntegerDD getTotalMonthlyCost",
      "Parent EAccountsSummaryDD IntegerDD getOneAccountBalance",
      "Parent EAccountsSummaryDD IntegerDD getCurrentAccountBalance"
    ] )
  } )
} )