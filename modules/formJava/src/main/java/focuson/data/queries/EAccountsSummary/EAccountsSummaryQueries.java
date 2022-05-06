package focuson.data.queries.EAccountsSummary;
public class EAccountsSummaryQueries{
  public static  String getEAccountsSummary(String accountId,String applRef,String brandRef,String clientRef,String customerId,String employeeType){ 
    return"query{getEAccountsSummary(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + "," + "employeeType:" + "\"" + employeeType + "\"" + "){"+
        "    useEStatements"+
        "    eAccountsTable{"+
        "      accountId"+
        "      displayType"+
        "      description"+
        "      virtualBankSeq"+
        "      total"+
        "      frequency"+
        "    }"+
        "    totalMonthlyCost"+
        "    oneAccountBalance"+
        "    currentAccountBalance"+
        "    createPlan{"+
        "      createPlanStart"+
        "      createPlanDate"+
        "      createPlanEnd"+
        "    }"+
        "  }"
  +"}";}
  public static  String state_invalidateEAccountsSummary(String accountId,String applRef,String brandRef,String clientRef,String customerId,String employeeType){ 
    return"mutation{stateEAccountsSummaryinvalidate(" + "accountId:" + "\"" + accountId + "\""  + "," + "applRef:" + "\"" + applRef + "\""  + "," + "brandRef:" + "\"" + brandRef + "\""  + "," + "clientRef:" + "\"" + clientRef + "\""  + "," + "customerId:" + "\"" + customerId + "\""  + "," + "employeeType:" + "\"" + employeeType + "\"" + ")}";
  }
}