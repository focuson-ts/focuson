import { makeJavaVariablesForGraphQlQuery, makeQuery } from "../codegen/makeGraphQlQuery";
import { eAccountsSummaryRestD } from "../example/eAccountsSummary.restD";


describe ( "Making GraphQl from RestD", () => {
  it ( "should be possible to make a query ", () => {
    expect ( makeQuery ( eAccountsSummaryRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "{getEAccountsSummaryDD(accountId: '{0}',customerId: '{1}'){",
      "     eAccountsTable{",
      "       accountId",
      "       displayType",
      "       description",
      "       virtualBankSeq",
      "       total",
      "       frequency",
      "     }",
      "     totalMonthlyCost",
      "     oneAccountBalance",
      "     currentAccountBalance",
      "     createPlan{",
      "       createPlanStart",
      "       createPlanDate",
      "       createPlanEnd",
      "     }",
      "   }",
      "}" ] )
  } )


  it ( "makeAllQueryForRest - should make java variables", () => {
    expect ( makeJavaVariablesForGraphQlQuery ( [ eAccountsSummaryRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String getEAccountsSummaryDD = ",
      "     '{getEAccountsSummaryDD(accountId: \\'{0}\\',customerId: \\'{1}\\'){'+",
      "     '     eAccountsTable{'+",
      "     '       accountId'+",
      "     '       displayType'+",
      "     '       description'+",
      "     '       virtualBankSeq'+",
      "     '       total'+",
      "     '       frequency'+",
      "     '     }'+",
      "     '     totalMonthlyCost'+",
      "     '     oneAccountBalance'+",
      "     '     currentAccountBalance'+",
      "     '     createPlan{'+",
      "     '       createPlanStart'+",
      "     '       createPlanDate'+",
      "     '       createPlanEnd'+",
      "     '     }'+",
      "     '   }'+",
      "     '}'",
      ";"
    ] )
  } )
} )
