import { makeJavaVariablesForGraphQlQuery, makeQuery } from "../codegen/makeGraphQlQuery";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";


describe ( "Making GraphQl from RestD", () => {
  it ( "should be possible to make a query ", () => {
    expect ( makeQuery ( eAccountsSummaryRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'query{getEAccountsSummaryDD(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
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
    ])
  } )
  it ( "should include the 'main' params in a get", () => {
    expect ( makeQuery ( createPlanRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'query{getCreatePlanDD(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'createPlanId:' + '\\'' + createPlanId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )
  it ( "should ignore the 'main' params in a list", () => {
    expect ( makeQuery ( createPlanRestD, 'list' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'query{listCreatePlanDD(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )
  it ( "should include the 'mutation' params in a update", () => {
    expect ( makeQuery ( createPlanRestD, 'update' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'mutation{updateCreatePlanDD(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'createPlanId:' + '\\'' + createPlanId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )


  it ( "makeAllQueryForRest - should make java variables", () => {
    expect ( makeJavaVariablesForGraphQlQuery ( [ eAccountsSummaryRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String getEAccountsSummaryDD(String accountId,String customerId){ ",
      "   return",

      "'query{getEAccountsSummaryDD(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
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
