import { makeJavaVariablesForGraphQlQuery, makeQuery } from "../codegen/makeGraphQlQuery";
import { eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";


describe ( "Making GraphQl from RestD", () => {
  it ( "should be possible to make a query ", () => {
    expect ( makeQuery ( eAccountsSummaryRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'{getEAccountsSummaryDD(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
      "      '    useEStatements'+",
      "      '    eAccountsTable{'+",
      "      '      accountId'+",
      "      '      displayType'+",
      "      '      description'+",
      "      '      virtualBankSeq'+",
      "      '      total'+",
      "      '      frequency'+",
      "      '    }'+",
      "      '    totalMonthlyCost'+",
      "      '    oneAccountBalance'+",
      "      '    currentAccountBalance'+",
      "      '    createPlan{'+",
      "      '      createPlanStart'+",
      "      '      createPlanDate'+",
      "      '      createPlanEnd'+",
      "      '    }'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )


  it ( "makeAllQueryForRest - should make java variables", () => {
    expect ( makeJavaVariablesForGraphQlQuery ( [ eAccountsSummaryRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String getEAccountsSummaryDD(String accountId,String customerId){ ",
      "   return",

      "'{getEAccountsSummaryDD(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
      "      '    useEStatements'+",
      "      '    eAccountsTable{'+",
      "      '      accountId'+",
      "      '      displayType'+",
      "      '      description'+",
      "      '      virtualBankSeq'+",
      "      '      total'+",
      "      '      frequency'+",
      "      '    }'+",
      "      '    totalMonthlyCost'+",
      "      '    oneAccountBalance'+",
      "      '    currentAccountBalance'+",
      "      '    createPlan{'+",
      "      '      createPlanStart'+",
      "      '      createPlanDate'+",
      "      '      createPlanEnd'+",
      "      '    }'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )
} )
