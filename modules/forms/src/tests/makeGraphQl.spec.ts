import { makeJavaVariablesForGraphQlQuery, makeQueryForRest } from "../codegen/makeGraphQlQuery";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";


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


  it ( "makeAllQueryForRest - should make java variables", () => {
    expect ( makeJavaVariablesForGraphQlQuery ( [ eAccountsSummaryRestD, createPlanRestD ] ).map(s=>s.replace(/"/g, "'")) ).toEqual ( [
      "public static  String EAccountsSummaryDD = ",
      "     'query{'+",
      "     '  EAccountsSummaryDD{'+",
      "     '    EAccountSummaryDD{'+",
      "     '      accountId'+",
      "     '      displayType'+",
      "     '      description'+",
      "     '      virtualBankSeq'+",
      "     '      total'+",
      "     '      frequency'+",
      "     '    }'+",
      "     '    totalMonthlyCost'+",
      "     '    oneAccountBalance'+",
      "     '    currentAccountBalance'+",
      "     '    CreatePlanDD{'+",
      "     '      createPlanStart'+",
      "     '      createPlanDate'+",
      "     '      createPlanEnd'+",
      "     '    }'+",
      "     '  }'+",
      "     '}'",
      ";",
      "public static  String CreatePlanDD = ",
      "     'query{'+",
      "     '  CreatePlanDD{'+",
      "     '    createPlanStart'+",
      "     '    createPlanDate'+",
      "     '    createPlanEnd'+",
      "     '  }'+",
      "     '}'",
      ";"
    ] )
  } )
} )
