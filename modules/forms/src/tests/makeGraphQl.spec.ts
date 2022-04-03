import { makeJavaVariablesForGraphQlQuery, makeQuery } from "../codegen/makeGraphQlQuery";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";


describe ( "Making GraphQl from RestD", () => {
  it ( "should be possible to make a query ", () => {
    expect ( makeQuery ( eAccountsSummaryRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'query{getEAccountsSummary(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
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
      "'query{getCreatePlan(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'createPlanId:' + '\\'' + createPlanId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )
  it ( "should ignore the 'main' params in a list", () => {
    expect ( makeQuery ( createPlanRestD, 'list' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'query{listCreatePlan(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )
  it ( "should include the 'mutation' params in a update", () => {
    expect ( makeQuery ( createPlanRestD, 'update' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'mutation{updateCreatePlan(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'createPlanId:' + '\\'' + createPlanId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\''  + ', obj:' + obj + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ])
  } )


  it ( "makeAllQueryForRest - should make java variables", () => {
    expect ( makeJavaVariablesForGraphQlQuery ( [ eAccountsSummaryRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String getEAccountsSummary(String accountId,String customerId){ ",
      "   return",

      "'query{getEAccountsSummary(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
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

  it ("should make a query with no params", () =>{
    expect ( makeJavaVariablesForGraphQlQuery ( [ addressRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String createPostCodeNameAndAddress(String obj){ ",
      "   return",
      "'mutation{createPostCodeNameAndAddress(' +  ' obj:' + obj + '){'+",
      "      '    name'+",
      "      '    line1'+",
      "      '    line2'+",
      "      '    line3'+",
      "      '    line4'+",
      "      '    postcode'+",
      "      '  }'",
      "+'}';}"
    ])

  })

} )
