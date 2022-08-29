import { makeGraphQlQueryForOneAction, makeJavaVariablesForGraphQlQuery, makeQuery } from "../codegen/makeGraphQlQuery";
import { createPlanRestD, eAccountsSummaryRestD } from "../example/eAccounts/eAccountsSummary.restD";
import { addressRestD } from "../example/postCodeDemo/addressSearch.restD";
import { chequeCreditBooksRestD } from "../example/chequeCreditBooks/chequeCreditBooks.restD";


describe ( "Making GraphQl from RestD", () => {
  it ( "should be possible to make a query ", () => {
    expect ( makeQuery ('somePrefix', eAccountsSummaryRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'query{getEAccountsSummary(' + 'accountId:' + accountId  + ',' + 'applRef:' + applRef  + ',' + 'brandRef:' + brandRef  + ',' + 'clientRef:' + clientRef  + ',' + 'dbName:' + '\\'' + dbName + '\\''  + ',' + 'employeeType:' + '\\'' + employeeType + '\\'' + '){'+",
      "      '    useEStatements'+",
      "      '    eAccountsTable{'+",
      "      '      accountId'+",
      "      '      displayType'+",
      "      '      description'+",
      "      '      virtualBankSeq'+",
      "      '      total'+",
      "      '      frequency'+",
      "      '    }'+",
      "      '    balancesAndMonthlyCost{'+",
      "      '      totalMonthlyCost'+",
      "      '      oneAccountBalance'+",
      "      '      currentAccountBalance'+",
      "      '    }'+",
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
    expect ( makeQuery ('somePrefix', createPlanRestD, 'get' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'query{getCreatePlan(' + 'accountId:' + accountId  + ',' + 'applRef:' + applRef  + ',' + 'brandRef:' + brandRef  + ',' + 'clientRef:' + clientRef  + ',' + 'createPlanId:' + createPlanId + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ] )
  } )
  // it ( "should ignore the 'main' params in a list", () => {
  //   expect ( makeQuery ( createPlanRestD, 'list' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
  //     "'query{listCreatePlan(' + 'accountId:' + '\\'' + accountId + '\\''  + ',' + 'customerId:' + '\\'' + customerId + '\\'' + '){'+",
  //     "      '    createPlanStart'+",
  //     "      '    createPlanDate'+",
  //     "      '    createPlanEnd'+",
  //     "      '  }'",
  //     "+'}';}"
  //   ] )
  // } )
  it ( "should include the 'mutation' params in a update", () => {
    expect ( makeQuery ('somePrefix', createPlanRestD, 'update' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "'mutation{updateCreatePlan(' + 'accountId:' + accountId  + ',' + 'applRef:' + applRef  + ',' + 'brandRef:' + brandRef  + ',' + 'clientRef:' + clientRef  + ',' + 'createPlanId:' + createPlanId  + ', obj:' + obj + '){'+",
      "      '    createPlanStart'+",
      "      '    createPlanDate'+",
      "      '    createPlanEnd'+",
      "      '  }'",
      "+'}';}"
    ])
  } )


  it ( "makeAllQueryForRest - should make java variables", () => {
    expect ( makeJavaVariablesForGraphQlQuery ( [ eAccountsSummaryRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String getEAccountsSummary(int accountId,int applRef,int brandRef,int clientRef,String dbName,String employeeType){ ",
      "  return'query{getEAccountsSummary(' + 'accountId:' + accountId  + ',' + 'applRef:' + applRef  + ',' + 'brandRef:' + brandRef  + ',' + 'clientRef:' + clientRef  + ',' + 'dbName:' + '\\'' + dbName + '\\''  + ',' + 'employeeType:' + '\\'' + employeeType + '\\'' + '){'+",
      "      '    useEStatements'+",
      "      '    eAccountsTable{'+",
      "      '      accountId'+",
      "      '      displayType'+",
      "      '      description'+",
      "      '      virtualBankSeq'+",
      "      '      total'+",
      "      '      frequency'+",
      "      '    }'+",
      "      '    balancesAndMonthlyCost{'+",
      "      '      totalMonthlyCost'+",
      "      '      oneAccountBalance'+",
      "      '      currentAccountBalance'+",
      "      '    }'+",
      "      '    createPlan{'+",
      "      '      createPlanStart'+",
      "      '      createPlanDate'+",
      "      '      createPlanEnd'+",
      "      '    }'+",
      "      '  }'",
      "+'}';}",
      "public static  String state_invalidateEAccountsSummary(int accountId,int clientRef,String dbName,String employeeType, String obj){ ",
      "  return'mutation{stateinvalidateEAccountsSummary(' + 'accountId:' + accountId  + ',' + 'clientRef:' + clientRef  + ',' + 'dbName:' + '\\'' + dbName + '\\''  + ',' + 'employeeType:' + '\\'' + employeeType + '\\''  + ', obj:' + obj + ')}';",
      "}"
    ])
  } )

  it ( "should make a query with no params", () => {
    expect ( makeJavaVariablesForGraphQlQuery ( [ addressRestD ] ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String createWithoutFetchPostCodeNameAndAddress(String obj){ ",
      "  return'mutation{createWithoutFetchPostCodeNameAndAddress(' +  ' obj:' + obj + ')}';",
      "}"
    ])
  } )

  it ( "should make a query for delete, returning a boolean so no {}", () => {
    expect ( makeGraphQlQueryForOneAction ('somePrefix', createPlanRestD ) ( 'delete' ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String deleteCreatePlan(int accountId,int applRef,int brandRef,int clientRef,int createPlanId){ ",
      "  return'mutation{deleteCreatePlan(' + 'accountId:' + accountId  + ',' + 'applRef:' + applRef  + ',' + 'brandRef:' + brandRef  + ',' + 'clientRef:' + clientRef  + ',' + 'createPlanId:' + createPlanId + ')}';",
      "}"
    ] )
  } )

  it ( "should make a query for state change, returning a boolean", () => {
    expect ( makeGraphQlQueryForOneAction ('somePrefix', chequeCreditBooksRestD ) ( { state: 'cancel' } ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String state_cancelChequeCreditbooks(int accountId,int brandRef,int clientRef, String obj){ ",
      "  return'mutation{statecancelChequeCreditbooks(' + 'accountId:' + accountId  + ',' + 'brandRef:' + brandRef  + ',' + 'clientRef:' + clientRef  + ', obj:' + obj + ')}';",
      "}"
    ] )
  } )
  it ( "should make a query for state change, returning a 'returns'", () => {
    expect ( makeGraphQlQueryForOneAction ('somePrefix', eAccountsSummaryRestD ) ( { state: 'invalidate' } ).map ( s => s.replace ( /"/g, "'" ) ) ).toEqual ( [
      "public static  String state_invalidateEAccountsSummary(int accountId,int clientRef,String dbName,String employeeType, String obj){ ",
      "  return'mutation{stateinvalidateEAccountsSummary(' + 'accountId:' + accountId  + ',' + 'clientRef:' + clientRef  + ',' + 'dbName:' + '\\'' + dbName + '\\''  + ',' + 'employeeType:' + '\\'' + employeeType + '\\''  + ', obj:' + obj + ')}';",
      "}"
    ])
  } )

} )
